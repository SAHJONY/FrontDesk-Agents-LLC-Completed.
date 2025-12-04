// lib/supabase/server.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Leemos las envs "crudas"
const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const rawSupabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Checks en runtime
if (!rawSupabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
}

if (!rawSupabaseAnonKey && !rawSupabaseServiceRoleKey) {
  throw new Error(
    "Missing Supabase keys. Set at least NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY."
  );
}

// Ahora las convertimos en strings "seguros" para TypeScript
const supabaseUrl: string = rawSupabaseUrl;
const supabaseKey: string =
  rawSupabaseServiceRoleKey || (rawSupabaseAnonKey as string);

// Helper normal (NO server action, NO async)
export function createServerSupabase(): SupabaseClient {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });

  return supabase;
}
