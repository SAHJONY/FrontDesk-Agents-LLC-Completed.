'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  ClockIcon, 
  CalendarDaysIcon, 
  ChartBarIcon, 
  PhoneIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const supabase = createClient();
  const [metrics, setMetrics] = useState({
    appointmentsBooked: 0,
    conversionRate: 0,
    callsProcessed: 0,
    totalDurationHours: 0,
    minutesUsed: 0,
    totalMinutes: 1000,
  });

  useEffect(() => {
    async function fetchRealtimeData() {
      // Using your verified UUID for J. Gonzalez
      const userId = '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce';

      // Fetch Call Results
      const { data: calls } = await supabase
        .from('call_results')
        .select('call_duration_seconds, was_completed')
        .eq('user_id', userId);

      // Fetch Consumption Logs for Billing
      const { data: logs } = await supabase
        .from('consumption_log')
        .select('minutes_used')
        .eq('user_id', userId);

      if (calls && logs) {
        const totalSecs = calls.reduce((acc, c) => acc + (c.call_duration_seconds || 0), 0);
        const totalMins = logs.reduce((acc, l) => acc + (l.minutes_used || 0), 0);
        const completed = calls.filter(c => c.was_completed).length;

        setMetrics(prev => ({
          ...prev,
          callsProcessed: calls.length,
          totalDurationHours: parseFloat((totalSecs / 3600).toFixed(1)),
          minutesUsed: Math.round(totalMins),
          conversionRate: calls.length > 0 ? Math.round((completed / calls.length) * 100) : 0,
          appointmentsBooked: completed // Assuming completed calls lead to bookings
        }));
      }
    }
    fetchRealtimeData();
  }, []);

  const minutesRemaining = metrics.totalMinutes - metrics.minutesUsed;
  const usagePercentage = (metrics.minutesUsed / metrics.totalMinutes) * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 p-4"> 
      {/* SECCIÓN DE BIENVENIDA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative rounded-[32px] overflow-hidden bg-slate-900 border border-white/5 shadow-2xl p-8">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black mb-6 uppercase tracking-[0.2em]">
              <ShieldCheckIcon className="w-4 h-4" /> Acceso VIP Verificado
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter italic">COMMAND CENTER</h1>
            <p className="text-gray-400 font-medium max-w-md italic">Bienvenido, J. Gonzalez. Tus agentes operando con máxima eficiencia.</p>
          </div>
        </div>

        {/* Card de Minutos (Bono de Fundador) */}
        <div className="bg-gradient-to-br from-slate-900 to-[#000814] border-2 border-cyan-500/30 rounded-[32px] p-8 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-3xl font-black text-white italic">{minutesRemaining} <span className="text-sm not-italic font-medium text-gray-500">Min Libres</span></p>
            <div className="mt-8">
              <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                <span className="text-gray-400">Consumo Real</span>
                <span className="text-cyan-400">{metrics.minutesUsed} / {metrics.totalMinutes} MIN</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-400 h-full transition-all duration-1000" style={{ width: `${usagePercentage}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MÉTRICAS DINÁMICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={CalendarDaysIcon} title="Citas Agendadas" value={metrics.appointmentsBooked} trend="Basado en cierres" color="text-cyan-400" />
        <MetricCard icon={ChartBarIcon} title="Tasa de Conversión" value={`${metrics.conversionRate}%`} trend="Efectividad AI" color="text-purple-400" />
        <MetricCard icon={PhoneIcon} title="Llamadas Totales" value={metrics.callsProcessed} trend="Operación 24/7" color="text-emerald-400" />
        <MetricCard icon={ClockIcon} title="Tiempo Ahorrado" value={`${metrics.totalDurationHours}h`} trend="Enfoque en ventas" color="text-amber-400" />
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, title, value, trend, color }: any) {
  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-[28px] p-6 hover:border-white/10 transition-all">
      <div className={`p-3 w-fit rounded-2xl bg-white/5 mb-4 ${color}`}><Icon className="w-6 h-6" /></div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-3xl font-black text-white italic">{value}</p>
      <p className="text-[9px] font-bold text-gray-600 mt-2 italic">{trend}</p>
    </div>
  );
}
