import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * ⚡ LEAD NOTIFICATION
 * Sent immediately when a node captures a high-intent prospect.
 */
export async function sendLeadNotification(email: string, callData: any) {
  try {
    await resend.emails.send({
      from: 'Infrastructure <alerts@yourdomain.com>',
      to: email,
      subject: `🔥 New Lead Captured: ${callData.customer_number}`,
      html: `
        <div style="font-family: monospace; background: #000; color: #fff; padding: 40px; border: 1px solid #333;">
          <h2 style="color: #06b6d4; text-transform: uppercase; font-style: italic; letter-spacing: -1px;">
            New Lead Identified
          </h2>
          <p style="color: #888; font-size: 12px; text-transform: uppercase;">Node Activity: Autonomous Capture</p>
          <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;" />
          <div style="background: #111; padding: 20px; border-radius: 8px; border: 1px solid #222;">
            <p><strong>Customer:</strong> <span style="color: #06b6d4;">${callData.customer_number}</span></p>
            <p><strong>AI Summary:</strong> ${callData.summary}</p>
            <p><strong>Duration:</strong> ${callData.duration} seconds</p>
          </div>
          <div style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/calls/${callData.call_id}" 
               style="background: #fff; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 11px; border-radius: 4px;">
               View Full Transcript
            </a>
          </div>
          <p style="margin-top: 40px; font-size: 9px; color: #444; letter-spacing: 2px;">
            SECURED BY SOVEREIGN NODE INFRASTRUCTURE
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error("Lead email failed", error);
  }
}

/**
 * 🚨 CAPACITY ALERT
 * Sent when a user approaches or hits their minute bucket.
 */
export async function sendCapacityAlert(email: string, tier: string, percentage: number) {
  const isCritical = percentage >= 95;

  try {
    await resend.emails.send({
      from: 'Infrastructure <alerts@yourdomain.com>',
      to: email,
      subject: isCritical 
        ? `⚠️ CRITICAL: Node Capacity at ${percentage}%` 
        : `Capacity Update: Node at ${percentage}%`,
      html: `
        <div style="font-family: monospace; background: #000; color: #fff; padding: 40px; border: 1px solid #333;">
          <h2 style="text-transform: uppercase; font-style: italic; letter-spacing: -1px; color: ${isCritical ? '#ef4444' : '#fff'};">
            ${isCritical ? '🚨 System Lock Imminent' : '⚡ Capacity Update'}
          </h2>
          <p style="color: #888; font-size: 12px; text-transform: uppercase;">Infrastructure Status: ${tier} Tier</p>
          <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;" />
          <p>Your minute bucket is currently at <strong>${percentage}% utilization</strong>.</p>
          <p style="color: #aaa; font-size: 13px;">To avoid an automated System Lock and service interruption, we recommend scaling your fleet immediately.</p>
          <div style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/pricing" 
               style="background: #06b6d4; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 11px; border-radius: 4px;">
               Expand Capacity
            </a>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error("Capacity email failed", error);
  }
}
