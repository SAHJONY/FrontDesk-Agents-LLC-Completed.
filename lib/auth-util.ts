import jwt from 'jsonwebtoken';

/**
 * AUTH GATEWAY
 * Garantiza paridad local para cualquier mercado global.
 */
export function verifyUser(authHeader: string | undefined) {
  if (!authHeader) return null;

  try {
    const token = authHeader.replace("Bearer ", "");
    // El secreto debe estar configurado en el Vercel Dashboard del nodo pdx1
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    console.error("JWT Verification Failed at pdx1 node");
    return null;
  }
}
