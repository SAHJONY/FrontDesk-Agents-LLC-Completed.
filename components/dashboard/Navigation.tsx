"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Phone,
  Users,
  Settings,
  LogOut,
  ShieldCheck
} from 'lucide-react';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Component: Secure Navigation
 * Logic: 1.0 Global Parity
 */

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Active Agents', href: '/agents', icon: Users },
  { name: 'Revenue Feed', href: '/revenue', icon: Phone },
  { name: 'System Settings', href: '/settings', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full bg-zinc-950 border-r border-white/5 p-4 w-64">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="p-2 bg-brand-cyan/10 rounded-lg">
          <ShieldCheck className="w-5 h-5 text-brand-cyan" />
        </div>
        <span className="font-black uppercase tracking-tighter text-sm italic">
          FrontDesk Agents
        </span>
      </div>

      <div className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive 
                  ? 'bg-brand-cyan/10 text-brand-cyan' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="pt-4 border-t border-white/5">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-xl text-xs font-bold text-zinc-500 hover:text-red-400 hover:bg-red-400/5 transition-all">
          <LogOut className="w-4 h-4" />
          Disconnect Node
        </button>
      </div>
    </nav>
  );
}
