import { jsPDF } from "jspdf";
import { createServerClient } from '@/lib/supabase/server'; // Use your secure internal client

export async function generateMonthlyReport(clientId: string) {
  const supabase = await createServerClient(); // Await the client for Next.js 15
  
  // 1. Fetch the data for the PDF
  const { data: metrics } = await supabase
    .from('monthly_stats')
    .select('*')
    .eq('client_id', clientId)
    .single();

  const doc = new jsPDF();
  doc.text("FrontDesk Agents LLC - Monthly Revenue Report", 10, 10);
  doc.text(`Total Leads Protected: ${metrics?.leads_count || 0}`, 10, 20);
  
  // Return as a Buffer or Base64 for the API response
  return doc.output('arraybuffer');
}
