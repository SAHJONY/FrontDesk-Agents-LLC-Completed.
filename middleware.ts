import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { languages, defaultLanguage } from './config/languages'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  const acceptLanguage = request.headers.get('accept-language')
  
  // --- 1. LANGUAGE DETECTION ---
  let detectedLocale = defaultLanguage
  if (cookieLocale && languages.some(l => l.code === cookieLocale)) {
    detectedLocale = cookieLocale
  } else if (acceptLanguage) {
    const preferredLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
    const match = languages.find(l => l.code === preferredLang)
    if (match) detectedLocale = match.code
  }

  // --- 2. URL LOCALIZATION (The missing piece) ---
  // Check if the current pathname is missing a locale prefix (e.g., /dashboard vs /en/dashboard)
  const pathnameIsMissingLocale = languages.every(
    (lang) => !pathname.startsWith(`/${lang.code}/`) && pathname !== `/${lang.code}`
  );

  if (pathnameIsMissingLocale) {
    // Redirect to the detected locale version of the page
    return NextResponse.redirect(
      new URL(`/${detectedLocale}${pathname}${request.nextUrl.search}`, request.url)
    );
  }

  // --- 3. REGION & PRICING DETECTION ---
  const country = request.geo?.country || 'US';
  let userRegion = 'WESTERN'; 
  const growthMarkets = ['VN', 'IN', 'PH', 'ID', 'PK', 'TH'];
  const mediumMarkets = ['TR', 'BR', 'MX', 'EG', 'CO'];
  
  if (growthMarkets.includes(country)) userRegion = 'GROWTH';
  else if (mediumMarkets.includes(country)) userRegion = 'MEDIUM';

  // --- 4. SUPABASE AUTH ---
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
  
  // Updated protected routes check to handle locale prefixes (e.g., /en/admin)
  const isProtectedRoute = /^\/(?:[a-z]{2}\/)?(dashboard|admin|settings|owner|analytics)/.test(pathname)

  // --- 5. PROTECTION LOGIC ---
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    // Redirect to the localized login page
    url.pathname = `/${detectedLocale}/login`
    return NextResponse.redirect(url)
  }

  // --- 6. HEADERS ---
  const selectedLang = languages.find(l => l.code === detectedLocale)
  response.headers.set('x-detected-locale', detectedLocale)
  response.headers.set('x-detected-dir', selectedLang?.dir || 'ltr')
  response.headers.set('x-user-region', userRegion)
  response.headers.set('x-user-country', country)
  
  return response
}

export const config = {
  // Do not run middleware on static files or API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
