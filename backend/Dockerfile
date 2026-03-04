FROM node:22.12-alpine

# Update all packages and npm to fix security vulnerabilities
RUN apk update && \
    apk upgrade && \
    apk add --no-cache libpng=1.6.55-r0 openssl curl || \
    (apk upgrade libpng && apk add --no-cache openssl curl) && \
    npm install -g npm@latest && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

WORKDIR /app

COPY --chown=nodejs:nodejs package*.json ./
COPY --chown=nodejs:nodejs prisma ./prisma/

RUN npm ci --only=production && \
    npx prisma generate

COPY --chown=nodejs:nodejs . .

COPY --chown=nodejs:nodejs entrypoint.sh ./
RUN chmod +x entrypoint.sh

USER nodejs
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

CMD ["./entrypoint.sh"]
