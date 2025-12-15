import Link from 'next/link';
import { Settings, BarChart3, ShieldHalf, PhoneCall, DollarSign, Plug, LifeBuoy } from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: BarChart3, label: 'Global Command Center' },
  { href: '/admin/compliance-center', icon: ShieldHalf, label: 'Compliance & Risk' },
  { href: '/client/call-log', icon: PhoneCall, label: 'Call Log & Audit' },
  { href: '/settings/general', icon: Settings, label: 'Configuration Hub' },
  { href: '/settings/integrations', icon: Plug, label: 'Integration Hub' },
  { href: '/billing/summary', icon: DollarSign, label: 'Billing & Plans' },
  { href: '/support', icon: LifeBuoy, label: 'Concierge Support' },
];

export const Sidebar = () => (
  // CLASES CORREGIDAS: 'hidden lg:block lg:w-64' oculta en móvil y fija el ancho en escritorio.
  <nav className="fixed h-full bg-[#10213A] border-r border-gray-800 p-4 pt-10 z-20 hidden lg:block lg:w-64">
    
    <div className="text-xl font-extrabold text-cyan-400 mb-8 tracking-wider">
      SARA.AI
    </div>
    
    <ul>
      {navItems.map((item) => (
        <li key={item.href} className="mb-2">
          {/* Se usa Tailwind dinámico para simular el estado 'activo' con el color Cian */}
          <Link href={item.href} className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-cyan-900/50 transition duration-150">
            <item.icon className="w-5 h-5 mr-3 text-cyan-400" />
            <span className="font-medium">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
