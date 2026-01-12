import { Resend } from 'resend';
import { sendOutlookEmail } from './outlookService';

let resendInstance: Resend | undefined;

function getResendInstance(): Resend {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

export function setResendInstance(instance: Resend) {
  resendInstance = instance;
}

import { sendOutlookEmail as originalSendOutlookEmail } from './outlookService';
export { originalSendOutlookEmail as sendOutlookEmail }; // Re-export for external use

// Email configuration
const EMAIL_CONFIG = {
  domain: 'frontdeskagents.com',
  replyTo: 'noreply@frontdeskagents.com',
  departments: {
    support: 'support@frontdeskagents.com',
    sales: 'sales@frontdeskagents.com',
    billing: 'billing@frontdeskagents.com',
    onboarding: 'onboarding@frontdeskagents.com',
    technical: 'technical@frontdeskagents.com',
    compliance: 'compliance@frontdeskagents.com',
    admin: 'admin@frontdeskagents.com',
    noreply: 'noreply@frontdeskagents.com',
  },
};

export type Department = keyof typeof EMAIL_CONFIG.departments;

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  department?: Department;
  agentId?: string;
  agentName?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Get the from address based on department or agent
 */
function getFromAddress(department?: Department, agentId?: string, agentName?: string): string {
  if (agentId) {
    return `Agent ${agentName || agentId} <agent-${agentId}@${EMAIL_CONFIG.domain}>`;
  }
  
  if (agentName) {
    return `Agent ${agentName} <agent-${agentName.toLowerCase().replace(/\s+/g, '-')}}@${EMAIL_CONFIG.domain}>`;
  }
  
  if (department && EMAIL_CONFIG.departments[department]) {
    const deptName = department.charAt(0).toUpperCase() + department.slice(1);
    return `${deptName} Team <${EMAIL_CONFIG.departments[department]}>`;
  }
  
  return `FrontDesk Agents <${EMAIL_CONFIG.departments.noreply}>`;
}

/**
 * Send an email through the platform
 */
export async function sendEmail(options: EmailOptions, mockResend?: Resend, mockOutlookSender?: typeof originalSendOutlookEmail): Promise<EmailResult> {
  // Determine whether to use Resend or Outlook based on department or specific flags
  // For professional communications (e.g., admin, compliance, technical), use Outlook.
  // For high-volume automated emails (e.g., sales, onboarding, support), use Resend.
  const useOutlook = options.department && ['admin', 'compliance', 'technical'].includes(options.department);

  if (useOutlook) {
    try {
      const fromAddress = getFromAddress(options.department, options.agentId, options.agentName);
      const outlookResult = await (mockOutlookSender || originalSendOutlookEmail)({
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        cc: options.cc,
        bcc: options.bcc,
        attachments: options.attachments,
      });

      if (outlookResult.success) {
        await logEmail({
          fromAddress,
          toAddress: options.to,
          subject: options.subject,
          department: options.department,
          agentId: options.agentId,
          status: 'sent_outlook',
        });
        return { success: true };
      } else {
        throw new Error(outlookResult.error || 'Outlook email sending failed');
      }
    } catch (error: any) {
      console.error('Outlook email sending failed:', error);
      const fromAddress = getFromAddress(options.department, options.agentId, options.agentName);
      await logEmail({
        fromAddress,
        toAddress: options.to,
        subject: options.subject,
        department: options.department,
        agentId: options.agentId,
        status: 'failed_outlook',
        errorMessage: error.message,
      });
      return { success: false, error: error.message };
    }
  }
  try {
    const fromAddress = getFromAddress(options.department, options.agentId, options.agentName);
    
    const emailData: any = {
      from: fromAddress,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      replyTo: EMAIL_CONFIG.replyTo,
    };

    if (options.html) {
      emailData.html = options.html;
    }

    if (options.text) {
      emailData.text = options.text;
    }

    if (options.cc) {
      emailData.cc = Array.isArray(options.cc) ? options.cc : [options.cc];
    }

    if (options.bcc) {
      emailData.bcc = Array.isArray(options.bcc) ? options.bcc : [options.bcc];
    }

    if (options.attachments) {
      emailData.attachments = options.attachments;
    }

    const currentResend = mockResend || getResendInstance();
    const result = await currentResend.emails.send(emailData);

    // Log email to database (implement this based on your database setup)
    await logEmail({
      fromAddress,
      toAddress: options.to,
      subject: options.subject,
      department: options.department,
      agentId: options.agentId,
      resendId: result.data?.id,
      status: 'sent_resend',
    });

    return { success: true, messageId: result.data?.id };


  } catch (error: any) {
    console.error('Email sending failed:', error);
    
    // Log failed email
    await logEmail({
      fromAddress: getFromAddress(options.department, options.agentId, options.agentName),
      toAddress: options.to,
      subject: options.subject,
      department: options.department,
      agentId: options.agentId,
      status: 'failed',
      errorMessage: error.message,
    });

    return { success: false, error: error.message };
  }
}

/**
 * Send email to support department
 */
export async function sendSupportEmail(to: string, subject: string, html: string, text?: string): Promise<EmailResult> {
  return sendEmail({
    to,
    subject,
    html,
    text,
    department: 'support',
  });
}

/**
 * Send email from sales department
 */
export async function sendSalesEmail(to: string, subject: string, html: string, text?: string): Promise<EmailResult> {
  return sendEmail({
    to,
    subject,
    html,
    text,
    department: 'sales',
  });
}

/**
 * Send email from billing department
 */
export async function sendBillingEmail(to: string, subject: string, html: string, text?: string): Promise<EmailResult> {
  return sendEmail({
    to,
    subject,
    html,
    text,
    department: 'billing',
  });
}

/**
 * Send email from onboarding department
 */
export async function sendOnboardingEmail(to: string, subject: string, html: string, text?: string): Promise<EmailResult> {
  return sendEmail({
    to,
    subject,
    html,
    text,
    department: 'onboarding',
  });
}

/**
 * Send email from a specific agent
 */
export async function sendAgentEmail(
  to: string,
  subject: string,
  html: string,
  agentId: string,
  agentName?: string,
  text?: string
): Promise<EmailResult> {
  return sendEmail({
    to,
    subject,
    html,
    text,
    agentId,
    agentName,
  });
}

/**
 * Send system notification email (no-reply)
 */
export async function sendSystemEmail(to: string, subject: string, html: string, text?: string): Promise<EmailResult> {
  return sendEmail({
    to,
    subject,
    html,
    text,
    department: 'noreply',
  });
}

/**
 * Log email to database
 */
async function logEmail(data: {
  fromAddress: string;
  toAddress: string | string[]; // Updated to accept string or string[]
  subject: string;
  department?: string;
  agentId?: string;
  resendId?: string;
  status: string;
  errorMessage?: string;
}): Promise<void> {
  try {
    // TODO: Implement database logging using Supabase
    // This will store all email activity for tracking and analytics
    console.log('Email log:', data);
  } catch (error) {
    console.error('Failed to log email:', error);
  }
}

/**
 * Get email statistics for a department
 */
export async function getDepartmentEmailStats(_department: Department, _days: number = 30): Promise<{
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
}> {
  // TODO: Implement database query for email statistics
  return {
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    bounced: 0,
  };
}

/**
 * Get email statistics for an agent
 */
export async function getAgentEmailStats(_agentId: string, _days: number = 30): Promise<{
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
}> {
  // TODO: Implement database query for email statistics
  return {
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    bounced: 0,
  };
}
