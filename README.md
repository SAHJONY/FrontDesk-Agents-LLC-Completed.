FrontDesk Agents — Login Fix Pack (Upload to GitHub)

What this pack does
1) Stops middleware redirect loops (public routes are always allowed)
2) Ensures /api/auth/login sets an HTTP-only auth-token cookie
3) Adds /api/auth/me that validates auth-token via JWT_SECRET
4) Adds a compatibility stub for /api/auth/session to prevent silent false-auth

Required ENV variables (Vercel Project Settings → Environment Variables)
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- JWT_SECRET
Optional
- AUTH_DEBUG=1   (temporary, for server logs)

Critical alignment requirement
Your frontend must validate auth via /api/auth/me (JWT cookie), NOT via supabase sb-* cookies.
If your UI currently calls /api/auth/session, update it to /api/auth/me.
