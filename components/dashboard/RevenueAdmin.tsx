"use client";

import { TrendingUp, DollarSign, Percent } from "lucide-react";

export function RevenueAdmin({ totalMinutes }: { totalMinutes: number }) {
  const costPerMinute = 0.12; // Lo que le pagas a Bland
  const sellingPrice = 0.35;  // Lo que le cobras al cliente
  const grossProfit = totalMinutes * (sellingPrice - costPerMinute);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="p-6 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-center gap-3 mb-2 text-emerald-400">
          <DollarSign size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest">Ganancia Neta Estimada</span>
        </div>
        <h3 className="text-3xl font-black text-white italic">${grossProfit.toFixed(2)}</h3>
      </div>

      <div className="p-6 rounded-[2rem] bg-sky-500/10 border border-sky-500/20">
        <div className="flex items-center gap-3 mb-2 text-sky-400">
          <Percent size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest">Margen de Retorno</span>
        </div>
        <h3 className="text-3xl font-black text-white italic">65.7%</h3>
      </div>

      <div className="p-6 rounded-[2rem] bg-purple-500/10 border border-purple-500/20">
        <div className="flex items-center gap-3 mb-2 text-purple-400">
          <TrendingUp size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest">Minutos Vendidos</span>
        </div>
        <h3 className="text-3xl font-black text-white italic">{totalMinutes.toLocaleString()}</h3>
      </div>
    </div>
  );
}
