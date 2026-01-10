import { createClient } from '@supabase/supabase-js';

// Lazy initialization to prevent build-time errors
let supabaseClient: ReturnType<typeof createClient> | null = null;
let supabaseServerClient: ReturnType<typeof createClient> | null = null;

// Client for browser-side interactions
export const supabase = (() => {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      supabaseClient = createClient(supabaseUrl, supabaseKey);
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
    }
  }
  return supabaseServerClient;
})();
