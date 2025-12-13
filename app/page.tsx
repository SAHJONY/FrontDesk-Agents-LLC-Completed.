// app/dashboard/operational-overview/page.tsx
"use client"; 

import React, { useState, useEffect } from 'react';
import { ChartBarSquareIcon, WifiIcon, ClockIcon as ClockIconOutline } from '@heroicons/react/24/outline';

const OperationalOverviewPage = () => {
    // FIX: Se usa useState y useEffect para manejar APIs del navegador de forma segura
    const [status, setStatus] = useState('Checking...');
    
    useEffect(() => {
        // El acceso a localStorage se hace dentro de useEffect (Cliente)
        if (typeof window !== 'undefined') {
            // Se asume que aquí se cargan las preferencias de un localStorage
            const systemStatus = localStorage.getItem('system_status') || 'Operational';
            setStatus(systemStatus);
        }
    }, []);

    // Simulación de datos operacionales
    const metrics = [
        { name: 'SLA Uptime', value: '99.98%', unit: 'last 30 days', color: 'green' },
        { name: 'Average Latency', value: '320ms', unit: 'real-time', color: 'yellow' },
        { name: 'Agent Queue', value: '0', unit: 'calls waiting', color: 'green' },
        { name: 'RL Optimization Run', value: '2 hours ago', unit: 'last run', color: 'blue' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <ChartBarSquareIcon className="h-10 w-10 text-indigo-600 mr-3" />
                        Operational Overview
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Real-time status of AURA™ Core and Agentic Workforce health.
                    </p>
                </div>

                {/* System Status Banner */}
                <div className={`p-4 mb-8 text-center rounded-xl font-bold shadow-md ${
                    status === 'Operational' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'
                }`}>
                    <WifiIcon className="h-6 w-6 inline-block mr-2" />
                    System Status: **{status}**
                </div>

                {/* Metrics Grid */}
                <div className="grid md:grid-cols-4 gap-6">
                    {metrics.map((metric) => (
                        <div key={metric.name} className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                            <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{metric.value}</p>
                            <p className={`mt-1 text-sm ${
                                metric.color === 'green' ? 'text-green-600' : metric.color === 'yellow' ? 'text-yellow-600' : 'text-indigo-600'
                            }`}>{metric.unit}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Telephony & Gateway Health</h2>
                    <p className="text-gray-600">Detailed logs and latency graphs for voice trunks and SIP gateway connections are available here...</p>
                    <div className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">
                        View Detailed Gateway Diagnostics →
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OperationalOverviewPage;
