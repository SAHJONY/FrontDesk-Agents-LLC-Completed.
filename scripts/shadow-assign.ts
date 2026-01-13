import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import csv from 'csv-parser';

// 1. Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// 2. The Assignment Engine
async function assignLeadsToNode(csvFilePath: string, businessId: string) {
  const results: any[] = [];

  console.log(`🛡️  Starting Lead Assignment for Business ID: ${businessId}`);

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      // Map your CSV headers to your DB columns
      results.push({
        business_id: businessId,
        full_name: data.name || data.full_name,
        phone_number: data.phone || data.phone_number,
        vertical: data.industry || 'hvac',
        source: 'outbound-blitz-v1',
        status: 'new',
        is_encrypted: true,
        assigned_persona: 'Sara' // Default persona
      });
    })
    .on('end', async () => {
      console.log(`📊 Parsed ${results.length} leads. Injecting into Shadow Vault...`);

      // Bulk Insert (Supabase handles up to 1000 at a time easily)
      const { error } = await supabase
        .from('leads')
        .insert(results);

      if (error) {
        console.error('❌ Injection Failed:', error.message);
      } else {
        console.log('✅ Success! All leads assigned and ready for outreach.');
      }
    });
}

// 3. Execution (Usage)
// Get your Business ID from the CEO Quick-View SQL
const TARGET_BUSINESS_ID = 'TU-ID-DE-BUSINESS-AQUI'; 
assignLeadsToNode('./leads_houston_hvac.csv', TARGET_BUSINESS_ID);
