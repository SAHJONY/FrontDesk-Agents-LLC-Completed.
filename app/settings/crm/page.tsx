// app/settings/crm/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { UsersIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function CRMSettingsPage() {
    const [system, setSystem] = useState('HubSpot (Internal CRM)');
    const [status, setStatus] = useState('active'); // 'active' | 'inactive'
    const [lastSync, setLastSync] = useState('Hace 5 minutos');
    const [isSyncing, setIsSyncing] = useState(false);

    const handleManualSync = () => {
        setIsSyncing(true);
        console.log("Iniciando sincronización manual de CRM...");
        
        // Simulación de sincronización
        setTimeout(() => {
            alert("Sincronización de CRM completada. 120 nuevos contactos actualizados.");
            setLastSync('Justo ahora');
            setIsSyncing(false);
        }, 1500);
    };

    const getStatusIndicator = (currentStatus) => {
        if (currentStatus === 'active') {
            return { icon: CheckCircleIcon, color: 'text-green-500', label: 'ACTIVO' };
        } else {
            return { icon: XCircleIcon, color: 'text-red-500', label: 'INACTIVO' };
        }
    };

    const indicator = getStatusIndicator(status);

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <UsersIcon className="h-10 w-10 text-primary-600 mr-3" />
                        Gestión de Integración CRM
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Configuración de la conexión con HubSpot / Google Sheets (Sistema de Datos).
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-premium border border-gray-100 space-y-8">
                    
                    {/* Estado de la Integración */}
                    <div className="border-b pb-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Sistema Conectado: {system}</h2>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${indicator.color} bg-opacity-10`} style={{backgroundColor: indicator.color.replace('text-', 'bg-')}}>
                                <indicator.icon className="h-4 w-4 inline-block mr-1" />
                                {indicator.label}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Última sincronización de datos: {lastSync}</p>
                    </div>

                    {/* Detalles de Conexión */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">Puntos de Enlace</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Punto de Enlace de Contactos</label>
                            <input type="text" value="https://api.frontdeskagents.com/crm/hubspot/contacts" readOnly className="input-premium bg-gray-100 italic cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Clave de Acceso (Token OAuth)</label>
                            <input type="text" value="tok_**********************" readOnly className="input-premium bg-gray-100 italic cursor-not-allowed" />
                        </div>
                    </div>

                    {/* Botón de Sincronización Manual */}
                    <button
                        onClick={handleManualSync}
                        disabled={isSyncing}
                        className={`btn-secondary-premium w-full py-3 ${isSyncing ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        <UsersIcon className="h-5 w-5 inline-block mr-2" />
                        {isSyncing ? 'Sincronizando...' : 'Forzar Sincronización de Datos Manual'}
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                        La sincronización automática ocurre cada 5 minutos.
                    </p>
                </div>
            </div>
        </div>
    );
}
