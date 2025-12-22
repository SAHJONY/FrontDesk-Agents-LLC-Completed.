// services/automation.service.ts
import { createClient } from '@supabase/supabase-js';
// Note: If you have these files, import them. If not, we use the stubs below.
// import { metricsService } from './metrics.service'; 
// import { billingService } from './billing';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// STUBS: These prevent the "Cannot find name" errors during the Portland build
const metricsService = {
  enablePerformanceTracking: async (clientId: string) => {
    console.log(`Performance tracking enabled for ${clientId}`);
  }
};

const billingService = {
  setupUsageBasedBilling: async (clientId: string, type: string) => {
    console.log(`Usage billing (${type}) set for ${clientId}`);
  }
};

// ... keep your existing interfaces (AutomationRule, etc.)

export const automationService = {
  // ... keep all your existing methods (createRule, getRules, executeRule, etc.)

  /**
   * FIX: Added this method to resolve the 'metricsService' and 'billingService' 
   * type errors found in the Portland build logs.
   */
  async configureCommissionModel(clientId: string, option: string) {
    if (option === 'COMMISSION') {
      // Activa el rastreo detallado
      await metricsService.enablePerformanceTracking(clientId);
      // Configura cobro por cita
      await billingService.setupUsageBasedBilling(clientId, 'PER_APPOINTMENT');
    } else {
      console.log("Standard billing model active");
    }
    return { success: true };
  },

  /**
   * Handles incoming security alerts from the webhook
   */
  async triggerPanic(reason: string): Promise<any> {
    console.error(`!!! SECURITY ALERT: ${reason} !!!`);
    return { success: true, protocol: 'PANIC_MODE_ACTIVATED', reason };
  }
};
