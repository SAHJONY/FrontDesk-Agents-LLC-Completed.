/**
 * FRONTDESK AGENTS - VERTICAL LEAD INGESTION
 * Categorizes leads based on the specialized marketing funnel used.
 */

export async function processVerticalLead(leadData: any, source: string) {
  const { full_name, phone_number, email } = leadData;

  // 1. Tag the lead based on the vertical
  const tags = [source.toUpperCase()];
  
  // 2. Insert into Supabase with the specific source tag
  const { data, error } = await supabase
    .from('leads')
    .insert([{ 
      full_name, 
      phone_number, 
      email, 
      source_vertical: source,
      tags: tags 
    }]);

  if (error) throw error;
  
  console.log(`[Neural Engine] New lead captured from vertical: ${source}`);
  return data;
}
