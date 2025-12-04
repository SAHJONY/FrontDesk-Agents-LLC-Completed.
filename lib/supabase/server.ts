// lib/supabase/server.ts
"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validación sencilla para no iniciar sin config
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase config. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel."
  );
}

// Cliente Supabase para usar en el servidor
export function createServerSupabase() {
  const key = supabaseServiceRoleKey || supabaseAnonKey;

  const supabase = createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
    },
  });

  return supabase;
}
