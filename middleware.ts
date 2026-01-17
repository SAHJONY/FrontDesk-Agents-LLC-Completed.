// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PREFIXES = [
  "/",
  "/pricing",
  "/demo",
  "/support",
  "/features",
  "/industries",
  "/solutions",
  "/legal",
  "/privacy",
  "/terms",
  "/login",
  "/signup",
  "/forgot-password",
  "/_not-found",
];

function isPublic(pathname: string) {
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/favicon")) return true;
  if (pathname.startsWith("/images")) return true;
  if (pathname.startsWith("/api")) return true; // IMPORTANT: don't auth-gate APIs here yet
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Never block public routes
  if (isPublic(pathname)) return NextResponse.next();

  // ✅ TEMPORARY: stop redirect loops until auth is stable
  // Later we will protect /dashboard and /settings only.
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
