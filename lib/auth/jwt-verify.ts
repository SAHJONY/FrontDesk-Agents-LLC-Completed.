/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Utility: Secure JWT Verification & Payload Extraction
 */

import jwt from 'jsonwebtoken';

export interface JWTPayload {
  sub: string;       // User ID
  tenant_id: string; // Tenant Context
  email: string;
  role: 'owner' | 'admin' | 'manager' | 'user';
  tier: 'basic' | 'professional' | 'growth' | 'elite';
  type: 'access' | 'refresh';
  iat?: number;
  exp?: number;
}

/**
 * Validates the token against the Sovereign Hub's secret key.
 * Handles graceful error reporting for expired or tampered sessions.
 */
export function verifyJWT(token: string): JWTPayload {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('SYSTEM_CONFIGURATION_ERROR: JWT_SECRET_MISSING');
  }

  try {
    const decoded = jwt.verify(token, secret) as JWTPayload;
    
    // Safety check for token purpose
    if (decoded.type !== 'access') {
      throw new Error('INVALID_TOKEN_TYPE');
    }

    return decoded;
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('SESSION_EXPIRED');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('AUTHENTICATION_TAMPERED_OR_INVALID');
    }
    throw error;
  }
}

/**
 * Decodes a token without verifying the signature. 
 * Used for pre-flight hydration of UI states before the secure API call.
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}
