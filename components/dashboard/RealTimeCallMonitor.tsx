"use client";

import React, { useState } from 'react';
import { PhoneIcon, SpeakerWaveIcon, HandRaisedIcon, UserIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// --- Tipos de Datos ---
interface LiveCall {
    id: number;
    tenantId: string;
    agent: 'SARA' | 'ALEX';
    duration: number; // in seconds
    customerNumber: string;
    interventionScore: number; // 0-100
    status: 'Active' | 'Escalating' | 'Whisper Mode';
    transcriptSegment: string;
}

// --- Data de Simulación (Llamadas Activas) ---
const mockLiveCalls: LiveCall[] = [
    {
        id: 101,
        tenantId: 'ABC-789',
        agent: 'SARA',
        duration: 95,
        customerNumber: '+1 (555) 123-4567',
        interventionScore: 88,
        status: 'Escalating',
        transcriptSegment: "Customer: I need to speak to someone right now, I have an issue with the policy terms! SARA: I understand your frustration, let me check the transfer protocols.",
    },
    {
        id: 102,
        tenantId: 'XYZ-123',
        agent: 'ALEX',
        duration: 210,
        customerNumber: '+1 (555) 987-6543',
        interventionScore: 35,
        status: 'Active',
        transcriptSegment: "ALEX: I've successfully processed the address change. Is there anything else I can help you with today? Customer: No, that's perfect, thank you.",
    },
];

// --- Componente de Fila de Llamada ---
const CallRow: React.FC<{ call: LiveCall }> = ({ call }) => {
    
    // Función de manejo de acciones (simulación de llamada a API)
    const handleAction = (action: 'listen' | 'whisper' | 'takeover') => {
        console.log(`[ACTION] ${action.toUpperCase()} activated for Call ID ${call.id}`);
        // Aquí se integraría la llamada a la API de telefonía
    };

    const scoreColor = call.interventionScore > 80 ? 'bg-red-500' : call.interventionScore > 60 ? 'bg-yellow-500' : 'bg-green-500';

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:border-primary-500/50 transition duration-150 mb-4">
            <div className="flex justify-between items-start">
                {/* Info de la Llamada */}
                <div className="flex items-center space-x-4">
                    <PhoneIcon className="h-6 w-6 text-primary-400 flex-shrink-0" />
                    <div>
                        <p className="text-lg font-bold text-white">
                            {call.customerNumber} <span className="text-sm font-normal text-gray-400">({call.tenantId})</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            Agent: <span className={`font-semibold ${call.agent === 'SARA' ? 'text-cyan-400' : 'text-purple-400'}`}>{call.agent}</span> | Duration: {Math.floor(call.duration / 60)}m {call.duration % 60}s
                        </p>
                    </div>
                </div>

                {/* Puntuación de Intervención (Riesgo) */}
                <div className="text-right">
                    <p className="text-xs font-semibold uppercase text-gray-400">Intervention Score</p>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-3 py-1 text-sm font-extrabold text-white rounded-full ${scoreColor}`}>
                            {call.interventionScore}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Transcripción y Acciones */}
            <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-sm text-gray-300 italic mb-2">
                    Latest Transcript: <span className="text-gray-400">"{call.transcriptSegment}..."</span>
                </p>
                
                {/* Botones de Intervención */}
                <div className="flex space-x-3 mt-3">
                    <button 
                        onClick={() => handleAction('listen')} 
                        className="flex items-center px-3 py-1 text-sm rounded-md bg-gray-700 text-white hover:bg-gray-600 transition"
                        title="Listen Only"
                    >
                        <SpeakerWaveIcon className="h-4 w-4 mr-1" /> Listen
                    </button>
                    <button 
                        onClick={() => handleAction('whisper')} 
                        className="flex items-center px-3 py-1 text-sm rounded-md bg-cyan-800 text-white hover:bg-cyan-700 transition"
                        title="Whisper Advice to AI Agent"
                    >
                        <UserIcon className="h-4 w-4 mr-1" /> Whisper
                    </button>
                    {call.interventionScore > 80 && (
                        <button 
                            onClick={() => handleAction('takeover')} 
                            className="flex items-center px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-500 transition font-semibold"
                            title="Take control from the AI Agent"
                        >
                            <HandRaisedIcon className="h-4 w-4 mr-1" /> Takeover
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Componente Principal ---
export default function RealTimeCallMonitor() {
    const [calls, setCalls] = useState<LiveCall[]>(mockLiveCalls);
    const totalActiveCalls = calls.length;
    const callsEscalating = calls.filter(c => c.status === 'Escalating').length;

    // Simulación de recarga de datos
    const handleRefresh = () => {
        console.log("Refreshing live call data...");
        // En una app real, esto dispararía una nueva conexión WebSocket o una petición de REST
    };

    return (
        <div className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto pt-10 pb-12">
                
                {/* Header y Filtros */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            Monitoreo de Llamadas (Live Ops)
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Supervisión en tiempo real de agentes SARA y ALEX.
                        </p>
                    </div>
                    <button 
                        onClick={handleRefresh}
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-primary-600 text-white hover:bg-primary-500 transition"
                    >
                        <ArrowPathIcon className="h-5 w-5 mr-2" /> Refresh Data
                    </button>
                </div>
                
                {/* Métricas Resumen */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-primary-500">
                        <p className="text-sm font-medium text-gray-400">Total Llamadas Activas</p>
                        <p className="text-3xl font-bold text-white mt-1">{totalActiveCalls}</p>
                    </div>
                    <div className="bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-yellow-500">
                        <p className="text-sm font-medium text-gray-400">En Modo Whisper</p>
                        <p className="text-3xl font-bold text-white mt-1">0</p>
                    </div>
                    <div className="bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-red-500">
                        <p className="text-sm font-medium text-gray-400">Llamadas Escalando (Riesgo)</p>
                        <p className="text-3xl font-bold text-white mt-1">{callsEscalating}</p>
                    </div>
                </div>

                {/* Lista de Llamadas */}
                <h2 className="text-2xl font-bold text-white mb-4">Live Call Streams</h2>
                <div className="space-y-4">
                    {calls.map(call => (
                        <CallRow key={call.id} call={call} />
                    ))}
                    {calls.length === 0 && (
                        <p className="text-gray-500 italic text-center py-10">No active calls detected at this time.</p>
                    )}
                </div>

            </div>
        </div>
    );
}
  
