#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Load environment variables from .env.deploy
if [ -f .env.deploy ]; then
    echo "📝 Loading environment variables..."
    cp .env.deploy .env
    export $(cat .env.deploy | grep -v '^#' | xargs)
else
    echo "⚠️  Warning: .env.deploy not found"
fi

# Detect docker compose command
if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    echo "❌ Neither docker-compose nor docker compose found!"
    exit 1
fi

echo "Using: $COMPOSE_CMD"

# Login to Docker Hub
if [ -n "$DOCKER_USERNAME" ] && [ -n "$DOCKER_PASSWORD" ]; then
    echo "🔐 Logging into Docker Hub..."
    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
fi

# Free up memory before deployment
echo "🧹 Freeing up memory..."
docker system prune -af --volumes || true

# Stop existing containers
echo "⏹️  Stopping existing containers..."
$COMPOSE_CMD -f docker-compose.prod.yml down --remove-orphans

# Pull latest images one at a time to save memory
echo "📦 Pulling latest images from registry..."
$COMPOSE_CMD -f docker-compose.prod.yml pull --ignore-pull-failures

# Start containers
echo "▶️  Starting containers..."
$COMPOSE_CMD -f docker-compose.prod.yml up -d --no-build

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 15

# Check backend logs for errors
echo "🔍 Checking backend status..."
if ! docker ps | grep -q "vivid_vitablends-backend-1.*Up"; then
    echo "⚠️  Backend container is not running properly. Logs:"
    docker logs vivid_vitablends-backend-1 --tail 30
fi

# Run database migrations
echo "🗄️  Running database migrations..."
$COMPOSE_CMD -f docker-compose.prod.yml exec -T backend npx prisma migrate deploy || echo "⚠️  Migration failed, continuing..."

# Show container status
echo "📊 Container status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo "✅ Deployment completed successfully!"
