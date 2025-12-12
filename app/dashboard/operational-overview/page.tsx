// app/dashboard/operational-overview/page.tsx (Actualización de KPIs y Enlaces)

import { 
    ClockIcon, 
    SparklesIcon, 
    ArrowsRightLeftIcon, 
    WrenchScrewdriverIcon, 
    ArrowTrendingUpIcon, 
    ShieldCheckIcon,
    BanknotesIcon, // Importado
    UsersIcon // Importado
} from '@heroicons/react/24/outline';

// Mock Data for Key Performance Indicators (KPIs) - ACTUALIZADO
const kpis = [
    { 
        metric: "98.7%", 
        label: "Tasa de Resolución del Agente", 
        description: "Porcentaje de problemas manejados sin escalada humana.", 
        icon: SparklesIcon,
        color: "text-green-600"
    },
    { 
        metric: "1.2s", 
        label: "Tiempo Promedio de Respuesta", 
        description: "Velocidad de respuesta inicial del motor de telefonía AI.", 
        icon: ClockIcon,
        color: "text-blue-600"
    },
    { 
        metric: "✓ OK", // Métrica de Éxito 1 (Telefonía)
        label: "Llamada Entrante Registrada", 
        description: "Verificación de la prueba de troncal (AURA™ Core).", 
        icon: ArrowTrendingUpIcon,
        color: "text-green-500"
    },
    { 
        metric: "✓ OK", // Métrica de Éxito 2 (Pago)
        label: "Pago de Prueba Exitoso", 
        description: "Verificación de la prueba de integración de pago (Stripe).", 
        icon: ShieldCheckIcon,
        color: "text-green-500"
    },
];

// Data for Quick Access to Management Centers - ACTUALIZADO
const managementLinks = [
    { 
        title: "Gestión de Pagos (Stripe)", 
        description: "Revisar el estado de la pasarela de pagos y ejecutar pruebas.", 
        href: "/settings/payments", // Nuevo Enlace
        icon: BanknotesIcon 
    },
    { 
        title: "Sincronización de CRM", 
        description: "Conectar y sincronizar datos con el sistema de clientes.", 
        href: "/settings/crm", // Nuevo Enlace
        icon: UsersIcon 
    },
    { 
        title: "Telefonía & Enrutamiento", 
        description: "Configurar números entrantes y lógica de transferencia de llamadas.", 
        href: "/settings/numbers", 
        icon: ArrowsRightLeftIcon 
    },
];

// ... (El resto del componente sigue igual)
