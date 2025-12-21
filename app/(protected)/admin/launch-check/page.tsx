'use client';

import { 
  RocketLaunchIcon, 
  KeyIcon, 
  CircleStackIcon, 
  CloudArrowUpIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function LaunchChecklist() {
  const categories = [
    {
      title: "Neural Infrastructure",
      items: [
        "Vapi/Retell API Keys validated in .env.local",
        "OpenAI GPT-4o-Turbo model allocation confirmed",
        "Twilio/Vonage PSTN trunking balance > $500",
        "Voice cloning signatures verified for 'Sara' and 'Alex'"
      ]
    },
    {
      title: "Database & Sovereignty",
      items: [
        "Supabase RLS (Row Level Security) policies enabled",
        "Lead ingestion triggers tested for duplicate prevention",
        "Call result webhook (endpoint) verified and live",
        "PostgreSQL 'client_invitations' table indexing optimized"
      ]
    },
    {
      title: "Brand Integrity & UX",
      items: [
        "American English spelling audit on all 12 platform pages",
        "Glassmorphism transparency levels set for 100% text visibility",
        "Magic Link email templates branded and tested",
        "High-fidelity cinematic assets loading via Next.js Image optimization"
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-32">
      {/* HEADER */}
      <div className="border-b border-white/5 pb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-cyan-500 rounded-2xl">
            <RocketLaunchIcon className="w-6 h-6 text-[#000814]" />
          </div>
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
            Operational <span className="text-cyan-500">Readiness</span>
          </h1>
        </div>
        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.4em]">
          Final Pre-Flight Authorization • FrontDesk Agents LLC
        </p>
      </div>

      {/* CHECKLIST GRID */}
      <div className="grid gap-8">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-[#000d1a] border border-white/5 rounded-[40px] overflow-hidden">
            <div className="px-10 py-8 border-b border-white/5 bg-white/[0.01]">
              <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">{cat.title}</h2>
            </div>
            <div className="p-10 space-y-6">
              {cat.items.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 w-5 h-5 rounded-md border-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors flex items-center justify-center cursor-pointer">
                    <div className="w-2 h-2 bg-cyan-500 scale-0 group-active:scale-100 transition-transform" />
                  </div>
                  <span className="text-sm text-slate-400 font-medium tracking-tight uppercase">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* EMERGENCY PROTOCOL */}
      <div className="bg-red-500/5 border border-red-500/20 p-10 rounded-[40px] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
          <div>
            <h3 className="text-lg font-black text-white uppercase italic">Safety Kill-Switch</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Global Neural Shutdown Protocol</p>
          </div>
        </div>
        <button className="px-10 py-4 bg-red-500/10 border border-red-500/50 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
          Force Offline
        </button>
      </div>

      {/* AUTHORIZATION BUTTON */}
      <div className="text-center pt-10">
        <button className="px-20 py-8 bg-cyan-500 text-[#000814] rounded-3xl font-black text-sm uppercase tracking-[0.5em] shadow-[0_0_80px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 transition-all italic">
          Authorize Full-Scale Deployment
        </button>
      </div>
    </div>
  );
}
