"use client";

import { useState } from 'react';
import { AlertTriangle, Mail } from 'lucide-react';
// Placeholders para notificaciones: reemplaza con tu librería real (e.g., react-hot-toast)
const notifySuccess = (message: string) => console.log("SUCCESS:", message);
const notifyError = (message: string) => console.error("ERROR:", message);

export default function EmailSettingsPage() {
    const [testEmail, setTestEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendTestEmail = async () => {
        if (!testEmail) {
            notifyError("Por favor, introduce una dirección de correo válida para la prueba.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/email/send-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: testEmail,
                    subject: `FrontDesk Agents - Prueba de Integración Exitosa (Remitente: @frontdeskagents.com)`,
                    htmlContent: `
                        <div style="font-family: sans-serif; padding: 20px; background-color: #0a1929; color: #ffffff;">
                            <h1 style="color: #06b6d4;">Confirmación de Envío de Email</h1>
                            <p>Esta prueba confirma que la plataforma puede enviar correos transaccionales usando el dominio <strong>@frontdeskagents.com</strong>.</p>
                            <p>El remitente de este correo es: no-reply@frontdeskagents.com</p>
                            <p>¡El Agente AI ya está listo para enviar confirmaciones de citas y leads a tus clientes!</p>
                        </div>
                    `,
                }),
            });

            if (response.ok) {
                notifySuccess(`Correo de prueba enviado a ${testEmail}. ¡Revisa tu bandeja de entrada!`);
            } else {
                const data = await response.json();
                notifyError(`Fallo en la prueba: ${data.message}`);
            }
        } catch (error) {
            notifyError('Error de red al intentar comunicarse con el servidor de email.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="executive-heading mb-6 flex items-center">
                <Mail className="w-6 h-6 mr-3 text-cyan-400" /> 
                Configuración de Email Transaccional
            </h1>
            <p className="text-gray-400 mb-8">
                Habilita al Agente AI para enviar confirmaciones de citas y resúmenes de llamadas usando exclusivamente el dominio <strong>@frontdeskagents.com</strong>.
            </p>

            {/* ... Sección de Plantillas Placeholder (Omitida para brevedad) ... */}

            <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">Prueba de Integración de Envío</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="email"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        placeholder="Introduce tu email personal para la prueba"
                        className="flex-1 p-3 rounded-lg bg-[#10213A] border border-gray-700 text-white focus:ring-cyan-500 focus:border-cyan-500"
                    />
                    <button
                        onClick={handleSendTestEmail}
                        disabled={isLoading}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading ? 'Enviando...' : 'Enviar Correo de Prueba'}
                    </button>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-900/50 border border-yellow-700/50 rounded-lg flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-3 text-yellow-400 mt-0.5" />
                    <p className="text-sm text-yellow-300">
                        Nota: Todos los correos enviados desde el sistema utilizarán el dominio <strong>@frontdeskagents.com</strong>. La recepción de respuestas se gestiona a través de la sincronización de tu CRM con Outlook.
                    </p>
                </div>
            </div>
        </div>
    );
}
