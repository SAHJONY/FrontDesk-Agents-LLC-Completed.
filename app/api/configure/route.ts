// app/api/configure/route.ts
import { createServerSupabase } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // CRITICAL: Await the client to resolve the session
    const supabase = await createServerSupabase(); 

    const body = await req.json();
    const { clientId, businessName, languageCode } = body;

    // Autonomous setup: Save the lead's info for the demo
    const { data, error } = await supabase
      .from('client_configurations')
      .upsert({
        client_id: clientId,
        business_name: businessName,
        preferred_language: languageCode,
        is_demo_mode: true, // Flagged for pre-payment demo
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, config: data });
  } catch (error: any) {
    console.error('Autonomous Config Error:', error.message);
    return NextResponse.json({ error: 'Configuration failed' }, { status: 500 });
  }
}
