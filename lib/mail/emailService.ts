import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const EMAIL_CONFIG = {
  domain: 'frontdeskagents.com',
  replyTo: 'frontdeskllc@outlook.com',
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
    return `Agent ${agentName} <agent-${agentName.toLowerCase().replace(/\s+/g, '-')}@${EMAIL_CONFIG.domain}>`;
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
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
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

    const result = await resend.emails.send(emailData);

    // Log email to database (implement this based on your database setup)
    await logEmail({
      fromAddress,
      toAddress: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      department: options.department,
      agentId: options.agentId,
      resendId: result.data?.id,
      status: 'sent',
    });

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error: any) {
    console.error('Email sending failed:', error);
    
    // Log failed email
    await logEmail({
      fromAddress: getFromAddress(options.department, options.agentId, options.agentName),
      toAddress: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      department: options.department,
      agentId: options.agentId,
      status: 'failed',
      errorMessage: error.message,
    });

    return {
      success: false,
      error: error.message,
    };
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
  toAddress: string;
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
export async function getDepartmentEmailStats(department: Department, days: number = 30): Promise<{
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
export async function getAgentEmailStats(agentId: string, days: number = 30): Promise<{
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
