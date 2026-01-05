// import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

/**
 * THE GUARDIAN AGENT: Maximum Security & Firewall
 * Purpose: Threat detection, prompt injection shielding, and data integrity.
 */
export const guardianAgent = {
  name: "Security Guardian",

  /**
   * Scans incoming payloads for malicious patterns or 'Prompt Injection'
   */
  async scanThreat(payload: any): Promise<{ safe: boolean; riskScore: number }> {
    const content = JSON.stringify(payload).toLowerCase();
    
    // Patterns that suggest someone is trying to trick the AI CEO
    const maliciousPatterns = [
      'ignore previous instructions',
      'system override',
      'show me all api keys',
      'drop table',
      'admin access'
    ];

    const threatsFound = maliciousPatterns.filter(pattern => content.includes(pattern));
    const riskScore = threatsFound.length * 20;

    return {
      safe: riskScore < 40,
      riskScore
    };
  },

  /**
   * Verifies the Integrity of the signal (Checksum)
   * Ensures the data wasn't modified between the client and our CEO
   */
  verifyIntegrity(data: any, receivedHash: string): boolean {
    const secret = process.env.INTERNAL_SECURITY_SECRET || 'frontdesk-agents-secret';
    const computedHash = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(data))
      .digest('hex');
    
    return computedHash === receivedHash;
  },

  /**
   * Encrypts sensitive fields for "Data at Rest" security
   */
  encryptData(text: string) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(process.env.DB_ENCRYPTION_KEY!, 'salt', 32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return { iv: iv.toString('hex'), content: encrypted };
  }
};
