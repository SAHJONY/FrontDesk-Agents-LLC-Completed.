import { requireSupabaseServer } from '@/lib/supabase-server';

export async function checkAccess(tenantId: string) {
  const supabase = requireSupabaseServer();

  // 1. Fetch current subscription and usage data
  const { data: tenant, error } = await supabase
    .from('tenants')
    .select('subscription_status, usage_seconds, max_seconds, tier')
    .eq('id', tenantId)
    .single();

  if (error || !tenant) {
    return { allowed: false, reason: 'Tenant not found' };
  }

  // 2. Check if the payment status is healthy
  if (tenant.subscription_status !== 'active') {
    return { allowed: false, reason: 'Payment required' };
  }

  // 3. Check if they have remaining minutes
  const remainingSeconds = (tenant.max_seconds || 0) - (tenant.usage_seconds || 0);
  
  if (remainingSeconds <= 0) {
    return { allowed: false, reason: 'Usage limit reached' };
  }

  return { 
    allowed: true, 
    remainingMinutes: Math.floor(remainingSeconds / 60),
    tier: tenant.tier 
  };
}
