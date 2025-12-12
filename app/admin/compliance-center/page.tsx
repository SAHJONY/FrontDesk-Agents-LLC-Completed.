// app/admin/compliance-center/page.tsx
"use client";

import React, { useState } from 'react';
// FIX APPLIED HERE: Link must be imported for Next.js routing components
import Link from 'next/link';
import { 
    ShieldCheckIcon, 
    LockClosedIcon, 
    DocumentMagnifyingGlassIcon, 
    CalendarIcon, 
    ArrowPathIcon,
    ServerIcon,
    Cog6ToothIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const compliancePolicies = [
    {
        name: 'GDPR (Reglamento General de Protección de Datos)',
        scope: 'Datos de la UE',
        status: 'Compliant',
        details: 'Derecho al olvido implementado. Encriptado de datos personales en reposo.',
        color: 'blue'
    },
    {
        name: 'CCPA (Ley de Privacidad del Consumidor de California)',
        scope: 'Datos de CA, EE. UU.',
        status: 'Compliant',
        details: 'Notificaciones de "No Vender Información" configuradas. Consentimiento registrado.',
        color: 'green'
    },
    {
        name: 'PCI DSS (Estándar de Seguridad de Datos de la Industria de Tarjetas de Pago)',
        scope: 'Módulos de Pago',
        status: 'Audit Required', // Simulación para mostrar necesidad de acción
        details: 'Datos de tarjeta nunca almacenados. Ambiente de Pago Tokenizado (Capacidad #4).',
        color: 'red'
    },
    {
        name: 'Normativa Mexicana de Pagos (BANXICO)',
        scope: 'Transacciones MXN',
        status: 'Compliant',
        details: 'Integración con SPEI verificada. Logs de transacciones con doble hashing.',
        color: 'purple'
    },
];

const getComplianceStyles = (status) => {
    switch (status) {
        case 'Compliant':
            return { icon: CheckCircleIcon, color: 'text-green-600', bg: 'bg-green-100' };
        case 'Audit Required':
            return { icon: ExclamationTriangleIcon, color: 'text-red-600', bg: 'bg-red-100' };
        default:
            return { icon: ShieldCheckIcon, color: 'text-gray-600', bg: 'bg-gray-100' };
    }
};

export default function ComplianceCenterPage() {
    const [retentionDays, setRetentionDays] = useState(365); // Default 1 año
    const [encryptionStatus, setEncryptionStatus] = useState(true);

    const handleApplySettings = () => {
        alert(`Nuevas políticas aplicadas:\nRetención: ${retentionDays} días\nEncriptado: ${encryptionStatus ? 'Activado' : 'Desactivado'}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <ShieldCheckIcon className="h-10 w-10 text-indigo-600 mr-3" />
                        AURA™ Data Governance & Compliance Center
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Control centralizado sobre retención de datos, encriptado y cumplimiento normativo.
                    </p>
                </div>

                {/* Compliance Status Overview */}
                <div className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100 mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 border-b pb-3 flex items-center mb-6">
                        <DocumentMagnifyingGlassIcon className="h-6 w-6 text-primary-600 mr-2" />
                        Políticas de Cumplimiento Global
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        {compliancePolicies.map((policy, index) => {
                            const styles = getComplianceStyles(policy.status);
                            return (
                                <div key={index} className={`p-5 rounded-xl border border-gray-200 ${styles.bg}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <styles.icon className={`h-5 w-5 ${styles.color}`} />
                                            <h3 className="text-lg font-semibold text-gray-900">{policy.name}</h3>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full text-white bg-${policy.color}-600`}>
                                            {policy.scope}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700">{policy.details}</p>
                                    <p className={`mt-2 text-xs font-bold ${styles.color}`}>Estado: {policy.status}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Data Retention and Encryption Settings */}
                <div className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 border-b pb-3 flex items-center mb-6">
                        <Cog6ToothIcon className="h-6 w-6 text-primary-600 mr-2" />
                        Configuración de Gobernanza de Datos
                    </h2>

                    <div className="space-y-6">
                        {/* 1. Data Retention Policy */}
                        <div>
                            <label htmlFor="retentionDays" className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
                                <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                                Política de Retención de Logs de Llamadas
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    id="retentionDays"
                                    min="30"
                                    max="1825" // 5 years
                                    value={retentionDays}
                                    onChange={(e) => setRetentionDays(parseInt(e.target.value))}
                                    className="input-premium w-32 text-center"
                                />
                                <span className="text-xl font-bold text-gray-900">días</span>
                                <p className="text-sm text-gray-500">
                                    Logs y grabaciones se eliminarán automáticamente después de {retentionDays} días.
                                </p>
                            </div>
                        </div>

                        {/* 2. Encryption Toggle */}
                        <div className="border-t pt-6">
                            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
                                <LockClosedIcon className="h-5 w-5 mr-2 text-gray-500" />
                                Encriptado de Datos en Reposo (Encryption at Rest)
                            </label>
                            <div className="flex items-center">
                                <button
                                    onClick={() => setEncryptionStatus(!encryptionStatus)}
                                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${encryptionStatus ? 'bg-indigo-600' : 'bg-gray-200'}`}
                                    role="switch"
                                    aria-checked={encryptionStatus}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${encryptionStatus ? 'translate-x-5' : 'translate-x-0'}`}
                                    />
                                </button>
                                <span className="ml-3 text-sm font-medium text-gray-900">
                                    {encryptionStatus ? 'Activo (AES-256)' : 'Inactivo (Recomendado Activar)'}
                                </span>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Aplica a grabaciones de voz y transcripciones almacenadas en la base de datos central.
                            </p>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleApplySettings}
                        className="btn-primary-premium w-full mt-8 py-3 bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center"
                    >
                        <ArrowPathIcon className="h-5 w-5 inline-block mr-2" />
                        Aplicar y Sincronizar Políticas de Gobernanza
                    </button>
                </div>
                
                <div className="mt-8 text-center">
                    <Link href="/admin/audit" className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center justify-center">
                        <DocumentMagnifyingGlassIcon className="h-4 w-4 mr-1" />
                        Ver Registros de Auditoría y Acceso (Audit Log) →
                    </Link>
                </div>
            </div>
        </div>
    );
}
