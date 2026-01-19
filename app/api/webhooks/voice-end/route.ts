import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { sendLeadNotification } from '@/lib/notifications'; // Ensure you created the Step 2 file

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { call_id, transcript, recording_url, duration, to, from } = body;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!, 
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Generate AI summary
    let aiSummary = "No transcript available.";
    if (transcript) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Summarize this phone call transcript in one short sentence focusing on the customer's intent. If they want to book, buy, or schedule, be specific." },
          { role: "user", content: transcript }
        ]
      });
      aiSummary = completion.choices[0].message.content || "Could not summarize.";
    }

    // 2. Identify Tenant & Fetch their Alert Email
    // We join phone_numbers with tenants to get the owner's email
    const { data: phoneData } = await supabase
      .from('phone_numbers')
      .select(`
        tenant_id,
        tenants (
          email,
          name
        )
      `)
      .eq('phone_number', to)
      .single();

    const tenantInfo = phoneData?.tenants as any;

    // 3. Log data to Supabase
    const { error: upsertError } = await supabase.from('call_logs').upsert({
      tenant_id: phoneData?.tenant_id,
      call_id,
      customer_number: from,
      transcript,
      recording_url,
      duration,
      summary: aiSummary,
      status: 'completed'
    }, { onConflict: 'call_id' });

    // 4. Lead Detection & Instant Email Alert
    const isLead = aiSummary.toLowerCase().includes('book') || 
                   aiSummary.toLowerCase().includes('appoint') || 
                   aiSummary.toLowerCase().includes('price') ||
                   aiSummary.toLowerCase().includes('schedule');

    if (isLead && tenantInfo?.email) {
      await sendLeadNotification(tenantInfo.email, {
        customer_number: from,
        summary: aiSummary,
        call_id,
        duration
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
