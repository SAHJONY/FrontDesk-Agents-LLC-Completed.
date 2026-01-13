import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // 1. Obtener todos los clientes activos
  const { data: clients } = await supabase
    .from('clients')
    .select('id, company_name, email')
    .eq('status', 'active');

  if (!clients) return new Response("No active clients found");

  // 2. Ciclo de generación y envío
  for (const client of clients) {
    // Llamamos a la lógica de generación que definimos en lib/reports/monthly-pdf.ts
    // Nota: En producción, esto se puede subir como una función de servidor dedicada.
    console.log(`Generando reporte para: ${client.company_name}`);
    
    // Aquí se integraría el envío vía Resend o SendGrid
    // await sendEmailWithReport(client.email, client.id);
  }

  return new Response("Monthly reports triggered successfully");
})
