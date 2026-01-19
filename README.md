# FrontDesk Agents — Regenerated Production Pack (Auth + Marketing + Landing)

This ZIP is a **drop‑in patch pack** designed for the existing repo structure of:
`SAHJONY/FrontDesk-Agents-LLC-Completed`

It contains **real Next.js App Router code** to:
- Stabilize authentication (stop redirect/login loops)
- Provide a consistent session/me surface for the UI
- Add the Fortune‑500 style **/marketing** page + landing pricing section

> Important: I cannot export your *entire* GitHub repository from here (I don’t have direct access to it). This pack contains **all modified/added files** (auth + marketing + landing + middleware) in the **correct repo paths**, so you can unzip on top of your repo and commit.

---

## What’s inside

### 1) Middleware (no auth loops)
- `middleware.ts`
  - Never gates public routes
  - Treats Next internals/static assets as public
  - Temporarily allows non‑public while you validate session stability

### 2) Auth API (server‑side, JWT cookies)
- `app/api/auth/login/route.ts`
  - Validates email/password against your `users` table
  - Issues JWT access + refresh
  - Sets **HTTP‑only cookies** (plus compatibility cookie aliases)

- `app/api/auth/me/route.ts`
- `app/api/auth/session/route.ts`
- `app/api/auth/logout/route.ts`

### 3) JWT helper
- `lib/auth/jwt.ts`

### 4) Marketing page + assets
- `app/marketing/page.tsx`
- `public/images/marketing/*` (cinematic images)

### 5) Landing pricing section (location-based)
- `app/page.tsx`

---

## Required ENV (Vercel)
Set these in **Vercel → Project → Settings → Environment Variables** for **Production + Preview**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`

Optional (only if you call OpenAI server-side):
- `OPENAI_API_KEY`

---

## Supabase expectations
Table: `users`

Minimum columns:
- `id`
- `email`
- `password_hash`

Optional columns used if present:
- `full_name`
- `role` (e.g., `OWNER`, `admin`, etc.)
- `tier`
- `tenant_id`

---

## How to apply (safe)
1. **Unzip** this pack at the **repo root** (same level as `app/`, `public/`, `middleware.ts`).
2. **Commit** the changes to GitHub.
3. Verify **Vercel ENV vars** exist and are correct.
4. Redeploy.

---

## Quick validation checklist
- `POST /api/auth/login` returns `success: true` for a real user.
- Browser has `auth-token` (HTTP-only) set after login.
- `GET /api/auth/me` returns the user object.
- `/marketing` loads with images.
- `/` shows the Location‑Based Pricing section.

