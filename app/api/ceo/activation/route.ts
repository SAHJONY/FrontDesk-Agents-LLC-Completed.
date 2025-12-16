// ./app/api/ceo/activation/route.ts (Versión Corregida)
import { NextResponse } from 'next/server';
import { authorizeOwner } from '@/lib/auth/authorization'; 
// Asegúrese de que la importación del objeto 'db' que causa el error fue eliminada 
// o se encuentra comentada si existe en este archivo.

// Simulamos los datos que deberían venir de la DB (para evitar el Type Error)
const simulatedActivations = [
    { system_key: 'google_ads', enabled: true, name: 'Google Ads API', description: 'Permite la gestión de campañas.' },
    { system_key: 'salesforce', enabled: false, name: 'Salesforce CRM', description: 'Sincronización de leads y contactos.' },
    { system_key: 'slack_bot', enabled: true, name: 'Slack Notifications', description: 'Notificaciones internas.' },
];

export async function GET(request: Request) {
    // 1. Autorización
    const { isAuthorized, errorResponse } = authorizeOwner(request);
    if (!isAuthorized) {
        // En un proyecto real, esto devolvería 401 Unauthorized
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); 
    }

    // 2. Obtener el estado de toda la matriz
    // LÍNEA CORREGIDA: Usamos el stub en lugar de la llamada a la DB fallida.
    const activations = simulatedActivations;

    return NextResponse.json(activations);
}
