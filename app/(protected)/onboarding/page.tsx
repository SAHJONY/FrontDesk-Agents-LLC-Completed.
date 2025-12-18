"use client";

import React, { useState } from "react";
import { 
  UserIcon, 
  Cog6ToothIcon as SettingsIcon, 
  CheckBadgeIcon as CheckCircleIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

/* =========================
   Tipos
========================= */

interface Step {
  label: string;
  icon: React.ElementType;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

/* =========================
   Step Indicator (High-Tech Style)
========================= */

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => (
  <div className="flex justify-between items-center mb-12 w-full max-w-2xl mx-auto relative">
    {/* Línea de progreso de fondo */}
    <div className="absolute top-5 left-0 w-full h-[2px] bg-white/5 z-0" />
    
    {steps.map((step, index) => {
      const IconComponent = step.icon;
      const isActive = index <= currentStep;
      const isCurrent = index === currentStep;

      return (
        <div key={step.label} className="flex flex-col items-center z-10">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-500 ${
              isActive
                ? "bg-cyan-500 border-cyan-400 text-[#000814] shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                : "bg-slate-900 border-white/10 text-slate-500"
            } ${isCurrent ? "scale-110" : "scale-100"}`}
          >
            <IconComponent className="w-5 h-5" />
          </div>
          <span
            className={`mt-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${
              isActive ? "text-cyan-400" : "text-slate-600"
            }`}
          >
            {step.label}
          </span>
        </div>
      );
    })}
  </div>
);

/* =========================
   Main Onboarding Page
========================= */

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState({
    businessName: "",
    website: "",
    objective: "inbound", // inbound (SARA) o outbound (ALEX)
  });

  const steps: Step[] = [
    { label: "Perfil", icon: UserIcon },
    { label: "Configuración", icon: SettingsIcon },
    { label: "Finalizar", icon: CheckCircleIcon },
  ];

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-[#000814] text-white px-6 py-20 selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Configuración de Agentes</h1>
        <p className="text-slate-500 text-sm">Bienvenido a FrontDesk Agents, J. Gonzalez. Vamos a preparar a tus agentes.</p>
      </div>

      <StepIndicator currentStep={currentStep} steps={steps} />

      <div className="max-w-xl mx-auto bg-slate-900/50 border border-white/5 rounded-[32px] p-8 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Adorno visual */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full" />

        {/* CONTENIDO DE LOS PASOS */}
        <div className="relative z-10">
          {currentStep === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <UserIcon className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-tight">Información de Negocio</h2>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nombre de la Empresa</label>
                <input 
                  type="text" 
                  placeholder="Ej. Real Estate Experts"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-cyan-500 outline-none transition-all font-medium"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <GlobeAltIcon className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-tight">Entrenamiento de IA</h2>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">URL de tu Sitio Web (Cerebro de SARA)</label>
                <input 
                  type="url" 
                  placeholder="https://tuweb.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-cyan-500 outline-none transition-all font-medium"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <RocketLaunchIcon className="w-10 h-10 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight italic">¡Todo listo!</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                He recibido los datos de **{formData.businessName}**. En las próximas 2 horas, nuestros agentes procesarán tu sitio web y activaremos tus agentes SARA y ALEX.
              </p>
              <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                Estado: Procesando Información
              </div>
            </div>
          )}
        </div>

        {/* BOTONES DE NAVEGACIÓN */}
        <div className="flex justify-between mt-12 relative z-10">
          <button
            disabled={currentStep === 0}
            onClick={prevStep}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/5 text-slate-500 hover:text-white hover:bg-white/5 transition-all disabled:opacity-0"
          >
            <ArrowLeftIcon className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-widest">Atrás</span>
          </button>

          {currentStep < 2 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-black font-black hover:bg-cyan-400 transition-all uppercase tracking-widest text-xs"
            >
              Siguiente <ArrowRightIcon className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => window.location.href = "/dashboard"}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan-500 text-black font-black hover:bg-cyan-400 transition-all uppercase tracking-widest text-xs"
            >
              Ir al Dashboard
            </button>
          )}
        </div>
      </div>

      <footer className="mt-20 text-center">
         <p className="text-[10px] text-slate-600 uppercase tracking-[0.4em] font-bold">FrontDesk Agents LLC | Secure Onboarding</p>
      </footer>
    </div>
  );
}
