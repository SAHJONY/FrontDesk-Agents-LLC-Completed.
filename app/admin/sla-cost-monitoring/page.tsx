// app/admin/sla-cost-monitoring/page.tsx
"use client";

import React, { useState } from 'react';
// FIX APPLIED HERE: Link must be imported for Next.js routing components
import Link from 'next/link'; 

import { 
    ClockIcon, 
    BanknotesIcon, 
    ScaleIcon, 
    ChartBarIcon, 
    ArrowTrendingUpIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const slaMetrics = {
    uptime: 99.98,
    responseTime: 0.85, // seconds
    escalationRateGoal: 2.0, // %
    actualEscalationRate: 1.5, // %
    slaCommitment: 99.9, // Contractual uptime
};

const costMetrics = {
    aiMinutesUsed: 15450,
    costPerMinute: 0.05, // USD
    transactionFee: 0.02, // USD per successful payment
    successfulPayments: 2150,
    totalAiCost: (15450 * 0.05).toFixed(2), // 772.50
    totalTransactionCost: (2150 * 0.02).toFixed(2), // 43.00
    totalMonthlyCost: (772.50 + 43.00).toFixed(2), // 815.50
};

const MetricCard = ({ icon: Icon, title, value, unit, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-200">
        <div className="flex items-center gap-3">
            <Icon className={`h-8 w-8 text-${color}-600`} />
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-extrabold text-gray-900">{value}
                    <span className="text-xl font-normal text-gray-500 ml-1">{unit}</span>
                </p>
            </div>
        </div>
    </div>
);

export default function SLACostMonitoringPage() {
    const isSLACompliant = slaMetrics.uptime >= slaMetrics.slaCommitment;

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <ScaleIcon className="h-10 w-10 text-primary-600 mr-3" />
                        AURA™ SLA & Cost Monitoring
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Transparencia de costos de uso y rendimiento contractual (SLA).
                    </p>
                </div>

                {/* SLA Compliance Status */}
                <div className={`p-6 rounded-2xl mb-10 shadow-2xl ${isSLACompliant ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'} border-l-4`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {isSLACompliant ? (
                                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                            ) : (
                                <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                            )}
                            <div>
                                <p className="text-xl font-bold text-gray-900">
                                    {isSLACompliant ? 'Cumplimiento de SLA: ACTIVO' : 'ALERTA: Incumplimiento de SLA'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Compromiso de Uptime Contratual: **{slaMetrics.slaCommitment}%**
                                </p>
                            </div>
                        </div>
                        <span className="text-2xl font-extrabold text-gray-900">
                            {slaMetrics.uptime}%
                        </span>
                    </div>
                </div>

                {/* SLA Performance Metrics */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    <MetricCard icon={ClockIcon} title="Uptime Mensual (Actual)" value={slaMetrics.uptime} unit="%" color="blue" />
                    <MetricCard icon={ArrowTrendingUpIcon} title="Tiempo de Respuesta Promedio" value={slaMetrics.responseTime} unit="s" color="purple" />
                    <MetricCard icon={ChartBarIcon} title="Tasa de Escalada Humana" value={slaMetrics.actualEscalationRate} unit="%" color="red" />
                </div>

                {/* Usage Cost Breakdown */}
                <div className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 border-b pb-3 flex items-center mb-6">
                        <BanknotesIcon className="h-6 w-6 text-primary-600 mr-2" />
                        Desglose de Costos de Uso (Este Mes)
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* AI Minutes Cost */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900">Uso de Agentes de IA</h3>
                            <p className="text-sm text-gray-600">Minutos totales consumidos por **AURA™ Core**.</p>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">${costMetrics.totalAiCost}</p>
                            <p className="text-xs text-gray-500 mt-1">{costMetrics.aiMinutesUsed.toLocaleString()} min. @ ${costMetrics.costPerMinute}/min.</p>
                        </div>
                        
                        {/* Transaction Cost */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900">Costo de Transacciones</h3>
                            <p className="text-sm text-gray-600">Tarifas por pagos procesados (Capacidad #4).</p>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">${costMetrics.totalTransactionCost}</p>
                            <p className="text-xs text-gray-500 mt-1">{costMetrics.successfulPayments.toLocaleString()} pagos @ ${costMetrics.transactionFee}/pago.</p>
                        </div>
                    </div>
                    
                    {/* Total Cost */}
                    <div className="mt-6 p-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-extrabold text-gray-900">Costo Total de Uso Mensual:</h3>
                            <p className="text-4xl font-extrabold text-primary-600">${costMetrics.totalMonthlyCost}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    {/* Line 129 is now fixed with the import above */}
                    <Link href="/settings/subscription" className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center justify-center">
                        <BanknotesIcon className="h-4 w-4 mr-1" />
                        Gestionar el Plan de Suscripción y Límites de Gasto →
                    </Link>
                </div>
            </div>
        </div>
    );
                    }
