# Gym Management - Local Development (No Docker)

This project contains a Node.js/Express backend (PostgreSQL + Sequelize) and a Next.js frontend. This guide helps you run and develop locally without Docker.

## Prerequisites

- Node.js 20+
- pnpm (enable with: `corepack enable pnpm`)
- PostgreSQL 13+ running locally

## 1) Backend Setup

Create `backend/.env`:

```
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=supersecretkey

DB_HOST=localhost
DB_PORT=5432
DB_NAME=gymdb
DB_USER=postgres
DB_PASSWORD=postgres
```

Install and run:

```
cd backend
pnpm install
pnpm dev
```

Seed demo data (admin/user/packages):

```
pnpm run seed
```

Health check:

- http://localhost:5000/health

Key endpoints:

- Auth
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/auth/me (auth)
  - Admin: GET /api/auth/admin/users, POST /api/auth/admin/users, POST /api/auth/admin/approve/:userId
- Profile/Membership (auth)
  - GET/PUT /api/profile/profile
  - GET /api/profile/membership
  - POST /api/profile/payment/request
  - GET /api/profile/payment/history
- Admin Membership/Payments (admin)
  - GET/POST/PUT /api/admin/packages
  - GET /api/admin/payments/pending
  - POST /api/admin/payments/:paymentId/approve|reject
  - GET /api/admin/memberships

Notes:

- Tables are auto-created via `sequelize.sync()` on server start.
- Seeding script is idempotent; you can re-run safely.

## 2) Frontend Setup

Create `frontend/.env`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
PORT=3000
NODE_ENV=development
```

Install and run:

```
cd frontend
pnpm install
pnpm dev
```

Frontend will be available at:

- http://localhost:3000

## Common Issues

- If DB connection fails, verify `backend/.env` matches your local Postgres.
- If seeds fail, run again; they skip when data exists.

## Next Steps

- Implement Attendance module (check-in/out, history, occupancy)
- Build frontend pages with Next.js app router, RTK Query, and shadcn/ui
