import Link from 'next/link';
import { Settings, BarChart3, ShieldHalf, PhoneCall, DollarSign, Plug, LifeBuoy } from 'lucide-react';

const navItems = [
  // 1. Monitoreo
  { href: '/dashboard', icon: BarChart3, label: 'Global Command Center' },
  // 2. Control de Riesgo
  { href: '/admin/compliance-center', icon: ShieldHalf, label: 'Compliance & Risk' },
  // 3. Auditoría
  { href: '/client/call-log', icon: PhoneCall, label: 'Call Log & Audit' },
  
  // 4. Configuración
  // Nota: Si Configuration Hub es un menú de configuración principal,
  // debe redirigir a una página de inicio de configuración (ej. General Settings)
  { href: '/settings/general', icon: Settings, label: 'Configuration Hub' }, 
  { href: '/settings/integrations-hub', icon: Plug, label: 'Integration Hub' },
  
  // 5. Finanzas
  { href: '/settings/billing', icon: DollarSign, label: 'Billing & Plans' }, // Ajustado a la ruta lógica de facturación
  
  // 6. Soporte
  { href: '/support', icon: LifeBuoy, label: 'Concierge Support' },
];

export const Sidebar = () => {
  // Nota: Usar el hook usePathname (si es un Client Component) para resaltar el enlace activo
  // Para este ejemplo, lo mantenemos simple como un Server Component de Layout.

  return (
    // CLASES CORREGIDAS PARA EL LAYOUT: Oculta en móvil, muestra fijo en desktop (lg)
    <nav className="fixed h-full bg-[#10213A] border-r border-gray-800 p-4 pt-10 z-20 hidden lg:block lg:w-64">
      
      <div className="text-xl font-extrabold text-cyan-400 mb-8 tracking-wider">
        FrontDesk Agents
      </div>
      
      <ul>
        {navItems.map((item) => (
          <li key={item.href} className="mb-2">
            <Link 
              href={item.href} 
              className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-cyan-900/50 transition duration-150"
            >
              <item.icon className="w-5 h-5 mr-3 text-cyan-400" />
              <span className="font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
