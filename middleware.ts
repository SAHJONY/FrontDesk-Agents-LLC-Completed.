import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { languages, defaultLanguage } from './config/languages'

/**
 * CEO GLOBAL MIDDLEWARE
 * Handles:
 * 1. Authentication Persistence (Supabase SSR)
 * 2. Protected Route Redirects (/admin, /dashboard, etc.)
 * 3. Worldwide Language Detection (50+ Languages)
 * 4. RTL/LTR Direction Logic
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. LANGUAGE & DIRECTION DETECTION
  const acceptLanguage = request.headers.get('accept-language')
  let detectedLocale = defaultLanguage
  
  if (acceptLanguage) {
    // Detect the primary language code (e.g., 'en', 'es', 'ar')
    const preferredLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
    const match = languages.find(l => l.code === preferredLang)
    if (match) detectedLocale = match.code
  }
  
  const selectedLang = languages.find(l => l.code === detectedLocale)
  const direction = selectedLang?.dir || 'ltr'

  // 2. INITIALIZE RESPONSE OBJECT
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 3. SUPABASE SESSION HANDLER (Strictly Typed for Vercel)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        // Explicitly typed to pass the 'any' type error in Vercel
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // 4. AUTHENTICATION & ACCESS CONTROL
  // getUser() is more secure than getSession() as it validates against the database
  const { data: { user } } = await supabase.auth.getUser()

  const isProtectedRoute = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/settings') ||
    pathname.startsWith('/owner') ||
    pathname.startsWith('/analytics')

  // Redirect to login if a protected page is accessed without a session
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    // CEO Move: Store the intended destination to redirect back after login
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // 5. SET GLOBAL HEADERS
  // These are picked up by app/layout.tsx to set <html lang="..." dir="...">
  response.headers.set('x-detected-locale', detectedLocale)
  response.headers.set('x-detected-dir', direction)

  return response
}

// MATCHING CONFIGURATION
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public assets (png, jpg, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
