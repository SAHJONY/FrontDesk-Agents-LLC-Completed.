import { NextApiRequest } from 'next';

export const sendOwnerNotification = async (
  subject: string, 
  message: string, 
  req?: NextApiRequest
) => {
  // Captura de IP para auditoría forense
  const ip = req ? (req.headers['x-forwarded-for'] || req.socket.remoteAddress) : 'System internal';
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error("Error: RESEND_API_KEY no encontrada en el Vault.");
    return;
  }

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Intelligence <system@frontdesk-agents.com>',
        to: 'frontdeskllc@outlook.com',
        subject: `[PLATFORM] ${subject}`,
        html: `
          <div style="font-family: sans-serif; background: #020617; color: #f8fafc; padding: 40px; border-radius: 12px; border: 1px solid #1e293b;">
            <h2 style="color: #f59e0b; margin-top: 0;">Alerta de Sistema Sovereign</h2>
            <p style="font-size: 16px; line-height: 1.6;">${message}</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b;">
              <strong>Infraestructura:</strong> Portland (pdx1)<br />
              <strong>IP de Origen:</strong> ${ip}<br />
              <strong>Fecha:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })}
            </div>
          </div>`
      })
    });
  } catch (error) {
    console.error("Fallo al enviar notificación al Owner:", error);
  }
};
