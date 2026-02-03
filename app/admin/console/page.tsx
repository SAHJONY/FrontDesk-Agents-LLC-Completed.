"use client";

import React, { useState, useEffect } from "react";
// Removed unused 'PlusCircle' to resolve TypeScript build error
import { ShieldAlert, LockOpen, Activity, TrendingUp, Cpu, Globe } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

// Asset: /public/assets/premium/client-dashboard.png
const DASHBOARD_PREVIEW = "/assets/premium/client-dashboard.png";

export default function AdminConsole() {
  const [tenantId, setTenantId] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [tenants, setTenants] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBillingStats() {
      const { data } = await supabase
        .from('tenants')
        .select('id, name, used_minutes, max_minutes, overage_rate, billed_overage_minutes')
        .order('used_minutes', { ascending: false })
        .limit(8);
      if (data) setTenants(data);
    }
    fetchBillingStats();
  }, []);

  async function callOverride(mode: "unlock" | "provision") {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantId: tenantId.trim(),
          reason: reason.trim() || "admin_override",
          mode,
        }),
      });
      const json = await res.json();
      setResult(res.ok ? "Success" : (json?.error || "Request failed"));
    } catch (e: any) {
      setResult(e?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-slate-300 p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header: Global Command */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
              <ShieldAlert className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase">Admin_Console</h1>
              <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.4em]">Root Infrastructure Control</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="px-5 py-2 bg-slate-900/50 border border-white/10 rounded-xl flex items-center gap-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">System Operational</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Emergency Overrides */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
              <LockOpen className="w-3 h-3" /> Emergency_Tools
            </h2>
            <div className="bg-slate-950 rounded-3xl border border-white/5 p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Cpu className="w-24 h-24 text-white" />
              </div>

              <div className="space-y-4 relative z-10">
                <label className="block space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Target Tenant ID</span>
                  <input
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                    placeholder="0000-0000-0000"
                    className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all font-mono text-sm"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Override Logic</span>
                  <input
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Log audit reason..."
                    className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all text-sm"
                  />
                </label>

                <div className="grid grid-cols-1 gap-3 pt-4">
                  <button
                    onClick={() => callOverride("unlock")}
                    disabled={loading || !tenantId.trim()}
                    className="w-full py-4 bg-cyan-500 text-black font-black uppercase text-xs rounded-xl hover:bg-cyan-400 disabled:opacity-30 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  >
                    Unlock Identity
                  </button>
                  <button
                    onClick={() => callOverride("provision")}
                    disabled={loading || !tenantId.trim()}
                    className="w-full py-4 bg-transparent border border-white/10 text-white font-black uppercase text-xs rounded-xl hover:bg-white/5 transition-all"
                  >
                    Provision Node
                  </button>
                </div>

                {result && (
                  <div className={`mt-4 rounded-xl border p-4 text-[10px] font-black uppercase tracking-widest text-center ${result === 'Success' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    Status: {result}
                  </div>
                )}
              </div>
            </div>

            {/* Visual Asset: Client Dashboard Preview */}
            <div className="bg-slate-950 rounded-3xl border border-white/5 p-4 shadow-2xl overflow-hidden group">
               <div className="flex justify-between items-center mb-3 px-2">
                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Fleet_Viewer_V1</span>
                 <Globe className="w-3 h-3 text-cyan-500 animate-pulse" />
               </div>
               <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                 <Image 
                    src={DASHBOARD_PREVIEW} 
                    alt="Fleet Preview" 
                    fill 
                    className="object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
               </div>
            </div>
          </div>

          {/* Right: Overage Monitor */}
          <div className="lg:col-span-8 space-y-6">
             <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
               <Activity className="w-3 h-3" /> Live_Revenue_Monitor
             </h2>
             <div className="bg-slate-950 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-white/5 border-b border-white/5">
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Tenant</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Node Usage</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Revenue Risk</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {tenants.map((t) => {
                     const overage = Math.max(0, (t.used_minutes || 0) - (t.max_minutes || 0));
                     const unbilled = overage - (t.billed_overage_minutes || 0);
                     const pendingUSD = (unbilled * (t.overage_rate || 0.15)).toFixed(2);
                     
                     return (
                       <tr key={t.id} className="hover:bg-white/[0.02] transition-colors group">
                         <td className="px-8 py-6">
                           <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">{t.name || "UNNAMED_NODE"}</div>
                           <div className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">{t.id}</div>
                         </td>
                         <td className="px-8 py-6">
                           <div className="flex flex-col items-center gap-2">
                              <span className="text-[10px] font-mono text-slate-300">{t.used_minutes} / {t.max_minutes} MIN</span>
                              <div className="w-32 h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                                <div 
                                  className={`h-full transition-all duration-1000 ${overage > 0 ? 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-slate-700'}`} 
                                  style={{ width: `${Math.min(100, (t.used_minutes / t.max_minutes) * 100)}%` }}
                                />
                              </div>
                           </div>
                         </td>
                         <td className="px-8 py-6 text-right">
                           {unbilled > 0 ? (
                             <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl text-xs font-black">
                               <TrendingUp className="w-3 h-3" />
                               +${pendingUSD}
                             </div>
                           ) : (
                             <span className="text-slate-600 font-mono text-[10px] tracking-widest">NOMINAL</span>
                           )}
                         </td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
               {tenants.length === 0 && (
                 <div className="p-20 text-center flex flex-col items-center gap-4">
                   <Activity className="w-12 h-12 text-slate-800 animate-pulse" />
                   <p className="text-xs font-black uppercase tracking-widest text-slate-600 italic">No Active Telemetry Detected</p>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
