// config/pricing.config.ts

import { Features } from '@/hooks/useFeatureFlags';

export interface FeatureDetail {
    title: string;
    isAvailable: boolean;
}

export interface PricingPlan {
    id: Features['currentPlan'];
    name: string;
    description: string;
    price: number;       // <--- AQUÍ DEBES PONER EL PRECIO REAL (solo el número)
    priceUnit: string;   // <--- AQUÍ DEBES PONER LA UNIDAD (ej: 'USD', 'EUR')
    billingCycle: 'monthly' | 'annually';
    primaryCta: string;
    features: FeatureDetail[];
}


// --- CONFIGURACIÓN DE PRECIOS REALES (¡ACTUALIZA LOS VALORES!) ---

export const pricingPlans: PricingPlan[] = [
    {
        id: 'essential',
        name: 'Essential',
        description: 'La base para la operación de agentes y monitoreo de llamadas.',
        price: 0, // 👈 REEMPLAZA ESTE CERO CON TU PRECIO REAL PARA EL PLAN ESSENTIAL
        priceUnit: 'USD', // 👈 AJUSTA LA DIVISA SI ES NECESARIO
        billingCycle: 'monthly',
        primaryCta: 'Comenzar Prueba Gratuita',
        features: [
            { title: 'Hasta 500 llamadas por mes', isAvailable: true },
            { title: 'Acceso a KPIs básicos (Calls, Satisfaction)', isAvailable: true },
            { title: 'Traducción de idioma en tiempo real', isAvailable: true },
            { title: 'Gráficos de Series de Tiempo (Análisis)', isAvailable: false },
            { title: 'Automatización de Booking en CRM', isAvailable: false },
        ],
    },
    {
        id: 'growth',
        name: 'Pro',
        description: 'Análisis profundo para optimizar scripts y tasas de conversión.',
        price: 0, // 👈 REEMPLAZA ESTE CERO CON TU PRECIO REAL PARA EL PLAN PRO
        priceUnit: 'USD', // 👈 AJUSTA LA DIVISA SI ES NECESARIO
        billingCycle: 'monthly',
        primaryCta: 'Cambiar a Plan Pro',
        features: [
            { title: 'Hasta 3,000 llamadas por mes', isAvailable: true },
            { title: 'Acceso a KPIs avanzados (Conversión, Error)', isAvailable: true },
            { title: 'Traducción de idioma en tiempo real', isAvailable: true },
            { title: 'Gráficos de Series de Tiempo (Histórico de 90 días)', isAvailable: true },
            { title: 'Automatización de Booking en CRM', isAvailable: false },
        ],
    },
    {
        id: 'premium',
        name: 'Premium',
        description: 'Automatización completa, integración con CRM y máximo ROI.',
        price: 0, // 👈 REEMPLAZA ESTE CERO CON TU PRECIO REAL PARA EL PLAN PREMIUM
        priceUnit: 'USD', // 👈 AJUSTA LA DIVISA SI ES NECESARIO
        billingCycle: 'monthly',
        primaryCta: 'Contactar a Ventas',
        features: [
            { title: 'Llamadas ilimitadas', isAvailable: true },
            { title: 'Todos los KPIs y métrica de Éxito de Automatización', isAvailable: true },
            { title: 'Traducción de idioma en tiempo real', isAvailable: true },
            { title: 'Gráficos de Series de Tiempo (Histórico ilimitado)', isAvailable: true },
            { title: 'Automatización de Booking en CRM', isAvailable: true },
        ],
    },
];
