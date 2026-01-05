import { createServerSupabase } from '@/lib/supabase/server';

export async function ingestShadowLead(lead: {
  name: string;
  phone: string;
  category: string;
  language?: 'en' | 'es' | 'ar';
}) {
  const supabase = await createServerSupabase();

  // 1. Generate a demo-specific prompt autonomously
  const systemPrompt = `You are the front desk agent for ${lead.name}, a ${lead.category} business. 
                        Handle inquiries about services and take messages for ${lead.phone}.`;

  // 2. Upsert into the configuration table
  const { data, error } = await supabase
    .from('client_configurations')
    .upsert({
      business_name: lead.name,
      emergency_phone: lead.phone,
      industry: lead.category,
      preferred_language: lead.language || 'en',
      system_prompt: systemPrompt,
      is_demo_mode: true, // Key flag for autonomous behavior
      status: 'pending_outreach'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
