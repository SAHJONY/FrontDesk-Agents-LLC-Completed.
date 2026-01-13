/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Middleware: Identity Verification & Tier-Based Gatekeeping
 */

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    userId: string;
    tenantId: string;
    email: string;
    role: 'owner' | 'admin' | 'manager' | 'user';
    tier: 'basic' | 'professional' | 'growth' | 'elite';
  };
}

export type AuthMiddleware = (
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) => (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

/**
 * CORE AUTHENTICATION: Validates the token and hydrates the request context.
 */
export const withAuth: AuthMiddleware = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = extractToken(req);
      
      if (!token) {
        return res.status(401).json({ error: 'UNAUTHORIZED', message: 'Identity token missing.' });
      }

      const secret = process.env.JWT_SECRET!;
      const decoded = jwt.verify(token, secret) as any;
      
      (req as AuthenticatedRequest).user = {
        userId: decoded.sub,
        tenantId: decoded.tenant_id,
        email: decoded.email,
        role: decoded.role,
        tier: decoded.tier,
      };

      return handler(req as AuthenticatedRequest, res);
      
    } catch (error: any) {
      const status = error.name === 'TokenExpiredError' ? 401 : 403;
      return res.status(status).json({ 
        error: 'AUTHENTICATION_FAILED', 
        message: error.message 
      });
    }
  };
};

/**
 * TIER GATEKEEPER: Enforces pricing tier constraints [cite: 2025-12-28]
 * Usage: export default withTier('growth', 'elite')(handler);
 */
export function withTier(...allowedTiers: string[]): AuthMiddleware {
  return (handler) => {
    return withAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
      const userTier = req.user?.tier;
      
      if (!userTier || !allowedTiers.includes(userTier)) {
        return res.status(403).json({ 
          error: 'UPGRADE_REQUIRED',
          message: `This resource requires: ${allowedTiers.join(', ')} access.`
        });
      }

      return handler(req, res);
    });
  };
}

function extractToken(req: NextApiRequest): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) return authHeader.substring(7);
  return req.cookies?.token || null;
}
