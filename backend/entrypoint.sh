#!/bin/sh
set -e

cd /app/backend

echo "[entrypoint] Running Prisma migrations..."
# Retry up to 5 times with 5 s delay — handles the brief window during container
# startup where Docker's internal DNS hasn't yet registered the postgres hostname.
i=1
until npx prisma migrate deploy; do
  if [ "$i" -ge 5 ]; then
    echo "[entrypoint] Prisma migrate failed after $i attempts — aborting."
    exit 1
  fi
  echo "[entrypoint] Migration attempt $i failed, retrying in 5 s..."
  i=$((i + 1))
  sleep 5
done

echo "[entrypoint] Starting server..."
exec node src/server.js
