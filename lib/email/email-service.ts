/**
 * Email Operations Module
 * Inbound email ingestion, auto-classification, routing, drafting, and follow-up sequences
 */

export interface Email {
  id: string;
  threadId: string;
  from: {
    email: string;
    name?: string;
  };
  to: {
    email: string;
    name?: string;
  }[];
  cc?: {
    email: string;
    name?: string;
  }[];
  subject: string;
  body: string;
  bodyHtml?: string;
  attachments: EmailAttachment[];
  direction: 'inbound' | 'outbound';
  status: 'draft' | 'pending_approval' | 'sent' | 'delivered' | 'bounced' | 'failed';
  category?: 'support' | 'sales' | 'billing' | 'technical' | 'other';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  tags: string[];
  assignedTo?: string; // userId
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  createdAt: Date;
}

export interface EmailAttachment {
  id: string;
  filename: string;
  contentType: string;
  size: number; // bytes
  url?: string;
  blocked: boolean;
  blockReason?: string;
}

export interface EmailThread {
  id: string;
  subject: string;
  participants: {
    email: string;
    name?: string;
  }[];
  customerId?: string;
  workspaceId: string;
  status: 'active' | 'closed';
  category?: Email['category'];
  priority: Email['priority'];
  assignedTo?: string; // userId
  tags: string[];
  emails: Email[];
  lastEmailAt: Date;
  createdAt: Date;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string; // Can include variables like {{name}}, {{company}}
  bodyHtml?: string;
  category: Email['category'];
  variables: string[];
  active: boolean;
  createdAt: Date;
}

export interface EmailSequence {
  id: string;
  name: string;
  steps: EmailSequenceStep[];
  active: boolean;
  createdAt: Date;
}

export interface EmailSequenceStep {
  id: string;
  order: number;
  templateId: string;
  delayDays: number;
  conditions?: {
    field: string;
    operator: 'equals' | 'contains' | 'not_equals';
    value: any;
  }[];
}

export interface EmailClassificationRule {
  id: string;
  name: string;
  priority: number;
  conditions: {
    field: 'from' | 'subject' | 'body';
    operator: 'contains' | 'equals' | 'matches';
    value: string;
  }[];
  category: Email['category'];
  assignTo?: string; // userId or team
  tags?: string[];
  active: boolean;
}

export class EmailService {
  private classificationRules: EmailClassificationRule[] = [];
  private blockedFileTypes: Set<string> = new Set(['.exe', '.bat', '.cmd', '.scr']);

  /**
   * Send email
   */
  async sendEmail(data: {
    to: string | string[];
    subject: string;
    body: string;
    bodyHtml?: string;
    from?: string;
    cc?: string[];
    attachments?: EmailAttachment[];
    threadId?: string;
  }): Promise<Email> {
    // Validate email addresses
    const toAddresses = Array.isArray(data.to) ? data.to : [data.to];
    for (const email of toAddresses) {
      if (!this.isValidEmail(email)) {
        throw new Error(`Invalid email address: ${email}`);
      }
    }

    // Create email
    const email: Email = {
      id: this.generateEmailId(),
      threadId: data.threadId || this.generateThreadId(),
      from: {
        email: data.from || process.env.SENDGRID_FROM_EMAIL || 'noreply@frontdeskagents.com',
      },
      to: toAddresses.map(e => ({ email: e })),
      cc: data.cc?.map(e => ({ email: e })),
      subject: data.subject,
      body: data.body,
      bodyHtml: data.bodyHtml,
      attachments: data.attachments || [],
      direction: 'outbound',
      status: 'pending_approval',
      priority: 'normal',
      tags: [],
      createdAt: new Date(),
    };

    // TODO: Send via SendGrid or other email provider
    // TODO: Save to database
    // TODO: Update thread

    return email;
  }

  /**
   * Handle inbound email
   */
  async handleInboundEmail(data: {
    from: string;
    to: string;
    subject: string;
    body: string;
    bodyHtml?: string;
    attachments?: EmailAttachment[];
  }): Promise<Email> {
    // Validate sender
    if (!this.isValidEmail(data.from)) {
      throw new Error('Invalid sender email address');
    }

    // Check and block dangerous attachments
    const safeAttachments = data.attachments?.map(att => {
      const blocked = this.isBlockedFileType(att.filename);
      return {
        ...att,
        blocked,
        blockReason: blocked ? 'File type not allowed' : undefined,
      };
    }) || [];

    // Create email
    const email: Email = {
      id: this.generateEmailId(),
      threadId: this.generateThreadId(),
      from: { email: data.from },
      to: [{ email: data.to }],
      subject: data.subject,
      body: data.body,
      bodyHtml: data.bodyHtml,
      attachments: safeAttachments,
      direction: 'inbound',
      status: 'delivered',
      priority: 'normal',
      tags: [],
      deliveredAt: new Date(),
      createdAt: new Date(),
    };

    // Classify email
    const classification = await this.classifyEmail(email);
    email.category = classification.category;
    email.assignedTo = classification.assignedTo;
    email.tags = classification.tags || [];

    // TODO: Save to database
    // TODO: Create or update thread
    // TODO: Trigger AI draft response or route to human
    // TODO: Send notification to assigned user

    return email;
  }

  /**
   * Classify email using rules
   */
  async classifyEmail(email: Email): Promise<{
    category: Email['category'];
    assignedTo?: string;
    tags?: string[];
  }> {
    const activeRules = this.classificationRules
      .filter(r => r.active)
      .sort((a, b) => a.priority - b.priority);

    for (const rule of activeRules) {
      let allConditionsMet = true;

      for (const condition of rule.conditions) {
        let fieldValue = '';
        
        switch (condition.field) {
          case 'from':
            fieldValue = email.from.email;
            break;
          case 'subject':
            fieldValue = email.subject;
            break;
          case 'body':
            fieldValue = email.body;
            break;
        }

        let conditionMet = false;

        switch (condition.operator) {
          case 'contains':
            conditionMet = fieldValue.toLowerCase().includes(condition.value.toLowerCase());
            break;
          case 'equals':
            conditionMet = fieldValue.toLowerCase() === condition.value.toLowerCase();
            break;
          case 'matches':
            conditionMet = new RegExp(condition.value, 'i').test(fieldValue);
            break;
        }

        if (!conditionMet) {
          allConditionsMet = false;
          break;
        }
      }

      if (allConditionsMet) {
        return {
          category: rule.category,
          assignedTo: rule.assignTo,
          tags: rule.tags,
        };
      }
    }

    // Default classification
    return {
      category: 'other',
    };
  }

  /**
   * Draft AI response
   */
  async draftResponse(emailId: string): Promise<Email> {
    // TODO: Get original email
    // TODO: Use AI to generate response
    // TODO: Create draft email
    // TODO: Save as 'draft' status
    // TODO: Notify assigned user for approval

    throw new Error('Not implemented');
  }

  /**
   * Approve and send draft
   */
  async approveDraft(draftId: string, approvedBy: string): Promise<Email> {
    // TODO: Get draft email
    // TODO: Validate status is 'draft' or 'pending_approval'
    // TODO: Update status to 'sent'
    // TODO: Send via email provider
    // TODO: Log approval action

    throw new Error('Not implemented');
  }

  /**
   * Send email from template
   */
  async sendFromTemplate(data: {
    templateId: string;
    to: string | string[];
    variables: Record<string, string>;
    threadId?: string;
  }): Promise<Email> {
    const template = await this.getTemplate(data.templateId);
    if (!template || !template.active) {
      throw new Error('Template not found or inactive');
    }

    // Replace variables in subject and body
    let subject = template.subject;
    let body = template.body;
    let bodyHtml = template.bodyHtml;

    for (const [key, value] of Object.entries(data.variables)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      subject = subject.replace(regex, value);
      body = body.replace(regex, value);
      if (bodyHtml) {
        bodyHtml = bodyHtml.replace(regex, value);
      }
    }

    return await this.sendEmail({
      to: data.to,
      subject,
      body,
      bodyHtml,
      threadId: data.threadId,
    });
  }

  /**
   * Start email sequence
   */
  async startSequence(data: {
    sequenceId: string;
    recipientEmail: string;
    variables: Record<string, string>;
  }): Promise<void> {
    const sequence = await this.getSequence(data.sequenceId);
    if (!sequence || !sequence.active) {
      throw new Error('Sequence not found or inactive');
    }

    // TODO: Create sequence enrollment
    // TODO: Schedule first step
    // TODO: Save to database

    throw new Error('Not implemented');
  }

  /**
   * Process sequence step
   */
  async processSequenceStep(enrollmentId: string, stepId: string): Promise<void> {
    // TODO: Get enrollment and step
    // TODO: Check conditions
    // TODO: Send email from template
    // TODO: Schedule next step
    // TODO: Update enrollment status

    throw new Error('Not implemented');
  }

  /**
   * Get emails with filters
   */
  async getEmails(filters?: {
    category?: Email['category'];
    status?: Email['status'];
    assignedTo?: string;
    threadId?: string;
  }): Promise<Email[]> {
    // TODO: Query database with filters
    return [];
  }

  /**
   * Get email thread
   */
  async getThread(threadId: string): Promise<EmailThread | null> {
    // TODO: Query database
    return null;
  }

  /**
   * Close email thread
   */
  async closeThread(threadId: string): Promise<void> {
    // TODO: Update thread status to 'closed'
    // TODO: Log closure
  }

  /**
   * Add classification rule
   */
  async addClassificationRule(rule: Omit<EmailClassificationRule, 'id'>): Promise<EmailClassificationRule> {
    const classificationRule: EmailClassificationRule = {
      ...rule,
      id: this.generateRuleId(),
    };

    this.classificationRules.push(classificationRule);

    // TODO: Save to database

    return classificationRule;
  }

  /**
   * Get template by ID
   */
  private async getTemplate(templateId: string): Promise<EmailTemplate | null> {
    // TODO: Query database
    return null;
  }

  /**
   * Get sequence by ID
   */
  private async getSequence(sequenceId: string): Promise<EmailSequence | null> {
    // TODO: Query database
    return null;
  }

  /**
   * Validate email address
   */
  private isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Check if file type is blocked
   */
  private isBlockedFileType(filename: string): boolean {
    const extension = filename.substring(filename.lastIndexOf('.')).toLowerCase();
    return this.blockedFileTypes.has(extension);
  }

  /**
   * Generate unique IDs
   */
  private generateEmailId(): string {
    return `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateThreadId(): string {
    return `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateRuleId(): string {
    return `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default EmailService;
