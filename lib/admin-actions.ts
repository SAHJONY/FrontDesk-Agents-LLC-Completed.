import { createClient } from '@/utils/supabase/server';

export async function getAdminDashboardData() {
  const supabase = await createClient();

  // 1. Fetch all tenants (profiles/accounts)
  const { data: tenants, error: tenantError } = await supabase
    .from('tenants') // Ensure this matches your Supabase table name
    .select('*')
    .order('created_at', { ascending: false });

  if (tenantError) {
    console.error('Error fetching tenants:', tenantError);
    return { tenants: [], stats: { totalMrr: 0, totalAgents: 0 } };
  }

  // 2. Calculate Global Metrics
  // Summing up MRR and total AI agents across the whole platform
  const totalMrr = tenants?.reduce((sum, t) => sum + (t.mrr || 0), 0) || 0;
  const totalAgents = tenants?.reduce((sum, t) => sum + (t.agent_count || 0), 0) || 0;

  return {
    tenants: tenants || [],
    stats: {
      totalMrr,
      totalAgents,
    }
  };
}
