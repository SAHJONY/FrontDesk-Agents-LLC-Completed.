// services/automation.service.ts

/**
 * UI Support Functions
 * FIX: Added '?' to clientId to make it optional for the UI
 */
export const fetchAutomationConfig = async (clientId?: string): Promise<AutomationConfig> => {
  // Safe fallback if no ID is passed yet
  if (!clientId) {
    return { enabled: false, type: 'STANDARD', notifications: true };
  }

  const { data } = await supabase
    .from('clients')
    .select('automation_settings')
    .eq('id', clientId)
    .single();

  return data?.automation_settings || { enabled: false, type: 'STANDARD', notifications: true };
};

/**
 * FIX: Made clientId optional and updated parameters to match UI call pattern
 */
export const updateAutomationConfig = async (config: Partial<AutomationConfig>, clientId?: string) => {
  if (!clientId) return { success: true }; // Prevent crash if ID is missing

  const { error } = await supabase
    .from('clients')
    .update({ automation_settings: config })
    .eq('id', clientId);

  if (error) throw error;
  return { success: true };
};
