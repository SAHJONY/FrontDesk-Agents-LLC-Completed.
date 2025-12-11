import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables securely. 
// The '!' is a non-null assertion operator, assuming you have set the variables 
// in your .env.local file or Vercel project settings.
// NEXT_PUBLIC_ is required for variables accessible on the client-side.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create and export the Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// You can now import 'supabase' in your components or API routes:
// import { supabase } from '@/lib/supabaseClient';
