import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { customerId, phoneNumberToCall } = await req.json();
  const cookieStore = cookies();
  const supabase = createServerClient(/* ... connection info ... */);

  // 1. Fetch the Ingested Intelligence
  const { data: asset } = await supabase
    .from('knowledge_assets')
    .select('metadata')
    .eq('customer_id', customerId)
    .single();

  const businessData = asset.metadata;

  // 2. Configure the Bland.ai Sovereign Agent
  const response = await fetch('https://api.bland.ai/v1/calls', {
    method: 'POST',
    headers: {
      'authorization': process.env.BLAND_AI_API_KEY!,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone_number: phoneNumberToCall,
      task: `You are the AI Front Desk for ${businessData.businessName}. 
             Your goal is to assist customers based on these services: ${businessData.services.join(', ')}. 
             Business Hours: ${businessData.hours}. 
             If they want to book, collect their name and number. 
             Tone: Professional, institutional, and concise.`,
      voice: 'nat', // High-quality natural voice
      language: 'en', 
      wait_for_greeting: true,
      interruption_threshold: 100,
      model: 'enhanced'
    })
  });

  const result = await response.json();
  
  // 3. Log the Voice Node Activation
  await supabase.from('provisioning_logs').insert({
    customer_id: customerId,
    status: 'voice_active',
    message: `Voice Node deployed via Bland.ai. Call ID: ${result.call_id}`
  });

  return NextResponse.json({ success: true, callId: result.call_id });
}
