'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import SidebarItem from './SidebarItem';

interface SidebarItemConfig {
  icon: React.ReactNode;
  label: string;
  href: string;
  match: string;
}

const sidebarItems: SidebarItemConfig[] = [
  {
    icon: '🏠',
    label: 'Dashboard',
    href: '/dashboard',
    match: '/dashboard',
  },
  {
    icon: '📞',
    label: 'Calls',
    href: '/calls',
    match: '/calls',
  },
  {
    icon: '📨',
    label: 'Inbox',
    href: '/inbox',
    match: '/inbox',
  },
  {
    icon: '⚙️',
    label: 'Settings',
    href: '/settings',
    match: '/settings',
  },
];

const Sidebar: React.FC = () => {
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? ''; // ✅ FIX: null-safe

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 font-bold text-xl">
        FrontDesk Agents
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname.startsWith(item.match)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
