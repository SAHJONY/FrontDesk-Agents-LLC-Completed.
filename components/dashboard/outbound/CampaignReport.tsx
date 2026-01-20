"use client";

import { motion } from "framer-motion";
import { 
  Trophy, 
  Clock, 
  TrendingUp, 
  Download, 
  Share2, 
  Sparkles,
  Zap
} from "lucide-react";

export function CampaignReport({ campaignName, stats }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-900 border-2 border-sky-500/30 rounded-[3rem] p-10 relative overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.1)]"
    >
      {/* Efecto de Luces de Fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -z-10" />

      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-sky-500 rounded-2xl text-black">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">Campaign Finalized</p>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                {campaignName}
              </h2>
            </div>
          </div>
          <p className="max-w-md text-slate-400 text-sm font-medium italic">
            El protocolo de la flota ha completado el despliegue. Todos los nodos han sido desactividados y sincronizados con el CRM.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="p-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl transition-all group">
            <Share2 size={18} className="group-hover:scale-110 transition-transform" />
          </button>
          <button className="flex items-center gap-3 px-6 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-sky-400 transition-all">
            <Download size={16} strokeWidth={3} />
            Download PDF Report
          </button>
        </div>
      </div>

      {/* MÉTRICAS DE IMPACTO (The "Hero" Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <ImpactCard 
          label="Tiempo Humano Ahorrado" 
          value="42.5 Horas" 
          icon={Clock} 
          description="Equivalente a 5 días de trabajo de un agente humano."
          color="sky"
        />
        <ImpactCard 
          label="Pipeline de Ingresos" 
          value={`$${stats.revenue.toLocaleString()}`} 
          icon={TrendingUp} 
          description="Valor estimado de los leads que mostraron interés alto."
          color="emerald"
        />
        <ImpactCard 
          label="Eficiencia de Flota" 
          value="98.2%" 
          icon={Zap} 
          description="Porcentaje de llamadas con conexión exitosa y análisis."
          color="orange"
        />
      </div>

      <div className="mt-12 p-6 bg-slate-950/50 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sparkles className="text-sky-400" size={20} />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
            AI Insight: Se recomienda un seguimiento proactivo en 48 horas para los 12 leads "Hot".
          </span>
        </div>
        <button className="text-[10px] font-black text-sky-400 uppercase tracking-widest hover:underline">
          View Recommendations →
        </button>
      </div>
    </motion.div>
  );
}

function ImpactCard({ label, value, icon: Icon, description, color }: any) {
  const colors: any = {
    sky: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/20"
  };

  return (
    <div className={`p-8 rounded-[2.5rem] border ${colors[color]} relative overflow-hidden group`}>
      <Icon size={20} className="mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
      <p className="text-3xl font-black italic tracking-tighter text-white mb-3">{value}</p>
      <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-tight">
        {description}
      </p>
    </div>
  );
}
