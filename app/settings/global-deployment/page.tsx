// app/settings/global-deployment/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    GlobeAltIcon, 
    SignalIcon, 
    LanguageIcon, 
    ShieldExclamationIcon,
    PlayIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

// Mock data for regional deployment status
const mockRegions = [
    {
        id: 'us-east-1',
        name: 'United States (East)',
        code: 'US',
        status: 'OPERATIONAL',
        language: 'en-US',
        telephony: 'Trunk Active',
        compliance: 'GDPR/CCPA Ready',
        color: 'text-green-600',
        active: true,
    },
    {
        id: 'mx-central-1',
        name: 'Mexico (Central)',
        code: 'MX',
        status: 'DEPLOYMENT PENDING',
        language: 'es-MX',
        telephony: 'Trunk Inactive',
        compliance: 'Incompletos',
        color: 'text-yellow-600',
        active: false,
    },
    {
        id: 'ca-central-1',
        name: 'Canada (Central)',
        code: 'CA',
        status: 'FUTURE EXPANSION',
        language: 'en-CA/fr-CA',
        telephony: 'N/A',
        compliance: 'N/A',
        color: 'text-gray-500',
        active: false,
    },
];

export default function GlobalDeploymentPage() {
    const [regions, setRegions] = useState(mockRegions);
    const [isActivating, setIsActivating] = useState(false);

    const handleActivateMexico = () => {
        setIsActivating(true);
        console.log("Iniciando secuencia de despliegue en México...");
        
        setTimeout(() => {
            setRegions(prev => prev.map(r => 
                r.id === 'mx-central-1' ? { 
                    ...r, 
                    status: 'ACTIVATING TRUNK', 
                    color: 'text-blue-600' 
                } : r
            ));
        }, 1000);

        setTimeout(() => {
            setRegions(prev => prev.map(r => 
                r.id === 'mx-central-1' ? { 
                    ...r, 
                    status: 'OPERATIONAL', 
                    telephony: 'Trunk Active (MX)',
                    compliance: 'Certificado (LFPDPPP)',
                    color: 'text-green-600',
                    active: true, 
                } : r
            ));
            alert("¡Despliegue en México (MX-Central) COMPLETADO! Telefonía y Modelo Español activados.");
            setIsActivating(false);
        }, 3500);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <GlobeAltIcon className="h-10 w-10 text-primary-600 mr-3" />
                        Global Deployment Management Center
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Gestión de la infraestructura de **AURA™ Core** a nivel global y expansión regional.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {regions.map((region) => (
                        <div 
                            key={region.id} 
                            className={`bg-white p-6 rounded-2xl shadow-xl border-t-4 ${
                                region.active ? 'border-green-500' : 
                                region.id === 'mx-central-1' ? 'border-yellow-500' : 'border-gray-200'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <GlobeAltIcon className={`h-6 w-6 ${region.color}`} />
                                    {region.name} ({region.code})
                                </h3>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${region.color.replace('text-', 'bg-')}/10`} style={{color: region.color}}>
                                    {region.status}
                                </span>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-4">ID de Infraestructura: {region.id}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-gray-700">
                                    <LanguageIcon className="h-5 w-5 text-purple-600" />
                                    **Modelo de Lenguaje:** {region.language}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-700">
                                    <SignalIcon className="h-5 w-5 text-blue-600" />
                                    **Troncal de Telefonía:** {region.telephony}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-700">
                                    <ShieldExclamationIcon className="h-5 w-5 text-red-600" />
                                    **Cumplimiento Local:** {region.compliance}
                                </div>
                            </div>
                            
                            {/* Acción Específica para México */}
                            {region.id === 'mx-central-1' && !region.active && (
                                <button
                                    onClick={handleActivateMexico}
                                    disabled={isActivating}
                                    className={`btn-primary-premium w-full py-2 bg-yellow-600 hover:bg-yellow-700 ${isActivating ? 'opacity-60 cursor-not-allowed' : ''}`}
                                >
                                    <PlayIcon className="h-5 w-5 inline-block mr-2" />
                                    {isActivating ? 'Desplegando Recursos MX...' : 'Activar Despliegue en México'}
                                </button>
                            )}

                             {/* Configuración Adicional si está activo */}
                             {region.active && (
                                 <Link href="/settings/telephony-trunk" className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center justify-center mt-3">
                                     <ArrowPathIcon className="h-4 w-4 mr-1" />
                                     Ajustar Routing Regional
                                 </Link>
                             )}

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
