// app/settings/subscription/page.tsx - CRITICAL UPDATE FOR LAUNCH PROMO
"use client";

import React, { useState } from 'react';
import { 
    // ... (existing imports) ...
    SparklesIcon,
    ArrowRightIcon,
    TrophyIcon // Nuevo ícono para la promoción
} from '@heroicons/react/24/outline';

// --- LÓGICA DE PROMOCIÓN DE LANZAMIENTO ---
const TOTAL_PROMO_SLOTS = 100;
const [slotsTaken, setSlotsTaken] = useState(32); // Simulación de contador de clientes
const SLOTS_REMAINING = TOTAL_PROMO_SLOTS - slotsTaken;
const IS_PROMO_ACTIVE = SLOTS_REMAINING > 0;
// ------------------------------------------

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

const PlanCard = ({ plan, onSelect, currentPlanName }) => {
    const isCurrent = plan.name === currentPlanName;
    const priceDisplay = IS_PROMO_ACTIVE ? plan.promoPrice : plan.price;
    const oldPriceDisplay = plan.price;

    return (
        <div className={`p-6 rounded-xl shadow-lg border-2 ${
            isCurrent ? 'border-primary-600 ring-4 ring-primary-100' : 'border-gray-200'
        }`}>
            {/* Promo Badge */}
            {IS_PROMO_ACTIVE && (
                <div className="flex items-center justify-center p-2 mb-3 bg-red-100 rounded-lg">
                    <TrophyIcon className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-sm font-bold text-red-600">¡50% OFF por Lanzamiento!</span>
                </div>
            )}

            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            
            {/* Price Display */}
            <div className="my-4">
                <span className="text-4xl font-extrabold text-indigo-600">
                    ${priceDisplay.toFixed(2)}
                </span>
                <span className="text-gray-500 ml-2">/ mes</span>
                
                {IS_PROMO_ACTIVE && (
                    <p className="text-sm text-gray-500 mt-1 line-through">Precio original: ${oldPriceDisplay}</p>
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
                className={`w-full py-3 text-white font-bold rounded-lg transition-colors ${
                    isCurrent 
                        ? 'bg-gray-400 cursor-default' 
                        : `bg-${plan.color}-600 hover:bg-${plan.color}-700`
                }`}
            >
                {isCurrent ? 'Plan Actual' : 'Comenzar Prueba de 14 Días'}
            </button>
            
            {/* ... (Rest of the card with usage cost and features) ... */}
        </div>
    );
};

export default function SubscriptionManagerPage() {
    const [currentPlan, setCurrentPlan] = useState('Professional'); 
    
    // ... (logic to handle plan selection) ...

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
                        />
                    ))}
                </div>
                
                {/* ... (Footer link to payments settings) ... */}
            </div>
        </div>
    );
}
