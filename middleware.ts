import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. Supabase Session Refresh
  await supabase.auth.getUser()

  // 2. Placeholder/Maintenance Logic
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Define paths that should ALWAYS be accessible
  const isExcludedPath = 
    path.startsWith('/api') || 
    path.startsWith('/coming-soon') || 
    path.startsWith('/login') || 
    path.startsWith('/admin') ||
    path.startsWith('/auth'); // Required for Supabase callback links

  if (isMaintenanceMode && !isExcludedPath) {
    url.pathname = '/coming-soon';
    return NextResponse.rewrite(url);
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
