import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * 1. BROWSER CLIENT (Safe for Client Components)
 * This does NOT use next/headers
 */
export const supabase = createBrowserClient(SUPABASE_URL, ANON_KEY);

/**
 * 2. SERVER CLIENT (Next.js 15 Server-Only)
 * This uses a dynamic import to keep it away from Client Components
 */
export async function createClientServer() {
  const { cookies } = await import("next/headers");
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
          // Ignore: happens if called from a Server Component during render
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

// Your existing AuthUser interface...
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
