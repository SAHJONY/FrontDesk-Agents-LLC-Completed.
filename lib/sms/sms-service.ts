/**
 * SMS & Messaging Operations Module
 * Two-way SMS, missed-call text-back, reminders, follow-ups, and compliance
 */

export interface SMSMessage {
  id: string;
  conversationId: string;
  from: string; // phone number
  to: string; // phone number
  body: string;
  direction: 'inbound' | 'outbound';
  status: 'queued' | 'sent' | 'delivered' | 'failed' | 'undelivered';
  errorCode?: string;
  errorMessage?: string;
  mediaUrls?: string[];
  sentAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
}

export interface SMSConversation {
  id: string;
  customerId?: string;
  customerPhone: string;
  customerName?: string;
  workspaceId: string;
  locationId?: string;
  assignedTo?: string; // userId
  status: 'active' | 'closed';
  messages: SMSMessage[];
  tags: string[];
  optedIn: boolean;
  optedInAt?: Date;
  optedOutAt?: Date;
  lastMessageAt: Date;
  createdAt: Date;
}

export interface SMSTemplate {
  id: string;
  name: string;
  body: string; // Can include variables like {{name}}, {{date}}, {{time}}
  category: 'reminder' | 'confirmation' | 'follow-up' | 'marketing' | 'support';
  variables: string[];
  active: boolean;
  createdAt: Date;
}

export interface SMSCampaign {
  id: string;
  name: string;
  templateId: string;
  recipients: string[]; // phone numbers
  scheduledFor?: Date;
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'paused';
  sent: number;
  delivered: number;
  failed: number;
  optOuts: number;
  createdBy: string; // userId
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export interface QuietHoursRule {
  timezone: string;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  daysOfWeek: number[]; // 0-6 (Sunday-Saturday)
}

export class SMSService {
  private quietHoursRules: QuietHoursRule[] = [];
  private dncList: Set<string> = new Set(); // Do Not Contact list

  /**
   * Send SMS message
   */
  async sendSMS(data: {
    to: string;
    body: string;
    from?: string;
    mediaUrls?: string[];
    conversationId?: string;
  }): Promise<SMSMessage> {
    // Validate phone number format
    const normalizedPhone = this.normalizePhoneNumber(data.to);
    if (!this.isValidPhoneNumber(normalizedPhone)) {
      throw new Error('Invalid phone number format');
    }

    // Check DNC list
    if (this.dncList.has(normalizedPhone)) {
      throw new Error('Phone number is on Do Not Contact list');
    }

    // Check quiet hours
    if (await this.isQuietHours(normalizedPhone)) {
      throw new Error('Cannot send SMS during quiet hours');
    }

    // Check opt-in status
    const optedIn = await this.isOptedIn(normalizedPhone);
    if (!optedIn) {
      throw new Error('Customer has not opted in to receive SMS');
    }

    // Create message
    const message: SMSMessage = {
      id: this.generateMessageId(),
      conversationId: data.conversationId || this.generateConversationId(),
      from: data.from || process.env.TWILIO_PHONE_NUMBER || '',
      to: normalizedPhone,
      body: data.body,
      direction: 'outbound',
      status: 'queued',
      mediaUrls: data.mediaUrls,
      createdAt: new Date(),
    };

    // TODO: Send via Twilio or other SMS provider
    // TODO: Save to database
    // TODO: Update conversation

    return message;
  }

  /**
   * Handle incoming SMS
   */
  async handleInboundSMS(data: {
    from: string;
    to: string;
    body: string;
    mediaUrls?: string[];
  }): Promise<SMSMessage> {
    const normalizedPhone = this.normalizePhoneNumber(data.from);

    // Check for opt-out keywords
    if (this.isOptOutKeyword(data.body)) {
      await this.handleOptOut(normalizedPhone);
      
      return {
        id: this.generateMessageId(),
        conversationId: '',
        from: data.to,
        to: normalizedPhone,
        body: 'You have been unsubscribed from SMS messages. Reply START to opt back in.',
        direction: 'outbound',
        status: 'sent',
        createdAt: new Date(),
      };
    }

    // Check for opt-in keywords
    if (this.isOptInKeyword(data.body)) {
      await this.handleOptIn(normalizedPhone);
      
      return {
        id: this.generateMessageId(),
        conversationId: '',
        from: data.to,
        to: normalizedPhone,
        body: 'You have been subscribed to SMS messages. Reply STOP to opt out.',
        direction: 'outbound',
        status: 'sent',
        createdAt: new Date(),
      };
    }

    // Check for HELP keyword
    if (this.isHelpKeyword(data.body)) {
      return {
        id: this.generateMessageId(),
        conversationId: '',
        from: data.to,
        to: normalizedPhone,
        body: 'For help, contact us at support@frontdeskagents.com. Reply STOP to unsubscribe.',
        direction: 'outbound',
        status: 'sent',
        createdAt: new Date(),
      };
    }

    // Get or create conversation
    let conversation = await this.getConversationByPhone(normalizedPhone);
    if (!conversation) {
      conversation = await this.createConversation(normalizedPhone);
    }

    // Create inbound message
    const message: SMSMessage = {
      id: this.generateMessageId(),
      conversationId: conversation.id,
      from: normalizedPhone,
      to: data.to,
      body: data.body,
      direction: 'inbound',
      status: 'delivered',
      mediaUrls: data.mediaUrls,
      deliveredAt: new Date(),
      createdAt: new Date(),
    };

    // TODO: Save to database
    // TODO: Update conversation
    // TODO: Trigger AI response or route to human

    return message;
  }

  /**
   * Send missed call text-back
   */
  async sendMissedCallTextBack(data: {
    customerPhone: string;
    callTime: Date;
    locationName?: string;
  }): Promise<SMSMessage> {
    const body = `Hi! We missed your call at ${data.callTime.toLocaleTimeString()}. ${
      data.locationName ? `This is ${data.locationName}. ` : ''
    }How can we help you? Reply to this message or call us back.`;

    return await this.sendSMS({
      to: data.customerPhone,
      body,
    });
  }

  /**
   * Send appointment reminder
   */
  async sendAppointmentReminder(data: {
    customerPhone: string;
    customerName: string;
    appointmentDate: Date;
    appointmentTime: string;
    locationName?: string;
  }): Promise<SMSMessage> {
    const body = `Hi ${data.customerName}! Reminder: You have an appointment ${
      data.locationName ? `at ${data.locationName} ` : ''
    }on ${data.appointmentDate.toLocaleDateString()} at ${data.appointmentTime}. Reply CONFIRM to confirm or RESCHEDULE to change.`;

    return await this.sendSMS({
      to: data.customerPhone,
      body,
    });
  }

  /**
   * Send follow-up message
   */
  async sendFollowUp(data: {
    customerPhone: string;
    customerName?: string;
    message: string;
  }): Promise<SMSMessage> {
    const body = data.customerName 
      ? `Hi ${data.customerName}! ${data.message}`
      : data.message;

    return await this.sendSMS({
      to: data.customerPhone,
      body,
    });
  }

  /**
   * Send SMS from template
   */
  async sendFromTemplate(data: {
    templateId: string;
    to: string;
    variables: Record<string, string>;
  }): Promise<SMSMessage> {
    const template = await this.getTemplate(data.templateId);
    if (!template || !template.active) {
      throw new Error('Template not found or inactive');
    }

    // Replace variables in template
    let body = template.body;
    for (const [key, value] of Object.entries(data.variables)) {
      body = body.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    return await this.sendSMS({
      to: data.to,
      body,
    });
  }

  /**
   * Create SMS campaign
   */
  async createCampaign(data: {
    name: string;
    templateId: string;
    recipients: string[];
    scheduledFor?: Date;
    createdBy: string;
  }): Promise<SMSCampaign> {
    const campaign: SMSCampaign = {
      id: this.generateCampaignId(),
      name: data.name,
      templateId: data.templateId,
      recipients: data.recipients.map(p => this.normalizePhoneNumber(p)),
      scheduledFor: data.scheduledFor,
      status: data.scheduledFor ? 'scheduled' : 'draft',
      sent: 0,
      delivered: 0,
      failed: 0,
      optOuts: 0,
      createdBy: data.createdBy,
      createdAt: new Date(),
    };

    // TODO: Save to database
    // TODO: Schedule campaign if scheduledFor is set

    return campaign;
  }

  /**
   * Execute SMS campaign
   */
  async executeCampaign(campaignId: string): Promise<void> {
    // TODO: Get campaign from database
    // TODO: Validate campaign status
    // TODO: Send SMS to all recipients (with rate limiting)
    // TODO: Update campaign stats
    // TODO: Handle opt-outs and failures

    throw new Error('Not implemented');
  }

  /**
   * Handle opt-out
   */
  private async handleOptOut(phone: string): Promise<void> {
    this.dncList.add(phone);
    
    // TODO: Update database
    // TODO: Close active conversations
    // TODO: Log opt-out event
  }

  /**
   * Handle opt-in
   */
  private async handleOptIn(phone: string): Promise<void> {
    this.dncList.delete(phone);
    
    // TODO: Update database
    // TODO: Log opt-in event
  }

  /**
   * Check if phone number is opted in
   */
  private async isOptedIn(phone: string): Promise<boolean> {
    // TODO: Query database
    return !this.dncList.has(phone);
  }

  /**
   * Check if current time is within quiet hours
   */
  private async isQuietHours(phone: string): Promise<boolean> {
    // TODO: Get timezone for phone number
    // TODO: Check against quiet hours rules
    return false;
  }

  /**
   * Get conversation by phone number
   */
  private async getConversationByPhone(phone: string): Promise<SMSConversation | null> {
    // TODO: Query database
    return null;
  }

  /**
   * Create new conversation
   */
  private async createConversation(phone: string): Promise<SMSConversation> {
    const conversation: SMSConversation = {
      id: this.generateConversationId(),
      customerPhone: phone,
      workspaceId: '', // TODO: Get from context
      status: 'active',
      messages: [],
      tags: [],
      optedIn: true,
      lastMessageAt: new Date(),
      createdAt: new Date(),
    };

    // TODO: Save to database

    return conversation;
  }

  /**
   * Get template by ID
   */
  private async getTemplate(templateId: string): Promise<SMSTemplate | null> {
    // TODO: Query database
    return null;
  }

  /**
   * Normalize phone number to E.164 format
   */
  private normalizePhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Add +1 for US numbers if not present
    if (digits.length === 10) {
      return `+1${digits}`;
    } else if (digits.length === 11 && digits.startsWith('1')) {
      return `+${digits}`;
    }
    
    return phone;
  }

  /**
   * Validate phone number format
   */
  private isValidPhoneNumber(phone: string): boolean {
    // Basic E.164 validation
    return /^\+[1-9]\d{1,14}$/.test(phone);
  }

  /**
   * Check if message is opt-out keyword
   */
  private isOptOutKeyword(message: string): boolean {
    const keywords = ['STOP', 'STOPALL', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT'];
    return keywords.includes(message.trim().toUpperCase());
  }

  /**
   * Check if message is opt-in keyword
   */
  private isOptInKeyword(message: string): boolean {
    const keywords = ['START', 'YES', 'UNSTOP'];
    return keywords.includes(message.trim().toUpperCase());
  }

  /**
   * Check if message is help keyword
   */
  private isHelpKeyword(message: string): boolean {
    return message.trim().toUpperCase() === 'HELP';
  }

  /**
   * Generate unique IDs
   */
  private generateMessageId(): string {
    return `sms_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateConversationId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateCampaignId(): string {
    return `camp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default SMSService;
