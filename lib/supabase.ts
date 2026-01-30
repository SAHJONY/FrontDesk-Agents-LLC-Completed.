import { createClient } from "@supabase/supabase-js";

/**
 * ENV VALIDATION (fail fast in prod)
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

/**
 * Public / browser-safe client (anon key)
 */
export const supabase = createClient(
  SUPABASE_URL,
  ANON_KEY ?? "",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

/**
 * Server / admin client (service role)
 * ⚠️ NEVER expose this to the browser
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
 * User model (matches DB)
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
 * Used by /api/auth/login
 */
export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  if (!supabaseAdmin) {
    throw new Error("supabaseAdmin not initialized (missing SERVICE ROLE key)");
  }

  const { data, error } = await supabaseAdmin
    .from<AuthUser>("users")
    .select(
      `
        id,
        email,
        full_name,
        password_hash,
        role,
        tier,
        tenant_id
      `
    )
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("getUserByEmail error:", error);
    return null;
  }

  return data ?? null;
}
