import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is in your Vercel Environment Variables
});

export async function POST(req: Request) {
  try {
    const { taskId, transcript, customerId } = await req.json();
    const supabase = await createClient(); // Await the server client in Next.js 15

    // 1. Generate the Neural Summary via GPT-4o-mini
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

    // 2. Atomic Database Update
    // We update the customer DNA and the task status simultaneously
    const [customerUpdate, taskUpdate] = await Promise.all([
      supabase
        .from('customers')
        .update({ 
          last_summary: summary, // Storing directly for easier retrieval
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

    if (customerUpdate.error) throw customerUpdate.error;
    if (taskUpdate.error) throw taskUpdate.error;

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
