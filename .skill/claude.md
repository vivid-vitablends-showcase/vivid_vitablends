# CLAUDE.md - AI Development Context

## Project Overview

**Vivid VitaBlends** is a full-stack e-commerce platform for health products (pickles, powders, and wellness items). It has a customer-facing storefront (product browsing, cart, checkout, reviews) and an admin dashboard (products, categories, orders, reviews, messages, coming soon).

## Architecture

### High-Level

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   React SPA     │─────▶│  Express API    │─────▶│   PostgreSQL    │
│  (Frontend)     │      │   (Backend)     │      │   (Database)    │
└─────────────────┘      └─────────────────┘      └─────────────────┘
        │                        │
        │                        ├──── Redis (cache, rate limiting)
        │                        └──── Cloudflare R2 (image storage)
        ▼
    Nginx (production reverse proxy — port 8000)
```

### Monorepo Layout

```
vivid_vitablends/
├── backend/
│   ├── prisma/              # Schema (10 models) + migrations
│   └── src/
│       ├── config/          # index.js (all env vars), s3.js (R2 S3Client)
│       ├── controllers/     # HTTP lifecycle only — extract req, call service, forward errors
│       ├── middleware/      # auth.js, adminAuth.js, cache.js, rateLimiter.js, validate.js, requestLogger.js
│       ├── repositories/    # Prisma queries only — never called from controllers
│       ├── routes/          # Route + middleware binding, no logic
│       ├── schemas/         # Zod v4 validation schemas (one per resource)
│       ├── services/        # Business logic, orchestration, cache invalidation
│       ├── utils/           # jwt, password, hash, redis, r2, imageProcessor, logger, prisma, request, cacheHelper
│       └── server.js        # Express app, middleware stack, route mounting
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── admin/       # Admin panel management components
│       │   ├── ui/          # shadcn/ui components (Radix UI, ~50 components)
│       │   └── layout/      # Feature components (Header, ProductCard, HeroSection, etc.)
│       ├── config/          # contacts.ts (static contact info)
│       ├── context/         # CartContext.tsx (localStorage-backed cart)
│       ├── data/            # Static product/review data (fallback)
│       ├── hooks/           # 13 custom hooks
│       ├── lib/             # apiClient.ts, config.ts, constants.ts, storage.ts, utils.ts
│       ├── pages/           # 17 page components
│       ├── services/api/    # Fetch wrappers (one file per resource)
│       └── types/           # TypeScript interfaces
├── nginx/                   # Reverse proxy config
├── bruno/                   # API test collection
└── .github/workflows/       # ci.yml, deploy.yml
```

## Tech Stack

### Frontend

- React 18 + TypeScript 5 (strict mode, but `noImplicitAny: false` and `skipLibCheck: true`)
- Vite 5 with SWC — dev server on `localhost:8080`
- Tailwind CSS + shadcn/ui (Radix UI primitives)
- React Router v6 — `<ProtectedRoute>` for admin
- TanStack Query 5 — all server state
- React Hook Form + **Zod v3** — forms
- GSAP — splash screen and hero animations
- Vitest — tests live in `src/test/`
- Sonner — toast notifications

### Backend

- Node.js Express 4 — **ESM** (`"type": "module"` in package.json; all imports need `.js` extension)
- **Prisma 7** with `@prisma/adapter-pg` (not the default binary engine)
- PostgreSQL 16, Redis 7 (optional — graceful fallback when unavailable)
- **Zod v4** — validation (API differs from frontend's Zod v3)
- JWT HS256 only — access token 15m, refresh token 7d in httpOnly cookie
- bcryptjs (12 salt rounds), SHA256 for refresh token storage
- Sharp — image optimization before R2 upload
- Winston — structured logging (files in `backend/logs/`)

## Layered Architecture (Strict Enforcement)

```
Routes → Controllers → Services → Repositories → Prisma
```

| Layer        | Location              | Owns                                                    | Never                      |
| ------------ | --------------------- | ------------------------------------------------------- | -------------------------- |
| Routes       | `src/routes/`         | Endpoint definition, middleware binding                 | Logic, DB                  |
| Controllers  | `src/controllers/`    | Extract req body/params, format response, `next(error)` | Business logic, DB         |
| Services     | `src/services/`       | Business rules, cache invalidation, orchestration       | `req`/`res`, direct Prisma |
| Repositories | `src/repositories/`   | Prisma queries only                                     | Business logic             |
| Middleware   | `src/middleware/`     | One cross-cutting concern per file                      | State, business logic      |
| Utils        | `src/utils/`          | Pure helpers (jwt, hash, image, logger)                 | HTTP, DB, services         |
| Config       | `src/config/index.js` | All env vars with defaults                              | Hardcoded values           |

### Canonical Backend Pattern

```javascript
// routes/product.routes.js
router.post(
  "/",
  authenticate,
  requireAdmin,
  validate(createProductSchema),
  productController.create,
);

// controllers/product.controller.js
export const create = async (req, res, next) => {
  try {
    const result = await productService.create(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error); // never res.json() an error here
  }
};

// services/product.service.js
export const create = async (data) => {
  // business logic, cache invalidation
  return productRepository.create(data);
};

// repositories/product.repository.js
export const create = async (data) => {
  return prisma.product.create({ data });
};
```

### Error Shape (all endpoints)

```javascript
// Success
{ success: true, data: result }

// Error (thrown in service, forwarded by controller, resolved by global handler)
throw Object.assign(new Error('Product not found'), {
  statusCode: 404,
  code: 'PRODUCT_NOT_FOUND'
});

// Global handler response
{ success: false, message: 'Product not found', code: 'PRODUCT_NOT_FOUND' }
```

No try/catch in repositories — let errors propagate. No `console.log` anywhere — use `logger.info/warn/error`.

## Frontend Architecture

### State / Data Layers

- **UI layer** (components) — pure rendering, no API calls, no business logic
- **State layer** (hooks) — TanStack Query mutations/queries, business logic
- **Data layer** (`services/api/`) — raw fetch wrappers, no state management
- **`lib/apiClient.ts`** — authenticated fetch wrapper that handles token refresh automatically

All API calls use native `fetch` with `credentials: "include"` for cookie auth. `VITE_API_BASE_URL` (from `src/lib/config.ts`) is the base URL; empty string means same-origin (production via Nginx proxy).

### Hooks (13 custom hooks)

| Hook               | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `useAdminAuth`     | Login/logout/token management            |
| `useAdminProducts` | Product CRUD mutations                   |
| `useAdminOrders`   | Order list + status update               |
| `useAdminReviews`  | Review list + hero toggle                |
| `useProducts`      | Fetch products with filters              |
| `useCategories`    | Fetch category list                      |
| `useReviews`       | Fetch paginated reviews                  |
| `useMessageSubmit` | Contact form submission                  |
| `useReviewSubmit`  | Review form submission                   |
| `useTableFilters`  | Pagination/filter state for admin tables |
| `useDebounce`      | Debounce search inputs                   |
| `use-mobile`       | Mobile breakpoint detection              |
| `use-toast`        | Toast trigger                            |

### Cart

`CartContext.tsx` persists cart to `localStorage` key `vivid_vitablends_cart`. No server-side cart — fully stateless.

## Database Models (Prisma)

10 models in `backend/prisma/schema.prisma`:

| Model        | Key Fields / Notes                                                      |
| ------------ | ----------------------------------------------------------------------- |
| `Admin`      | `username` (unique), `password` (bcrypt), `role` ("admin")              |
| `Session`    | `refreshTokenHash` (SHA256, unique), `revoked`, `expiresAt`             |
| `Category`   | `name` (unique), `showOnHome`, `displayOrder`                           |
| `Product`    | `categoryId` (FK), `featured`, `badge`, `originalPrice`, `inStock`      |
| `Review`     | `rating` (1-5), `showInHero`                                            |
| `Message`    | `name`, `email`, `phone?`, `message`                                    |
| `User`       | `phone` (unique, 10 digits) — created at order time                     |
| `Order`      | `orderId` (VV-XXXXXX), `status` (PENDING/CONFIRMED/DELIVERED/CANCELLED) |
| `OrderItem`  | `orderId` (FK, cascade delete), `productId`, `quantity`, `price`        |
| `ComingSoon` | `name`, `image`, `displayOrder`                                         |

**Order status machine**: `PENDING → CONFIRMED → DELIVERED`, `PENDING/CONFIRMED → CANCELLED` (DELIVERED and CANCELLED are final).

## API Routes

All mounted under `/api` in `server.js`.

### Public Endpoints

```
GET  /api/health
POST /api/admin/login              rate: 5/min
POST /api/admin/refresh            rate: 10/min
GET  /api/products                 cache: 300s
GET  /api/products/featured        cache: 300s
GET  /api/products/combos          cache: 300s
GET  /api/products/:id             cache: 600s
GET  /api/categories               cache: 600s
GET  /api/categories/homepage      cache: 600s
GET  /api/reviews                  cache: 300s
GET  /api/reviews/hero             cache: 300s
POST /api/reviews                  public submission
POST /api/orders                   rate: 10/min
POST /api/messages                 rate: 5/min
GET  /api/coming-soon              cache: 300s
```

### Admin Endpoints (require `authenticate` + `requireAdmin`)

```
POST   /api/admin/logout
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
POST   /api/categories
PUT    /api/categories/:id
PUT    /api/categories/:id/homepage
PATCH  /api/reviews/:id/show-in-hero
GET    /api/orders
PATCH  /api/orders/:id/status
GET    /api/orders/user/:userId
GET    /api/messages
PUT    /api/coming-soon
```

## Validation Middleware

`src/middleware/validate.js` exports:

- `validate(schema)` — validates `req.body` with Zod schema
- `validateQuery(schema)` — validates `req.query`
- `validateParam(paramName, schema)` — validates a named route param
- `validateId` — shorthand: validates `:id` as CUID
- `validateUuid` — shorthand: validates `:id` as UUID
- `validateUserId` — shorthand: validates `:userId` as CUID

Use these on routes, not inline parsing in controllers.

## Caching

`src/middleware/cache.js` + `src/utils/cacheHelper.js`:

- Cache key pattern: `cache:METHOD:URL`
- Sets `X-Cache: HIT/MISS` response header
- Graceful bypass if Redis unavailable
- `clearCache(pattern)` called in services after mutations (POST/PUT/DELETE)

## Image Upload Flow

1. **Frontend** (ProductForm.tsx) — canvas resize to 1200×1200, convert to `data:image/...` base64
2. **Backend** (imageProcessor.js) — MIME type check, magic byte validation, 10MB limit, Sharp resize + compression
3. **Backend** (r2.js / image.service.js) — upload to Cloudflare R2, return public URL `https://pub-{R2_PUBLIC_BUCKET_ID}.r2.dev/products/{timestamp}-{random}.{ext}`

Supported formats: JPEG, PNG, WebP.

## Auth Flow

1. `POST /api/admin/login` — validates credentials, generates JWT access token + refresh token
2. Refresh token hashed (SHA256) and stored in `Session` table; raw token sent as httpOnly cookie
3. Frontend stores access token in `sessionStorage` (via `src/lib/storage.ts`)
4. `POST /api/admin/refresh` — verifies cookie, deletes old session (rotation), issues new tokens
5. `POST /api/admin/logout` — deletes session, clears cookie

Frontend `lib/apiClient.ts` handles automatic token refresh on 401 responses.

## Environment Variables

All in root `.env` (never inside `backend/` or `frontend/`).

```env
DATABASE_URL, DIRECT_URL, POSTGRES_PASSWORD
PORT, NODE_ENV
CORS_ORIGIN                    # comma-separated, e.g. http://localhost:8080
JWT_SECRET, JWT_EXPIRES_IN     # default: 15m
JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN  # default: 7d
REDIS_ENABLED                  # must be "true" — default is false
REDIS_URL, REDIS_PASSWORD, REDIS_TTL  # TTL default: 3600s
R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
R2_BUCKET_NAME, R2_PUBLIC_BUCKET_ID
VITE_API_BASE_URL              # empty string = same-origin proxy in production
VITE_WHATSAPP_NUMBER           # without leading +
```

## Naming Conventions

### Backend

- Files: `resource.layer.js` (e.g., `product.service.js`, `product.routes.js`)
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### Frontend

- Components: `PascalCase.tsx`
- Hooks: `useXxx.ts`
- Services: `xxxApi.ts`
- Types: `PascalCase` interfaces

## CI/CD

**`ci.yml`** (PRs to main):

- Frontend: `npm run lint` + `npm run test`
- Backend: `prisma generate` + `npm run format:check`

**`deploy.yml`** (push to main):

- `npm audit --audit-level=critical` + Trivy scan
- Docker multi-platform build, push to Docker Hub (`:latest` + `:SHA`)
- SSH deploy to VM via `deploy.sh`
- Health check: `GET /api/health` with 18 retries over 3 minutes
- Discord notification

## Docker (Production)

`docker-compose.prod.yml` services:

- `postgres` (PostgreSQL 16-alpine) — internal network only
- `redis` (Redis 7-alpine, password auth) — internal network only
- `backend` (Node 18, non-root user `nodejs:1001`) — port 5000 internal
- `frontend` (Nginx serving built SPA) — port 8080 internal
- `nginx` (reverse proxy) — ports 8000 HTTP / 8443 HTTPS (optional SSL)

Nginx handles: rate limiting zones, gzip, security headers, proxy to backend/frontend.

## Implementation Guidelines

### Before Writing Any Code

Provide a plan covering:

1. Files to create/modify and why
2. API spec (path, method, request, response, errors)
3. Data flow: Route → Controller → Service → Repository → DB
4. Prisma schema changes (if any)
5. Validation strategy (which Zod schema, where)
6. Cache invalidation (if applicable)

**Do not write implementation code until the plan is approved.**

### Required Patterns

- ✅ ES Modules throughout backend (`.js` extensions on all imports)
- ✅ `logger.info/warn/error` — never `console.log`
- ✅ All config via `import config from '../config/index.js'` — never hardcoded
- ✅ Prisma singleton from `import prisma from '../utils/prisma.js'`
- ✅ Errors thrown in services with `statusCode` and `code`, forwarded via `next(error)` in controllers
- ✅ Repository pattern — no Prisma outside `src/repositories/`
- ✅ `validate(schema)` middleware on routes — no inline parsing in controllers
- ✅ TanStack Query for all data fetching in frontend
- ✅ Named exports preferred over default exports in frontend

### Prohibited Patterns

- ❌ `console.log` (use logger)
- ❌ Hardcoded ports, secrets, or URLs (use config/env)
- ❌ Prisma queries in controllers or services
- ❌ Business logic in controllers
- ❌ `any` TypeScript type in frontend
- ❌ `dangerouslySetInnerHTML` in React
- ❌ Direct API calls inside React components (use hooks → services)
- ❌ New architectural patterns without prior discussion

### Final Checklist

- ☑ Layer boundaries respected
- ☑ No console.log — logger only
- ☑ No hardcoded values
- ☑ Error shape `{ success, message, code }` on all endpoints
- ☑ Prisma queries only in repositories
- ☑ Zod schema in `src/schemas/` used via `validate()` middleware
- ☑ ES module syntax, `.js` imports in backend
- ☑ Cache invalidation on mutations (if resource is cached)
- ☑ No dead code, unused imports, debug artifacts
