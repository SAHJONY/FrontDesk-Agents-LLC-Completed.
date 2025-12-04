// lib/supabase/server.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Read environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Runtime checks so TypeScript knows they're not undefined
if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
}

if (!supabaseAnonKey && !supabaseServiceRoleKey) {
  throw new Error(
    "Missing Supabase keys. Set at least NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY."
  );
}

// Normal helper (NOT a server action)
export function createServerSupabase(): SupabaseClient {
  const key = supabaseServiceRoleKey || supabaseAnonKey!;

  const supabase = createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
    },
  });

  return supabase;
}
