FROM node:22.12-alpine

RUN apk update && \
    apk upgrade && \
    apk add --no-cache openssl curl && \
    npm install -g npm@latest && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

ENV HUSKY=0

WORKDIR /app

# Copy root workspace manifest + lockfile, then backend workspace manifest.
# Frontend is intentionally excluded so npm only installs backend deps.
COPY --chown=nodejs:nodejs package*.json ./
COPY --chown=nodejs:nodejs backend/package.json ./backend/

# Install backend production deps from the single root lockfile
RUN npm ci --workspace=backend --omit=dev

# Copy prisma schema + config and generate the client
COPY --chown=nodejs:nodejs backend/prisma ./backend/prisma/
COPY --chown=nodejs:nodejs backend/prisma.config.ts ./backend/

RUN cd backend && npx prisma generate

# Copy the rest of the backend source
COPY --chown=nodejs:nodejs backend/src ./backend/src/
COPY --chown=nodejs:nodejs backend/entrypoint.sh ./backend/entrypoint.sh
RUN chmod +x backend/entrypoint.sh

USER nodejs
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/api/health || exit 1

CMD ["/app/backend/entrypoint.sh"]
