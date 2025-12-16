// ./lib/auth/authorization.ts (Modificación)

import { NextResponse } from 'next/server';

function authorizeRequest(request: Request) {
    return { 
        isAuthorized: true, 
        errorResponse: null 
    };
}

// Exportamos la misma función bajo el nombre que se requiere en la ruta API.
export const authorizeOwner = authorizeRequest; 
// exportamos ambas para futuros usos:
export { authorizeRequest }; 
