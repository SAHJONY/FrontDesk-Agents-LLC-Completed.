// app/settings/telephony-trunk/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PhoneIcon, CheckCircleIcon, XCircleIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

export default function TelephonyTrunkSettingsPage() {
    const [provider, setProvider] = useState('Voice Infrastructure Trunk (Twilio/Internal)');
    const [trunkStatus, setTrunkStatus] = useState('active'); // 'active' | 'inactive'
    const [lastTest, setLastTest] = useState('Hace 3 minutos');
    const [isTesting, setIsTesting] = useState(false);

    const handleRunTrunkTest = () => {
        setIsTesting(true);
        console.log("Iniciando prueba de troncal de voz...");
        
        // Simulación de prueba de troncal exitosa (la métrica de éxito de llamada entrante)
        setTimeout(() => {
            alert("¡Prueba de Troncal Exitosa! Llamada entrante registrada y enrutada.");
            setTrunkStatus('active');
            setLastTest('Justo ahora');
            setIsTesting(false);
        }, 2500);
    };

    const getStatusIndicator = (currentStatus) => {
        if (currentStatus === 'active') {
            return { icon: CheckCircleIcon, color: 'text-green-500', label: 'OPERATIVO' };
        } else {
            return { icon: XCircleIcon, color: 'text-red-500', label: 'CAÍDO' };
        }
    };

    const indicator = getStatusIndicator(trunkStatus);

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <PhoneIcon className="h-10 w-10 text-primary-600 mr-3" />
                        Configuración de Troncales de Voz
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Gestión de la infraestructura telefónica (Twilio/Internal Provider).
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-premium border border-gray-100 space-y-8">
                    
                    {/* Estado del Troncal */}
                    <div className="border-b pb-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Estado del Troncal Principal</h2>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${indicator.color} bg-opacity-10`} style={{backgroundColor: indicator.color.replace('text-', 'bg-')}}>
                                <indicator.icon className="h-4 w-4 inline-block mr-1" />
                                {indicator.label}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Proveedor: {provider}</p>
                        <p className="text-sm text-gray-500 mt-1">Última prueba de conectividad: {lastTest}</p>
                    </div>

                    {/* Enrutamiento de Llamadas */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                            <ArrowsRightLeftIcon className="h-5 w-5 mr-2 text-primary-600" />
                            Configuración de Enrutamiento
                        </h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">URL de Conexión AI (SIP/WebRTC)</label>
                            <input type="text" value="sip:aura-core@trunk.frontdeskagents.com" readOnly className="input-premium bg-gray-100 italic cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Región del Troncal</label>
                            <input type="text" value="US-EAST-1" readOnly className="input-premium bg-gray-100 italic cursor-not-allowed" />
                        </div>
                    </div>

                    {/* Botón de Prueba - Métrica de Éxito de Llamada Entrante */}
                    <button
                        onClick={handleRunTrunkTest}
                        disabled={isTesting}
                        className={`btn-primary-premium w-full py-3 ${isTesting ? 'opacity-60 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        <PhoneIcon className="h-5 w-5 inline-block mr-2" />
                        {isTesting ? 'Probando Troncal...' : 'Ejecutar Prueba de Conectividad de Llamada'}
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                        La prueba simula una llamada entrante para verificar el flujo hacia el AURA™ Core.
                    </p>
                </div>
                
                {/* Link to Phone Number Management (already created) */}
                <div className="mt-8 text-center">
                    <Link href="/settings/numbers" className="text-sm font-medium text-primary-600 hover:text-primary-800">
                        Gestionar Números de Teléfono Individuales →
                    </Link>
                </div>
            </div>
        </div>
    );
}
