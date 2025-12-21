'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  Settings2, 
  UserCircle2, 
  MessageSquare, 
  Save, 
  ChevronRight,
  Sparkles,
  Bot
} from 'lucide-react';

const AGENT_PROFILES = [
  { id: 'sara', name: 'SARA', role: 'Sales & Growth', desc: 'Aggressive appointment setting and lead qualification.' },
  { id: 'alex', name: 'ALEX', role: 'Customer Support', desc: 'Friendly, helpful, and focused on solving inquiries.' }
];

export default function AgentSettings() {
  const supabase = createClient();
  const [selectedAgent, setSelectedAgent] = useState('sara');
  const [prompt, setPrompt] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load existing prompt from database on mount
  useEffect(() => {
    async function loadConfig() {
      const { data } = await supabase
        .from('agent_config')
        .select('system_prompt')
        .eq('agent_id', selectedAgent)
        .single();
      
      if (data) setPrompt(data.system_prompt);
    }
    loadConfig();
  }, [selectedAgent]);

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from('agent_config')
      .upsert({ agent_id: selectedAgent, system_prompt: prompt });
    
    if (!error) alert('Protocol updated successfully.');
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-2xl">
            <Settings2 className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">Agent Configuration</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">FrontDesk Agents Intelligence Layer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Agent Selection List */}
          <div className="space-y-4">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Active Personas</h2>
            {AGENT_PROFILES.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`w-full text-left p-6 rounded-[24px] border transition-all ${
                  selectedAgent === agent.id 
                  ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
                  : 'bg-[#0A0A0A] border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <Bot className={`w-5 h-5 ${selectedAgent === agent.id ? 'text-blue-500' : 'text-slate-600'}`} />
                  {selectedAgent === agent.id && <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />}
                </div>
                <p className="font-black text-white italic">{agent.name}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">{agent.role}</p>
              </button>
            ))}
          </div>

          {/* Logic Editor */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <h3 className="text-xs font-black text-white uppercase tracking-widest">System Instructions</h3>
              </div>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter the AI persona logic here..."
                className="w-full h-64 bg-black/40 border border-white/5 rounded-2xl p-6 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all font-mono leading-relaxed"
              />

              <div className="mt-8 flex justify-between items-center">
                <p className="text-[9px] text-slate-600 italic font-medium max-w-[200px]">
                  Changes here take effect immediately for all subsequent calls.
                </p>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
