import React from 'react';

export default function TermsOfSovereignty() {
  return (
    <div className="max-w-4xl mx-auto p-10 font-mono text-sm text-zinc-400 leading-relaxed bg-black">
      <h1 className="text-3xl font-black text-white italic mb-10 tracking-tighter uppercase border-b border-zinc-800 pb-4">
        Terms of Sovereignty
      </h1>

      {/* SECTION 1: GLOBAL NODE OPERATIONS */}
      <section className="mb-10 group">
        <div className="flex items-center mb-4">
          <span className="bg-cyan-500 text-black px-2 py-1 text-xs font-bold mr-4">SEC. 01</span>
          <h2 className="text-white font-bold uppercase tracking-widest">Global Node Operations</h2>
        </div>
        <div className="border-l-2 border-cyan-500/30 pl-6 group-hover:border-cyan-500 transition-colors">
          <p className="mb-4">
            By activating a **Global Node**, users agree to adhere to the regional multiplier logic and the permanent pricing tiers of 
            <span className="text-white font-bold"> $299, $699, $1,299, and $2,499</span> [cite: 2025-12-28].
          </p>
          <p className="text-zinc-500 italic">
            Infrastructure capacity (Conversations/month) is provisioned relative to the selected Node Tier and its assigned regional data-sovereignty overhead.
          </p>
        </div>
      </section>

      {/* SECTION 2: AI FLEET AUTONOMY */}
      <section className="mb-10 group">
        <div className="flex items-center mb-4">
          <span className="bg-zinc-700 text-white px-2 py-1 text-xs font-bold mr-4">SEC. 02</span>
          <h2 className="text-white font-bold uppercase tracking-widest">AI Fleet Autonomy</h2>
        </div>
        <div className="border-l-2 border-zinc-800 pl-6 group-hover:border-zinc-500 transition-colors">
          <p className="mb-4">
            Front Desk Agents LLC provides autonomous sales receptionists. Users are solely responsible for the 
            <span className="text-white"> scripts, tone configurations, and legal compliance</span> of all communications 
            deployed through the Script Engine.
          </p>
          <p className="text-zinc-500 italic">
            The platform acts as a neutral orchestrator; the user retains full liability for the conversational output of their active fleet.
          </p>
        </div>
      </section>

      {/* SECTION 3: SUCCESS FEES */}
      <section className="mb-10 group">
        <div className="flex items-center mb-4">
          <span className="bg-emerald-500 text-black px-2 py-1 text-xs font-bold mr-4">SEC. 03</span>
          <h2 className="text-white font-bold uppercase tracking-widest">Success Fees</h2>
        </div>
        <div className="border-l-2 border-emerald-500/30 pl-6 group-hover:border-emerald-500 transition-colors">
          <p className="mb-4">
            <span className="text-white font-bold underline">Enterprise Tier ($2,499)</span> users acknowledge the application of 
            success fee logic on recovered revenue and appointment bookings as calculated by the Pricing Service.
          </p>
          <p className="text-zinc-500 italic">
            Fees are calculated based on conversion metadata captured during autonomous interactions and are billed in addition to the monthly Node Access fee.
          </p>
        </div>
      </section>

      <div className="mt-20 pt-8 border-t border-zinc-900 text-[10px] uppercase tracking-widest text-zinc-600">
        Revision Date: January 19, 2026 // Auth ID: FD-SOV-2026-X
      </div>
    </div>
  );
}
