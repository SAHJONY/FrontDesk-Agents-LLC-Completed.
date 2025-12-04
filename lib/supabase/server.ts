// lib/supabase/server.ts
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase para usar en rutas API y componentes server-side.
 * Usa las mismas variables que ya configuraste en Vercel:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }
  if (!anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  // Cliente de servicio básico (para lecturas/escrituras estándar)
  const supabase = createClient(url, anonKey);

  return supabase;
}
