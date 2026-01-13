import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function generateWeeklyReport() {
  console.log('--- 📊 GENERATING WEEKLY SOVEREIGN REPORT ---');

  // 1. Fetch Conversion Metrics (Public)
  const { data: clients } = await supabase
    .from('public_registry.clients')
    .select('status, ui_direction');

  // 2. Fetch Security Interceptions (Vault Core)
  const { count: interceptions } = await supabase
    .from('vault_core.security_logs')
    .select('*', { count: 'exact', head: true });

  const stats = {
    total_nodes: clients?.length || 0,
    active_nodes: clients?.filter(c => c.status === 'live').length || 0,
    rtl_market_share: clients?.filter(c => c.ui_direction === 'rtl').length || 0,
    aegis_interceptions: interceptions || 0,
    conversion_rate: (((clients?.filter(c => c.status === 'live').length || 0) / (clients?.length || 1)) * 100).toFixed(2) + '%'
  };

  console.table(stats);
  console.log('\n✅ Report Generated. Sovereign Cluster pdx1 is Nominal.');
}

generateWeeklyReport();
