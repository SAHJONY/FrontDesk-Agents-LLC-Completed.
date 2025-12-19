// Centralized Supabase client utilities for FrontDesk Agents
// Client-side only

import { createBrowserClient } from "@supabase/ssr";

/**
 * GO_LIVE switch
 * Set to true ONLY at final deployment step
 */
const GO_LIVE = false;

/**
 * Placeholder credentials (pre–go-live)
 * These prevent accidental real connections during staging/builds
 */
const PLACEHOLDER_URL = "https://SUPABASE_URL_PLACEHOLDER.supabase.co";
const PLACEHOLDER_ANON_KEY = "SUPABASE_ANON_KEY_PLACEHOLDER";

/**
 * Factory function for creating a Supabase browser client.
 * Use this inside Client Components or hooks.
 */
export function createClient() {
  return createBrowserClient(
    GO_LIVE
      ? process.env.NEXT_PUBLIC_SUPABASE_URL!
      : PLACEHOLDER_URL,
    GO_LIVE
      ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      : PLACEHOLDER_ANON_KEY
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
