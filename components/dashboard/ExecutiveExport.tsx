'use client';

import { FileText, Download, ShieldCheck, ChevronRight } from 'lucide-react';

export const ExecutiveExport = () => {
  return (
    <div className="p-10 bg-[#080a0f] border border-white/5 rounded-sm relative overflow-hidden group">
      {/* Background Aesthetic */}
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <FileText className="w-32 h-32 text-white" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-cyan-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">Governance & Compliance</span>
          </div>
          <h3 className="text-2xl font-bold uppercase tracking-tighter text-white mb-4">
            Executive Summary <br /><span className="text-slate-500">Board Briefing PDF</span>
          </h3>
          <p className="text-[11px] text-slate-500 uppercase tracking-widest leading-relaxed">
            Generate a high-fidelity audit of your agentic workforce yield. Designed for institutional stakeholders and board-level performance reviews.
          </p>
        </div>

        <button className="flex items-center gap-4 px-10 py-6 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-cyan-500 transition-all duration-500 group">
          Generate Briefing <Download className="w-4 h-4 transition-transform group-hover:translate-y-1" />
        </button>
      </div>

      {/* Forensic Footer */}
      <div className="mt-10 pt-6 border-t border-white/5 flex gap-8 items-center">
        <div className="flex items-center gap-2 text-[8px] font-bold text-slate-600 uppercase tracking-widest">
          <ChevronRight className="w-3 h-3" /> System-Protocol-7 Encrypted
        </div>
        <div className="flex items-center gap-2 text-[8px] font-bold text-slate-600 uppercase tracking-widest">
          <ChevronRight className="w-3 h-3" /> ISO/Agentic Standard 2025
        </div>
      </div>
    </div>
  );
};
