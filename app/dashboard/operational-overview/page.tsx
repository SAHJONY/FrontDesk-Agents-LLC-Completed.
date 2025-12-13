// app/dashboard/operational-overview/page.tsx - ACTUALIZADO CON DATA SIMULADA
"use client";

import React, { useState, useEffect } from 'react';
import { TrendIcon } from '@/components/TrendIcon';
import { LanguageSelector } from '@/components/LanguageSelector';
// Importamos el servicio de datos simulado
import { fetchOperationalMetrics, OperationalMetrics } from '@/services/metrics.service'; 

// --- Mocks y Utilidades (mantener) ---

// Mock Translation Data 
const translations = {
    en: {
        title: "Operational Overview",
        metrics: {
            calls: "Calls Handled",
            conversion: "Conversion Rate",
            satisfaction: "Customer Satisfaction",
            error: "Error Rate"
        }
    },
    es: {
        title: "Resumen Operacional",
        metrics: {
            calls: "Llamadas Atendidas",
            conversion: "Tasa de Conversión",
            satisfaction: "Satisfacción del Cliente",
            error: "Tasa de Error"
        }
    }
};

const getTranslation = (lang) => translations[lang] || translations.en;

// Función para obtener la traducción de una métrica específica
const getMetricLabel = (t, key) => t.metrics[key] || key;

// Definición de un Skeleton Card simple
const MetricSkeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-1/2"></div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
);

// --- Componente Principal ---

export default function OperationalOverview() {
    const [currentLang, setCurrentLang] = useState('en');
    // Estado para almacenar los datos reales (o simulados)
    const [metrics, setMetrics] = useState<OperationalMetrics | null>(null);
    // Nuevo estado de carga para los skeletons
    const [isLoading, setIsLoading] = useState(true); 
    
    const t = getTranslation(currentLang);

    // CRITICAL FIX (Language Loading)
    useEffect(() => {
        const updateLang = () => {
            if (typeof window !== 'undefined' && window.localStorage) {
                setCurrentLang(localStorage.getItem('appLang') || 'en');
            }
        };

        if (typeof window !== 'undefined') {
            updateLang();
            window.addEventListener('languageChange', updateLang);
            return () => window.removeEventListener('languageChange', updateLang);
        }
    }, []);

    // NUEVO: Hook para cargar los datos simulados
    useEffect(() => {
        setIsLoading(true);
        fetchOperationalMetrics()
            .then(data => {
                setMetrics(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching metrics:", error);
                // Aquí podrías establecer un estado de error
                setIsLoading(false);
            });
    }, []); // Se ejecuta una sola vez al montar

    // Convertir el objeto de métricas en un array iterable para el renderizado
    const metricKeys = ['calls', 'conversion', 'satisfaction', 'error'] as const;

    return (
        <div className="space-y-6 p-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
                <LanguageSelector /> 
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    // Muestra 4 skeletons mientras carga
                    metricKeys.map(key => <MetricSkeleton key={key} />)
                ) : (
                    // Muestra las métricas una vez cargadas
                    metrics && metricKeys.map((key) => {
                        const metric = metrics[key];
                        const label = getMetricLabel(t, key);
                        
                        return (
                            <div key={key} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                <p className="text-sm font-medium text-gray-500">{label}</p>
                                <div className="mt-1 flex justify-between items-center">
                                    <span className="text-4xl font-extrabold text-gray-900">
                                        {metric.value}
                                    </span>
                                    <TrendIcon 
                                        trend={metric.trend} 
                                        unit={metric.unit} 
                                        direction={metric.direction} 
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            
            {/* Placeholder para Charts (ahora es más creíble porque espera datos) */}
            <div className="h-96 bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center justify-center text-gray-400">
                {isLoading ? (
                    <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">Cargando Gráficos...</div>
                ) : (
                    `[Placeholder para Charts - Data ya cargada con ${metrics?.calls.value} llamadas]`
                )}
            </div>
        </div>
    );
}
