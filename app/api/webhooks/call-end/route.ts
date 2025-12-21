import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.SUPABASE_URL!, 
  process.env.SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    // Extraemos datos clave del proveedor (Vapi/Bland)
    const callId = payload.call_id || payload.id;
    const clientId = payload.assistant?.metadata?.client_id; // Asegúrate de pasar esto al iniciar la llamada
    const transcript = payload.transcript || "";
    
    // Lógica de "Evidence": ¿Se agendó una cita o hubo interés alto?
    const isConverted = transcript.toLowerCase().includes("appointment confirmed") || 
                        transcript.toLowerCase().includes("agendada");

    if (isConverted && clientId) {
      // Buscamos el valor promedio del trato para este cliente
      const { data: client } = await supabase
        .from('clients')
        .select('average_deal_value')
        .eq('id', clientId)
        .single();

      // Insertamos la evidencia en el Sovereign Ledger
      await supabase
        .from('revenue_attribution')
        .insert([{
          call_id: callId,
          client_id: clientId,
          status: 'closed_won',
          estimated_deal_value: client?.average_deal_value || 0,
          conversion_timestamp: new Date().toISOString(),
          roi_impact_score: 100 // Puntuación máxima por conversión
        }]);
    }

    return NextResponse.json({ success: true, message: 'ROI Analysis Complete' });

  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
