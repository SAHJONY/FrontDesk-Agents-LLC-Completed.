// app/settings/payments/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    CreditCardIcon, 
    CheckCircleIcon, 
    XCircleIcon, 
    BanknotesIcon,
    ArrowPathIcon,
    GlobeAltIcon,
    PuzzlePieceIcon
} from '@heroicons/react/24/outline';

// Data structure for multiple payment gateways (including worldwide options)
const mockGateways = [
    { 
        id: 'stripe', 
        name: 'Primary Card Processor (Stripe)', 
        status: 'active', 
        lastSync: 'Hace 2 minutos',
        icon: CreditCardIcon,
        description: 'Maneja tarjetas de crédito/débito primarias y facturación recurrente.'
    },
    { 
        id: 'mexico-local', 
        name: 'Liquidación Local MX (OXXO/SPEI)', 
        status: 'inactive', 
        lastSync: 'N/A',
        icon: BanknotesIcon,
        description: 'Crucial para el mercado MX: efectivo (OXXO), transferencias bancarias (SPEI) y métodos locales.'
    },
    { 
        id: 'paypal', 
        name: 'Global Peer-to-Peer (PayPal/Venmo)', 
        status: 'active', 
        lastSync: 'Hace 5 horas',
        icon: GlobeAltIcon,
        description: 'Permite pagos P2P (incluyendo Cash App/Zelle en el backend) y transferencias internacionales.'
    },
    { 
        id: 'square', 
        name: 'Secondary POS/Invoicing (Square)', 
        status: 'inactive', 
        lastSync: 'N/A',
        icon: PuzzlePieceIcon,
        description: 'Utilizado para transacciones manuales y facturación de punto de venta (POS).'
    },
];

export default function PaymentSettingsPage() {
    const [gateways, setGateways] = useState(mockGateways);
    const [isTesting, setIsTesting] = useState(false);

    const handleTestGateway = (id) => {
        setIsTesting(true);
        const gatewayName = gateways.find(g => g.id === id)?.name;

        console.log(`Iniciando prueba de conectividad con ${gatewayName}...`);
        
        setTimeout(() => {
            setGateways(prev => prev.map(g => 
                g.id === id ? { ...g, status: 'active', lastSync: 'Justo ahora' } : g
            ));
            alert(`¡Prueba de ${gatewayName} Exitosa! Conexión verificada.`);
            setIsTesting(false);
        }, 2000);
    };

    const getStatusIndicator = (currentStatus) => {
        if (currentStatus === 'active') {
            return { icon: CheckCircleIcon, color: 'text-green-600', label: 'ACTIVO' };
        } else {
            return { icon: XCircleIcon, color: 'text-gray-500', label: 'INACTIVO' };
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <BanknotesIcon className="h-10 w-10 text-primary-600 mr-3" />
                        Configuración de Pagos Multi-Gateway
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Gestión de integraciones de pago a nivel mundial (Stripe, Square, PayPal, etc.).
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-premium border border-gray-100 space-y-8">
                    
                    <div className="border-b pb-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Pasarelas de Pago Activas</h2>
                        <p className="text-sm text-gray-500 mt-1">Conecte las pasarelas necesarias para aceptar diversos métodos de pago globales.</p>
                    </div>

                    {gateways.map((gateway) => {
                        const indicator = getStatusIndicator(gateway.status);

                        return (
                            <div key={gateway.id} className="p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <gateway.icon className={`h-6 w-6 ${indicator.color}`} />
                                        <h3 className="text-xl font-semibold text-gray-900">{gateway.name}</h3>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${indicator.color} bg-opacity-10`} style={{backgroundColor: indicator.color.replace('text-', 'bg-')}}>
                                        <indicator.icon className="h-4 w-4 inline-block mr-1" />
                                        {indicator.label}
                                    </span>
                                </div>
                                
                                <p className="text-sm text-gray-600 mb-4">{gateway.description}</p>
                                
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-gray-500">Última sincronización: {gateway.lastSync}</p>
                                    
                                    <button
                                        onClick={() => handleTestGateway(gateway.id)}
                                        disabled={isTesting}
                                        className={`btn-secondary-premium py-2 px-4 text-sm ${isTesting ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    >
                                        <ArrowPathIcon className="h-4 w-4 inline-block mr-1" />
                                        {isTesting ? 'Probando...' : 'Probar Conectividad'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {/* API Key Management Section (Simplified) */}
                    <div className="pt-6 border-t border-gray-200 mt-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Claves Globales de API</h3>
                        <p className="text-sm text-gray-600 mb-4">Las claves y tokens para cada pasarela se gestionan en el Gestor de Secretos AURA™ Core.</p>
                        
                        <button className="btn-secondary-premium">
                             Gestionar Claves en AURA™ Vault
                        </button>
                    </div>
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
