// app/settings/subscription/page.tsx - CRITICAL UPDATE FOR LAUNCH PROMO
"use client";

import React, { useState } from 'react';
import { 
    // ... (existing imports) ...
    SparklesIcon,
    ArrowRightIcon,
    TrophyIcon, // Nuevo ícono para la promoción
    // FIXES: Adding missing icons for compilation
    ClockIcon,
    BanknotesIcon 
} from '@heroicons/react/24/outline';

// --- LÓGICA DE PROMOCIÓN DE LANZAMIENTO (CONSTANTES) ---
const TOTAL_PROMO_SLOTS = 100;
// Note: slotsTaken state must be managed inside the component. 
// We will use a mock default value here, and manage the state inside the component.
// --------------------------------------------------------

const plans = [
    { 
        name: 'Standard', 
        price: 1299, 
        promoPrice: 649.50, // 50% OFF
        usageCost: '0.05',
        features: ['1 Agente Monolítico', 'Dashboard Básico', '5.000 Minutos de IA incluidos (Trial)'],
        color: 'blue'
    },
    { 
        name: 'Professional', 
        price: 4199, 
        promoPrice: 2099.50, // 50% OFF
        usageCost: '0.04',
        features: ['Integrations Hub Básico', 'Reportes de Calibración', '20.000 Minutos de IA incluidos (Trial)'],
        color: 'green'
    },
    { 
        name: 'Ultra Premium', 
        price: 9499, 
        promoPrice: 4749.50, // 50% OFF
        usageCost: '0.03',
        features: ['Orquestación Multi-RL', 'Data Governance (PCI/GDPR)', 'SLA Garantizado', 'Minutos ILIMITADOS de IA (Trial)'],
        color: 'indigo'
    },
];

// Note: This component is simplified to receive all necessary status props
const PlanCard = ({ plan, onSelect, currentPlanName, isPromoActive, priceMultiplier = 1 }) => {
    const isCurrent = plan.name === currentPlanName;
    
    // Determine which price to display based on promo state
    const price = isPromoActive ? plan.promoPrice : plan.price;
    const oldPrice = plan.price;

    return (
        <div className={`p-6 rounded-xl shadow-lg border-2 ${
            isCurrent ? 'border-indigo-600 ring-4 ring-indigo-100' : 'border-gray-200'
        }`}>
            {/* Promo Badge */}
            {isPromoActive && (
                <div className="flex items-center justify-center p-2 mb-3 bg-red-100 rounded-lg">
                    <TrophyIcon className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-sm font-bold text-red-600">¡50% OFF por Lanzamiento!</span>
                </div>
            )}

            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            
            {/* Price Display */}
            <div className="my-4">
                <span className="text-4xl font-extrabold text-indigo-600">
                    ${price.toFixed(2)}
                </span>
                <span className="text-gray-500 ml-2">/ mes</span>
                
                {isPromoActive && (
                    <p className="text-sm text-gray-500 mt-1 line-through">Precio original: ${oldPrice.toFixed(2)}</p>
                )}
            </div>

            {/* Trial Info */}
            <p className="text-sm font-semibold text-green-600 mb-4 flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                **14 Días de Prueba Gratuita**
            </p>

            <button
                onClick={() => onSelect(plan.name)}
                disabled={isCurrent}
                // Use bracket notation for dynamic Tailwind classes to avoid lint warnings
                className={`w-full py-3 text-white font-bold rounded-lg transition-colors ${
                    isCurrent 
                        ? 'bg-gray-400 cursor-default' 
                        : `bg-${plan.color}-600 hover:bg-${plan.color}-700`
                }`}
            >
                {isCurrent ? 'Plan Actual' : 'Comenzar Prueba de 14 Días'}
            </button>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-700 mb-2">Características Clave:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                    {plan.features.map((feature, i) => <li key={i} className="flex items-start">
                        <ArrowRightIcon className="flex-shrink-0 h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        {feature}
                    </li>)}
                </ul>
                <p className="mt-3 text-xs text-gray-500">
                    Costo por Minuto Extra: **${plan.usageCost}**
                </p>
            </div>
        </div>
    );
};


export default function SubscriptionManagerPage() {
    // FIX APPLIED HERE: useState must be inside the functional component
    const [slotsTaken, setSlotsTaken] = useState(32); 
    const [currentPlan, setCurrentPlan] = useState('Professional'); 

    const SLOTS_REMAINING = TOTAL_PROMO_SLOTS - slotsTaken;
    const IS_PROMO_ACTIVE = SLOTS_REMAINING > 0;
    
    // ... (logic to handle plan selection - assumed here) ...

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <BanknotesIcon className="h-10 w-10 text-indigo-600 mr-3" />
                        AURA™ Subscription Manager
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Gestiona tu plan de servicio y escala el poder de tu Agentic Workforce.
                    </p>
                </div>
                
                {/* --- PROMOTION BANNER --- */}
                {IS_PROMO_ACTIVE && (
                    <div className="mb-10 p-4 text-center bg-red-500 rounded-xl text-white font-bold shadow-lg">
                        <TrophyIcon className="h-6 w-6 inline-block mr-2" />
                        ¡OFERTA DE LANZAMIENTO! 50% OFF DE POR VIDA para los primeros 100 clientes. Quedan **{SLOTS_REMAINING}** cupos.
                    </div>
                )}
                {/* ------------------------- */}

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <PlanCard 
                            key={plan.name} 
                            plan={plan} 
                            onSelect={setCurrentPlan} 
                            currentPlanName={currentPlan} 
                            isPromoActive={IS_PROMO_ACTIVE} // Pass status down
                        />
                    ))}
                </div>
                
                <div className="mt-12 text-center">
                    <a href="/settings/payments" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center justify-center">
                        Gestionar Métodos de Pago y Facturación →
                    </a>
                </div>
            </div>
        </div>
    );
}
