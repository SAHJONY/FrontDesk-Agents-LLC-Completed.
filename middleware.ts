import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * MIDDLEWARE PROTOCOL - PORTLAND (pdx1) COMPLIANT
 * Purpose: Secure Owner routes and enforce English language standards.
 */

const OWNER_EMAIL = "sahjonyllc@outlook.com";

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
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
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

  const { data: { user } } = await supabase.auth.getUser()

  // 1. Secure Owner routes for the Global Revenue Workforce
  if (request.nextUrl.pathname.startsWith('/owner')) {
    if (!user || user.email !== OWNER_EMAIL) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // 2. Enforce English-only headers [cite: 2025-12-18, 2025-12-22]
  response.headers.set('Content-Language', 'en-US')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - File extensions: svg, png, jpg, jpeg, gif, webp
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
