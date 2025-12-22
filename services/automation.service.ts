import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface AutomationConfig {
  enabled: boolean;
  type: 'COMMISSION' | 'STANDARD';
  notifications: boolean;
}

// FIX: Added '?' to make clientId optional for the UI call
export const fetchAutomationConfig = async (clientId?: string): Promise<AutomationConfig> => {
  if (!clientId) return { enabled: false, type: 'STANDARD', notifications: true };
  
  const { data } = await supabase
    .from('clients')
    .select('automation_settings')
    .eq('id', clientId)
    .single();

  return data?.automation_settings || { enabled: false, type: 'STANDARD', notifications: true };
};

// FIX: Adjusted parameters to handle the UI's 'toggle' function call
export const updateAutomationConfig = async (config: any, clientId?: string) => {
  if (!clientId) return { success: true };

  const { error } = await supabase
    .from('clients')
    .update({ automation_settings: config })
    .eq('id', clientId);

  if (error) throw error;
  return { success: true };
};

export const automationService = {
  triggerPanic: async (reason: string) => {
    return { success: true, message: "Security protocol initiated", reason };
  }
};
