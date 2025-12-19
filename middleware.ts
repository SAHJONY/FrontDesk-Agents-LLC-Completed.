import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { languages, defaultLanguage } from './config/languages'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. IMPROVED LANGUAGE DETECTION (Cookie first, then Browser)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const acceptLanguage = request.headers.get('accept-language');
  
  let detectedLocale = defaultLanguage;
  
  // Logic: User choice (cookie) > Browser setting > Default (en)
  if (cookieLocale && languages.some(l => l.code === cookieLocale)) {
    detectedLocale = cookieLocale;
  } else if (acceptLanguage) {
    const preferredLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
    const match = languages.find(l => l.code === preferredLang);
    if (match) detectedLocale = match.code;
  }
  
  const selectedLang = languages.find(l => l.code === detectedLocale);
  const direction = selectedLang?.dir || 'ltr';

  // 2. INITIALIZE RESPONSE
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // 3. SUPABASE SESSION HANDLER
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

  // 4. AUTH & ACCESS CONTROL
  const { data: { user } } = await supabase.auth.getUser()
  const isProtectedRoute = /^\/(dashboard|admin|settings|owner|analytics)/.test(pathname)

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // 5. GLOBAL HEADERS (Critical for the UI to flip RTL/LTR)
  response.headers.set('x-detected-locale', detectedLocale)
  response.headers.set('x-detected-dir', direction)

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
