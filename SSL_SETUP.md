# SSL Certificate Setup Guide

## Prerequisites
- A domain name pointing to your server IP (140.245.219.152)
- Port 80 and 443 open in firewall

## Option 1: Let's Encrypt (Free, Recommended)

### Step 1: Point your domain to the server
Add an A record in your domain DNS:
```
Type: A
Name: @ (or your subdomain)
Value: 140.245.219.152
TTL: 3600
```

### Step 2: Run the SSL setup script
```bash
cd /opt/vivid_vitablends
chmod +x setup-ssl.sh
./setup-ssl.sh yourdomain.com your-email@example.com
```

### Step 3: Open port 443 in Oracle Cloud
1. Go to Oracle Cloud Console
2. Navigate to your VCN → Security Lists
3. Add Ingress Rule:
   - Source CIDR: 0.0.0.0/0
   - IP Protocol: TCP
   - Destination Port: 443

### Step 4: Update firewall on VM
```bash
sudo ufw allow 443/tcp
```

## Option 2: Self-Signed Certificate (Testing Only)

```bash
cd /opt/vivid_vitablends
sudo mkdir -p nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=140.245.219.152"

sudo chown -R $USER:$USER nginx/ssl
docker-compose -f docker-compose.prod.yml restart nginx
```

⚠️ **Warning**: Self-signed certificates will show security warnings in browsers.

## Verify SSL
After setup, access your site:
- **HTTPS**: https://yourdomain.com
- **HTTP**: Will redirect to HTTPS automatically

## Certificate Renewal
Let's Encrypt certificates auto-renew via cron job (set up by script).

Manual renewal:
```bash
sudo certbot renew
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /opt/vivid_vitablends/nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /opt/vivid_vitablends/nginx/ssl/key.pem
docker restart vivid_vitablends-nginx-1
```

## Troubleshooting

### Check certificate
```bash
openssl x509 -in /opt/vivid_vitablends/nginx/ssl/cert.pem -text -noout
```

### Check nginx logs
```bash
docker logs vivid_vitablends-nginx-1
```

### Test SSL configuration
```bash
curl -I https://yourdomain.com
```
