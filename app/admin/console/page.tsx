'use client';

import React, { useState } from 'react';
import { ShieldAlert, Zap, LockOpen, PlusCircle } from 'lucide-react';

export default function AdminConsole() {
  const [tenantId, setTenantId] = useState('');
  const [loading, setLoading] = useState(false);

  const runAction = async (action: string, value: any = null) => {
    setLoading(true);
    await fetch('/api/admin/override', {
      method: 'POST',
      body: JSON.stringify({ tenantId, action, value }),
    });
    setLoading(false);
    alert(`Protocol ${action} Executed.`);
  };

  return (
    <div className="min-h-screen bg-black p-12 text-white">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-8">
          <ShieldAlert className="w-10 h-10 text-red-500" />
          <div>
            <h1 className="text-2xl font-black uppercase italic tracking-tighter">Sovereign Command Console</h1>
            <p className="text-xs text-zinc-500 font-mono">AUTHORIZED PERSONNEL ONLY // GLOBAL OVERRIDE ACCESS</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Target Tenant ID</label>
          <input 
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm font-mono focus:border-red-500 outline-none transition-all"
            placeholder="uuid-id-of-tenant"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            disabled={loading || !tenantId}
            onClick={() => runAction('GIFT_MINUTES', 100)}
            className="flex flex-col items-center justify-center gap-3 p-8 bg-zinc-950 border border-zinc-800 rounded-3xl hover:border-sky-500 transition-all group"
          >
            <PlusCircle className="w-6 h-6 text-sky-500 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Gift 100 Mins</span>
          </button>

          <button 
            disabled={loading || !tenantId}
            onClick={() => runAction('MANUAL_UNBLOCK')}
            className="flex flex-col items-center justify-center gap-3 p-8 bg-zinc-950 border border-zinc-800 rounded-3xl hover:border-emerald-500 transition-all group"
          >
            <LockOpen className="w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Manual Unblock</span>
          </button>
        </div>

        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
          <p className="text-[9px] text-red-500/80 font-bold uppercase tracking-widest leading-relaxed text-center">
            Warning: Overrides bypass standard Stripe/Bland AI billing checks. <br />Use only for verified support interventions.
          </p>
        </div>
      </div>
    </div>
  );
}
