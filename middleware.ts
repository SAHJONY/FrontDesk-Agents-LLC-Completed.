import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Owner email - exempt from all billing and tier checks
const OWNER_EMAIL = 'frontdeskllc@outlook.com';

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
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/logout',
  '/api/auth/me',
  '/api/webhooks',
];

// Owner-only routes
const ownerRoutes = [
  '/dashboard/owner',
  '/api/owner',
];

// Check if route is public
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  });
}

// Check if route is owner-only
function isOwnerRoute(pathname: string): boolean {
  return ownerRoutes.some(route => pathname.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Allow public routes without authentication
  if (isPublicRoute(pathname)) {
    return response;
  }

  // Initialize Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Get Supabase session
  await supabase.auth.getUser();

  // Check for JWT token in cookies
  const token = request.cookies.get('auth-token');

  // If no token and accessing protected route, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify JWT token
  try {
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
    const decoded = jwt.verify(token.value, jwtSecret) as {
      userId: string;
      email: string;
      role: string;
    };

    // Owner email bypass - skip all checks
    if (decoded.email === OWNER_EMAIL) {
      // Owner has access to everything
      return response;
    }

    // Check owner-only routes
    if (isOwnerRoute(pathname) && decoded.role !== 'owner') {
      return NextResponse.json(
        { error: 'Forbidden - Owner access required' },
        { status: 403 }
      );
    }

    // Token is valid, allow access
    return response;

  } catch (error) {
    // Token is invalid, redirect to login
    console.error('Token verification failed:', error);
    
    // Clear invalid token
    response.cookies.delete('auth-token');
    
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    loginUrl.searchParams.set('error', 'session_expired');
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
