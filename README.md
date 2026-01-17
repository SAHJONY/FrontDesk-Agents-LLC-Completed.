FrontDesk Agents — Build + Auth Loop Fix Pack

What this fixes
1) Login loop / session_expired redirects on public pages
- Updated middleware.ts so PUBLIC routes never redirect to /login.
- Temporarily allows non-public routes while you debug session validation.

2) Build error: `ReferenceError: motion is not defined` when building `/`
- Most likely root cause: `"use client";` was not the very first statement in app/page.tsx.
- Apply the included patch to remove the leading comment line so Next.js correctly treats the page as a Client Component.

How to apply
A) Replace your repo middleware.ts with the middleware.ts in this zip.
B) Apply patches/app-page.patch (or manually delete the first line `// app/page.tsx` so `"use client";` is first).
C) Redeploy on Vercel.

AUTH_DEBUG
- Set AUTH_DEBUG=1 in Vercel Project Env Vars (Preview + Production) to see middleware logs.
- Where it appears: Vercel deployment logs / Function logs for requests hitting middleware.
