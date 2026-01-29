import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(req: Request) {
  // Security Check
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 1. Move current usage to a 'history' table for analytics (Optional but recommended)
    // 2. Atomic reset of usage columns for the new billing cycle
    const { error } = await supabaseAdmin
      .from('tenants')
      .update({ 
        used_minutes: 0,
        billed_overage_minutes: 0 
      })
      .neq('id', 'placeholder'); // Update all rows

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: 'Usage metrics reset for new billing cycle.' 
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
