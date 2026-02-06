'use client';

/**
 * FRONTDESK AGENTS: COGNITIVE ORCHESTRATION
 * Agent Initialization Node: Mission Parameters & Knowledge Ingestion
 */

import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  MessageSquare, 
  ShieldAlert, 
  Zap, 
  Save, 
  Upload,
  Globe,
  Settings2
} from 'lucide-react';
import Link from 'next/link';

export default function NewAgentPage() {
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeployment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    // Logic to sync agent parameters with the Edge Runtime
    setTimeout(() => setIsDeploying(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 lg:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumbs & Header */}
        <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          <Link href="/dashboard" className="hover:text-white transition-colors">Command Center</Link>
          <span className="text-zinc-800">/</span>
          <span className="text-blue-500">Initialize New Agent</span>
        </div>

        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">Initialize Agent</h1>
            <p className="text-zinc-500 text-[10px] font-mono tracking-[0.4em] uppercase mt-2">
              Node Type: Autonomous Revenue Representative
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4 px-6 py-3 bg-zinc-950 border border-zinc-900 rounded-2xl">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Edge Latency</span>
              <span className="text-xs font-mono text-emerald-500">14ms</span>
            </div>
            <Zap size={16} className="text-emerald-500" />
          </div>
        </header>

        <form onSubmit={handleDeployment} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Core Identity & Mission */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <Cpu className="text-blue-500" size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest italic">Cognitive Core Configuration</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Agent Callsign</label>
                  <input type="text" placeholder="e.g., SDR-Alpha-01" className="input-field" required />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 flex justify-between">
                    Mission Objectives (System Prompt)
                    <span className="text-blue-500 lowercase font-mono">prompt_v2.1_optimized</span>
                  </label>
                  <textarea 
                    rows={8} 
                    placeholder="Define the agent's persona, tonal guidelines, and primary KPIs..." 
                    className="input-field py-4 resize-none font-mono text-xs leading-relaxed"
                  />
                </div>
              </div>
            </section>

            <section className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-8">
              <div className="flex items-center gap-3 mb-8">
                <Database className="text-emerald-500" size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest italic">Knowledge Base Ingestion</h3>
              </div>
              
              <div className="border-2 border-dashed border-zinc-900 rounded-3xl p-12 text-center group hover:border-blue-600/50 transition-colors cursor-pointer">
                <Upload className="mx-auto text-zinc-700 group-hover:text-blue-500 transition-colors mb-4" size={32} />
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Drop PDF, TXT, or DOCX for Vector Indexing</p>
                <p className="text-[9px] text-zinc-700 mt-2 font-mono">Max Payload: 50MB per Node</p>
              </div>
            </section>
          </div>

          {/* Operational Parameters Sidebar */}
          <div className="space-y-6">
            <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-[0_20px_40px_rgba(37,99,235,0.2)]">
              <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <Settings2 size={16} /> Runtime Settings
              </h3>
              <div className="space-y-6">
                <ParameterToggle label="Multi-Lingual Support" defaultChecked />
                <ParameterToggle label="Direct Calendar Access" />
                <ParameterToggle label="CRM Data Sync" defaultChecked />
                
                <button 
                  type="submit"
                  disabled={isDeploying}
                  className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] mt-4 hover:bg-zinc-900 transition-all flex items-center justify-center gap-2"
                >
                  {isDeploying ? 'Deploying...' : <><Save size={14} /> Commit Deployment</>}
                </button>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-zinc-500">
                <ShieldAlert size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Compliance Guardrails</span>
              </div>
              <p className="text-[9px] text-zinc-600 leading-relaxed font-bold uppercase tracking-widest">
                All transmissions are recorded and analyzed for SOC2 compliance. AI hallucinatory variance is restricted to &lt;2%.
              </p>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 1rem 1.5rem;
          background: #000;
          border: 1px solid #1a1a1a;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: white;
          outline: none;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #2563eb;
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.1);
        }
      `}</style>
    </div>
  );
}

function ParameterToggle({ label, defaultChecked }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      <div className={`w-10 h-5 rounded-full relative ${defaultChecked ? 'bg-black' : 'bg-blue-700'} border border-white/20`}>
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${defaultChecked ? 'right-1' : 'left-1'}`} />
      </div>
    </div>
  );
}
