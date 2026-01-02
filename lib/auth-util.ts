import jwt from 'jsonwebtoken';

// GENERAL GATE: For all tenants (Team, Invoices, Settings)
export function verifyUser(authHeader: string | undefined) {
  if (!authHeader?.startsWith('Bearer ')) throw new Error('Missing token');
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
  if (!decoded) throw new Error('Unauthorized');
  return decoded; // Returns any valid tenant's info
}

// SOVEREIGN GATE: For your Private Wholesale Business only
export function verifySovereignOwner(authHeader: string | undefined) {
  const decoded = verifyUser(authHeader); // First check if they are a valid user
  if (decoded.email !== 'frontdeskllc@outlook.com') {
    throw new Error('Access Denied: Private Business Logic');
  }
  return decoded; // Only returns if it is YOU
}
