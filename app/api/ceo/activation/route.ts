// ./app/api/ceo/activation/route.ts (MODIFICACIÓN)
import { NextResponse } from 'next/server';
// Nota: La importación de authorizeOwner ahora es solo una advertencia
import { authorizeOwner } from '@/lib/auth/authorization'; 

// Importación de la base de datos (presumiblemente donde 'db' se define)
// import { db } from '@/lib/db'; // <- Si existe esta línea, debe ser corregida
// import { db } from '@/utils/db'; // <- O esta

// Simulamos los datos que deberían venir de la DB
const simulatedActivations = [
    { system_key: 'google_ads', enabled: true, name: 'Google Ads API', description: 'Permite la gestión de campañas.' },
    { system_key: 'salesforce', enabled: false, name: 'Salesforce CRM', description: 'Sincronización de leads y contactos.' },
    { system_key: 'slack_bot', enabled: true, name: 'Slack Notifications', description: 'Notificaciones internas.' },
];


export async function GET(request: Request) {
    // 1. Autorización (solo se requiere el stub de la función)
    const { isAuthorized, errorResponse } = authorizeOwner(request);
    if (!isAuthorized) {
        return errorResponse;
    }

    // 2. Obtener el estado de toda la matriz
    // LÍNEA CORREGIDA: Reemplazamos el acceso a la DB incompleta con datos simulados.
    const activations = simulatedActivations; // Usamos el stub

    return NextResponse.json(activations);
}
