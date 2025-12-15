"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Settings, BarChart3, ShieldHalf, PhoneCall, DollarSign, Plug, LifeBuoy } from 'lucide-react';

const navItems = [
    // Rutas protegidas clave
    { href: '/dashboard', icon: BarChart3, label: 'Global Command Center' },
    { href: '/admin/compliance-center', icon: ShieldHalf, label: 'Compliance & Risk' },
    { href: '/client/call-log', icon: PhoneCall, label: 'Call Log & Audit' },
    { href: '/settings/general', icon: Settings, label: 'Configuration Hub' }, 
    { href: '/settings/integrations-hub', icon: Plug, label: 'Integration Hub' },
    { href: '/settings/billing', icon: DollarSign, label: 'Billing & Plans' },
    { href: '/support', icon: LifeBuoy, label: 'Concierge Support' },
];

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón de Hamburguesa (Visible solo en móvil/sm) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 p-2 lg:hidden text-white bg-[#10213A] border border-gray-700 rounded-lg shadow-xl"
      >
        {isOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6 text-cyan-400" />}
      </button>

      {/* Sidebar - Controlada por el estado 'isOpen' en móvil */}
      <nav 
        className={`
          fixed h-full bg-[#10213A] border-r border-gray-800 p-4 pt-16 z-30 
          w-64 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:w-64 lg:pt-10 lg:block
        `}
      >
        {/* Encabezado del menú */}
        <div className="text-xl font-extrabold text-cyan-400 mb-8 tracking-wider">
            FrontDesk Agents
        </div>
        
        {/* Items de Navegación */}
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

      {/* Overlay Oscuro (aparece solo en móvil cuando el menú está abierto) */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
        />
      )}
    </>
  );
};
