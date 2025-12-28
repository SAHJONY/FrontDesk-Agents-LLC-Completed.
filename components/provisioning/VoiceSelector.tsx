'use client';

import React, { useState } from 'react';
import { Play, Pause, Check, Volume2, Globe, Shield } from 'lucide-react';

const VOICES = [
  { id: 'v-1', name: 'The London Specialist', accent: 'British', traits: 'Sophisticated, Calm', sample: '/samples/london.mp3' },
  { id: 'v-2', name: 'The California Executive', accent: 'American', traits: 'Energetic, Precise', sample: '/samples/cali.mp3' },
  { id: 'v-3', name: 'The Sydney Associate', accent: 'Australian', traits: 'Relatable, Friendly', sample: '/samples/sydney.mp3' },
  { id: 'v-4', name: 'The Manhattan Partner', accent: 'Mid-Atlantic', traits: 'Authoritative, Swift', sample: '/samples/manhattan.mp3' }
];

export default function VoiceSelector({ onSelect }: any) {
  const [playing, setPlaying] = useState<string | null>(null);
  const [selected, setSelected] = useState('v-2');

  const togglePlay = (id: string) => {
    setPlaying(playing === id ? null : id);
    // In production: logic to play actual mp3 sample
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">
        Neural <span className="text-cyan-500">Signature</span>
      </h2>
      <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-12">
        Select the Institutional Voice for Node Deployment
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VOICES.map((voice) => (
          <div 
            key={voice.id}
            onClick={() => { setSelected(voice.id); onSelect(voice.id); }}
            className={`group p-6 border transition-all cursor-pointer relative overflow-hidden ${
              selected === voice.id ? 'border-cyan-500 bg-cyan-500/5' : 'border-white/10 bg-white/[0.02] hover:border-white/20'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-2 rounded-sm ${selected === voice.id ? 'bg-cyan-500 text-black' : 'bg-white/5 text-slate-500'}`}>
                <Volume2 className="w-4 h-4" />
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); togglePlay(voice.id); }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                {playing === voice.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
            </div>

            <h4 className="text-[11px] font-black uppercase tracking-widest text-white mb-1">{voice.name}</h4>
            <div className="flex gap-4 items-center">
              <span className="text-[9px] text-cyan-500 font-bold uppercase tracking-widest italic">{voice.accent}</span>
              <span className="text-[8px] text-slate-600 font-bold uppercase tracking-[0.2em]">{voice.traits}</span>
            </div>

            {selected === voice.id && (
              <div className="absolute top-2 right-2 text-cyan-500">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-white/[0.02] border border-white/5 flex items-center gap-6">
        <Shield className="w-8 h-8 text-slate-700" />
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-loose">
          All voices are rendered in 24-bit high-fidelity via the <span className="text-white">AEGIS-NEURAL-ENGINE</span>. Custom voice cloning is available for <span className="text-cyan-500">Elite Tier</span> nodes.
        </p>
      </div>
    </div>
  );
}
