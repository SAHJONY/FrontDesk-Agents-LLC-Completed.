import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const PROTECTED_PATHS = [
  "/dashboard",
  "/dashboard/outbound",
  "/dashboard/retention",
  "/admin",
  "/ai-agents",
  "/setup",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Solo proteger paths que empiezan con alguno de PROTECTED_PATHS
  if (!PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Cargar perfil para ver rol
  const { data: profile } = await supabase
    .from("profiles")
    .select("email, role")
    .eq("id", user.id)
    .maybeSingle();

  const ownerEmail = process.env.OWNER_EMAIL;

  // DUEÑO: acceso total sin restricciones
  if (profile?.role === "owner" || profile?.email === ownerEmail) {
    return NextResponse.next();
  }

  // Tenants: por ahora dejar pasar; luego se puede filtrar por plan
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/ai-agents/:path*",
    "/setup/:path*",
  ],
};
