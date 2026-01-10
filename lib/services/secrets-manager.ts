/**
 * Secrets Manager Service
 * 
 * Secure management of platform secrets and environment variables
 * Includes encryption, audit logging, and access control
 */

import crypto from 'crypto';

// Encryption configuration
const ENCRYPTION_ALGORITHM = 'aes-256-gcm';
const ENCRYPTION_KEY = process.env.SECRETS_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');

export interface Secret {
  id: string;
  key: string;
  value: string; // Encrypted
  category: 'api_key' | 'database' | 'oauth' | 'webhook' | 'email' | 'payment' | 'other';
  description?: string;
  environment: 'development' | 'staging' | 'production' | 'all';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastAccessedAt?: Date;
  isActive: boolean;
}

export interface SecretAuditLog {
  id: string;
  secretId: string;
  action: 'created' | 'read' | 'updated' | 'deleted' | 'rotated';
  userId: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  details?: string;
}

/**
 * Encrypt a secret value
 */
export function encryptSecret(plaintext: string): { encrypted: string; iv: string; tag: string } {
  const iv = crypto.randomBytes(16);
  const key = Buffer.from(ENCRYPTION_KEY.slice(0, 64), 'hex');
  
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
  
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const tag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    tag: tag.toString('hex')
  };
}

/**
 * Decrypt a secret value
 */
export function decryptSecret(encrypted: string, iv: string, tag: string): string {
  const key = Buffer.from(ENCRYPTION_KEY.slice(0, 64), 'hex');
  
  const decipher = crypto.createDecipheriv(
    ENCRYPTION_ALGORITHM,
    key,
    Buffer.from(iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(tag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

/**
 * Secrets Manager Class
 */
export class SecretsManager {
  /**
   * Get all secrets (values masked)
   */
  static async listSecrets(userId: string, environment?: string): Promise<Secret[]> {
    // In production, this would query from database
    // For now, return mock data structure
    
    const secrets: Secret[] = [
      {
        id: 'secret_1',
        key: 'OPENAI_API_KEY',
        value: '***encrypted***',
        category: 'api_key',
        description: 'OpenAI API key for AI agents',
        environment: 'production',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: userId,
        isActive: true
      },
      {
        id: 'secret_2',
        key: 'BLAND_AI_API_KEY',
        value: '***encrypted***',
        category: 'api_key',
        description: 'Bland.AI API key for voice agents',
        environment: 'production',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: userId,
        isActive: true
      },
      {
        id: 'secret_3',
        key: 'DATABASE_URL',
        value: '***encrypted***',
        category: 'database',
        description: 'Supabase database connection string',
        environment: 'production',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: userId,
        isActive: true
      }
    ];
    
    if (environment) {
      return secrets.filter(s => s.environment === environment || s.environment === 'all');
    }
    
    return secrets;
  }

  /**
   * Get a specific secret (decrypted)
   */
  static async getSecret(secretId: string, userId: string): Promise<Secret | null> {
    // Log access
    await this.logAccess(secretId, userId, 'read');
    
    // In production, query from database and decrypt
    // For now, return mock
    return null;
  }

  /**
   * Create a new secret
   */
  static async createSecret(
    key: string,
    value: string,
    category: Secret['category'],
    environment: Secret['environment'],
    userId: string,
    description?: string
  ): Promise<Secret> {
    // Encrypt the value
    const { encrypted, iv, tag } = encryptSecret(value);
    
    const secret: Secret = {
      id: `secret_${Date.now()}`,
      key,
      value: `${encrypted}:${iv}:${tag}`, // Store encrypted with IV and tag
      category,
      description,
      environment,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId,
      isActive: true
    };
    
    // In production, save to database
    // await db.secrets.create(secret);
    
    // Log creation
    await this.logAccess(secret.id, userId, 'created', `Created secret: ${key}`);
    
    return secret;
  }

  /**
   * Update a secret
   */
  static async updateSecret(
    secretId: string,
    updates: Partial<Pick<Secret, 'value' | 'description' | 'isActive'>>,
    userId: string
  ): Promise<Secret | null> {
    // If updating value, encrypt it
    if (updates.value) {
      const { encrypted, iv, tag } = encryptSecret(updates.value);
      updates.value = `${encrypted}:${iv}:${tag}`;
    }
    
    // In production, update in database
    // await db.secrets.update(secretId, updates);
    
    // Log update
    await this.logAccess(secretId, userId, 'updated', 'Secret updated');
    
    return null;
  }

  /**
   * Delete a secret
   */
  static async deleteSecret(secretId: string, userId: string): Promise<boolean> {
    // In production, soft delete in database
    // await db.secrets.update(secretId, { isActive: false, deletedAt: new Date() });
    
    // Log deletion
    await this.logAccess(secretId, userId, 'deleted', 'Secret deleted');
    
    return true;
  }

  /**
   * Rotate a secret (generate new value)
   */
  static async rotateSecret(secretId: string, newValue: string, userId: string): Promise<Secret | null> {
    // Encrypt new value
    const { encrypted, iv, tag } = encryptSecret(newValue);
    
    // In production, update in database
    // await db.secrets.update(secretId, { 
    //   value: `${encrypted}:${iv}:${tag}`,
    //   updatedAt: new Date()
    // });
    
    // Log rotation
    await this.logAccess(secretId, userId, 'rotated', 'Secret rotated');
    
    return null;
  }

  /**
   * Get audit logs for a secret
   */
  static async getAuditLogs(secretId?: string, limit: number = 50): Promise<SecretAuditLog[]> {
    // In production, query from database
    // return await db.secretAuditLogs.find({ secretId }).limit(limit);
    
    return [];
  }

  /**
   * Log secret access
   */
  private static async logAccess(
    secretId: string,
    userId: string,
    action: SecretAuditLog['action'],
    details?: string
  ): Promise<void> {
    const log: SecretAuditLog = {
      id: `log_${Date.now()}`,
      secretId,
      action,
      userId,
      timestamp: new Date(),
      details
    };
    
    // In production, save to database
    // await db.secretAuditLogs.create(log);
    
    console.log(`[Secrets Audit] ${action} - Secret: ${secretId} - User: ${userId}`);
  }

  /**
   * Export secrets to environment variable format
   */
  static async exportToEnv(environment: string, userId: string): Promise<string> {
    const secrets = await this.listSecrets(userId, environment);
    
    let envContent = `# Environment: ${environment}\n`;
    envContent += `# Generated: ${new Date().toISOString()}\n`;
    envContent += `# DO NOT COMMIT THIS FILE\n\n`;
    
    for (const secret of secrets) {
      if (secret.description) {
        envContent += `# ${secret.description}\n`;
      }
      envContent += `${secret.key}=<encrypted_value>\n\n`;
    }
    
    return envContent;
  }

  /**
   * Import secrets from environment variable format
   */
  static async importFromEnv(
    envContent: string,
    environment: Secret['environment'],
    userId: string
  ): Promise<{ imported: number; errors: string[] }> {
    const lines = envContent.split('\n');
    let imported = 0;
    const errors: string[] = [];
    
    for (const line of lines) {
      // Skip comments and empty lines
      if (line.trim().startsWith('#') || !line.trim()) continue;
      
      // Parse KEY=VALUE
      const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
      if (!match) {
        errors.push(`Invalid format: ${line}`);
        continue;
      }
      
      const [, key, value] = match;
      
      try {
        await this.createSecret(
          key,
          value,
          'other',
          environment,
          userId
        );
        imported++;
      } catch (error) {
        errors.push(`Failed to import ${key}: ${error}`);
      }
    }
    
    return { imported, errors };
  }

  /**
   * Validate secret key format
   */
  static validateKey(key: string): { valid: boolean; error?: string } {
    if (!key) {
      return { valid: false, error: 'Key is required' };
    }
    
    if (!/^[A-Z_][A-Z0-9_]*$/.test(key)) {
      return { 
        valid: false, 
        error: 'Key must start with a letter or underscore and contain only uppercase letters, numbers, and underscores' 
      };
    }
    
    if (key.length > 100) {
      return { valid: false, error: 'Key must be 100 characters or less' };
    }
    
    return { valid: true };
  }

  /**
   * Check if a secret exists
   */
  static async secretExists(key: string, environment: string): Promise<boolean> {
    // In production, query database
    // return await db.secrets.exists({ key, environment });
    return false;
  }
}

/**
 * Predefined secret categories with descriptions
 */
export const SECRET_CATEGORIES = {
  api_key: {
    label: 'API Key',
    description: 'Third-party API keys and tokens',
    icon: '🔑',
    examples: ['OPENAI_API_KEY', 'BLAND_AI_API_KEY', 'STRIPE_API_KEY']
  },
  database: {
    label: 'Database',
    description: 'Database connection strings and credentials',
    icon: '🗄️',
    examples: ['DATABASE_URL', 'REDIS_URL', 'MONGODB_URI']
  },
  oauth: {
    label: 'OAuth',
    description: 'OAuth client IDs and secrets',
    icon: '🔐',
    examples: ['GOOGLE_CLIENT_ID', 'GITHUB_CLIENT_SECRET']
  },
  webhook: {
    label: 'Webhook',
    description: 'Webhook URLs and signing secrets',
    icon: '🔗',
    examples: ['WEBHOOK_SECRET', 'SLACK_WEBHOOK_URL']
  },
  email: {
    label: 'Email',
    description: 'Email service credentials',
    icon: '📧',
    examples: ['SMTP_PASSWORD', 'SENDGRID_API_KEY']
  },
  payment: {
    label: 'Payment',
    description: 'Payment gateway credentials',
    icon: '💳',
    examples: ['STRIPE_SECRET_KEY', 'PAYPAL_CLIENT_SECRET']
  },
  other: {
    label: 'Other',
    description: 'Other secrets and configuration',
    icon: '⚙️',
    examples: ['JWT_SECRET', 'ENCRYPTION_KEY']
  }
} as const;
