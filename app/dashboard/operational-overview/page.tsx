// app/dashboard/operational-overview/page.tsx - ULTRA PREMIUM VERSION (LOCALIZATION/i18n UPDATE)
"use client";

import Image from 'next/image';  
import Link from 'next/link';
import React, { useState, useEffect } from 'react'; // Importar Hooks
import { 
    // Existing Imports
    BanknotesIcon, 
    UsersIcon,
    PhoneIcon,
    ChartBarIcon,
    GlobeAltIcon,
    ClockIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    Cog6ToothIcon,
    // FIX APPLIED HERE: Corrected typo from DocumentChartIcon to DocumentChartBarIcon
    DocumentChartBarIcon, 
    ShieldCheckIcon,
    MagnifyingGlassIcon,
    SignalIcon,
    
    // Missing Icons added in previous step
    SparklesIcon, 
    BoltIcon,
} from '@heroicons/react/24/outline';

// NEW IMPORTS
// NOTE: These are assumed to exist in the project for the component to function
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

// Mock data for the sparkline component (Assuming a simple line component exists)
const Sparkline = ({ data, color }) => {
    // This is a mock component and just returns a placeholder div
    return (
        <div className={`h-8 w-full bg-${color}-100 rounded-lg flex items-center justify-center text-xs text-gray-500`}>
            Sparkline Chart
        </div>
    );
};

// Mock data for the mini stats bar
const miniStats = [
    { label: 'Agents Online', value: 145, icon: UsersIcon, color: 'text-blue-500' },
    { label: 'Active Deployments', value: 8, icon: GlobeAltIcon, color: 'text-purple-500' },
    { label: 'System Health', value: '99.9%', icon: ShieldCheckIcon, color: 'text-green-500' },
    { label: 'Avg. Script Time', value: '0.4s', icon: ClockIcon, color: 'text-yellow-500' },
];

export default function OperationalOverviewPage() {
    const [currentLang, setCurrentLang] = useState('en'); // Estado del idioma

    // NEW: Hook para actualizar el idioma al cambiarlo en el selector
    useEffect(() => {
        const updateLang = () => {
            // **CRITICAL FIX**: Check if window/localStorage is defined before accessing (Prevents Vercel pre-rendering crash)
            if (typeof window !== 'undefined' && window.localStorage) {
                setCurrentLang(localStorage.getItem('appLang') || 'en');
            } else {
                setCurrentLang('en'); // Default to 'en' during server rendering
            }
        };
        
        // We only try to set up the listener if we are in the browser
        if (typeof window !== 'undefined') {
            updateLang(); // Cargar el idioma inicial
            window.addEventListener('languageChange', updateLang);
            return () => window.removeEventListener('languageChange', updateLang);
        }
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
        subtitle: t('currency_context'), 
        sparkline: [12, 15, 18, 22, 24]
      },
      { 
        label: t('kpi_accuracy'), 
        value: '98.5%', 
        change: '+2.3%', 
        trend: 'up',
        icon: SparklesIcon, 
        color: 'green',
        subtitle: t('kpi_accuracy_subtitle'), 
        sparkline: [95, 96, 97, 98, 98.5]
      },
      { 
        label: t('kpi_response'), 
        value: '1.2s', 
        change: '-0.3s', 
        trend: 'down',
        icon: BoltIcon, 
        color: 'purple',
        subtitle: t('kpi_response_subtitle'), 
        sparkline: [1.8, 1.6, 1.4, 1.3, 1.2]
      },
      { 
        label: t('kpi_revenue'), // TRADUCIDO
        value: formatCurrency(45.2), 
        change: '+18%', 
        trend: 'up',
        icon: BanknotesIcon, 
        color: 'emerald',
        subtitle: `${t('currency_context')} (${USER_CURRENCY})`,
        sparkline: [38, 40, 42, 43, 45.2]
      },
    ];

    // Mock data for Management Centers
    const mgmtCenters = [
        { name: t('center_us_east'), status: t('status_online'), load: '35%', latency: '20ms', icon: GlobeAltIcon, health: 'good' },
        { name: t('center_eu_west'), status: t('status_online'), load: '72%', latency: '120ms', icon: GlobeAltIcon, health: 'warning' },
        { name: t('center_asia_pac'), status: t('status_degraded'), load: '58%', latency: '80ms', icon: GlobeAltIcon, health: 'degraded' },
    ];
    
    // Mock data for Activity Stream
    const activityStream = [
        { time: '10:15 AM', event: t('activity_deployment'), details: 'CRM script updated by Admin.', type: 'update' },
        { time: '10:05 AM', event: t('activity_alert'), details: 'High latency detected in EU-West.', type: 'alert' },
        { time: '09:45 AM', event: t('activity_user_login'), details: 'Analyst Jane D. logged in.', type: 'info' },
    ];


    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        
        {/* Background Gradients/Shine (Z-0) */}
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 absolute top-1/4 left-1/4 animate-blob"></div>
            <div className="w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 absolute bottom-1/4 right-1/4 animate-blob animation-delay-2000"></div>
        </div>

        {/* Premium Header with Glassmorphism */}
        <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <ChartBarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                      {t('welcome_message')}
                    </h1>
                  </div>
                </div>
                <p className="text-gray-600 text-lg">{t('subtitle')}</p>
              </div>
              
              {/* Language Selector and Live Status Badge - NEW FLEX CONTAINER */}
              <div className="flex flex-col items-end gap-3">
                <LanguageSelector />
                
                <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                  <div className="relative">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping"></div>
                  </div>
                  <span className="text-sm font-bold text-white">{t('status_operational')}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {t('last_update')}: **{formatLocalTime(new Date(), currentLang)}** ({USER_TIMEZONE})
                </div>
              </div>
            </div>

            {/* Mini Stats Bar */}
            <div className="grid grid-cols-4 gap-6 pt-4 border-t border-gray-200">
                {miniStats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-md shadow-sm border border-gray-100">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        <div>
                            <p className="text-xs text-gray-500">{t(stat.label.toLowerCase().replace(/[^a-z0-9]/g, '_')) || stat.label}</p>
                            <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Premium KPI Cards with Sparklines */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {kpis.map((kpi, index) => {
                const IconComponent = kpi.icon;
                const trendIcon = kpi.trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
                const trendColor = kpi.trend === 'up' ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100';

                return (
                    <div 
                        key={index} 
                        className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300"
                    >
                        <div className={`p-6 bg-gradient-to-r from-white to-${kpi.color}-50/50`}>
                            <div className="flex justify-between items-start mb-4">
                                <IconComponent className={`w-6 h-6 text-${kpi.color}-600`} />
                                <div className={`flex items-center text-xs font-bold px-3 py-1 rounded-full ${trendColor}`}>
                                    <span className="mr-1"><trendIcon className="w-3 h-3" /></span>
                                    {kpi.change}
                                </div>
                            </div>
                            <div className="text-4xl font-extrabold text-gray-900 mb-2">{kpi.value}</div>
                            <div className="text-sm font-medium text-gray-600 mb-4">{kpi.label}</div>
                            <div className="text-xs text-gray-500">{kpi.subtitle}</div>
                        </div>
                        <div className="p-4 pt-0">
                            <Sparkline data={kpi.sparkline} color={kpi.color} />
                        </div>
                    </div>
                );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Management Centers - Ultra Premium Cards */}
            <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">{t('mgmt_centers')}</h2>
                    <Link href="/settings" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                        {t('view_all')}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="space-y-4">
                    {mgmtCenters.map((center, index) => {
                        const healthColor = center.health === 'good' ? 'bg-green-500' : center.health === 'warning' ? 'bg-yellow-500' : 'bg-red-500';
                        // Icon logic assumed based on health status

                        return (
                            <div key={index} className="flex items-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                                <div className="flex-shrink-0 mr-6">
                                    <GlobeAltIcon className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-900">{center.name}</h3>
                                    <span className={`text-xs font-medium text-white px-3 py-1 rounded-full ${healthColor}`}>
                                        {center.status}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-700">{t('load')}: <span className="font-semibold">{center.load}</span></p>
                                    <p className="text-sm text-gray-700">{t('latency')}: <span className="font-semibold">{center.latency}</span></p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Activity Stream */}
            <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('activity_stream')}</h2>
                <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 h-96 overflow-y-auto">
                    <ul className="space-y-6">
                        {activityStream.map((activity, index) => {
                            const timeColor = activity.type === 'alert' ? 'text-red-500' : 'text-gray-500';
                            const eventColor = activity.type === 'update' ? 'text-blue-600' : activity.type === 'alert' ? 'text-red-600' : 'text-green-600';

                            return (
                                <li key={index} className="flex items-start">
                                    <div className="flex flex-col items-center mr-4">
                                        <div className={`w-2 h-2 rounded-full ${activity.type === 'alert' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                                        {index < activityStream.length - 1 && <div className="w-px h-10 bg-gray-200"></div>}
                                    </div>
                                    <div>
                                        <p className={`text-xs font-medium ${timeColor}`}>{activity.time}</p>
                                        <p className="text-sm font-semibold text-gray-900">{activity.event}</p>
                                        <p className={`text-xs ${eventColor}`}>{activity.details}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
}
