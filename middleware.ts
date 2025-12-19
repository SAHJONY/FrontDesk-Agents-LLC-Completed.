import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { languages } from './config/languages';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Skip if it's an internal file or API
  if (
    pathname.includes('.') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/_next')
  ) return;

  // 2. Get the user's preferred language from the 'Accept-Language' header
  const acceptLanguage = request.headers.get('accept-language');
  let detectedLocale = 'en'; // Default

  if (acceptLanguage) {
    // Logic to match the browser's language to our 50 supported languages
    const preferredLang = acceptLanguage.split(',')[0].split('-')[0];
    const match = languages.find(l => l.code === preferredLang);
    if (match) detectedLocale = match.code;
  }

  // 3. Set the 'dir' header based on the detected language for RTL support
  const selectedLang = languages.find(l => l.code === detectedLocale);
  const response = NextResponse.next();
  
  // CEO Move: Pass the direction and locale to the frontend via headers
  response.headers.set('x-detected-locale', detectedLocale);
  response.headers.set('x-detected-dir', selectedLang?.dir || 'ltr');

  return response;
}

export const config = {
  // Matches all request paths except for the ones starting with:
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
