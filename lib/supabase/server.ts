// lib/supabase/server.ts
"use server";

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validación temprana
if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
}

export function createServerSupabase(): SupabaseClient {
  // Usamos primero la service role, si no existe usamos el anon
  const key = supabaseServiceRoleKey || supabaseAnonKey;

  if (!key) {
    throw new Error(
      "Missing Supabase key. Set SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  const supabase = createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
    },
  });

  return supabase;
}
