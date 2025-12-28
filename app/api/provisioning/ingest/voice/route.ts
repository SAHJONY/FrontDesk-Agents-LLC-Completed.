import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { customerId, phoneNumberToCall } = await req.json();
  const cookieStore = cookies();
  
  console.log(`[VOICE_START] Dispatching call to: ${phoneNumberToCall} for Customer: ${customerId}`);

  const apiKey = process.env.BLAND_AI_API_KEY;
  if (!apiKey) {
    console.error('[VOICE_ERROR] BLAND_AI_API_KEY is missing from environment variables.');
    return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: phoneNumberToCall,
        task: "System health check for FrontDeskAgents.com. Verify connection.",
        voice: 'nat',
        reduce_latency: true
      })
    });

    const result = await response.json();
    
    // FORENSIC LOGGING: This shows us exactly what Bland AI says back
    console.log('[BLAND_RESPONSE_RAW]:', JSON.stringify(result));

    if (!response.ok) {
      console.error(`[BLAND_API_FAILURE] Status: ${response.status} - ${result.message || 'Unknown Error'}`);
      return NextResponse.json({ success: false, error: result.message }, { status: response.status });
    }

    console.log(`[VOICE_SUCCESS] Call dispatched. Call ID: ${result.call_id}`);
    return NextResponse.json({ success: true, callId: result.call_id });

  } catch (error: any) {
    console.error('[CRITICAL_VOICE_EXCEPTION]:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
