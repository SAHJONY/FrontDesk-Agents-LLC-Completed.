# FrontDesk Agents — Login Fix Pack (real code)

This ZIP contains actual Next.js App Router files to stabilize auth and stop middleware redirect loops.

## What it does
1) **Middleware:** prevents auth gating on public routes (so no infinite redirects).
2) **Login API:** `/app/api/auth/login/route.ts` uses **Supabase service role** to query your `users` table, validates `bcrypt` password, and sets `auth-token` + `refresh-token` **HTTP-only cookies**.
3) **Session/Me APIs:** `/app/api/auth/session` + `/app/api/auth/me` read `auth-token` and return auth state for the UI.

## Drop-in file list
- `middleware.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/me/route.ts`
- `app/api/auth/session/route.ts`
- `lib/auth/jwt.ts`

## Required Vercel ENV VARS
Set these in **Vercel Project → Settings → Environment Variables** (Production + Preview):

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`

## Supabase table expectation
Table: `users`
Columns (minimum):
- `id`
- `email`
- `password_hash`
Optional (used if present): `full_name`, `role`, `tier`, `tenant_id`

## How to apply
1) Copy each file into the same path in your repo (replace existing files).
2) Ensure your UI calls `POST /api/auth/login` and then routes to the `redirectUrl` returned by the API.
3) Redeploy.

## Notes
- In production, this pack **fails closed** if `JWT_SECRET` is missing.
- Middleware is intentionally conservative (no hard blocking) to avoid loops while you validate the UI flow.
