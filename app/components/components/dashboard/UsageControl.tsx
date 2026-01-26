'use client';

import { motion } from "framer-motion";
import { Zap, AlertTriangle, TrendingUp } from "lucide-react";

// FIXED: Removed billedOverage from interface to satisfy Linter
interface UsageProps {
  used: number;
  max: number;
  rate: number;
}

// FIXED: Removed billedOverage from destructuring
export default function UsageControl({ used, max, rate }: UsageProps) {
  const percentage = Math.min((used / max) * 100, 100);
  const isOverage = used > max;
  const overageMinutes = Math.max(0, used - max);
  const currentOverageCost = (overageMinutes * rate).toFixed(2);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">
            Métricas de Consumo de Nodo
          </h3>
          <p className="text-2xl font-black italic uppercase tracking-tighter text-white">
            {used.toLocaleString()} <span className="text-slate-600 text-sm">/ {max.toLocaleString()} MINS</span>
          </p>
        </div>
        <div className={`p-2 rounded-lg ${isOverage ? 'bg-orange-500/10 text-orange-500' : 'bg-sky-500/10 text-sky-400'}`}>
          {isOverage ? <AlertTriangle size={20} /> : <Zap size={20} />}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="h-4 w-full bg-slate-950 rounded-full border border-slate-800 overflow-hidden mb-6 p-1">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${
            isOverage ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gradient-to-r from-sky-500 to-blue-600'
          }`}
        />
      </div>

      {/* Overage Details Area */}
      {isOverage && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-orange-500" />
              <span className="text-[10px] font-bold uppercase text-orange-200">Facturación de Exceso Activa</span>
            </div>
            <span className="text-sm font-black text-white">${currentOverageCost} USD</span>
          </div>
          <p className="text-[9px] text-slate-400 mt-2 uppercase leading-relaxed font-bold tracking-widest">
            Minutos adicionales ({overageMinutes}) facturados a ${rate}/min al final del ciclo.
          </p>
        </motion.div>
      )}

      <div className="mt-6 flex justify-between gap-4">
        <button className="flex-1 text-[10px] font-black uppercase py-3 border border-slate-800 text-slate-400 hover:text-white transition-colors">
          Historial de Llamadas
        </button>
        <button className="flex-1 text-[10px] font-black uppercase py-3 bg-white text-black hover:bg-sky-400 transition-all">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
}
