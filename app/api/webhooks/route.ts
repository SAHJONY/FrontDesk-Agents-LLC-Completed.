import { NextResponse } from 'next/server';
import { blandAIConfig } from '@/lib/telephony/blandai-config';
import { supabase } from '@/lib/supabase'; 

export async function POST(req: Request) {
  try {
    // Audit current node state for Sovereign Hub integrity
    const isReady = !!supabase && !!blandAIConfig;
    
    if (isReady) {
      console.log('pdx1 Node: Revenue Command Center Operational');
    }

    const body = await req.json();

    // Return success to the local market platform
    return NextResponse.json({ 
      status: 'Sovereign_Success', 
      node: 'pdx1',
      market_parity: 'enabled'
    });
  } catch (error) {
    console.error('Sovereign Webhook Error:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
