"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, LockOpen, PlusCircle, Activity, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Ensure this matches your supabase client path

export default function AdminConsole() {
  const [tenantId, setTenantId] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [tenants, setTenants] = useState<any[]>([]);

  // 1. Fetch live usage data on load
  useEffect(() => {
    async function fetchBillingStats() {
      const { data } = await supabase
        .from('tenants')
        .select('id, name, used_minutes, max_minutes, overage_rate, billed_overage_minutes')
        .order('used_minutes', { ascending: false })
        .limit(10);
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
      if (!res.ok) {
        setResult(json?.error || "Request failed");
      } else {
        setResult("Success");
      }
    } catch (e: any) {
      setResult(e?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-gray-900" />
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Admin Command
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Live
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Override Tools */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Emergency Tools</h2>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
              <label className="block">
                <span className="text-sm font-semibold text-gray-800">Tenant ID</span>
                <input
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  placeholder="tenant_uuid"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-gray-800">Reasoning</span>
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Audit log reason"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                />
              </label>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => callOverride("unlock")}
                  disabled={loading || !tenantId.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 text-white px-5 py-3 font-semibold hover:bg-black transition-colors disabled:opacity-50"
                >
                  <LockOpen className="w-4 h-4" />
                  Unlock Tenant
                </button>

                <button
                  onClick={() => callOverride("provision")}
                  disabled={loading || !tenantId.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 text-gray-900 px-5 py-3 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <PlusCircle className="w-4 h-4" />
                  Provision Defaults
                </button>
              </div>

              {result && (
                <div className={`mt-4 rounded-xl border px-4 py-3 text-sm font-medium ${result === 'Success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                  {result}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Overage Monitor */}
          <div className="lg:col-span-2 space-y-6">
             <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Live Overage Monitor</h2>
             <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-gray-50 border-b border-gray-200">
                     <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Tenant</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Usage (Mins)</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Pending Bill</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {tenants.map((t) => {
                     const overage = Math.max(0, (t.used_minutes || 0) - (t.max_minutes || 0));
                     const unbilled = overage - (t.billed_overage_minutes || 0);
                     const pendingUSD = (unbilled * (t.overage_rate || 0.15)).toFixed(2);
                     
                     return (
                       <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                         <td className="px-6 py-4">
                           <div className="font-bold text-gray-900">{t.name || "Unnamed"}</div>
                           <div className="text-[10px] text-gray-400 font-mono uppercase">{t.id.slice(0, 8)}...</div>
                         </td>
                         <td className="px-6 py-4">
                           <div className="flex flex-col items-center">
                              <span className="text-sm font-medium text-gray-700">{t.used_minutes} / {t.max_minutes}</span>
                              <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                <div 
                                  className={`h-full ${overage > 0 ? 'bg-orange-500' : 'bg-blue-500'}`} 
                                  style={{ width: `${Math.min(100, (t.used_minutes / t.max_minutes) * 100)}%` }}
                                />
                              </div>
                           </div>
                         </td>
                         <td className="px-6 py-4 text-right">
                           {unbilled > 0 ? (
                             <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 text-orange-700 rounded-lg font-bold">
                               <TrendingUp className="w-3 h-3" />
                               ${pendingUSD}
                             </div>
                           ) : (
                             <span className="text-gray-400 font-medium">$0.00</span>
                           )}
                         </td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
               {tenants.length === 0 && (
                 <div className="p-12 text-center text-gray-400 italic">No usage data found.</div>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
