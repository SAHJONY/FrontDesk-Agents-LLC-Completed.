// lib/supabaseClient.ts

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[supabaseClient] Falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "La integración con Supabase no funcionará correctamente en runtime."
  );
}

// Cliente público (lado cliente y server-safe)
export const supabase: SupabaseClient = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);

// SERVICE ROLE (solo backend)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Si no hay service role, degradamos a supabase normal para no romper el build
export const supabaseAdmin: SupabaseClient =
  serviceRoleKey && supabaseUrl
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      })
    : supabase;
