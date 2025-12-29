'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Elite Navigation & Command Side-Bar
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Phone,
  PhoneCall,
  Users,
  Settings,
  DollarSign,
  FileText,
  LogOut,
  Menu,
  X,
  Zap,
  ChevronRight
} from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic Navigation based on Permanent Pricing Tiers
  const navigation = [
    { name: 'Command Center', href: '/dashboard', icon: LayoutDashboard, show: true },
    { name: 'Fleet Numbers', href: '/dashboard/numbers', icon: Phone, show: true },
    { name: 'Active Campaigns', href: '/dashboard/campaigns', icon: PhoneCall, show: ['growth', 'elite'].includes(user?.tier || '') },
    { name: 'Logic Scripts', href: '/dashboard/scripts', icon: FileText, show: true },
    { name: 'Workforce', href: '/dashboard/team', icon: Users, show: ['professional', 'growth', 'elite'].includes(user?.tier || '') },
    { name: 'Revenue Audit', href: '/dashboard/revenue', icon: DollarSign, show: user?.tier === 'elite' },
    { name: 'System Config', href: '/dashboard/settings', icon: Settings, show: true },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Desktop Elite Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-black border-r border-zinc-900 z-50">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Brand Identity */}
          <div className="flex items-center h-24 px-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="ml-3">
              <span className="text-lg font-black tracking-tighter text-white uppercase italic">FrontDesk</span>
              <p className="text-[8px] font-mono text-blue-500 tracking-[0.3em] uppercase leading-none">Global Workforce</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 space-y-2 mt-4">
            {navigation.filter(item => item.show).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-zinc-900 border border-zinc-800 text-white shadow-xl shadow-black/50'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/40'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className={`mr-3 h-5 w-5 transition-colors ${
                    isActive(item.href) ? 'text-blue-500' : 'text-zinc-600 group-hover:text-zinc-400'
                  }`} />
                  <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
                </div>
                {isActive(item.href) && <ChevronRight className="w-3 h-3 text-blue-500" />}
              </Link>
            ))}
          </nav>

          {/* User & Tier Control */}
          <div className="p-6 mt-auto">
            <div className="glass-panel bg-zinc-900/50 border border-zinc-800 rounded-3xl p-5 mb-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xs">
                  {user?.fullName.charAt(0)}
                </div>
                <div className="ml-3 overflow-hidden">
                  <p className="text-xs font-black text-white truncate uppercase tracking-tighter">{user?.fullName}</p>
                  <div className="flex items-center mt-0.5">
                    <Zap className="w-2 h-2 text-blue-500 mr-1 fill-current" />
                    <span className="text-[9px] font-mono text-blue-500 uppercase tracking-widest font-bold">
                      {user?.tier} Member
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center px-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-black/40 hover:bg-red-500/10 hover:text-red-500 border border-zinc-800 rounded-xl transition-all"
              >
                <LogOut className="mr-2 h-3 w-3" />
                Disconnect Node
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Elite Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-900">
        <div className="flex items-center justify-between h-20 px-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="ml-3 text-sm font-black text-white uppercase tracking-tighter">FrontDesk</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Content Layout Adjuster */}
      <div className="lg:pl-72 min-h-screen bg-black">
        <div className="lg:pt-0 pt-20">
          {/* Page Content Rendered Here */}
        </div>
      </div>
    </>
  );
          }
