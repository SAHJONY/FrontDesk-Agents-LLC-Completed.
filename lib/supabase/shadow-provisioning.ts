import { createServerSupabase } from './server';

export async function createShadowProfile(leadData: {
  businessName: string;
  category: string;
  phone: string;
  language?: 'en' | 'es' | 'ar';
}) {
  const supabase = await createServerSupabase();
  
  // Create a unique slug for their demo (e.g., peoples-plumbing-demo)
  const demoSlug = leadData.businessName.toLowerCase().replace(/\s+/g, '-') + '-demo';

  const { data, error } = await supabase
    .from('client_configurations')
    .upsert({
      business_name: leadData.businessName,
      industry: leadData.category,
      emergency_phone: leadData.phone,
      preferred_language: leadData.language || 'en',
      is_demo_mode: true,
      config_slug: demoSlug, // The unique URL they will visit
      autonomous_status: 'shadow_active'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
