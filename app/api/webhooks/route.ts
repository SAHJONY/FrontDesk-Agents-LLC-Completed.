import { NextResponse } from 'next/server';
import { blandAIConfig } from '@/lib/telephony/blandai-config';
import { createServerSupabase } from '@/lib/supabase/server'; // Point to the working SSR file

export async function POST(req: Request) {
  try {
    // Initialize the server-side client
    const supabase = await createServerSupabase();
    
    // Audit the connection
    const isReady = !!supabase && !!blandAIConfig;
    if (isReady) {
      console.log('pdx1 Node: Sovereign Revenue Center Online');
    }

    const body = await req.json();

    return NextResponse.json({ 
      status: 'Sovereign_Success', 
      node: 'pdx1',
      tier: 'Active' 
    });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
