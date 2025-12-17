'use client';

import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

// --- INTERFACES ---
interface PlanData {
  name: string;
  price: number;
  promoPrice?: number;
  features: string[];
  description?: string;
}

interface PlanCardProps {
  plan: PlanData;
  onSelect: (planName: string) => void;
  currentPlanName: string;
  isPromoActive: boolean;
  priceMultiplier?: number;
}

// --- COMPONENTE HIJO ---
const PlanCard = ({ 
  plan, 
  onSelect, 
  currentPlanName, 
  isPromoActive, 
  priceMultiplier = 1 
}: PlanCardProps) => {
    const isCurrent = plan.name === currentPlanName;
    const displayPrice = isPromoActive && plan.promoPrice ? plan.promoPrice : plan.price;

    return (
        <div className={`p-8 rounded-2xl border ${isCurrent ? 'border-cyan-500 bg-cyan-500/5' : 'border-white/10 bg-white/5'} flex flex-col h-full transition-all`}>
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
            <div className="mb-6">
                <span className="text-4xl font-bold text-white">${Math.round(displayPrice * priceMultiplier)}</span>
                <span className="text-gray-500 ml-2">/mes</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                        <CheckIcon className="w-5 h-5 text-cyan-400 shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>
            <button 
                onClick={() => onSelect(plan.name)}
                disabled={isCurrent}
                className={`w-full py-3 rounded-xl font-bold transition-all ${isCurrent ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700 text-white'}`}
            >
                {isCurrent ? 'Plan Actual' : 'Seleccionar Plan'}
            </button>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL (EXPORT DEFAULT) ---
export default function SubscriptionPage() {
    const [currentPlan, setCurrentPlan] = useState('Starter');
    const isPromoActive = true; // Simulación de estado de promo

    const plans: PlanData[] = [
        {
            name: 'Starter',
            price: 49,
            promoPrice: 29,
            description: 'Ideal para pequeñas empresas probando IA.',
            features: ['500 minutos de llamada', 'Soporte vía email', '1 Agente personalizado'],
        },
        {
            name: 'Pro',
            price: 199,
            promoPrice: 149,
            description: 'Para negocios en crecimiento con volumen constante.',
            features: ['2,500 minutos de llamada', 'Soporte 24/7', '3 Agentes personalizados', 'Integración con CRM'],
        },
        {
            name: 'Enterprise',
            price: 499,
            description: 'Solución completa para operaciones a gran escala.',
            features: ['Minutos ilimitados', 'Gerente de cuenta dedicado', 'Agentes ilimitados', 'API Access'],
        }
    ];

    const handleSelectPlan = (name: string) => {
        setCurrentPlan(name);
        console.log(`Cambiando al plan: ${name}`);
    };

    return (
        <div className="min-h-screen bg-[#0a1929] pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Planes y Suscripción</h1>
                <p className="text-gray-400 mb-12">Escala tu recepción automatizada según tus necesidades.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <PlanCard 
                            key={plan.name}
                            plan={plan}
                            onSelect={handleSelectPlan}
                            currentPlanName={currentPlan}
                            isPromoActive={isPromoActive}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
