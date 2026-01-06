import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/settings',
  '/api/owner',
  '/api/billing',
];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

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
    pathname.startsWith(route)
  );

  // Check if the route is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
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
      if (pathname.startsWith('/api/owner') && decoded.role !== 'OWNER') {
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
