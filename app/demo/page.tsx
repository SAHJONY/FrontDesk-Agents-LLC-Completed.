'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRightIcon, 
  UserIcon, 
  BriefcaseIcon, 
  ScaleIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

// --- DATOS PARA CALIFICACIÓN ---
const INDUSTRY_OPTIONS = [
    { value: 'health', label: 'Salud y Clínicas (HIPAA)' },
    { value: 'insurance', label: 'Seguros y Banca (Compliance)' },
    { value: 'real_estate', label: 'Bienes Raíces (Alto Volumen)' },
    { value: 'legal', label: 'Servicios Legales y Consultoría' },
    { value: 'other', label: 'Otro' },
];

// --- COMPONENTE DE PASO (MULTI-STEP FORM) ---

const DemoFormStep = ({ step, currentStep, children }) => (
    <div 
        className={`transition-opacity duration-500 ease-in-out ${currentStep === step ? 'opacity-100 block' : 'opacity-0 hidden'}`}
    >
        {children}
    </div>
);

// --- COMPONENTE PRINCIPAL ---

export default function BookADemoPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Contacto
        fullName: '',
        workEmail: '',
        jobTitle: '',
        // Step 2: Calificación
        industry: '',
        companySize: '1-50',
        callVolume: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            // Aquí se enviaría el formData a tu API (e.g., /api/bookings)
            console.log('Formulario enviado:', formData);
            // Simulación de envío exitoso
            setIsSubmitted(true);
        }
    };

    const nextStepIsValid = () => {
        if (currentStep === 1) {
            return formData.fullName && formData.workEmail && formData.jobTitle;
        }
        if (currentStep === 2) {
            return formData.industry && formData.callVolume;
        }
        return true;
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#0a1929] pt-32 flex justify-center items-start">
                <div className="max-w-xl w-full bg-[#10213A] p-12 rounded-xl shadow-2xl border border-cyan-700/50 text-center">
                    <CheckCircleIcon className="w-16 h-16 mx-auto text-green-400 mb-6" />
                    <h1 className="text-3xl font-bold text-white mb-4">¡Demo Solicitada Exitosamente!</h1>
                    <p className="text-gray-400 mb-8">
                        Su solicitud ha sido enviada. Nuestro equipo ejecutivo revisará sus requerimientos 
                        (<strong className="text-cyan-400">{formData.industry}</strong>, ~{formData.callVolume} llamadas/mes) 
                        y se comunicará con usted en menos de 4 horas para confirmar su agenda.
                    </p>
                    <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-medium">
                        ← Volver a la página principal
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a1929] pt-32 pb-16 flex justify-center items-start">
            <div className="max-w-2xl w-full bg-[#10213A] p-12 rounded-xl shadow-2xl border border-white/10">
                
                <h1 className="text-4xl font-bold text-white mb-2">Agenda una Consulta Ejecutiva</h1>
                <p className="text-gray-400 mb-8">
                    Por favor, complete estos 2 pasos para que nuestro equipo pueda preparar una demostración personalizada y relevante para su negocio.
                </p>

                {/* Indicador de Progreso */}
                <div className="flex justify-between mb-8">
                    <div className={`flex-1 text-center py-2 border-b-4 ${currentStep >= 1 ? 'border-cyan-500 text-cyan-400' : 'border-gray-700 text-gray-500'} font-semibold transition-all`}>
                        1. Contacto
                    </div>
                    <div className={`flex-1 text-center py-2 border-b-4 ${currentStep >= 2 ? 'border-cyan-500 text-cyan-400' : 'border-gray-700 text-gray-500'} font-semibold transition-all`}>
                        2. Negocio
                    </div>
                    <div className={`flex-1 text-center py-2 border-b-4 ${currentStep === 3 ? 'border-cyan-500 text-cyan-400' : 'border-gray-700 text-gray-500'} font-semibold transition-all`}>
                        3. Confirmar
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    
                    {/* --- PASO 1: CONTACTO --- */}
                    <DemoFormStep step={1} currentStep={currentStep}>
                        <div className="space-y-6">
                            <InputField 
                                label="Nombre Completo"
                                name="fullName"
                                type="text"
                                icon={UserIcon}
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Ej. Juan Pérez"
                            />
                            <InputField 
                                label="Email de Trabajo"
                                name="workEmail"
                                type="email"
                                icon={ArrowRightIcon}
                                value={formData.workEmail}
                                onChange={handleChange}
                                placeholder="name@empresa.com"
                            />
                            <InputField 
                                label="Cargo / Título"
                                name="jobTitle"
                                type="text"
                                icon={BriefcaseIcon}
                                value={formData.jobTitle}
                                onChange={handleChange}
                                placeholder="Ej. VP de Operaciones"
                            />
                        </div>
                    </DemoFormStep>

                    {/* --- PASO 2: CALIFICACIÓN DEL NEGOCIO --- */}
                    <DemoFormStep step={2} currentStep={currentStep}>
                        <div className="space-y-6">
                            <SelectField
                                label="Industria"
                                name="industry"
                                icon={ScaleIcon}
                                value={formData.industry}
                                onChange={handleChange}
                                options={INDUSTRY_OPTIONS}
                                placeholder="Selecciona tu industria principal..."
                            />
                            
                            <SelectField
                                label="Volumen Mensual de Llamadas/Inquiries"
                                name="callVolume"
                                icon={PhoneIcon}
                                value={formData.callVolume}
                                onChange={handleChange}
                                options={[
                                    { value: '<500', label: 'Menos de 500 (PoC Inicial)' },
                                    { value: '500-2500', label: '500 - 2,500 (Crecimiento)' },
                                    { value: '2500-10000', label: '2,500 - 10,000 (Empresa Mediana)' },
                                    { value: '10000+', label: 'Más de 10,000 (Enterprise)' },
                                ]}
                                placeholder="Estima tu volumen de comunicación..."
                            />

                            <SelectField
                                label="Tamaño de la Empresa (Empleados)"
                                name="companySize"
                                icon={UserIcon}
                                value={formData.companySize}
                                onChange={handleChange}
                                options={[
                                    { value: '1-50', label: '1 - 50 (Startup/Pequeña Empresa)' },
                                    { value: '51-500', label: '51 - 500 (Mediana Empresa)' },
                                    { value: '501+', label: '+500 (Enterprise / Corporativo)' },
                                ]}
                                placeholder="Selecciona el rango de empleados..."
                            />
                        </div>
                    </DemoFormStep>

                    {/* --- PASO 3: CONFIRMACIÓN --- */}
                    <DemoFormStep step={3} currentStep={currentStep}>
                        <div className="text-center p-8 bg-cyan-900/20 border border-cyan-700/50 rounded-lg">
                            <h2 className="text-2xl font-bold text-white mb-4">Revisión Final</h2>
                            <p className="text-gray-300 mb-6">
                                Confirme sus datos antes de agendar la llamada. Su demostración será adaptada a la industria **{formData.industry}**.
                            </p>
                            <ul className="text-left space-y-2 text-gray-300">
                                <li><strong>Contacto:</strong> {formData.fullName} ({formData.jobTitle})</li>
                                <li><strong>Email:</strong> {formData.workEmail}</li>
                                <li><strong>Industria:</strong> {INDUSTRY_OPTIONS.find(o => o.value === formData.industry)?.label || 'N/A'}</li>
                                <li><strong>Volumen:</strong> {formData.callVolume} llamadas/mes</li>
                            </ul>
                            <div className="mt-6 text-sm text-gray-400">
                                Al enviar, acepta nuestra Política de Privacidad.
                            </div>
                        </div>
                    </DemoFormStep>

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
                                className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${nextStepIsValid() ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-500/50 cursor-not-allowed'} ${currentStep === 1 ? 'w-full ml-auto' : 'ml-auto'}`}
                            >
                                {currentStep < 3 ? 'Siguiente Paso →' : 'Agendar Demostración'}
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

// --- Componente de Input Profesional ---
const InputField = ({ label, name, type, icon: Icon, value, onChange, placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
            </div>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required
                placeholder={placeholder}
                className="block w-full rounded-md border-0 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-gray-500 ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6 transition-all duration-200"
            />
        </div>
    </div>
);

// --- Componente de Select Profesional ---
const SelectField = ({ label, name, icon: Icon, value, onChange, options, placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
            </div>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required
                className="block w-full rounded-md border-0 bg-white/5 py-3 pl-10 pr-10 text-white ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6 appearance-none transition-all duration-200"
            >
                <option value="" disabled className="text-gray-500 bg-[#10213A]">{placeholder}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value} className="text-white bg-[#10213A]">
                        {option.label}
                    </option>
                ))}
            </select>
            {/* Ícono de flecha para el select */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ArrowRightIcon className="h-4 w-4 text-gray-500 transform rotate-90" aria-hidden="true" />
            </div>
        </div>
    </div>
);

// Nota: Asegúrate de que los íconos de @heroicons/react estén instalados.
