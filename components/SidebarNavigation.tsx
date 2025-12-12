// components/SidebarNavigation.tsx
"use client";

import Link from 'next/link';
import { 
    HomeIcon, 
    ChartPieIcon, 
    UsersIcon, 
    Cog6ToothIcon, 
    CpuChipIcon, 
    PuzzlePieceIcon, 
    ShieldCheckIcon,
    ArrowPathIcon,
    TicketIcon,
    BanknotesIcon,
    GlobeAltIcon,
    ClockIcon,
    ClipboardDocumentListIcon,
    PhoneArrowUpRightIcon,
} from '@heroicons/react/24/outline';

const navigationStructure = [
    {
        name: 'Resultados y Operaciones',
        links: [
            { 
                name: 'Dashboard Operacional', 
                href: '/dashboard/operational-overview', 
                icon: HomeIcon 
            },
            { 
                name: 'Intelligent Call Log (CRM)', 
                href: '/client/call-log', 
                icon: PhoneArrowUpRightIcon 
            },
        ]
    },
    {
        name: 'Gestión de la Autonomía (IA)',
        links: [
            { 
                name: 'Workflow Builder', 
                href: '/admin/feature-management', 
                icon: TicketIcon 
            },
            { 
                name: 'Agentes Multi-RL (Workforce)', 
                href: '/admin/agentic-orchestration', 
                icon: UsersIcon 
            },
            { 
                name: 'Motor de Calibración AURA™', 
                href: '/admin/calibration-engine', 
                icon: CpuChipIcon 
            },
        ]
    },
    {
        name: 'Configuración y Cumplimiento',
        links: [
            { 
                name: 'Integrations Hub', 
                href: '/settings/integrations-hub', 
                icon: PuzzlePieceIcon 
            },
            { 
                name: 'Data Governance & Compliance', 
                href: '/admin/compliance-center', 
                icon: ShieldCheckIcon 
            },
            { 
                name: 'Auditoría y Logs de Acceso', 
                href: '/admin/audit', 
                icon: ClipboardDocumentListIcon 
            },
        ]
    },
    {
        name: 'Infraestructura y Finanzas',
        links: [
            { 
                name: 'Config. de Telefonía', 
                href: '/settings/telephony-trunk', 
                icon: PhoneArrowUpRightIcon 
            },
            { 
                name: 'Config. de Pagos', 
                href: '/settings/payments', 
                icon: BanknotesIcon 
            },
            { 
                name: 'Despliegue Global (i18n)', 
                href: '/settings/global-deployment', 
                icon: GlobeAltIcon 
            },
            { 
                name: 'Owner & API Core', 
                href: '/dashboard/owner', 
                icon: Cog6ToothIcon 
            },
            { 
                name: 'Suscripciones', 
                href: '/settings/subscription', 
                icon: ArrowPathIcon 
            },
        ]
    },
    {
        name: 'Transparencia (Público)',
        links: [
            { 
                name: 'Status Page (Servicio)', 
                href: '/public/status', 
                icon: ClockIcon 
            },
        ]
    },
];

export const SidebarNavigation = () => {
    // Nota: En una aplicación real, se usaría usePathname() de Next.js para determinar el link activo.
    const activePath = '/dashboard/operational-overview'; // Simulación del path activo

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white">
            
            {/* Logo Area */}
            <div className="flex items-center justify-center h-16 border-b border-gray-800">
                <h1 className="text-xl font-extrabold text-primary-400">AURA™ Core</h1>
            </div>

            {/* Navigation Sections */}
            <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
                {navigationStructure.map((section) => (
                    <div key={section.name}>
                        <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                            {section.name}
                        </h3>
                        <div className="space-y-1">
                            {section.links.map((item) => {
                                const isActive = activePath === item.href;
                                return (
                                    <Link 
                                        key={item.name} 
                                        href={item.href}
                                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors 
                                            ${isActive 
                                                ? 'bg-primary-800 text-white shadow-md' 
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            }`}
                                    >
                                        <item.icon className={`mr-3 h-6 w-6 flex-shrink-0 ${isActive ? 'text-primary-400' : 'text-gray-400'}`} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer / User Area (Placeholder) */}
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">Admin Global</p>
                        <p className="text-xs text-gray-400">Elite Plan</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
