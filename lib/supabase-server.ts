/**
 * Server-side Supabase Client Helper
 * Safely initializes Supabase client with proper error handling
 */

import { createClient } from '@supabase/supabase-js';

/**
 * Get Supabase client for server-side operations
 * Returns null if environment variables are not configured
 */
export function getSupabaseServer() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables not configured');
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Get Supabase client or throw error
 * Use this when Supabase is required for the operation
 */
export function requireSupabaseServer() {
  const client = getSupabaseServer();
  
  if (!client) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
  }
  
  return client;
}
