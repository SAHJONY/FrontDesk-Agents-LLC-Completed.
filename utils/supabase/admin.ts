import { createClient as originalCreateClient } from '@supabase/supabase-js';

export const createAdminClient = () => {
  return originalCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // This key allows bypassing RLS
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};
