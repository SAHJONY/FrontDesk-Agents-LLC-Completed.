"use client";
import React, { useState } from 'react';
import { CheckCircle, Info, Code, Save, Zap } from 'lucide-react';

// Datos de la Industria para el select
const INDUSTRY_OPTIONS = [
    'Salud y Clínicas', 
    'Seguros y Banca Privada', 
    'Servicios a Domicilio (HVAC/Fontanería)', 
    'Otro'
];
// Datos de Tono para el select
const TONE_OPTIONS = [
    'Corporativo y Profesional', 
    'Amigable y Conversacional', 
    'Orientado a Ventas'
];

export const OnboardingSetupForm = ({ clientId }) => {
    const [formData, setFormData] = useState({
        // FASE 2: Recolección de Datos (Simulamos que esto fue parcialmente llenado por scraping)
        clientName: '',
        clientWebsite: '',
        industry: INDUSTRY_OPTIONS[0],
        faqs: '',
        cancellationPolicy: '',
        // FASE 3: Configuración del Agente
        agentName: 'Eva',
        agentTone: TONE_OPTIONS[0],
        leadFields: 'Nombre, Email, Teléfono',
        escalationRule: 'Si menciona "legal" o "emergencia", escalar a humano.',
    });

    const [isSaving, setIsSaving] = useState(false);
    const [setupStatus, setSetupStatus] = useState('pending'); // pending, scraping, configuring, complete

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveConfig = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSetupStatus('configuring');
        
        // Simulación de envío de datos al backend para entrenar al modelo
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        setSetupStatus('complete');
        setIsSaving(false);
        // Aquí iría la llamada a la API: POST /api/onboarding/configure
        console.log("Configuración guardada y modelo listo para QA:", formData);
    };

    const getStatusText = () => {
        if (setupStatus === 'complete') return "Configuración de Agente Completa. Listo para Pruebas de QA.";
        if (setupStatus === 'configuring') return "Entrenando Modelo AI...";
        return "Pendiente de completar la configuración central.";
    };

    return (
        <div className="glass-card p-8 max-w-4xl mx-auto">
            <h1 className="executive-heading mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-yellow-400" />
                Activación del Cliente ({clientId})
            </h1>
            <p className="text-gray-400 mb-8">
                {getStatusText()}
            </p>

            <form onSubmit={handleSaveConfig}>
                
                {/* ------------------- FASE 2: Recolección de Datos (Manual/Scraping QA) ------------------- */}
                <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b border-gray-700 pb-2 flex items-center">
                    <Code className="w-5 h-5 mr-2" /> 1. Datos del Cliente
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Nombre del Cliente</label>
                        <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required className="input-field" placeholder="Ej. OmniHealth Medical Group" />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Sitio Web (Scraping Automático)</label>
                        <input type="url" name="clientWebsite" value={formData.clientWebsite} onChange={handleChange} required className="input-field" placeholder="https://www.omnihealth.com" />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Industria</label>
                        <select name="industry" value={formData.industry} onChange={handleChange} required className="input-field">
                            {INDUSTRY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-300 text-sm mb-1">Preguntas Frecuentes (FAQs) - Validar Scraping</label>
                        <textarea name="faqs" value={formData.faqs} onChange={handleChange} rows={3} className="input-field" placeholder="Listar 3-5 FAQs más comunes..." />
                    </div>
                </div>

                {/* ------------------- FASE 3: Configuración del Agente AI ------------------- */}
                <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b border-gray-700 pb-2 flex items-center">
                    <Zap className="w-5 h-5 mr-2" /> 2. Personalidad del Agente
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Nombre del Agente (Humano)</label>
                        <input type="text" name="agentName" value={formData.agentName} onChange={handleChange} required className="input-field" />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Tono de Voz</label>
                        <select name="agentTone" value={formData.agentTone} onChange={handleChange} required className="input-field">
                            {TONE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-300 text-sm mb-1">Campos de Calificación de Lead (Lead Qualification)</label>
                        <input type="text" name="leadFields" value={formData.leadFields} onChange={handleChange} required className="input-field" placeholder="Ej. Nombre, Email, Servicio Requerido" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-300 text-sm mb-1">Regla de Escalamiento Humano</label>
                        <textarea name="escalationRule" value={formData.escalationRule} onChange={handleChange} rows={2} className="input-field" placeholder="Ej. Si el cliente solicita 'hablar con un supervisor' o 'cancelar su cuenta'." />
                    </div>
                </div>

                {/* ------------------- Botón de Guardar / Entrenar ------------------- */}
                <button
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 flex items-center justify-center"
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <Zap className="w-5 h-5 mr-2 animate-pulse" />
                            Entrenando Modelo AI...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5 mr-2" />
                            Guardar Configuración y Enviar a QA
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 p-4 bg-yellow-900/50 border border-yellow-700/50 rounded-lg flex items-start">
                <Info className="w-5 h-5 mr-3 text-yellow-400 mt-0.5" />
                <p className="text-sm text-yellow-300">
                    Las **Fases 4 (Integraciones)** y **Fase 5 (Go-Live)** se rastrean automáticamente en este dashboard una vez que la configuración del modelo esté completa.
                </p>
            </div>
        </div>
    );
};

// Ejemplo de uso:
// <OnboardingSetupForm clientId="CLNT-741" />

                      
