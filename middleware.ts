import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // 1. Verificar si hay una sesión activa de Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');
  const isOnboardingPage = req.nextUrl.pathname.startsWith('/onboarding');

  // 2. PROTECCIÓN: Si el usuario intenta entrar a rutas protegidas sin sesión
  if ((isDashboardPage || isOnboardingPage) && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login'; // O la página donde tengas tu Auth
    return NextResponse.redirect(redirectUrl);
  }

  // 3. (Opcional) Lógica de Pago: 
  // Podrías verificar aquí si el usuario tiene una suscripción activa
  // antes de dejarlo pasar al dashboard.

  return res;
}

// Configurar en qué rutas se debe ejecutar este guardián
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding/:path*',
  ],
};
