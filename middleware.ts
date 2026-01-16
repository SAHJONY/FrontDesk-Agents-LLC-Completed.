import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/pricing',
  '/terms',
  '/privacy',
  '/features',
  '/industries',
  '/solutions',
  '/support',
  '/legal',
  '/demo',
  '/demo-login',
  '/onboarding',
];

// Routes that MUST be protected (owner/ops areas)
const protectedPrefixes = ['/owner', '/dashboard', '/admin'];

// Check if route is public
function isPublicRoute(pathname: string): boolean {
  // API routes are always public (they handle their own auth)
  if (pathname.startsWith('/api/')) return true;

  return publicRoutes.some(route => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  });
}

// Check if route is protected
function isProtectedRoute(pathname: string): boolean {
  return protectedPrefixes.some(prefix => pathname === prefix || pathname.startsWith(prefix + '/'));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Allow public routes without authentication
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Only enforce auth for protected areas (prevents accidental lockouts)
  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  // Check if user has auth session cookie (aligned with backend)
  // IMPORTANT: this must match the cookie set by /api/auth/login
  const token = request.cookies.get('fd_owner_session');

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    url.searchParams.set('error', 'session_expired');
    return NextResponse.redirect(url);
  }

  // Token exists, allow request to proceed
  // Note: Token validation happens in API routes, not in middleware
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
