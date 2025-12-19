// lib/supabase/client.ts
// Centralized Supabase client utilities for the FrontDesk Agents infrastructure

import { createBrowserClient } from '@supabase/ssr';

/**
 * Creates a Supabase browser client for client-side operations
 * Use this in client components ('use client')
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Type-safe Supabase client instance
 * Import this when you need type inference
 */
export type SupabaseClient = ReturnType<typeof createClient>;
