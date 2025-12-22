'use client';

import React, { useState } from 'react';
import { Mic2, Play, Pause, Save, Volume2 } from 'lucide-react';

const VOICES = [
  { id: 'v1', name: 'Marcus', persona: 'Professional / Growth', accent: 'US Direct', previewUrl: '#' },
  { id: 'v2', name: 'Elena', persona: 'Support / Empathetic', accent: 'UK Soft', previewUrl: '#' },
  { id: 'v3', name: 'Julian', persona: 'Executive / Calm', accent: 'US Deep', previewUrl: '#' },
];

export const VoiceSelector = () => {
  const [selectedVoice, setSelectedVoice] = useState('v1');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handleSaveVitals = async () => {
    // Logic: Update ElevenLabs Voice ID in Supabase BusinessConfig
    alert("Vocal Signature Updated.");
  };

  return (
    <div className="bg-[#000d1a] border border-white/5 rounded-[45px] p-10 shadow-2xl relative">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-2xl">
            <Mic2 className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">Vocal Identity Matrix</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Assign AI Personas to Active Nodes</p>
          </div>
        </div>
        <button 
          onClick={handleSaveVitals}
          className="px-6 py-2 bg-purple-500 text-white rounded-xl text-[10px] font-black uppercase hover:bg-purple-400 transition-all flex items-center gap-2"
        >
          <Save className="w-3 h-3" /> Save Config
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VOICES.map((voice) => (
          <div 
            key={voice.id}
            onClick={() => setSelectedVoice(voice.id)}
            className={`p-6 rounded-[30px] border transition-all cursor-pointer group relative ${
              selectedVoice === voice.id ? 'border-purple-500 bg-purple-500/5' : 'border-white/5 bg-white/[0.02] hover:border-white/10'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-2 rounded-lg ${selectedVoice === voice.id ? 'bg-purple-500 text-black' : 'bg-white/5 text-slate-500'}`}>
                <Volume2 className="w-4 h-4" />
              </div>
              <button 
                className="text-slate-500 hover:text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); setIsPlaying(isPlaying === voice.id ? null : voice.id); }}
              >
                {isPlaying === voice.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
            
            <h3 className="text-lg font-black text-white italic tracking-tighter">{voice.name}</h3>
            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-1">{voice.persona}</p>
            <p className="text-[9px] text-slate-600 uppercase mt-4 font-mono">{voice.accent}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
