import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { languages, defaultLanguage, isSupportedLanguage } from './config/languages'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  const acceptLanguage = request.headers.get('accept-language')
  
  // --- 1. LANGUAGE DETECTION ---
  let detectedLocale = defaultLanguage
  
  // Priority 1: Cookie preference (user has explicitly chosen)
  if (cookieLocale && isSupportedLanguage(cookieLocale)) {
    detectedLocale = cookieLocale
  } 
  // Priority 2: Browser's Accept-Language header
  else if (acceptLanguage) {
    const preferredLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
    if (isSupportedLanguage(preferredLang)) {
      detectedLocale = preferredLang
    }
  }

  // --- 2. URL LOCALIZATION ---
  // Check if pathname already has a valid locale prefix
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  const hasValidLocale = firstSegment && isSupportedLanguage(firstSegment)

  // Skip localization for special paths
  const isSpecialPath = 
    pathname.includes('.') || // Files with extensions
    pathname.startsWith('/api') || // API routes
    pathname.startsWith('/_next') || // Next.js internals
    pathname.startsWith('/premium') || // Static assets
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'

  if (!hasValidLocale && !isSpecialPath) {
    // Redirect to localized version
    const url = request.nextUrl.clone()
    url.pathname = `/${detectedLocale}${pathname}`
    return NextResponse.redirect(url)
  }

  // If locale in URL differs from detected locale, update cookie
  if (hasValidLocale && firstSegment !== detectedLocale) {
    detectedLocale = firstSegment
  }

  // --- 3. REGION & PRICING DETECTION ---
  const country = request.geo?.country || 'US'
  let userRegion = 'WESTERN'
  
  // Growth markets: Lower pricing tier
  const growthMarkets = ['VN', 'IN', 'PH', 'ID', 'PK', 'TH', 'BD', 'LK', 'NP']
  // Medium markets: Mid-tier pricing
  const mediumMarkets = ['TR', 'BR', 'MX', 'EG', 'CO', 'AR', 'CL', 'PE', 'ZA', 'NG', 'KE']
  
  if (growthMarkets.includes(country)) {
    userRegion = 'GROWTH'
  } else if (mediumMarkets.includes(country)) {
    userRegion = 'MEDIUM'
  }

  // --- 4. MAINTENANCE MODE CHECK ---
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'
  const isMaintenancePage = pathname.includes('/coming-soon')
  const isExcludedFromMaintenance = 
    pathname.startsWith('/api') || 
    pathname.includes('/admin') ||
    pathname.includes('/auth') ||
    isMaintenancePage

  if (isMaintenanceMode && !isExcludedFromMaintenance) {
    const url = request.nextUrl.clone()
    url.pathname = `/${detectedLocale}/coming-soon`
    return NextResponse.redirect(url)
  }

  // --- 5. SUPABASE AUTH ---
  let response = NextResponse.next({ 
    request: { 
      headers: request.headers 
    } 
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { 
          return request.cookies.getAll() 
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => 
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => 
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Get authenticated user
  const { data: { user } } = await supabase.auth.getUser()
  
  // Protected routes pattern (handles locale prefixes)
  const isProtectedRoute = /^\/(?:[a-z]{2}\/)?(dashboard|admin|settings|owner|analytics|profile)/.test(pathname)

  // --- 6. AUTH PROTECTION ---
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = `/${detectedLocale}/login`
    // Preserve the original destination for post-login redirect
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  // --- 7. RESPONSE HEADERS (for server components) ---
  const selectedLang = languages.find(l => l.code === detectedLocale)
  
  response.headers.set('x-detected-locale', detectedLocale)
  response.headers.set('x-detected-dir', selectedLang?.dir || 'ltr')
  response.headers.set('x-user-region', userRegion)
  response.headers.set('x-user-country', country)
  response.headers.set('x-user-authenticated', user ? 'true' : 'false')
  
  // Set locale cookie for future requests
  response.cookies.set('NEXT_LOCALE', detectedLocale, {
    path: '/',
    maxAge: 31536000, // 1 year
    sameSite: 'lax',
  })
  
  return response
}

export const config = {
  // Exclude static files, API routes, and Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
