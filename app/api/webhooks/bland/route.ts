import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendLeadNotification, sendCapacityAlert } from '@/lib/notifications';
import { syncTenantStatus } from '@/lib/sovereign-sync';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { call_id, customer_number, duration, summary, completed, tenant_id } = body;

  if (!completed) return NextResponse.json({ status: 'ignored' });

  try {
    // 1. Log the Call and Update Minutes
    const { data: tenant, error } = await supabaseAdmin
      .from('tenants')
      .select('email, used_minutes, max_minutes, tier')
      .eq('id', tenant_id)
      .single();

    if (error || !tenant) throw new Error('Tenant not found');

    const newUsedMinutes = tenant.used_minutes + (duration / 60);

    await supabaseAdmin
      .from('tenants')
      .update({ used_minutes: newUsedMinutes })
      .eq('id', tenant_id);

    // 2. Lead Intelligence Trigger
    // We only send notifications for calls longer than 30s to filter out voicemails
    if (duration > 30) {
      await sendLeadNotification(tenant.email, {
        call_id,
        customer_number,
        summary,
        duration
      });
    }

    // 3. Automated Capacity Monitoring
    const usageRatio = newUsedMinutes / tenant.max_minutes;

    if (usageRatio >= 0.95) {
      await sendCapacityAlert(tenant.email, tenant.tier, 95);
    } else if (usageRatio >= 0.80) {
      // Logic to prevent spamming: only send once per billing cycle
      await sendCapacityAlert(tenant.email, tenant.tier, 80);
    }

    // 4. Sync status to Redis for Middleware enforcement
    await syncTenantStatus(tenant_id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Webhook processing failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
