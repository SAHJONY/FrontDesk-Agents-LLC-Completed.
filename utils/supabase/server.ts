// ./utils/supabase/server.ts

import { createClient } from '@supabase/supabase-js';

/**
 * Inicializa el cliente de Supabase para operaciones de servidor (Route Handlers, Server Actions).
 * Utiliza la Service Role Key para permisos elevados, ideal para Route Handlers como /api/metrics.
 */
export function createServiceSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Clave secreta

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase credentials for Service Client.');
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false, // Es un servidor, no una sesión de navegador.
    },
  });
}
