'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PhoneIcon, 
  SparklesIcon, 
  ShieldCheckIcon,
  PlayCircleIcon,
  CheckBadgeIcon,
  MegaphoneIcon,
  CheckIcon,
  EnvelopeIcon // Añadido para el botón de email
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [demoPhone, setDemoPhone] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitud recibida. ALEX llamará al ${demoPhone} en breve.`);
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
            <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-sm font-semibold text-white">
              Dashboard
            </button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-40 pb-20 px-6 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[120px] rounded-full opacity-50" />
        <div className="container mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-8 uppercase tracking-widest">
            <CheckBadgeIcon className="w-4 h-4" /> La Nueva Era de la Voz con IA
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent italic">
            SARA atiende.<br />ALEX vende.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Automatiza tu recepción y tus ventas salientes con agentes de voz inteligentes entrenados con el contenido de tu web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#pricing" className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 text-white uppercase tracking-tighter">
              Aplicar para los 1,000 Minutos
            </Link>
            <Link href="#demo" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all text-white">
              Ver Demo en Vivo
            </Link>
          </div>
        </div>
      </header>

      {/* --- SECCIÓN DE CAMPAÑA: LISTA DE ESPERA (REEMPLAZA PRICING ANTERIOR) --- */}
      <section id="pricing" className="py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto p-12 bg-slate-900/80 border-2 border-cyan-500/30 rounded-[40px] text-center backdrop-blur-xl shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase mb-8 tracking-[0.3em]">
              Fase 1: Exclusive Early Access
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Solo 25 Empresas Pioneras.
            </h2>
            
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Estamos seleccionando a los primeros 25 negocios para implementar a <span className="text-white font-bold underline decoration-cyan-500/50">SARA y ALEX</span> con el beneficio vitalicio de <span className="text-cyan-400 font-bold underline decoration-2 underline-offset-4">1,000 minutos mensuales</span> por solo $399.
            </p>

            <div className="space-y-6">
              <p className="text-sm text-slate-300 uppercase font-bold tracking-widest">Para aplicar, envía un email ahora:</p>
              
              <a 
                href="mailto:Sahjonyllc@outlook.com?subject=Aplicación%20Lista%20de%20Espera%20-%20FrontDesk%20Agents&body=Hola%20J.%20Gonzalez,%20me%20interesa%20ser%20uno%20de%20los%20primeros%2025%20en%20automatizar%20mi%20negocio.%20Mi%20nombre%20es:%20"
                className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <EnvelopeIcon className="w-6 h-6" /> APLICAR VÍA EMAIL →
              </a>
            </div>

            <p className="mt-10 text-[10px] text-gray-500 uppercase tracking-widest leading-loose">
              Atendido personalmente por J. Gonzalez <br />
              <span className="text-gray-400">Sahjonyllc@outlook.com</span>
            </p>
          </div>
        </div>
      </section>

      {/* --- RESTO DE LAS SECCIONES (SARA, ALEX, ENTERPRISE, DEMO) --- */}
      {/* ... aquí mantienes tus secciones de agentes y testimonios ... */}

      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>© 2025 FrontDesk Agents LLC. J. Gonzalez | Sahjonyllc@outlook.com</p>
      </footer>
    </div>
  );
}
