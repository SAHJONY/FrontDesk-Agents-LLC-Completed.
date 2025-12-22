// services/automation.service.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Internal helper stubs
const metricsService = {
  enablePerformanceTracking: async (id: string) => console.log("Metrics:", id),
};
const billingService = {
  setupUsageBasedBilling: async (id: string, type: string) => console.log("Billing:", type),
};

/**
 * Unified Automation Service
 */
export const automationService = {
  /**
   * Commission Logic
   */
  async setupCommissionModel(clientId: string, option: string) {
    if (option === 'COMMISSION') {
      await metricsService.enablePerformanceTracking(clientId);
      await billingService.setupUsageBasedBilling(clientId, 'PER_APPOINTMENT');
    }
    return { success: true };
  },

  /**
   * FIX: This method MUST be inside this object to resolve the Webhook Type Error
   */
  async triggerPanic(reason: string): Promise<any> {
    console.error(`!!! SECURITY ALERT: ${reason} !!!`);
    // Return a structured object or Response as the webhook expects
    return { 
      success: true, 
      protocol: 'PANIC_MODE_ACTIVATED', 
      reason 
    };
  },

  /**
   * Standard methods for dashboard
   */
  async getRules(userId: string) {
    const { data } = await supabase.from('automation_rules').select('*').eq('user_id', userId);
    return data || [];
  }
};
