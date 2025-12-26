import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function generateLinks() {
  const domain = "https://frontdeskagents.com"; // Your production domain

  console.log('--- 🔗 GENERATING SOVEREIGN ACTIVATION LINKS ---');

  // Fetch only leads provisioned in the last batch that are currently 'inactive'
  const { data: leads, error } = await supabase
    .from('public_registry.clients')
    .select('id, business_name, ui_direction, preferred_language')
    .eq('is_active', false);

  if (error || !leads) {
    console.error('❌ Error fetching nodes:', error?.message);
    return;
  }

  const linkManifest = leads.map(lead => {
    // Generate a secure, unique activation path
    // Format: /initialize/[ID]?lang=[LANG]&dir=[DIR]
    const activationUrl = `${domain}/initialize/${lead.id}?lang=${lead.preferred_language}&dir=${lead.ui_direction}`;
    
    return {
      Business: lead.business_name,
      Direction: lead.ui_direction.toUpperCase(),
      Language: lead.preferred_language.toUpperCase(),
      URL: activationUrl
    };
  });

  console.table(linkManifest);
  console.log(`\n✅ ${leads.length} Activation Links Generated.`);
  console.log(`⚠️  These links should be injected into your Shadow Sequence email templates.`);
}

generateLinks();
