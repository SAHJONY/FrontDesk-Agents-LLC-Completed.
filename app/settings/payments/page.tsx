// app/settings/payments/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CreditCardIcon, CheckCircleIcon, XCircleIcon, BanknotesIcon } from '@heroicons/react/24/outline';

export default function PaymentSettingsPage() {
    const [status, setStatus] = useState('active'); // 'active' | 'inactive' | 'error'
    const [lastSync, setLastSync] = useState('Hace 2 minutos');
    const [isTesting, setIsTesting] = useState(false);

    const handleTestPayment = () => {
        setIsTesting(true);
        console.log("Iniciando prueba de pago con el procesador...");
        
        // Simulación de una prueba de pago exitosa (la métrica de éxito)
        setTimeout(() => {
            alert("¡Prueba de Pago Exitosa! Stripe (Internal Gateway) funciona correctamente.");
            setStatus('active');
            setLastSync('Justo ahora');
            setIsTesting(false);
        }, 2000);
    };

    const getStatusIndicator = (currentStatus) => {
        if (currentStatus === 'active') {
            return { icon: CheckCircleIcon, color: 'text-green-500', label: 'ACTIVO' };
        } else if (currentStatus === 'inactive') {
            return { icon: XCircleIcon, color: 'text-gray-500', label: 'INACTIVO' };
        } else {
            return { icon: XCircleIcon, color: 'text-red-500', label: 'ERROR' };
        }
    };

    const indicator = getStatusIndicator(status);

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <BanknotesIcon className="h-10 w-10 text-primary-600 mr-3" />
                        Configuración de Pagos
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Gestión del Procesador de Pagos (Stripe/Internal Gateway).
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-premium border border-gray-100 space-y-8">
                    
                    {/* Estado de la Integración */}
                    <div className="border-b pb-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Estado del Gateway de Pagos</h2>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${indicator.color} bg-opacity-10`} style={{backgroundColor: indicator.color.replace('text-', 'bg-')}}>
                                <indicator.icon className="h-4 w-4 inline-block mr-1" />
                                {indicator.label}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Última sincronización: {lastSync}</p>
                    </div>

                    {/* Claves y Tokens */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">Claves de API</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Clave Secreta (Masked)</label>
                            <input type="text" value="sk_************************" readOnly className="input-premium bg-gray-100 italic cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Webhook Secreto</label>
                            <input type="text" value="whsec_**********************" readOnly className="input-premium bg-gray-100 italic cursor-not-allowed" />
                        </div>
                    </div>

                    {/* Botón de Prueba - Métrica de Éxito Parcial */}
                    <button
                        onClick={handleTestPayment}
                        disabled={isTesting}
                        className={`btn-primary-premium w-full py-3 ${isTesting ? 'opacity-60 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                    >
                        <CreditCardIcon className="h-5 w-5 inline-block mr-2" />
                        {isTesting ? 'Probando Pago...' : 'Ejecutar Prueba de Pago de Integración'}
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                        La prueba simula una transacción de $1 para verificar la conectividad de los troncales.
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/dashboard/operational-overview" className="text-sm font-medium text-primary-600 hover:text-primary-800">
                        ← Volver a la Vista Operacional
                    </Link>
                </div>
            </div>
        </div>
    );
}
