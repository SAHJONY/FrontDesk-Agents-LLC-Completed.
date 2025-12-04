// lib/supabase/server.ts
"use server";

import { createClient } from "@supabase/supabase-js";

// Tomamos la config desde las ENV VARIABLES de Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validación básica para no romper en runtime sin configuración
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase config. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel."
  );
}

/**
 * createServerSupabase
 * Cliente Supabase para usar en el servidor (API routes, server components).
 * Si existe SERVICE ROLE, lo usa; si no, usa el ANON KEY.
 */
export function createServerSupabase() {
  const key = supabaseServiceRoleKey || supabaseAnonKey;

  const supabase = createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
    },
  });

  return supabase;
}
