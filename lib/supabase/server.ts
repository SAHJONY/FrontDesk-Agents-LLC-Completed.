// lib/supabase/server.ts
import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js";

// Read environment variables
const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const rawSupabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Runtime checks
if (!rawSupabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
}
if (!rawSupabaseAnonKey && !rawSupabaseServiceRoleKey) {
  throw new Error(
    "Missing Supabase keys. Set at least NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY."
  );
}

// Convert to safe strings for TypeScript
const supabaseUrl: string = rawSupabaseUrl;
const supabaseKey: string =
  rawSupabaseServiceRoleKey || (rawSupabaseAnonKey as string);

// Main helper function
export function createServerSupabase(): SupabaseClient {
  const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
  return supabase;
}

// Export with both names for compatibility
export const createClient = createServerSupabase;
