// app/admin/agentic-orchestration/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    UsersIcon, 
    WrenchIcon, 
    ArrowPathIcon, 
    PhoneIcon, 
    CalendarDaysIcon, 
    CreditCardIcon, 
    UserGroupIcon, 
    CpuChipIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

// Data for the Multi-RL Agents
const agenticAgents = [
    {
        id: 'LQA-001',
        name: 'Lead Qualifier Agent (LQA)',
        role: 'Intención y Filtrado',
        icon: PhoneIcon,
        status: 'Operational',
        utilization: 95, // %
        collaborationRate: 88, // % de veces que pasa la tarea correctamente
        metrics: {
            success: '98.1% Intent Match',
            fail: '1.9% Human Escalation'
        }
    },
    {
        id: 'SA-002',
        name: 'Scheduling Agent (SA)',
        role: 'Agendamiento y Calendario',
        icon: CalendarDaysIcon,
        status: 'Operational',
        utilization: 85,
        collaborationRate: 92,
        metrics: {
            success: '92.0% Booking Rate',
            fail: '8.0% Double-Booking Attempts'
        }
    },
    {
        id: 'PPA-003',
        name: 'Payment Processing Agent (PPA)',
        role: 'Transacciones Financieras',
        icon: CreditCardIcon,
        status: 'Operational',
        utilization: 70,
        collaborationRate: 99,
        metrics: {
            success: '99.5% Secure Handshake',
            fail: '0.5% Gateway Timeout'
        }
    },
    {
        id: 'CUA-004',
        name: 'CRM Update Agent (CUA)',
        role: 'Sincronización de Datos',
        icon: UserGroupIcon,
        status: 'Operational',
        utilization: 100, // Debe ejecutarse siempre al final
        collaborationRate: 99.9,
        metrics: {
            success: '100% Data Integrity',
            fail: '0.1% Format Errors'
        }
    },
];

const getStatusColor = (status) => {
    return status === 'Operational' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
};

export default function AgenticOrchestrationPage() {
    const [isRebalancing, setIsRebalancing] = useState(false);

    const handleRebalance = () => {
        setIsRebalancing(true);
        console.log("Iniciando Rebalanceo de la Carga de Trabajo entre Agentes Multi-RL...");
        
        setTimeout(() => {
            alert("¡Rebalanceo de Carga de Agentes completado! Utilización ajustada automáticamente.");
            setIsRebalancing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <CpuChipIcon className="h-10 w-10 text-indigo-600 mr-3" />
                        AURA™ Agentic Workforce Orchestration
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Gestión y colaboración de Agentes Autónomos Multi-Rol (**Multi-RL Agents**).
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100">
                    
                    {/* Orchestrator Header */}
                    <div className="mb-8 p-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <WrenchIcon className="h-6 w-6 text-primary-600" />
                            <h2 className="text-2xl font-bold text-gray-900">AURA™ Core: El Orquestador</h2>
                        </div>
                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 flex items-center">
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Control de Flujo: Activo
                        </span>
                    </div>

                    {/* Agentic Workforce Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {agenticAgents.map((agent) => (
                            <div key={agent.id} className="p-6 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <agent.icon className={`h-6 w-6 text-${agent.color}-600`} />
                                        <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(agent.status)}`}>
                                        {agent.status}
                                    </span>
                                </div>
                                
                                <p className="text-sm text-gray-600 mb-4">
                                    **Rol Principal:** {agent.role}
                                </p>

                                {/* Metrics and Collaboration */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-700">Utilización de Recursos:</span>
                                        <span className="font-bold text-blue-600">{agent.utilization}%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-700">Tasa de Colaboración (Transferencia):</span>
                                        <span className="font-bold text-green-600">{agent.collaborationRate}%</span>
                                    </div>
                                </div>

                                {/* Flow Visualization */}
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Flujo de Tarea:</h4>
                                    <div className="flex items-center text-xs text-gray-600">
                                        <SparklesIcon className="h-4 w-4 mr-1 text-purple-500" />
                                        <span>Intención Detectada</span>
                                        <ArrowRightIcon className="h-4 w-4 mx-2 text-gray-400" />
                                        <span>Control a **{agent.id}**</span>
                                        <ArrowRightIcon className="h-4 w-4 mx-2 text-gray-400" />
                                        <span>{agent.metrics.success}</span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Rebalance Button */}
                    <button
                        onClick={handleRebalance}
                        disabled={isRebalancing}
                        className={`btn-primary-premium w-full mt-8 py-3 bg-indigo-600 hover:bg-indigo-700 ${isRebalancing ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        <ArrowPathIcon className="h-5 w-5 inline-block mr-2" />
                        {isRebalancing ? 'Rebalanceando Carga (2s)...' : 'Ejecutar Rebalanceo de Carga de Agentes'}
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                        El rebalanceo optimiza la asignación de recursos computacionales por rol para minimizar latencia.
                    </p>
                </div>
                
                <div className="mt-8 text-center">
                    <Link href="/admin/calibration-engine" className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center justify-center">
                        <CpuChipIcon className="h-4 w-4 mr-1" />
                        Ir al Motor de Calibración AURA™ Core →
                    </Link>
                </div>
            </div>
        </div>
    );
}
