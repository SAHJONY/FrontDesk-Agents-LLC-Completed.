import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';

/**
 * INTERNAL ADMIN AUTH
 * Valida el acceso para operaciones de la fuerza de trabajo global.
 */
export function verifyInternalAdmin(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");

  // Validación contra el secreto definido en Vercel
  if (!token || token !== process.env.INTERNAL_ADMIN_TOKEN) {
    throw new Error('Unauthorized internal access');
  }

  return true;
}

// Alias neutral para otros procesos
export const verifyUser = verifyInternalAdmin;
