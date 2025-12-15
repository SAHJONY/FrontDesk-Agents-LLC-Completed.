import Link from 'next/link';
import { Settings, BarChart3, ShieldHalf, Globe, Users } from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: BarChart3, label: 'Global Command Center' },
  { href: '/admin/compliance-center', icon: ShieldHalf, label: 'Compliance & Risk' },
  { href: '/settings', icon: Settings, label: 'Configuration Hub' },
  // ... otras rutas
];

export const Sidebar = () => (
  <nav className="w-64 fixed h-full bg-[#10213A] border-r border-gray-800 p-4 pt-10">
    <div className="text-xl font-extrabold text-cyan-400 mb-8 tracking-wider">
      SARA.AI
    </div>
    <ul>
      {navItems.map((item) => (
        <li key={item.href} className="mb-2">
          <Link href={item.href} className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-cyan-900/50 transition duration-150">
            <item.icon className="w-5 h-5 mr-3 text-cyan-400" />
            <span className="font-medium">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
