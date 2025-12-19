import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { languages, defaultLanguage } from './config/languages'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  const acceptLanguage = request.headers.get('accept-language')
  
  let detectedLocale = defaultLanguage
  if (cookieLocale && languages.some(l => l.code === cookieLocale)) {
    detectedLocale = cookieLocale
  } else if (acceptLanguage) {
    const preferredLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
    const match = languages.find(l => l.code === preferredLang)
    if (match) detectedLocale = match.code
  }
  
  const selectedLang = languages.find(l => l.code === detectedLocale)
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const isProtectedRoute = /^\/(dashboard|admin|settings|owner|analytics)/.test(pathname)

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  response.headers.set('x-detected-locale', detectedLocale)
  response.headers.set('x-detected-dir', selectedLang?.dir || 'ltr')
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
