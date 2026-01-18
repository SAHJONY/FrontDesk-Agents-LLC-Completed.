import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })
  : null;

/**
 * FETCH: Gets all data for the Admin Dashboard
 */
export async function getAdminDashboardData() {
  if (!supabaseAdmin) return { tenants: [], stats: { totalMrr: 0, totalAgents: 0 } };

  const { data, error } = await supabaseAdmin
    .from('tenants')
    .select(`
      id, name, plan, subscription_revenue, owner_id,
      agents(count)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Admin Fetch Error:', error);
    return { tenants: [], stats: { totalMrr: 0, totalAgents: 0 } };
  }

  const tenants = data.map(tenant => ({
    id: tenant.id,
    name: tenant.name,
    plan: tenant.plan || 'Free',
    mrr: Number(tenant.subscription_revenue) || 0,
    agentCount: (tenant.agents as any)?.[0]?.count || 0,
    owner_id: tenant.owner_id
  }));

  const stats = tenants.reduce((acc, curr) => ({
    totalMrr: acc.totalMrr + curr.mrr,
    totalAgents: acc.totalAgents + curr.agentCount
  }), { totalMrr: 0, totalAgents: 0 });

  return { tenants, stats };
}

/**
 * ACTION: Generates an impersonation link
 */
export async function impersonateTenant(ownerId: string) {
  if (!supabaseAdmin) throw new Error("Admin client not ready");

  const { data: user, error: uError } = await supabaseAdmin.auth.admin.getUserById(ownerId);
  if (uError || !user) throw new Error("Owner not found");

  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email: user.user.email!,
    options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard` }
  });

  if (error) throw error;
  return data.properties.action_link;
}

/**
 * UTILITY: Formats CSV
 */
export function generateTenantsCSV(tenants: any[]) {
  const headers = ["Company Name", "Plan", "MRR", "Agents", "Tenant ID"];
  const rows = tenants.map(t => [
    `"${t.name}"`,
    t.plan,
    t.mrr,
    t.agentCount,
    t.id
  ]);
  return [headers, ...rows].map(e => e.join(",")).join("\n");
}
