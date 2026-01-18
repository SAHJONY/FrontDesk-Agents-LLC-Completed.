import { createClient } from '@supabase/supabase-js';

// Initialize the Admin Client
// This bypasses Row Level Security (RLS) - NEVER use NEXT_PUBLIC_ prefix for the service key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Fail gracefully if environment variables are missing during build time
const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

/**
 * Fetches all tenants across the entire platform.
 * Only works on the server side.
 */
export async function getAllTenants() {
  if (!supabaseAdmin) {
    console.warn("Admin Client not initialized: Missing SUPABASE_SERVICE_ROLE_KEY");
    return [];
  }

  const { data, error } = await supabaseAdmin
    .from('tenants')
    .select(`
      id,
      name,
      plan,
      subscription_revenue,
      agents (count)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching master tenant list:', error);
    return [];
  }

  // Format the data for the UI components
  return data.map((tenant: any) => ({
    id: tenant.id,
    name: tenant.name,
    plan: tenant.plan || 'Free',
    mrr: tenant.subscription_revenue || 0,
    // Accessing the count from the nested agents join
    agentCount: tenant.agents?.[0]?.count || 0,
  }));
}

/**
 * Generates a magic link or secure session for a specific tenant
 * (Future Impersonation Logic)
 */
export async function getImpersonationUrl(tenantId: string) {
    // Logic for generating admin access to a specific tenant goes here
}
