import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/utils/supabase/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message, history, agentId } = await req.json();
    
    // FIX: Await the promise to get the actual Supabase client
    const supabase = await createClient();

    // 1. Fetch the specific Agent's prompt from your DB
    const { data: agent, error: agentError } = await supabase
      .from('agent_config')
      .select('system_prompt')
      .eq('id', agentId)
      .single();

    if (agentError || !agent) {
      return NextResponse.json({ error: 'Agent not found in neural registry' }, { status: 404 });
    }

    // 2. Execute AI Inference with GPT-4
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: agent.system_prompt },
        ...history,
        { role: "user", content: message }
      ],
    });

    const aiMessage = response.choices[0].message.content;
    
    return NextResponse.json({ reply: aiMessage });

  } catch (err: any) {
    console.error('Test Agent Error:', err.message);
    return NextResponse.json({ error: 'Uplink failed during inference' }, { status: 500 });
  }
}
