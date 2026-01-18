# FrontDesk Agents — Login Fix Pack (Real Code)

Production-grade authentication stabilization pack for the **FrontDesk Agents** platform.  
This update fixes infinite login redirects, session instability, and middleware auth loops in a **Next.js App Router** environment.

---

## 📚 Table of Contents
- [Overview](#overview)
- [What This Pack Fixes](#what-this-pack-fixes)
- [Included Files](#included-files)
- [Environment Variables (Required)](#environment-variables-required)
- [Supabase Requirements](#supabase-requirements)
- [How to Apply](#how-to-apply)
- [Security Notes](#security-notes)
- [Contributing](#contributing)
- [Security](#security)

---

## Overview

This pack contains **real production-ready code**, not placeholders.

It is designed to:
- Stop infinite redirects to `/login`
- Stabilize session handling
- Ensure cookies are set correctly in Vercel
- Keep public/marketing pages accessible at all times
- Prepare the platform for proper dashboard protection later

---

## What This Pack Fixes

1. **Middleware Stability**
   - Prevents auth gating on public routes
   - Avoids infinite redirect loops
   - Allows APIs during debugging to prevent broken flows

2. **Login API**
   - `POST /api/auth/login`
   - Uses **Supabase Service Role Key** (server-side only)
   - Queries `users` table directly
   - Validates passwords using `bcrypt`
   - Issues signed JWT access + refresh tokens
   - Sets secure, HTTP-only cookies

3. **Session APIs**
   - `/api/auth/me`
   - `/api/auth/session`
   - Reads JWT from cookies
   - Returns authenticated user state for the UI

---

## Included Files

Drop-in replacements (same paths):

```txt
middleware.ts
app/api/auth/login/route.ts
app/api/auth/me/route.ts
app/api/auth/session/route.ts
lib/auth/jwt.ts
