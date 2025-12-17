// lib/notifications/whatsapp.ts
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function sendBookingNotification(ownerPhone: string, bookingDetails: any) {
  try {
    const message = await client.messages.create({
      body: `🚀 *¡Nueva Cita Agendada!*\n\n` +
            `📍 *Negocio:* ${bookingDetails.businessName}\n` +
            `👤 *Cliente:* ${bookingDetails.customerPhone}\n` +
            `📝 *Servicio:* ${bookingDetails.service}\n` +
            `💰 *Valor Estimado:* $${bookingDetails.value}\n\n` +
            `Tu Recepcionista IA sigue trabajando por ti.`,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Tu número de Sandbox o Producción
      to: `whatsapp:${ownerPhone}`
    });

    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('Error enviando WhatsApp:', error);
    return { success: false, error };
  }
}
