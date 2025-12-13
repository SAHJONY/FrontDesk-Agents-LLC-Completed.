"use client";

import React, { useState } from 'react';
import { ChartBarSquareIcon, CurrencyDollarIcon, PresentationChartLineIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// --- Tipos de Datos ---
interface Metric {
    title: string;
    value: string;
    change: string; // Ej: "+5.2% MoM"
    icon: React.ElementType;
    color: string;
}

// --- Data de Simulación ---
const mockMetrics: Metric[] = [
    {
        title: 'AI Close Rate',
        value: '78.5%',
        change: '+5.2% MoM',
        icon: CheckCircleIcon,
        color: 'text-green-400',
    },
    {
        title: 'Total Value Handled',
        value: '$4.1M',
        change: '+12.8% MoM',
        icon: CurrencyDollarIcon,
        color: 'text-primary-400',
    },
    {
        title: 'Cost Avoidance (Monthly)',
        value: '$155K',
        change: '+2.1% MoM',
        icon: ChartBarSquareIcon,
        color: 'text-cyan-400',
    },
    {
        title: 'Avg. LQS (Lead Quality Score)',
        value: '91/100',
        change: 'Stable',
        icon: PresentationChartLineIcon,
        color: 'text-yellow-400',
    },
];

// Datos de simulación para gráficos
const mockChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    closeRate: [65, 68, 72, 75, 78, 78.5],
    costAvoidance: [130, 135, 140, 148, 152, 155], // en miles
};


// --- Componente de Tarjeta de Métrica (KPI) ---
const MetricCard: React.FC<{ metric: Metric }> = ({ metric }) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-gray-700 hover:border-primary-500/50 transition duration-150">
        <div className="flex items-center">
            <metric.icon className={`h-6 w-6 mr-3 ${metric.color}`} />
            <p className="text-sm font-medium text-gray-400">{metric.title}</p>
        </div>
        <p className="text-4xl font-extrabold text-white mt-3">{metric.value}</p>
        <p className={`text-sm font-semibold mt-1 ${metric.change.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
            {metric.change}
        </p>
    </div>
);

// --- Componente Simulado de Gráfico (Placeholder) ---
const ChartPlaceholder: React.FC<{ title: string; dataKey: string }> = ({ title, dataKey }) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg h-96">
        <h3 className="text-xl font-bold text-white mb-4">{title} Trend</h3>
        <div className="flex items-center justify-center h-5/6 text-gray-500 italic">
            {/* Aquí iría un componente real de gráfico (ej. <LineChart data={...} />) */}
            <p>[Placeholder para Gráfico de {dataKey}]</p>
        </div>
        <p className="text-xs text-gray-500 mt-2">Data Points: {mockChartData.labels.join(', ')}</p>
    </div>
);


// --- Componente Principal ---
export default function RevenueAnalyticsDashboard() {
    const [dateRange, setDateRange] = useState('Last 6 Months');

    return (
        <div className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto pt-10 pb-12">
                
                {/* Header y Filtros */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            Revenue Analytics & Forecasting
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Quantifying the ROI and financial impact of AI agents.
                        </p>
                    </div>
                    
                    {/* Selector de Rango de Fechas */}
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm py-2 px-4 focus:ring-primary-500 focus:border-primary-500"
                    >
                        <option value="Last 30 Days">Last 30 Days</option>
                        <option value="Last 6 Months">Last 6 Months</option>
                        <option value="YTD">Year to Date (YTD)</option>
                        <option value="Custom">Custom Range</option>
                    </select>
                </div>
                
                {/* Tarjetas de Métricas (KPIs) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {mockMetrics.map((metric) => (
                        <MetricCard key={metric.title} metric={metric} />
                    ))}
                </div>

                {/* Sección de Gráficos y Tendencias */}
                <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                    Performance Trends ({dateRange})
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Gráfico 1: AI Close Rate */}
                    <ChartPlaceholder 
                        title="AI Close Rate by Month" 
                        dataKey="Close Rate" 
                    />

                    {/* Gráfico 2: Cost Avoidance */}
                    <ChartPlaceholder 
                        title="Cost Avoidance (Monthly)" 
                        dataKey="Cost Avoidance" 
                    />

                    {/* Tabla de Desglose de Leads */}
                    <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold text-white mb-4">Lead Quality Score (LQS) Distribution</h3>
                        <p className="text-gray-400">
                            Shows how the AI rates inbound leads before human escalation. High LQS (90+) indicates valuable, pre-qualified leads.
                        </p>
                        <div className="h-40 flex items-center justify-center text-gray-500 italic mt-4">
                            [Placeholder para Histograma de LQS]
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
