import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { leadId, clientId, phoneNumber, vertical } = await req.json();
    const supabase = createClient();

    // 1. VERIFY SOVEREIGN AUTH (Internal Security)
    const authHeader = req.headers.get('x-platform-secret');
    if (authHeader !== process.env.PLATFORM_INTERNAL_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. FETCH CLIENT CRM CONFIG (The "Last Mile" Secret)
    // This pulls the private API keys you collected in the Onboarding Form.
    const { data: clientConfig, error: crmError } = await supabase
      .from('client_configurations')
      .select('crm_api_key, crm_provider, emergency_phone, crm_provider_url')
      .eq('client_id', clientId)
      .single();

    if (crmError || !clientConfig) {
      console.error("CRM Config Missing:", crmError);
      return NextResponse.json({ error: 'Client CRM not configured' }, { status: 400 });
    }

    // 3. CONSTRUCT THE HYPER-LOCAL PROMPT (Neural Logic)
    const promptBase = `You are a dispatcher for a ${vertical} firm. 
    Use the following CRM Endpoint to verify availability: ${clientConfig.crm_provider_url}.
    If it is a life-safety emergency, transfer to: ${clientConfig.emergency_phone}`;

    // 4. PASS CRM DATA TO AI MEMORY (Bland AI Handshake)
    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'authorization': process.env.BLAND_AI_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        task: promptBase,
        voice: "nat",
        // request_data allows the AI to use these variables in its own internal tools
        request_data: { 
          crm_key: clientConfig.crm_api_key,
          crm_type: clientConfig.crm_provider,
          emergency_contact: clientConfig.emergency_phone
        },
        wait_for_greeting: true,
        record: true
      }),
    });

    const data = await response.json();
    return NextResponse.json({ success: true, call_id: data.call_id });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
