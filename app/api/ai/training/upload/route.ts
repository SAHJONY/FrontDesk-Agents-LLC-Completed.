import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const tenantId = cookieStore.get('tenant_id')?.value || req.headers.get('x-impersonated-user-id');

    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized: No tenant context' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 1. Extract text from file (Simple version for .txt/.md)
    // Note: For PDF/DOCX, you would use a library like 'pdf-parse'
    const text = await file.text();

    // 2. Use AI to "Ingest" the knowledge
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a Knowledge Architect. Extract key business facts, pricing, and FAQs from the provided text. Format them as a clear, structured knowledge summary for an AI receptionist."
        },
        { role: "user", content: text }
      ]
    });

    const summary = completion.choices[0].message.content;

    // 3. Store in Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from('agent_knowledge')
      .insert({
        tenant_id: tenantId,
        file_name: file.name,
        file_type: file.type,
        content_summary: summary,
        status: 'ready'
      })
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('Training Error:', error);
    return NextResponse.json({ error: 'Failed to process document' }, { status: 500 });
  }
}
