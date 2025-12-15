import * as sgMail from '@sendgrid/mail';

// El dominio corporativo estricto
const CORPORATE_DOMAIN = 'frontdeskagents.com';

// Inicialización de la API Key
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
    // Es crucial que el build falle o se registre una advertencia severa si la clave falta
    console.warn("⚠️ ADVERTENCIA: SENDGRID_API_KEY no está configurada. El servicio de email NO funcionará.");
}

/**
 * Función central para enviar correos electrónicos transaccionales.
 * * @param to - Destinatario (puede ser externo).
 * @param subject - Asunto del correo.
 * @param htmlContent - Contenido HTML del correo.
 * @param fromUser - Usuario de FrontDeskAgents (ej. 'support', 'info', por defecto 'no-reply').
 */
export async function sendTransactionalEmail(
    to: string, 
    subject: string, 
    htmlContent: string, 
    fromUser: string = 'no-reply' 
) {
    const fromAddress = `${fromUser}@${CORPORATE_DOMAIN}`;
    
    if (!process.env.SENDGRID_API_KEY) {
        throw new Error("ERR_EMAIL_CONFIG: El servicio de email no está inicializado debido a la falta de la API Key.");
    }
    
    // Si la dirección 'from' no está verificada en SendGrid, fallará.
    // Usamos el fromUser para construir la dirección, asegurando el dominio estricto.

    const msg = {
        to: to, 
        from: fromAddress, // ej. 'no-reply@frontdeskagents.com'
        subject: subject,
        html: htmlContent,
    };

    try {
        await sgMail.send(msg);
        console.log(`Email enviado desde ${fromAddress} a ${to}: ${subject}`);
        return { success: true };
    } catch (error) {
        // Mejor manejo de errores para el entorno de producción
        const errorMessage = error.response?.body?.errors ? JSON.stringify(error.response.body.errors) : error.message;
        console.error('Error al enviar email (SendGrid):', errorMessage);
        throw new Error(`Fallo en el envío: ${errorMessage}`);
    }
}
