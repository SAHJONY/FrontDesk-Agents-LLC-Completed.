// ./lib/sms-scheduler.ts (UTILITARIO DE PROGRAMACIÓN DE SMS)

import { db } from './db-simulation';
import { BLAND_API_KEY } from './voice-config';

interface SMSPayload {
  to: string;
  body: string;
  scheduleTime: Date; // Cuando debe ser enviado
}

/**
 * Simula el envío y programación de un recordatorio SMS vía la API de Bland/Twilio.
 * @param payload Datos del mensaje y tiempo de envío.
 * @param clientId Clave del cliente para auditoría.
 */
async function scheduleSms(payload: SMSPayload, clientId: string): Promise<boolean> {
  const { to, body, scheduleTime } = payload;
  
  if (!BLAND_API_KEY) {
    console.warn("[SMS Scheduler] API Key missing. Skipping real SMS API call.");
    return false;
  }

  // SIMULACIÓN DE LLAMADA A API DE PROGRAMACIÓN DE SMS
  // En producción, esto llamaría a un endpoint POST /sms/schedule
  console.log(`[SMS SCHEDULED] Client: ${clientId}. Sending to ${to} at ${scheduleTime.toLocaleString()}. Message: "${body.substring(0, 40)}..."`);

  // Aquí iría el código real usando fetch y BLAND_API_KEY
  /*
  const response = await fetch('https://api.bland.ai/v1/sms/schedule', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${BLAND_API_KEY}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          to,
          body,
          send_at: scheduleTime.toISOString(),
          // Incluir el tenantId en metadata para el webhook de respuesta
      }),
  });
  */
  
  return true;
}

/**
 * Programa los recordatorios SMS estándar para una nueva cita.
 */
export async function setupNoShowPrevention(
    leadName: string, 
    leadPhone: string, 
    appointmentTime: Date, 
    serviceName: string, 
    clientId: string
): Promise<void> {
    
    // Obtener la configuración del cliente (ej: zona horaria) si es necesario.
    const clientConfig = db.client.findUnique(clientId);

    if (!clientConfig) {
        console.error(`[NoShow Prevention] Client config not found for ${clientId}. Skipping.`);
        return;
    }

    const baseMessage = `Hola ${leadName}, confirmación: tu cita para ${serviceName} es el ${appointmentTime.toLocaleDateString()} a las ${appointmentTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}. Por favor, sé puntual.`;
    
    // --- 1. Recordatorio 24 horas antes ---
    const reminder24h = new Date(appointmentTime);
    reminder24h.setHours(appointmentTime.getHours() - 24);

    await scheduleSms({
        to: leadPhone,
        body: baseMessage + ' - Recordatorio 24h.',
        scheduleTime: reminder24h
    }, clientId);

    // --- 2. Recordatorio 1 hora antes ---
    const reminder1h = new Date(appointmentTime);
    reminder1h.setHours(appointmentTime.getHours() - 1);

    await scheduleSms({
        to: leadPhone,
        body: baseMessage + ' - ¡Queda 1 hora!',
        scheduleTime: reminder1h
    }, clientId);

    console.log(`[NoShow Prevention] Scheduled 2 reminders for appointment at ${appointmentTime}.`);
}
