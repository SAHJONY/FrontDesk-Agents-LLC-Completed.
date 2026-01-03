'use client';

import React, { useState } from 'react';
import { UniversalVault } from '@/components/owner/UniversalVault';
import { AuditLog } from '@/components/owner/AuditLog';

export default function OwnerMasterDashboard() {
  const [isSimulating, setIsSimulating] = useState(false);

  const triggerSystemAction = async (type: 'digest' | 'seed') => {
    setIsSimulating(true);
    const endpoint = type === 'digest' ? '/api/cron/daily-digest' : '/api/simulation/seed';
    try {
      const res = await fetch(endpoint, { method: 'GET' });
      if (res.ok) alert(`${type === 'digest' ? 'Digest enviado' : 'Simulación de ventas completada'}`);
    } catch (err) {
      alert("Error en la acción de sistema");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10 text-white min-h-screen bg-black">
      {/* HEADER ESTRATÉGICO */}
      <header className="mb-12 flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Owner Control Center</h1>
          <p className="text-brand-cyan font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
            Global Sovereignty Level: Absolute • Infrastructure: Portland [pdx1]
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => triggerSystemAction('seed')}
            disabled={isSimulating}
            className="bg-white/5 border border-white/10 hover:border-brand-cyan/50 px-5 py-2 rounded text-[10px] font-bold uppercase transition-all"
          >
            {isSimulating ? 'Inyectando Datos...' : 'Simular Ventas Globales'}
          </button>
          <button 
            onClick={() => triggerSystemAction('digest')}
            className="bg-brand-cyan/10 border border-brand-cyan/40 text-brand-cyan px-5 py-2 rounded text-[10px] font-bold uppercase hover:bg-brand-cyan/20 transition-all"
          >
            Disparar Reporte Ejecutivo
          </button>
        </div>
      </header>

      {/* HEATMAP DE EXPANSIÓN GLOBAL */}
      <div className="titan-card bg-white/5 border border-white/10 p-8 rounded-2xl mb-12 relative overflow-hidden">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h2 className="text-xl font-bold italic uppercase tracking-tight">Global Node Activation Heatmap</h2>
            <p className="text-slate-500 text-[10px] uppercase">Monitoreo de latencia y presencia de mercado local [cite: 2025-12-24]</p>
          </div>
          <div className="text-right">
            <span className="text-brand-cyan font-bold text-2xl">94 Países</span>
            <p className="text-[10px] text-slate-500 uppercase">Cobertura Activa</p>
          </div>
        </div>
        
        {/* Representación Visual del Mapa */}
        <div className="h-[300px] w-full bg-[url('/world-map-dark.svg')] bg-center bg-no-repeat opacity-40 grayscale filter invert brightness-200">
           {/* Aquí se renderizarían los puntos de los nodos dinámicamente */}
           <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-brand-cyan rounded-full animate-ping"></div>
           <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-brand-cyan rounded-full animate-pulse"></div>
           <div className="absolute top-2/3 left-3/4 w-3 h-3 bg-brand-cyan rounded-full animate-ping"></div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 relative z-10">
          <div className="bg-black/40 p-3 rounded border border-white/5">
            <p className="text-[10px] text-slate-500 uppercase">Mercados Emergentes</p>
            <p className="text-lg font-bold">42% Growth</p>
          </div>
          <div className="bg-black/40 p-3 rounded border border-white/5">
            <p className="text-[10px] text-slate-500 uppercase">Nodos Elite</p>
            <p className="text-lg font-bold">154 Global</p>
          </div>
          <div className="bg-black/40 p-3 rounded border border-white/5">
            <p className="text-[10px] text-slate-500 uppercase">Local Gateway Status</p>
            <p className="text-lg font-bold text-green-400 font-mono italic">ACTIVE</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <UniversalVault />
          <AuditLog />
        </div>

        <aside className="space-y-6">
          <div className="titan-card bg-white/5 border border-white/10 p-6 rounded-xl border">
            <h2 className="text-xs font-bold mb-4 uppercase text-brand-cyan tracking-widest">Revenue por Tier [cite: 2025-12-28]</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-xs"><span>Elite ($1,499)</span><span className="font-bold">$230,846</span></div>
              <div className="flex justify-between text-xs"><span>Growth ($799)</span><span className="font-bold">$249,288</span></div>
              <div className="flex justify-between text-xs text-slate-500"><span>Professional ($399)</span><span>$159,201</span></div>
              <div className="flex justify-between text-xs text-slate-500"><span>Basic ($199)</span><span>$203,165</span></div>
            </div>
          </div>
          
          <div className="titan-card bg-red-500/5 border-red-500/20 p-6 rounded-xl border">
            <h3 className="text-red-500 text-[10px] font-bold uppercase mb-2">Emergency Protocol</h3>
            <button className="w-full bg-red-600/20 border border-red-600/50 text-red-500 text-[10px] py-2 font-bold hover:bg-red-600 hover:text-white transition-all">
              ACTIVATE KILL-SWITCH
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
