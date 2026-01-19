import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const body = await req.json();
  const { call_id, transcript, recording_url, duration, to, from } = body;

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  // 1. Generate a quick AI summary of the transcript
  let aiSummary = "No transcript available.";
  if (transcript) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize this phone call transcript in one short sentence focusing on the customer's intent. Example: 'Customer called to book a haircut for Tuesday at 3 PM.'" },
        { role: "user", content: transcript }
      ]
    });
    aiSummary = completion.choices[0].message.content || "Could not summarize.";
  }

  // 2. Find the tenant and log the data
  const { data: phoneData } = await supabase.from('phone_numbers').select('tenant_id').eq('phone_number', to).single();

  await supabase.from('call_logs').upsert({
    tenant_id: phoneData?.tenant_id,
    call_id,
    customer_number: from,
    transcript,
    recording_url,
    duration,
    summary: aiSummary, // Store the new AI summary here
    status: 'completed'
  }, { onConflict: 'call_id' });

  return NextResponse.json({ success: true });
}
