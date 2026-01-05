import { createServerClient } from '@/lib/supabase/server';

export async function shadowProvisionLead(lead: {
  name: string;
  industry: string;
  phone: string;
}) {
  const supabase = await createServerClient();

  // Create the shadow profile BEFORE you contact them
  const { data, error } = await supabase
    .from('client_configurations')
    .upsert({
      business_name: lead.name,
      industry: lead.industry,
      emergency_phone: lead.phone,
      is_demo_mode: true,
      status: 'pending_outreach',
      // Autonomously assign prompt based on industry
      system_prompt: `You are the front desk agent for ${lead.name}, a specialized ${lead.industry} provider.`
    });

  if (error) throw error;
  return data;
}
