# Vivid VitaBlends — Gemini CLI Context

Full-stack e-commerce monorepo: `frontend/` (React 18/Vite/TypeScript) + `backend/` (Node.js/Express ESM).

## Commands

### Frontend (`frontend/`)

```bash
npm run dev          # Vite dev server — port 8080
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Vitest (single run)
npm run test:watch   # Vitest (watch)
npm run format       # Prettier write
npm run format:check # Prettier check
```

### Backend (`backend/`)

```bash
npm run dev              # nodemon
npm run start            # production
npm run prisma:generate  # regenerate Prisma client (run after schema changes)
npm run prisma:migrate   # run migrations (dev)
npm run prisma:studio    # Prisma Studio GUI
npm run format:check     # Prettier check
```

### Single Vitest test

```bash
cd frontend && npx vitest run src/test/SomeComponent.test.tsx
```

### Docker (production)

```bash
docker compose -f docker-compose.prod.yml up -d
```

## Environment

`.env` lives at the **repo root** — never inside `backend/` or `frontend/`. Copy `.env.example` to `.env`.

Key variables: `DATABASE_URL`, `DIRECT_URL`, `PORT=5000`, `CORS_ORIGIN`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `JWT_EXPIRES_IN=15m`, `JWT_REFRESH_EXPIRES_IN=7d`, `REDIS_ENABLED`, `REDIS_URL`, `REDIS_PASSWORD`, `REDIS_TTL`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_BUCKET_ID`, `VITE_API_BASE_URL`, `VITE_WHATSAPP_NUMBER`, `LOG_LEVEL`.

## Architecture

### Layered backend

`routes → controllers → services → repositories → Prisma`

- `src/server.js` — Express entry, all routes mounted under `/api`
- `src/config/index.js` — all env config
- `src/config/s3.js` — R2/S3 client
- `src/utils/redis.js` — Redis client
- `src/middleware/validate.js` — exports `validate` (body), `validateQuery`, `validateParam`, `validateId`, `validateUuid`, `validateUserId`
- `src/schemas/` — Zod v4 schemas (backend only)
- `src/repositories/` — all Prisma queries; never call Prisma from controllers

**ESM**: `"type": "module"` — all imports need `.js` extension.  
**Prisma**: uses `@prisma/adapter-pg`; always run `prisma:generate` after schema changes.

### Frontend

- React Router v6, `<ProtectedRoute>` for admin
- TanStack Query for server state; all fetches via `src/services/`
- React Hook Form + Zod v3 (frontend uses v3, backend uses v4)
- shadcn/ui + Tailwind CSS; `@/` alias maps to `src/`
- GSAP for splash/hero animations
- `src/lib/config.ts` exports `VITE_API_BASE_URL`; all fetches use `credentials: "include"`

## Key Constraints

- **Zod versions differ**: backend = Zod v4, frontend = Zod v3.
- `REDIS_ENABLED=true` must be explicit; defaults to `false` with graceful fallback.
- Prisma client must be regenerated after any `schema.prisma` change.
- Express JSON body limit: 10 MB (hardcoded in `server.js`).
- JWT: HS256 only. Refresh tokens stored as SHA256 hashes in `Session`, rotated on every use.
- Images: MIME + magic byte validation, 10 MB limit, Sharp processing, stored in Cloudflare R2.
- `Order.orderId` format: `VV-XXXXXX`. Status machine: `PENDING → CONFIRMED → DELIVERED`; `PENDING/CONFIRMED → CANCELLED`.
- `User` identified by phone number (10 digits, unique, no password).

## Database Models

`Admin`, `Session`, `Category`, `Product`, `Review`, `Message`, `User`, `Order`, `OrderItem`, `ComingSoon`

## API Routes (all under `/api`)

| Method          | Path                                                                   | Auth             |
| --------------- | ---------------------------------------------------------------------- | ---------------- |
| GET             | `/health`                                                              | —                |
| POST            | `/admin/login`                                                         | — (rate: 5/min)  |
| POST            | `/admin/refresh`                                                       | — (rate: 10/min) |
| POST            | `/admin/logout`                                                        | Admin            |
| GET             | `/products`, `/products/featured`, `/products/combos`, `/products/:id` | — (cached)       |
| POST/PUT/DELETE | `/products/*`                                                          | Admin            |
| GET             | `/categories`, `/categories/homepage`                                  | — (cached)       |
| POST/PUT        | `/categories/*`                                                        | Admin            |
| GET             | `/reviews`, `/reviews/hero`                                            | — (cached)       |
| POST            | `/reviews`                                                             | —                |
| PATCH           | `/reviews/:id/show-in-hero`                                            | Admin            |
| POST            | `/orders`                                                              | — (rate: 10/min) |
| GET             | `/orders`                                                              | Admin            |
| PATCH           | `/orders/:id/status`                                                   | Admin            |
| POST            | `/messages`                                                            | — (rate: 5/min)  |
| GET             | `/messages`                                                            | Admin            |
| GET             | `/coming-soon`                                                         | — (cached 5 min) |
| PUT             | `/coming-soon`                                                         | Admin            |
| GET             | `/gallery`                                                             | — (cached 5 min) |
| POST            | `/gallery`                                                             | Admin            |
| DELETE          | `/gallery/:id`                                                         | Admin            |
