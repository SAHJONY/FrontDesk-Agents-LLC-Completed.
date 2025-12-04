// lib/supabase/server.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validamos envs una sola vez al cargar el módulo
if (!supabaseUrl) {
  throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseServiceRoleKey && !supabaseAnonKey) {
  throw new Error(
    "Missing env: SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

/**
 * createServerSupabase
 * Helper para usar Supabase en rutas / server components.
 * La marcamos async para que Next no se queje con el mensaje
 * “Server actions must be async functions”.
 */
export async function createServerSupabase() {
  const key = supabaseServiceRoleKey || supabaseAnonKey!;

  const supabase = createClient(supabaseUrl!, key, {
    auth: {
      persistSession: false,
    },
  });

  return supabase;
}
