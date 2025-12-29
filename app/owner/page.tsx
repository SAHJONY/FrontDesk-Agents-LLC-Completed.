'use client';

import React from 'react';

export default function OwnerMasterDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10">
      <header className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Owner Control Center</h1>
        <p className="text-brand-cyan font-mono text-xs uppercase tracking-widest mt-2">Global Sovereignty Level: Absolute</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="titan-card bg-brand-cyan/5 border-brand-cyan/20">
          <h3 className="text-slate-500 text-[10px] font-bold uppercase mb-1">Total Platform MRR</h3>
          <p className="text-3xl font-black text-white">$842,500</p>
        </div>
        <div className="titan-card">
          <h3 className="text-slate-500 text-[10px] font-bold uppercase mb-1">Active Elite Nodes</h3>
          <p className="text-3xl font-black text-white">154</p>
        </div>
        <div className="titan-card">
          <h3 className="text-slate-500 text-[10px] font-bold uppercase mb-1">Total AI Agents</h3>
          <p className="text-3xl font-black text-white">4,829</p>
        </div>
        <div className="titan-card">
          <h3 className="text-slate-500 text-[10px] font-bold uppercase mb-1">Global Success Fees</h3>
          <p className="text-3xl font-black text-brand-cyan">+$12,400</p>
        </div>
      </div>

      <div className="titan-card">
        <h2 className="text-xl font-bold mb-4">Recent Node Activations</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-brand-slate uppercase text-[10px] border-b border-white/5">
              <tr>
                <th className="pb-3">Client</th>
                <th className="pb-3">Tier</th>
                <th className="pb-3">Region</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-white/5"><td className="py-4">Skyline Corp</td><td className="py-4">Elite</td><td className="py-4">Western</td><td className="py-4 text-green-400 font-bold">● Active</td></tr>
              <tr className="border-b border-white/5"><td className="py-4">Nexus Ltd</td><td className="py-4">Growth</td><td className="py-4">Emerging</td><td className="py-4 text-green-400 font-bold">● Active</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
