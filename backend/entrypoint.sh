#!/bin/sh
set -e

cd /app/backend

echo "[entrypoint] Running Prisma migrations..."
npx prisma migrate deploy

echo "[entrypoint] Starting server..."
exec node src/server.js
