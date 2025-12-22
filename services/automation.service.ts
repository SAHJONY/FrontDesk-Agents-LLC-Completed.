// services/automation.service.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Define the interface the UI is looking for
export interface AutomationConfig {
  enabled: boolean;
  type: 'COMMISSION' | 'STANDARD';
  notifications: boolean;
}

/**
 * UI Support Functions
 */
export const fetchAutomationConfig = async (clientId: string): Promise<AutomationConfig> => {
  const { data } = await supabase.from('clients').select('automation_settings').eq('id', clientId).single();
  return data?.automation_settings || { enabled: false, type: 'STANDARD', notifications: true };
};

export const updateAutomationConfig = async (clientId: string, config: Partial<AutomationConfig>) => {
  const { error } = await supabase.from('clients').update({ automation_settings: config }).eq('id', clientId);
  if (error) throw error;
  return { success: true };
};

/**
 * Main Service Object
 */
export const automationService = {
  setupCommissionModel: async (clientId: string, option: string) => {
    // ... logic from before
    return { success: true };
  },
  triggerPanic: async (reason: string) => {
    return { success: true, reason };
  }
};
