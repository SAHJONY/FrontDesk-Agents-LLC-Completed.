import { createServerClient } from '@/lib/supabase/server';

export async function checkBillingGuard(clientId: string) {
  // FIX: In Next.js 15, server clients must be awaited
  const supabase = await createServerClient();
  
  // 1. Obtener el límite mensual y el gasto actual del cliente
  const { data: config, error } = await supabase
    .from('client_billing_configs')
    .select('monthly_limit, current_spend, status')
    .eq('client_id', clientId)
    .single();

  if (error || !config) return { allowed: false, reason: 'Config not found' };

  // 2. Simple logic to prevent over-dispatched costs
  const isWithinLimit = config.current_spend < config.monthly_limit;
  const isActive = config.status === 'active';

  return {
    allowed: isWithinLimit && isActive,
    currentSpend: config.current_spend,
    limit: config.monthly_limit
  };
}
