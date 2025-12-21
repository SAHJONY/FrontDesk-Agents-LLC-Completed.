'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UserGroupIcon, 
  PhoneArrowUpRightIcon, 
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  SparklesIcon,
  Bars3Icon,
  Square3Stack3DIcon, // Icon for Portal
  IdentificationIcon // Alternative for Profile
} from '@heroicons/react/24/outline';

/* ======================================================================
   FRONTDESK NAVIGATION CONFIG
   ====================================================================== */
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Client Portal', href: '/portal', icon: Square3Stack3DIcon }, // New Client Entry
  { name: 'Agentes IA', href: '/agents', icon: SparklesIcon },
  { name: 'Llamadas', href: '/calls', icon: PhoneArrowUpRightIcon },
  { name: 'Perfil', href: '/profile', icon: IdentificationIcon },
  { name: 'Configuración', href: '/settings', icon: Cog6ToothIcon },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#000814] text-white flex overflow-hidden font-sans">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-[#000814] fixed h-full z-40">
        {/* Branding Area */}
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <SparklesIcon className="w-5 h-5 text-[#000814]" />
          </div>
          <div>
            <span className="block text-sm font-black uppercase tracking-tighter italic leading-none">FrontDesk</span>
            <span className="text-[8px] font-bold text-cyan-500/60 uppercase tracking-[0.3em]">Agents Pro</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 group ${
                  isActive 
                    ? 'bg-cyan-500 text-[#000814] shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#000814]' : 'group-hover:text-cyan-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="p-4 border-t border-white/5 bg-black/20">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all">
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* --- MOBILE HEADER --- */}
      <header className="lg:hidden fixed top-0 w-full h-16 bg-[#000814]/90 backdrop-blur-md border-b border-white/5 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-cyan-500" />
          <span className="text-xs font-black uppercase italic tracking-tighter">FrontDesk</span>
        </div>
        <button className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>
      </header>

      {/* --- MAIN CONTENT CANVAS --- */}
      <main className="flex-1 w-full lg:ml-64 relative min-h-screen overflow-y-auto">
        {/* Background Glow Effect */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[140px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        
        {/* Page Content Container */}
        <div className="max-w-7xl mx-auto p-6 md:p-10 pt-24 lg:pt-10">
          {children}
        </div>
      </main>

    </div>
  );
}
