'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { languages, defaultLanguage } from './config/languages';

// Optimized imports
import SparklesIcon from '@heroicons/react/24/outline/SparklesIcon';
import CheckBadgeIcon from '@heroicons/react/24/outline/CheckBadgeIcon';
import ShieldCheckIcon from '@heroicons/react/24/outline/ShieldCheckIcon';
import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#000814] text-white selection:bg-cyan-500/30 font-sans">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#000814]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-[#000814]" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase">FrontDesk Agents</span>
          </div>
          <Link href="/dashboard">
            <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest text-white">
              Client Portal
            </button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION WITH PREMIUM IMAGE --- */}
      <header className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
        {/* Cinematic Background Image */}
        <Image 
          src="/premium/hero-cinematic.jpg" 
          alt="Hero cinematic — FrontDesk Agents" 
          fill
          priority
          className="object-cover opacity-40 z-0"
        />
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000814] via-transparent to-[#000814] z-[1]" />

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black mb-8 uppercase tracking-[0.3em]">
            <CheckBadgeIcon className="w-4 h-4" /> La Nueva Era de la Voz con IA
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent italic leading-[0.85]">
            SARA ATIENDE.<br />ALEX VENDE.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium">
            Automatiza tu recepción y tus ventas salientes con agentes de voz inteligentes entrenados personalmente con el contenido de tu web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#pricing" className="px-10 py-5 bg-cyan-600 hover:bg-cyan-500 rounded-2xl font-black transition-all shadow-xl shadow-cyan-500/20 text-white uppercase tracking-tight text-sm">
              Aplicar para Early Access
            </Link>
          </div>
        </div>
      </header>

      {/* --- AGENTS SECTION WITH COMPOSITE IMAGES --- */}
      <section id="agents" className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* SARA: Using Team Composite Image */}
            <div className="relative group overflow-hidden rounded-[40px] border border-white/5 bg-slate-900 shadow-2xl">
              <div className="h-64 relative">
                <Image 
                  src="/premium/team/agents-grid.jpg" 
                  alt="Sara Receiving" 
                  fill 
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-10 relative">
                <h3 className="text-3xl font-black mb-4 uppercase italic text-cyan-400">SARA: Recepción</h3>
                <p className="text-gray-400 mb-8 font-medium">Inbound Agent especializada en servicio al cliente, agendamiento de citas y FAQ directo desde tu sitio web.</p>
                <div className="p-3 rounded-lg bg-white/5 font-mono text-[10px] text-cyan-300 border border-cyan-500/20 uppercase tracking-widest text-center">
                  Línea Activa: +1 (216) 480-4413
                </div>
              </div>
            </div>

            {/* ALEX: Using Agents Grid Image */}
            <div className="relative group overflow-hidden rounded-[40px] border border-white/5 bg-slate-900 shadow-2xl">
              <div className="h-64 relative">
                <Image 
                  src="/premium/command-center-dark.jpg" 
                  alt="Alex Sales" 
                  fill 
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-10 relative">
                <h3 className="text-3xl font-black mb-4 uppercase italic text-purple-400">ALEX: Ventas</h3>
                <p className="text-gray-400 mb-8 font-medium">Outbound Agent diseñado para cerrar ventas, recuperar leads y realizar campañas masivas de prospección.</p>
                <div className="p-3 rounded-lg bg-white/5 font-mono text-[10px] text-purple-300 border border-purple-500/20 uppercase tracking-widest text-center">
                  Línea Activa: +1 (346) 521-4387
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="flex justify-center gap-2 mb-6 grayscale opacity-50">
           <ShieldCheckIcon className="w-5 h-5 text-cyan-500" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">FrontDesk Agents LLC Data Protection</span>
        </div>
        <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold">
          © 2025 FrontDesk Agents LLC. <br />
          <span className="text-gray-500">J. Gonzalez | Frontdeskllc@outlook.com</span>
        </p>
      </footer>
    </div>
  );
}
