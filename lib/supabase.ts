import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client.
 * Uses the Service Role Key for server-side operations to bypass RLS.
 */
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Prioritize Service Role Key for server-side admin tasks (creating users, etc.)
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables: Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.');
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// Export a default client instance
export const supabase = getSupabaseClient();

// --- Database Schema Types ---

export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  company_name: string;
  subdomain: string;
  country: string;
  role: 'OWNER' | 'STAFF' | 'ADMIN';
  tier: 'BASIC' | 'PROFESSIONAL' | 'GROWTH' | 'ELITE';
  created_at: string;
  updated_at: string;
}

// New interface to replace Redis agent tracking
export interface AIAgent {
  id: string;
  name: string;
  status: 'ready' | 'busy' | 'offline';
  jurisdiction: string;
  specialty: string;
  last_active: string;
}

// --- Helper Functions ---

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle(); // maybeSingle avoids errors if user isn't found

  if (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
  return data;
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
  return data;
}

export async function createUser(userData: Partial<User>): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .insert([{ ...userData, created_at: new Date().toISOString() }])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }
  return data;
}

/**
 * Fetches the active AI workforce from Supabase
 * Replaces the old Redis 'workforce-initialized' logic
 */
export async function getActiveWorkforce(): Promise<AIAgent[]> {
  const { data, error } = await supabase
    .from('ai_agents')
    .select('*')
    .eq('status', 'ready');

  if (error) {
    console.error('Error fetching workforce:', error);
    return [];
  }
  return data || [];
}
