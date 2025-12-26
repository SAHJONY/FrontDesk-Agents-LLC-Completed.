import { createServerSupabase } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createServerSupabase();
  const { clientId, amount_paid } = await req.json();

  if (amount_paid > 0) {
    // AUTONOMOUS FLIP: Move from Shadow/Demo to Live Production
    const { error } = await supabase
      .from('client_configurations')
      .update({
        is_demo_mode: false,
        status: 'active',
        subscription_tier: 'premium',
        activated_at: new Date().toISOString()
      })
      .eq('client_id', clientId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    
    // Trigger the Worldwide Welcome Email autonomously here
  }

  return NextResponse.json({ success: true });
}
