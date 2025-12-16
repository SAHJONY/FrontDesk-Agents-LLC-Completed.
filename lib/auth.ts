// File: lib/auth.ts 

/**
 * Authentication helper function (Dummy client key/user for STAFF)
 */
export function auth() {
  // TODO: Implement real authentication
  
  return {
    clientKey: 'FDDG-SARAV1-93A2X-57B',
    userId: 'user_123',
    email: 'demo@frontdeskagents.com',
    role: 'STAFF' // Asumimos un rol por defecto que NO es OWNER
  };
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  // TODO: Implement real authentication check
  return true;
}

/**
 * Get current session - (Simula al CEO/OWNER para pruebas de ruta)
 */
export async function getSession() {
  // TODO: Implement session retrieval
  
  // === MODIFICACIÓN CLAVE: INCLUIR EL ROL ===
  // Para las rutas sensibles, el código real consultaría la DB para obtener el rol.
  
  const isOwner = true; // CAMBIAR a 'false' una vez que la lógica real esté implementada
  
  return {
    user: {
      id: 'user_123_ceo', // ID ÚNICO DEL CEO
      email: 'ceo@frontdeskagents.com', // Email del CEO
      name: 'CEO User',
      role: isOwner ? 'OWNER' : 'STAFF' // <-- Este campo es el que necesita el Middleware
    },
    clientKey: 'FDDG-SARAV1-93A2X-57B'
  };
}
