"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Globe, Zap, ShieldCheck } from "lucide-react";

export function LiveFleetMonitor() {
  const [activeNodes, setActiveNodes] = useState<{ id: number; x: number; y: number; status: string }[]>([]);

  // Simulación de actividad de nodos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const newNode = {
        id: Date.now(),
        x: Math.random() * 90 + 5,
        y: Math.random() * 80 + 10,
        status: Math.random() > 0.3 ? "CONNECTING" : "SUCCESS"
      };
      
      setActiveNodes((prev) => [...prev.slice(-15), newNode]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-slate-950 rounded-[2.5rem] border border-slate-800 overflow-hidden group">
      {/* Grid de Fondo Industrial */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: "radial-gradient(#1e293b 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      
      {/* Header del Monitor */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
          <Activity size={14} className="text-sky-400 animate-pulse" />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Node Dispatch</span>
        </div>
        <div className="flex gap-4">
          <Stat label="Active Threads" value="128" />
          <Stat label="Global Latency" value="142ms" />
        </div>
      </div>

      {/* Área de Visualización de Nodos */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {activeNodes.map((node) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute"
            >
              <div className={`relative flex items-center justify-center`}>
                {/* Aura de pulso */}
                <div className={`absolute w-8 h-8 rounded-full animate-ping opacity-20 ${
                  node.status === "SUCCESS" ? "bg-emerald-500" : "bg-sky-500"
                }`} />
                {/* El Nodo */}
                <div className={`w-3 h-3 rounded-full border-2 border-black shadow-lg ${
                  node.status === "SUCCESS" ? "bg-emerald-400" : "bg-sky-400"
                }`} />
                
                {/* Etiqueta flotante del nodo */}
                <motion.div 
                  initial={{ y: 5, opacity: 0 }} 
                  animate={{ y: -20, opacity: 1 }}
                  className="absolute whitespace-nowrap text-[8px] font-black uppercase tracking-tighter text-slate-500 bg-black/80 px-2 py-0.5 rounded border border-white/5"
                >
                  Node_{node.id.toString().slice(-4)}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer de Estado de Infraestructura */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 text-slate-600 font-bold text-[9px] uppercase tracking-widest">
          <Globe size={12} />
          Distributed Fleet Operation • Multi-Region Deployment
        </div>
        <div className="flex items-center gap-2 text-emerald-500 font-black text-[9px] uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <ShieldCheck size={12} />
          Verified Security Protocol
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-right">
      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
      <p className="text-xs font-black text-sky-400 italic">{value}</p>
    </div>
  );
}
