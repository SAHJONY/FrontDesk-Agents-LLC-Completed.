'use client';

import React from 'react';
import { 
  ClockIcon, 
  CalendarDaysIcon, 
  ChartBarIcon, 
  PhoneIcon,
  ArrowPathIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

// Nota: Se asume que los estilos 'glass-card' están definidos en globals.css
// Si usas Tailwind puro, puedes reemplazar glass-card con "bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl"

export default function DashboardPage() {
  // Simulación de datos (En producción vendrían de Supabase/Bland AI)
  const metrics = {
    appointmentsBooked: 24,
    conversionRate: 18.5,
    callsProcessed: 142,
    totalDurationHours: 12.4,
    abandonmentRate: 2.1,
    minutesUsed: 320,
    totalMinutes: 1000, // Reflejando el bono de fundador
  };

  const minutesRemaining = metrics.totalMinutes - metrics.minutesUsed;
  const usagePercentage = (metrics.minutesUsed / metrics.totalMinutes) * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-700"> 
      
      {/* --- SECCIÓN DE BIENVENIDA Y ESTADO DEL PLAN --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Banner de Bienvenida */}
        <div className="lg:col-span-2 relative rounded-[32px] overflow-hidden bg-slate-900 border border-white/5 shadow-2xl p-8 flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="Executive background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#000814] to-transparent" />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black mb-6 uppercase tracking-[0.2em]">
              <ShieldCheckIcon className="w-4 h-4" /> Acceso VIP Verificado
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter italic">
              COMMAND CENTER
            </h1>
            <p className="text-gray-400 font-medium max-w-md italic">
              Bienvenido, J. Gonzalez. Tus agentes SARA y ALEX están operando con máxima eficiencia.
            </p>
          </div>
        </div>

        {/* Card de Minutos (Bono de Fundador) */}
        <div className="bg-gradient-to-br from-slate-900 to-[#000814] border-2 border-cyan-500/30 rounded-[32px] p-8 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
             <SparklesIcon className="w-32 h-32 text-cyan-500" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  Plan Fundador
                </span>
                <span className="text-white/40 text-[10px] font-mono italic">REF: FD-25-VIP</span>
              </div>
              <p className="text-3xl font-black text-white italic">{minutesRemaining} <span className="text-sm not-italic font-medium text-gray-500 uppercase tracking-widest">Min Libres</span></p>
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                <span className="text-gray-400">Consumo Mensual</span>
                <span className="text-cyan-400">{metrics.minutesUsed} / {metrics.totalMinutes} MIN</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-cyan-600 to-blue-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
                  style={{ width: `${usagePercentage}%` }} 
                />
              </div>
              <p className="text-[9px] text-gray-500 mt-3 italic text-center">
                * Incluye Bono de 500 min por Early Access
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- MÉTRICAS PRIMARIAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={CalendarDaysIcon} 
          title="Citas Agendadas" 
          value={metrics.appointmentsBooked} 
          trend="+12% vs ayer"
          color="text-cyan-400"
        />
        <MetricCard 
          icon={ChartBarIcon} 
          title="Tasa de Conversión" 
          value={`${metrics.conversionRate}%`}
          trend="Superior al sector"
          color="text-purple-400"
        />
        <MetricCard 
          icon={PhoneIcon} 
          title="Llamadas Totales" 
          value={metrics.callsProcessed} 
          trend="Operación 24/7"
          color="text-emerald-400"
        />
        <MetricCard 
          icon={ClockIcon} 
          title="Tiempo Ahorrado" 
          value={`${metrics.totalDurationHours}h`} 
          trend="Enfoque en ventas"
          color="text-amber-400"
        />
      </div>

      {/* --- SECCIÓN DE ACTIVIDAD Y RENDIMIENTO --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Rendimiento AI */}
        <div className="bg-slate-900/50 border border-white/5 rounded-[32px] p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold italic uppercase tracking-tight">AI Agent Performance</h3>
            <ArrowTrendingUpIcon className="w-6 h-6 text-cyan-500" />
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-gray-400">Exactitud de Respuesta (SARA)</span>
                <span className="text-white">99.2%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '99.2%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-gray-400">Efectividad de Cierre (ALEX)</span>
                <span className="text-white">87.5%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '87.5%' }} />
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl overflow-hidden grayscale border border-white/10 opacity-40 h-32">
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" className="w-full h-full object-cover" alt="Analytics Graph" />
          </div>
        </div>

        {/* Flujo de Actividad */}
        <div className="bg-slate-900/50 border border-white/5 rounded-[32px] p-8 backdrop-blur-sm">
          <h3 className="text-xl font-bold italic uppercase tracking-tight mb-8">Actividad en Tiempo Real</h3>
          <div className="space-y-4">
            <ActivityItem 
              color="bg-emerald-500" 
              text="SARA agendó una nueva cita" 
              time="Hace 2 min" 
            />
            <ActivityItem 
              color="bg-purple-500" 
              text="ALEX completó llamada de seguimiento" 
              time="Hace 15 min" 
            />
            <ActivityItem 
              color="bg-cyan-500" 
              text="Lead de alta prioridad capturado" 
              time="Hace 42 min" 
            />
          </div>
          
          <button className="w-full mt-10 py-4 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-cyan-400 hover:bg-white/5 transition-all">
            Ver Registro Completo de Llamadas
          </button>
        </div>
      </div>

    </div>
  );
}

// --- COMPONENTES AUXILIARES ---

function MetricCard({ icon: Icon, title, value, trend, color }: any) {
  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-[28px] p-6 group hover:border-white/10 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-white/5 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{title}</p>
        <p className="text-3xl font-black text-white italic">{value}</p>
        <p className="text-[9px] font-bold text-gray-600 mt-2 uppercase tracking-tighter italic">{trend}</p>
      </div>
    </div>
  );
}

function ActivityItem({ color, text, time }: any) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
      <div className={`w-2 h-2 rounded-full ${color} animate-pulse`} />
      <div className="flex-1">
        <p className="text-xs font-bold text-gray-200">{text}</p>
        <p className="text-[10px] text-gray-500 uppercase tracking-tighter mt-0.5">{time}</p>
      </div>
    </div>
  );
}
