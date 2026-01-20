"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  Plus, 
  Activity, 
  Target, 
  PhoneForwarded, 
  CheckCircle2, 
  BarChart3,
  Loader2
} from "lucide-react";

export default function OutboundCampaigns() {
  const [isLoading] = useState(false);

  // Mock data para las campañas activas
  const campaigns = [
    { id: '001', name: 'Q4 Lead Recovery', target: 'Inactive CRM Contacts', conv: '84%', calls: '1,240', status: 'Active' },
    { id: '002', name: 'Dental Follow-up', target: 'Post-Op Patients', conv: '92%', calls: '450', status: 'Active' },
    { id: '003', name: 'Membership Renewal', target: 'Expired Subscriptions', conv: '76%', calls: '2,100', status: 'Paused' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10 space-y-10 animate-in fade-in duration-700">
      
      {/* HEADER DE LA FLOTA */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
            <p className="text-[10px] font-black tracking-[0.3em] text-sky-400 uppercase">Proactive Fleet Protocol</p>
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            Outbound <span className="text-slate-700">Fleet</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1 italic">Gestión masiva de agentes autónomos para captación.</p>
        </div>
        
        <button className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-sky-400 transition-all active:scale-95 shadow-xl">
          <Plus size={16} strokeWidth={3} />
          Launch New Campaign
        </button>
      </header>

      {/* MÉTRICAS GLOBALES DE OUTBOUND */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlobalMetric label="Flota Activa" value="48 Agentes" icon={Activity} />
        <GlobalMetric label="Llamadas Hoy" value="3,842" icon={PhoneForwarded} />
        <GlobalMetric label="Citas Logradas" value="156" icon={CheckCircle2} color="text-emerald-500" />
        <GlobalMetric label="ROI Estimado" value="+240%" icon={BarChart3} color="text-sky-400" />
      </div>

      {/* LISTA DE CAMPAÑAS (Fleet Cards) */}
      <div className="space-y-4 mt-8">
        <div className="flex items-center gap-3 px-2 mb-6">
          <Target className="text-slate-600" size={18} />
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Protocolos en Ejecución</h2>
        </div>

        {campaigns.map((camp, i) => (
          <motion.div 
            key={camp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col md:flex-row justify-between items-center p-6 rounded-[2rem] border border-slate-800 bg-slate-900/30 hover:bg-slate-900/50 hover:border-slate-700 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                camp.status === 'Active' ? 'bg-sky-500/10 border-sky-500/20 text-sky-400' : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}>
                <PhoneForwarded size={20} />
              </div>
              <div>
                <h3 className="text-white font-black uppercase italic tracking-tight text-lg group-hover:text-sky-400 transition-colors">
                  {camp.name} <span className="text-slate-600 text-xs ml-2 italic">#{camp.id}</span>
                </h3>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                  Target: {camp.target}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-12 mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
              <div className="text-center md:text-right">
                <p className="text-xs font-black text-slate-500 uppercase tracking-tighter">Volumen</p>
                <p className="text-lg font-black text-white">{camp.calls}</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-xs font-black text-slate-500 uppercase tracking-tighter">Conversión</p>
                <p className="text-lg font-black text-sky-400 italic">{camp.conv}</p>
              </div>
              <div className="flex flex-col items-end">
                 <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full border mb-1 ${
                   camp.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500'
                 }`}>
                   {camp.status}
                 </span>
                 <p className="text-slate-600 text-[9px] uppercase font-bold tracking-widest italic">AI Managed</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Componente de métrica simplificado
function GlobalMetric({ label, value, icon: Icon, color = "text-white" }: any) {
  return (
    <div className="bg-slate-900/20 border border-slate-800/50 p-6 rounded-3xl">
      <Icon size={16} className="text-slate-600 mb-3" />
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-2xl font-black italic tracking-tighter ${color}`}>{value}</p>
    </div>
  );
}
