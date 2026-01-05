import { createServerClient } from '@/lib/supabase/server';

export async function sendAutonomousOutreach(clientId: string) {
  const supabase = await createServerClient(); // Await is mandatory in Next.js 15

  // Fetch the shadow profile we built from the Greensheet/Global sources
  const { data: config } = await supabase
    .from('client_configurations')
    .select('business_name, preferred_language, industry')
    .eq('client_id', clientId)
    .single();

  if (config) {
    // Logic to trigger SMS/Email based on the preferred_language (en/es/ar)
    // The system autonomously selects the template matching their industry
    console.log(`Deploying ${config.industry} outreach for ${config.business_name}`);
  }
}
