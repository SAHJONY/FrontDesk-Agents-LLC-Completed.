import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/utils/supabase/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { message, history, agentId } = await req.json();
  const supabase = createClient();

  // 1. Fetch the specific Agent's prompt from your DB
  const { data: agent } = await supabase
    .from('agent_config')
    .select('system_prompt')
    .eq('id', agentId)
    .single();

  if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });

  // 2. Simulate the AI's response logic
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
}
