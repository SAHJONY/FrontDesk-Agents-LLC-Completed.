'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Phone, 
  CreditCard, 
  Calendar, 
  ArrowRight, 
  ArrowLeft,
  Brain,
  Building2,
  Check,
  Mic,
  Zap
} from "lucide-react";
import { getPageHero } from "@/lib/siteImages";

const STEPS = [
  { id: 1, name: "Identidad", icon: Building2 },
  { id: 2, name: "Protocolo", icon: Brain },
  { id: 3, name: "CRM Sync", icon: Calendar },
  { id: 4, name: "Activación", icon: CreditCard },
];

export default function SetupPage() {
  const hero = getPageHero("setup");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "medical",
    knowledge: "",
    voice: "female"
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-2 block">Nombre del Negocio</label>
              <input 
                type="text" 
                placeholder="Ej. Clínica Dental Avanzada"
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white focus:border-sky-500 outline-none transition-all"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-2 block">Sector Industrial</label>
              <select 
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white focus:border-sky-500 outline-none appearance-none"
                value={formData.industry}
                onChange={(e) => setFormData({...formData, industry: e.target.value})}
              >
                <option value="medical">Médico / Salud</option>
                <option value="legal">Legal / Corporativo</option>
                <option value="realestate">Bienes Raíces</option>
                <option value="services">Servicios Técnicos</option>
              </select>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-2 block">Base de Conocimientos (Prompt)</label>
              <textarea 
                placeholder="Describe cómo debe actuar tu IA, horarios, precios y qué debe hacer si no sabe una respuesta..."
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white focus:border-sky-500 outline-none h-32 resize-none"
                value={formData.knowledge}
                onChange={(e) => setFormData({...formData, knowledge: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setFormData({...formData, voice: 'female'})}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.voice === 'female' ? 'border-sky-500 bg-sky-500/10' : 'border-slate-800 bg-slate-900/40'}`}
              >
                <Mic className={formData.voice === 'female' ? 'text-sky-400' : 'text-slate-500'} />
                <span className="text-[10px] font-bold uppercase">Voz Femenina</span>
              </button>
              <button 
                onClick={() => setFormData({...formData, voice: 'male'})}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.voice === 'male' ? 'border-sky-500 bg-sky-500/10' : 'border-slate-800 bg-slate-900/40'}`}
              >
                <Mic className={formData.voice === 'male' ? 'text-sky-400' : 'text-slate-500'} />
                <span className="text-[10px] font-bold uppercase">Voz Masculina</span>
              </button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-sky-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Integración de Calendario</h3>
              </div>
              <p className="text-xs text-slate-400 mb-6 italic leading-relaxed">
                El sistema detectará automáticamente tus huecos libres en Google Calendar o HubSpot para agendar citas sin errores.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold uppercase">Google Calendar</span>
                  <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 opacity-50">
                  <span className="text-[10px] font-bold uppercase">GoHighLevel (Próximamente)</span>
                  <Zap size={12} />
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
            <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-sky-500/50">
              <CreditCard className="text-sky-400" />
            </div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Protocolo Listo</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-8">Suscripción: $499/mes • Nodo Profesional</p>
            <button className="w-full rounded-full bg-sky-500 py-5 text-sm font-black text-slate-950 hover:bg-sky-400 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              ACTIVAR INFRAESTRUCTURA <ArrowRight size={18} />
            </button>
            <p className="mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">Pago seguro vía Stripe · Cancelación en 1-clic</p>
          </motion.div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-sky-500/30">
      {/* NAVIGATION */}
      <nav className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent italic">
              FrontDesk Protocol
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-widest hidden sm:block">Status: Deployment Ready</span>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-10 lg:px-8">
        <header className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/5 mb-4">
            <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.2em]">Configuración de Nodo v2.6</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white sm:text-5xl mb-4">
            Inicializar Infraestructura
          </h1>
          <p className="text-slate-400 text-sm max-w-xl italic">
            Configura tu agente autónomo, conecta tus calendarios y activa la captura de ingresos en menos de 5 minutos.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* LADO IZQUIERDO: STEPS & INDICATORS */}
          <div className="lg:col-span-1 space-y-8">
            <div className="relative space-y-6">
              {/* Vertical line connector */}
              <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-800 z-0" />
              
              {STEPS.map((step) => (
                <div key={step.id} className="relative z-10 flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-500 ${
                    currentStep >= step.id 
                    ? "bg-sky-500 border-sky-500 text-slate-950 shadow-[0_0_15px_rgba(14,165,233,0.4)]" 
                    : "bg-slate-900 border-slate-800 text-slate-500"
                  }`}>
                    <step.icon size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${currentStep >= step.id ? 'text-sky-400' : 'text-slate-600'}`}>
                      Paso 0{step.id}
                    </span>
                    <span className={`text-xs font-bold ${currentStep >= step.id ? 'text-white' : 'text-slate-500'}`}>
                      {step.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {hero && (
              <div className="hidden lg:block relative aspect-square rounded-2xl overflow-hidden border border-slate-800 group">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-1">Preview</p>
                  <p className="text-xs text-white italic">"Despliegue de nodo autónomo en región EU-West"</p>
                </div>
              </div>
            )}
          </div>

          {/* LADO DERECHO: WIZARD CONTENT */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <Zap size={20} className="text-slate-800" />
              </div>

              <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-12 flex items-center justify-between gap-4">
                {currentStep > 1 && currentStep < 4 && (
                  <button 
                    onClick={prevStep}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={14} /> Anterior
                  </button>
                )}
                
                {currentStep < 4 && (
                  <button 
                    onClick={nextStep}
                    className="flex-1 sm:flex-none ml-auto rounded-full bg-white px-8 py-4 text-[10px] font-black text-slate-950 hover:bg-sky-400 transition-all flex items-center justify-center gap-2 tracking-widest"
                  >
                    SIGUIENTE PASO
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* SECURITY BADGE */}
            <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
              <div className="flex items-center gap-2">
                <Check size={12} className="text-sky-400" />
                <span className="text-[8px] font-bold uppercase tracking-[0.2em]">SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} className="text-sky-400" />
                <span className="text-[8px] font-bold uppercase tracking-[0.2em]">PCI Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} className="text-sky-400" />
                <span className="text-[8px] font-bold uppercase tracking-[0.2em]">No Data Mining</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
