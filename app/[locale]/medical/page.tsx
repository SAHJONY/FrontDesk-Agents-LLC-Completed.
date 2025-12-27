'use client';

import React from 'react';
import { Stethoscope, Activity, ShieldCheck, HeartPulse } from 'lucide-react';

// FIXED: Added default export wrapper to comply with Next.js App Router standards
export default function MedicalVerticalPage() {
  return (
    <main className="min-h-screen bg-[#020305] pt-32">
      <MedicalVerticalSection />
    </main>
  );
}

function MedicalVerticalSection() {
  return (
    <div className="container mx-auto px-8 lg:px-16">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-3 px-4 py-1 bg-cyan-500/10 border border-cyan-500/20 mb-8">
          <HeartPulse className="w-3 h-3 text-cyan-500" />
          <span className="text-cyan-500 text-[9px] font-black uppercase tracking-[0.4em]">Vertical: Health-Tech Sovereign</span>
        </div>
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-8 italic">
          Medical <span className="text-slate-500">Intake Nodes</span>
        </h1>
        <p className="text-xl text-slate-400 font-light leading-relaxed mb-16 border-l border-white/10 pl-8 italic">
          HIPAA-compliant agentic workflows designed for high-volume clinical environments. Automated triage, scheduling, and patient synthesis.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pb-32">
        {[
          { icon: Stethoscope, title: "Clinical Triage", desc: "Autonomous patient assessment protocols." },
          { icon: Activity, title: "Real-time Sync", desc: "Direct EHR/EMR telemetry integration." },
          { icon: ShieldCheck, title: "Vault Security", desc: "Zero-knowledge encryption for PHI data." }
        ].map((feat, i) => (
          <div key={i} className="p-10 border border-white/5 bg-white/[0.02] rounded-sm">
            <feat.icon className="w-8 h-8 text-cyan-500 mb-6" />
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-3">{feat.title}</h4>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-loose">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
