// ./lib/crm-sync-utils.ts (LÓGICA DE SINCRONIZACIÓN)

import { db } from './db-simulation';
import { CallLogEntry } from './db-simulation';

/**
 * Función central para sincronizar un lead calificado o una cita con el CRM del cliente.
 * @param callLog La entrada del log de llamada ya guardada en nuestra DB.
 */
export async function syncLeadToCRM(callLog: CallLogEntry): Promise<boolean> {
  
  const clientConfig = db.client.findUnique(callLog.clientId);
  
  if (!clientConfig) {
    console.error(`[CRM Sync] ERROR: Client config not found for key ${callLog.clientId}`);
    return false;
  }

  // 1. Verificar si la acción justifica el envío al CRM
  if (callLog.outcome !== 'booked' && callLog.outcome !== 'qualified') {
    console.log(`[CRM Sync] Skipping sync for outcome: ${callLog.outcome}`);
    return true; // No es un error, solo no se sincroniza
  }

  const { crmType, crmEndpoint } = clientConfig;
  const leadData = callLog.leadData;

  console.log(`[CRM Sync] Attempting to sync lead for ${crmType} client: ${clientConfig.email}`);

  // 2. Mapeo de datos (Agnostic-CRM)
  const standardLeadPayload = {
    firstName: leadData.name.split(' ')[0] || 'AI Lead',
    lastName: leadData.name.split(' ').slice(1).join(' '),
    phone: leadData.phone,
    email: leadData.email,
    source: `SARA.AI Voice - ${callLog.outcome}`,
    notes: `Transcript: ${callLog.transcript.substring(0, 200)}...`,
  };

  // 3. Lógica de Envío (Aquí se bifurcaría el código real)
  switch (crmType) {
    case 'HubSpot':
      // Real code would use fetch(crmEndpoint, { ...HubSpot format... })
      console.log(`[CRM Sync] Sent to HubSpot API: ${JSON.stringify(standardLeadPayload)}`);
      break;
    case 'Salesforce':
      console.log(`[CRM Sync] Sent to Salesforce API: ${JSON.stringify(standardLeadPayload)}`);
      break;
    case 'Custom API':
      // Real code would use fetch(crmEndpoint, { ...client's custom format... })
      console.log(`[CRM Sync] Sent to Custom API Endpoint: ${crmEndpoint}`);
      break;
    case 'None':
      console.log("[CRM Sync] Client has no CRM configured. Data stored only in FrontDesk DB.");
      break;
  }
  
  return true;
}
