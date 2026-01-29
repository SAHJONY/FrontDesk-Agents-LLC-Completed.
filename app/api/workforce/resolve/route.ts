import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { taskId, transcript, customerId } = body;
    
    // In Next.js 15, cookies/headers are async, so the server client must be awaited
    const supabase = await createClient(); 

    // 1. Generate the Neural Summary
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "Summarize this interaction into 3 bullet points: Outcome, Promises Made, and Sentiment. Use a professional, data-driven tone for CRM memory." 
        },
        { role: "user", content: transcript || "No transcript provided." }
      ],
      max_tokens: 150
    });

    const summary = completion.choices[0].message.content;

    // 2. Parallel Database Operations (Atomic-style update)
    const [customerRes, taskRes] = await Promise.all([
      supabase
        .from('customers')
        .update({ 
          last_summary: summary,
          last_interaction: new Date().toISOString()
        })
        .eq('id', customerId),
      
      supabase
        .from('workforce_tasks')
        .update({ 
          status: 'resolved',
          resolution_summary: summary 
        })
        .eq('id', taskId)
    ]);

    if (customerRes.error) throw customerRes.error;
    if (taskRes.error) throw taskRes.error;

    return NextResponse.json({ 
      success: true, 
      summary,
      timestamp: new Date().toISOString()
    });

  } catch (err: any) {
    console.error('🔴 Neural Resolution Error:', err.message);
    return NextResponse.json(
      { success: false, error: err.message }, 
      { status: 500 }
    );
  }
}
