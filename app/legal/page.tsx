'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Elite Legal Risk Dashboard - Agentic Workforce Intelligence
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Gavel,
  FileText
} from 'lucide-react';

export default function LegalRiskDashboard() {
  const { user } = useAuth();
  const [accuracyScore, setAccuracyScore] = useState(94);
  const [activeIssues, setActiveIssues] = useState([
    { id: 1, issue: "Jurisdictional Competence (Art. 5)", status: "verified", score: 98 },
    { id: 2, issue: "Standard of Review - De Novo", status: "verified", score: 92 },
    { id: 3, issue: "Contrary Authority: Smith v. Global", status: "warning", score: 85 }
  ]);

  // Elite Tier Enforcement [cite: 2025-12-28]
  if (user?.tier !== 'elite') return (
    <div className="h-screen flex items-center justify-center bg-black p-6 text-center">
      <div className="max-w-md">
        <Scale className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
        <h2 className="text-2xl font-black uppercase text-white mb-2">Elite Access Required</h2>
        <p className="text-zinc-500 mb-6 uppercase text-[10px] tracking-[0.2em]">Agentic Legal Risk Analysis is reserved for Elite Hub Members.</p>
        <button className="px-8 py-3 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-xl">Upgrade to Elite</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header: Workforce Identity */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <Gavel className="text-blue-500 w-6 h-6" />
               <span className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">LFAW // Global Node</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Legal Risk Audit</h1>
          </div>
          
          <div className="flex items-center gap-8 bg-zinc-900/50 border border-zinc-800 p-6 rounded-[2rem]">
            <div className="text-right">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">System Accuracy</p>
              <p className="text-3xl font-black italic text-green-500">{accuracyScore}%</p>
            </div>
            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${accuracyScore > 90 ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'border-yellow-500'}`}>
               <ShieldCheck className={accuracyScore > 90 ? 'text-green-500' : 'text-yellow-500'} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Risk Ledger */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-4 px-2">Issue Analysis Ledger</h2>
            {activeIssues.map((item) => (
              <div key={item.id} className="glass-panel group hover:border-blue-500/50 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${item.status === 'verified' ? 'bg-green-500/5 text-green-500' : 'bg-yellow-500/5 text-yellow-500'}`}>
                      {item.status === 'verified' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-black uppercase tracking-tight text-sm">{item.issue}</h3>
                      <p className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-widest">Confidence: {item.score}%</p>
                    </div>
                  </div>
                  <ChevronRight className="text-zinc-800 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            ))}

            {/* Verification Terminal (Placeholder) */}
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 font-mono">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-blue-500 uppercase font-bold">Live Agentic Retrieval...</span>
              </div>
              <p className="text-[12px] text-zinc-400 leading-relaxed italic">
                {">"} ANALYZING: ICC Rules of Arbitration (2021) Art. 34 <br/>
                {">"} CROSS-REFERENCING: Binding precedents in Civil Law jurisdictions <br/>
                {">"} STATUS: Authority Control verified. Quote hygiene 100%.
              </p>
            </div>
          </div>

          {/* Sidebar: Authority Checklist */}
          <div className="space-y-8">
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-20"><Scale className="w-24 h-24 rotate-12" /></div>
               <h3 className="text-xl font-black uppercase tracking-tighter italic mb-4">Authority Control</h3>
               <ul className="space-y-4 relative z-10">
                 <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wide">Pincites Verified (Art./Para.)</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wide">Merits-First Framing Applied</span>
                 </li>
                 <li className="flex items-start gap-3 opacity-50">
                    <Search className="w-4 h-4 mt-0.5 shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wide italic">Scanning Contrary Law...</span>
                 </li>
               </ul>
            </div>

            <div className="border border-zinc-800 rounded-[2.5rem] p-8 bg-zinc-950">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Workforce Tools</h3>
               <div className="grid grid-cols-1 gap-4">
                  <button className="flex items-center gap-3 p-4 bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition-all">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Export structured memo</span>
                  </button>
                  <button className="flex items-center gap-3 p-4 bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition-all">
                    <Scale className="w-4 h-4 text-purple-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Authority Comparison</span>
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
