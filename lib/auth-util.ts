import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';

/**
 * AUTH GATEWAY NEUTRAL
 * Valida el acceso administrativo para la fuerza de trabajo global.
 */
export function verifyInternalAdmin(req: NextApiRequest) {
  // Usamos el header de autorización estándar
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");

  // Validación contra variable de entorno privada en Vercel
  if (!token || token !== process.env.INTERNAL_ADMIN_TOKEN) {
    throw new Error('Unauthorized internal access');
  }

  return true;
}

// Alias para compatibilidad con otros módulos
export const verifyUser = verifyInternalAdmin;
