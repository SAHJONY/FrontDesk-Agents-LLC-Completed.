// 1. Define the interfaces at the top of the file
export interface LeadData {
  full_name: string;
  phone_number: string;
  vertical: 'plumbing' | 'hvac' | 'electrical';
  priority?: 'priority_1' | 'priority_2' | 'priority_3';
  source?: string;
}

export interface LeadResponse {
  success: boolean;
  leadId?: string;
  error?: string;
  message?: string;
}

// 2. Your existing function will now recognize these types
export async function handleLead(leadData: LeadData): Promise<LeadResponse> {
  try {
    const { full_name: _full_name, phone_number: _phone_number, vertical: _vertical, priority: _priority = 'priority_2' } = leadData;
    
    // ... rest of your logic
    return { success: true, leadId: "some-id", message: "Lead captured successfully" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
