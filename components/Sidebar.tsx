import Link from 'next/link';
import { LayoutDashboard, Users, CreditCard, Shield, FileCode } from 'lucide-react';

export const Sidebar = () => {
  const menu = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'AI Fleet', icon: Users, href: '/dashboard/agents' },
    { name: 'Scripts', icon: FileCode, href: '/settings/scripts' },
    { name: 'Billing', icon: CreditCard, href: '/settings/billing' },
    { name: 'Security', icon: Shield, href: '/admin/security' },
  ];

  return (
    <aside className="w-64 border-r border-white/5 h-screen sticky top-0 bg-[#010204] p-6">
      <div className="space-y-2">
        {menu.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-xl text-brand-slate hover:bg-white/5 hover:text-white transition-all group"
          >
            <item.icon className="w-4 h-4 group-hover:text-brand-cyan" />
            <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};
