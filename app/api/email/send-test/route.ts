import { NextResponse } from 'next/server';
import { sendTransactionalEmail } from '@/services/emailService';
// Importa o define tu función de autenticación
// Asumiendo que esta es una función placeholder para la autenticación
const authMiddleware = async (req: Request) => ({ isAuthenticated: true });

export async function POST(request: Request) {
    // Nota: En un entorno real, aquí se verificaría la sesión del usuario.
    const authResult = await authMiddleware(request);
    if (!authResult.isAuthenticated) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const { to, subject, htmlContent } = await request.json();

        if (!to || !subject || !htmlContent) {
            return NextResponse.json({ message: 'Datos incompletos: Se requiere destinatario, asunto y contenido.' }, { status: 400 });
        }

        // Llamada al servicio de envío, utilizando 'no-reply' como remitente por defecto.
        await sendTransactionalEmail(
            to, 
            subject, 
            htmlContent, 
            'no-reply' 
        );

        return NextResponse.json({ message: 'Correo de prueba enviado exitosamente.' });
    } catch (error) {
        // Manejo de errores detallado
        const errorMessage = error instanceof Error ? error.message : "Error desconocido en el servidor.";
        return NextResponse.json({ message: 'Fallo en el envío del correo.', error: errorMessage }, { status: 500 });
    }
}
