'use client';

import { useState } from 'react';
// Importaciones de heroicons para los botones (CheckCircle, Flechas)
import { CheckCircleIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'; 
// Importaciones de lucide-react para los pasos (Íconos simples y limpios)
import { Database, Key, Globe, Rocket } from 'lucide-react'; 
import Link from 'next/link';

// Definición de los pasos del Onboarding (FASE 4)
const steps = [
    // Usamos los componentes de Lucide directamente
    { id: 1, name: 'Conexión de CRM', icon: Database, description: 'Configuración del API Key para HubSpot/Salesforce.' },
    { id: 2, name: 'Configuración de Endpoints', icon: Key, description: 'Definición de rutas de webhook y tokens de seguridad.' },
    { id: 3, name: 'Despliegue Web', icon: Globe, description: 'Generación del snippet de código para el Widget Web.' },
    { id: 4, name: 'Confirmación y QA', icon: Rocket, description: 'Revisión final y activación del entorno de Pruebas.' },
];

// --- Componentes Auxiliares (Sin Cambios Estructurales) ---

// Componente para la barra de pasos (StepIndicator)
const StepIndicator = ({ currentStep, steps }) => (
    <div className="flex justify-between items-center mb-10 w-full max-w-4xl mx-auto">
        {steps.map((step, index) => {
            const IconComponent = step.icon; // Componente de Lucide
            return (
                <div key={step.id} className={`flex flex-col items-center relative ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    
                    {/* Círculo del paso */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white z-10 
                        ${currentStep > step.id
                            ? 'bg-green-500' // Completado
                            : currentStep === step.id
                                ? 'bg-cyan-500 border-2 border-cyan-300' // Activo
                                : 'bg-gray-700 border border-gray-600' // Inactivo
                        }`}
                    >
                        {currentStep > step.id ? <CheckCircleIcon className="w-5 h-5" /> : <IconComponent className="w-5 h-5" />} 
                    </div>
                    
                    {/* Línea divisoria */}
                    {index < steps.length - 1 && (
                        <div className={`absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5 z-0 
                            ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-700'}`}
                        />
                    )}

                    {/* Título del paso */}
                    <span className={`mt-3 text-center text-sm font-medium transition-colors duration-300 
                        ${currentStep >= step.id ? 'text-white' : 'text-gray-500'}`}
                    >
                        {step.name}
                    </span>
                </div>
            );
        })}
    </div>
);

// Componente para el mensaje de éxito final
const SubmissionSuccess = ({ title, message }) => (
    <div className="text-center p-10 bg-white/5 border border-green-500/30 rounded-lg shadow-xl max-w-lg mx-auto">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
        <p className="text-gray-400 mb-8">{message}</p>
        <Link href="/dashboard" className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-semibold transition">
            Ir al Dashboard
        </Link>
    </div>
);


// --- Componente Principal (Sin Cambios Funcionales) ---

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [formData, setFormData] = useState({
        crmApiToken: '',
        webhookUrl: '',
        domain: '',
    });

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentStep !== steps.length) return;

        setIsSubmitting(true);
        console.log("Datos de Onboarding Enviados:", formData);
        
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        setIsSubmitting(false);
        setIsComplete(true);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-white">1. Conexión con el CRM</h3>
                        <p className="text-gray-400">Proporcione su clave de API de **HubSpot** o **Salesforce** para la integración de leads y citas.</p>
                        
                        <div>
                            <label htmlFor="crmApiToken" className="block text-sm font-medium text-gray-300 mb-2">CRM API Token (Nivel Administrador)</label>
                            <input
                                type="text"
                                name="crmApiToken"
                                id="crmApiToken"
                                value={formData.crmApiToken}
                                onChange={handleChange}
                                placeholder="sk-12345-API-TOKEN-HASH..."
                                required
                                className="w-full p-3 border border-gray-700 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                            />
                            <p className="mt-2 text-xs text-gray-500">Garantizamos el cifrado AES-256 para todos los tokens sensibles.</p>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-white">2. Configuración de Endpoints</h3>
                        <p className="text-gray-400">Verifique la URL del webhook de transcripciones y establezca su token de firma.</p>
                        
                        <div>
                            <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-300 mb-2">URL de Webhook (Para Transcripciones)</label>
                            <input
                                type="url"
                                name="webhookUrl"
                                id="webhookUrl"
                                value={formData.webhookUrl}
                                onChange={handleChange}
                                placeholder="https://tudominio.com/api/transcribe"
                                required
                                className="w-full p-3 border border-gray-700 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                            />
                            <p className="mt-2 text-xs text-cyan-400">Webhook Token generado: <code className='text-xs bg-gray-700 p-1 rounded'>FD_SEC_72H_XYZ</code></p>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-white">3. Despliegue del Widget Web</h3>
                        <p className="text-gray-400">Proporcione el dominio donde desplegaremos el widget de voz y chat para generar el **código de integración**.</p>
                        
                        <div>
                            <label htmlFor="domain" className="block text-sm font-medium text-gray-300 mb-2">Dominio de Despliegue Principal</label>
                            <input
                                type="text"
                                name="domain"
                                id="domain"
                                value={formData.domain}
                                onChange={handleChange}
                                placeholder="www.tudominio.com"
                                required
                                className="w-full p-3 border border-gray-700 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                            />
                            <p className="mt-2 text-xs text-gray-500">El código de integración se generará automáticamente en el siguiente paso.</p>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6 text-center">
                        <h3 className="text-2xl font-semibold text-white">4. Revisión y Confirmación</h3>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            ¡Felicidades! Hemos recolectado toda la información técnica necesaria. Al hacer clic en "Finalizar Onboarding", su agente AI pasará al **entorno de QA** para las pruebas finales.
                        </p>
                        <div className="p-4 bg-white/5 border border-cyan-500/50 rounded-lg max-w-md mx-auto">
                            <h4 className='text-lg font-bold text-cyan-400 mb-2'>Datos a Confirmar:</h4>
                            <p className='text-sm text-gray-300'>CRM Token: **{formData.crmApiToken ? 'Configurado' : 'Pendiente'}**</p>
                            <p className='text-sm text-gray-300'>Webhook URL: **{formData.webhookUrl || 'Pendiente'}**</p>
                            <p className='text-sm text-gray-300'>Dominio de Despliegue: **{formData.domain || 'Pendiente'}**</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#0a1929] text-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                
                <h1 className="text-4xl font-extrabold text-center mb-4">Onboarding de Agente AI (FASE 4)</h1>
                <p className="text-center text-gray-400 mb-12">Puesta en marcha garantizada en menos de 72 horas.</p>

                {isComplete ? (
                    <SubmissionSuccess 
                        title="¡Onboarding de Integración Completado!"
                        message="Su equipo de AI Ops ya tiene todos los tokens. El agente está siendo desplegado en QA. Espere un email de confirmación en breve."
                    />
                ) : (
                    <div className="bg-[#0f1e2e] p-8 md:p-12 rounded-xl shadow-2xl border border-gray-800">
                        <StepIndicator currentStep={currentStep} steps={steps} />
                        
                        <form onSubmit={handleSubmit} className="mt-10">
                            <div className="min-h-60">
                                {renderStepContent()}
                            </div>

                            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-700">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={currentStep === 1 || isSubmitting}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                                        currentStep === 1 || isSubmitting 
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                                            : 'bg-white/10 hover:bg-white/20 text-white'
                                    }`}
                                >
                                    <ArrowLeftIcon className="w-5 h-5" />
                                    Atrás
                                </button>

                                <button
                                    type={currentStep === steps.length ? "submit" : "button"}
                                    onClick={currentStep !== steps.length ? handleNext : undefined}
                                    disabled={isSubmitting}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                                        isSubmitting
                                            ? 'bg-yellow-600 text-white cursor-wait'
                                            : currentStep === steps.length 
                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                                    }`}
                                >
                                    {isSubmitting ? 'Enviando...' : currentStep === steps.length ? 'Finalizar Onboarding' : 'Siguiente'}
                                    <ArrowRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
