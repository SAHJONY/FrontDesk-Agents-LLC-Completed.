import { supabaseAdmin } from '@/lib/supabase-admin';

async function auditNode(tenantId: string) {
  const { data: node, error } = await supabaseAdmin
    .from('tenants')
    .select('tier, used_minutes, max_minutes, tier_label')
    .eq('id', tenantId)
    .single();

  if (error || !node) {
    console.error("❌ Node not found in Infrastructure.");
    return;
  }

  // Revenue Mapping based on your $149 - $1,999 tiers
  const pricing: any = { 
    'Starter': 149, 
    'Professional': 499, 
    'Growth': 999, 
    'Enterprise': 1999 
  };

  const revenue = pricing[node.tier] || 0;
  const usagePercentage = ((node.used_minutes / node.max_minutes) * 100).toFixed(2);
  
  // Assuming a base AI cost of $0.08/min for calculation
  const estimatedCost = node.used_minutes * 0.08;
  const netMargin = revenue - estimatedCost;

  console.log(`
  [ NODE AUDIT: ${node.tier_label} ]
  -----------------------------------------
  Capacity:      ${node.used_minutes.toFixed(1)} / ${node.max_minutes} mins
  Utilization:   ${usagePercentage}%
  
  Monthly Rev:   $${revenue}
  Est. AI Cost:  $${estimatedCost.toFixed(2)}
  -----------------------------------------
  NET MARGIN:    $${netMargin.toFixed(2)}
  -----------------------------------------
  `);
}

// Usage: node audit-node.js <tenant_id>
