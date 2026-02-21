#!/bin/bash
set -e

echo "🚀 Starting deployment..."

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
docker-compose -f docker-compose.prod.yml down

# Pull latest images
echo "📦 Pulling latest images from registry..."
docker-compose -f docker-compose.prod.yml pull

# Start containers
echo "▶️  Starting containers..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Run database migrations
echo "🗄️  Running database migrations..."
docker-compose -f docker-compose.prod.yml exec -T backend npm run prisma:migrate deploy

# Clean up old images
echo "🧹 Cleaning up..."
docker image prune -f

echo "✅ Deployment completed successfully!"
