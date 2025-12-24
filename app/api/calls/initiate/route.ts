import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { getSeasonalContext } from '@/lib/core/seasonal-logic';
import { getClusterContext } from '@/lib/prompts/cluster-logic';

export async function POST(req: Request) {
  try {
    const { leadId, clientId, phoneNumber, vertical, businessName, city, cluster } = await req.json();
    const supabase = createServerSupabase();

    // 1. VERIFY SOVEREIGN AUTH
    const authHeader = req.headers.get('x-platform-secret');
    if (authHeader !== process.env.PLATFORM_INTERNAL_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. FETCH CONTEXTUAL INTELLIGENCE
    const seasonal = getSeasonalContext();
    const clusterInfo = getClusterContext(cluster); // NEW: Fetches landmarks & neighbors

    // 3. FETCH CLIENT CRM CONFIG
    const { data: clientConfig, error: crmError } = await supabase
      .from('client_configurations')
      .select('crm_api_key, crm_provider, emergency_phone, crm_provider_url')
      .eq('client_id', clientId)
      .single();

    if (crmError || !clientConfig) {
      return NextResponse.json({ error: 'Client CRM not configured' }, { status: 400 });
    }

    // 4. CONSTRUCT THE HYPER-LOCAL OMNI-PROMPT
    const promptBase = `
      ROLE: Expert Local Dispatcher for ${businessName} in ${city}.
      GEOGRAPHIC_CONTEXT: You are operating in the ${cluster} region. 
      LANDMARKS: Use local references like ${clusterInfo.landmarks.join(' or ')} to build trust.
      NETWORK: Mention that we are currently coordinating emergency crews across ${clusterInfo.neighbors}.
      
      SEASONAL_MODE: It is ${seasonal.season}. Prioritize: ${seasonal.keywords.join(', ')}.
      
      MISSION: If a caller has a ${seasonal.keywords[0]}, use "Crisis Mode" (High-Urgency Tone).
      
      CRM_PROTOCOL:
      Verify availability via ${clientConfig.crm_provider_url}.
      Transfers for life-safety go to: ${clientConfig.emergency_phone}.
      
      TONE: ${clusterInfo.vibe} / ${seasonal.tone_trigger}.
    `;

    // 5. EXECUTE DISPATCH
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
          seasonal_priority: seasonal.keywords[0],
          cluster_id: cluster
        },
        wait_for_greeting: true,
        record: true,
        amd: true 
      }),
    });

    const data = await response.json();
    return NextResponse.json({ success: true, call_id: data.call_id });

  } catch (error: any) {
    console.error('Call initiation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error?.message || 'Call initiation failed' 
    }, { status: 500 });
  }
}
