// Centralized Supabase client utilities for FrontDesk Agents
// Client-side only

import { createBrowserClient } from "@supabase/ssr";

/**
 * Factory function for creating a Supabase browser client.
 * Use this inside Client Components or hooks.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Shared Supabase client instance.
 * Safe for standard client-side usage.
 */
export const supabase = createClient();

/**
 * Type-safe Supabase client type
 */
export type SupabaseClient = ReturnType<typeof createClient>;
