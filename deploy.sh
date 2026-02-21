#!/bin/bash
set -e

echo "🚀 Deploying Vivid VitaBlends to Production..."

# Update system
echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "🐳 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Generate secure JWT secret
echo "🔐 Generating secure JWT secret..."
JWT_SECRET=$(openssl rand -base64 32)
sed -i "s/CHANGE_THIS_TO_SECURE_RANDOM_STRING_IN_PRODUCTION/$JWT_SECRET/" backend/.env.production

# Build and start services
echo "🏗️ Building Docker images..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "🚀 Starting services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check status
echo "✅ Deployment complete!"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "📊 Service URLs:"
echo "   Frontend: http://$(curl -s ifconfig.me)"
echo "   Backend API: http://$(curl -s ifconfig.me)/api"
echo ""
echo "📝 Next steps:"
echo "   1. Configure domain DNS to point to: $(curl -s ifconfig.me)"
echo "   2. Setup SSL with: sudo ./setup-ssl.sh your-domain.com"
echo "   3. Monitor logs: docker-compose -f docker-compose.prod.yml logs -f"
