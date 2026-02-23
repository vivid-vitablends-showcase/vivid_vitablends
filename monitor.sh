#!/bin/bash

echo "📊 Vivid VitaBlends - System Status"
echo "===================================="
echo ""

# System resources
echo "💻 System Resources:"
echo "   CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')% used"
echo "   Memory: $(free -h | awk '/^Mem:/ {print $3 "/" $2}')"
echo "   Disk: $(df -h / | awk 'NR==2 {print $3 "/" $2 " (" $5 " used)"}')"
echo ""

# Docker status
echo "🐳 Docker Services:"
docker-compose -f docker-compose.prod.yml ps
echo ""

# Service health
echo "🏥 Health Checks:"
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/health)
if [ "$BACKEND_STATUS" = "200" ]; then
    echo "   ✅ Backend API: Healthy"
else
    echo "   ❌ Backend API: Down (HTTP $BACKEND_STATUS)"
fi

FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/)
if [ "$FRONTEND_STATUS" = "200" ]; then
    echo "   ✅ Frontend: Healthy"
else
    echo "   ❌ Frontend: Down (HTTP $FRONTEND_STATUS)"
fi
echo ""

# Recent logs
echo "📝 Recent Errors (last 10):"
docker-compose -f docker-compose.prod.yml logs --tail=100 | grep -i error | tail -10
echo ""

echo "✅ Status check complete"
