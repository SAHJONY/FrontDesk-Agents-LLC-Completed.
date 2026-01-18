import { createClient } from '@supabase/supabase-js';

// 1. Initialize with Service Role Key (Server-side ONLY)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Avoid crashing during Next.js build if env vars aren't loaded yet
const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

export async function getAllTenants() {
  if (!supabaseAdmin) {
    console.warn("Supabase Admin not initialized. Check your SUPABASE_SERVICE_ROLE_KEY.");
    return [];
  }

  const { data, error } = await supabaseAdmin
    .from('tenants')
    .select(`
      id,
      name,
      plan,
      subscription_revenue,
      agents(count)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching master tenant list:', error);
    return [];
  }

  // 2. Format the data to match your TenantOverview props
  return data.map(tenant => {
    // Supabase returns count as an array: [{ count: 0 }]
    const rawCount = tenant.agents as unknown as { count: number }[];
    const agentCount = rawCount?.[0]?.count || 0;

    return {
      id: tenant.id,
      name: tenant.name,
      plan: tenant.plan || 'Free',
      mrr: tenant.subscription_revenue || 0,
      agentCount: agentCount
    };
  });
}
