import { createClient } from '@/utils/supabase/server';

/**
 * FIXED: Added back the old function name as a wrapper 
 * to prevent the "Import Error" in your build logs.
 */
export async function getAllTenants() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tenants:', error);
    return [];
  }
  return data || [];
}

/**
 * Main dashboard data fetcher for the Executive View
 */
export async function getAdminDashboardData() {
  const supabase = await createClient();

  // Parallel fetch for speed
  const [tenantsRes, callsRes] = await Promise.all([
    supabase.from('tenants').select('*').order('created_at', { ascending: true }),
    supabase.from('calls').select('id, created_at').limit(1000)
  ]);

  const tenants = tenantsRes.data || [];
  
  // 1. Calculate Core Stats
  const totalMrr = tenants.reduce((sum, t) => sum + (Number(t.mrr) || 0), 0);
  const totalAgents = tenants.reduce((sum, t) => sum + (Number(t.agent_count) || 0), 0);

  // 2. Generate Chart Data (Revenue by Month)
  const monthlyData: Record<string, number> = {};
  tenants.forEach((t) => {
    const month = new Date(t.created_at).toLocaleString('default', { month: 'short', year: '2-digit' });
    monthlyData[month] = (monthlyData[month] || 0) + (Number(t.mrr) || 0);
  });

  const chartData = Object.entries(monthlyData).map(([name, revenue]) => ({ name, revenue }));

  // 3. Performance Leaderboard
  const performance = [...tenants]
    .sort((a, b) => (b.mrr || 0) - (a.mrr || 0))
    .slice(0, 5)
    .map(t => ({
      name: t.name,
      agents: t.agent_count || 0,
      health: t.mrr > 500 ? 'Healthy' : 'At Risk'
    }));

  return {
    tenants: [...tenants].reverse(), // Newest first for the table
    stats: { totalMrr, totalAgents, totalCalls: callsRes.data?.length || 0 },
    chartData,
    performance,
    // Placeholder for trend logic
    callTrend: [
      { day: 'Mon', calls: 30 }, { day: 'Tue', calls: 45 }, { day: 'Wed', calls: 60 },
      { day: 'Thu', calls: 35 }, { day: 'Fri', calls: 50 }, { day: 'Sat', calls: 20 }, { day: 'Sun', calls: 15 }
    ]
  };
}
