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
  CheckIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [demoPhone, setDemoPhone] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false); // Estado para el checkbox

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitud recibida. ALEX llamará al ${demoPhone} en breve.`);
  };

  const handleSubscription = () => {
    if (!acceptedTerms) {
      alert("Por favor, acepta los términos y condiciones antes de continuar.");
      return;
    }
    // Aquí rediriges a tu Stripe Checkout
    window.location.href = "TU_URL_DE_STRIPE_CHECKOUT";
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

      {/* --- HERO SECTION --- (Se mantiene igual) */}
      <header className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[120px] rounded-full opacity-50" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-8 uppercase tracking-widest text-white">
            <CheckBadgeIcon className="w-4 h-4" /> La Nueva Era de la Voz con IA
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            SARA atiende.<br />ALEX vende.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Automatiza tu recepción y tus ventas salientes con agentes de voz inteligentes entrenados con el contenido de tu web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding" className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 text-white">
              Configurar mis Agentes
            </Link>
            <Link href="#demo" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all text-white">
              Ver Demo en Vivo
            </Link>
          </div>
        </div>
      </header>

      {/* --- NUEVA SECCIÓN DE PRECIOS: STARTER PRO 500+500 --- */}
      <section id="pricing" className="py-32 border-t border-white/5 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-md mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-4">Planes para Fundadores</h2>
            <p className="text-gray-400 text-sm">Oferta limitada a los primeros 100 clientes de Sahjony LLC.</p>
          </div>

          <div className="max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative bg-slate-900 ring-1 ring-white/10 rounded-3xl p-10 text-left">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                +500 Minutos Bono (Founding 100)
              </div>

              <div className="flex justify-between items-center mb-6 pt-2">
                <h3 className="text-xl font-bold">Starter Pro</h3>
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Bono Activo</span>
              </div>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-extrabold">$399</span>
                <span className="text-gray-400">/mes</span>
              </div>

              <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Capacidad Total</span>
                  <span className="text-cyan-400 font-bold">1,000 Minutos</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 w-full h-full" />
                </div>
                <p className="text-[10px] text-gray-500 mt-2 italic text-center text-white">500 Base + 500 Bono de Fundador</p>
              </div>

              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <CheckIcon className="w-5 h-5 text-cyan-500 shrink-0" /> SARA (Inbound) y ALEX (Outbound)
                </li>
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <CheckIcon className="w-5 h-5 text-cyan-500 shrink-0" /> Entrenamiento con URL Ilimitado
                </li>
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <CheckIcon className="w-5 h-5 text-cyan-500 shrink-0" /> Notificaciones VIP por WhatsApp
                </li>
              </ul>

              <button 
                onClick={handleSubscription}
                className={`w-full py-4 rounded-xl font-black text-lg transition-all uppercase tracking-tight ${acceptedTerms ? 'bg-cyan-500 hover:bg-cyan-400 text-[#000814]' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
              >
                Obtener 1,000 Minutos
              </button>

              {/* CHECKBOX LEGAL */}
              <div className="mt-6 flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-cyan-500" 
                />
                <label htmlFor="terms" className="text-[10px] text-gray-500 leading-tight">
                  Acepto los <Link href="/terms" className="underline hover:text-cyan-400">Términos de Servicio</Link> y la <Link href="/privacy" className="underline hover:text-cyan-400">Política de Privacidad</Link> de FrontDesk Agents LLC.
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- EL RESTO DE TUS SECCIONES (Agents, Enterprise, Trust, Demo, Footer) --- */}
      {/* ... copia aquí el resto del código que ya tenías ... */}

    </div>
  );
}
