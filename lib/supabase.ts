import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * 1. BROWSER CLIENT
 * Used for client-side components and hooks
 */
export const supabase = createClient(SUPABASE_URL, ANON_KEY);

/**
 * 2. SERVER CLIENT (Next.js 15)
 * Use this inside your API routes and Server Components.
 */
export async function createClientServer() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The setAll method was called from a Server Component.
          // This can be ignored if you have middleware refreshing sessions.
        }
      },
    },
  });
}

/**
 * 3. ADMIN CLIENT (God Mode)
 */
export const supabaseAdmin = SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

// Keep your AuthUser interface
export interface AuthUser {
  id: string;
  email: string;
  full_name: string | null;
  password_hash: string;
  role: string | null;
  tier: string | null;
  tenant_id: string | null;
}

export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("users")
    .select('id, email, full_name, password_hash, role, tier, tenant_id')
    .eq("email", email.toLowerCase().trim())
    .maybeSingle();
  
  return error ? null : (data as AuthUser);
}
