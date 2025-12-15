'use client';
import { useState } from 'react';
import { HelpCircleIcon, ZapIcon, AlertTriangleIcon, CodeIcon } from 'lucide-react';

export default function SupportForm() {
    const [formData, setFormData] = useState({
        subject: '',
        priority: 'medium', // Default
        description: '',
        relatedAgentId: '',
        attachment: null,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, attachment: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de envío al sistema de tickets (e.g., Zendesk, Service Now)
        console.log('Support Ticket Submitted:', formData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <SubmissionSuccess
                title="Ticket de Soporte Creado"
                message={`Su ticket ha sido creado con prioridad ${formData.priority.toUpperCase()}. Un ingeniero de soporte dedicado se pondrá en contacto en cumplimiento con nuestro SLA.`}
            />
        );
    }

    return (
        <div className="min-h-screen bg-[#0a1929] pt-16 pb-16 flex justify-center">
            <div className="max-w-xl w-full bg-[#10213A] p-10 rounded-xl shadow-2xl border border-white/10">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <HelpCircleIcon className="w-8 h-8 text-cyan-400" />
                    Crear Ticket de Soporte
                </h1>
                <p className="text-gray-400 mb-8">
                    Clasifique su incidente. Para problemas de P1/Urgentes, por favor, use la línea directa dedicada.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField 
                        label="Asunto del Ticket (Breve)" name="subject" type="text" icon={CodeIcon}
                        value={formData.subject} onChange={handleChange} required
                        placeholder="Ej. Fallo de conexión de API en la transferencia de datos."
                    />

                    <SelectField
                        label="Prioridad (Según SLA)" name="priority" icon={ZapIcon}
                        value={formData.priority} onChange={handleChange}
                        options={[
                            { value: 'p1_critical', label: 'P1 - Crítico: Caída de servicio / Compliance violado (SLA 1 hr)' },
                            { value: 'p2_high', label: 'P2 - Alta: Errores intermitentes / Degradación (SLA 4 hrs)' },
                            { value: 'p3_medium', label: 'P3 - Media: Solicitud de cambio / Bug menor (SLA 24 hrs)' },
                        ]}
                        placeholder="Selecciona la prioridad..."
                    />

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                            Descripción Detallada
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Describa los pasos para reproducir el problema o la solicitud exacta."
                            className="block w-full rounded-md border-0 bg-white/5 py-3 px-3 text-white placeholder-gray-500 ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    
                    <InputField 
                        label="ID del Agente (si aplica)" name="relatedAgentId" type="text" icon={AlertTriangleIcon}
                        value={formData.relatedAgentId} onChange={handleChange}
                        placeholder="Ej. AGENT-1002 (De la sección de Configuración)"
                    />
                    
                    <div>
                        <label htmlFor="attachment" className="block text-sm font-medium text-gray-300 mb-2">
                            Adjuntar Archivo (Logs, Capturas)
                        </label>
                        <input
                            type="file"
                            id="attachment"
                            name="attachment"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 cursor-pointer transition-all duration-200"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-semibold transition-colors"
                    >
                        Enviar Ticket de Soporte
                    </button>
                </form>
            </div>
        </div>
    );
}

// Nota: Los componentes InputField, SelectField y SubmissionSuccess deben reutilizarse de la sección anterior.
