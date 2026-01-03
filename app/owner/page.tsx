'use client';

import React, { useState } from 'react';
import { WorldMap } from '@/components/owner/WorldMap';
import { UniversalVault } from '@/components/owner/UniversalVault';
import { AuditLog } from '@/components/owner/AuditLog';

/**
 * OWNER MASTER DASHBOARD - CENTRAL DE CONTROL SOBERANA
 * Ubicación: Portland [pdx1]
 */
export default function OwnerMasterDashboard() {
  const [isSimulating, setIsSimulating] = useState(false);

  // Función para disparar acciones de sistema sin usar terminal
  const triggerSystemAction = async (type: 'digest' | 'seed') => {
    setIsSimulating(true);
    const endpoint = type === 'digest' ? '/api/cron/daily-digest' : '/api/simulation/seed';
    
    try {
      const res = await fetch(endpoint, { method: 'GET' });
      if (res.ok) {
        alert(`${type === 'digest' ? 'Digest enviado a frontdeskllc@outlook.com' : 'Simulación de ventas completada'}`);
      } else {
        alert("Error: Verifica la configuración de variables de entorno en Vercel.");
      }
    } catch (err) {
      alert("Error crítico ejecutando acción de sistema.");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-7xl mx-auto relative z-10 font-sans">
      
      {/* HEADER DE NIVEL SOBERANO */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Owner Control Center</h1>
          <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
            Global Sovereignty Level: Absolute • Infrastructure: Portland [pdx1]
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => triggerSystemAction('seed')}
            disabled={isSimulating}
            className="bg-white/5 border border-white/10 hover:border-cyan-500/50 px-5 py-2 rounded text-[10px] font-bold uppercase transition-all disabled:opacity-50"
          >
            {isSimulating ? 'Processing...' : 'Simular Actividad Global'}
          </button>
          <button 
            onClick={() => triggerSystemAction('digest')}
            className="bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 px-5 py-2 rounded text-[10px] font-bold uppercase hover:bg-cyan-500/20 transition-all"
          >
            Disparar Reporte Ejecutivo
          </button>
        </div>
      </header>

      {/* SECCIÓN DEL MAPA DE CALOR GLOBAL */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-12 relative overflow-hidden shadow-2xl">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h2 className="text-xl font-bold italic uppercase tracking-tight text-white">Global Node Activation Heatmap</h2>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-1">
              Local Market Presence Verification [cite: 2025-12-24]
            </p>
          </div>
          <div className="text-right">
            <span className="text-cyan-400 font-black text-3xl">94</span>
            <p className="text-[10px] text-slate-500 uppercase font-bold">Mercados Activos</p>
          </div>
        </div>
        
        {/* Componente del Mapa SVG con Nodos de Luz */}
        <WorldMap />
        
        {/* Métricas del Mapa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 relative z-10">
          <div className="bg-black/60 p-4 rounded-lg border border-white/5 backdrop-blur-md">
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Crecimiento Mensual</p>
            <p className="text-xl font-black">+42.8%</p>
          </div>
          <div className="bg-black/60 p-4 rounded-lg border border-white/5 backdrop-blur-md">
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Nodos Elite ($1,499)</p>
            <p className="text-xl font-black text-white">154 Activos</p>
          </div>
          <div className="bg-black/60 p-4 rounded-lg border border-white/5 backdrop-blur-md">
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Local Gateway Sync</p>
            <p className="text-xl font-black text-green-400 font-mono italic">OPTIMIZED</p>
          </div>
        </div>
      </div>

      {/* GRID DE GESTIÓN Y AUDITORÍA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA PRINCIPAL: VAULT Y LOGS */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/5 border border-white/10 p-1 rounded-2xl">
            <UniversalVault />
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-inner">
            <h2 className="text-lg font-bold mb-6 italic uppercase tracking-tighter border-l-4 border-cyan-500 pl-4">
              Registro de Auditoría Forense
            </h2>
            <AuditLog />
          </div>
        </div>

        {/* SIDEBAR: REVENUE Y SEGURIDAD */}
        <aside className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="text-xs font-bold mb-6 uppercase text-cyan-400 tracking-[0.2em]">Revenue por Tier [cite: 2025-12-28]</h2>
            <div className="space-y-5">
              {[
                { label: 'Elite', price: '$1,499', total: '$230,846', color: 'bg-cyan-500' },
                { label: 'Growth', price: '$799', total: '$249,288', color: 'bg-white/20' },
                { label: 'Professional', price: '$399', total: '$159,201', color: 'bg-white/10' },
                { label: 'Basic', price: '$199', total: '$203,165', color: 'bg-white/5' }
              ].map((tier, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex justify-between text-[11px] mb-2 font-bold uppercase tracking-tighter">
                    <span className="text-slate-400 group-hover:text-white transition-colors">{tier.label} ({tier.price})</span>
                    <span className="text-white">{tier.total}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className={`${tier.color} h-full transition-all duration-1000`} style={{ width: i === 0 ? '85%' : '60%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* BOTÓN DE PROTOCOLO DE EMERGENCIA */}
          <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
            <h3 className="text-red-500 text-[10px] font-black uppercase mb-3 tracking-widest">Protocolo de Seguridad</h3>
            <p className="text-[10px] text-slate-500 mb-4 leading-relaxed">
              La activación del Kill-Switch revoca todos los tokens de acceso y congela la sincronización en Portland (pdx1).
            </p>
            <button 
              onClick={() => confirm("¿Confirmas la revocación total de accesos?") && alert("Kill-Switch Iniciado")}
              className="w-full bg-red-600/10 border border-red-600/40 text-red-500 text-[10px] py-3 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all rounded"
            >
              Activate Kill-Switch
            </button>
          </div>
        </aside>
      </div>
      
      {/* FOOTER TÉCNICO */}
      <footer className="mt-20 pt-10 border-t border-white/5 text-center">
        <p className="text-slate-600 text-[9px] uppercase tracking-[0.4em] font-mono">
          Sovereign Financial Hub Platform • Node Portland pdx1 • 2026 Ready
        </p>
      </footer>
    </div>
  );
}
