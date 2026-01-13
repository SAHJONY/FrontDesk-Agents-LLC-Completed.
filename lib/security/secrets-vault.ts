/**
 * Proprietary Secrets Protection Vault
 * Enterprise-grade secrets management with HSM-level security
 */

import { encryptionService } from './security-infrastructure';
import crypto from 'crypto';

// ============================================================================
// SECRETS VAULT
// ============================================================================

export enum SecretType {
  API_KEY = 'api_key',
  DATABASE_CREDENTIAL = 'database_credential',
  ENCRYPTION_KEY = 'encryption_key',
  OAUTH_TOKEN = 'oauth_token',
  CERTIFICATE = 'certificate',
  PRIVATE_KEY = 'private_key',
  WEBHOOK_SECRET = 'webhook_secret',
  PROPRIETARY_ALGORITHM = 'proprietary_algorithm',
  TRADE_SECRET = 'trade_secret',
  BUSINESS_LOGIC = 'business_logic',
}

export enum SecretAccessLevel {
  PUBLIC = 'public',
  INTERNAL = 'internal',
  CONFIDENTIAL = 'confidential',
  TOP_SECRET = 'top_secret',
}

interface Secret {
  id: string;
  name: string;
  type: SecretType;
  accessLevel: SecretAccessLevel;
  encryptedValue: string;
  iv: string;
  authTag: string;
  salt: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastAccessedAt?: Date;
  lastAccessedBy?: string;
  expiresAt?: Date;
  rotationPolicy?: RotationPolicy;
  metadata: Record<string, any>;
}

interface RotationPolicy {
  enabled: boolean;
  intervalDays: number;
  lastRotated: Date;
  nextRotation: Date;
}

interface SecretAccessLog {
  secretId: string;
  userId: string;
  action: 'read' | 'write' | 'delete' | 'rotate';
  timestamp: Date;
  ipAddress: string;
  success: boolean;
  reason?: string;
}

export class SecretsVault {
  private secrets: Map<string, Secret> = new Map();
  private accessLogs: SecretAccessLog[] = [];
  private masterKey: string;

  constructor() {
    this.masterKey = process.env.VAULT_MASTER_KEY || this.generateMasterKey();
  }

  /**
   * Generate master key for vault
   */
  private generateMasterKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Store secret in vault
   */
  async storeSecret(params: {
    name: string;
    value: string;
    type: SecretType;
    accessLevel: SecretAccessLevel;
    createdBy: string;
    expiresAt?: Date;
    rotationIntervalDays?: number;
    metadata?: Record<string, any>;
  }): Promise<string> {
    // Encrypt the secret value
    const encrypted = encryptionService.encrypt(params.value, this.masterKey);

    // Create secret object
    const secret: Secret = {
      id: `secret_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`,
      name: params.name,
      type: params.type,
      accessLevel: params.accessLevel,
      encryptedValue: encrypted.encrypted,
      iv: encrypted.iv,
      authTag: encrypted.authTag,
      salt: encrypted.salt,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: params.createdBy,
      expiresAt: params.expiresAt,
      metadata: params.metadata || {},
    };

    // Set rotation policy if specified
    if (params.rotationIntervalDays) {
      secret.rotationPolicy = {
        enabled: true,
        intervalDays: params.rotationIntervalDays,
        lastRotated: new Date(),
        nextRotation: new Date(Date.now() + params.rotationIntervalDays * 24 * 60 * 60 * 1000),
      };
    }

    // Store in vault
    this.secrets.set(secret.id, secret);

    // Log access
    this.logAccess({
      secretId: secret.id,
      userId: params.createdBy,
      action: 'write',
      timestamp: new Date(),
      ipAddress: '0.0.0.0',
      success: true,
    });

    return secret.id;
  }

  /**
   * Retrieve secret from vault
   */
  async retrieveSecret(
    secretId: string,
    userId: string,
    requiredAccessLevel: SecretAccessLevel
  ): Promise<string> {
    const secret = this.secrets.get(secretId);

    if (!secret) {
      this.logAccess({
        secretId,
        userId,
        action: 'read',
        timestamp: new Date(),
        ipAddress: '0.0.0.0',
        success: false,
        reason: 'Secret not found',
      });
      throw new Error('Secret not found');
    }

    // Check access level
    if (!this.hasAccess(secret.accessLevel, requiredAccessLevel)) {
      this.logAccess({
        secretId,
        userId,
        action: 'read',
        timestamp: new Date(),
        ipAddress: '0.0.0.0',
        success: false,
        reason: 'Insufficient access level',
      });
      throw new Error('Access denied: Insufficient access level');
    }

    // Check expiration
    if (secret.expiresAt && secret.expiresAt < new Date()) {
      this.logAccess({
        secretId,
        userId,
        action: 'read',
        timestamp: new Date(),
        ipAddress: '0.0.0.0',
        success: false,
        reason: 'Secret expired',
      });
      throw new Error('Secret has expired');
    }

    // Decrypt the secret
    const decrypted = encryptionService.decrypt(
      secret.encryptedValue,
      this.masterKey,
      secret.iv,
      secret.authTag,
      secret.salt
    );

    // Update access tracking
    secret.lastAccessedAt = new Date();
    secret.lastAccessedBy = userId;

    // Log successful access
    this.logAccess({
      secretId,
      userId,
      action: 'read',
      timestamp: new Date(),
      ipAddress: '0.0.0.0',
      success: true,
    });

    return decrypted;
  }

  /**
   * Rotate secret
   */
  async rotateSecret(secretId: string, newValue: string, userId: string): Promise<void> {
    const secret = this.secrets.get(secretId);

    if (!secret) {
      throw new Error('Secret not found');
    }

    // Encrypt new value
    const encrypted = encryptionService.encrypt(newValue, this.masterKey);

    // Update secret
    secret.encryptedValue = encrypted.encrypted;
    secret.iv = encrypted.iv;
    secret.authTag = encrypted.authTag;
    secret.salt = encrypted.salt;
    secret.version += 1;
    secret.updatedAt = new Date();

    // Update rotation policy
    if (secret.rotationPolicy) {
      secret.rotationPolicy.lastRotated = new Date();
      secret.rotationPolicy.nextRotation = new Date(
        Date.now() + secret.rotationPolicy.intervalDays * 24 * 60 * 60 * 1000
      );
    }

    // Log rotation
    this.logAccess({
      secretId,
      userId,
      action: 'rotate',
      timestamp: new Date(),
      ipAddress: '0.0.0.0',
      success: true,
    });
  }

  /**
   * Delete secret from vault
   */
  async deleteSecret(secretId: string, userId: string): Promise<void> {
    const secret = this.secrets.get(secretId);

    if (!secret) {
      throw new Error('Secret not found');
    }

    // Delete secret
    this.secrets.delete(secretId);

    // Log deletion
    this.logAccess({
      secretId,
      userId,
      action: 'delete',
      timestamp: new Date(),
      ipAddress: '0.0.0.0',
      success: true,
    });
  }

  /**
   * Check if user has required access level
   */
  private hasAccess(
    secretAccessLevel: SecretAccessLevel,
    requiredAccessLevel: SecretAccessLevel
  ): boolean {
    const accessLevels = [
      SecretAccessLevel.PUBLIC,
      SecretAccessLevel.INTERNAL,
      SecretAccessLevel.CONFIDENTIAL,
      SecretAccessLevel.TOP_SECRET,
    ];

    const secretLevel = accessLevels.indexOf(secretAccessLevel);
    const requiredLevel = accessLevels.indexOf(requiredAccessLevel);

    return requiredLevel >= secretLevel;
  }

  /**
   * Log secret access
   */
  private logAccess(log: SecretAccessLog): void {
    this.accessLogs.push(log);

    // In production, persist to secure audit log
    console.log('[VAULT ACCESS]', log);
  }

  /**
   * Get secrets due for rotation
   */
  getSecretsForRotation(): Secret[] {
    const now = new Date();

    return Array.from(this.secrets.values()).filter(
      secret =>
        secret.rotationPolicy &&
        secret.rotationPolicy.enabled &&
        secret.rotationPolicy.nextRotation <= now
    );
  }

  /**
   * Get access logs for a secret
   */
  getAccessLogs(secretId: string): SecretAccessLog[] {
    return this.accessLogs.filter(log => log.secretId === secretId);
  }

  /**
   * Export vault (encrypted)
   */
  exportVault(): string {
    const vaultData = {
      secrets: Array.from(this.secrets.values()),
      exportedAt: new Date(),
      version: '1.0',
    };

    return encryptionService.encryptAtRest(vaultData);
  }

  /**
   * Import vault (encrypted)
   */
  importVault(encryptedVault: string): void {
    const vaultData = encryptionService.decryptAtRest(encryptedVault);

    for (const secret of vaultData.secrets) {
      this.secrets.set(secret.id, secret);
    }
  }
}

// ============================================================================
// PROPRIETARY ALGORITHMS PROTECTION
// ============================================================================

interface ProprietaryAlgorithm {
  id: string;
  name: string;
  description: string;
  code: string; // Encrypted
  version: string;
  classification: 'trade_secret' | 'patent_pending' | 'patented' | 'confidential';
  owner: string;
  accessRestrictions: string[];
  createdAt: Date;
  lastModified: Date;
}

export class ProprietaryAlgorithmsVault {
  private algorithms: Map<string, ProprietaryAlgorithm> = new Map();
  private vault: SecretsVault;

  constructor(vault: SecretsVault) {
    this.vault = vault;
  }

  /**
   * Store proprietary algorithm
   */
  async storeAlgorithm(params: {
    name: string;
    description: string;
    code: string;
    version: string;
    classification: 'trade_secret' | 'patent_pending' | 'patented' | 'confidential';
    owner: string;
    accessRestrictions: string[];
  }): Promise<string> {
    // Store algorithm code in secrets vault
    const secretId = await this.vault.storeSecret({
      name: `algorithm_${params.name}`,
      value: params.code,
      type: SecretType.PROPRIETARY_ALGORITHM,
      accessLevel: SecretAccessLevel.TOP_SECRET,
      createdBy: params.owner,
      metadata: {
        algorithmName: params.name,
        version: params.version,
      },
    });

    // Create algorithm metadata
    const algorithm: ProprietaryAlgorithm = {
      id: secretId,
      name: params.name,
      description: params.description,
      code: secretId, // Reference to secret
      version: params.version,
      classification: params.classification,
      owner: params.owner,
      accessRestrictions: params.accessRestrictions,
      createdAt: new Date(),
      lastModified: new Date(),
    };

    this.algorithms.set(algorithm.id, algorithm);

    return algorithm.id;
  }

  /**
   * Retrieve proprietary algorithm
   */
  async retrieveAlgorithm(algorithmId: string, userId: string): Promise<string> {
    const algorithm = this.algorithms.get(algorithmId);

    if (!algorithm) {
      throw new Error('Algorithm not found');
    }

    // Check access restrictions
    if (
      algorithm.accessRestrictions.length > 0 &&
      !algorithm.accessRestrictions.includes(userId)
    ) {
      throw new Error('Access denied: User not authorized to access this algorithm');
    }

    // Retrieve from vault
    return await this.vault.retrieveSecret(
      algorithm.code,
      userId,
      SecretAccessLevel.TOP_SECRET
    );
  }

  /**
   * List algorithms (metadata only)
   */
  listAlgorithms(userId: string): Array<Omit<ProprietaryAlgorithm, 'code'>> {
    return Array.from(this.algorithms.values())
      .filter(
        algo => algo.accessRestrictions.length === 0 || algo.accessRestrictions.includes(userId)
      )
      .map(({ code, ...metadata }) => metadata);
  }
}

// ============================================================================
// BUSINESS LOGIC PROTECTION
// ============================================================================

interface BusinessLogic {
  id: string;
  name: string;
  description: string;
  logic: string; // Encrypted
  category: 'pricing' | 'workflow' | 'decision_tree' | 'scoring' | 'routing' | 'other';
  confidentialityLevel: 'internal' | 'confidential' | 'trade_secret';
  owner: string;
  dependencies: string[];
  createdAt: Date;
  lastModified: Date;
}

export class BusinessLogicVault {
  private logicItems: Map<string, BusinessLogic> = new Map();
  private vault: SecretsVault;

  constructor(vault: SecretsVault) {
    this.vault = vault;
  }

  /**
   * Store business logic
   */
  async storeLogic(params: {
    name: string;
    description: string;
    logic: string;
    category: 'pricing' | 'workflow' | 'decision_tree' | 'scoring' | 'routing' | 'other';
    confidentialityLevel: 'internal' | 'confidential' | 'trade_secret';
    owner: string;
    dependencies?: string[];
  }): Promise<string> {
    // Determine access level based on confidentiality
    const accessLevelMap = {
      internal: SecretAccessLevel.INTERNAL,
      confidential: SecretAccessLevel.CONFIDENTIAL,
      trade_secret: SecretAccessLevel.TOP_SECRET,
    };

    // Store logic in secrets vault
    const secretId = await this.vault.storeSecret({
      name: `business_logic_${params.name}`,
      value: params.logic,
      type: SecretType.BUSINESS_LOGIC,
      accessLevel: accessLevelMap[params.confidentialityLevel],
      createdBy: params.owner,
      metadata: {
        logicName: params.name,
        category: params.category,
      },
    });

    // Create logic metadata
    const logic: BusinessLogic = {
      id: secretId,
      name: params.name,
      description: params.description,
      logic: secretId, // Reference to secret
      category: params.category,
      confidentialityLevel: params.confidentialityLevel,
      owner: params.owner,
      dependencies: params.dependencies || [],
      createdAt: new Date(),
      lastModified: new Date(),
    };

    this.logicItems.set(logic.id, logic);

    return logic.id;
  }

  /**
   * Retrieve business logic
   */
  async retrieveLogic(logicId: string, userId: string): Promise<string> {
    const logic = this.logicItems.get(logicId);

    if (!logic) {
      throw new Error('Business logic not found');
    }

    // Determine required access level
    const accessLevelMap = {
      internal: SecretAccessLevel.INTERNAL,
      confidential: SecretAccessLevel.CONFIDENTIAL,
      trade_secret: SecretAccessLevel.TOP_SECRET,
    };

    // Retrieve from vault
    return await this.vault.retrieveSecret(
      logic.logic,
      userId,
      accessLevelMap[logic.confidentialityLevel]
    );
  }
}

// Export singleton instances
export const secretsVault = new SecretsVault();
export const proprietaryAlgorithmsVault = new ProprietaryAlgorithmsVault(secretsVault);
export const businessLogicVault = new BusinessLogicVault(secretsVault);
