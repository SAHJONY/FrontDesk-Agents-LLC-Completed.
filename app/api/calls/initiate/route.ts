import { createServerSupabase } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // FIX: You must await the creation of the client itself
    const supabase = await createServerSupabase(); 

    const { clientId, ...otherData } = await req.json();

    // Now 'supabase' is the actual client, and .from() will work
    const { data: clientConfig, error: crmError } = await supabase
      .from('client_configurations')
      .select('crm_api_key, crm_provider, emergency_phone, crm_provider_url')
      .eq('client_id', clientId)
      .single();

    // ... rest of your logic
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
