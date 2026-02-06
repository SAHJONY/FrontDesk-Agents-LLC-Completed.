import { NextRequest, NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';
import { Redis } from '@upstash/redis';
import { syncTenantStatus } from '@/lib/sovereign-sync';

const redis = process.env.REDIS_URL && process.env.REDIS_TOKEN 
  ? new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    })
  : null;

export async function POST(req: NextRequest) {
  const supabase = requireSupabaseServer();
  
  // 1. Verify Super Admin Identity
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.email !== process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized Protocol' }, { status: 403 });
  }

  const { tenantId, action, value } = await req.json();

  try {
    if (action === 'GIFT_MINUTES') {
      // Add minutes to the tenant's allowance
      const { data: tenant } = await supabase
        .from('tenants')
        .select('max_minutes')
        .eq('id', tenantId)
        .single();

      await supabase
        .from('tenants')
        .update({ max_minutes: (tenant?.max_minutes || 0) + value })
        .eq('id', tenantId);
    }

    if (action === 'MANUAL_UNBLOCK') {
      // Forcefully clear the Redis block
      const { data: tenant } = await supabase
        .from('tenants')
        .select('owner_id')
        .eq('id', tenantId)
        .single();
      
      if (tenant && redis) await redis.del(`block:${tenant.owner_id}`);
    }

    // Trigger a full re-sync to ensure everything is aligned
    await syncTenantStatus(tenantId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
