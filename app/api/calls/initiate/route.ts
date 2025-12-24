import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSeasonalContext } from '@/lib/core/seasonal-logic';

export async function POST(req: Request) {
  try {
    const { leadId, clientId, phoneNumber, vertical, businessName, city } = await req.json();
    const supabase = createClient();

    // 1. VERIFY SOVEREIGN AUTH
    const authHeader = req.headers.get('x-platform-secret');
    if (authHeader !== process.env.PLATFORM_INTERNAL_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. FETCH SEASONAL CONTEXT (Dec 23, 2025 Reality)
    const seasonal = getSeasonalContext();

    // 3. FETCH CLIENT CRM CONFIG
    const { data: clientConfig, error: crmError } = await supabase
      .from('client_configurations')
      .select('crm_api_key, crm_provider, emergency_phone, crm_provider_url')
      .eq('client_id', clientId)
      .single();

    if (crmError || !clientConfig) {
      return NextResponse.json({ error: 'Client CRM not configured' }, { status: 400 });
    }

    // 4. CONSTRUCT THE UNIVERSAL OMNI-PROMPT
    // This merges the Industry, the Season, and the Local Geography
    const promptBase = `
      ROLE: Professional Dispatcher for ${businessName} in ${city}.
      VERTICAL: ${vertical}
      CURRENT_SEASON: ${seasonal.season}
      
      CORE MISSION: 
      It is currently the ${seasonal.season} season. You must prioritize ${seasonal.keywords.join(', ')}.
      If a caller mentions these, utilize "Crisis Mode" logic to secure the booking immediately.
      
      CRM INTEGRATION:
      Verify all bookings via ${clientConfig.crm_provider_url}.
      Life-safety emergencies must be transferred to: ${clientConfig.emergency_phone}.
      
      TONE_TRIGGER: ${seasonal.tone_trigger}
    `;

    // 5. EXECUTE AI DISPATCH (Bland AI Handshake)
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
        request_data: { 
          crm_key: clientConfig.crm_api_key,
          crm_type: clientConfig.crm_provider,
          emergency_contact: clientConfig.emergency_phone,
          seasonal_priority: seasonal.keywords[0]
        },
        wait_for_greeting: true,
        record: true,
        // High-priority low-latency routing for winter emergencies
        amd: true 
      }),
    });

    const data = await response.json();
    return NextResponse.json({ success: true, call_id: data.call_id });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
