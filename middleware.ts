import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { languages } from './config/languages'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. Language Detection Logic
  const acceptLanguage = request.headers.get('accept-language')
  let detectedLocale = 'en'
  if (acceptLanguage) {
    const preferredLang = acceptLanguage.split(',')[0].split('-')[0]
    const match = languages.find(l => l.code === preferredLang)
    if (match) detectedLocale = match.code
  }
  const selectedLang = languages.find(l => l.code === detectedLocale)

  // 2. Initialize Response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 3. Supabase Client with Explicit Types for Vercel Build
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // CEO Fix: We use the explicit mapping to avoid 'any' type errors
          cookiesToSet.forEach(({ name, value, options }) => {
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

  // 4. Refresh session & Protect Routes
  const { data: { user } } = await supabase.auth.getUser()

  const isProtectedRoute = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/settings') ||
    pathname.startsWith('/owner')

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 5. Finalize Headers
  response.headers.set('x-detected-locale', detectedLocale)
  response.headers.set('x-detected-dir', selectedLang?.dir || 'ltr')

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
