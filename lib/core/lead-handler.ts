import { createClient } from '@/lib/supabase/server';

export async function handleLeadIngestion(leadData: any) {
  const supabase = await createClient(); 
  const { full_name, phone_number, source, vertical } = leadData;
  
  // Insert into Supabase with the specific source tag
  const { data, error } = await supabase
    .from('leads')
    .insert([{ 
      full_name, 
      phone_number, 
      source, 
      vertical,
      status: 'new',
      created_at: new Date().toISOString()
    }])
    .select();
  
  if (error) {
    console.error('❌ Lead Ingestion Error:', error.message);
    return { success: false, error: error.message };
  }
  
  return { success: true, leadId: data[0].id };
}

// New function for batch lead processing
export async function handleBatchLeads(leads: any[], systemBotId?: string) {
  const supabase = await createClient();
  
  let successCount = 0;
  let failedCount = 0;
  const results = [];
  
  for (const lead of leads) {
    try {
      const { full_name, phone_number, source, vertical, notes, metadata } = lead;
      
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          full_name,
          phone_number,
          source: source || 'automated-scraper',
          vertical: vertical || 'general',
          notes: notes || null,
          metadata: metadata || null,
          status: 'new',
          created_at: new Date().toISOString()
        }])
        .select();
      
      if (error) {
        console.error(`❌ Failed to insert lead ${full_name}:`, error.message);
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
