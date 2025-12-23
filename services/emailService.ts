// services/email.service.ts
import sgMail from '@sendgrid/mail';
import { Resend } from 'resend';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || '');

export interface EmailOptions {
  to: string | string[];
  from?: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Email Service
 * Handles email sending through SendGrid and Resend
 */
export const emailService = {
  /**
   * Send email via SendGrid
   */
  async sendWithSendGrid(options: EmailOptions): Promise<EmailResponse> {
    try {
      const msg = {
        to: options.to,
        from: options.from || process.env.SENDGRID_FROM_EMAIL || 'noreply@frontdeskagents.com',
        subject: options.subject,
        text: options.text,
        html: options.html,
        replyTo: options.replyTo,
      };

      const response = await sgMail.send(msg);

      return {
        success: true,
        messageId: response[0].headers['x-message-id'],
      };
    } catch (error) {
      console.error('SendGrid error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Send email via Resend
   */
  async sendWithResend(options: EmailOptions): Promise<EmailResponse> {
    try {
      const { data, error } = await resend.emails.send({
        from: options.from || process.env.RESEND_FROM_EMAIL || 'FrontDesk Agents <noreply@frontdeskagents.com>',
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        text: options.text,
        html: options.html,
        reply_to: options.replyTo,
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        messageId: data?.id,
      };
    } catch (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Send email (auto-selects provider based on environment)
   */
  async send(options: EmailOptions): Promise<EmailResponse> {
    // Prefer Resend, fallback to SendGrid
    const useResend = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.length > 0;

    if (useResend) {
      return this.sendWithResend(options);
    } else {
      return this.sendWithSendGrid(options);
    }
  },

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(to: string, name: string): Promise<EmailResponse> {
    return this.send({
      to,
      subject: 'Welcome to FrontDesk Agents LLC',
      html: `
        <h1>Welcome ${name}!</h1>
        <p>Thank you for joining FrontDesk Agents LLC. Your AI-powered front office is now active.</p>
        <p>Get started by logging into your dashboard.</p>
      `,
      text: `Welcome ${name}! Thank you for joining FrontDesk Agents LLC. Your AI-powered front office is now active.`,
    });
  },

  /**
   * Send magic link email
   */
  async sendMagicLink(to: string, magicLink: string): Promise<EmailResponse> {
    return this.send({
      to,
      subject: 'Your Secure Access Link - FrontDesk Agents',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your Secure Access Link</h2>
          <p>Click the button below to access your FrontDesk Agents portal:</p>
          <a href="${magicLink}" style="display: inline-block; padding: 12px 24px; background: #06b6d4; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">
            Access Portal
          </a>
          <p style="color: #64748b; font-size: 14px;">This link will expire in 24 hours.</p>
          <p style="color: #64748b; font-size: 14px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
      text: `Click this link to access your FrontDesk Agents portal: ${magicLink}\n\nThis link will expire in 24 hours.`,
    });
  },

  /**
   * Send notification email
   */
  async sendNotification(to: string, subject: string, message: string): Promise<EmailResponse> {
    return this.send({
      to,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>${subject}</h2>
          <p>${message}</p>
        </div>
      `,
      text: message,
    });
  },
};

// Export the service
export { emailService as default };
