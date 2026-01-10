/**
 * Enterprise Security Infrastructure
 * Comprehensive security, encryption, and access control system
 */

import crypto from 'crypto';

// ============================================================================
// ENCRYPTION SYSTEM
// ============================================================================

interface EncryptionConfig {
  algorithm: string;
  keyLength: number;
  ivLength: number;
  saltLength: number;
  iterations: number;
  digest: string;
}

export class EncryptionService {
  private config: EncryptionConfig = {
    algorithm: 'aes-256-gcm',
    keyLength: 32,
    ivLength: 16,
    saltLength: 64,
    iterations: 100000,
    digest: 'sha512',
  };

  /**
   * Encrypt data with AES-256-GCM
   */
  encrypt(plaintext: string, masterKey: string): {
    encrypted: string;
    iv: string;
    authTag: string;
    salt: string;
  } {
    // Generate salt and IV
    const salt = crypto.randomBytes(this.config.saltLength);
    const iv = crypto.randomBytes(this.config.ivLength);

    // Derive key from master key using PBKDF2
    const key = crypto.pbkdf2Sync(
      masterKey,
      salt,
      this.config.iterations,
      this.config.keyLength,
      this.config.digest
    );

    // Create cipher
    const cipher = crypto.createCipheriv(this.config.algorithm, key, iv);

    // Encrypt
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Get authentication tag
    const authTag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      salt: salt.toString('hex'),
    };
  }

  /**
   * Decrypt data with AES-256-GCM
   */
  decrypt(
    encrypted: string,
    masterKey: string,
    iv: string,
    authTag: string,
    salt: string
  ): string {
    // Derive key from master key
    const key = crypto.pbkdf2Sync(
      masterKey,
      Buffer.from(salt, 'hex'),
      this.config.iterations,
      this.config.keyLength,
      this.config.digest
    );

    // Create decipher
    const decipher = crypto.createDecipheriv(
      this.config.algorithm,
      key,
      Buffer.from(iv, 'hex')
    );

    // Set authentication tag
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    // Decrypt
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * Hash data with SHA-512
   */
  hash(data: string): string {
    return crypto.createHash('sha512').update(data).digest('hex');
  }

  /**
   * Generate secure random token
   */
  generateToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Encrypt data at rest (for database storage)
   */
  encryptAtRest(data: any): string {
    const masterKey = process.env.ENCRYPTION_MASTER_KEY || this.generateToken(32);
    const plaintext = JSON.stringify(data);
    const encrypted = this.encrypt(plaintext, masterKey);

    // Combine all parts into single string
    return JSON.stringify(encrypted);
  }

  /**
   * Decrypt data at rest
   */
  decryptAtRest(encryptedData: string): any {
    const masterKey = process.env.ENCRYPTION_MASTER_KEY || '';
    const parts = JSON.parse(encryptedData);

    const decrypted = this.decrypt(
      parts.encrypted,
      masterKey,
      parts.iv,
      parts.authTag,
      parts.salt
    );

    return JSON.parse(decrypted);
  }
}

// ============================================================================
// ACCESS CONTROL SYSTEM
// ============================================================================

export enum Permission {
  // User Management
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',

  // Agent Management
  AGENT_CREATE = 'agent:create',
  AGENT_READ = 'agent:read',
  AGENT_UPDATE = 'agent:update',
  AGENT_DELETE = 'agent:delete',
  AGENT_DEPLOY = 'agent:deploy',

  // Call Management
  CALL_INITIATE = 'call:initiate',
  CALL_VIEW = 'call:view',
  CALL_LISTEN = 'call:listen',
  CALL_TERMINATE = 'call:terminate',

  // Data Access
  DATA_READ = 'data:read',
  DATA_WRITE = 'data:write',
  DATA_DELETE = 'data:delete',
  DATA_EXPORT = 'data:export',

  // Analytics
  ANALYTICS_VIEW = 'analytics:view',
  ANALYTICS_EXPORT = 'analytics:export',

  // Billing
  BILLING_VIEW = 'billing:view',
  BILLING_MANAGE = 'billing:manage',

  // Settings
  SETTINGS_VIEW = 'settings:view',
  SETTINGS_UPDATE = 'settings:update',

  // Security
  SECURITY_AUDIT = 'security:audit',
  SECURITY_MANAGE = 'security:manage',

  // API Keys
  API_KEY_CREATE = 'api_key:create',
  API_KEY_VIEW = 'api_key:view',
  API_KEY_DELETE = 'api_key:delete',

  // Integrations
  INTEGRATION_CONNECT = 'integration:connect',
  INTEGRATION_DISCONNECT = 'integration:disconnect',

  // Admin
  ADMIN_FULL_ACCESS = 'admin:*',
}

export enum Role {
  OWNER = 'owner',
  ADMIN = 'admin',
  MANAGER = 'manager',
  AGENT = 'agent',
  ANALYST = 'analyst',
  DEVELOPER = 'developer',
  VIEWER = 'viewer',
}

interface RolePermissions {
  role: Role;
  permissions: Permission[];
  description: string;
}

export class AccessControlService {
  private rolePermissions: Map<Role, Permission[]> = new Map();

  constructor() {
    this.initializeRoles();
  }

  /**
   * Initialize role-permission mappings
   */
  private initializeRoles(): void {
    // Owner - Full access
    this.rolePermissions.set(Role.OWNER, [Permission.ADMIN_FULL_ACCESS]);

    // Admin - Almost full access
    this.rolePermissions.set(Role.ADMIN, [
      Permission.USER_CREATE,
      Permission.USER_READ,
      Permission.USER_UPDATE,
      Permission.USER_DELETE,
      Permission.AGENT_CREATE,
      Permission.AGENT_READ,
      Permission.AGENT_UPDATE,
      Permission.AGENT_DELETE,
      Permission.AGENT_DEPLOY,
      Permission.CALL_INITIATE,
      Permission.CALL_VIEW,
      Permission.CALL_LISTEN,
      Permission.CALL_TERMINATE,
      Permission.DATA_READ,
      Permission.DATA_WRITE,
      Permission.DATA_DELETE,
      Permission.DATA_EXPORT,
      Permission.ANALYTICS_VIEW,
      Permission.ANALYTICS_EXPORT,
      Permission.BILLING_VIEW,
      Permission.BILLING_MANAGE,
      Permission.SETTINGS_VIEW,
      Permission.SETTINGS_UPDATE,
      Permission.SECURITY_AUDIT,
      Permission.API_KEY_CREATE,
      Permission.API_KEY_VIEW,
      Permission.API_KEY_DELETE,
      Permission.INTEGRATION_CONNECT,
      Permission.INTEGRATION_DISCONNECT,
    ]);

    // Manager - Team and operations management
    this.rolePermissions.set(Role.MANAGER, [
      Permission.USER_READ,
      Permission.AGENT_CREATE,
      Permission.AGENT_READ,
      Permission.AGENT_UPDATE,
      Permission.AGENT_DEPLOY,
      Permission.CALL_INITIATE,
      Permission.CALL_VIEW,
      Permission.CALL_LISTEN,
      Permission.DATA_READ,
      Permission.DATA_WRITE,
      Permission.ANALYTICS_VIEW,
      Permission.ANALYTICS_EXPORT,
      Permission.BILLING_VIEW,
      Permission.SETTINGS_VIEW,
    ]);

    // Agent - Call handling and basic operations
    this.rolePermissions.set(Role.AGENT, [
      Permission.AGENT_READ,
      Permission.CALL_INITIATE,
      Permission.CALL_VIEW,
      Permission.DATA_READ,
      Permission.ANALYTICS_VIEW,
    ]);

    // Analyst - Read-only access to data and analytics
    this.rolePermissions.set(Role.ANALYST, [
      Permission.AGENT_READ,
      Permission.CALL_VIEW,
      Permission.DATA_READ,
      Permission.ANALYTICS_VIEW,
      Permission.ANALYTICS_EXPORT,
    ]);

    // Developer - API and integration access
    this.rolePermissions.set(Role.DEVELOPER, [
      Permission.AGENT_READ,
      Permission.DATA_READ,
      Permission.API_KEY_CREATE,
      Permission.API_KEY_VIEW,
      Permission.API_KEY_DELETE,
      Permission.INTEGRATION_CONNECT,
      Permission.INTEGRATION_DISCONNECT,
    ]);

    // Viewer - Read-only access
    this.rolePermissions.set(Role.VIEWER, [
      Permission.AGENT_READ,
      Permission.CALL_VIEW,
      Permission.DATA_READ,
      Permission.ANALYTICS_VIEW,
    ]);
  }

  /**
   * Check if user has permission
   */
  hasPermission(userRole: Role, permission: Permission): boolean {
    const permissions = this.rolePermissions.get(userRole);
    if (!permissions) return false;

    // Owner has full access
    if (permissions.includes(Permission.ADMIN_FULL_ACCESS)) return true;

    return permissions.includes(permission);
  }

  /**
   * Check if user has any of the permissions
   */
  hasAnyPermission(userRole: Role, permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(userRole, permission));
  }

  /**
   * Check if user has all permissions
   */
  hasAllPermissions(userRole: Role, permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(userRole, permission));
  }

  /**
   * Get all permissions for a role
   */
  getRolePermissions(role: Role): Permission[] {
    return this.rolePermissions.get(role) || [];
  }

  /**
   * Authorize action
   */
  authorize(userRole: Role, requiredPermission: Permission): void {
    if (!this.hasPermission(userRole, requiredPermission)) {
      throw new Error(
        `Access denied: User with role '${userRole}' does not have permission '${requiredPermission}'`
      );
    }
  }
}

// ============================================================================
// AUDIT LOGGING SYSTEM
// ============================================================================

export enum AuditEventType {
  // Authentication
  LOGIN_SUCCESS = 'auth.login.success',
  LOGIN_FAILURE = 'auth.login.failure',
  LOGOUT = 'auth.logout',
  PASSWORD_CHANGE = 'auth.password.change',
  MFA_ENABLED = 'auth.mfa.enabled',
  MFA_DISABLED = 'auth.mfa.disabled',

  // User Management
  USER_CREATED = 'user.created',
  USER_UPDATED = 'user.updated',
  USER_DELETED = 'user.deleted',
  ROLE_CHANGED = 'user.role.changed',

  // Data Access
  DATA_READ = 'data.read',
  DATA_WRITE = 'data.write',
  DATA_DELETE = 'data.delete',
  DATA_EXPORT = 'data.export',

  // Agent Operations
  AGENT_CREATED = 'agent.created',
  AGENT_UPDATED = 'agent.updated',
  AGENT_DELETED = 'agent.deleted',
  AGENT_DEPLOYED = 'agent.deployed',

  // Call Operations
  CALL_INITIATED = 'call.initiated',
  CALL_COMPLETED = 'call.completed',
  CALL_TERMINATED = 'call.terminated',

  // Security Events
  UNAUTHORIZED_ACCESS = 'security.unauthorized_access',
  SUSPICIOUS_ACTIVITY = 'security.suspicious_activity',
  API_KEY_CREATED = 'security.api_key.created',
  API_KEY_DELETED = 'security.api_key.deleted',

  // Settings
  SETTINGS_CHANGED = 'settings.changed',
  INTEGRATION_CONNECTED = 'integration.connected',
  INTEGRATION_DISCONNECTED = 'integration.disconnected',
}

export enum AuditSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

interface AuditLog {
  id: string;
  timestamp: Date;
  eventType: AuditEventType;
  severity: AuditSeverity;
  userId: string;
  userRole: Role;
  ipAddress: string;
  userAgent: string;
  resource: string;
  action: string;
  result: 'success' | 'failure';
  details: any;
  metadata: any;
}

export class AuditLoggingService {
  private logs: AuditLog[] = [];

  /**
   * Log audit event
   */
  log(event: {
    eventType: AuditEventType;
    severity: AuditSeverity;
    userId: string;
    userRole: Role;
    ipAddress: string;
    userAgent: string;
    resource: string;
    action: string;
    result: 'success' | 'failure';
    details?: any;
    metadata?: any;
  }): void {
    const log: AuditLog = {
      id: crypto.randomBytes(16).toString('hex'),
      timestamp: new Date(),
      ...event,
    };

    this.logs.push(log);

    // In production, persist to database and send to SIEM
    this.persistLog(log);
    this.sendToSIEM(log);

    // Alert on critical events
    if (event.severity === AuditSeverity.CRITICAL) {
      this.sendAlert(log);
    }
  }

  /**
   * Persist log to database
   */
  private async persistLog(log: AuditLog): Promise<void> {
    // In production, save to database
    console.log('[AUDIT]', log);
  }

  /**
   * Send log to SIEM (Security Information and Event Management)
   */
  private async sendToSIEM(log: AuditLog): Promise<void> {
    // In production, integrate with SIEM tools like Splunk, Datadog, etc.
  }

  /**
   * Send alert for critical events
   */
  private async sendAlert(log: AuditLog): Promise<void> {
    // In production, send alerts via email, SMS, Slack, PagerDuty, etc.
    console.error('[CRITICAL ALERT]', log);
  }

  /**
   * Query audit logs
   */
  query(filters: {
    userId?: string;
    eventType?: AuditEventType;
    severity?: AuditSeverity;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): AuditLog[] {
    let filtered = this.logs;

    if (filters.userId) {
      filtered = filtered.filter(log => log.userId === filters.userId);
    }

    if (filters.eventType) {
      filtered = filtered.filter(log => log.eventType === filters.eventType);
    }

    if (filters.severity) {
      filtered = filtered.filter(log => log.severity === filters.severity);
    }

    if (filters.startDate) {
      filtered = filtered.filter(log => log.timestamp >= filters.startDate!);
    }

    if (filters.endDate) {
      filtered = filtered.filter(log => log.timestamp <= filters.endDate!);
    }

    // Sort by timestamp descending
    filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Apply limit
    if (filters.limit) {
      filtered = filtered.slice(0, filters.limit);
    }

    return filtered;
  }

  /**
   * Export audit logs
   */
  export(format: 'json' | 'csv' = 'json'): string {
    if (format === 'json') {
      return JSON.stringify(this.logs, null, 2);
    }

    // CSV export
    const headers = [
      'id',
      'timestamp',
      'eventType',
      'severity',
      'userId',
      'userRole',
      'ipAddress',
      'resource',
      'action',
      'result',
    ];

    const rows = this.logs.map(log => [
      log.id,
      log.timestamp.toISOString(),
      log.eventType,
      log.severity,
      log.userId,
      log.userRole,
      log.ipAddress,
      log.resource,
      log.action,
      log.result,
    ]);

    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  }
}

// ============================================================================
// SECURITY MONITORING
// ============================================================================

interface SecurityMetrics {
  failedLoginAttempts: number;
  unauthorizedAccessAttempts: number;
  suspiciousActivities: number;
  dataExports: number;
  apiKeyCreations: number;
  criticalEvents: number;
}

export class SecurityMonitoringService {
  private auditService: AuditLoggingService;

  constructor(auditService: AuditLoggingService) {
    this.auditService = auditService;
  }

  /**
   * Get security metrics
   */
  getMetrics(timeRange: { start: Date; end: Date }): SecurityMetrics {
    const logs = this.auditService.query({
      startDate: timeRange.start,
      endDate: timeRange.end,
    });

    return {
      failedLoginAttempts: logs.filter(
        log => log.eventType === AuditEventType.LOGIN_FAILURE
      ).length,
      unauthorizedAccessAttempts: logs.filter(
        log => log.eventType === AuditEventType.UNAUTHORIZED_ACCESS
      ).length,
      suspiciousActivities: logs.filter(
        log => log.eventType === AuditEventType.SUSPICIOUS_ACTIVITY
      ).length,
      dataExports: logs.filter(log => log.eventType === AuditEventType.DATA_EXPORT).length,
      apiKeyCreations: logs.filter(log => log.eventType === AuditEventType.API_KEY_CREATED)
        .length,
      criticalEvents: logs.filter(log => log.severity === AuditSeverity.CRITICAL).length,
    };
  }

  /**
   * Detect anomalies
   */
  detectAnomalies(): Array<{ type: string; description: string; severity: AuditSeverity }> {
    const anomalies: Array<{ type: string; description: string; severity: AuditSeverity }> = [];

    const last24Hours = {
      start: new Date(Date.now() - 24 * 60 * 60 * 1000),
      end: new Date(),
    };

    const metrics = this.getMetrics(last24Hours);

    // Check for excessive failed logins
    if (metrics.failedLoginAttempts > 10) {
      anomalies.push({
        type: 'excessive_failed_logins',
        description: `${metrics.failedLoginAttempts} failed login attempts in last 24 hours`,
        severity: AuditSeverity.WARNING,
      });
    }

    // Check for unauthorized access attempts
    if (metrics.unauthorizedAccessAttempts > 5) {
      anomalies.push({
        type: 'unauthorized_access',
        description: `${metrics.unauthorizedAccessAttempts} unauthorized access attempts detected`,
        severity: AuditSeverity.CRITICAL,
      });
    }

    // Check for suspicious activities
    if (metrics.suspiciousActivities > 0) {
      anomalies.push({
        type: 'suspicious_activity',
        description: `${metrics.suspiciousActivities} suspicious activities detected`,
        severity: AuditSeverity.CRITICAL,
      });
    }

    return anomalies;
  }
}

// Export singleton instances
export const encryptionService = new EncryptionService();
export const accessControlService = new AccessControlService();
export const auditLoggingService = new AuditLoggingService();
export const securityMonitoringService = new SecurityMonitoringService(auditLoggingService);
