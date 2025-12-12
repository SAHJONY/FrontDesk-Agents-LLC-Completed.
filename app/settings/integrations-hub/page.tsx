// app/settings/integrations-hub/page.tsx
"use client";

import React, { useState } from 'react';
// FIX APPLIED HERE: Link must be imported for Next.js routing components
import Link from 'next/link'; 

import { 
    PuzzlePieceIcon, 
    ArrowRightIcon, 
    CheckCircleIcon, 
    XCircleIcon, 
    CloudArrowUpIcon,
    CodeBracketIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image'; // Para los logos simulados

// Mock Logos (Placeholder for images)
const LOGO_ZENDESK = "/logos/zendesk.svg";
const LOGO_SALESFORCE = "/logos/salesforce.svg";
const LOGO_HUBSPOT = "/logos/hubspot.svg";
const LOGO_QUICKBOOKS = "/logos/quickbooks.svg";


// Integration Data
const integrationsData = [
// ... (integrationsData remains the same) ...
    {
        name: 'Salesforce CRM',
        category: 'CRM/Ventas',
        logo: LOGO_SALESFORCE,
        status: 'Active',
        description: 'Sincronización bidireccional de leads, tickets y notas de llamada.',
        configPath: '/settings/integrations/salesforce',
    },
    {
        name: 'Zendesk Support',
        category: 'Helpdesk/Tickets',
        logo: LOGO_ZENDESK,
        status: 'Inactive',
        description: 'Automático de tickets y gestión de estatus (Capacidad #11).',
        configPath: '/settings/integrations/zendesk',
    },
    {
        name: 'HubSpot Marketing',
        category: 'Marketing Automation',
        logo: LOGO_HUBSPOT,
        status: 'Active',
        description: 'Sincronización de leads capturados en la web (Capacidad #6) y Follow-up (Capacidad #3).',
        configPath: '/settings/integrations/hubspot',
    },
    {
        name: 'QuickBooks (or Contpaqi/SAP)',
        category: 'Contabilidad/Finanzas',
        logo: LOGO_QUICKBOOKS,
        status: 'Inactive',
        description: 'Registro automático de transacciones de pagos (Capacidad #4).',
        configPath: '/settings/integrations/quickbooks',
    },
];

const IntegrationCard = ({ integration }) => {
    const isActive = integration.status === 'Active';
    const StatusIcon = isActive ? CheckCircleIcon : XCircleIcon;

    // Simulate Image component structure (since we don't have actual images)
    const LogoPlaceholder = () => (
        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-xs">
            {integration.name.substring(0, 3).toUpperCase()}
        </div>
    );

    return (
        <div className={`p-6 rounded-xl shadow-lg border-l-4 ${
            isActive ? 'border-indigo-500 bg-white hover:shadow-xl' : 'border-gray-300 bg-gray-50 hover:shadow-md'
        } transition-all duration-300`}>
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                    {/* Placeholder for Logo */}
                    <LogoPlaceholder /> 
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{integration.name}</h3>
                        <p className={`text-xs font-semibold mt-1 p-1 rounded inline-block ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {integration.category} - {integration.status}
                        </p>
                    </div>
                </div>
                
                {/* Line 85 is now fixed */}
                <Link href={integration.configPath}
                    className={`px-3 py-1 text-sm rounded-full font-semibold transition-colors flex items-center gap-1 ${
                        isActive ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-gray-500 text-white hover:bg-gray-600'
                    }`}
                >
                    <StatusIcon className="h-4 w-4" />
                    {isActive ? 'Gestionar' : 'Conectar'}
                </Link>
            </div>
            <p className="text-sm text-gray-600 mt-4">{integration.description}</p>
        </div>
    );
};

export default function IntegrationsHubPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <PuzzlePieceIcon className="h-10 w-10 text-indigo-600 mr-3" />
                        AURA™ Integrations Hub
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Conecte **FrontDesk Agents** con su CRM, Helpdesk y sistemas de Contabilidad.
                    </p>
                </div>

                <div className="space-y-6">
                    {integrationsData.map((integration, index) => (
                        <IntegrationCard key={index} integration={integration} />
                    ))}
                </div>

                <div className="mt-12 p-6 bg-gradient-to-r from-gray-100 to-white rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                        <CodeBracketIcon className="h-6 w-6 mr-2 text-primary-600" />
                        Custom Integration / API Access
                    </h2>
                    <p className="text-gray-600">
                        ¿No encuentra su herramienta? Ofrecemos acceso completo a nuestra API RESTful para integraciones personalizadas y flujos de trabajo avanzados (Webhooks).
                    </p>
                    <Link href="/settings/api-keys" className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center mt-3">
                        <CloudArrowUpIcon className="h-4 w-4 mr-1" />
                        Generar Claves de API y Webhooks →
                    </Link>
                </div>
            </div>
        </div>
    );
}
