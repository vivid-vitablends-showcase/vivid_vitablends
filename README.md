# Vivid VitaBlends

A full-stack e-commerce platform for health products (pickles, powders, and wellness items), built with React, TypeScript, and Node.js.

## Tech Stack

### Frontend

- **React 18** with **TypeScript 5** — strict mode, functional components
- **Vite 5** with SWC — dev server on port 8080
- **Tailwind CSS** + **shadcn/ui** (Radix UI primitives)
- **React Router v6** — SPA routing with protected admin routes
- **TanStack Query 5** — server state caching
- **React Hook Form** + **Zod v3** — form validation
- **GSAP** — splash screen and hero animations
- **Vitest** — test runner
- **Sonner** — toast notifications

### Backend

- **Node.js** with **Express 4** — ES Modules (`"type": "module"`)
- **Prisma ORM 7** with `@prisma/adapter-pg` — PostgreSQL driver
- **PostgreSQL 16** — primary database
- **Redis 7** — caching and rate limiting (optional, graceful fallback)
- **Zod v4** — request validation
- **JWT** (HS256) — access token (15m) + refresh token (7d, httpOnly cookie)
- **bcryptjs** — password hashing (12 rounds)
- **Sharp** — image processing before upload
- **Cloudflare R2** (S3-compatible) — image storage
- **Winston** — structured logging

### Infrastructure

- **Docker** + **Docker Compose** — containerization
- **Nginx** — reverse proxy, rate limiting, static serving, gzip
- **GitHub Actions** — CI/CD (lint/test on PRs, build/deploy on main push)

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL 16
- Redis 7 (optional)
- Cloudflare R2 account (for image uploads)

### Environment Setup

Copy `.env.example` to `.env` in the **repo root** (shared by both workspaces and docker-compose):

```bash
cp .env.example .env
```

Key variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/vivid_vitablends
DIRECT_URL=postgresql://user:password@localhost:5432/vivid_vitablends

# App
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080

# JWT
JWT_SECRET=your-secret-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
JWT_REFRESH_EXPIRES_IN=7d

# Redis (optional — set REDIS_ENABLED=false to skip)
REDIS_ENABLED=true
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=
REDIS_TTL=3600

# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_BUCKET_ID=

# Frontend (Vite)
VITE_API_BASE_URL=http://localhost:5000
VITE_WHATSAPP_NUMBER=919876543210
```

### Install dependencies

```bash
npm install   # installs all workspaces (frontend + backend) from root
```

### Backend

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

### Docker (production stack)

```bash
docker compose -f docker-compose.prod.yml up -d
```

## Available Scripts

### Frontend (`frontend/`)

```bash
npm run dev           # Vite dev server (port 8080)
npm run build         # Production build
npm run lint          # ESLint
npm run test          # Vitest (single run)
npm run test:watch    # Vitest (watch)
npm run format        # Prettier write
npm run format:check  # Prettier check
```

### Backend (`backend/`)

```bash
npm run dev               # Nodemon
npm run start             # Production
npm run prisma:generate   # Regenerate Prisma client
npm run prisma:migrate    # Run migrations (dev)
npm run prisma:studio     # Prisma Studio GUI
npm run format:check      # Prettier check
```

## Project Structure

```
vivid_vitablends/
├── backend/
│   ├── prisma/              # Schema and migrations
│   └── src/
│       ├── config/          # index.js (all env config), s3.js (R2 client)
│       ├── controllers/     # HTTP request/response only
│       ├── middleware/       # auth, adminAuth, cache, rateLimiter, validate
│       ├── repositories/    # Prisma queries only
│       ├── routes/          # Route definitions + middleware binding
│       ├── schemas/         # Zod v4 validation schemas
│       ├── services/        # Business logic
│       ├── utils/           # jwt, password, hash, redis, imageProcessor, logger, prisma, r2
│       └── server.js        # Express entry point
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── admin/       # Dashboard management panels
│       │   ├── ui/          # shadcn/ui components (50+)
│       │   └── layout/      # Feature components (Header, ProductCard, etc.)
│       ├── context/         # CartContext (localStorage-backed)
│       ├── hooks/           # 13 custom hooks (useAdminAuth, useProducts, etc.)
│       ├── lib/             # apiClient, config, constants, storage, utils
│       ├── pages/           # 17 route pages
│       ├── services/api/    # Fetch wrappers per resource
│       └── types/           # TypeScript interfaces
├── nginx/                   # Reverse proxy config
├── bruno/                   # API testing collection
├── .github/workflows/       # ci.yml, deploy.yml
└── docker-compose.prod.yml
```

## API Routes

All routes are mounted under `/api`.

| Method            | Path                            | Auth  | Notes             |
| ----------------- | ------------------------------- | ----- | ----------------- |
| `GET`             | `/api/health`                   | —     | Health check      |
| `POST`            | `/api/admin/login`              | —     | Rate: 5/min       |
| `POST`            | `/api/admin/refresh`            | —     | Rate: 10/min      |
| `POST`            | `/api/admin/logout`             | Admin |                   |
| `GET`             | `/api/products`                 | —     | Cached 300s       |
| `GET`             | `/api/products/featured`        | —     | Cached 300s       |
| `GET`             | `/api/products/combos`          | —     | Cached 300s       |
| `GET`             | `/api/products/:id`             | —     | Cached 600s       |
| `POST/PUT/DELETE` | `/api/products/*`               | Admin |                   |
| `GET`             | `/api/categories`               | —     | Cached 600s       |
| `GET`             | `/api/categories/homepage`      | —     | Cached 600s       |
| `POST/PUT`        | `/api/categories/*`             | Admin |                   |
| `GET`             | `/api/reviews`                  | —     | Cached 300s       |
| `GET`             | `/api/reviews/hero`             | —     | Cached 300s       |
| `POST`            | `/api/reviews`                  | —     | Public submission |
| `PATCH`           | `/api/reviews/:id/show-in-hero` | Admin |                   |
| `POST`            | `/api/orders`                   | —     | Rate: 10/min      |
| `GET`             | `/api/orders`                   | Admin |                   |
| `PATCH`           | `/api/orders/:id/status`        | Admin | State machine     |
| `POST`            | `/api/messages`                 | —     | Rate: 5/min       |
| `GET`             | `/api/messages`                 | Admin |                   |
| `GET`             | `/api/coming-soon`              | —     | Cached 300s       |
| `PUT`             | `/api/coming-soon`              | Admin |                   |

## Database Models

`Admin`, `Session`, `Category`, `Product`, `Review`, `Message`, `User`, `Order`, `OrderItem`, `ComingSoon`

Key details:

- `Session.refreshTokenHash` — SHA256 of the raw refresh token (never stored plain)
- `Order.orderId` — human-readable `VV-XXXXXX` format
- `Order.status` state machine: `PENDING → CONFIRMED → DELIVERED`, `PENDING/CONFIRMED → CANCELLED`
- `User` is identified by phone number (unique, 10 digits)

## CI/CD

**`ci.yml`** — runs on PRs to `main`:

- Frontend: ESLint + Vitest
- Backend: `prisma generate` + Prettier check

**`deploy.yml`** — runs on push to `main`:

- `npm audit` (critical level) + Trivy scan
- Docker build & push to Docker Hub (tagged `:latest` + `:SHA`)
- SSH deploy to VM, health check, Discord notification

## Security

- JWT HS256 only — algorithm confusion attacks prevented
- Refresh tokens stored as SHA256 hashes in `Session` table, rotated on every use
- bcrypt 12 rounds (OWASP compliant)
- All inputs validated with Zod before reaching services
- Images: MIME + magic byte validation, 10MB limit, Sharp processing
- Helmet.js CSP + HSTS; Nginx security headers; CORS origin whitelist
- Docker containers run as non-root (`nodejs:1001`)

## Before Production Deployment

Rotate all credentials before first deploy:

```bash
# Linux/Mac
chmod +x scripts/generate-credentials.sh && ./scripts/generate-credentials.sh

# Windows
scripts\generate-credentials.bat
```

Then update `.env`, GitHub Actions secrets, database password, R2 keys, and Redis password.
