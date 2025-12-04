// lib/supabase/server.ts
"use server";    

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Le decimos explícitamente a TS que pueden venir undefined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;

// Validación temprana para no vivir engañados
if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
}

// Cliente Supabase para usar en el servidor (server actions / rutas API)
export async function createServerSupabase(): Promise<SupabaseClient> {
  // Elegimos primero la service role, si no existe usamos el anon
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
