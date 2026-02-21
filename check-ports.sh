#!/bin/bash

# Check all listening ports
echo "📊 All listening ports:"
sudo netstat -tulpn | grep LISTEN

echo ""
echo "🔍 Specific ports (5000, 8000, 8443):"
sudo lsof -i :5000
sudo lsof -i :8000
sudo lsof -i :8443

echo ""
echo "🐳 Docker container ports:"
docker ps --format "table {{.Names}}\t{{.Ports}}"

echo ""
echo "📡 Alternative method (ss command):"
sudo ss -tulpn | grep LISTEN
