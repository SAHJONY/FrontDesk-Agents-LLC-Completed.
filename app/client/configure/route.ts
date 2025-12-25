import { createServerSupabase } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // CRITICAL: Await the creation of the client
    const supabase = await createServerSupabase(); 

    const formData = await req.json();

    // Now 'supabase' is the actual client, and .from() will be recognized
    const { data: config, error: saveError } = await supabase
      .from('client_configurations')
      .insert({
        business_name: formData.businessName,
        crm_provider: formData.crmProvider,
        // ... rest of your mapping
      })
      .select()
      .single();

    if (saveError) throw saveError;

    return NextResponse.json({ success: true, config });
  } catch (error) {
    return NextResponse.json({ error: 'Configuration failed' }, { status: 500 });
  }
}
