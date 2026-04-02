# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vivid VitaBlends is a full-stack e-commerce platform (supplements/nutrition products) built as a monorepo with `frontend/` (React/Vite/TS) and `backend/` (Node.js/Express) workspaces.

## Common Commands

All commands run from their respective workspace directories unless noted.

### Frontend (`frontend/`)

```bash
npm run dev          # Start Vite dev server (port 8080)
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Vitest (run once)
npm run test:watch   # Vitest (watch mode)
npm run format       # Prettier write
npm run format:check # Prettier check
```

### Backend (`backend/`)

```bash
npm run dev              # Start with nodemon
npm run start            # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations (dev)
npm run prisma:studio    # Open Prisma Studio
npm run format:check     # Prettier check
```

### Running a single Vitest test

```bash
cd frontend && npx vitest run src/test/SomeComponent.test.tsx
```

### Environment setup

Copy `.env.example` to `.env` in the repo root — backend scripts use `dotenv -e ../.env` to load it from the root. Never place `.env` inside `backend/` or `frontend/`.

### Docker (production stack)

```bash
docker compose -f docker-compose.prod.yml up -d
```

## Architecture

### Monorepo layout

```
/
├── backend/    Node.js/Express API
├── frontend/   React SPA
├── nginx/      Reverse proxy config
├── bruno/      API test collection (Bruno client)
└── scripts/    Deployment scripts
```

### Backend architecture

Follows a layered pattern: `routes → controllers → services → repositories → Prisma`.

- `src/server.js` — Express entry point, middleware registration, route mounting
- `src/repositories/` — all Prisma queries live here; never query Prisma directly from controllers
- `src/services/` — business logic
- `src/controllers/` — HTTP request/response handling
- `src/schemas/` — Zod schemas for request validation (backend uses Zod v4)
- `src/middleware/` — auth, rate limiting, error handling
- `src/config/index.js` — all env-var config in one place (port, CORS, JWT, Redis, R2)
- `src/config/s3.js` — S3/R2 client init; Redis client is in `src/utils/redis.js`

**Prisma note**: Backend uses `@prisma/adapter-pg` (PostgreSQL adapter) with Prisma 7. The `prisma/` directory is inside `backend/`. Always run `prisma:generate` after schema changes before building.

**ESM note**: `backend/` uses `"type": "module"` — all internal imports must include the `.js` extension (e.g., `import foo from './foo.js'`).

**Validation middleware**: `src/middleware/validate.js` exports `validate` (body), `validateQuery` (query params), `validateParam` (named param), and shorthands `validateId` (CUID), `validateUuid`, `validateUserId`. Use these on routes instead of inline parsing.

**Route mounting**: All API routes are mounted under the `/api` prefix in `server.js` (e.g., `/api/products`, `/api/admin`).

### Frontend architecture

- **Routing**: React Router v6 with layout routes. Protected admin routes use `<ProtectedRoute>`.
- **Data fetching**: TanStack Query for server state; all API calls go through `src/services/`.
- **Forms**: React Hook Form + Zod (frontend uses Zod v3).
- **UI**: shadcn/ui components (Radix UI primitives) styled with Tailwind CSS. `components.json` configures shadcn paths.
- **Path alias**: `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`).
- **Animations**: GSAP used for the splash screen and hero section animations.
- **Context providers** in `src/context/` manage cart state and auth.
- **API calls**: Services use native `fetch` with `credentials: "include"` for cookie-based auth. `VITE_API_BASE_URL` (from `src/lib/config.ts`) is the base for all requests.

### Auth flow

- Admin-only auth via JWT access token (15m) + refresh token (7d) stored in HttpOnly cookie.
- Refresh tokens stored as **SHA256 hashes** in the `Session` model (never plain); rotated on every use.
- `ProtectedRoute` component checks auth context; admin API routes use the `authorize` middleware.
- JWT uses HS256 only — algorithm confusion attacks are prevented.

### Image uploads

Images are uploaded to Cloudflare R2 (S3-compatible). The backend validates MIME type and enforces a 10 MB limit using Sharp for processing. Presigned URLs are generated via `@aws-sdk/s3-request-presigner`.

### Database models

`Admin`, `Session`, `Category`, `Product`, `Review`, `Message`, `User`, `Order`, `OrderItem`, `ComingSoon`

Key details:

- `Session.refreshTokenHash` — SHA256 of the raw refresh token
- `Order.orderId` — human-readable `VV-XXXXXX` format
- `Order.status` state machine: `PENDING → CONFIRMED → DELIVERED`; `PENDING/CONFIRMED → CANCELLED`
- `User` is identified by phone number (unique, 10 digits, no password — public order submission)

### CI/CD

- **`ci.yml`**: Runs on PRs to `main` — frontend lint + tests, backend generate + format check.
- **`deploy.yml`**: Runs on push to `main` — `npm audit` (critical) + Trivy scan, Docker build/push to Docker Hub (tagged `:latest` + `:SHA`), SSH deploy to VM, health check, Discord notification.

## Key Constraints

- The root `.env` file is shared by both backend scripts and docker-compose. Keep all environment variables there. Key vars beyond the README: `CORS_ORIGIN` (comma-separated allowed origins), `JWT_REFRESH_SECRET`, `JWT_REFRESH_EXPIRES_IN`, `REDIS_PASSWORD`; frontend needs `VITE_API_BASE_URL` (empty string = same-origin via Nginx proxy).
- `REDIS_ENABLED=true` must be explicitly set; it defaults to `false` and the server starts without Redis if omitted or if the connection fails.
- Backend uses **Zod v4** (`zod` package ≥4); frontend uses **Zod v3** — the APIs differ slightly (e.g., `.parse` vs error formatting).
- Prisma client must be regenerated (`prisma:generate`) whenever `schema.prisma` changes before the backend will compile/run.
- Nginx sits in front of both services in production; the frontend Nginx config serves the SPA and proxies `/api` to the backend.
