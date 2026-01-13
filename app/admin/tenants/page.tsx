import React from 'react';

export default function TenantManagement() {
  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black italic">TENANT MANAGEMENT</h1>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Search Node ID..." 
            className="bg-slate-900 border border-white/5 rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-cyan" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="titan-card flex items-center justify-between py-4 px-6 hover:bg-white/5 cursor-pointer transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-brand-cyan">
                T{i}
              </div>
              <div>
                <p className="text-white font-bold">Tenant_Node_00{i}</p>
                <p className="text-slate-500 text-xs">Plan: {i === 1 ? 'Elite' : 'Professional'}</p>
              </div>
            </div>
            <div className="flex gap-8 items-center">
              <div className="text-right">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Minutes Used</p>
                <p className="text-white font-mono">{i === 1 ? '∞' : '1,240 / 1,500'}</p>
              </div>
              <button className="text-brand-slate hover:text-white">⚙️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
