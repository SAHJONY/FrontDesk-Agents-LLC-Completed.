import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Eliminamos 'call_id' de la desestructuración ya que no se utiliza
    const { from, to } = body;

    // 1. Identify the Tenant based on the phone number called
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Assuming you have a 'phone_numbers' table linking numbers to tenants
    const { data: phoneData } = await supabase
      .from('phone_numbers')
      .select('tenant_id')
      .eq('phone_number', to)
      .single();

    if (!phoneData) {
      console.warn(`⚠️ No tenant found for phone number: ${to} (Call from: ${from})`);
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    // 2. Fetch the "Business Knowledge" we processed earlier
    const { data: knowledge } = await supabase
      .from('agent_knowledge')
      .select('content_summary')
      .eq('tenant_id', phoneData.tenant_id);

    const businessContext = knowledge?.map(k => k.content_summary).join('\n') || "";

    // 3. Construct the Dynamic Voice Prompt
    const systemPrompt = `
      You are a professional receptionist for this business. 
      Use this specific business knowledge to answer questions:
      ${businessContext}

      RULES:
      - Be brief and polite (phone calls should be concise).
      - If you don't know the answer, offer to take a message.
      - Never mention you are an AI.
    `;

    // 4. Respond to the Voice Provider with the instructions
    return NextResponse.json({
      task: systemPrompt,
      voice: "nat", 
      first_sentence: "Thank you for calling. How can I help you today?",
      wait_for_greeting: true
    });

  } catch (error: any) {
    console.error('❌ Voice Inbound Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message }, 
      { status: 500 }
    );
  }
}
