import React, { useState } from 'react';
import { Play, Square, Volume2, Mic } from 'lucide-react';

export const VoiceDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Demo samples representing our market-aware synthesis
  const samples = [
    { label: 'Western (Professional)', accent: 'English - US', tier: 'Professional+' },
    { label: 'Growth Market (Native)', accent: 'Portuguese - BR', tier: 'Global Node' },
    { label: 'Elite (Multi-lingual)', accent: 'Mandarin - CN', tier: 'Elite Hub' },
  ];

  return (
    <div className="max-w-4xl mx-auto my-20 p-8 rounded-3xl border border-blue-500/30 bg-slate-900/50 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">Live Node Preview</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Hear the Elite Difference.</h2>
          <p className="text-slate-400 mb-6">
            Experience our ultra-low latency voice synthesis. These agents are trained on your specific business data to sound like local experts.
          </p>
          
          <div className="space-y-3">
            {samples.map((sample, i) => (
              <button 
                key={i}
                className="w-full flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-600/10 rounded-lg group-hover:bg-blue-600/20">
                    <Volume2 className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold text-sm">{sample.label}</div>
                    <div className="text-slate-500 text-xs">{sample.accent}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-600 uppercase border border-slate-800 px-2 py-1 rounded">
                  {sample.tier}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-64 h-64 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
          <div className="relative mb-6">
            <div className={`absolute inset-0 bg-blue-600/20 rounded-full blur-xl transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="relative w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/40"
            >
              {isPlaying ? <Square className="w-8 h-8 text-white fill-white" /> : <Play className="w-8 h-8 text-white fill-white ml-1" />}
            </button>
          </div>
          <div className="text-white font-bold mb-1">Interactive Demo</div>
          <div className="text-slate-500 text-xs">Click to simulate an inbound sales call</div>
        </div>
      </div>
    </div>
  );
};
