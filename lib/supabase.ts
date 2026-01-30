import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client.
 * Uses the Service Role Key for server-side operations to bypass RLS.
 */
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables: Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.');
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    // OPTIMIZED: High-throughput config for real-time workforce monitoring
    realtime: {
      params: {
        eventsPerSecond: 20, 
      },
    },
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

export interface AIAgent {
  id: string;
  name: string;
  status: 'ready' | 'busy' | 'offline' | 'training';
  jurisdiction: string;
  specialty: string;
  last_active: string;
  efficiency_score?: number;
}

// --- Helper Functions ---

/**
 * FIXED: Explicitly exported to resolve Vercel build warning in /api/auth/login.
 * Fetches user profile from the 'users' table.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
  return data;
}

/**
 * Updates an agent's status and broadcasts to the Neural Command Center.
 */
export async function updateAgentStatus(agentId: string, status: AIAgent['status']) {
  const { error } = await supabase
    .from('ai_agents')
    .update({ 
      status, 
      last_active: new Date().toISOString() 
    })
    .eq('id', agentId);

  if (error) console.error('Failed to update agent status:', error);
}

/**
 * Retrieves specific user metadata by ID.
 */
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

/**
 * Provisions a new user in the system.
 */
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
 * Fetches the active AI workforce. 
 * Powers the real-time grid view on the /ai-agents page.
 */
export async function getActiveWorkforce(): Promise<AIAgent[]> {
  const { data, error } = await supabase
    .from('ai_agents')
    .select('*')
    .neq('status', 'offline')
    .order('last_active', { ascending: false });

  if (error) {
    console.error('Error fetching workforce:', error);
    return [];
  }
  return data || [];
}
