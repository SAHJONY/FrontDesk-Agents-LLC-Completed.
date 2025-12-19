import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

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
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. Refresh session - Crucial for "Infrastructure" stability
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Maintenance Logic
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'
  const path = request.nextUrl.pathname

  // Logic: If in maintenance and not on an excluded path, send to /coming-soon
  const isExcludedPath = 
    path.startsWith('/api') || 
    path.startsWith('/coming-soon') || 
    path.startsWith('/login') || 
    path.startsWith('/admin') ||
    path.startsWith('/auth') ||
    path === '/coming-soon'

  if (isMaintenanceMode && !isExcludedPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/coming-soon'
    return NextResponse.redirect(url)
  }

  // 3. Protected routes - Admin access control
  if (path.startsWith('/admin') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', path)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  // This matcher excludes static files and images to keep your infrastructure fast
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
