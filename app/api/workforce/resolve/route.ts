import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req: Request) {
  const { taskId, transcript, customerId } = await req.json();
  const supabase = createClient();

  try {
    // 1. Generate the Neural Summary
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize this human-customer interaction into 3 bullet points: Outcome, Promises Made, and Sentiment. Be concise for AI memory consumption." },
        { role: "user", content: transcript }
      ]
    });

    const summary = completion.choices[0].message.content;

    // 2. Update CRM and Task
    const { error } = await supabase
      .from('customers')
      .update({ 
        metadata: { last_summary: summary },
        last_interaction: new Date().toISOString()
      })
      .eq('id', customerId);

    await supabase.from('workforce_tasks').update({ status: 'resolved' }).eq('id', taskId);

    return NextResponse.json({ success: true, summary });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
