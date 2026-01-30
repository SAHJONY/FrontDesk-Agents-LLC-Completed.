import { createClient } from "@supabase/supabase-js";

/* ------------------------------------------------------------------ */
/* Environment validation                                             */
/* ------------------------------------------------------------------ */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}
if (!SUPABASE_ANON_KEY) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
}
if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
}

/* ------------------------------------------------------------------ */
/* Public Supabase client (safe)                                      */
/* ------------------------------------------------------------------ */

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

/* ------------------------------------------------------------------ */
/* Admin Supabase client (SERVER ONLY)                                */
/* ------------------------------------------------------------------ */

const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface AuthUser {
  id: string;
  email: string;
  full_name: string | null;
  role: string | null;
  tier: string | null;
  tenant_id: string | null;
  password_hash: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * SERVER ONLY
 * Used by: /api/auth/login
 */
export async function getUserByEmail(
  email: string
): Promise<AuthUser | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select(
      `
        id,
        email,
        full_name,
        role,
        tier,
        tenant_id,
        password_hash
      `
    )
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (error) {
    console.error("getUserByEmail error:", error);
    throw new Error("Failed to fetch user by email");
  }

  return data ?? null;
}
