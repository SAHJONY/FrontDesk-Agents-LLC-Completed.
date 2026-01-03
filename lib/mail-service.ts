// lib/mail-service.ts
export const sendSecurityAlert = async (details: string) => {
  // Aquí usamos el API Key de SendGrid/Resend que ahora puedes gestionar 
  // desde tu propio Universal Vault
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Security <alerts@frontdesk-agents.com>',
      to: 'frontdeskllc@outlook.com',
      subject: '⚠️ ALERTA DE SEGURIDAD: Cambio en Secretos Globales',
      html: `<p>Se ha detectado una modificación en el Universal Vault:</p>
             <pre>${details}</pre>
             <p>Si no fuiste tú, revierte los cambios usando el Backup en Supabase inmediatamente.</p>`
    })
  });
};
