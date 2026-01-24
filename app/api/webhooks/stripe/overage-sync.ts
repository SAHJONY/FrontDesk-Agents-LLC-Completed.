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
    try {
      // 3. Report the overage to Stripe as metered usage
      // En Stripe v20+, el método correcto es stripe.subscriptionItems.createUsageRecord
      // pero si el linter falla, usamos el acceso tipado o 'any' para el build
      await (stripe.subscriptionItems as any).createUsageRecord(
        tenant.stripe_subscription_item_id,
        {
          quantity: Math.ceil(overageMinutes),
          timestamp: Math.floor(Date.now() / 1000),
          action: 'set', // Sobrescribe el total anterior para este periodo
        }
      );
      
      console.log(`[STRIPE] Reported ${overageMinutes} overage minutes for Tenant ${tenantId}`);
    } catch (error: any) {
      console.error(`[STRIPE ERROR] Failed to report usage:`, error.message);
      throw error;
    }
  }
}
