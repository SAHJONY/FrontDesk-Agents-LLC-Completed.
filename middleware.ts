// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * PUBLIC ROUTES
 * Everything here MUST be accessible without auth
 */
const PUBLIC_ROUTES = [
  "/",
  "/pricing",
  "/demo",
  "/support",
  "/terms",
  "/privacy",
  "/login",
  "/signup",
];

/**
 * Allow static & Next internals
 */
function isPublic(pathname: string) {
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/favicon")) return true;
  if (pathname.startsWith("/images")) return true;
  return PUBLIC_ROUTES.includes(pathname);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Public pages: DO NOT TOUCH
  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  /**
   * 🔒 Private area (future)
   * For now, we ALLOW access to avoid login loop
   * until auth is fully wired.
   */
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
