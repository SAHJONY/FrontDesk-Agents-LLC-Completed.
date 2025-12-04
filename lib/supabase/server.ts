// lib/supabase/server.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)"
  );
}

export function getSupabaseServerClient(): SupabaseClient {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = getSupabaseServerClient();

export type SupabaseServerClient = typeof supabase;

// Alias por si en algún sitio usan createServerClient()
export function createServerClient(): SupabaseClient {
  return getSupabaseServerClient();
}
