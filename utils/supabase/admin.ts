import { createClient } from '@supabase/supabase-js';

export const createClient = () => {
  return createClient(
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
