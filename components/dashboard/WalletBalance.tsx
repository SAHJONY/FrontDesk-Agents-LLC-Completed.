"use client";

import { useState } from "react";
import { Wallet, Plus, ArrowUpRight, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function WalletBalance({ balance, tenantId }: { balance: number; tenantId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRecharge = async (amount: number) => {
    setIsLoading(true);
    // Aquí disparamos la creación de una sesión de Stripe Checkout
    console.log(`Iniciando recarga de $${amount} para ${tenantId}`);
    // setTimeout para simular la redirección
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-8 space-y-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-[50px] -z-10" />
      
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Créditos Disponibles</p>
          <h3 className="text-4xl font-black text-white italic tracking-tighter">
            ${balance.toLocaleString()} <span className="text-xs text-slate-600 not-italic uppercase tracking-widest ml-1">USD</span>
          </h3>
        </div>
        <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-400">
          <Wallet size={24} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[50, 100, 250, 500].map((amount) => (
          <button
            key={amount}
            onClick={() => handleRecharge(amount)}
            disabled={isLoading}
            className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-800 bg-black/20 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all"
          >
            <span className="text-[10px] font-black text-slate-500 group-hover:text-sky-400 uppercase tracking-widest mb-1">Cargar</span>
            <span className="text-lg font-black text-white italic">+${amount}</span>
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[8px] font-black text-emerald-500 uppercase tracking-widest">
          <ShieldCheck size={12} />
          Pagos Seguros vía Stripe
        </div>
        <button className="text-[9px] font-black text-slate-500 uppercase hover:text-white transition-colors flex items-center gap-1">
          Ver Historial <ArrowUpRight size={10} />
        </button>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center rounded-[2.5rem] z-20">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
            <p className="text-[10px] font-black text-white uppercase tracking-widest">Conectando con Stripe...</p>
          </div>
        </div>
      )}
    </div>
  );
}
