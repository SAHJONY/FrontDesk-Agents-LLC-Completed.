import * as sgMail from '@sendgrid/mail';
import { Plans } from './plans';
import { medicAgent } from './medic.service';

// Strict Corporate Domain
const CORPORATE_DOMAIN = 'frontdeskagents.com';

// Initialize SendGrid API
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
} else {
    console.warn("⚠️ WARNING: SENDGRID_API_KEY is not configured.");
}

/**
 * CORE TRANSACTIONAL EMAIL ENGINE
 * Used for all system communications (Webhooks, Alerts, Reports)
 */
export async function sendTransactionalEmail(
    to: string, 
    subject: string, 
    htmlContent: string, 
    fromUser: string = 'ceo' // Default to CEO for high-impact authority
) {
    const fromAddress = `${fromUser}@${CORPORATE_DOMAIN}`;
    
    if (!process.env.SENDGRID_API_KEY) {
        throw new Error("ERR_EMAIL_CONFIG: Email service not initialized.");
    }
    
    const msg = {
        to: to, 
        from: {
            email: fromAddress,
            name: 'FrontDesk Agents LLC'
        }, 
        subject: subject,
        html: htmlContent,
    };

    try {
        await sgMail.send(msg);
        console.log(`[EMAIL] Protocol dispatched from ${fromAddress} to ${to}: ${subject}`);
        return { success: true };
    } catch (error: any) {
        const errorMessage = error.response?.body?.errors 
            ? JSON.stringify(error.response.body.errors) 
            : error.message;
            
        // CEO Fix: Notify the Medic if the communication layer fails
        await medicAgent.reportIncident(new Error(errorMessage), 'SendGrid Delivery Failure');
        
        console.error('Error sending email (SendGrid):', errorMessage);
        throw new Error(`Delivery Failed: ${errorMessage}`);
    }
}

/**
 * AI CEO WELCOME PROTOCOL
 * Triggers specifically after a successful Stripe payment
 */
export const emailService = {
  async sendWelcomeEmail(to: string, clientName: string, plan: Plans) {
    const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;

    const htmlContent = `
      <div style="font-family: 'Helvetica', sans-serif; max-width: 600px; margin: auto; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #333;">
        <h1 style="color: #3b82f6; font-size: 24px;">SYSTEM INITIALIZED</h1>
        <p style="font-size: 16px; color: #d1d5db;">Hello ${clientName},</p>
        <p style="font-size: 16px; color: #d1d5db;">The <strong>AI CEO</strong> has successfully provisioned your infrastructure on the <strong>${plan}</strong> tier.</p>
        
        <div style="background: #171717; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 30px 0;">
          <h3 style="color: #10b981; margin-top: 0; text-transform: uppercase; letter-spacing: 1px;">Status: Active</h3>
          <ul style="list-style: none; padding: 0; color: #9ca3af; line-height: 1.8;">
            <li>🛡️ <strong>Guardian:</strong> Data Tunnel Established</li>
            <li>🚑 <strong>Medic:</strong> Vitals Monitoring Live</li>
            <li>📈 <strong>Intelligence:</strong> RL Training Initiated</li>
          </ul>
        </div>

        <p style="margin-bottom: 30px; color: #9ca3af;">Your workforce is standing by in the Command Center.</p>
        
        <a href="${dashboardUrl}" style="display: inline-block; padding: 16px 32px; background: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; text-align: center;">
          Access Dashboard
        </a>

        <p style="font-size: 11px; color: #4b5563; margin-top: 50px; border-top: 1px solid #262626; padding-top: 20px;">
          This is an automated transmission from the FrontDesk Agents LLC Sovereign Infrastructure. <br/>
          Portland Build v1.4 | Security Verified by Guardian Protocol.
        </p>
      </div>
    `;

    return await sendTransactionalEmail(to, `[SYSTEM ACTIVATED] Welcome, ${clientName}`, htmlContent);
  }
};
