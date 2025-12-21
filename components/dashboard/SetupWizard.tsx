'use client';

import { useState } from 'react';
import { 
  GlobeAltIcon, 
  CpuChipIcon, 
  CommandLineIcon, 
  SparklesIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function SetupWizard() {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);

  const startAnalysis = () => {
    setIsScraping(true);
    // Simulating the Neural Scraper analyzing the website content
    setTimeout(() => {
      setIsScraping(false);
      setStep(2);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#000d1a] border border-white/5 rounded-[40px] p-12 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[100px]" />
      
      {/* STEP 1: URL INGESTION */}
      {step === 1 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500 rounded-2xl shadow-lg shadow-cyan-500/20">
              <GlobeAltIcon className="w-6 h-6 text-[#000814]" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Initialize <span className="text-cyan-500">Knowledge</span></h2>
          </div>
          
          <p className="text-slate-400 font-medium">Enter your business URL. Our Neural Scraper will ingest your FAQs, pricing, and service details to train your agent instantly.</p>
          
          <div className="space-y-4">
            <input 
              type="url" 
              placeholder="https://your-business.com" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-white placeholder:text-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all font-mono"
            />
            <button 
              onClick={startAnalysis}
              disabled={!url || isScraping}
              className="w-full py-6 bg-white text-[#000814] rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-cyan-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isScraping ? (
                <>Analyzing Site Architecture <CpuChipIcon className="w-4 h-4 animate-spin" /></>
              ) : (
                <>Begin Neural Training <SparklesIcon className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: AGENT SELECTION & DEPLOYMENT */}
      {step === 2 && (
        <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center">
            <CheckCircleIcon className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Knowledge Base <span className="text-emerald-500">Secured</span></h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">142 Data Points Ingested Successfully</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <button className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-cyan-500 transition-all group text-left">
              <p className="text-cyan-500 text-[9px] font-black uppercase tracking-widest mb-2">Inbound Focus</p>
              <h3 className="text-xl font-black text-white italic uppercase">Deploy Sara</h3>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed">Expert in customer support and appointment setting.</p>
            </button>
            <button className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-purple-500 transition-all group text-left">
              <p className="text-purple-500 text-[9px] font-black uppercase tracking-widest mb-2">Outbound Focus</p>
              <h3 className="text-xl font-black text-white italic uppercase">Deploy Alex</h3>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed">Engineered for cold outreach and sales acquisition.</p>
            </button>
          </div>

          <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-4">
            <CommandLineIcon className="w-5 h-5 text-slate-500" />
            <p className="text-[10px] font-mono text-slate-500 uppercase">Training log: Optimization Complete (99.4% Accuracy)</p>
          </div>
        </div>
      )}
    </div>
  );
}
