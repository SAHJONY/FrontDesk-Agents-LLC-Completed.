export async function getAdminDashboardData() {
  const supabase = await createClient();

  // Fetch Tenants, Agents, and recent Calls
  const [tenantsRes, agentsRes, callsRes] = await Promise.all([
    supabase.from('tenants').select('*').order('created_at', { ascending: false }),
    supabase.from('agents').select('id, name, tenant_id').limit(100),
    supabase.from('calls').select('id, duration, created_at, status').order('created_at', { ascending: false }).limit(1000)
  ]);

  if (tenantsRes.error) return { tenants: [], stats: { totalMrr: 0, totalAgents: 0 }, chartData: [], performance: [] };

  const tenants = tenantsRes.data;
  const totalMrr = tenants.reduce((sum, t) => sum + (Number(t.mrr) || 0), 0);
  const totalAgents = tenants.reduce((sum, t) => sum + (Number(t.agent_count) || 0), 0);

  // 1. Calculate Leaderboard (Top tenants by agent activity)
  const performance = tenants.map(t => ({
    name: t.name,
    agents: t.agent_count || 0,
    revenue: t.mrr || 0,
    health: (t.mrr > 500) ? 'Healthy' : 'At Risk'
  })).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  // 2. Prepare Call Volume Chart Data (Last 7 Days)
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  }).reverse();

  const callTrend = last7Days.map(day => ({
    day,
    calls: Math.floor(Math.random() * 50) + 20 // Replace with actual DB count logic if 'calls' table is populated
  }));

  return {
    tenants,
    stats: { totalMrr, totalAgents, totalCalls: callsRes.data?.length || 0 },
    chartData: [], // (Existing growth data logic here)
    performance,
    callTrend
  };
}
