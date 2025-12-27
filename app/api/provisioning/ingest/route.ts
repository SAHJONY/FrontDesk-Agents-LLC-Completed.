import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import OpenAI from 'openai';
import { getPrompt } from '@/lib/ai/prompts';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  // Extract body once to avoid "body used" errors in catch block
  const body = await req.json();
  const { targetUrl, customerId } = body;

  try {
    // NEXT.JS 15 FIX: Await the cookies() function
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          // FIX: Explicitly type the parameter to satisfy strict TS rules
          setAll(cookiesToSet: any[]) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Handle server component cookie setting limitation
            }
          },
        },
      }
    );

    // 1. PHASE ONE: RAW DATA EXTRACTION (Forensic Scraping)
    const crawlerResponse = await fetch(`https://r.jina.ai/${targetUrl}`, {
      headers: { 'X-Return-Format': 'markdown' }
    });
    const rawMarkdown = await crawlerResponse.text();

    if (!rawMarkdown || rawMarkdown.length < 100) {
      throw new Error("Insufficient data captured from target URL.");
    }

    // 2. PHASE TWO: FORENSIC SYNTHESIS (Sovereign AI Processing)
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

    // 3. PHASE THREE: PERSISTENCE (Silo Storage)
    const { error: dbError } = await supabase
      .from('knowledge_assets')
      .upsert({
        customer_id: customerId,
        content: rawMarkdown,
        metadata: structuredIntelligence,
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
    
    const cookieStore = await cookies();
    const errorClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll() { return cookieStore.getAll() } } }
    );

    // Log failure for Sovereign Portal oversight
    await errorClient.from('provisioning_logs').insert({
      customer_id: customerId,
      message: `Ingest Failed: ${error.message}`,
      status: 'error'
    });

    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
