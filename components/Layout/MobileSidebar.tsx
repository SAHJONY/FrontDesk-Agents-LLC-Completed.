"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Settings, BarChart3, ShieldHalf, PhoneCall, DollarSign, Plug, LifeBuoy } from 'lucide-react';

const navItems = [
    { href: '/dashboard', icon: BarChart3, label: 'Global Command Center' },
    { href: '/admin/compliance-center', icon: ShieldHalf, label: 'Compliance & Risk' },
    { href: '/client/call-log', icon: PhoneCall, label: 'Call Log & Audit' },
    { href: '/settings/general', icon: Settings, label: 'Configuration Hub' }, 
    { href: '/settings/integrations-hub', icon: Plug, label: 'Integration Hub' },
    { href: '/settings/billing', icon: DollarSign, label: 'Billing & Plans' },
    { href: '/support', icon: LifeBuoy, label: 'Concierge Support' },
];

const SidebarContent = () => (
    <div className="text-xl font-extrabold text-cyan-400 mb-8 tracking-wider">
        FrontDesk Agents
    </div>
);

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón de Hamburguesa (Visible solo en móvil/sm) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 p-2 lg:hidden text-white bg-gray-800 rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar - Fija y Oculta por defecto en escritorio, controlada por estado en móvil */}
      {/* En desktop (lg:), mantiene el comportamiento fijo y siempre visible */}
      <nav 
        className={`
          fixed h-full bg-[#10213A] border-r border-gray-800 p-4 pt-16 z-30 
          w-64 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:w-64 lg:pt-10 lg:block
        `}
      >
        <SidebarContent />
        <ul>
            {navItems.map((item) => (
            <li key={item.href} className="mb-2">
                <Link 
                    href={item.href} 
                    className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-cyan-900/50 transition duration-150"
                    onClick={() => setIsOpen(false)} // Cerrar al navegar
                >
                    <item.icon className="w-5 h-5 mr-3 text-cyan-400" />
                    <span className="font-medium">{item.label}</span>
                </Link>
            </li>
            ))}
        </ul>
      </nav>

      {/* Overlay Oscuro para móvil cuando el menú está abierto */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
        />
      )}
    </>
  );
};
