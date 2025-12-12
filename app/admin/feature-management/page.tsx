// app/admin/feature-management/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    ClockIcon, 
    CalendarDaysIcon, 
    ArrowRightCircleIcon, 
    CreditCardIcon, 
    UserGroupIcon, 
    DocumentTextIcon, 
    QuestionMarkCircleIcon, 
    IdentificationIcon, 
    WrenchScrewdriverIcon, 
    TicketIcon, 
    ChartPieIcon,
    ServerStackIcon,
    WifiIcon,
    CodeBracketIcon,
    CheckCircleIcon,
    XCircleIcon,
    UsersIcon
} from '@heroicons/react/24/outline';

// Estructura de datos para las 12 capacidades (Funcionalidad y Métrica de Éxito)
const featuresData = [
    {
        icon: ClockIcon,
        title: "1. Answering 24/7 + Call Routing Inteligente",
        description: "Detecta intención: cita, precio, emergencia, seguimiento, ventas. Enrutamiento basado en la prioridad de la intención.",
        metric: "Mide: % de llamadas resueltas sin humano.",
        status: "ACTIVE",
        color: "blue",
    },
    {
        icon: CalendarDaysIcon,
        title: "2. Agendamiento Automático",
        description: "Calendarios sincronizados (Google/Outlook), bloqueo de slots y protección contra doble-booking.",
        metric: "Mide: número de citas reservadas por IA.",
        status: "ACTIVE",
        color: "green",
    },
    {
        icon: ArrowRightCircleIcon,
        title: "3. Seguimiento Automático (Follow-up)",
        description: "Envía SMS/email personalizados cuando un cliente potencial no responde o se requiere documentación.",
        metric: "Mide: tasa de recuperación de leads.",
        status: "ACTIVE",
        color: "purple",
    },
    {
        icon: CreditCardIcon,
        title: "4. Procesamiento de Pagos / Depósitos",
        description: "Realiza cargos, genera links de pago seguros (Multi-Gateway) y envía confirmaciones automáticas.",
        metric: "Mide: monto mensual cobrado por la IA.",
        status: "ACTIVE",
        color: "emerald",
    },
    {
        icon: UserGroupIcon,
        title: "5. CRM Inteligente",
        description: "Historial de llamadas, notas, tags por intención, y cálculo de probabilidad de conversión (Pipeline Quality).",
        metric: "Mide: calidad del pipeline (Pipeline Quality Index).",
        status: "ACTIVE",
        color: "red",
    },
    {
        icon: DocumentTextIcon,
        title: "6. Captura de Leads en páginas web",
        description: "Formulario dinámico + conversación integrada tipo chat/widget en el sitio web del cliente.",
        metric: "Mide: % de leads completados vía widget.",
        status: "INACTIVE",
        color: "orange",
    },
    {
        icon: QuestionMarkCircleIcon,
        title: "7. Respuesta Automática de Preguntas Frecuentes",
        description: "Responde consultas comunes sobre precios, horarios, y políticas de manera instantánea y precisa.",
        metric: "Mide: reducción de interrupciones al staff (Deflection Rate).",
        status: "ACTIVE",
        color: "cyan",
    },
    {
        icon: IdentificationIcon,
        title: "8. Verificación de Identidad",
        description: "Confirma nombre, email, teléfono, e ID de cliente mediante prompts de voz seguros y verificación cruzada.",
        metric: "Mide: exactitud del matching (Matching Accuracy Index).",
        status: "ACTIVE",
        color: "pink",
    },
    {
        icon: UsersIcon,
        title: "9. Onboarding Automático",
        description: "Proceso guiado de inicio para nuevos pacientes, clientes legales o tenants, recolección inicial de datos.",
        metric: "Mide: tiempo de onboarding reducido.",
        status: "ACTIVE",
        color: "teal",
    },
    {
        icon: CodeBracketIcon,
        title: "10. Workflow Builder (No-Code)",
        description: "Herramienta visual: 'Si el cliente dice X → preguntar Y → asignar Z' para la orquestación de llamadas.",
        metric: "Mide: número de errores de enrutamiento reducidos.",
        status: "ACTIVE",
        color: "indigo",
    },
    {
        icon: TicketIcon,
        title: "11. Automatización de Tickets / Soporte",
        description: "Abre tickets en sistemas de soporte (Zendesk, Salesforce), asigna, actualiza estatus, y cierra.",
        metric: "Mide: tiempos de resolución de tickets (AHT).",
        status: "ACTIVE",
        color: "lime",
    },
    {
        icon: ChartPieIcon,
        title: "12. Análisis de Voz + Insights del Negocio",
        description: "Mide sentimiento, objeciones, y keywords que cierran ventas. Genera reportes semanales accionables.",
        metric: "Mide: reportes semanales accionables generados (Insight Volume).",
        status: "ACTIVE",
        color: "violet",
    },
];

const FeatureCard = ({ feature, onToggle }) => {
    const isActive = feature.status === 'ACTIVE';
    const StatusIcon = isActive ? CheckCircleIcon : XCircleIcon;

    return (
        <div className={`p-6 rounded-xl shadow-lg border-l-4 ${
            isActive ? 'border-green-500 bg-white hover:shadow-xl' : 'border-gray-300 bg-gray-50 hover:shadow-md'
        } transition-all duration-300`}>
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                    <feature.icon className={`h-8 w-8 text-${feature.color}-600 flex-shrink-0`} />
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                        <p className={`text-xs font-semibold mt-1 p-1 rounded ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                            {feature.metric}
                        </p>
                    </div>
                </div>
                
                <button 
                    onClick={() => onToggle(feature.title)}
                    className={`px-3 py-1 text-sm rounded-full font-semibold transition-colors flex items-center gap-1 ${
                        isActive ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                >
                    <StatusIcon className="h-4 w-4" />
                    {isActive ? 'Desactivar' : 'Activar'}
                </button>
            </div>
            
        </div>
    );
};

export default function FeatureManagementConsole() {
    const [features, setFeatures] = useState(featuresData);

    const handleToggle = (title) => {
        const featureToToggle = features.find(f => f.title === title);
        
        // FIX APPLIED HERE: Add check for undefined before accessing properties
        if (!featureToToggle) {
            console.error(`Feature not found: ${title}`);
            return; // Exit the function to prevent crashing
        }

        const newStatus = featureToToggle.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

        // Confirmation and simulation
        if (window.confirm(`¿Está seguro de que desea ${newStatus === 'ACTIVE' ? 'ACTIVAR' : 'DESACTIVAR'} la funcionalidad: "${title}"?`)) {
            setFeatures(prev => prev.map(f => 
                f.title === title ? { ...f, status: newStatus } : f
            ));
            alert(`${title} ha sido ${newStatus} con éxito en AURA™ Core.`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <ServerStackIcon className="h-10 w-10 text-primary-600 mr-3" />
                        AURA™ Core Feature Management Console
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Active y configure las **12 Capacidades de Enterprise** de su asistente de IA.
                    </p>
                </div>

                <div className="space-y-6">
                    {features.map((feature, index) => (
                        <FeatureCard 
                            key={index} 
                            feature={feature} 
                            onToggle={handleToggle} 
                        />
                    ))}
                </div>

                <div className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-white rounded-xl shadow-lg border border-primary-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Integración y Reporte</h2>
                    <p className="text-gray-600">
                        Todas las métricas de éxito (Mide:) se reportan en tiempo real al **Operational Overview** y se almacenan en el **CRM Inteligente** para la calibración del modelo AURA™ Core.
                    </p>
                    <Link href="/dashboard/operational-overview" className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center mt-3">
                        <ChartPieIcon className="h-4 w-4 mr-1" />
                        Ver Métricas de Éxito en el Dashboard Operacional →
                    </Link>
                </div>
            </div>
        </div>
    );
}
