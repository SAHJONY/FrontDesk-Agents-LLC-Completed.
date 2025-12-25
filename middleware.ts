import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { languages, defaultLanguage, isSupportedLanguage } from './config/languages'

// FIX: Define a custom type to allow geo-detection at the Edge
interface SovereignRequest extends NextRequest {
  geo?: {
    country?: string;
    city?: string;
    region?: string;
  };
}

export async function middleware(request: SovereignRequest) {
  const { pathname } = request.nextUrl
  
  // FIX: Access geo properties safely via the extended interface
  const country = request.geo?.country || 'US' 
  const city = request.geo?.city || 'Global'
  
  // --- 1. THE GEOGRAPHIC CHAMELEON: MARKET DETECTION ---
  // We serve any customer as if it is a local platform
  let userRegion = 'WESTERN'
  const growthMarkets = ['VN', 'IN', 'PH', 'ID', 'PK', 'TH', 'BD', 'LK', 'NP']
  const mediumMarkets = ['TR', 'BR', 'MX', 'EG', 'CO', 'AR', 'CL', 'PE', 'ZA', 'NG', 'KE']
  
  if (growthMarkets.includes(country)) userRegion = 'GROWTH'
  else if (mediumMarkets.includes(country)) userRegion = 'MEDIUM'

  // --- 2. LANGUAGE & LOCALE DETECTION ---
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  const acceptLanguage = request.headers.get('accept-language')
  
  let detectedLocale = defaultLanguage
  if (cookieLocale && isSupportedLanguage(cookieLocale)) {
    detectedLocale = cookieLocale
  } else if (acceptLanguage) {
    const preferredLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
    if (isSupportedLanguage(preferredLang)) {
      detectedLocale = preferredLang
    }
  }

  // --- 3. URL LOCALIZATION ENFORCEMENT ---
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  const hasValidLocale = firstSegment && isSupportedLanguage(firstSegment)

  const isSpecialPath = 
    pathname.includes('.') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/premium') || 
    ['/favicon.ico', '/robots.txt', '/sitemap.xml'].includes(pathname)

  if (!hasValidLocale && !isSpecialPath) {
    const url = request.nextUrl.clone()
    url.pathname = `/${detectedLocale}${pathname}`
    return NextResponse.redirect(url)
  }

  // --- 4. MAINTENANCE & ACCESS CONTROL ---
  if (process.env.MAINTENANCE_MODE === 'true') {
    const isExcluded = pathname.startsWith('/api') || pathname.includes('/admin') || pathname.includes('/auth') || pathname.includes('/coming-soon')
    if (!isExcluded) {
      const url = request.nextUrl.clone()
      url.pathname = `/${detectedLocale}/coming-soon`
      return NextResponse.redirect(url)
    }
  }

  // --- 5. AUTH & SOVEREIGN SECURITY (Supabase SSR) ---
  let response = NextResponse.next({
    request: { headers: request.headers }
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  
  const isAdminRoute = /^\/(?:[a-z]{2}\/)?(admin|owner|analytics)/.test(pathname)
  const isProtectedRoute = /^\/(?:[a-z]{2}\/)?(dashboard|settings|profile)/.test(pathname)

  if (!user && (isProtectedRoute || isAdminRoute)) {
    const url = request.nextUrl.clone()
    url.pathname = `/${detectedLocale}/login`
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  if (isAdminRoute && user?.id !== process.env.ADMIN_OWNER_ID) {
    const url = request.nextUrl.clone()
    url.pathname = '/404' 
    return NextResponse.redirect(url)
  }

  // --- 6. NEURAL LOCALIZATION HEADERS ---
  const selectedLang = languages.find(l => l.code === detectedLocale)
  
  response.headers.set('x-detected-locale', detectedLocale)
  response.headers.set('x-detected-dir', selectedLang?.dir || 'ltr')
  response.headers.set('x-user-region', userRegion)
  response.headers.set('x-user-country', country)
  response.headers.set('x-user-city', city)
  
  response.cookies.set('NEXT_LOCALE', detectedLocale, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
  })
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
