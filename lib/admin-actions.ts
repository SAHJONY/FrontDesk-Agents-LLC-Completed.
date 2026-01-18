import { createClient } from '@/utils/supabase/server';

/**
 * Fetches just the list of tenants for the /admin/tenants page.
 * Optimized for scannability and simple list rendering.
 */
export async function getAllTenants() {
  const supabase = await createClient();
  
  const { data: tenants, error } = await supabase
    .from('tenants')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error in getAllTenants:', error);
    return [];
  }

  return tenants || [];
}

/**
 * Fetches combined data for the main Admin Overview dashboard.
 * Calculates platform-wide performance metrics.
 */
export async function getAdminDashboardData() {
  const supabase = await createClient();

  // 1. Fetch all tenants (profiles/accounts)
  const { data: tenants, error: tenantError } = await supabase
    .from('tenants') 
    .select('*')
    .order('created_at', { ascending: false });

  if (tenantError) {
    console.error('Error fetching tenants:', tenantError);
    return { 
      tenants: [], 
      stats: { totalMrr: 0, totalAgents: 0 } 
    };
  }

  // 2. Calculate Global Metrics
  // We use Number() to ensure math works even if the DB returns strings
  const totalMrr = tenants?.reduce((sum, t) => sum + (Number(t.mrr) || 0), 0) || 0;
  const totalAgents = tenants?.reduce((sum, t) => sum + (Number(t.agent_count) || 0), 0) || 0;

  return {
    tenants: tenants || [],
    stats: {
      totalMrr,
      totalAgents,
    }
  };
}
