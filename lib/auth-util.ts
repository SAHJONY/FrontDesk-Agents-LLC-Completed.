import jwt from 'jsonwebtoken';

export interface OwnerSession {
  tenant_id: string;
  email: string;
  tier: string;
}

/**
 * @name verifyOwner
 * @description Validates that the caller is the specific platform owner.
 */
export function verifyOwner(authHeader: string | undefined): OwnerSession {
  if (!authHeader?.startsWith('Bearer ')) throw new Error('Missing token');
  
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;

  // COMPILER FIX: Strict identity and null check
  if (!decoded || typeof decoded !== 'object' || decoded.email !== 'frontdeskllc@outlook.com') {
    throw new Error('Sovereign Owner Access Required');
  }

  return {
    tenant_id: decoded.tenant_id,
    email: decoded.email,
    tier: decoded.tier
  };
}
