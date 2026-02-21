#!/bin/bash
set -e

echo "🔧 Setting up VM for Vivid VitaBlends..."

# Update system
echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
echo "🐳 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Git
echo "📚 Installing Git..."
sudo apt-get install -y git

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /opt/vivid_vitablends
sudo chown $USER:$USER /opt/vivid_vitablends

# Clone repository
echo "📥 Cloning repository..."
cd /opt/vivid_vitablends
git clone <YOUR_REPO_URL> .

# Create environment files
echo "📝 Creating environment files..."
cat > backend/.env.production << 'EOF'
DATABASE_URL=postgresql://postgres:vivid_secure_password_2024@postgres:5432/vivid_vitablends
PORT=5000
NODE_ENV=production
CORS_ORIGIN=http://YOUR_VM_IP:8000
JWT_SECRET=CHANGE_THIS_TO_SECURE_RANDOM_STRING
JWT_EXPIRES_IN=3600
REDIS_ENABLED=false
EOF

# Make deploy script executable
chmod +x deploy.sh

# Setup firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 8000/tcp
sudo ufw allow 8443/tcp
sudo ufw --force enable

echo "✅ VM setup completed!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env.production with your actual values"
echo "2. Add GitHub secrets: VM_HOST, VM_USERNAME, VM_SSH_KEY"
echo "3. Run: ./deploy.sh"
