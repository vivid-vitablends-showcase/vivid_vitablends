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
- `src/config/` — Redis, S3/R2, and other client init

**Prisma note**: Backend uses `@prisma/adapter-pg` (PostgreSQL adapter) with Prisma 7. The `prisma/` directory is inside `backend/`. Always run `prisma:generate` after schema changes before building.

### Frontend architecture

- **Routing**: React Router v6 with layout routes. Protected admin routes use `<ProtectedRoute>`.
- **Data fetching**: TanStack Query for server state; all API calls go through `src/services/`.
- **Forms**: React Hook Form + Zod (frontend uses Zod v3).
- **UI**: shadcn/ui components (Radix UI primitives) styled with Tailwind CSS. `components.json` configures shadcn paths.
- **Path alias**: `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`).
- **Animations**: GSAP used for the splash screen and hero section animations.
- **Context providers** in `src/context/` manage cart state and auth.

### Auth flow

- Admin-only auth via JWT access token (short-lived) + refresh token stored in HttpOnly cookie.
- Refresh tokens tracked in the `Session` model in Postgres.
- `ProtectedRoute` component checks auth context; admin API routes use the `authorize` middleware.

### Image uploads

Images are uploaded to Cloudflare R2 (S3-compatible). The backend validates MIME type and enforces a 10 MB limit using Sharp for processing. Presigned URLs are generated via `@aws-sdk/s3-request-presigner`.

### CI/CD

- **`ci.yml`**: Runs on PRs to `main` — frontend lint + tests, backend generate + format check.
- **`deploy.yml`**: Runs on push to `main` — Trivy security scan, Docker build/push to Docker Hub (tagged with commit SHA), SSH deploy to VM, health check, Discord notification.

## Key Constraints

- The root `.env` file is shared by both backend scripts and docker-compose. Keep all environment variables there.
- Backend uses **Zod v4** (`zod` package ≥4); frontend uses **Zod v3** — the APIs differ slightly (e.g., `.parse` vs error formatting).
- Prisma client must be regenerated (`prisma:generate`) whenever `schema.prisma` changes before the backend will compile/run.
- Nginx sits in front of both services in production; the frontend Nginx config serves the SPA and proxies `/api` to the backend.
