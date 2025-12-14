// ./components/Sidebar.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  BoltIcon,
  WalletIcon,
  ShieldCheckIcon,
  MicrophoneIcon, // <-- NEW ICON IMPORTED FOR VOICE AI
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

// --- Navigation Item Component ---
interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isActive }) => {
  const baseClasses = "flex items-center p-3 rounded-lg transition-colors duration-200";
  const activeClasses = "bg-[var(--color-primary)] text-[var(--color-navy-dark)] font-semibold shadow-premium-md";
  const inactiveClasses = "text-gray-300 hover:bg-[var(--color-navy-light)] hover:text-white";

  return (
    <Link href={href}>
      <div className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
        <Icon className="w-6 h-6 mr-3" />
        <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
};

// --- Main Sidebar Component ---

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { 
      href: '/dashboard', 
      icon: ChartBarSquareIcon, 
      label: 'Operational Dashboard', 
      match: '/dashboard' 
    },
    // Updated: Automations now links to Voice AI config page and uses MicrophoneIcon
    { 
      href: '/automations', 
      icon: MicrophoneIcon, 
      label: 'AI Voice Receptionist', 
      match: '/automations' 
    },
    // New page link for Client Integrity
    { 
      href: '/settings/integrity', 
      icon: ShieldCheckIcon, 
      label: 'Experience Integrity', 
      match: '/settings/integrity' 
    },
    { 
      href: '/settings/billing', 
      icon: WalletIcon, 
      label: 'Billing & Subscription', 
      match: '/settings/billing' 
    },
    { 
      href: '/settings', 
      icon: Cog6ToothIcon, 
      label: 'Account Settings', 
      match: '/settings' 
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[var(--color-navy)] text-white flex flex-col p-6 shadow-premium-xl">
      
      {/* Logo / Title */}
      <div className="mb-10 pt-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-primary)]">
            SARA.AI
        </h2>
        <p className="text-xs text-gray-500 mt-1">Command Center</p>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname.startsWith(item.match)}
          />
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="border-t border-[var(--color-navy-light)] pt-6">
        <Link href="/login">
          <div className="flex items-center p-3 rounded-lg text-gray-400 hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200">
            <ArrowLeftOnRectangleIcon className="w-6 h-6 mr-3" />
            <span className="text-sm">Logout</span>
          </div>
        </Link>
        <p className="text-xs text-gray-600 mt-4">
            Version 1.0.0
        </p>
      </div>
    </aside>
  );
}
