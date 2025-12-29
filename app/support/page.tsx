import React from 'react';
import { LifeBuoy, MessageSquare, Zap } from 'lucide-react';

export default function SupportHub() {
  return (
    <div className="p-8 max-w-6xl mx-auto relative z-10">
      <h1 className="text-4xl font-black mb-12 italic">COMMAND SUPPORT</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="titan-card flex flex-col items-center text-center">
          <Zap className="w-10 h-10 text-brand-cyan mb-4" />
          <h3 className="text-white font-bold mb-2">Instant Node Reset</h3>
          <p className="text-slate-500 text-sm">Force resync your AI fleet across all global nodes.</p>
        </div>
        
        <div className="titan-card flex flex-col items-center text-center border-brand-cyan/20">
          <MessageSquare className="w-10 h-10 text-brand-cyan mb-4" />
          <h3 className="text-white font-bold mb-2">Live Fleet Support</h3>
          <p className="text-slate-500 text-sm">24/7 technical assistance for Elite Tier partners.</p>
        </div>
        
        <div className="titan-card flex flex-col items-center text-center">
          <LifeBuoy className="w-10 h-10 text-brand-cyan mb-4" />
          <h3 className="text-white font-bold mb-2">Documentation</h3>
          <p className="text-slate-500 text-sm">Access the full API and integration architecture.</p>
        </div>
      </div>
    </div>
  );
}
