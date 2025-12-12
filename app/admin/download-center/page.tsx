// app/admin/download-center/page.tsx - MODIFICACIÓN PARA AÑADIR DOCUMENTO DE ARQUITECTURA

// ... (Resto de imports y el componente DocumentItem siguen igual) ...

const documentCategories = [
    {
        name: 'Acuerdos Contractuales y Financieros',
        icon: BanknotesIcon,
        documents: [
            // ... (Documentos SLA, TyC, Pricing siguen igual) ...
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
            // --- NUEVO DOCUMENTO AÑADIDO ---
            {
                title: 'Visión General de Arquitectura y Seguridad de AURA™ Core',
                description: 'Diagramas de Flujo de Datos, Topología de IA, y Estrategia de Disaster Recovery (DR/BCP).',
                file: 'AURA_ARCH_SECURITY_OVERVIEW_V1.0.pdf',
                size: '8.5 MB',
                category: 'Arquitectura'
            },
            // -------------------------------
        ]
    },
    {
        name: 'Guías Técnicas y de Integración',
        icon: DocumentTextIcon,
        documents: [
            // ... (Documentos de Integración y QuickStart Guide siguen igual) ...
        ]
    }
];

// ... (El componente principal DownloadCenterPage sigue igual) ...
