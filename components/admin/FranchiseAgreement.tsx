'use client';

import { ShieldAlert, FileText, Globe, Scale } from 'lucide-react';

export default function FranchiseAgreement({ partnerName, territory }: { partnerName: string, territory: string }) {
  return (
    <div className="max-w-4xl mx-auto bg-[#0a0a0b] border border-white/10 rounded-[40px] p-12 shadow-2xl">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
            <Scale className="text-cyan-500 w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">Sovereign Node Franchise Agreement</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-500 uppercase">Document Ref</p>
          <p className="text-xs font-mono text-cyan-500">FRAN-{territory}-2025</p>
        </div>
      </div>

      <div className="space-y-8 text-slate-400 text-sm leading-relaxed overflow-y-auto h-96 pr-6 scrollbar-thin scrollbar-thumb-cyan-500/20">
        <section>
          <h3 className="text-white font-black uppercase text-[10px] tracking-widest mb-2">1. GRANT OF SOVEREIGNTY</h3>
          <p>
            FrontDesk Agents LLC (The Core) hereby grants **{partnerName}** (The Partner) the exclusive right to deploy and manage Neural Nodes within the territory of **{territory}**. The Partner is authorized to represent the platform as a local infrastructure provider.
          </p>
        </section>

        <section>
          <h3 className="text-white font-black uppercase text-[10px] tracking-widest mb-2">2. NEURAL IP PROTECTION</h3>
          <p>
            All AI models, Medic protocols, and Guardian security layers remain the sole property of The Core. The Partner shall not attempt to reverse-engineer the Neural Mesh or bypass the Global Revenue Aggregator.
          </p>
        </section>

        <section>
          <h3 className="text-white font-black uppercase text-[10px] tracking-widest mb-2">3. FINANCIAL SETTLEMENT</h3>
          <p>
            The Partner shall receive a 20% commission on all localized subscriptions within the territory. All transactions must be processed via the **Global Tax Compliance Engine** to ensure regional legal standing.
          </p>
        </section>

        <section className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
          <div className="flex gap-4">
            <ShieldAlert className="text-red-500 shrink-0" />
            <p className="text-[11px] font-bold text-red-200">
              TERMINATION PROTOCOL: Failure to maintain local regulatory standards or unauthorized access to the Core Admin ID will result in immediate Node Deactivation without refund.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-cyan-500" />
          <span className="text-[10px] font-black uppercase tracking-widest">I accept the Sovereign Terms</span>
        </div>
        <button className="px-10 py-4 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-xl hover:shadow-[0_0_30px_#06b6d4] transition-all">
          Execute Agreement
        </button>
      </div>
    </div>
  );
}
