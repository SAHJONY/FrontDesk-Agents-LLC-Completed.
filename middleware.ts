import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import jwt from 'jsonwebtoken';
import {locales} from './i18n';

// Create i18n middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'as-needed'
});

// Development mode bypass (set to false in production)
const DEV_MODE_BYPASS = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

// Routes that require strict authentication (owner/admin only)
const protectedRoutes = [
  '/dashboard/owner',
  '/api/owner',
  '/api/secrets',
];

// Routes that are publicly accessible (no auth required)
const publicRoutes = [
  '/',
  '/pricing',
  '/features',
  '/dashboard',
  '/dashboard/agents',
  '/dashboard/calls',
  '/settings',
];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // First, handle i18n routing
  const intlResponse = intlMiddleware(request);
  
  // If i18n middleware returns a response (redirect), use it
  if (intlResponse && intlResponse.status !== 200) {
    return intlResponse;
  }
  
  let response = intlResponse || NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Remove locale prefix from pathname for route matching
  const pathnameWithoutLocale = pathname.replace(/^\/(en|es|fr|de|it|pt|ru|zh|ja|ko|ar|hi|nl|pl|tr|vi|th|id|ms|fil|sv|no|da|fi|cs|hu|ro|uk|el|he|fa|bn|ur|ta|te|mr|gu|kn|ml|si|km|lo|my|ka|am|sw|zu|af|is|mt)/, '') || '/';

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathnameWithoutLocale === route || pathnameWithoutLocale.startsWith(route + '/')
  );

  // If route is public, allow access without auth
  if (isPublicRoute && !DEV_MODE_BYPASS) {
    return response;
  }

  // DEV MODE BYPASS: Allow all routes in development
  if (DEV_MODE_BYPASS) {
    console.log('[DEV MODE] Bypassing auth for:', pathnameWithoutLocale);
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

  // Get Supabase user
  await supabase.auth.getUser();

  // Check for JWT token in cookies
  const token = request.cookies.get('auth-token');

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathnameWithoutLocale.startsWith(route)
  );

  // Check if the route is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathnameWithoutLocale.startsWith(route)
  );

  // If accessing a protected route without a token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing an auth route with a valid token, redirect to dashboard
  if (isAuthRoute && token) {
    try {
      const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
      jwt.verify(token.value, jwtSecret);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      // Token is invalid, allow access to auth routes
      console.error('Invalid token during auth route check:', error);
    }
  }

  // Verify token for protected routes
  if (isProtectedRoute && token) {
    try {
      const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
      const decoded = jwt.verify(token.value, jwtSecret) as {
        userId: string;
        role: string;
      };

      // Check if accessing owner-only routes
      if (pathnameWithoutLocale.startsWith('/api/owner') && decoded.role !== 'OWNER') {
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
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
