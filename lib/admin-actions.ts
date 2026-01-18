import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })
  : null;

export async function getAllTenants() {
  if (!supabaseAdmin) return [];

  const { data, error } = await supabaseAdmin
    .from('tenants')
    .select(`
      id,
      name,
      plan,
      subscription_revenue,
      owner_id,
      agents(count)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch error:', error);
    return [];
  }

  return data.map(tenant => ({
    id: tenant.id,
    name: tenant.name,
    plan: tenant.plan || 'Free',
    mrr: tenant.subscription_revenue || 0,
    agentCount: (tenant.agents as any)?.[0]?.count || 0,
    owner_id: tenant.owner_id
  }));
}

export async function impersonateTenant(ownerId: string) {
  if (!supabaseAdmin) throw new Error("Admin client not ready");

  // Generate a 1-hour magic link for the specific tenant owner
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
