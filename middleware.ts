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

function isStaticOrInternal(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico")
  );
}

function isPublic(pathname: string) {
  if (isStaticOrInternal(pathname)) return true;
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

function redirectToDashboard(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/dashboard";
  return NextResponse.redirect(url);
}

/**
 * Edge-safe JWT verify (HS256) using WebCrypto.
 * Token format: header.payload.signature (base64url)
 */
function base64UrlToUint8Array(base64url: string) {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4 ? "=".repeat(4 - (base64.length % 4)) : "";
  const str = atob(base64 + pad);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return bytes;
}

function decodeBase64UrlJson(base64url: string) {
  const bytes = base64UrlToUint8Array(base64url);
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json);
}

async function verifyJwtHS256(token: string, secret: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [headerB64, payloadB64, sigB64] = parts;

  // basic header check
  const header = decodeBase64UrlJson(headerB64);
  if (!header || header.alg !== "HS256") return null;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const signature = base64UrlToUint8Array(sigB64);

  const ok = await crypto.subtle.verify("HMAC", key, signature, data);
  if (!ok) return null;

  const payload = decodeBase64UrlJson(payloadB64);

  // exp validation (seconds)
  if (payload?.exp && typeof payload.exp === "number") {
    const now = Math.floor(Date.now() / 1000);
    if (now >= payload.exp) return null;
  }

  return payload;
}

function isOwnerOrAdmin(payload: any) {
  const role = String(payload?.role || "").trim().toUpperCase();
  return role === "OWNER" || role === "ADMIN";
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isStaticOrInternal(pathname)) return NextResponse.next();

  const isPublicRoute = isPublic(pathname);

  // Keep your impersonation header pass-through behavior
  const impersonatedId = req.cookies.get("impersonated_owner_id")?.value;
  if (impersonatedId && !isPublicRoute) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-impersonated-user-id", impersonatedId);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isProtected = !isPublicRoute && (isAdminRoute || isDashboardRoute);

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("auth-token")?.value || req.cookies.get("token")?.value;
  if (!token) return redirectToLogin(req);

  const secret = process.env.JWT_SECRET;
  if (!secret) return redirectToLogin(req);

  const payload = await verifyJwtHS256(token, secret);
  if (!payload?.userId) return redirectToLogin(req);

  // Owner/Admin gate for /admin
  if (isAdminRoute && !isOwnerOrAdmin(payload)) {
    return redirectToDashboard(req);
  }

  // NOTE: Usage-limit checks should NOT be in Edge middleware if they require DB calls.
  // Do them in Node routes or server components.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
