// app/onboarding/guided-setup/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    PlayIcon, 
    PhoneIcon, 
    CalendarIcon, 
    CheckCircleIcon, 
    Cog6ToothIcon,
    ArrowRightIcon,
    ServerStackIcon,
    TicketIcon
} from '@heroicons/react/24/outline';

const setupSteps = [
    { 
        id: 1, 
        name: 'Conexión de Infraestructura de Voz', 
        description: 'Sincroniza tus líneas telefónicas y números de troncal (VoIP).', 
        path: '/settings/telephony-trunk',
        icon: PhoneIcon,
        isComplete: false 
    },
    { 
        id: 2, 
        name: 'Definición del Flujo de Agentes Multi-RL', 
        description: 'Usa el Workflow Builder (Capacidad #10) para definir Intenciones (Cita, Precio, Venta).', 
        path: '/admin/feature-management',
        icon: TicketIcon,
        isComplete: false 
    },
    { 
        id: 3, 
        name: 'Integración de Datos y Calendario', 
        description: 'Conecta tu CRM (Salesforce/HubSpot) y Calendario (Google/Outlook) para agendamiento.', 
        path: '/settings/integrations-hub',
        icon: CalendarIcon,
        isComplete: false 
    },
    { 
        id: 4, 
        name: 'Activación Final y Calibración', 
        description: 'Revisa el "AI Score" y pon tu Agentic Workforce en línea 24/7.', 
        path: '/admin/calibration-engine',
        icon: PlayIcon,
        isComplete: false 
    },
];

const StepCard = ({ step, onMarkComplete }) => {
    const isComplete = step.isComplete;
    const Icon = isComplete ? CheckCircleIcon : step.icon;

    return (
        <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
            isComplete ? 'bg-green-50 border-l-4 border-green-500' : 'bg-white border-l-4 border-gray-200 hover:shadow-xl'
        }`}>
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                    <Icon className={`h-8 w-8 flex-shrink-0 ${isComplete ? 'text-green-600' : 'text-indigo-600'}`} />
                    <div>
                        <h3 className={`text-xl font-bold ${isComplete ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {step.id}. {step.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                    <Link href={step.path}
                        className={`px-3 py-1 text-sm rounded-full font-semibold transition-colors flex items-center gap-1 ${
                            isComplete 
                                ? 'bg-gray-400 text-white cursor-not-allowed' 
                                : 'bg-indigo-500 text-white hover:bg-indigo-600'
                        }`}
                        // Prevents actual navigation in this simulation
                        onClick={(e) => { if (!isComplete) console.log(`Navigating to ${step.path}`); else e.preventDefault(); }}
                    >
                        <Cog6ToothIcon className="h-4 w-4" />
                        {isComplete ? 'Completado' : 'Configurar'}
                    </Link>
                    
                    {!isComplete && (
                        <button 
                            onClick={() => onMarkComplete(step.id)}
                            className="text-xs text-green-600 hover:text-green-800"
                        >
                            Marcar como hecho
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function GuidedOnboardingPage() {
    const [steps, setSteps] = useState(setupSteps);

    const handleMarkComplete = (id) => {
        setSteps(prev => 
            prev.map(step => 
                step.id === id ? { ...step, isComplete: true } : step
            )
        );
    };

    const completionCount = steps.filter(s => s.isComplete).length;
    const totalSteps = steps.length;
    const progress = (completionCount / totalSteps) * 100;
    const isSetupComplete = completionCount === totalSteps;

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <ServerStackIcon className="h-10 w-10 text-primary-600 mr-3" />
                        AURA™ QuickStart Guided Setup
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Ponga en línea su Agente Autónomo en 4 pasos sencillos.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-10 p-6 bg-white rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progreso de Configuración:</span>
                        <span className="text-sm font-bold text-indigo-600">{completionCount} de {totalSteps} Pasos</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Setup Steps Grid */}
                <div className="space-y-6">
                    {steps.map((step) => (
                        <StepCard 
                            key={step.id} 
                            step={step} 
                            onMarkComplete={handleMarkComplete} 
                        />
                    ))}
                </div>

                {/* Completion Banner */}
                {isSetupComplete && (
                    <div className="mt-12 p-8 text-center bg-green-500 rounded-xl shadow-2xl">
                        <CheckCircleIcon className="h-12 w-12 text-white mx-auto mb-3" />
                        <h2 className="text-3xl font-bold text-white mb-2">¡Felicitaciones! Configuración Completa.</h2>
                        <p className="text-lg text-white/90">
                            Su Agente Autónomo está listo para tomar llamadas 24/7.
                        </p>
                        <Link href="/dashboard/operational-overview" className="mt-4 inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-green-800 bg-white hover:bg-gray-100">
                            <ArrowRightIcon className="h-5 w-5 mr-2" />
                            Ir al Dashboard Operacional
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
