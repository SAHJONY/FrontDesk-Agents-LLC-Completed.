import { createClient } from '@supabase/supabase-js';

// Lazy initialization to prevent build-time errors
let supabaseClient: any = null;
let supabaseServerClient: any = null;

/**
 * MOCK CLIENT: Prevents build-time crashes if keys are missing.
 * This allows 'next build' to complete even if env vars are offline.
 */
const mockClient = {
  from: () => ({
    select: () => ({ data: [], error: null, single: () => ({ data: null, error: null }) }),
    insert: () => ({ error: null }),
    update: () => ({ error: null }),
  }),
  auth: { getUser: async () => ({ data: { user: null }, error: null }) }
};

// Client for browser-side interactions
export const supabase = (() => {
  if (typeof window === 'undefined') return mockClient; // Safety for Static Generation

  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      supabaseClient = createClient(supabaseUrl, supabaseKey);
    } else {
      console.warn("⚠️ Supabase Client Keys missing. Using Mock.");
      return mockClient;
    }
  }
  return supabaseClient;
})();

// Administrative client for FrontDesk Agents server operations
export const supabaseServer = (() => {
  if (!supabaseServerClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (supabaseUrl && supabaseServiceKey) {
      supabaseServerClient = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
    } else {
      return mockClient;
    }
  }
  return supabaseServerClient;
})();
