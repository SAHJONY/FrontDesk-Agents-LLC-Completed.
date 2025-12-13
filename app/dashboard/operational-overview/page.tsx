// app/dashboard/operational-overview/page.tsx - ACTUALIZADO con Data de Gráficos
"use client";

import React, { useState, useEffect } from 'react';
// Importamos la nueva función y tipo de datos
import { 
    fetchOperationalMetrics, 
    fetchTimeSeriesMetrics, // <-- NUEVO
    OperationalMetrics, 
    TimeSeriesPoint // <-- NUEVO
} from '@/services/metrics.service'; 
// ... (Importaciones de TrendIcon, LanguageSelector, etc.)

// ... (Mantener Mock Translation Data y funciones getTranslation/getMetricLabel) ...

// ... (Mantener MetricSkeleton) ...


// --- Componente Principal ---

export default function OperationalOverview() {
    // ... (Mantener estados de currentLang, metrics, isLoading) ...
    
    // NUEVO ESTADO: Para los datos de series de tiempo
    const [timeSeries, setTimeSeries] = useState<TimeSeriesPoint[]>([]); 
    // NUEVO ESTADO: Para manejar la carga del gráfico por separado
    const [isChartLoading, setIsChartLoading] = useState(true); 

    // ... (Mantener useEffect para Language Loading) ...

    // Hook para cargar los datos SIMULTÁNEAMENTE
    useEffect(() => {
        setIsLoading(true);
        setIsChartLoading(true);

        // Cargar KPIs (tarjetas)
        fetchOperationalMetrics()
            .then(data => {
                setMetrics(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching operational metrics:", error);
                setIsLoading(false);
            });
            
        // Cargar Series de Tiempo (gráficos)
        fetchTimeSeriesMetrics()
            .then(data => {
                setTimeSeries(data);
                setIsChartLoading(false);
            })
            .catch(error => {
                console.error("Error fetching time series metrics:", error);
                setIsChartLoading(false);
            });
    }, []); 

    const metricKeys = ['calls', 'conversion', 'satisfaction', 'error'] as const;

    return (
        <div className="space-y-6 p-6">
            {/* ... (Header y Métricas KPI - mantener el código anterior) ... */}
            
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
                <LanguageSelector /> 
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    metricKeys.map(key => <MetricSkeleton key={key} />)
                ) : (
                    // ... (Métricas KPI renderizadas) ...
                )}
            </div>
            
            {/* NUEVA SECCIÓN: Charts Reales */}
            <h2 className="text-2xl font-bold text-gray-900 pt-4">Performance: Last 7 Days</h2>
            <div className="h-96 bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-center">
                {isChartLoading ? (
                    // Skeleton de gráfico grande
                    <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">
                        Cargando Series de Tiempo...
                    </div>
                ) : (
                    <div className="h-full w-full">
                        <p className="text-sm font-semibold mb-2">Datos listos para la librería de Gráficos</p>
                        <div className="bg-gray-50 p-4 rounded-md h-[80%] overflow-auto text-xs font-mono">
                            {/* Muestra los datos que usaría el gráfico */}
                            {timeSeries.map((point, index) => (
                                <pre key={index}>
                                    {`{ timeLabel: '${point.timeLabel}', callsHandled: ${point.callsHandled}, bookingsMade: ${point.bookingsMade} }`}
                                </pre>
                            ))}
                        </div>
                        <p className="text-sm mt-2 text-green-600 font-medium">✅ Data Layer listo para renderizar Chart</p>
                    </div>
                )}
            </div>
        </div>
    );
}
