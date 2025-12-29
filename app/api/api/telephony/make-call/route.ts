import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getBlandAIConfig } from '@/lib/ai/orchestrator';

export async function POST(req: Request) {
  try {
    const { phoneNumber, tenantId, customScript } = await req.json();

    // 1. Fetch Tenant Data to verify Tier & Multiplier
    const { data: tenant } = await supabaseAdmin
      .from('tenants')
      .select('tier, regional_multiplier')
      .eq('id', tenantId)
      .single();

    if (!tenant) return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });

    // 2. Get AI personality based on Tier ($199 - $1,499 logic)
    const nodeConfig = getBlandAIConfig(tenant.tier);

    // 3. Trigger Bland.AI Call
    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: { 
        'authorization': process.env.BLAND_API_KEY!,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        task: customScript || nodeConfig.system_prompt,
        voice: nodeConfig.voice,
        model: nodeConfig.model,
        webhook: `${process.env.NEXT_PUBLIC_API_URL}/api/webhooks/blandai`,
        metadata: { tenantId, tier: tenant.tier }
      })
    });

    const data = await response.json();
    return NextResponse.json({ success: true, callId: data.call_id });
  } catch (err) {
    return NextResponse.json({ error: 'Call initiation failed' }, { status: 500 });
  }
}
