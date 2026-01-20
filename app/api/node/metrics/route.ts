import { NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = requireSupabaseServer();

    // 1. Get the current user/tenant context
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 2. Fetch Tenant Infrastructure Data
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('id, tier, used_minutes, max_minutes, lead_value_multiplier')
      .eq('owner_id', user.id)
      .single();

    if (tenantError) throw tenantError;

    // 3. Aggregate Call Metrics for "Today"
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: calls, error: callsError } = await supabase
      .from('calls')
      .select('status, intent_score, was_booked')
      .eq('tenant_id', tenant.id)
      .gte('created_at', today.toISOString());

    if (callsError) throw callsError;

    // 4. Calculate KPIs
    const answeredToday = calls.filter(c => c.status === 'completed').length;
    const appointmentsBooked = calls.filter(c => c.was_booked).length;
    
    // Recaptured Yield = Booked Appointments * Lead Value Multiplier
    // (Defaulting to $500/booking if not set)
    const multiplier = tenant.lead_value_multiplier || 500;
    const estimatedPipeline = appointmentsBooked * multiplier;

    return NextResponse.json({
      metrics: {
        answeredToday,
        appointmentsBooked,
        estimatedPipeline,
        tier: tenant.tier || 'Starter',
        usedMins: Math.floor(tenant.used_minutes || 0),
        maxMins: tenant.max_minutes || 300,
      }
    });

  } catch (error: any) {
    console.error('❌ Metrics API Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
