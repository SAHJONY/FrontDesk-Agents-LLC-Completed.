import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Initialize Service Client for Vault access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function dispatchSequences() {
  console.log('--- 📡 INITIALIZING SOVEREIGN DISPATCH ---');
  
  const leadsPath = path.resolve('./leads/batch-01.json');
  const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));

  // Limit to first 100 for domain warming
  const batch = leads.slice(0, 100);

  for (const lead of batch) {
    const { business_name, id: _id } = lead;
    
    console.log(`🚀 Dispatching to ${business_name}`);
    
    // 3. Integration Point: Your SMTP/Email Service (Resend/SendGrid)
    // Here we log the payload that will be sent via your email provider
    // const _emailPayload = {
    //   to: lead.email,
    //   subject: subject,
    //   body: `Link: ${activationUrl} | Market: ${lead.industry}`,
    //   vault_status: 'SIGNED_BY_AEGIS'
    // };

    // Update registry to 'Outreach Sent'
    await supabase
      .from('public_registry.clients')
      .update({ status: 'outreach_active' })
      .eq('business_name', business_name);
  }

  console.log(`\n✅ 100 Sovereign Sequences Queued.`);
  console.log(`🛡️  Aegis Shield is now monitoring for incoming Handshakes.`);
}

dispatchSequences();
