export async function getAdminDashboardData() {
  const supabase = await createClient();

  const { data: tenants, error: tenantError } = await supabase
    .from('tenants') 
    .select('*')
    .order('created_at', { ascending: true }); // Order by oldest to newest for the chart

  if (tenantError) return { tenants: [], stats: { totalMrr: 0, totalAgents: 0 }, chartData: [] };

  // 1. Calculate Standard Stats
  const totalMrr = tenants?.reduce((sum, t) => sum + (Number(t.mrr) || 0), 0) || 0;
  const totalAgents = tenants?.reduce((sum, t) => sum + (Number(t.agent_count) || 0), 0) || 0;

  // 2. Generate Chart Data (Grouped by Month)
  const monthlyData: Record<string, number> = {};
  
  tenants.forEach((t) => {
    const month = new Date(t.created_at).toLocaleString('default', { month: 'short', year: '2-digit' });
    monthlyData[month] = (monthlyData[month] || 0) + (Number(t.mrr) || 0);
  });

  const chartData = Object.entries(monthlyData).map(([name, revenue]) => ({
    name,
    revenue,
  }));

  return {
    tenants: [...tenants].reverse(), // Reverse for the list (newest first)
    stats: { totalMrr, totalAgents },
    chartData
  };
}
