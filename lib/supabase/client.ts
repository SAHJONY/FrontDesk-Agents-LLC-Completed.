// lib/supabase/client.ts
// Centralized Supabase client utilities for FrontDesk Agents
// Client-side only

import { createBrowserClient } from "@supabase/ssr";

/**
 * Safely read env vars with placeholders to avoid build-time crashes.
 * These will be replaced before go-live.
 */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";

const SUPABASE_ANON_KEY = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "public-anon-key-placeholder";

/**
 * Factory function for creating a Supabase browser client.
 * Use this inside Client Components or hooks.
 */
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
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
