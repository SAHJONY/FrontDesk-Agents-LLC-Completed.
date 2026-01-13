/**
 * FRONTDESK AGENTS — JWT VERIFICATION
 * Node: pdx1 Deployment
 * Strategy: Export Aliasing for Platform-wide Compatibility
 */

// @ts-ignore
import jwt from 'jsonwebtoken';

export interface JWTPayload {
  sub: string;
  tenantId: string;
  tier: string;
  iat: number;
  exp: number;
}

/**
 * Core verification logic
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const secret = process.env.JWT_SECRET!;
    return jwt.verify(token, secret) as JWTPayload;
  } catch (error) {
    console.error('JWT Verification Failed:', error);
    return null;
  }
}

/**
 * ALIAS: verifyJWT 
 * This satisfies the import in /lib/api-handlers/admin/health-check.ts
 */
export const verifyJWT = verifyToken;
