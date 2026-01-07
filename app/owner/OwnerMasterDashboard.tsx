"use client";

import React, { useState } from "react";
// Importación correcta para 'export default' (sin llaves)
import UniversalVault from "@/components/owner/UniversalVault";
import AuditLog from "@/components/owner/AuditLog";

/**
 * OWNER MASTER DASHBOARD
 * Core control for Global Revenue Workforce.
 * Deployment: pdx1 (Portland)
 */
export default function OwnerMasterDashboard() {
  const [tab, setTab] = useState<"vault" | "audit">("vault");

  return (
    <div className="min-h-screen bg-black text-white p-8 selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-white/5 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Owner Dashboard</h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-2">
              FrontDesk Node: Portland / Integrity Verified
            </p>
          </div>
          
          <nav className="flex gap-2">
            <button 
              onClick={() => setTab("vault")}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                tab === "vault" 
                  ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
                  : "bg-zinc-900 text-zinc-500 hover:text-white border border-white/5"
              }`}
            >
              Universal Vault
            </button>
            <button 
              onClick={() => setTab("audit")}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                tab === "audit" 
                  ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
                  : "bg-zinc-900 text-zinc-500 hover:text-white border border-white/5"
              }`}
            >
              Forensic Audit
            </button>
          </nav>
        </header>

        <main className="animate-in fade-in duration-500">
          {tab === "vault" ? <UniversalVault /> : <AuditLog />}
        </main>
      </div>
    </div>
  );
}
