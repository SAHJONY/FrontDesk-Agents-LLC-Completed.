import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey);
}

// Database schema types
export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  name: string;
  company_name: string;
  subdomain: string;
  country: string;
  node_id: string;
  client_key: string;
  role: 'OWNER' | 'STAFF' | 'ADMIN';
  tier: 'BASIC' | 'PROFESSIONAL' | 'GROWTH' | 'ELITE';
  created_at: string;
  updated_at: string;
}

// Helper functions for common database operations
export async function getUserByEmail(email: string): Promise<User | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

export async function getUserById(id: string): Promise<User | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

export async function createUser(userData: Partial<User>): Promise<User | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  return data;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    return null;
  }

  return data;
}
