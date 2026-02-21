#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo "Usage: ./setup-ssl.sh your-domain.com"
    exit 1
fi

DOMAIN=$1

echo "🔒 Setting up SSL for $DOMAIN..."

# Install certbot
sudo apt-get update
sudo apt-get install -y certbot

# Stop nginx temporarily
docker-compose -f docker-compose.prod.yml stop nginx

# Get certificate
sudo certbot certonly --standalone -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Copy certificates
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/key.pem
sudo chmod 644 nginx/ssl/*.pem

# Update nginx config
sed -i "s/your-domain.com/$DOMAIN/g" nginx/nginx.conf
sed -i 's/# server {/server {/g' nginx/nginx.conf
sed -i 's/#     /    /g' nginx/nginx.conf

# Restart nginx
docker-compose -f docker-compose.prod.yml up -d nginx

echo "✅ SSL configured for $DOMAIN"
echo "🔄 Setup auto-renewal..."
(crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet && docker-compose -f $(pwd)/docker-compose.prod.yml restart nginx") | crontab -

echo "✅ Auto-renewal configured (runs daily at 3 AM)"
