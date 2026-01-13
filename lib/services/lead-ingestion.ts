import { createServerClient } from '@/lib/supabase/server';
import { encryptSecret } from '@/lib/security/shadow-vault';
import { createHash } from 'crypto';

export async function handleLeadIngestion(leadData: any) {
  const supabase = await createServerClient(); 
  const { business_name, phone_number: _phone_number, language, direction, industry: _industry, proprietary_intelligence } = leadData;
  
  // 1. Vault the proprietary intelligence (Master Prompt/Scraper Insights)
  const encryptedDNA = encryptSecret(proprietary_intelligence);
  const fingerprint = createHash('sha256').update(proprietary_intelligence).digest('hex');

  // 2. Insert into Public Registry
  const { data: client, error: clientError } = await supabase
    .from('public_registry.clients')
    .insert([{ 
      business_name, 
      preferred_language: language || 'en',
      ui_direction: direction || 'ltr',
      is_active: false // Provisioned in "Shadow Mode"
    }])
    .select()
    .single();

  if (clientError) {
    console.error('❌ Registry Ingestion Error:', clientError.message);
    return { success: false, error: clientError.message };
  }

  // 3. Insert into Vault Core
  const { error: vaultError } = await supabase
    .from('vault_core.sovereign_logic')
    .insert([{
      client_id: client.id,
      encrypted_dna: encryptedDNA,
      logic_fingerprint: fingerprint,
      scraper_version: 'v2.5-pdx1'
    }]);

  if (vaultError) {
    console.error('❌ Vault Ingestion Error:', vaultError.message);
    return { success: false, error: vaultError.message };
  }
  
  return { success: true, clientId: client.id };
}

/**
 * SOVEREIGN BATCH PROCESSOR
 * Handles mass ingestion while maintaining zero-knowledge encryption
 */
export async function handleBatchLeads(leads: any[]) {
  let successCount = 0;
  let failedCount = 0;
  const results = [];
  
  for (const lead of leads) {
    try {
      const response = await handleLeadIngestion(lead);
      
      if (response.success) {
        successCount++;
        results.push({ success: true, business: lead.business_name, id: response.clientId });
      } else {
        failedCount++;
        results.push({ success: false, business: lead.business_name, error: response.error });
      }
    } catch (err: any) {
      failedCount++;
      results.push({ success: false, business: lead.business_name, error: err.message });
    }
  }
  
  return {
    summary: {
      success: successCount,
      failed: failedCount,
      total: leads.length,
      vault_status: 'ENCRYPTED_AES_256'
    },
    results
  };
}
