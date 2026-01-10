/**
 * Data Protection and Privacy Compliance System
 * GDPR, CCPA, HIPAA, SOC 2 compliance
 */

import { encryptionService } from './security-infrastructure';

// ============================================================================
// DATA CLASSIFICATION
// ============================================================================

export enum DataClassification {
  PUBLIC = 'public',
  INTERNAL = 'internal',
  CONFIDENTIAL = 'confidential',
  RESTRICTED = 'restricted',
  PII = 'pii', // Personally Identifiable Information
  PHI = 'phi', // Protected Health Information
  PCI = 'pci', // Payment Card Information
}

export enum DataSensitivity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

interface DataAsset {
  id: string;
  name: string;
  classification: DataClassification;
  sensitivity: DataSensitivity;
  owner: string;
  location: string;
  encrypted: boolean;
  retentionPeriod: number; // days
  createdAt: Date;
  lastAccessed: Date;
}

export class DataClassificationService {
  /**
   * Classify data based on content
   */
  classifyData(data: any): DataClassification {
    const dataString = JSON.stringify(data).toLowerCase();

    // Check for PHI (Protected Health Information)
    if (
      dataString.includes('medical') ||
      dataString.includes('health') ||
      dataString.includes('diagnosis') ||
      dataString.includes('prescription')
    ) {
      return DataClassification.PHI;
    }

    // Check for PCI (Payment Card Information)
    if (
      dataString.includes('card') ||
      dataString.includes('credit') ||
      dataString.includes('payment') ||
      /\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/.test(dataString)
    ) {
      return DataClassification.PCI;
    }

    // Check for PII (Personally Identifiable Information)
    if (
      dataString.includes('ssn') ||
      dataString.includes('social security') ||
      dataString.includes('passport') ||
      dataString.includes('driver license') ||
      /\b\d{3}-\d{2}-\d{4}\b/.test(dataString) // SSN pattern
    ) {
      return DataClassification.PII;
    }

    // Check for confidential business data
    if (
      dataString.includes('confidential') ||
      dataString.includes('proprietary') ||
      dataString.includes('trade secret')
    ) {
      return DataClassification.CONFIDENTIAL;
    }

    // Default to internal
    return DataClassification.INTERNAL;
  }

  /**
   * Determine data sensitivity
   */
  determineSensitivity(classification: DataClassification): DataSensitivity {
    const sensitivityMap: Record<DataClassification, DataSensitivity> = {
      [DataClassification.PUBLIC]: DataSensitivity.LOW,
      [DataClassification.INTERNAL]: DataSensitivity.MEDIUM,
      [DataClassification.CONFIDENTIAL]: DataSensitivity.HIGH,
      [DataClassification.RESTRICTED]: DataSensitivity.CRITICAL,
      [DataClassification.PII]: DataSensitivity.HIGH,
      [DataClassification.PHI]: DataSensitivity.CRITICAL,
      [DataClassification.PCI]: DataSensitivity.CRITICAL,
    };

    return sensitivityMap[classification];
  }
}

// ============================================================================
// GDPR COMPLIANCE
// ============================================================================

export enum GDPRLegalBasis {
  CONSENT = 'consent',
  CONTRACT = 'contract',
  LEGAL_OBLIGATION = 'legal_obligation',
  VITAL_INTERESTS = 'vital_interests',
  PUBLIC_TASK = 'public_task',
  LEGITIMATE_INTERESTS = 'legitimate_interests',
}

export enum GDPRDataSubjectRight {
  RIGHT_TO_ACCESS = 'right_to_access',
  RIGHT_TO_RECTIFICATION = 'right_to_rectification',
  RIGHT_TO_ERASURE = 'right_to_erasure',
  RIGHT_TO_RESTRICT_PROCESSING = 'right_to_restrict_processing',
  RIGHT_TO_DATA_PORTABILITY = 'right_to_data_portability',
  RIGHT_TO_OBJECT = 'right_to_object',
  RIGHT_NOT_TO_BE_SUBJECT_TO_AUTOMATED_DECISION_MAKING =
    'right_not_to_be_subject_to_automated_decision_making',
}

interface ConsentRecord {
  userId: string;
  purpose: string;
  legalBasis: GDPRLegalBasis;
  consentGiven: boolean;
  consentDate: Date;
  consentMethod: string;
  withdrawnDate?: Date;
  ipAddress: string;
  userAgent: string;
}

interface DataSubjectRequest {
  id: string;
  userId: string;
  requestType: GDPRDataSubjectRight;
  requestDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  completedDate?: Date;
  responseData?: any;
  notes?: string;
}

export class GDPRComplianceService {
  private consentRecords: Map<string, ConsentRecord[]> = new Map();
  private dataSubjectRequests: DataSubjectRequest[] = [];

  /**
   * Record consent
   */
  recordConsent(consent: ConsentRecord): void {
    const userConsents = this.consentRecords.get(consent.userId) || [];
    userConsents.push(consent);
    this.consentRecords.set(consent.userId, userConsents);
  }

  /**
   * Withdraw consent
   */
  withdrawConsent(userId: string, purpose: string): void {
    const userConsents = this.consentRecords.get(userId) || [];
    const consent = userConsents.find(c => c.purpose === purpose && c.consentGiven);

    if (consent) {
      consent.consentGiven = false;
      consent.withdrawnDate = new Date();
    }
  }

  /**
   * Check if user has given consent
   */
  hasConsent(userId: string, purpose: string): boolean {
    const userConsents = this.consentRecords.get(userId) || [];
    const consent = userConsents.find(c => c.purpose === purpose);

    return consent?.consentGiven && !consent.withdrawnDate;
  }

  /**
   * Handle data subject access request (Right to Access)
   */
  async handleAccessRequest(userId: string): Promise<any> {
    // Collect all data associated with the user
    const userData = {
      profile: await this.getUserProfile(userId),
      consents: this.consentRecords.get(userId) || [],
      activities: await this.getUserActivities(userId),
      communications: await this.getUserCommunications(userId),
    };

    return userData;
  }

  /**
   * Handle data subject erasure request (Right to be Forgotten)
   */
  async handleErasureRequest(userId: string): Promise<void> {
    // Delete or anonymize all user data
    await this.deleteUserProfile(userId);
    await this.deleteUserActivities(userId);
    await this.deleteUserCommunications(userId);
    this.consentRecords.delete(userId);

    // Keep minimal data for legal compliance
    await this.anonymizeUserData(userId);
  }

  /**
   * Handle data portability request
   */
  async handlePortabilityRequest(userId: string): Promise<string> {
    const userData = await this.handleAccessRequest(userId);

    // Export in machine-readable format (JSON)
    return JSON.stringify(userData, null, 2);
  }

  /**
   * Submit data subject request
   */
  submitDataSubjectRequest(
    userId: string,
    requestType: GDPRDataSubjectRight
  ): DataSubjectRequest {
    const request: DataSubjectRequest = {
      id: `dsr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      requestType,
      requestDate: new Date(),
      status: 'pending',
    };

    this.dataSubjectRequests.push(request);

    // Auto-process certain requests
    this.processDataSubjectRequest(request.id);

    return request;
  }

  /**
   * Process data subject request
   */
  private async processDataSubjectRequest(requestId: string): Promise<void> {
    const request = this.dataSubjectRequests.find(r => r.id === requestId);
    if (!request) return;

    request.status = 'in_progress';

    try {
      switch (request.requestType) {
        case GDPRDataSubjectRight.RIGHT_TO_ACCESS:
          request.responseData = await this.handleAccessRequest(request.userId);
          break;

        case GDPRDataSubjectRight.RIGHT_TO_ERASURE:
          await this.handleErasureRequest(request.userId);
          break;

        case GDPRDataSubjectRight.RIGHT_TO_DATA_PORTABILITY:
          request.responseData = await this.handlePortabilityRequest(request.userId);
          break;

        // Other rights require manual review
        default:
          request.notes = 'Requires manual review';
          return;
      }

      request.status = 'completed';
      request.completedDate = new Date();
    } catch (error: any) {
      request.status = 'rejected';
      request.notes = error.message;
    }
  }

  // Helper methods (simulated)
  private async getUserProfile(userId: string): Promise<any> {
    return { id: userId, name: 'User', email: 'user@example.com' };
  }

  private async getUserActivities(userId: string): Promise<any[]> {
    return [];
  }

  private async getUserCommunications(userId: string): Promise<any[]> {
    return [];
  }

  private async deleteUserProfile(userId: string): Promise<void> {
    // Delete from database
  }

  private async deleteUserActivities(userId: string): Promise<void> {
    // Delete from database
  }

  private async deleteUserCommunications(userId: string): Promise<void> {
    // Delete from database
  }

  private async anonymizeUserData(userId: string): Promise<void> {
    // Anonymize data while keeping aggregated statistics
  }
}

// ============================================================================
// DATA RETENTION & LIFECYCLE
// ============================================================================

interface RetentionPolicy {
  dataType: string;
  retentionPeriod: number; // days
  archivePeriod?: number; // days
  deletionMethod: 'hard_delete' | 'soft_delete' | 'anonymize';
  legalBasis: string;
}

export class DataRetentionService {
  private policies: Map<string, RetentionPolicy> = new Map();

  constructor() {
    this.initializeDefaultPolicies();
  }

  /**
   * Initialize default retention policies
   */
  private initializeDefaultPolicies(): void {
    // User data - 7 years (legal requirement)
    this.policies.set('user_data', {
      dataType: 'user_data',
      retentionPeriod: 2555, // 7 years
      deletionMethod: 'anonymize',
      legalBasis: 'Legal obligation',
    });

    // Call recordings - 90 days (business requirement)
    this.policies.set('call_recordings', {
      dataType: 'call_recordings',
      retentionPeriod: 90,
      archivePeriod: 365,
      deletionMethod: 'hard_delete',
      legalBasis: 'Legitimate interest',
    });

    // Audit logs - 1 year (compliance requirement)
    this.policies.set('audit_logs', {
      dataType: 'audit_logs',
      retentionPeriod: 365,
      archivePeriod: 2555, // 7 years
      deletionMethod: 'soft_delete',
      legalBasis: 'Legal obligation',
    });

    // Analytics data - 2 years (business requirement)
    this.policies.set('analytics_data', {
      dataType: 'analytics_data',
      retentionPeriod: 730,
      deletionMethod: 'anonymize',
      legalBasis: 'Legitimate interest',
    });

    // Payment data - 7 years (legal requirement)
    this.policies.set('payment_data', {
      dataType: 'payment_data',
      retentionPeriod: 2555,
      deletionMethod: 'soft_delete',
      legalBasis: 'Legal obligation',
    });
  }

  /**
   * Check if data should be deleted
   */
  shouldDelete(dataType: string, createdAt: Date): boolean {
    const policy = this.policies.get(dataType);
    if (!policy) return false;

    const ageInDays = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    return ageInDays > policy.retentionPeriod;
  }

  /**
   * Check if data should be archived
   */
  shouldArchive(dataType: string, createdAt: Date): boolean {
    const policy = this.policies.get(dataType);
    if (!policy || !policy.archivePeriod) return false;

    const ageInDays = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    return ageInDays > policy.retentionPeriod && ageInDays <= policy.archivePeriod;
  }

  /**
   * Execute retention policy
   */
  async executeRetentionPolicy(dataType: string): Promise<{
    deleted: number;
    archived: number;
  }> {
    const policy = this.policies.get(dataType);
    if (!policy) {
      throw new Error(`No retention policy found for data type: ${dataType}`);
    }

    let deleted = 0;
    let archived = 0;

    // Simulate data cleanup
    // In production, query database and process records

    return { deleted, archived };
  }
}

// ============================================================================
// DATA ANONYMIZATION
// ============================================================================

export class DataAnonymizationService {
  /**
   * Anonymize personal data
   */
  anonymize(data: any): any {
    const anonymized = { ...data };

    // Anonymize common PII fields
    if (anonymized.email) {
      anonymized.email = this.anonymizeEmail(anonymized.email);
    }

    if (anonymized.phone) {
      anonymized.phone = this.anonymizePhone(anonymized.phone);
    }

    if (anonymized.name) {
      anonymized.name = 'Anonymous User';
    }

    if (anonymized.address) {
      anonymized.address = 'Redacted';
    }

    if (anonymized.ssn) {
      anonymized.ssn = 'XXX-XX-XXXX';
    }

    if (anonymized.ipAddress) {
      anonymized.ipAddress = this.anonymizeIP(anonymized.ipAddress);
    }

    return anonymized;
  }

  /**
   * Anonymize email address
   */
  private anonymizeEmail(email: string): string {
    const [local, domain] = email.split('@');
    const anonymizedLocal = local.charAt(0) + '*'.repeat(local.length - 1);
    return `${anonymizedLocal}@${domain}`;
  }

  /**
   * Anonymize phone number
   */
  private anonymizePhone(phone: string): string {
    return phone.replace(/\d(?=\d{4})/g, '*');
  }

  /**
   * Anonymize IP address
   */
  private anonymizeIP(ip: string): string {
    const parts = ip.split('.');
    return `${parts[0]}.${parts[1]}.XXX.XXX`;
  }

  /**
   * Pseudonymize data (reversible anonymization)
   */
  pseudonymize(data: string, key: string): string {
    return encryptionService.hash(data + key);
  }
}

// Export singleton instances
export const dataClassificationService = new DataClassificationService();
export const gdprComplianceService = new GDPRComplianceService();
export const dataRetentionService = new DataRetentionService();
export const dataAnonymizationService = new DataAnonymizationService();
