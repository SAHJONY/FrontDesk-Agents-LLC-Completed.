import { supabaseServer } from '@/lib/supabase/client';
const supabaseAdmin = supabaseServer;

export async function generateDailyPulse() {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  // 1. Fetch Ingestion Metrics
  const { count: scrapedLeads } = await supabaseAdmin
    .from('public_registry.clients')
    .select('*', { count: 'exact', head: true })
    .gt('created_at', yesterday);

  // 2. Fetch Conversion Metrics
  const { count: activatedNodes } = await supabaseAdmin
    .from('public_registry.clients')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
    .gt('updated_at', yesterday);

  // 3. Aggregate Vaulted Value
  // Summing the recovery_potential stored in public_registry metadata
  const { data: valueData } = await supabaseAdmin
    .rpc('calculate_total_vaulted_value'); 

  return {
    scrapedLeads,
    activatedNodes,
    totalVaultedValue: valueData,
    timestamp: new Date().toISOString()
  };
}
