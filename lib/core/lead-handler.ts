import { createServerSupabase } from '@/lib/supabase/server';

/**
 * SOVEREIGN LEAD INGESTION
 * Updated to support Human-First Identity tracking and Vault Encryption
 */

export async function handleLeadIngestion(leadData: any) {
  const supabase = await createServerSupabase(); 
  const { 
    full_name, 
    phone_number, 
    source, 
    vertical, 
    assigned_persona // Track which 'Human' agent handled this
  } = leadData;
  
  const { data, error } = await supabase
    .from('leads')
    .insert([{ 
      full_name, 
      phone_number, 
      source, 
      vertical,
      assigned_persona: assigned_persona || 'Sara', // Defaults to your lead human persona
      status: 'new',
      is_encrypted: true, // Signal for Shadow Vault encryption
      created_at: new Date().toISOString()
    }])
    .select();
  
  if (error) {
    console.error('❌ Sovereign Lead Ingestion Error:', error.message);
    return { success: false, error: error.message };
  }
  
  return { success: true, leadId: data[0].id };
}

/**
 * BATCH LEAD PROCESSING (SHADOW SEQUENCE)
 * Used by the global scraper to populate the vault at scale
 */
export async function handleBatchLeads(leads: any[], _systemBotId?: string) {
  const supabase = await createServerSupabase();
  
  let successCount = 0;
  let failedCount = 0;
  const results = [];
  
  for (const lead of leads) {
    try {
      const { 
        full_name, 
        phone_number, 
        source, 
        vertical, 
        notes, 
        metadata,
        assigned_persona 
      } = lead;
      
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          full_name,
          phone_number,
          source: source || 'automated-scraper',
          vertical: vertical || 'general',
          assigned_persona: assigned_persona || 'Alex', // Default outbound persona
          notes: notes || null,
          metadata: metadata || null,
          status: 'new',
          is_encrypted: true,
          created_at: new Date().toISOString()
        }])
        .select();
      
      if (error) {
        console.error(`❌ Vault Failure for ${full_name}:`, error.message);
        failedCount++;
        results.push({ success: false, lead: full_name, error: error.message });
      } else {
        successCount++;
        results.push({ success: true, lead: full_name, leadId: data[0].id });
      }
    } catch (err: any) {
      console.error(`❌ Error processing lead:`, err.message);
      failedCount++;
      results.push({ success: false, lead: lead.full_name, error: err.message });
    }
  }
  
  return {
    success: successCount,
    failed: failedCount,
    total: leads.length,
    results
  };
}
