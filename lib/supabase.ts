import { createClient } from "@supabase/supabase-js";

/**
 * ENV VALIDATION
 * We use a "fail fast" approach for the URL, but a "graceful" approach 
 * for keys to prevent Vercel build failures.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  throw new Error("CRITICAL: Missing NEXT_PUBLIC_SUPABASE_URL. Check Vercel Environment Variables.");
}

/**
 * Standard Client (Browser/Public)
 * Used for RLS-restricted queries and client-side session management.
 */
export const supabase = createClient(
  SUPABASE_URL,
  ANON_KEY || "", 
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

/**
 * Admin Client (Server-Only)
 * ⚠️ WARNING: Bypasses Row Level Security (RLS). 
 * This is the "God Mode" client for the backend workforce.
 */
export const supabaseAdmin = SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

/**
 * Type Definitions
 */
export interface AuthUser {
  id: string;
  email: string;
  full_name: string | null;
  password_hash: string;
  role: string | null;
  tier: string | null;
  tenant_id: string | null;
}

/**
 * getUserByEmail (Server-Only)
 * Crucial for the custom Auth flow and Administrative impersonation.
 */
export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  // Graceful fail for build-time or misconfiguration
  if (!supabaseAdmin) {
    console.error("Supabase Admin Client not initialized. Check SERVICE_ROLE_KEY.");
    return null; 
  }

  const { data, error } = await supabaseAdmin
    .from("users")
    .select(`
        id,
        email,
        full_name,
        password_hash,
        role,
        tier,
        tenant_id
    `)
    .eq("email", email.toLowerCase().trim()) // Normalize email lookup
    .maybeSingle();

  if (error) {
    console.error("getUserByEmail Error:", error.message);
    return null;
  }

  return data as AuthUser | null;
}
