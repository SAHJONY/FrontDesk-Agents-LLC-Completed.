'use client';

import React from 'react';
import { ShieldAlert, Fingerprint, Database, Zap, Globe } from 'lucide-react';

export default function AuditorDashboard({ nodeData }: { nodeData: any[] }) {
  return (
    <div className="min-h-screen bg-[#020408] p-12 text-slate-300 font-mono">
      <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <ShieldAlert className="text-red-500 w-6 h-6" /> 
            Sovereign Auditor <span className="text-slate-500 text-sm font-normal">v1.0</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2">Access Level: Service-Role / Master Vault Key Active</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500 uppercase">Global Node Integrity</p>
          <p className="text-cyan-500 font-bold">100% SECURE</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {nodeData.map((node) => (
          <div key={node.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-xl flex items-center justify-between hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-6">
              <Globe className={`w-5 h-5 ${node.is_active ? 'text-green-500' : 'text-slate-600'}`} />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wide">{node.business_name}</p>
                <p className="text-[10px] text-slate-500">{node.location_tz} • {node.preferred_language.toUpperCase()} ({node.ui_direction})</p>
              </div>
            </div>

            <div className="flex gap-12 items-center">
              <div className="text-center">
                <p className="text-[9px] uppercase text-slate-500 mb-1">DNA Fingerprint</p>
                <div className="flex items-center gap-2 text-[10px] bg-black px-3 py-1 rounded border border-white/10">
                  <Fingerprint className="w-3 h-3 text-cyan-500" />
                  <span className="text-slate-400">{node.fingerprint.substring(0, 12)}...</span>
                </div>
              </div>
              
              <div className="px-4 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                <p className="text-[10px] font-black text-cyan-500 uppercase">Vaulted</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
