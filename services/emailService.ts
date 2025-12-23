// services/emailService.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailService = {
  /**
   * ONBOARDING: Dispatched when a new client uplink is established.
   */
  async sendWelcomeEmail(email: string, name: string, plan: string) {
    return await resend.emails.send({
      from: 'FrontDesk Agents <onboarding@frontdeskagents.com>',
      to: [email],
      subject: `Strategic Partnership Initialized | ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 40px; background: #000; color: #fff; border-radius: 24px;">
          <h1 style="color: #06b6d4; text-transform: uppercase; letter-spacing: 2px;">Welcome to the Swarm</h1>
          <p style="color: #94a3b8; font-size: 16px;">Your AI FrontDesk infrastructure has been provisioned.</p>
          <div style="background: #0f172a; padding: 20px; border-radius: 12px; border: 1px solid #1e293b; margin: 20px 0;">
            <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase;">Assigned Tier</p>
            <p style="margin: 5px 0 0 0; color: #fff; font-weight: bold; font-size: 20px;">${plan}</p>
          </div>
          <p style="font-size: 13px; color: #475569;">Access your Command Center to begin training your agents.</p>
        </div>
      `
    });
  },

  /**
   * MEDIC AUDIT: Dispatched by the Daily Cron Job for system health.
   */
  async sendAuditReport(to: string, metrics: { totalCalls: number, hotLeads: number, conversions: string }) {
    return await resend.emails.send({
      from: 'FrontDesk Medic <reports@frontdeskagents.com>',
      to: [to],
      subject: `[SYSTEM AUDIT] ${new Date().toLocaleDateString()} - Performance Manifest`,
      html: `
        <div style="font-family: sans-serif; background: #000; color: #fff; padding: 30px; border-radius: 20px; border: 1px solid #1e293b;">
          <h2 style="color: #10b981; margin-bottom: 20px;">Medic System Audit</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #0f172a; color: #94a3b8;">Throughput</td>
              <td style="padding: 10px; border-bottom: 1px solid #0f172a; text-align: right; color: #fff;">${metrics.totalCalls} Calls</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #0f172a; color: #94a3b8;">High-Intent (Hot)</td>
              <td style="padding: 10px; border-bottom: 1px solid #0f172a; text-align: right; color: #fff;">${metrics.hotLeads}</td>
            </tr>
            <tr>
              <td style="padding: 10px; color: #10b981;">Efficiency</td>
              <td style="padding: 10px; text-align: right; color: #10b981; font-weight: bold;">${metrics.conversions}%</td>
            </tr>
          </table>
        </div>
      `
    });
  },
  
  /**
   * TRANSACTIONAL: General purpose alerts (e.g., Protocol Zero triggers).
   */
  async sendTransactionalEmail(to: string, subject: string, html: string, category: string) {
    return await resend.emails.send({
      from: 'FrontDesk System <alerts@frontdeskagents.com>',
      to: [to],
      subject,
      html,
      tags: [{ name: 'category', value: category }]
    });
  }
};

// Export named function for compatibility
export async function sendTransactionalEmail(to: string, subject: string, html: string, category: string) {
  return emailService.sendTransactionalEmail(to, subject, html, category);
}

// Export default
export default emailService;
