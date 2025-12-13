// app/admin/download-center/page.tsx
"use client";

import React from 'react';
import { 
    CloudArrowDownIcon, 
    ShieldCheckIcon, 
    DocumentTextIcon, 
    BanknotesIcon
} from '@heroicons/react/24/outline';

const documentCategories = [
    {
        name: 'Acuerdos Contractuales y Financieros',
        icon: BanknotesIcon,
        documents: [
            {
                title: 'Acuerdo de Nivel de Servicio (SLA) - Plan Ultra Premium',
                description: 'Detalle contractual del compromiso de 99.9% de Uptime y compensaciones.',
                file: 'FRONTDESK_SLA_ULTRA_PREMIUM_V1.1.pdf',
                size: '2.5 MB',
                category: 'SLA'
            },
            {
                title: 'Términos y Condiciones del Servicio',
                description: 'Términos legales generales para el uso de la plataforma FrontDesk Agents.',
                file: 'FRONTDESK_TOS_V3.0.pdf',
                size: '1.2 MB',
                category: 'Legal'
            },
            {
                title: 'Política de Precios y Estructura de Uso',
                description: 'Desglose oficial de las tarifas fijas y variables por minuto de IA y transacción.',
                file: 'FRONTDESK_PRICING_GUIDE_V1.0.pdf',
                size: '800 KB',
                category: 'Finanzas'
            },
        ]
    },
    {
        name: 'Cumplimiento y Gobernanza de Datos',
        icon: ShieldCheckIcon,
        documents: [
            {
                title: 'Certificado de Cumplimiento PCI DSS (Tokenización)',
                description: 'Prueba de auditoría de la Capacidad #4, garantizando el manejo seguro de datos de pago.',
                file: 'FRONTDESK_PCI_CERT_Q3_2025.pdf',
                size: '5.1 MB',
                category: 'Compliance'
            },
            {
                title: 'Política de Privacidad y Retención de Datos (GDPR/CCPA)',
                description: 'Detalla cómo la plataforma gestiona el Derecho al Olvido y la retención configurable.',
                file: 'FRONTDESK_DATA_GOV_POLICY_V1.5.pdf',
                size: '3.4 MB',
                category: 'GDPR'
            },
            {
                title: 'Informe de Auditoría de Acceso y Logs',
                description: 'Documentación sobre la inmutabilidad y trazabilidad del Audit Log.',
                file: 'FRONTDESK_AUDIT_LOG_SPEC_V1.0.pdf',
                size: '1.9 MB',
                category: 'Compliance'
            },
            {
                title: 'Visión General de Arquitectura y Seguridad de AURA™ Core',
                description: 'Diagramas de Flujo de Datos, Topología de IA, y Estrategia de Disaster Recovery (DR/BCP).',
                file: 'AURA_ARCH_SECURITY_OVERVIEW_V1.0.pdf',
                size: '8.5 MB',
                category: 'Arquitectura'
            },
        ]
    },
    {
        name: 'Guías Técnicas y de Integración',
        icon: DocumentTextIcon,
        documents: [
            {
                title: 'Manual Técnico: Integraciones API (Webhooks)',
                description: 'Guía para desarrolladores sobre el uso de la API RESTful y Webhooks personalizados.',
                file: 'FRONTDESK_API_GUIDE_V2.1.pdf',
                size: '10.8 MB',
                category: 'Técnico'
            },
            {
                title: 'Guía de Implementación: QuickStart Guided Setup',
                description: 'Pasos detallados para configurar la telefonía, flujos de trabajo y agentes Multi-RL.',
                file: 'FRONTDESK_QUICKSTART_GUIDE_V1.0.pdf',
                size: '6.2 MB',
                category: 'Onboarding'
            },
        ]
    }
];

const DocumentItem = ({ doc }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        <div className="flex items-start gap-4">
            <DocumentTextIcon className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
                <p className="text-lg font-semibold text-gray-900">{doc.title}</p>
                <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {doc.category} | {doc.size}
                </span>
            </div>
        </div>
        <a 
            href={`/documents/${doc.file}`} 
            download
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition-colors"
        >
            <CloudArrowDownIcon className="h-5 w-5 mr-2" />
            Descargar
        </a>
    </div>
);

export default function DownloadCenterPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                        <CloudArrowDownIcon className="h-10 w-10 text-indigo-600 mr-3" />
                        AURA™ Document Download Center
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        Acceso a la documentación legal, de cumplimiento y técnica de FrontDesk Agents.
                    </p>
                </div>

                {documentCategories.map((category, index) => (
                    <div key={index} className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-3 flex items-center mb-6">
                            <category.icon className="h-6 w-6 text-indigo-600 mr-2" />
                            {category.name}
                        </h2>
                        <div className="space-y-4">
                            {category.documents.map((doc, docIndex) => (
                                <DocumentItem key={docIndex} doc={doc} />
                            ))}
                        </div>
                    </div>
                ))}

                <div className="mt-12 p-6 text-sm text-center text-gray-600 border-t pt-6">
                    <p>Todos los documentos son © FrontDesk Agents S.A. de C.V. y están sujetos a nuestros Términos y Condiciones del Servicio.</p>
                </div>
            </div>
        </div>
    );
}
