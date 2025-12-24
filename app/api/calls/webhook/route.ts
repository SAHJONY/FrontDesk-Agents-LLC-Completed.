import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Helper function to notify owner of successful revenue capture
async function notifyOwnerOfSuccess(call_id: string, revenueImpact: number) {
  try {
    // You can implement SMS notification via Twilio, email via SendGrid, 
    // or push notification here. For now, we'll just log it.
    console.log(`💰 SUCCESS: Call ${call_id} protected $${revenueImpact} in revenue`);
    
    // Example: Send SMS via Twilio (uncomment when ready)
    // await fetch('https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': 'Basic ' + Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64'),
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   body: new URLSearchParams({
    //     To: process.env.OWNER_PHONE!,
    //     From: process.env.TWILIO_PHONE!,
    //     Body: `🎯 AI Dispatch Success! Call ${call_id} secured $${revenueImpact} emergency booking.`
    //   })
    // });

    // Or send via email, Slack webhook, etc.
    
  } catch (error) {
    console.error('Notification error:', error);
    // Don't throw - we don't want notification failures to break the webhook
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { call_id, transcript, summary, metadata } = body;
    const supabase = createClient();

    // 1. ANALYZE REVENUE IMPACT (The "Proof of Work" Logic)
    let revenueImpact = 0;
    const isEmergency = transcript.toLowerCase().includes('emergency') || 
                        transcript.toLowerCase().includes('burst') ||
                        transcript.toLowerCase().includes('no heat');

    // Assign a dollar value to the "saved" lead (e.g., $1,500 for emergency HVAC/Plumbing)
    if (isEmergency && summary.toLowerCase().includes('booked')) {
      revenueImpact = 1500; 
    }

    // 2. LOG THE OUTCOME IN SOVEREIGN VAULT
    await supabase.from('call_logs').update({
      transcript,
      summary,
      revenue_protected: revenueImpact,
      status: 'completed',
      completed_at: new Date().toISOString()
    }).eq('call_id', call_id);

    // 3. TRIGGER OWNER NOTIFICATION
    // This feeds your Monday Briefing and real-time SMS alerts
    if (revenueImpact > 0) {
      await notifyOwnerOfSuccess(call_id, revenueImpact);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ 
      error: error?.message || 'Webhook processing failed' 
    }, { status: 500 });
  }
}
