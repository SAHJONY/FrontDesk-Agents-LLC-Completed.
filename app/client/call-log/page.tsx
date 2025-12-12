// app/client/call-log/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    PhoneArrowUpRightIcon, 
    UserIcon, 
    ChartBarIcon, 
    ClockIcon, 
    PlayCircleIcon,
    TagIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

// Mock data for the Intelligent Call Log
const mockCalls = [
    {
        id: 5001,
        time: '2025-12-12 09:15:00',
        contact: 'Jane Doe',
        phone: '+1 555-123-4567',
        intent: 'Cita (Booking)',
        status: 'SUCCESS',
        score: 95,
        details: 'Cita agendada para el Lunes a las 10:00 AM. ID de Calendario: 987B.',
    },
    {
        id: 5002,
        time: '2025-12-12 08:45:30',
        contact: 'Alejandro Gómez',
        phone: '+52 55-8765-4321',
        intent: 'Precio (Pricing)',
        status: 'WARNING',
        score: 70,
        details: 'Cliente solicitó precios de paquete B. Envió link de pago por SMS, no confirmó. Requiere Follow-up #3.',
    },
    {
        id: 5003,
        time: '2025-12-11 17:00:15',
        contact: 'System Test Call',
        phone: '+1 555-000-1111',
        intent: 'Emergencia (Emergency)',
        status: 'ESCALATED',
        score: 55,
        details: 'Intención de emergencia detectada. Llamada transferida a línea humana de inmediato. Duración 0:45s.',
    },
    {
        id: 5004,
        time: '2025-12-11 15:30:00',
        contact: 'Mike Johnson',
        phone: '+1 555-987-6543',
        intent: 'Ventas (Sales)',
        status: 'SUCCESS',
        score: 88,
        details: 'Lead calificado con alta probabilidad. Notas: Contratará en Enero. Tag: Warm Lead.',
    },
];

const getStatusStyle = (status) => {
    switch (status) {
        case 'SUCCESS':
            return { icon: CheckCircleIcon, color: 'text-green-600', bg: 'bg-green-50' };
        case 'WARNING':
            return { icon: ExclamationTriangleIcon, color: 'text-yellow-600', bg: 'bg-yellow-50' };
        case 'ESCALATED':
            return { icon: ExclamationTriangleIcon, color: 'text-red-600', bg: 'bg-red-50' };
        default:
            return { icon: ClockIcon, color: 'text-gray-600', bg: 'bg-gray-50' };
    }
};

export default function IntelligentCallLogPage() {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Simple time formatter for display consistency
    const formatTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const filteredCalls = mockCalls.filter(call => 
        call.contact.toLowerCase().includes(searchTerm.toLowerCase()) || 
        call.phone.includes(searchTerm)
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <PhoneArrowUpRightIcon className="h-10 w-10 text-primary-600 mr-3" />
                        AURA™ Intelligent Call Log (CRM)
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Historial completo de interacciones de la IA. Métrica: **Calidad del Pipeline**.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100">
                    
                    {/* Search and Filters */}
                    <div className="flex items-center gap-4 mb-6 border-b pb-4">
                        <div className="relative w-full md:w-1/3">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar contacto o teléfono..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-premium pl-10"
                            />
                        </div>
                        <button className="btn-secondary-premium whitespace-nowrap">
                            Filtrar por Status
                        </button>
                    </div>

                    {/* Call Log Table */}
                    <div className="overflow-hidden shadow-sm ring-1 ring-black/5 rounded-xl">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto / Teléfono</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intención Detectada</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Score</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCalls.map((call) => {
                                    const statusStyle = getStatusStyle(call.status);
                                    return (
                                        <tr key={call.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatTime(call.time)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <p className="font-semibold text-gray-900">{call.contact}</p>
                                                <p className="text-xs text-gray-500">{call.phone}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                    <TagIcon className="h-4 w-4 mr-1" />
                                                    {call.intent}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary-600">
                                                {call.score}%
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.color}`}>
                                                    <statusStyle.icon className="h-4 w-4 mr-1" />
                                                    {call.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button 
                                                    onClick={() => alert(`Detalles de la llamada ${call.id}:\n${call.details}`)}
                                                    className="text-primary-600 hover:text-primary-800 mr-4"
                                                >
                                                    <ChartBarIcon className="h-5 w-5 inline-block mr-1" />
                                                    Ver Notas
                                                </button>
                                                <button 
                                                    onClick={() => alert(`Reproduciendo grabación de la llamada ${call.id}...`)}
                                                    className="text-gray-600 hover:text-gray-800"
                                                >
                                                    <PlayCircleIcon className="h-5 w-5 inline-block" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    {filteredCalls.length === 0 && (
                        <p className="text-center text-gray-500 mt-6">No se encontraron llamadas en el registro para la búsqueda actual.</p>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link href="/admin/feature-management" className="text-sm font-medium text-primary-600 hover:text-primary-800">
                        ← Gestionar Capacidades del AURA™ Core
                    </Link>
                </div>
            </div>
        </div>
    );
}
