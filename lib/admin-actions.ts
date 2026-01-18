export async function getAdminDashboardData() {
  if (!supabaseAdmin) return { tenants: [], stats: { totalMrr: 0, totalAgents: 0 } };

  const { data, error } = await supabaseAdmin
    .from('tenants')
    .select(`
      id, name, plan, subscription_revenue, owner_id,
      agents(count)
    `)
    .order('created_at', { ascending: false });

  if (error) return { tenants: [], stats: { totalMrr: 0, totalAgents: 0 } };

  const tenants = data.map(tenant => ({
    id: tenant.id,
    name: tenant.name,
    plan: tenant.plan || 'Free',
    mrr: Number(tenant.subscription_revenue) || 0,
    agentCount: (tenant.agents as any)?.[0]?.count || 0,
    owner_id: tenant.owner_id
  }));

  // Aggregate stats for the Header
  const stats = tenants.reduce((acc, curr) => ({
    totalMrr: acc.totalMrr + curr.mrr,
    totalAgents: acc.totalAgents + curr.agentCount
  }), { totalMrr: 0, totalAgents: 0 });

  return { tenants, stats };
}
