import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // 1. HIDDEN AUTH: Ensure only your internal system can trigger this
    const authHeader = req.headers.get('x-platform-secret');
    if (authHeader !== process.env.PLATFORM_INTERNAL_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { leadId, phoneNumber, vertical, isEmergency, priority } = await req.json();

    // 2. INJECT PROPRIETARY PROMPTS (The Secret Sauce)
    // We fetch the "Neural Logic" from a private server-side config
    const promptBase = getProprietaryPrompt(vertical, isEmergency);

    // 3. BLAND AI HANDSHAKE (Hidden Third-Party Keys)
    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'authorization': process.env.BLAND_AI_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        task: promptBase,
        voice: "nat", // Professional-grade neural voice
        request_data: { leadId, vertical, priority },
        reduce_latency: true, // Crucial for <15s response
        amd: true, // Answering Machine Detection
      }),
    });

    const data = await response.json();

    // 4. LOG THE SUCCESSFUL DISPATCH
    await supabase.from('dispatch_logs').insert({
      lead_id: leadId,
      call_id: data.call_id,
      vertical: vertical,
      dispatched_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, callId: data.call_id });
  } catch (error) {
    console.error('Dispatch Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// Private helper to keep prompts out of the main logic
function getProprietaryPrompt(vertical: string, isEmergency: boolean) {
  if (vertical === 'home-services' && isEmergency) {
    return "SECRET_SAUCE_EMERGENCY_DISPATCH_PROMPT_V1"; 
  }
  return "SECRET_SAUCE_ROUTINE_INTAKE_PROMPT_V1";
}
