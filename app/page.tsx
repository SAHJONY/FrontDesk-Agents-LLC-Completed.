'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PhoneIcon, 
  SparklesIcon, 
  ClockIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [demoPhone, setDemoPhone] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    // Esta función disparará a ALEX para una llamada de prueba
    alert(`Solicitud recibida. ALEX llamará al ${demoPhone} en breve para tu demostración.`);
  };

  return (
    <div className="min-h-screen bg-[#000814] text-white selection:bg-cyan-500/30">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#000814]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-[#000814]" />
            </div>
            <span className="text-xl font-bold tracking-tighter">FrontDesk Agents</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <Link href="#agents" className="hover:text-cyan-400 transition-colors">Agentes</Link>
            <Link href="#enterprise" className="hover:text-cyan-400 transition-colors">Enterprise</Link>
            <Link href="#pricing" className="hover:text-cyan-400 transition-colors">Precios</Link>
          </div>
          <Link href="/dashboard">
            <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-sm font-semibold">
              Dashboard
            </button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[120px] rounded-full opacity-50" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-8 uppercase tracking-widest">
            <CheckBadgeIcon className="w-4 h-4" /> La Nueva Era de la Voz con IA
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            SARA atiende.<br />ALEX vende.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Automatiza tu recepción y tus ventas salientes con agentes de voz inteligentes entrenados con el contenido de tu web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding" className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20">
              Configurar mis Agentes
            </Link>
            <Link href="#demo" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all">
              Ver Demo en Vivo
            </Link>
          </div>
        </div>
      </header>

      {/* --- THE AGENTS SECTION --- */}
      <section id="agents" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* SARA */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 group hover:border-cyan-500/50 transition-all">
              <PhoneIcon className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">SARA: Recepción 24/7</h3>
              <p className="text-gray-400 mb-6">Inbound Agent especializada en servicio al cliente, citas y FAQ directo desde tu sitio web.</p>
              <div className="p-3 rounded-lg bg-white/5 font-mono text-xs text-cyan-300 border border-cyan-500/20">
                Línea Activa: +1 (216) 480-4413
              </div>
            </div>
            {/* ALEX */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 group hover:border-purple-500/50 transition-all">
              <MegaphoneIcon className="w-12 h-12 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">ALEX: Sales & Growth</h3>
              <p className="text-gray-400 mb-6">Outbound Agent diseñado para cerrar ventas, recuperar leads y realizar campañas masivas.</p>
              <div className="p-3 rounded-lg bg-white/5 font-mono text-xs text-purple-300 border border-purple-500/20">
                Línea Activa: +1 (346) 521-4387
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORPORATE / ENTERPRISE SECTION --- */}
      <section id="enterprise" className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video md:aspect-[21/9]">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=90&fit=crop" 
              className="w-full h-full object-cover opacity-60" 
              alt="HQ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Soluciones Enterprise</h2>
              <p className="text-gray-300 max-w-xl">Escalabilidad global para corporaciones con despliegue de 1,000+ agentes simultáneos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST & TESTIMONIALS --- */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 mb-20 opacity-30 grayscale contrast-200">
            <span className="text-2xl font-bold">TECHCORP</span>
            <span className="text-2xl font-bold">GLOBAL LOGISTICS</span>
            <span className="text-2xl font-bold">NEXUS HEALTH</span>
            <span className="text-2xl font-bold">PRIME ESTATE</span>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { q: "SARA ha transformado nuestra recepción. Cero llamadas perdidas.", a: "Dr. Wilson", r: "Nexus Health" },
              { q: "ALEX incrementó las ventas en un 40% en un solo mes.", a: "S. Jenkins", r: "TechCorp VP" },
              { q: "La IA conoce mi web mejor que mis propios empleados.", a: "M. Chen", r: "CEO Global" }
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#000814] border border-white/5">
                <div className="flex gap-1 mb-4 text-yellow-500"><SparklesIcon className="w-4 h-4 fill-current"/> <SparklesIcon className="w-4 h-4 fill-current"/> <SparklesIcon className="w-4 h-4 fill-current"/></div>
                <p className="text-gray-300 italic mb-6">"{t.q}"</p>
                <p className="font-bold">{t.a}</p>
                <p className="text-xs text-cyan-500 uppercase tracking-widest">{t.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DEMO CTA SECTION --- */}
      <section id="demo" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto rounded-3xl bg-cyan-600 p-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600">
            <div className="bg-[#000814] rounded-[22px] p-8 md:p-16 text-center">
              <h2 className="text-4xl font-bold mb-8">¿Quieres hablar con ALEX ahora?</h2>
              <form onSubmit={handleDemoRequest} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="tel" 
                  placeholder="Tu teléfono (ej. +1...)" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-cyan-500 outline-none transition-all"
                  value={demoPhone}
                  onChange={(e) => setDemoPhone(e.target.value)}
                  required
                />
                <button type="submit" className="bg-white text-[#000814] font-bold px-8 py-4 rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
                  <PlayCircleIcon className="w-5 h-5" /> Llamar
                </button>
              </form>
              <p className="text-gray-500 mt-6 text-sm">Recibirás una llamada de ALEX (+1 346 521-4387) en segundos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>© 2025 FrontDesk Agents LLC. Operando globalmente con IA de voz.</p>
      </footer>
    </div>
  );
}
