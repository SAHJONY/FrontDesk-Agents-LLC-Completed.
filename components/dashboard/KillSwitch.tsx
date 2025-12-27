'use client';

import React, { useState } from 'react';
import { Power, ShieldAlert, Lock, Unlock, ZapOff } from 'lucide-react';

export const KillSwitch = ({ siloId }: { siloId: string }) => {
  const [isLive, setIsLive] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  const toggleNode = async () => {
    // Logic to update Supabase 'customers' table
    // Set is_active = !isLive
    setIsLive(!isLive);
    setIsConfirming(false);
  };

  return (
    <div className={`p-8 border rounded-sm transition-all duration-500 ${
      isLive ? 'bg-white/[0.02] border-white/10' : 'bg-red-500/5 border-red-500/20'
    }`}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 italic flex items-center gap-2">
            <ShieldAlert className={`w-3 h-3 ${isLive ? 'text-cyan-500' : 'text-red-500'}`} />
            Sovereign Override
          </h3>
          <p className="text-2xl font-black text-white uppercase italic tracking-tighter">
            Node <span className={isLive ? 'text-slate-700' : 'text-red-800'}>Control Hook</span>
          </p>
        </div>
        
        <div className={`px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${
          isLive ? 'border-cyan-500/30 text-cyan-500 animate-pulse' : 'border-red-500/30 text-red-500'
        }`}>
          {isLive ? 'Active Deployment' : 'Infrastructure Severed'}
        </div>
      </div>

      <p className="text-[11px] text-slate-500 font-medium mb-8 leading-relaxed max-w-md">
        This is a hard-coded logic break. Engaging this protocol will immediately terminate all 
        active neural threads and prevent the node from processing live inbound traffic.
      </p>

      {!isConfirming ? (
        <button 
          onClick={() => setIsConfirming(true)}
          className={`w-full py-4 rounded-sm font-black uppercase text-[10px] tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
            isLive 
            ? 'bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white' 
            : 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
          }`}
        >
          {isLive ? <ZapOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
          {isLive ? 'Initialize Kill-Switch' : 'Re-Authorize Node'}
        </button>
      ) : (
        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
          <p className="text-[10px] font-black text-red-500 text-center uppercase tracking-widest">
            Confirm Infrastructure Severance?
          </p>
          <div className="flex gap-4">
            <button 
              onClick={toggleNode}
              className="flex-1 py-4 bg-red-600 text-white font-black uppercase text-[10px] tracking-widest"
            >
              Confirm Kill
            </button>
            <button 
              onClick={() => setIsConfirming(false)}
              className="flex-1 py-4 bg-white/5 text-slate-400 font-black uppercase text-[10px] tracking-widest"
            >
              Abort
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-30">
        <div className="flex items-center gap-2">
          {isLive ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3 text-red-500" />}
          <span className="text-[8px] font-black uppercase tracking-widest">
            Silo ID: {siloId}
          </span>
        </div>
        <span className="text-[8px] font-black uppercase tracking-widest">
          Auth Level: Executive
        </span>
      </div>
    </div>
  );
};
