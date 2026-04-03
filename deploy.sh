#!/bin/bash
set -e

echo "🚀 Starting production deployment..."

# Function to extract GitHub secrets and create .env files
extract_github_secrets() {
  echo "📝 Extracting ALL GitHub secrets to .env files..."

  # Get all environment variables that look like secrets (uppercase with underscores)
  BACKEND_VARS=$(env | grep -E '^[A-Z][A-Z0-9_]*=' | grep -v -E '^(PATH|HOME|USER|SHELL|PWD|OLDPWD|TERM|LANG|LC_|GITHUB_|RUNNER_|CI|ACTIONS_)' || true)
  FRONTEND_VARS=$(env | grep -E '^VITE_[A-Z0-9_]*=' || true)

  # Create backend .env with all relevant secrets
  if [ -n "$BACKEND_VARS" ]; then
    echo "$BACKEND_VARS" > backend/.env
    echo "✅ Backend .env created with $(echo "$BACKEND_VARS" | wc -l) variables"
  else
    echo "⚠️ No backend environment variables found"
  fi

  # Create frontend .env with VITE_ prefixed variables
  if [ -n "$FRONTEND_VARS" ]; then
    echo "$FRONTEND_VARS" > frontend/.env
    echo "✅ Frontend .env created with $(echo "$FRONTEND_VARS" | wc -l) variables"
  fi

  echo "📋 Extracted secrets summary:"
  echo "Backend vars: $(echo "$BACKEND_VARS" | grep -c '^' || echo 0)"
  echo "Frontend vars: $(echo "$FRONTEND_VARS" | grep -c '^' || echo 0)"
}

# Extract secrets if running in GitHub Actions
if [ "$GITHUB_ACTIONS" = "true" ]; then
  extract_github_secrets
fi

# Detect docker compose command
if command -v docker-compose &> /dev/null; then
  COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null 2>&1; then
  COMPOSE_CMD="docker compose"
else
  echo "❌ Docker Compose not installed"
  exit 1
fi

echo "Using: $COMPOSE_CMD"

# Docker Hub login with retry
if [ -n "$DOCKER_USERNAME" ] && [ -n "$DOCKER_TOKEN" ]; then
  echo "🔐 Logging into Docker Hub..."
  for i in 1 2 3; do
    if echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USERNAME" --password-stdin; then
      echo "✅ Login successful"
      break
    fi
    [ "$i" -eq 3 ] && { echo "❌ Docker Hub login failed after 3 attempts"; exit 1; }
    echo "⚠️ Attempt $i failed, retrying in 5s..."
    sleep 5
  done
fi

echo "Pulling latest images..."
timeout 300 $COMPOSE_CMD -f docker-compose.prod.yml pull || {
  echo "Pull timeout or failed - using cached images"
}

echo "Cleaning old unused images..."
timeout 60 docker image prune -f || true

# ── Blue-green setup ───────────────────────────────────────────────────────────
ACTIVE_COLOR_FILE=".active-color"
CURRENT_COLOR=$(cat "$ACTIVE_COLOR_FILE" 2>/dev/null || echo "blue")

if [ "$CURRENT_COLOR" = "blue" ]; then
  NEW_COLOR="green"
  OLD_COLOR="blue"
else
  NEW_COLOR="blue"
  OLD_COLOR="green"
fi

echo "Current active: $OLD_COLOR → Deploying to: $NEW_COLOR"

# ── Ensure infrastructure is healthy ──────────────────────────────────────────
echo "Ensuring postgres and redis are running..."
$COMPOSE_CMD -f docker-compose.prod.yml up -d --no-deps postgres redis

for SVC in postgres redis; do
  echo "Waiting for $SVC to be healthy..."
  for i in $(seq 1 12); do
    STATUS=$($COMPOSE_CMD -f docker-compose.prod.yml ps --format json "$SVC" 2>/dev/null \
      | grep -o '"Health":"[^"]*"' | cut -d'"' -f4 || echo "unknown")
    [ "$STATUS" = "healthy" ] && { echo "$SVC is healthy"; break; }
    [ "$i" -eq 12 ] && { echo "❌ $SVC failed to become healthy after 2 minutes"; exit 1; }
    echo "  $SVC attempt $i/12 - status: $STATUS - waiting 10s..."
    sleep 10
  done
done

# ── Start the new backend color ────────────────────────────────────────────────
echo "Starting backend-${NEW_COLOR}..."
$COMPOSE_CMD -f docker-compose.prod.yml up -d --no-deps "backend-${NEW_COLOR}"

# ── Wait for new backend to be healthy ────────────────────────────────────────
echo "Waiting for backend-${NEW_COLOR} to be healthy..."
HEALTHY=false
for i in $(seq 1 12); do
  STATUS=$($COMPOSE_CMD -f docker-compose.prod.yml ps --format json "backend-${NEW_COLOR}" 2>/dev/null \
    | grep -o '"Health":"[^"]*"' | cut -d'"' -f4 || echo "unknown")
  if [ "$STATUS" = "healthy" ]; then
    HEALTHY=true
    echo "backend-${NEW_COLOR} is healthy"
    break
  fi
  echo "  Attempt $i/12 - status: $STATUS - waiting 10s..."
  sleep 10
done

if [ "$HEALTHY" = false ]; then
  echo "❌ backend-${NEW_COLOR} failed health check - aborting. backend-${OLD_COLOR} still serving traffic."
  $COMPOSE_CMD -f docker-compose.prod.yml stop "backend-${NEW_COLOR}" || true
  exit 1
fi

# ── Write upstream config (only after new backend is confirmed healthy) ────────
echo "Writing upstream.conf → backend-${NEW_COLOR}..."
cat > nginx/upstream.conf << EOF
upstream backend {
    server backend-${NEW_COLOR}:5000;
    keepalive 32;
}

upstream frontend {
    server frontend:8080;
    keepalive 16;
}
EOF

# ── Switch nginx to new color (zero-downtime reload) ──────────────────────────
NGINX_RUNNING=$(docker ps --filter "name=.*nginx.*" --filter "status=running" --format "{{.Names}}" 2>/dev/null | head -1 || true)

if [ -n "$NGINX_RUNNING" ]; then
  echo "Testing nginx config before reload..."
  if $COMPOSE_CMD -f docker-compose.prod.yml exec -T nginx nginx -t 2>&1; then
    echo "Reloading nginx → traffic now routed to backend-${NEW_COLOR}..."
    $COMPOSE_CMD -f docker-compose.prod.yml exec -T nginx nginx -s reload
    sleep 2
  else
    echo "Config test failed (stale container), recreating nginx..."
    $COMPOSE_CMD -f docker-compose.prod.yml up -d --no-deps --force-recreate nginx
    sleep 3
  fi
else
  echo "Starting nginx..."
  $COMPOSE_CMD -f docker-compose.prod.yml up -d --no-deps nginx
fi

# ── Update frontend ────────────────────────────────────────────────────────────
echo "Updating frontend..."
$COMPOSE_CMD -f docker-compose.prod.yml up -d --no-deps frontend

# ── Stop old backend ───────────────────────────────────────────────────────────
echo "Stopping backend-${OLD_COLOR}..."
$COMPOSE_CMD -f docker-compose.prod.yml stop "backend-${OLD_COLOR}" || true

# ── Save active color ──────────────────────────────────────────────────────────
echo "$NEW_COLOR" > "$ACTIVE_COLOR_FILE"
echo "✅ Active color saved: $NEW_COLOR"

# Show container status
echo "📊 Container status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo "✅ Deployment completed successfully!"
