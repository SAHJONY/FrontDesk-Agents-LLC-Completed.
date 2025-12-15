// lib/crm-sync-utils.ts

import { db } from './db-simulation';
import type { CallLogEntry } from './db-simulation';

/**
 * Sincroniza un lead o cita con el CRM del cliente.
 * Regla de negocio:
 * - Solo se sincroniza si el lead fue CALIFICADO o hubo INTENCIÓN clara.
 * - El outcome telefónico (answered/missed/voicemail) NO decide el sync.
 */
export async function syncLeadToCRM(
  callLog: CallLogEntry
): Promise<boolean> {

  // 1. Validar si amerita sincronización al CRM
  const shouldSync =
    callLog.qualified === true ||
    callLog.intent === 'appointment' ||
    callLog.intent === 'lead';

  if (!shouldSync) {
    console.log(
      `[CRM Sync] Skipping sync. intent=${callLog.intent}, qualified=${callLog.qualified}`
    );
    return true; // no es error
  }

  // 2. Obtener configuración del cliente
  const clientConfig = db.client.findUnique(callLog.clientId);

  if (!clientConfig || !clientConfig.active) {
    console.error(
      `[CRM Sync] ERROR: Client config not found or inactive for clientId=${callLog.clientId}`
    );
    return false;
  }

  // 3. Simulación de envío al CRM
  console.log('[CRM Sync] Sending payload to CRM:', {
    client: clientConfig.name,
    provider: clientConfig.crmProvider,
    callId: callLog.id,
    intent: callLog.intent,
    qualified: callLog.qualified,
    caller: callLog.callerPhone,
  });

  // Aquí iría la integración real (HubSpot, GHL, etc.)
  return true;
}
