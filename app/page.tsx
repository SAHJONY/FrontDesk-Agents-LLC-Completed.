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
  EnvelopeIcon 
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [demoPhone, setDemoPhone] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitud recibida. ALEX llamará al ${demoPhone} en breve para tu demostración.`);
  };

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
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 uppercase tracking-widest">
            <Link href="#agents" className="hover:text-cyan-400 transition-colors text-xs">Agentes</Link>
            <Link href="#enterprise" className="hover:text-cyan-400 transition-colors text-xs">Enterprise</Link>
            <Link href="#pricing" className="text-cyan-400 font-bold text-xs">Fase 1: Early Access</Link>
          </div>
          <Link href="/dashboard">
            <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest text-white">
              Client Portal
            </button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-48 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-cyan-500/10 blur-[120px] rounded-full opacity-50" />
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
            <Link href="#demo" className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black transition-all text-white uppercase tracking-tight text-sm">
              Probar Demo
            </Link>
          </div>
        </div>
      </header>

      {/* --- EARLY ACCESS SECTION (REEMPLAZA PRICING) --- */}
      <section id="pricing" className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto p-12 bg-slate-900/80 border-2 border-cyan-500/30 rounded-[40px] text-center backdrop-blur-xl shadow-2xl relative">
            
            {/* Tag de Escasez Real */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-black animate-pulse"></span>
              Solo 25 Cupos Disponibles
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase mb-8 tracking-[0.3em]">
              Fase 1: Founders Circle
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight italic">
              25 PIONEROS.<br />1,000 MINUTOS.
            </h2>
            
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Estamos seleccionando a los primeros <span className="text-white font-bold">25 negocios</span> para implementar a SARA y ALEX con el beneficio vitalicio de <span className="text-cyan-400 font-bold underline decoration-2 underline-offset-4">1,000 MIN/MES</span> por solo $399.
            </p>

            <div className="space-y-6">
              <p className="text-xs text-slate-300 uppercase font-bold tracking-widest">Para aplicar, envía un email ahora:</p>
              
              <a 
                href="mailto:Frontdeskllc@outlook.com?subject=Aplicación%20Lista%20de%20Espera%20-%20FrontDesk%20Agents&body=Hola%20J.%20Gonzalez,%20me%20interesa%20ser%20uno%20de%20los%20primeros%2025%20en%20automatizar%20mi%20negocio.%20Mi%20nombre%20es:%20"
                className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-12 py-6 bg-white text-black font-black rounded-3xl hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.15)] uppercase tracking-tighter text-lg"
              >
                <EnvelopeIcon className="w-6 h-6" /> APLICAR VÍA EMAIL →
              </a>
            </div>

            <p className="mt-10 text-[10px] text-gray-500 uppercase tracking-widest leading-loose">
              Atendido personalmente por J. Gonzalez <br />
              <span className="text-gray-400 font-mono">Frontdeskllc@outlook.com</span>
            </p>
          </div>
        </div>
      </section>

      {/* --- AGENTS SECTION --- */}
      <section id="agents" className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* SARA */}
            <div className="p-10 rounded-[32px] bg-slate-900 border border-white/5 group hover:border-cyan-500/50 transition-all shadow-xl">
              <PhoneIcon className="w-12 h-12 text-cyan-400 mb-6 group-hover:rotate-12 transition-transform" />
              <h3 className="text-3xl font-black mb-4 uppercase italic">SARA: Recepción</h3>
              <p className="text-gray-400 mb-8 font-medium">Inbound Agent especializada en servicio al cliente, agendamiento de citas y FAQ directo desde tu sitio web.</p>
              <div className="p-3 rounded-lg bg-white/5 font-mono text-[10px] text-cyan-300 border border-cyan-500/20 uppercase tracking-widest">
                Línea Activa: +1 (216) 480-4413
              </div>
            </div>
            {/* ALEX */}
            <div className="p-10 rounded-[32px] bg-slate-900 border border-white/5 group hover:border-purple-500/50 transition-all shadow-xl">
              <MegaphoneIcon className="w-12 h-12 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-black mb-4 uppercase italic">ALEX: Ventas</h3>
              <p className="text-gray-400 mb-8 font-medium">Outbound Agent diseñado para cerrar ventas, recuperar leads y realizar campañas masivas de prospección.</p>
              <div className="p-3 rounded-lg bg-white/5 font-mono text-[10px] text-purple-300 border border-purple-500/20 uppercase tracking-widest">
                Línea Activa: +1 (346) 521-4387
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE --- */}
      <section id="enterprise" className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[40px] overflow-hidden border border-white/10 aspect-video md:aspect-[21/9] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=90&fit=crop" 
              className="w-full h-full object-cover opacity-40 grayscale" 
              alt="Global Operations"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-[#000814]/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase italic italic tracking-tighter">Soluciones Enterprise</h2>
              <p className="text-gray-300 max-w-xl font-medium">Escalabilidad global para corporaciones con despliegue masivo de agentes y seguridad de datos AES-256.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DEMO --- */}
      <section id="demo" className="py-32 relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">Prueba la potencia de ALEX</h2>
          <form onSubmit={handleDemoRequest} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="tel" 
              placeholder="Número de teléfono (+1...)" 
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-cyan-500 outline-none transition-all font-mono text-sm"
              value={demoPhone}
              onChange={(e) => setDemoPhone(e.target.value)}
              required
            />
            <button type="submit" className="bg-white text-black font-black px-8 py-4 rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest">
              <PlayCircleIcon className="w-5 h-5" /> Llamarme Ahora
            </button>
          </form>
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
