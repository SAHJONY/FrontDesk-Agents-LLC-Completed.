// lib/supabase/client.ts
// Centralized Supabase client (placeholder-safe)

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-key"
  );
}

export const supabase = createClient();

export type SupabaseClient = ReturnType<typeof createClient>;
