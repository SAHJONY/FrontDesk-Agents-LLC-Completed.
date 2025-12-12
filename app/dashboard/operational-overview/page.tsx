// app/dashboard/operational-overview/page.tsx - ULTRA PREMIUM VERSION (LOCALIZATION/i18n UPDATE)
"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'; // Importar Hooks
import { 
    // ... (existing imports) ...
    BanknotesIcon, 
    UsersIcon,
    PhoneIcon,
    ChartBarIcon,
    // ... (rest of imports) ...
    GlobeAltIcon, // Necesario para el selector si se mueve aquí
    ClockIcon,
} from '@heroicons/react/24/outline';

// NEW IMPORTS
import { getTranslation } from '@/lib/i18n/languages'; // Importamos el diccionario
import { LanguageSelector } from '@/components/LanguageSelector'; // Importamos el selector

// --- Simulated User Settings ---
const USER_CURRENCY = 'MXN'; 
const USER_LOCALE = 'es-MX'; 
const USER_TIMEZONE = 'America/Mexico_City'; 
// -----------------------------

// Utility function to format currency based on dynamic settings
const formatCurrency = (amount) => {
    const numericAmount = amount * 1000; 
    return new Intl.NumberFormat(USER_LOCALE, { 
        style: 'currency', 
        currency: USER_CURRENCY, 
        minimumFractionDigits: 0 
    }).format(numericAmount / 1000) + 'K';
};

// Utility function to format time using the user's timezone
const formatLocalTime = (date, lang) => {
    // Usamos el idioma del usuario para la localización de la hora también
    return new Date(date).toLocaleTimeString(lang === 'es' ? USER_LOCALE : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: USER_TIMEZONE,
    });
};

export default function OperationalOverviewPage() {
    const [currentLang, setCurrentLang] = useState('en'); // Estado del idioma

    // NEW: Hook para actualizar el idioma al cambiarlo en el selector
    useEffect(() => {
        const updateLang = () => {
            setCurrentLang(localStorage.getItem('appLang') || 'en');
        };
        updateLang(); // Cargar el idioma inicial
        window.addEventListener('languageChange', updateLang);
        return () => window.removeEventListener('languageChange', updateLang);
    }, []);

    const t = (key) => getTranslation(key, currentLang); // Helper de traducción

    // Real-time KPIs with trend data - USANDO t()
    const kpis = [
      { 
        label: t('kpi_calls'), 
        value: '24', 
        change: '+12%', 
        trend: 'up',
        icon: PhoneIcon, 
        color: 'blue',
        subtitle: t('currency_context'), // Ejemplo de uso
        sparkline: [12, 15, 18, 22, 24]
      },
      { 
        label: t('kpi_accuracy'), 
        value: '98.5%', 
        change: '+2.3%', 
        trend: 'up',
        icon: SparklesIcon, 
        color: 'green',
        subtitle: 'last 100 calls',
        sparkline: [95, 96, 97, 98, 98.5]
      },
      { 
        label: t('kpi_response'), 
        value: '1.2s', 
        change: '-0.3s', 
        trend: 'down',
        icon: BoltIcon, 
        color: 'purple',
        subtitle: 'average',
        sparkline: [1.8, 1.6, 1.4, 1.3, 1.2]
      },
      { 
        label: t('kpi_revenue'), // TRADUCIDO
        value: formatCurrency(45.2), 
        change: '+18%', 
        trend: 'up',
        icon: BanknotesIcon, 
        color: 'emerald',
        subtitle: `${t('currency_context')} (${USER_CURRENCY})`, // TRADUCIDO
        sparkline: [38, 40, 42, 43, 45.2]
      },
    ];

    // ... (rest of mock data remains the same) ...

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        
        {/* Premium Header with Glassmorphism */}
        {/* ... (existing background/z-0 divs) ... */}

        <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex items-start justify-between mb-8"> {/* Adjusted alignment */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <ChartBarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                      {t('welcome_message')} {/* TRADUCIDO */}
                    </h1>
                  </div>
                </div>
                <p className="text-gray-600 text-lg">{t('subtitle')}</p> {/* TRADUCIDO */}
              </div>
              
              {/* Language Selector and Live Status Badge - NEW FLEX CONTAINER */}
              <div className="flex flex-col items-end gap-3">
                <LanguageSelector /> {/* NUEVO COMPONENTE */}
                
                <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                  <div className="relative">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping"></div>
                  </div>
                  <span className="text-sm font-bold text-white">{t('status_operational')}</span> {/* TRADUCIDO */}
                </div>
                <div className="text-sm text-gray-500">
                  {t('last_update')}: **{formatLocalTime(new Date(), currentLang)}** ({USER_TIMEZONE}) {/* TRADUCIDO */}
                </div>
              </div>
            </div>

            {/* Mini Stats Bar */}
            {/* ... (remains the same, but should ideally use t() for labels) ... */}

          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Premium KPI Cards with Sparklines */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi, index) => (
              // ... (KPI card structure remains the same) ...
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative p-6">
                  {/* ... (icon and change badge) ... */}
                  <div className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                  <div className="text-sm text-gray-600 mb-4">{kpi.label}</div> {/* USANDO t() */}
                  <div className="text-xs text-gray-500">{kpi.subtitle}</div> {/* USANDO t() */}

                  {/* ... (sparkline) ... */}
                </div>
              </div>
            ))}
          </div>

          {/* Management Centers - Ultra Premium Cards */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">{t('mgmt_centers')}</h2> {/* TRADUCIDO */}
              <Link href="/settings" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                {t('view_all')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* ... (rest of component, applying t() helper to labels for full internationalization) ... */}
            
          </div>
          {/* ... (System Health and Activity Stream sections also require t()) ... */}
        </div>
      </div>
    );
}
