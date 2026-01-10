import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_CONFIG = {
  domain: 'frontdeskagents.com',
  replyTo: 'frontdeskllc@outlook.com',
  
  // Executive emails
  executives: {
    ceo: { email: 'ceo@frontdeskagents.com', name: 'CEO', fullName: 'Juan Gonzalez' },
    coo: { email: 'coo@frontdeskagents.com', name: 'COO', fullName: 'Chief Operating Officer' },
    cto: { email: 'cto@frontdeskagents.com', name: 'CTO', fullName: 'Chief Technology Officer' },
    cfo: { email: 'cfo@frontdeskagents.com', name: 'CFO', fullName: 'Chief Financial Officer' },
    cmo: { email: 'cmo@frontdeskagents.com', name: 'CMO', fullName: 'Chief Marketing Officer' },
    cro: { email: 'cro@frontdeskagents.com', name: 'CRO', fullName: 'Chief Revenue Officer' },
  },
  
  // Department leadership
  leadership: {
    vp_sales: { email: 'vp.sales@frontdeskagents.com', name: 'VP of Sales' },
    vp_engineering: { email: 'vp.engineering@frontdeskagents.com', name: 'VP of Engineering' },
    vp_product: { email: 'vp.product@frontdeskagents.com', name: 'VP of Product' },
    vp_marketing: { email: 'vp.marketing@frontdeskagents.com', name: 'VP of Marketing' },
    vp_support: { email: 'vp.support@frontdeskagents.com', name: 'VP of Support' },
    vp_customersuccess: { email: 'vp.customersuccess@frontdeskagents.com', name: 'VP of Customer Success' },
    vp_finance: { email: 'vp.finance@frontdeskagents.com', name: 'VP of Finance' },
    vp_hr: { email: 'vp.hr@frontdeskagents.com', name: 'VP of HR' },
  },
  
  // Functional addresses
  functional: {
    info: 'info@frontdeskagents.com',
    contact: 'contact@frontdeskagents.com',
    hello: 'hello@frontdeskagents.com',
    press: 'press@frontdeskagents.com',
    careers: 'careers@frontdeskagents.com',
    investors: 'investors@frontdeskagents.com',
    partnerships: 'partnerships@frontdeskagents.com',
    legal: 'legal@frontdeskagents.com',
    compliance: 'compliance@frontdeskagents.com',
    privacy: 'privacy@frontdeskagents.com',
  },
  
  // Distribution lists
  distributionLists: {
    all: 'all@frontdeskagents.com',
    leadership: 'leadership@frontdeskagents.com',
    managers: 'managers@frontdeskagents.com',
    sales_team: 'sales-team@frontdeskagents.com',
    engineering_team: 'engineering-team@frontdeskagents.com',
    support_team: 'support-team@frontdeskagents.com',
    marketing_team: 'marketing-team@frontdeskagents.com',
    product_team: 'product-team@frontdeskagents.com',
  },
};

export type ExecutiveRole = keyof typeof EMAIL_CONFIG.executives;
export type LeadershipRole = keyof typeof EMAIL_CONFIG.leadership;
export type FunctionalAddress = keyof typeof EMAIL_CONFIG.functional;
export type DistributionList = keyof typeof EMAIL_CONFIG.distributionLists;

export interface EmployeeEmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: {
    role?: ExecutiveRole | LeadershipRole;
    name?: string;
    email?: string;
  };
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

/**
 * Get formatted from address for employee/executive
 */
function getEmployeeFromAddress(from?: EmployeeEmailOptions['from']): string {
  if (!from) {
    return `FrontDesk Agents <${EMAIL_CONFIG.functional.info}>`;
  }
  
  // Check if it's an executive role
  if (from.role && from.role in EMAIL_CONFIG.executives) {
    const exec = EMAIL_CONFIG.executives[from.role as ExecutiveRole];
    return `${exec.fullName}, ${exec.name} <${exec.email}>`;
  }
  
  // Check if it's a leadership role
  if (from.role && from.role in EMAIL_CONFIG.leadership) {
    const leader = EMAIL_CONFIG.leadership[from.role as LeadershipRole];
    return `${leader.name} <${leader.email}>`;
  }
  
  // Custom email and name
  if (from.email && from.name) {
    return `${from.name} <${from.email}>`;
  }
  
  if (from.email) {
    return from.email;
  }
  
  return `FrontDesk Agents <${EMAIL_CONFIG.functional.info}>`;
}

/**
 * Send email as employee or executive
 */
export async function sendEmployeeEmail(options: EmployeeEmailOptions): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  try {
    const fromAddress = getEmployeeFromAddress(options.from);
    
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

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error: any) {
    console.error('Employee email sending failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send email from CEO
 */
export async function sendCEOEmail(to: string | string[], subject: string, html: string, text?: string) {
  return sendEmployeeEmail({
    to,
    subject,
    html,
    text,
    from: { role: 'ceo' },
  });
}

/**
 * Send email from specific executive
 */
export async function sendExecutiveEmail(
  role: ExecutiveRole,
  to: string | string[],
  subject: string,
  html: string,
  text?: string
) {
  return sendEmployeeEmail({
    to,
    subject,
    html,
    text,
    from: { role },
  });
}

/**
 * Send email from VP/leadership
 */
export async function sendLeadershipEmail(
  role: LeadershipRole,
  to: string | string[],
  subject: string,
  html: string,
  text?: string
) {
  return sendEmployeeEmail({
    to,
    subject,
    html,
    text,
    from: { role },
  });
}

/**
 * Send email to distribution list
 */
export async function sendToDistributionList(
  list: DistributionList,
  subject: string,
  html: string,
  from?: EmployeeEmailOptions['from'],
  text?: string
) {
  const listEmail = EMAIL_CONFIG.distributionLists[list];
  return sendEmployeeEmail({
    to: listEmail,
    subject,
    html,
    text,
    from,
  });
}

/**
 * Send company-wide announcement
 */
export async function sendCompanyAnnouncement(
  subject: string,
  html: string,
  from: ExecutiveRole = 'ceo',
  text?: string
) {
  return sendToDistributionList('all', subject, html, { role: from }, text);
}

/**
 * Send leadership update
 */
export async function sendLeadershipUpdate(
  subject: string,
  html: string,
  from: ExecutiveRole = 'ceo',
  text?: string
) {
  return sendToDistributionList('leadership', subject, html, { role: from }, text);
}

/**
 * Send department update
 */
export async function sendDepartmentUpdate(
  department: 'sales' | 'engineering' | 'support' | 'marketing' | 'product',
  subject: string,
  html: string,
  from?: EmployeeEmailOptions['from'],
  text?: string
) {
  const listKey = `${department}_team` as DistributionList;
  return sendToDistributionList(listKey, subject, html, from, text);
}

/**
 * Get executive email address
 */
export function getExecutiveEmail(role: ExecutiveRole): string {
  return EMAIL_CONFIG.executives[role].email;
}

/**
 * Get leadership email address
 */
export function getLeadershipEmail(role: LeadershipRole): string {
  return EMAIL_CONFIG.leadership[role].email;
}

/**
 * Get functional email address
 */
export function getFunctionalEmail(address: FunctionalAddress): string {
  return EMAIL_CONFIG.functional[address];
}

/**
 * Get distribution list email
 */
export function getDistributionListEmail(list: DistributionList): string {
  return EMAIL_CONFIG.distributionLists[list];
}

/**
 * Create employee email address
 */
export function createEmployeeEmail(firstName: string, lastName: string): string {
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, '');
  const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, '');
  return `${cleanFirst}.${cleanLast}@${EMAIL_CONFIG.domain}`;
}

/**
 * Create role-based email address
 */
export function createRoleEmail(role: string, department?: string): string {
  const cleanRole = role.toLowerCase().replace(/\s+/g, '.');
  if (department) {
    const cleanDept = department.toLowerCase().replace(/\s+/g, '');
    return `${cleanRole}.${cleanDept}@${EMAIL_CONFIG.domain}`;
  }
  return `${cleanRole}@${EMAIL_CONFIG.domain}`;
}
