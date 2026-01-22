import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function generateWeeklySummary(tenantId: string) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: calls } = await supabase
    .from('appointments')
    .select('*')
    .eq('tenant_id', tenantId)
    .gte('created_at', sevenDaysAgo.toISOString());

  if (!calls) return null;

  const totalCalls = calls.length;
  const emergencies = calls.filter(c => c.is_emergency).length;
  const goldLeads = calls.filter(c => c.unit_age >= 10).length;
  const totalValue = calls.reduce((sum, c) => sum + (Number(c.estimated_value) || 0), 0);

  return {
    totalCalls,
    emergencies,
    goldLeads,
    estimatedPipeline: totalValue,
    potentialRevenue: goldLeads * 10000 // Estimado de reemplazos
  };
}
