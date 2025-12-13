// app/dashboard/operational-overview/page.tsx
"use client"; // CRITICAL: This page uses client-side hooks (useState, useEffect)

import React, { useState, useEffect } from 'react';
import { TrendIcon } from '@/components/TrendIcon'; // Assuming this component is client-safe
import { LanguageSelector } from '@/components/LanguageSelector'; // Ensure this file is updated as well

// Mock Translation Data (used as a simple example)
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

export default function OperationalOverview() {
    // FIX: Initialize state to a safe default ('en'). 
    // This avoids crashing on the server during the initial render.
    const [currentLang, setCurrentLang] = useState('en');
    const t = getTranslation(currentLang);

    // CRITICAL FIX: Use useEffect to safely load the language from localStorage 
    // only when running in the browser.
    useEffect(() => {
        const updateLang = () => {
            // CRITICAL CHECK: Ensure window and localStorage exist before access
            if (typeof window !== 'undefined' && window.localStorage) {
                setCurrentLang(localStorage.getItem('appLang') || 'en');
            }
        };

        // We only try to set up the listener if we are in the browser
        if (typeof window !== 'undefined') {
            updateLang(); 
            window.addEventListener('languageChange', updateLang);
            return () => window.removeEventListener('languageChange', updateLang);
        }
    }, []);

    // Mock data for the dashboard metrics
    const mockMetrics = [
        { label: t.metrics.calls, value: "1,200", trend: 5, unit: "+", direction: 'up' },
        { label: t.metrics.conversion, value: "15.2%", trend: 1.2, unit: "%", direction: 'up' },
        { label: t.metrics.satisfaction, value: "95%", trend: -0.5, unit: "%", direction: 'down' },
        { label: t.metrics.error, value: "0.8%", trend: -0.1, unit: "%", direction: 'up' }
    ];

    return (
        <div className="space-y-6 p-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
                {/* Ensure LanguageSelector.tsx is also updated with its FIX */}
                <LanguageSelector /> 
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockMetrics.map((metric, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                        <div className="mt-1 flex justify-between items-center">
                            <span className="text-4xl font-extrabold text-gray-900">
                                {metric.value}
                            </span>
                            {/* Assuming TrendIcon is a client component or pure utility */}
                            <TrendIcon 
                                trend={metric.trend} 
                                unit={metric.unit} 
                                direction={metric.direction} 
                            />
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Add more dashboard content here (charts, tables, etc.) */}
            <div className="h-96 bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center justify-center text-gray-400">
                [Placeholder for Operational Dashboard Charts]
            </div>
        </div>
    );
}
