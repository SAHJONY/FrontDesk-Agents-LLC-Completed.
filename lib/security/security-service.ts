/**
 * Security & Compliance Module
 * Data encryption, PII handling, TCPA/GDPR compliance, audit trails, and security monitoring
 */

import * as crypto from 'crypto';

export interface EncryptionConfig {
  algorithm: string;
  keyLength: number;
  ivLength: number;
}

export interface PIIField {
  field: string;
  type: 'name' | 'email' | 'phone' | 'address' | 'ssn' | 'credit_card' | 'custom';
  encrypted: boolean;
  redacted: boolean;
}

export interface DataRetentionPolicy {
  id: string;
  resourceType: string; // e.g., 'call_recordings', 'chat_logs', 'customer_data'
  retentionDays: number;
  autoDelete: boolean;
  complianceReason: string;
  createdAt: Date;
}

export interface ConsentRecord {
  id: string;
  customerId: string;
  customerPhone?: string;
  customerEmail?: string;
  consentType: 'sms' | 'email' | 'call' | 'data_processing';
  granted: boolean;
  grantedAt?: Date;
  revokedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  method: 'explicit' | 'implied' | 'opt_in' | 'opt_out';
  proofUrl?: string; // Link to consent form or recording
}

export interface SecurityIncident {
  id: string;
  type: 'unauthorized_access' | 'data_breach' | 'suspicious_activity' | 'policy_violation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedResources: string[];
  detectedAt: Date;
  detectedBy: 'system' | 'user' | 'external';
  status: 'open' | 'investigating' | 'resolved' | 'false_positive';
  assignedTo?: string;
  resolvedAt?: Date;
  resolution?: string;
}

export interface AccessLog {
  id: string;
  userId: string;
  userEmail: string;
  resource: string;
  resourceId?: string;
  action: 'read' | 'write' | 'delete' | 'export';
  ipAddress: string;
  userAgent: string;
  location?: {
    country: string;
    city: string;
  };
  success: boolean;
  denialReason?: string;
  timestamp: Date;
}

export class SecurityService {
  private encryptionKey: Buffer;
  private encryptionConfig: EncryptionConfig = {
    algorithm: 'aes-256-gcm',
    keyLength: 32,
    ivLength: 16,
  };

  constructor() {
    // Initialize encryption key from environment
    const keyString = process.env.ENCRYPTION_KEY || this.generateEncryptionKey();
    this.encryptionKey = Buffer.from(keyString, 'hex');
  }

  /**
   * Encrypt sensitive data
   */
  encrypt(plaintext: string): { encrypted: string; iv: string; authTag: string } {
    const iv = crypto.randomBytes(this.encryptionConfig.ivLength);
    const cipher = crypto.createCipheriv(
      this.encryptionConfig.algorithm,
      this.encryptionKey,
      iv
    ) as crypto.CipherGCM;

    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
    };
  }

  /**
   * Decrypt sensitive data
   */
  decrypt(encrypted: string, iv: string, authTag: string): string {
    const decipher = crypto.createDecipheriv(
      this.encryptionConfig.algorithm,
      this.encryptionKey,
      Buffer.from(iv, 'hex')
    ) as crypto.DecipherGCM;

    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * Redact PII from text
   */
  redactPII(text: string, options?: {
    redactEmails?: boolean;
    redactPhones?: boolean;
    redactNames?: boolean;
    redactSSN?: boolean;
    redactCreditCards?: boolean;
  }): string {
    let redacted = text;

    const opts = {
      redactEmails: true,
      redactPhones: true,
      redactNames: false,
      redactSSN: true,
      redactCreditCards: true,
      ...options,
    };

    if (opts.redactEmails) {
      // Redact email addresses
      redacted = redacted.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL REDACTED]');
    }

    if (opts.redactPhones) {
      // Redact phone numbers (various formats)
      redacted = redacted.replace(/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[PHONE REDACTED]');
    }

    if (opts.redactSSN) {
      // Redact SSN
      redacted = redacted.replace(/\d{3}-\d{2}-\d{4}/g, '[SSN REDACTED]');
    }

    if (opts.redactCreditCards) {
      // Redact credit card numbers
      redacted = redacted.replace(/\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}/g, '[CARD REDACTED]');
    }

    return redacted;
  }

  /**
   * Check TCPA compliance for outbound communication
   */
  async checkTCPACompliance(params: {
    customerPhone: string;
    communicationType: 'call' | 'sms';
    time: Date;
  }): Promise<{
    compliant: boolean;
    violations: string[];
  }> {
    const violations: string[] = [];

    // Check consent
    const consent = await this.getConsent({
      customerPhone: params.customerPhone,
      consentType: params.communicationType,
    });

    if (!consent || !consent.granted) {
      violations.push('No valid consent on file');
    }

    // Check quiet hours (9 PM - 8 AM local time)
    const hour = params.time.getHours();
    if (hour < 8 || hour >= 21) {
      violations.push('Outside permitted calling hours (8 AM - 9 PM)');
    }

    // Check DNC list
    const onDNC = await this.isOnDNCList(params.customerPhone);
    if (onDNC) {
      violations.push('Phone number is on Do Not Call list');
    }

    return {
      compliant: violations.length === 0,
      violations,
    };
  }

  /**
   * Check GDPR compliance for data processing
   */
  async checkGDPRCompliance(params: {
    customerId: string;
    action: 'collect' | 'process' | 'store' | 'share' | 'delete';
  }): Promise<{
    compliant: boolean;
    violations: string[];
  }> {
    const violations: string[] = [];

    // Check data processing consent
    const consent = await this.getConsent({
      customerId: params.customerId,
      consentType: 'data_processing',
    });

    if (!consent || !consent.granted) {
      violations.push('No valid data processing consent');
    }

    // Check data retention policy
    if (params.action === 'store') {
      const policy = await this.getDataRetentionPolicy('customer_data');
      if (!policy) {
        violations.push('No data retention policy defined');
      }
    }

    return {
      compliant: violations.length === 0,
      violations,
    };
  }

  /**
   * Record consent
   */
  async recordConsent(data: {
    customerId?: string;
    customerPhone?: string;
    customerEmail?: string;
    consentType: ConsentRecord['consentType'];
    granted: boolean;
    method: ConsentRecord['method'];
    ipAddress?: string;
    userAgent?: string;
    proofUrl?: string;
  }): Promise<ConsentRecord> {
    const consent: ConsentRecord = {
      id: this.generateConsentId(),
      customerId: data.customerId || '',
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      consentType: data.consentType,
      granted: data.granted,
      grantedAt: data.granted ? new Date() : undefined,
      revokedAt: !data.granted ? new Date() : undefined,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      method: data.method,
      proofUrl: data.proofUrl,
    };

    // TODO: Save to database
    // TODO: Log audit event

    return consent;
  }

  /**
   * Get consent record
   */
  async getConsent(params: {
    customerId?: string;
    customerPhone?: string;
    customerEmail?: string;
    consentType: ConsentRecord['consentType'];
  }): Promise<ConsentRecord | null> {
    // TODO: Query database
    return null;
  }

  /**
   * Revoke consent
   */
  async revokeConsent(consentId: string): Promise<void> {
    // TODO: Update consent record
    // TODO: Stop all related communications
    // TODO: Log audit event
  }

  /**
   * Check if phone number is on DNC list
   */
  private async isOnDNCList(phone: string): Promise<boolean> {
    // TODO: Check internal DNC list
    // TODO: Check national DNC registry if required
    return false;
  }

  /**
   * Add to DNC list
   */
  async addToDNCList(phone: string, reason: string): Promise<void> {
    // TODO: Add to database
    // TODO: Stop all communications to this number
    // TODO: Log audit event
  }

  /**
   * Create data retention policy
   */
  async createRetentionPolicy(data: {
    resourceType: string;
    retentionDays: number;
    autoDelete: boolean;
    complianceReason: string;
  }): Promise<DataRetentionPolicy> {
    const policy: DataRetentionPolicy = {
      id: this.generatePolicyId(),
      resourceType: data.resourceType,
      retentionDays: data.retentionDays,
      autoDelete: data.autoDelete,
      complianceReason: data.complianceReason,
      createdAt: new Date(),
    };

    // TODO: Save to database
    // TODO: Schedule cleanup jobs if autoDelete is true

    return policy;
  }

  /**
   * Get data retention policy
   */
  private async getDataRetentionPolicy(resourceType: string): Promise<DataRetentionPolicy | null> {
    // TODO: Query database
    return null;
  }

  /**
   * Execute data retention cleanup
   */
  async executeRetentionCleanup(resourceType: string): Promise<{
    deleted: number;
    errors: number;
  }> {
    // TODO: Get retention policy
    // TODO: Find expired records
    // TODO: Delete or anonymize data
    // TODO: Log cleanup results

    return { deleted: 0, errors: 0 };
  }

  /**
   * Log access to sensitive data
   */
  async logAccess(data: Omit<AccessLog, 'id' | 'timestamp'>): Promise<AccessLog> {
    const log: AccessLog = {
      ...data,
      id: this.generateAccessLogId(),
      timestamp: new Date(),
    };

    // TODO: Save to database
    // TODO: Send to SIEM if configured

    return log;
  }

  /**
   * Get access logs
   */
  async getAccessLogs(filters?: {
    userId?: string;
    resource?: string;
    action?: AccessLog['action'];
    startDate?: Date;
    endDate?: Date;
  }): Promise<AccessLog[]> {
    // TODO: Query database with filters
    return [];
  }

  /**
   * Report security incident
   */
  async reportIncident(data: {
    type: SecurityIncident['type'];
    severity: SecurityIncident['severity'];
    description: string;
    affectedResources: string[];
    detectedBy: SecurityIncident['detectedBy'];
  }): Promise<SecurityIncident> {
    const incident: SecurityIncident = {
      id: this.generateIncidentId(),
      type: data.type,
      severity: data.severity,
      description: data.description,
      affectedResources: data.affectedResources,
      detectedAt: new Date(),
      detectedBy: data.detectedBy,
      status: 'open',
    };

    // TODO: Save to database
    // TODO: Send alerts based on severity
    // TODO: Create incident response ticket

    return incident;
  }

  /**
   * Get security incidents
   */
  async getIncidents(filters?: {
    status?: SecurityIncident['status'];
    severity?: SecurityIncident['severity'];
    type?: SecurityIncident['type'];
  }): Promise<SecurityIncident[]> {
    // TODO: Query database with filters
    return [];
  }

  /**
   * Resolve security incident
   */
  async resolveIncident(incidentId: string, resolution: string, resolvedBy: string): Promise<void> {
    // TODO: Update incident status
    // TODO: Record resolution
    // TODO: Send notifications
    // TODO: Log audit event
  }

  /**
   * Perform security audit
   */
  async performSecurityAudit(): Promise<{
    score: number; // 0-100
    findings: {
      category: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      finding: string;
      recommendation: string;
    }[];
  }> {
    const findings: any[] = [];

    // Check encryption
    // Check access controls
    // Check data retention
    // Check consent records
    // Check incident history

    const score = Math.max(0, 100 - (findings.length * 10));

    return { score, findings };
  }

  /**
   * Generate encryption key
   */
  private generateEncryptionKey(): string {
    return crypto.randomBytes(this.encryptionConfig.keyLength).toString('hex');
  }

  /**
   * Generate unique IDs
   */
  private generateConsentId(): string {
    return `consent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generatePolicyId(): string {
    return `policy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateAccessLogId(): string {
    return `access_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateIncidentId(): string {
    return `incident_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default SecurityService;
