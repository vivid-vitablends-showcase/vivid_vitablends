#!/bin/bash
set -e

echo "🚀 Starting deployment..."

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

# Load environment variables
if [ -f .env.deploy ]; then
    export $(cat .env.deploy | xargs)
fi

# Login to Docker Hub
if [ -n "$DOCKER_USERNAME" ] && [ -n "$DOCKER_PASSWORD" ]; then
    echo "🔐 Logging into Docker Hub..."
    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
fi

# Stop existing containers
echo "⏹️  Stopping existing containers..."
$COMPOSE_CMD -f docker-compose.prod.yml down

# Pull latest images
echo "📦 Pulling latest images from registry..."
$COMPOSE_CMD -f docker-compose.prod.yml pull

# Start containers
echo "▶️  Starting containers..."
$COMPOSE_CMD -f docker-compose.prod.yml up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Run database migrations
echo "🗄️  Running database migrations..."
$COMPOSE_CMD -f docker-compose.prod.yml exec -T backend npm run prisma:migrate deploy

# Clean up old images
echo "🧹 Cleaning up..."
docker image prune -f

echo "✅ Deployment completed successfully!"
