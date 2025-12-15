'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = pathnameRaw ?? '';

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 font-bold text-xl">
        FrontDesk Agents
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname.startsWith(item.match);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
