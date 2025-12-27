'use client';

import { ShareIcon, ChatBubbleLeftRightIcon, PhoneIcon, BoltIcon } from '@heroicons/react/24/outline';

export const WorkforceOrchestrator = () => {
  return (
    <div className="p-8 bg-[#050505] border border-cyan-500/20 rounded-[40px] shadow-[0_0_50px_rgba(6,182,212,0.1)]">
      <div className="flex items-center gap-3 mb-8">
        <BoltIcon className="w-6 h-6 text-cyan-500 animate-pulse" />
        <h3 className="text-xl font-black uppercase italic text-white tracking-tighter">
          Workforce <span className="text-cyan-500">Hive-Mind</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CROSS-CHANNEL SYNC CARD */}
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 relative group">
          <div className="absolute top-4 right-4 text-[8px] font-black text-emerald-500 uppercase">Synced</div>
          <PhoneIcon className="w-8 h-8 text-slate-500 mb-4 group-hover:text-cyan-500 transition-colors" />
          <h4 className="text-[10px] font-black uppercase text-white mb-2">Voice-to-WhatsApp Pivot</h4>
          <p className="text-[9px] text-slate-500 uppercase leading-relaxed">
            Autonomous follow-up triggered if voice latency exceeds market norms or lead is unreachable.
          </p>
        </div>

        {/* CULTURAL RL CARD */}
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 relative group">
          <div className="absolute top-4 right-4 text-[8px] font-black text-cyan-500 uppercase italic">RL Active</div>
          <ShareIcon className="w-8 h-8 text-slate-500 mb-4 group-hover:text-cyan-500 transition-colors" />
          <h4 className="text-[10px] font-black uppercase text-white mb-2">Regional CQ Adaptation</h4>
          <p className="text-[9px] text-slate-500 uppercase leading-relaxed">
            Agents currently optimizing for <span className="text-cyan-500 font-bold">Nigeria (en-NG)</span> market etiquette.
          </p>
        </div>

        {/* REVENUE NEGOTIATOR CARD */}
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 relative group">
          <div className="absolute top-4 right-4 text-[8px] font-black text-amber-500 uppercase italic">Negotiating</div>
          <ChatBubbleLeftRightIcon className="w-8 h-8 text-slate-500 mb-4 group-hover:text-cyan-500 transition-colors" />
          <h4 className="text-[10px] font-black uppercase text-white mb-2">Margin-Safe Closing</h4>
          <p className="text-[9px] text-slate-500 uppercase leading-relaxed">
            SARA authorized to utilize up to <span className="text-amber-500 font-bold">12% Margin</span> to secure high-value legal leads.
          </p>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">
          Autonomous Workforce v3.0 • Reinforcement Learning Enabled
        </p>
      </div>
    </div>
  );
};
