import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();

  // 1. Proteger la ruta /admin (SOLO PARA TI)
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (session?.user.email !== 'Sahjonyllc@outlook.com') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // 2. Proteger el /dashboard (Para cualquier usuario logueado)
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
