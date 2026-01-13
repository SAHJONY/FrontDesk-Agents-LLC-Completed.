"use client";

import React, { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";

export default function UniversalVault() {
  const [secrets] = useState([
    { name: "SENDGRID_API_KEY", status: "Active" },
    { name: "SUPABASE_SERVICE_ROLE", status: "Encrypted" }
  ]);

  return (
    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-cyan-500/10 rounded-2xl">
          <Lock className="w-5 h-5 text-cyan-400" />
        </div>
        <h2 className="text-xl font-black uppercase italic tracking-tighter">Universal Vault</h2>
      </div>
      
      <div className="space-y-4">
        {secrets.map((s, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl group hover:border-cyan-500/30 transition-all">
            <span className="text-[11px] font-mono text-zinc-400 group-hover:text-cyan-400 transition-colors uppercase">{s.name}</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span className="text-[9px] font-black text-emerald-500 uppercase">{s.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
