import * as sgMail from '@sendgrid/mail';

// El dominio corporativo estricto
const CORPORATE_DOMAIN = 'frontdeskagents.com';

// ----------------------------------------------------------------------
// Configuración de SendGrid (Asumiendo que las claves están en .env)
// ----------------------------------------------------------------------
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
    console.error("SENDGRID_API_KEY no está configurada. El envío de emails fallará.");
    // NOTA: En un entorno real, esto lanzaría un error o usaría un mock.
}


/**
 * Envía correos electrónicos transaccionales cumpliendo la política de dominio estricta.
 * @param to - Destinatario (puede ser externo).
 * @param subject - Asunto del correo.
 * @param htmlContent - Contenido HTML del correo.
 * @param fromUser - Usuario de FrontDeskAgents para el remitente (ej. 'support', 'info').
 */
export async function sendTransactionalEmail(
    to: string, 
    subject: string, 
    htmlContent: string, 
    fromUser: string = 'no-reply' // Por defecto, 'no-reply@frontdeskagents.com'
) {
    // 1. Definición de la dirección de origen (FROM)
    const fromAddress = `${fromUser}@${CORPORATE_DOMAIN}`;
    
    // 2. Comprobación del remitente (debe ser @frontdeskagents.com)
    // Esta verificación es redundante aquí ya que construimos la dirección, 
    // pero es útil si 'fromUser' viniera de una entrada externa.
    if (!fromAddress.endsWith(`@${CORPORATE_DOMAIN}`)) {
        // Esto solo ocurriría si el fromUser fuera manipulado de forma malintencionada
        throw new Error(`Remitente no autorizado. Debe ser @${CORPORATE_DOMAIN}.`);
    }

    const msg = {
        to: to, 
        from: fromAddress, 
        subject: subject,
        html: htmlContent,
    };

    try {
        if (!process.env.SENDGRID_API_KEY) {
             throw new Error("El servicio de email no está inicializado.");
        }
        await sgMail.send(msg);
        console.log(`Email enviado desde ${fromAddress} a ${to}: ${subject}`);
        return { success: true };
    } catch (error) {
        // En Next.js App Router, es mejor devolver un error de la API
        console.error('Error al enviar email:', error.response?.body || error.message);
        throw new Error(`Fallo en el servicio de email: ${error.message}`);
    }
}
