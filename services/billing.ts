import { getSupabaseAdmin } from "@/lib/supabase";
import { Plans } from './plans';
import { medicAgent } from './medic.service';

/**
 * BILLING SERVICE: The Revenue Engine
 * Manages subscriptions, regional discounts, and success fee calculations.
 */
export const billingService = {
  
  /**
   * Validates if a client has an active subscription for a specific plan
   */
  async validateSubscription(clientId: string): Promise<boolean> {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('clients')
      .select('plan_id, subscription_status')
      .eq('id', clientId)
      .single();

    if (error || !data) return false;
    
    // Ensure the status is active or trialing
    return ['active', 'trialing'].includes(data.subscription_status);
  },

  /**
   * HANDLE PAYMENT: Formerly handleWebhook
   * Processes successful payments and updates the AI CEO's context
   */
  async handlePayment(data: any) {
    console.log("[BILLING] Payment event received:", data.type);
    const supabase = getSupabaseAdmin();

    try {
      // Logic for Stripe/LemonSqueezy event handling
      if (data.type === 'checkout.session.completed') {
        const customerId = data.customer;
        const planId = data.metadata.plan_id as Plans;
        
        // Update Supabase with the new plan status
        await supabase
          .from('clients')
          .update({ 
            plan_id: planId, 
            subscription_status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_customer_id', customerId);
          
        console.log(`[BILLING] Successfully activated ${planId} plan.`);
      }

      return { success: true, received: true };
    } catch (error) {
      await medicAgent.reportIncident(error, 'Billing Payment Failure');
      return { success: false, error: "Payment processing failed" };
    }
  },

  /**
   * CALCULATE SUCCESS FEES
   * Uses the pricing logic to bill for appointments and recovered revenue
   */
  async calculateUsageBill(_clientId: string, region: string = 'WESTERN') {
    // const _plans = getAdjustedPricing(region);
    // Logic to pull rewards from the DB and apply the success fees
    // This turns your AI performance into actual monthly revenue
    return { status: 'calculating', regionMultiplierApplied: region !== 'WESTERN' };
  }
};
