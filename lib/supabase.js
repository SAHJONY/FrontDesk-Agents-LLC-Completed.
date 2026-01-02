import { createClient } from '@supabase/supabase-js';

// Sovereign Global Financial Hub - Database Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Sovereign Node Warning: Missing Supabase Environment Variables');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
