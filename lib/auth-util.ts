import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyUser(authHeader: string | undefined) {
  if (!authHeader) throw new Error('Missing auth header');
  const token = authHeader.replace('Bearer ', '');
  return jwt.verify(token, JWT_SECRET);
}

export function verifyInternalAdmin(authHeader: string | undefined) {
  const decoded: any = verifyUser(authHeader);
  if (decoded.role !== 'internal_admin') {
    throw new Error('Unauthorized');
  }
  return decoded;
}

/**
 * REQUIRED BY:
 * - pages/api/wholesale/get-leads.ts
 * - app/api/owner/notify-funding.ts
 */
export function verifySovereignOwner(authHeader: string | undefined) {
  const decoded: any = verifyUser(authHeader);
  if (decoded.role !== 'sovereign_owner') {
    throw new Error('Unauthorized');
  }
  return decoded;
}
