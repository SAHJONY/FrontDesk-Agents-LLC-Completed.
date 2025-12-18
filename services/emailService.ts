import * as sgMail from '@sendgrid/mail';

// El dominio corporativo estricto
const CORPORATE_DOMAIN = 'frontdeskagents.com';

// Inicialización de la API Key
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
} else {
    console.warn("⚠️ ADVERTENCIA: SENDGRID_API_KEY no está configurada.");
}

export async function sendTransactionalEmail(
    to: string, 
    subject: string, 
    htmlContent: string, 
    fromUser: string = 'no-reply' 
) {
    const fromAddress = `${fromUser}@${CORPORATE_DOMAIN}`;
    
    if (!process.env.SENDGRID_API_KEY) {
        throw new Error("ERR_EMAIL_CONFIG: El servicio de email no está inicializado.");
    }
    
    const msg = {
        to: to, 
        from: fromAddress, 
        subject: subject,
        html: htmlContent,
    };

    try {
        await sgMail.send(msg);
        console.log(`Email enviado desde ${fromAddress} a ${to}: ${subject}`);
        return { success: true };
    } catch (error: any) {
        // ✅ Corregido: Acceso seguro a propiedades de error
        const errorMessage = error.response?.body?.errors 
            ? JSON.stringify(error.response.body.errors) 
            : error.message;
            
        console.error('Error al enviar email (SendGrid):', errorMessage);
        throw new Error(`Fallo en el envío: ${errorMessage}`);
    }
}
