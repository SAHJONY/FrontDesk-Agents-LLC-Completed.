"use client";

import { useState } from "react";
import { Save, BookOpen, ShieldCheck, Zap } from "lucide-react";

export function AgentKnowledge() {
  const [knowledge, setKnowledge] = useState("");

  return (
    <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/30 p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
            <BookOpen size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white">Cerebro del Agente</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Base de conocimientos y reglas de negocio</p>
          </div>
        </div>
        <button 
          className="flex items-center gap-2 px-6 py-2.5 bg-sky-500 text-black text-[10px] font-black uppercase rounded-full hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20"
          onClick={() => alert("Protocolo de Entrenamiento Actualizado")}
        >
          <Save size={14} />
          Sincronizar IA
        </button>
      </div>

      <div className="relative">
        <textarea 
          value={knowledge}
          onChange={(e) => setKnowledge(e.target.value)}
          placeholder="Ejemplo: Nuestra clínica abre de 9am a 6pm. El costo de la consulta es de $50. No aceptamos seguros de X compañía..."
          className="w-full h-64 bg-slate-950/50 border border-slate-800 rounded-3xl p-6 text-xs text-slate-300 font-medium leading-relaxed focus:border-sky-500 outline-none transition-all placeholder:text-slate-700"
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[8px] font-black text-slate-600 uppercase tracking-widest">
          <ShieldCheck size={12} />
          Safe Knowledge Protocol Active
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest">Identidad</p>
          <p className="text-[10px] text-slate-400 font-medium">El agente actuará como un recepcionista experto y educado.</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Objetivo</p>
          <p className="text-[10px] text-slate-400 font-medium">Priorizar el agendamiento de citas sobre cualquier otra consulta.</p>
        </div>
      </div>
    </div>
  );
}
