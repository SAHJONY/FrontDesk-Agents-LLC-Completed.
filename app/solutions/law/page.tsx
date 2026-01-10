import React from 'react';
import Image from 'next/image';
import { Gavel, ShieldCheck, Scale, FileText } from 'lucide-react';

export default function LawSolutionPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <div className="flex items-center gap-3 text-brand-cyan mb-6">
              <Gavel className="w-6 h-6" />
              <span className="uppercase tracking-widest font-bold text-sm">Legal Sector</span>
            </div>
            <h1 className="text-6xl font-black italic uppercase mb-8 leading-tight">
              AI Nodes for <span className="text-brand-cyan">Law Firms</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
              Automate client intake, case screening, and document collection with specialized AI agents trained on legal compliance and professional ethics.
            </p>
            <div className="flex gap-4">
              <button className="fd-btn fd-btn-primary px-8 py-4">Deploy Legal Node</button>
              <button className="fd-btn fd-btn-ghost px-8 py-4">View Case Studies</button>
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
            <Image 
              src="/images/solution-legal.jpg" 
              alt="Legal AI Solutions" 
              fill 
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: ShieldCheck, title: "Compliance First", desc: "Built-in attorney-client privilege protocols and data encryption." },
            { icon: Scale, title: "Case Screening", desc: "Automated merit assessment for incoming personal injury and mass tort leads." },
            { icon: FileText, title: "Intake Automation", desc: "24/7 bilingual intake that syncs directly with your CMS (Clio, Filevine)." }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-brand-cyan/50 transition-colors">
              <feature.icon className="w-10 h-10 text-brand-cyan mb-6" />
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-zinc-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
