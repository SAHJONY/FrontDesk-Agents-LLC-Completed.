'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { 
  ArrowRightIcon, 
  UserIcon, 
  BriefcaseIcon, 
  ScaleIcon, 
  CheckCircleIcon,
  PhoneIcon 
} from '@heroicons/react/24/outline';

// --- INTERFACES DE TYPESCRIPT (CORRECCIÓN CRÍTICA) ---

interface DemoFormStepProps {
    step: number;
    currentStep: number;
    children: React.ReactNode;
}

interface InputFieldProps {
    label: string;
    name: string;
    type: string;
    icon: React.ElementType;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

interface SelectFieldProps {
    label: string;
    name: string;
    icon: React.ElementType;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    placeholder: string;
}

// --- DATOS PARA CALIFICACIÓN ---
const INDUSTRY_OPTIONS = [
    { value: 'health', label: 'Salud y Clínicas (HIPAA)' },
    { value: 'insurance', label: 'Seguros y Banca (Compliance)' },
    { value: 'real_estate', label: 'Bienes Raíces (Alto Volumen)' },
    { value: 'legal', label: 'Servicios Legales y Consultoría' },
    { value: 'other', label: 'Otro' },
];

// --- COMPONENTE DE PASO CORREGIDO CON TIPOS ---
const DemoFormStep = ({ step, currentStep, children }: DemoFormStepProps) => (
    <div 
        className={`transition-opacity duration-500 ease-in-out ${currentStep === step ? 'opacity-100 block' : 'opacity-0 hidden absolute top-0 left-0 w-full'}`}
    >
        {children}
    </div>
);

export default function BookADemoPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        workEmail: '',
        jobTitle: '',
        industry: '',
        companySize: '1-50',
        callVolume: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsSubmitted(true);
        }
    };

    const nextStepIsValid = () => {
        if (currentStep === 1) {
            return formData.fullName.trim() && formData.workEmail.trim() && formData.jobTitle.trim();
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
                    <h1 className="text-3xl font-bold text-white mb-4">¡Demo Solicitada!</h1>
                    <p className="text-gray-400 mb-8">
                        Su solicitud ha sido enviada para la industria <strong className="text-cyan-400">{INDUSTRY_OPTIONS.find(o => o.value === formData.industry)?.label}</strong>.
                    </p>
                    <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-medium">
                        ← Volver a Inicio
                    </Link>
                </div>
            </div>
        );
    }

    const selectedIndustryLabel = INDUSTRY_OPTIONS.find(o => o.value === formData.industry)?.label || 'No especificada';

    return (
        <div className="min-h-screen bg-[#0a1929] pt-32 pb-16 flex justify-center items-start px-4">
            <div className="max-w-2xl w-full bg-[#10213A] p-8 md:p-12 rounded-xl shadow-2xl border border-white/10">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Agenda una Consulta</h1>
                <p className="text-gray-400 mb-8">Complete los pasos para su demostración personalizada.</p>

                <div className="flex justify-between mb-8">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className={`flex-1 text-center py-2 border-b-4 ${currentStep >= num ? 'border-cyan-500 text-cyan-400' : 'border-gray-700 text-gray-500'} font-semibold transition-all`}>
                            {num}. {num === 1 ? 'Contacto' : num === 2 ? 'Negocio' : 'Confirmar'}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="relative min-h-[380px]"> 
                        <DemoFormStep step={1} currentStep={currentStep}>
                            <div className="space-y-6">
                                <InputField label="Nombre Completo" name="fullName" type="text" icon={UserIcon} value={formData.fullName} onChange={handleChange} placeholder="Ej. Juan Pérez" />
                                <InputField label="Email Corporativo" name="workEmail" type="email" icon={ArrowRightIcon} value={formData.workEmail} onChange={handleChange} placeholder="name@empresa.com" />
                                <InputField label="Cargo" name="jobTitle" type="text" icon={BriefcaseIcon} value={formData.jobTitle} onChange={handleChange} placeholder="Ej. Director" />
                            </div>
                        </DemoFormStep>

                        <DemoFormStep step={2} currentStep={currentStep}>
                            <div className="space-y-6">
                                <SelectField label="Industria" name="industry" icon={ScaleIcon} value={formData.industry} onChange={handleChange} options={INDUSTRY_OPTIONS} placeholder="Selecciona..." />
                                <SelectField label="Volumen de Llamadas" name="callVolume" icon={PhoneIcon} value={formData.callVolume} onChange={handleChange} options={[{ value: '<500', label: '< 500' }, { value: '500+', label: '500+' }]} placeholder="Selecciona volumen..." />
                            </div>
                        </DemoFormStep>

                        <DemoFormStep step={3} currentStep={currentStep}>
                            <div className="text-center p-6 bg-cyan-900/20 border border-cyan-700/50 rounded-lg text-white">
                                <h2 className="text-xl font-bold mb-4">Confirmación</h2>
                                <p className="text-sm text-gray-300">Resumen para {formData.fullName}</p>
                                <div className="mt-4 text-left text-sm space-y-2">
                                    <p><strong>Email:</strong> {formData.workEmail}</p>
                                    <p><strong>Industria:</strong> {selectedIndustryLabel}</p>
                                </div>
                            </div>
                        </DemoFormStep>
                    </div>

                    <div className="flex mt-8 justify-between border-t border-gray-800 pt-6">
                        {currentStep > 1 && (
                            <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="px-6 py-2 bg-gray-700 text-white rounded-lg">Anterior</button>
                        )}
                        <button type="submit" disabled={!nextStepIsValid()} className={`px-6 py-2 rounded-lg text-white font-bold ${nextStepIsValid() ? 'bg-cyan-600' : 'bg-gray-600'} ${currentStep === 1 ? 'w-full' : ''}`}>
                            {currentStep < 3 ? 'Siguiente' : 'Agendar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const InputField = ({ label, name, type, icon: Icon, value, onChange, placeholder }: InputFieldProps) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-cyan-400" />
            </div>
            <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="block w-full bg-white/5 border border-gray-700 rounded-md py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
    </div>
);

const SelectField = ({ label, name, icon: Icon, value, onChange, options, placeholder }: SelectFieldProps) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-cyan-400" />
            </div>
            <select name={name} value={value} onChange={onChange} className="block w-full bg-white/5 border border-gray-700 rounded-md py-3 pl-10 pr-4 text-white appearance-none outline-none">
                <option value="" disabled className="bg-[#10213A]">{placeholder}</option>
                {options.map(opt => <option key={opt.value} value={opt.value} className="bg-[#10213A]">{opt.label}</option>)}
            </select>
        </div>
    </div>
);
