// app/dashboard/operational-overview/page.tsx - ACTUALIZADO con Empty States y Error Handling
"use client";

import React, { useState, useEffect } from 'react';
import { TrendIcon } from '@/components/TrendIcon';
import { LanguageSelector } from '@/components/LanguageSelector';
import { EmptyState } from '@/components/EmptyState'; // <-- NUEVO
import { 
    fetchOperationalMetrics, 
    fetchTimeSeriesMetrics, 
    OperationalMetrics, 
    TimeSeriesPoint 
} from '@/services/metrics.service'; 

// ... (Mantener Mock Translation Data, MetricSkeleton, etc.) ...

// --- Componente Principal ---

export default function OperationalOverview() {
    // ... (Mantener estados de currentLang, metrics, timeSeries, isLoading, isChartLoading) ...
    
    // NUEVO ESTADO: Manejo de errores a nivel de la página
    const [isError, setIsError] = useState(false); 
    
    // NUEVO ESTADO: Controla si hay datos, o si debemos mostrar el Empty State
    const [hasData, setHasData] = useState(true); 

    // ... (Mantener la función getTranslation) ...
    
    // Hook para cargar los datos y gestionar los estados
    useEffect(() => {
        // ... (Configuración de Language Loading) ...

        setIsLoading(true);
        setIsChartLoading(true);
        setIsError(false); // Resetear error al intentar cargar

        // --- Carga de KPIs ---
        fetchOperationalMetrics()
            .then(data => {
                setMetrics(data);
                
                // Lógica de Empty State: Si el valor de 'calls' es 0, asumimos 'sin datos'
                // NOTA: Esto debe ajustarse a tu lógica de negocio real.
                const totalCalls = parseInt(data.calls.value.replace(/,/g, ''), 10);
                if (totalCalls === 0) {
                    setHasData(false);
                } else {
                    setHasData(true);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching operational metrics:", error);
                setIsError(true); // Activar estado de error
                setIsLoading(false);
            });
            
        // --- Carga de Series de Tiempo ---
        fetchTimeSeriesMetrics()
            .then(data => {
                setTimeSeries(data);
                setIsChartLoading(false);
            })
            .catch(error => {
                console.error("Error fetching time series metrics:", error);
                setIsChartLoading(false);
                // Si el gráfico falla, no necesariamente falla toda la página.
            });
    }, []); 

    const metricKeys = ['calls', 'conversion', 'satisfaction', 'error'] as const;

    // --- Lógica de Renderizado Central ---

    // 1. Manejo de Errores Global (Bloqueante)
    if (isError) {
        return (
            <div className="space-y-6 p-6">
                 <EmptyState 
                    title="Error de Conexión 🚨"
                    message="No pudimos cargar las métricas operacionales. Revisa la configuración de tu API o inténtalo de nuevo más tarde."
                    ctaText="Recargar Dashboard"
                    onCtaClick={() => window.location.reload()}
                />
            </div>
        );
    }

    // 2. Manejo de Estado Vacío (No Bloqueante)
    if (!hasData && !isLoading) {
        return (
            <div className="space-y-6 p-6">
                <header className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
                    <LanguageSelector /> 
                </header>
                <EmptyState 
                    title="¡Bienvenido! Es hora de configurar."
                    message="Aún no tienes llamadas ni reservas. Conecta tu centralita o activa la automatización de reservas para empezar a ver datos."
                    ctaText="Ir al Centro de Integraciones"
                    onCtaClick={() => alert("Navegar a /settings/integrations-hub")} // Placeholder de navegación
                />
            </div>
        );
    }
    
    // 3. Estado Normal (Carga o Datos)
    return (
        <div className="space-y-6 p-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
                <LanguageSelector /> 
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    // Skeletons de KPI
                    metricKeys.map(key => <MetricSkeleton key={key} />)
                ) : (
                    // Métricas KPI
                    metrics && metricKeys.map((key) => {
                        // ... (Métricas KPI renderizadas - mantener) ...
                    })
                )}
            </div>
            
            {/* Charts Reales */}
            <h2 className="text-2xl font-bold text-gray-900 pt-4">Performance: Last 7 Days</h2>
            <div className="h-96 bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-center">
                {isChartLoading ? (
                    // Skeleton de gráfico
                    <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">
                        Cargando Series de Tiempo...
                    </div>
                ) : (
                    <div className="h-full w-full">
                        {/* ... (Mostrar datos listos para gráfico - mantener) ... */}
                    </div>
                )}
            </div>
        </div>
    );
}
