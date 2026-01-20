import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function reportOverage(tenantId: string) {
  // 1. Fetch current usage vs tier limit
  const { data: tenant } = await supabaseAdmin
    .from('tenants')
    .select('stripe_subscription_item_id, used_minutes, max_minutes, tier')
    .eq('id', tenantId)
    .single();

  if (!tenant || !tenant.stripe_subscription_item_id) return;

  // 2. Calculate excess minutes
  const overageMinutes = Math.max(0, tenant.used_minutes - tenant.max_minutes);

  if (overageMinutes > 0) {
    // 3. Report the overage to Stripe as metered usage
    // Stripe will multiply this by the $0.30-$0.45 rate defined in the Product
    await stripe.subscriptionItems.createUsageRecord(
      tenant.stripe_subscription_item_id,
      {
        quantity: Math.ceil(overageMinutes),
        timestamp: Math.floor(Date.now() / 1000),
        action: 'set', // Overwrites the previous total for this period
      }
    );
    
    console.log(`[STRIPE] Reported ${overageMinutes} overage minutes for Tenant ${tenantId}`);
  }
}
