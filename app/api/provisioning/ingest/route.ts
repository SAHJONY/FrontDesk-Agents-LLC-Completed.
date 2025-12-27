import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import OpenAI from 'openai';
import { getPrompt } from '@/lib/ai/prompts';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { targetUrl, customerId } = await req.json();
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
      },
    }
  );

  try {
    // 1. PHASE ONE: RAW DATA EXTRACTION
    // Using Jina Reader for high-fidelity markdown conversion
    const crawlerResponse = await fetch(`https://r.jina.ai/${targetUrl}`, {
      headers: { 'X-Return-Format': 'markdown' }
    });
    const rawMarkdown = await crawlerResponse.text();

    if (!rawMarkdown || rawMarkdown.length < 100) {
      throw new Error("Insufficient data captured from target URL.");
    }

    // 2. PHASE TWO: FORENSIC SYNTHESIS (OpenAI)
    const { system, user } = getPrompt('websiteScraper', rawMarkdown);

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      response_format: { type: "json_object" }
    });

    const structuredIntelligence = JSON.parse(completion.choices[0].message.content || '{}');

    // 3. PHASE THREE: PERSISTENCE
    // Store in the knowledge_assets table for the AI agent to reference
    const { error: dbError } = await supabase
      .from('knowledge_assets')
      .upsert({
        customer_id: customerId,
        content: rawMarkdown, // Full text for vector search
        metadata: structuredIntelligence, // Structured JSON for quick lookups
        source_url: targetUrl,
        updated_at: new Date().toISOString()
      });

    if (dbError) throw dbError;

    // 4. Update the customer status to 'active'
    await supabase
      .from('customers')
      .update({ status: 'active' })
      .eq('id', customerId);

    return NextResponse.json({ 
      success: true, 
      intelligence: structuredIntelligence 
    });

  } catch (error: any) {
    console.error('INGEST_ERROR:', error);
    
    // Log failure for Owner oversight
    await supabase.from('provisioning_logs').insert({
      customer_id: customerId,
      message: `Ingest Failed: ${error.message}`,
      status: 'error'
    });

    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
