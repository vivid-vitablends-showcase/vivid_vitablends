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
docker image prune -f || true

PREVIOUS_BACKEND=$(docker inspect --format='{{.Image}}' vivid_vitablends-backend-1 2>/dev/null || echo "none")
PREVIOUS_FRONTEND=$(docker inspect --format='{{.Image}}' vivid_vitablends-frontend-1 2>/dev/null || echo "none")
echo "Previous backend image: $PREVIOUS_BACKEND"
echo "Previous frontend image: $PREVIOUS_FRONTEND"

echo "Restarting all containers..."
$COMPOSE_CMD -f docker-compose.prod.yml up -d --remove-orphans --pull never

echo "Waiting for backend to be healthy..."
HEALTHY=false
for i in $(seq 1 12); do
  STATUS=$($COMPOSE_CMD -f docker-compose.prod.yml ps --format json backend 2>/dev/null | grep -o '"Health":"[^"]*"' | cut -d'"' -f4 || echo "unknown")
  if [ "$STATUS" = "healthy" ]; then
    HEALTHY=true
    echo "Backend is healthy"
    break
  fi
  echo "Attempt $i/12 - status: $STATUS - waiting 10s..."
  sleep 10
done

if [ "$HEALTHY" = false ]; then
  echo "Backend failed health check - rolling back..."
  if [ "$PREVIOUS_BACKEND" != "none" ]; then
    docker tag "$PREVIOUS_BACKEND" vividvitablendsdev/vividvitablends:backend-latest || true
    $COMPOSE_CMD -f docker-compose.prod.yml up -d --no-deps backend || true
    echo "Rolled back to previous backend image"
  fi
  exit 1
fi

# Show container status
echo "📊 Container status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo "✅ Deployment completed successfully!"
