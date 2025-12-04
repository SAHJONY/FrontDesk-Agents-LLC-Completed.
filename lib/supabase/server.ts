// lib/supabase/server.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Leemos las env vars necesarias
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Comprobación temprana para no tener errores silenciosos
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en las environment variables."
  );
}

/**
 * createServerSupabase
 * Devuelve un cliente de Supabase para usar en el servidor (rutas API, server components, etc.).
 * NO es una Server Action, solo un helper normal, por eso no usamos "use server" aquí.
 */
export function createServerSupabase(): SupabaseClient {
  // Si tienes SERVICE_ROLE, la usamos; si no, usamos la ANON
  const key = supabaseServiceRoleKey || supabaseAnonKey;

  const supabase = createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
    },
  });

  return supabase;
}
