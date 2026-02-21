#!/bin/bash

# SSL Setup Script for Vivid VitaBlends
# This script sets up Let's Encrypt SSL certificate

echo "🔒 SSL Certificate Setup"
echo ""

# Check if domain is provided
if [ -z "$1" ]; then
    echo "❌ Error: Domain name required"
    echo "Usage: ./setup-ssl.sh yourdomain.com"
    exit 1
fi

DOMAIN=$1
EMAIL=${2:-admin@$DOMAIN}

echo "📋 Configuration:"
echo "   Domain: $DOMAIN"
echo "   Email: $EMAIL"
echo ""

# Install certbot
echo "📦 Installing Certbot..."
sudo apt-get update
sudo apt-get install -y certbot

# Stop nginx temporarily
echo "⏹️  Stopping nginx..."
docker stop vivid_vitablends-nginx-1

# Get certificate
echo "🔐 Obtaining SSL certificate..."
sudo certbot certonly --standalone \
    -d $DOMAIN \
    --non-interactive \
    --agree-tos \
    --email $EMAIL \
    --preferred-challenges http

# Create SSL directory
echo "📁 Creating SSL directory..."
sudo mkdir -p /opt/vivid_vitablends/nginx/ssl

# Copy certificates
echo "📋 Copying certificates..."
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /opt/vivid_vitablends/nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem /opt/vivid_vitablends/nginx/ssl/key.pem
sudo chown -R $USER:$USER /opt/vivid_vitablends/nginx/ssl

# Update nginx config
echo "⚙️  Updating nginx configuration..."
cd /opt/vivid_vitablends

# Restart containers
echo "▶️  Restarting containers..."
docker-compose -f docker-compose.prod.yml up -d

# Setup auto-renewal
echo "🔄 Setting up auto-renewal..."
sudo crontab -l 2>/dev/null | { cat; echo "0 0 * * * certbot renew --quiet && cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /opt/vivid_vitablends/nginx/ssl/cert.pem && cp /etc/letsencrypt/live/$DOMAIN/privkey.pem /opt/vivid_vitablends/nginx/ssl/key.pem && docker restart vivid_vitablends-nginx-1"; } | sudo crontab -

echo ""
echo "✅ SSL certificate installed successfully!"
echo "🌐 Your site is now available at: https://$DOMAIN"
echo ""
echo "📝 Note: Certificate will auto-renew every 90 days"
