import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import OpenAI from 'openai';
import { agenticOrchestrator } from '@/services/agenticOrchestrator';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      call_id, transcript, duration, status, 
      variables, price, to, metadata 
    } = body;

    // NEXT.JS 15 FIX: Await cookies for client initialization
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet: any[]) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {}
          },
        },
      }
    );

    console.log(`📡 Hive-Mind Signal: ${call_id} [Outcome: ${status}]`);

    // 1. NEURAL SENTIMENT ANALYSIS (New Intelligence Layer)
    let sentimentData = { sentiment: 'neutral', intent: 'inquiry', urgency: 1 };
    
    if (transcript && transcript !== "No transcript provided") {
      const analysis = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { 
            role: "system", 
            content: "Analyze the call transcript. Provide JSON only: { \"sentiment\": \"positive\"|\"neutral\"|\"negative\", \"intent\": \"booking\"|\"complaint\"|\"inquiry\", \"urgency\": 1-5 }" 
          },
          { role: "user", content: transcript }
        ],
        response_format: { type: "json_object" }
      });
      sentimentData = JSON.parse(analysis.choices[0].message.content || '{}');
    }

    // 2. FORENSIC CRM INGESTION
    const { data: callLog, error: dbError } = await supabase
      .from('call_logs') 
      .insert({
        bland_call_id: call_id,
        business_id: metadata?.businessId,
        customer_phone: to || "Unknown",
        transcript: transcript || "No transcript provided",
        duration: Math.round(parseFloat(duration || "0")) || 0,
        estimated_value: parseFloat(price || "0") || 0,
        status: status || "unknown",
        summary: variables?.summary || "Pending RL Analysis",
        sentiment: sentimentData.sentiment,
        customer_intent: sentimentData.intent,
        urgency_level: sentimentData.urgency,
        was_booked: status === 'completed' && (
          transcript?.toLowerCase().includes('book') || 
          variables?.booked === 'true'
        ),
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // 3. SOVEREIGN CRM LEAD UPDATE
    if (metadata?.businessId && to) {
      await supabase
        .from('leads')
        .upsert({
          phone: to,
          business_id: metadata.businessId,
          status: status === 'completed' ? 'QUALIFIED' : 'FOLLOW_UP',
          last_contacted: new Date().toISOString()
        }, { onConflict: 'phone' });
    }

    // 4. AGENTIC HIVE-MIND PIVOT
    const bookingConfirmed = status === 'completed' && 
      (transcript?.toLowerCase().includes('confirmed') || variables?.booked === 'true');
    
    if (!bookingConfirmed && metadata?.businessId) {
      await agenticOrchestrator.handleCallOutcome(call_id, status, {
        phone: to,
        businessId: metadata.businessId,
        industry: metadata.industry,
        locale: metadata.locale || 'en-US',
        urgency: sentimentData.urgency // Passing urgency to the pivot logic
      });
    }

    // 5. GLOBAL ROI ANALYTICS SYNC
    await supabase.rpc('increment_platform_stats', { 
      is_booking: bookingConfirmed,
      rev_increment: bookingConfirmed ? (Number(metadata?.deal_value || metadata?.dealValue) || 50) : 0
    });

    return NextResponse.json({ 
      success: true, 
      sentiment: sentimentData.sentiment,
      agenticAction: !bookingConfirmed ? 'PIVOT_DISPATCHED' : 'CONVERSION_LOGGED'
    }, { status: 200 });

  } catch (error: any) {
    console.error('❌ Hive-Mind Ingestion Failed:', error.message);
    return NextResponse.json({ error: 'Orchestration Error', details: error.message }, { status: 500 });
  }
}
