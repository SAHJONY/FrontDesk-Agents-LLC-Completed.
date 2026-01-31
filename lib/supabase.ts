import { createClient } from "@supabase/supabase-js";

/**
 * ENV VALIDATION (fail fast in prod)
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL) {
  throw new Error("CRITICAL: Missing NEXT_PUBLIC_SUPABASE_URL. Check Vercel Environment Variables.");
}

/**
 * Public / browser-safe client (anon key)
 * Used for client-side Auth and RLS-protected queries.
 */
export const supabase = createClient(
  SUPABASE_URL,
  ANON_KEY ?? "",
  {
    auth: {
      persistSession: true, // Set to true if using for client-side auth state
      autoRefreshToken: true,
    },
  }
);

/**
 * Server / admin client (service role)
 * ⚠️ NEVER expose this to the browser.
 * Bypasses Row Level Security (RLS).
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
 * In a production app, these should ideally be generated via 'supabase gen types'
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
 * Fetch user by email (SERVER ONLY)
 * Used by /api/auth/login and the Supreme AI Commander for tenant verification.
 */
export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  // Guard clause to prevent runtime crashes if the admin client is missing
  if (!supabaseAdmin) {
    console.error("Supabase Admin Client failed to initialize. Check SUPABASE_SERVICE_ROLE_KEY.");
    throw new Error("Server configuration error.");
  }

  const { data, error } = await supabaseAdmin
    .from("users") // v2 uses .from("table") then casts with "as unknown as AuthUser" or uses Database types
    .select(`
        id,
        email,
        full_name,
        password_hash,
        role,
        tier,
        tenant_id
    `)
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("getUserByEmail database error:", error.message);
    return null;
  }

  return data as AuthUser | null;
}
