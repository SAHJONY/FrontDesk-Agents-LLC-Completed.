import { jsPDF } from "jspdf";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function generateMonthlyReport(clientId: string, month: string) {
  // 1. DATA FETCHING: Recuperar la evidencia del mes
  const { data: attribution } = await supabase
    .from('revenue_attribution')
    .select('*')
    .eq('client_id', clientId)
    .gte('conversion_timestamp', `${month}-01`)
    .lte('conversion_timestamp', `${month}-31`);

  const totalRevenue = attribution?.reduce((sum, record) => sum + record.estimated_deal_value, 0) || 0;
  const totalConversions = attribution?.length || 0;

  // 2. PDF INITIALIZATION
  const doc = new jsPDF();
  
  // Estética Sovereign: Fondo oscuro y acentos Cian
  doc.setFillColor(2, 6, 23); // Slate 950
  doc.rect(0, 0, 210, 297, 'F');
  
  // 3. HEADER
  doc.setTextColor(0, 255, 255); // Cian
  doc.setFontSize(22);
  doc.text("SOVEREIGN PERFORMANCE REPORT", 20, 30);
  
  // 4. METRICAS CLAVE
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(`Total Revenue Generated: $${totalRevenue.toLocaleString()}`, 20, 60);
  doc.text(`Successful Conversions: ${totalConversions}`, 20, 70);
  
  // 5. INSIGHT DE IA (Simulado por ahora)
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text("Insight: El Nodo Vocal identificó un pico de demanda los martes a las 18:00.", 20, 100);

  return doc.save(`Report_${clientId}_${month}.pdf`);
}
