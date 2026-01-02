/**
 * FRONTDESK AGENTS — JWT VERIFICATION
 * Node: pdx1 Deployment
 * Strategy: Type-Safe Security Bypass
 */

// @ts-ignore
import jwt from 'jsonwebtoken';

export interface JWTPayload {
  sub: string;       // User ID
  tenantId: string;  // FrontDesk Tenant Attribution
  tier: string;      // Basic, Professional, Growth, or Elite
  iat: number;
  exp: number;
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const secret = process.env.JWT_SECRET!;
    // Explicitly casting the return to satisfy the JWTPayload interface
    return jwt.verify(token, secret) as JWTPayload;
  } catch (error) {
    console.error('JWT Verification Failed:', error);
    return null;
  }
}
