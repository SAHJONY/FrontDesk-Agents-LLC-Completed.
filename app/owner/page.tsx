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
      // Nota: El CRON_SECRET debe estar en tus variables de entorno de Vercel
      const res = await fetch(endpoint, { method: 'GET' });
      if (res.ok) alert(`${type === 'digest' ? 'Digest enviado al correo' : 'Simulación de ventas completada'}`);
    } catch (err) {
      alert("Error ejecutando acción de sistema");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10 text-white min-h-screen">
      {/* HEADER SOVEREIGN */}
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Owner Control Center</h1>
          <p className="text-brand-cyan font-mono text-xs uppercase tracking-widest mt-2">Global Platform Status: Operational [pdx1]</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => triggerSystemAction('seed')}
            disabled={isSimulating}
            className="bg-white/5 border border-white/10 hover:border-brand-cyan/50 px-4 py-2 rounded text-[10px] font-bold uppercase transition-all"
          >
            {isSimulating ? 'Processing...' : 'Simular Ventas'}
          </button>
          <button 
            onClick={() => triggerSystemAction('digest')}
            className="bg-brand-cyan/20 border border-brand-cyan/50 text-brand-cyan px-4 py-2 rounded text-[10px] font-bold uppercase hover:bg-brand-cyan/30 transition-all"
          >
            Disparar Daily Digest
          </button>
        </div>
      </header>

      {/* MÉTRICAS DE REVENUE (TIERS $199 - $1,499) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="titan-card bg-brand-cyan/5 border-brand-cyan/20 p-6 rounded-xl border">
          <h3 className="text-slate-500 text-[10px] font-bold uppercase mb-1">Total Platform MRR</h3>
          <p className="text-3xl font-black">$842,500</p>
          <div className="w-full bg-white/5 h-1 mt-4 rounded-full overflow-hidden">
            <div className="bg-brand-cyan h-full w-[75%]"></div>
          </div>
        </div>
        <div className="titan-card bg-white/5 border-white/10 p-6 rounded-xl border">
          <h3 className="text-slate-500 text-[10px] font-bold uppercase mb-1">Active Elite Nodes ($1,499)</h3>
          <p className="text-3xl font-black text-white">154</p>
        </div>
        <div className="titan-card bg-white/5 border-white/10 p-6 rounded-xl border">
          <h3 className="text-slate-500 text-[10px] font-bold uppercase mb-1">Growth Syncs ($799)</h3>
          <p className="text-3xl font-black text-white">312</p>
        </div>
        <div className="titan-card bg-white/5 border-white/10 p-6 rounded-xl border">
          <h3 className="text-slate-500 text-[10px] font-bold uppercase mb-1">Success Fees 24h</h3>
          <p className="text-3xl font-black text-brand-cyan">+$12,400</p>
        </div>
      </div>

      {/* CONTROL DE INFRAESTRUCTURA Y AUDITORÍA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Componente Universal Vault para Secretos */}
          <UniversalVault />
          
          {/* Tabla de Auditoría Forense */}
          <div className="titan-card bg-white/5 border-white/10 p-6 rounded-xl border">
            <h2 className="text-xl font-bold mb-6 italic uppercase">Logs de Auditoría de Portland</h2>
            <AuditLog />
          </div>
        </div>

        {/* SIDEBAR DE ACTIVIDAD RECIENTE */}
        <div className="space-y-6">
          <div className="titan-card bg-white/5 border-white/10 p-6 rounded-xl border">
            <h2 className="text-sm font-bold mb-4 uppercase text-brand-cyan tracking-widest">Activaciones Recientes</h2>
            <div className="space-y-4">
              {[
                { client: 'Skyline Corp', tier: 'Elite', status: 'Active' },
                { client: 'Nexus Ltd', tier: 'Growth', status: 'Active' },
                { client: 'Local Agent X', tier: 'Basic', status: 'Pending' }
              ].map((node, i) => (
                <div key={i} className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                  <span className="font-bold">{node.client}</span>
                  <span className="text-slate-500">{node.tier}</span>
                  <span className={node.status === 'Active' ? 'text-green-400' : 'text-amber-400'}>● {node.status}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="titan-card bg-amber-500/5 border-amber-500/20 p-6 rounded-xl border">
            <h3 className="text-amber-500 text-[10px] font-bold uppercase mb-2">Alerta de Seguridad</h3>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Cualquier cambio en el Vault notificará automáticamente a frontdeskllc@outlook.com con registro de IP.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
