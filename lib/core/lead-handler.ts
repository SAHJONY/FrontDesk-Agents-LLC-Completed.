import { createClient } from '@/lib/supabase/server'; // 1. Add the missing import

export async function handleLeadIngestion(leadData: any) {
  // 2. Initialize and await the client
  const supabase = await createClient(); 

  const { full_name, phone_number, source, vertical } = leadData;
  
  // 3. Insert into Supabase with the specific source tag
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
