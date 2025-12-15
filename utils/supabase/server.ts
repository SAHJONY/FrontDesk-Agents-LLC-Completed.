// ./utils/supabase/server.ts

import { createClient } from '@supabase/supabase-js';

// Usamos createClient directamente para Route Handlers si no necesitamos Auth Helpers,
// pero debemos asegurarnos de que la importación no cause problemas de default/named export.

// Importante: En un Route Handler, si no se usan las Auth Helpers,
// simplemente inicializamos el cliente con las variables de entorno.
// Sin embargo, si se requiere autenticación basada en cookies, usaríamos:
// import { cookies } from 'next/headers'
// import { createServerClient } from '@supabase/ssr'

// Suponiendo que el Route Handler de metrics NO necesita autenticación de usuario
// (solo necesita las credenciales de servicio)

export function createServiceSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Clave secreta, NO pública

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase credentials for Service Client.');
  }

  // Usamos el Service Role Key para operaciones de servidor que no están sujetas a RLS.
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}

// Si necesitas un cliente con autenticación de usuario (para RLS)
/*
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export function createAuthenticatedSupabaseClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}
*/
