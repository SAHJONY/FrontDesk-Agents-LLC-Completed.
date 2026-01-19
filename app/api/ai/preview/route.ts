import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { message } = await req.json();
  const cookieStore = await cookies();
  const tenantId = cookieStore.get('tenant_id')?.value || req.headers.get('x-impersonated-user-id');

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  // 1. Fetch all knowledge for this tenant
  const { data: knowledge } = await supabase
    .from('agent_knowledge')
    .select('content_summary')
    .eq('tenant_id', tenantId);

  const contextText = knowledge?.map(k => k.content_summary).join('\n\n') || "No specific business knowledge uploaded yet.";

  // 2. Chat with OpenAI using the context
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { 
        role: "system", 
        content: `You are an AI FrontDesk Agent. Use the following business knowledge to answer questions accurately: \n\n ${contextText}` 
      },
      { role: "user", content: message }
    ]
  });

  return NextResponse.json({ reply: completion.choices[0].message.content });
}
