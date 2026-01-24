import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

/**
 * NOTA: La importación de '@/lib/mail/notifications' causaba error de build.
 * Se ha sustituido por lógica interna para asegurar el despliegue.
 */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { call_id, transcript, recording_url, duration, to, from } = body;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!, 
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Análisis con IA (GPT-4o-mini)
    let analysis = {
      summary: "No transcript available.",
      sentiment: "Neutral",
      is_lead: false
    };

    if (transcript) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { 
            role: "system", 
            content: `Analyze the transcript and return ONLY a JSON object: 
            {
              "summary": "one sentence summary",
              "sentiment": "Positive | Neutral | Frustrated",
              "is_lead": true/false
            }
            Base "is_lead" on whether they want to book, buy, or schedule.` 
          },
          { role: "user", content: transcript }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = completion.choices[0].message.content;
      if (content) analysis = JSON.parse(content);
    }

    // 2. Obtener información del Tenant (Cliente)
    const { data: phoneData } = await supabase
      .from('phone_numbers')
      .select(`tenant_id, tenants (email, name)`)
      .eq('phone_number', to)
      .single();

    const tenantInfo = phoneData?.tenants as any;

    // 3. Guardar registro detallado en Supabase
    await supabase.from('call_logs').upsert({
      tenant_id: phoneData?.tenant_id,
      call_id,
      customer_number: from,
      transcript,
      recording_url,
      duration,
      summary: analysis.summary,
      sentiment: analysis.sentiment,
      status: 'completed'
    }, { onConflict: 'call_id' });

    // 4. Lógica de Notificación de Lead
    if (analysis.is_lead && tenantInfo?.email) {
      console.log(`[LEAD DETECTED] Reporting to ${tenantInfo.email}`);
      
      /** * TODO: Una vez que el despliegue funcione, crea el archivo lib/mail/notifications.ts 
       * y restaura la función sendLeadNotification aquí.
       */
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('❌ Webhook Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
