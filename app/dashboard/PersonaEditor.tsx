'use client';

import { useState } from 'react';
import { 
  UserCircleIcon, 
  SparklesIcon, 
  BeakerIcon, 
  ChatBubbleBottomCenterTextIcon 
} from '@heroicons/react/24/outline';

const presetPersonas = [
  {
    id: 'professional',
    name: 'Medical Professional',
    description: 'Calm, empathetic, and highly organized. Perfect for clinics.',
    instructions: 'You are a senior medical receptionist. Be extremely polite, patient, and use professional medical terminology where appropriate.'
  },
  {
    id: 'friendly',
    name: 'Friendly Local',
    description: 'Warm, energetic, and casual. Great for salons or local shops.',
    instructions: 'You are a helpful local neighbor. Use a warm tone, be enthusiastic about the services, and make the caller feel at home.'
  },
  {
    id: 'executive',
    name: 'Executive Assistant',
    description: 'Direct, efficient, and brief. Best for law firms or B2B.',
    instructions: 'You are a high-level executive assistant. Be brief, professional, and focus 100% on efficiency and scheduling.'
  }
];

export default function PersonaEditor({ initialInstructions }: { initialInstructions: string }) {
  const [selectedId, setSelectedId] = useState('professional');
  const [customInstructions, setCustomInstructions] = useState(initialInstructions);

  const handleApplyPreset = (id: string, instructions: string) => {
    setSelectedId(id);
    setCustomInstructions(instructions);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-8">
        <UserCircleIcon className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-bold text-white">AI Persona Editor</h2>
      </div>

      {/* Preset Selection */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {presetPersonas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => handleApplyPreset(persona.id, persona.instructions)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedId === persona.id 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <h4 className="font-bold text-white mb-1 text-sm">{persona.name}</h4>
            <p className="text-xs text-gray-500 leading-tight">{persona.description}</p>
          </button>
        ))}
      </div>

      {/* Manual Prompt Editor */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
          <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
          Custom System Instructions
        </label>
        <textarea
          value={customInstructions}
          onChange={(e) => setCustomInstructions(e.target.value)}
          rows={6}
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
          placeholder="Enter custom instructions for how your AI should behave..."
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <SparklesIcon className="w-4 h-4 text-blue-500" />
          Changes deploy to your live phone line instantly.
        </p>
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
          Update Persona
        </button>
      </div>
    </div>
  );
}
