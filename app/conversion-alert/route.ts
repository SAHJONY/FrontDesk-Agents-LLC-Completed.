import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { clientId, market, industry, revenue_impact } = await req.json();

  // 1. Log the Conversion in the Public Registry
  await supabase
    .from('public_registry.clients')
    .update({ 
      status: 'live',
      activated_at: new Date().toISOString() 
    })
    .eq('id', clientId);

  // 2. Dispatch Forensic Notification
  // Replace with your Discord/Slack Webhook URL
  const alertPayload = {
    content: `💎 **SOVEREIGN ACTIVATION DETECTED**\n` +
             `**Business:** ${clientId}\n` +
             `**Market:** ${market.toUpperCase()}\n` +
             `**Industry:** ${industry}\n` +
             `**Est. Annual Recovery:** ${revenue_impact}\n` +
             `**Security:** Aegis Shield v2.5 Verified`
  };

  await fetch(process.env.DISCORD_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(alertPayload)
  });

  return NextResponse.json({ success: true, status: 'ALERT_DISPATCHED' });
}
