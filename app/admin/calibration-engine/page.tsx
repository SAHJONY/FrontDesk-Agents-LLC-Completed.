// app/admin/calibration-engine/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    CpuChipIcon, 
    ArrowPathIcon, 
    SparklesIcon, 
    WrenchScrewdriverIcon, 
    ChartBarIcon,
    ArrowUpCircleIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// Mock Data for Calibration Metrics
const mockMetrics = {
    cai: 94.5, // Conversational Accuracy Index (Métrica Clave)
    intentMatchRate: 98.1,
    toneSentimentScore: 4.85, // out of 5.0
    humanEscalationRate: 1.5, // %
    lastCalibration: '2025-12-11 23:45 CST',
};

export default function CalibrationEnginePage() {
    const [sensitivity, setSensitivity] = useState(0.75); // 0.0 to 1.0
    const [fallBackModel, setFallBackModel] = useState('GPT-3.5-Turbo-0125');
    const [isCalibrating, setIsCalibrating] = useState(false);

    const handleRunCalibration = () => {
        setIsCalibrating(true);
        console.log("Iniciando secuencia de Calibración del Modelo AURA™ Core...");
        
        setTimeout(() => {
            // Simulación de mejora del índice CAI
            const newCAI = (mockMetrics.cai * 1.002).toFixed(2);
            alert(`¡Calibración Completa! El Índice de Precisión Conversacional (CAI) ha mejorado de ${mockMetrics.cai}% a ${newCAI}%.`);
            setIsCalibrating(false);
            mockMetrics.cai = parseFloat(newCAI);
            mockMetrics.lastCalibration = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <CpuChipIcon className="h-10 w-10 text-primary-600 mr-3" />
                        AURA™ Core Calibration Engine
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Afinación y optimización del motor de lenguaje conversacional de la IA.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-10">
                    {/* KPI 1: Conversational Accuracy Index (CAI) */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary-500">
                        <div className="flex items-center justify-between">
                            <ChartBarIcon className="h-8 w-8 text-primary-600" />
                            <span className="text-sm font-semibold text-gray-500">Métrica Clave</span>
                        </div>
                        <p className="text-5xl font-extrabold text-gray-900 mt-2">{mockMetrics.cai}%</p>
                        <p className="text-lg font-medium text-gray-600">Índice de Precisión Conversacional (CAI)</p>
                    </div>

                    {/* KPI 2: Escalation Rate */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                            <span className="text-sm font-semibold text-gray-500">Riesgo</span>
                        </div>
                        <p className="text-5xl font-extrabold text-gray-900 mt-2">{mockMetrics.humanEscalationRate}%</p>
                        <p className="text-lg font-medium text-gray-600">Tasa de Escalada Humana</p>
                    </div>
                    
                    {/* KPI 3: Last Calibration */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <ClockIcon className="h-8 w-8 text-green-600" />
                            <span className="text-sm font-semibold text-gray-500">Sincronización</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900 mt-2">{mockMetrics.lastCalibration}</p>
                        <p className="text-lg font-medium text-gray-600">Última Calibración Exitosa</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-premium border border-gray-100 space-y-8">
                    
                    <h2 className="text-2xl font-bold text-gray-900 border-b pb-3 flex items-center">
                        <WrenchScrewdriverIcon className="h-6 w-6 text-primary-600 mr-2" />
                        Ajustes de Afinación (Fine-Tuning Parameters)
                    </h2>

                    {/* 1. Conversational Sensitivity Slider */}
                    <div>
                        <label htmlFor="sensitivity" className="block text-lg font-medium text-gray-700 mb-2">
                            Sensibilidad de Detección de Objeciones
                        </label>
                        <input
                            type="range"
                            id="sensitivity"
                            min="0.0"
                            max="1.0"
                            step="0.05"
                            value={sensitivity}
                            onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>0.0 (Baja - Solo Obvias)</span>
                            <span className="font-bold text-primary-600">{sensitivity.toFixed(2)} (Actual)</span>
                            <span>1.0 (Alta - Detección Temprana)</span>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                            Controla qué tan agresivamente AURA™ reacciona a los cambios sutiles en el tono de voz (Capacidad #12: Análisis de Voz).
                        </p>
                    </div>

                    {/* 2. Fallback Model Selection */}
                    <div>
                        <label htmlFor="fallBackModel" className="block text-lg font-medium text-gray-700 mb-2">
                            Modelo de Reserva para Respuestas de Baja Confianza
                        </label>
                        <select
                            id="fallBackModel"
                            value={fallBackModel}
                            onChange={(e) => setFallBackModel(e.target.value)}
                            className="input-premium"
                        >
                            <option value="AURA-CORE-LATEST">AURA™ Core - Última Versión (Recomendado)</option>
                            <option value="GPT-4-Turbo-2024">GPT-4 Turbo (Reserva de Alta Capacidad)</option>
                            <option value="GPT-3.5-Turbo-0125">GPT-3.5-Turbo (Reserva de Bajo Costo)</option>
                        </select>
                        <p className="mt-2 text-xs text-gray-500">
                            El modelo de IA que toma el control si el motor **AURA™ Core** principal reporta un Índice de Confianza bajo durante una interacción.
                        </p>
                    </div>
                    
                    {/* Botón de Ejecución de Calibración */}
                    <button
                        onClick={handleRunCalibration}
                        disabled={isCalibrating}
                        className={`btn-primary-premium w-full py-3 bg-indigo-600 hover:bg-indigo-700 ${isCalibrating ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        <ArrowPathIcon className="h-5 w-5 inline-block mr-2" />
                        {isCalibrating ? 'Recalibrando AURA™ Core (3s)' : 'Ejecutar Recalibración del Modelo'}
                    </button>
                </div>
                
                <div className="mt-8 flex justify-between">
                    <Link href="/client/call-log" className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center">
                        <ChartBarIcon className="h-4 w-4 mr-1" />
                        Ver Datos de Entrenamiento (Call Log) →
                    </Link>
                    <Link href="/admin/feature-management" className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center">
                        <SparklesIcon className="h-4 w-4 mr-1" />
                        Gestionar Capacidades de Enterprise →
                    </Link>
                </div>
            </div>
        </div>
    );
}
