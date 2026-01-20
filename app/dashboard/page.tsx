"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getPageHero } from "@/lib/siteImages";
import { 
  PhoneCall, 
  CalendarCheck, 
  TrendingUp, 
  Loader2, 
  Zap, 
  Activity,
  ArrowUpRight
} from "lucide-react";

// Componentes del Protocolo
import { UsageStatus } from "@/components/dashboard/UsageStatus"; 
import { useAccountMetrics } from "@/hooks/useAccountMetrics";

export default function DashboardPage() {
  const hero = getPageHero("dashboard");
  const { metrics, isLoading } = useAccountMetrics();

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* HEADER DE COMANDO */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`h-2 w-2 rounded-full ${isLoading ? 'bg-slate-600' : 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)] animate-pulse'}`} />
            <p className="text-[10px] font-black tracking-[0.3em] text-sky-400 uppercase">
              {isLoading ? 'Sincronizando Protocolo...' : 'Nodo Activo • Live Monitoring'}
            </p>
          </div>
          {hero && (
            <>
              <h1 className="text-3xl font-black text-slate-50 tracking-tighter italic uppercase">
                {hero.title}
              </h1>
              <p className="max-w-xl text-sm text-slate-400 italic font-medium">
                {hero.description}
              </p>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/outbound"
            className="group flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-100 hover:border-sky-500 hover:bg-sky-500/5 transition-all"
          >
            <Zap className="w-3 h-3 text-sky-400" />
            Campañas Outbound
          </Link>
          <button
            className="group flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[10px] font-black uppercase tracking-widest text-black hover:bg-sky-400 transition-all"
          >
            Configurar Agente
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* FILA DE INFRAESTRUCTURA Y VISUAL */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Widget de Control de Uso */}
        <div className="lg:col-span-5 xl:col-span-4">
          <UsageStatus 
            tier={metrics.tier} 
            usedMins={metrics.usedMins} 
            maxMins={metrics.maxMins} 
            status={isLoading ? "LOADING" : "ACTIVE"} 
          />
        </div>

        {/* Visual de Sistema */}
        <div className="lg:col-span-7 xl:col-span-8 relative rounded-3xl border border-slate-800 overflow-hidden group min-h-[240px]">
          {hero && (
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full bg-black/60 backdrop-blur-xl px-4 py-2 border border-white/10">
            <Activity className="w-4 h-4 text-sky-400" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Protocolo: Óptimo • Latencia: 142ms</span>
          </div>
        </div>
      </div>

      {/* GRID DE MÉTRICAS DE IMPACTO */}
      <section className="grid gap-6 md:grid-cols-3">
        {/* Llamadas Respondidas */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="group rounded-3xl border border-slate-800 bg-slate-900/30 p-8 transition-all hover:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Atención Hoy</p>
            <PhoneCall className="w-5 h-5 text-slate-700 group-hover:text-sky-400 transition-colors" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-black text-slate-50 tracking-tighter">
              {isLoading ? <Loader2 className="w-8 h-8 animate-spin text-slate-800" /> : metrics.answeredToday}
            </p>
          </div>
          <p className="mt-3 text-[11px] text-slate-500 font-medium leading-relaxed uppercase italic">
            Llamadas gestionadas por <span className="text-sky-500/80">nodos autónomos</span>.
          </p>
        </motion.div>

        {/* Citas Agendadas */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="group rounded-3xl border border-slate-800 bg-slate-900/30 p-8 transition-all hover:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Conversión Directa</p>
            <CalendarCheck className="w-5 h-5 text-slate-700 group-hover:text-emerald-400 transition-colors" />
          </div>
          <p className="text-4xl font-black text-slate-50 tracking-tighter">
            {isLoading ? "..." : metrics.appointmentsBooked}
          </p>
          <p className="mt-3 text-[11px] text-slate-500 font-medium leading-relaxed uppercase italic">
            Citas sincronizadas al <span className="text-emerald-500/80">calendario central</span>.
          </p>
        </motion.div>

        {/* Pipeline de Ingresos (El "Why" del producto) */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="group rounded-3xl border border-sky-500/30 bg-sky-500/[0.03] p-8 transition-all hover:border-sky-500/50"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-sky-400 uppercase font-black tracking-widest italic">Revenue Pipeline</p>
            <TrendingUp className="w-5 h-5 text-sky-400" />
          </div>
          <p className="text-4xl font-black text-sky-300 italic tracking-tighter">
            ${isLoading ? "0" : metrics.estimatedPipeline.toLocaleString()}
          </p>
          <p className="mt-3 text-[11px] text-sky-700 font-black leading-relaxed uppercase tracking-tighter">
            ROI Estimado basado en captación de leads.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
