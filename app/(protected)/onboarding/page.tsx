'use client';
import { useState } from 'react';
import { SettingsIcon, GlobeIcon, MailIcon, PhoneIcon, ScaleIcon, CheckCircleIcon } from 'lucide-react'; 

// --- COMPONENTE PRINCIPAL DE ONBOARDING ---
export default function OnboardingForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Detalles de la Cuenta
        companyName: '',
        primaryContact: '',
        techEmail: '',
        // Step 2: Configuración del Agente
        agentName: 'SARA Enterprise', // Default
        agentTone: 'professional',
        complianceNeeds: '',
        agentLanguage: 'es-US',
        // Step 3: Integración
        crmSystem: 'salesforce',
        apiEndpoint: '',
        estimatedVolume: 'medium'
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStepIsValid = () => {
        if (currentStep === 1) {
            return formData.companyName && formData.primaryContact && formData.techEmail;
        }
        if (currentStep === 2) {
            return formData.agentTone && formData.complianceNeeds;
        }
        return true; 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            // Lógica de envío final a la API de Provisioning
            console.log('Onboarding Data Submitted:', formData);
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <SubmissionSuccess
                title="Configuración Inicial Completada"
                message="¡Felicidades! Los datos de configuración han sido enviados a nuestro equipo de implementación. Espera una confirmación de lanzamiento en las próximas 24 horas."
            />
        );
    }

    return (
        <div className="min-h-screen bg-[#0a1929] pt-16 pb-16 flex justify-center">
            <div className="max-w-4xl w-full bg-[#10213A] p-12 rounded-xl shadow-2xl border border-white/10">
                <h1 className="text-4xl font-bold text-white mb-2">Asistente de Implementación</h1>
                <p className="text-gray-400 mb-8">
                    Este proceso de 3 pasos recopila todos los detalles para lanzar su Agente AI Enterprise.
                </p>

                {/* Indicador de Progreso */}
                <StepIndicator currentStep={currentStep} steps={['Cuenta', 'Agente & Compliance', 'Integración']} />

                <form onSubmit={handleSubmit}>
                    
                    {/* --- PASO 1: DETALLES DE LA CUENTA --- */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <InputField 
                                label="Nombre Legal de la Empresa" name="companyName" type="text" icon={ScaleIcon}
                                value={formData.companyName} onChange={handleChange} placeholder="FrontDesk Agents LLC"
                            />
                            <InputField 
                                label="Contacto Principal (Decisor)" name="primaryContact" type="text" icon={UserIcon}
                                value={formData.primaryContact} onChange={handleChange} placeholder="Ej. Jane Smith, VP de Implementación"
                            />
                            <InputField 
                                label="Email de Contacto Técnico" name="techEmail" type="email" icon={MailIcon}
                                value={formData.techEmail} onChange={handleChange} placeholder="it-admin@empresa.com"
                            />
                        </div>
                    )}

                    {/* --- PASO 2: CONFIGURACIÓN DEL AGENTE Y COMPLIANCE --- */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <InputField 
                                label="Nombre del Agente AI (Personalización)" name="agentName" type="text" icon={SettingsIcon}
                                value={formData.agentName} onChange={handleChange} placeholder="SARA Enterprise"
                            />
                            <SelectField
                                label="Tono de Voz y Personalidad" name="agentTone" icon={SettingsIcon}
                                value={formData.agentTone} onChange={handleChange}
                                options={[
                                    { value: 'professional', label: 'Profesional y formal (Predeterminado)' },
                                    { value: 'concierge', label: 'Conserje amigable (Hospitalidad)' },
                                    { value: 'direct', label: 'Directo y eficiente (Técnico)' },
                                ]}
                                placeholder="Selecciona el tono..."
                            />
                            <SelectField
                                label="Requisitos de Compliance" name="complianceNeeds" icon={ShieldIcon}
                                value={formData.complianceNeeds} onChange={handleChange}
                                options={[
                                    { value: 'hipaa', label: 'HIPAA (Sanidad)' },
                                    { value: 'gdpr_ccpa', label: 'GDPR / CCPA (Global)' },
                                    { value: 'none', label: 'Ninguno / Estándar' },
                                ]}
                                placeholder="Selecciona los estándares regulatorios..."
                            />
                            <SelectField
                                label="Idioma Principal" name="agentLanguage" icon={GlobeIcon}
                                value={formData.agentLanguage} onChange={handleChange}
                                options={[
                                    { value: 'en-US', label: 'Inglés (US)' },
                                    { value: 'es-US', label: 'Español (Latam)' },
                                    { value: 'fr-CA', label: 'Francés (Canadá)' },
                                ]}
                                placeholder="Selecciona el idioma..."
                            />
                        </div>
                    )}

                    {/* --- PASO 3: DETALLES DE INTEGRACIÓN --- */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <SelectField
                                label="Sistema CRM/ERP a Integrar" name="crmSystem" icon={SettingsIcon}
                                value={formData.crmSystem} onChange={handleChange}
                                options={[
                                    { value: 'salesforce', label: 'Salesforce' },
                                    { value: 'hubspot', label: 'HubSpot' },
                                    { value: 'custom_api', label: 'API Personalizada / Webhook' },
                                ]}
                                placeholder="Selecciona el sistema..."
                            />
                            <InputField 
                                label="Endpoint de API (si aplica)" name="apiEndpoint" type="url" icon={MailIcon}
                                value={formData.apiEndpoint} onChange={handleChange} 
                                placeholder="https://api.empresa.com/frontdesk-hook"
                            />
                             <SelectField
                                label="Volumen Estimado (Por si acaso)" name="estimatedVolume" icon={PhoneIcon}
                                value={formData.estimatedVolume} onChange={handleChange}
                                options={[
                                    { value: 'low', label: 'Bajo (hasta 500 llamadas/mes)' },
                                    { value: 'medium', label: 'Medio (500 - 2500)' },
                                    { value: 'high', label: 'Alto (+2500)' },
                                ]}
                                placeholder="Selecciona el volumen..."
                            />
                        </div>
                    )}

                    {/* Controles de Navegación */}
                    <div className="flex justify-between mt-8 pt-4 border-t border-gray-800">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors"
                            >
                                ← Anterior
                            </button>
                        )}
                        
                        <div className={currentStep === 1 ? 'w-full' : ''}>
                            <button
                                type="submit"
                                disabled={!nextStepIsValid()}
                                className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${nextStepIsValid() ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-500/50 cursor-not-allowed'} ${currentStep < 3 ? 'ml-auto' : 'w-full'}`}
                            >
                                {currentStep < 3 ? 'Siguiente Paso →' : 'Finalizar y Lanzar'}
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

// --- Componentes Reutilizables (de la Demo Page, para consistencia) ---

const InputField = ({ label, name, type, icon: Icon, value, onChange, placeholder }) => (
    // ... Código del InputField (usado en Demo Page)
);

const SelectField = ({ label, name, icon: Icon, value, onChange, options, placeholder }) => (
    // ... Código del SelectField (usado en Demo Page)
);

const StepIndicator = ({ currentStep, steps }) => (
    <div className="flex justify-between mb-8">
        {steps.map((label, index) => {
            const step = index + 1;
            return (
                <div key={step} className={`flex-1 text-center py-2 border-b-4 ${currentStep >= step ? 'border-cyan-500 text-cyan-400' : 'border-gray-700 text-gray-500'} font-semibold transition-all`}>
                    {step}. {label}
                </div>
            );
        })}
    </div>
);

const SubmissionSuccess = ({ title, message }) => (
    <div className="min-h-screen bg-[#0a1929] pt-32 flex justify-center items-start">
        <div className="max-w-xl w-full bg-[#10213A] p-12 rounded-xl shadow-2xl border border-cyan-700/50 text-center">
            <CheckCircleIcon className="w-16 h-16 mx-auto text-green-400 mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
            <p className="text-gray-400 mb-8">{message}</p>
            <Link href="/dashboard" className="text-cyan-400 hover:text-cyan-300 font-medium">
                → Ir al Dashboard
            </Link>
        </div>
    </div>
);
