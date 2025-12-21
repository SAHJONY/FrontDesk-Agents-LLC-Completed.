'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  Settings2, 
  MessageSquare, 
  Save, 
  Sparkles,
  Bot,
  Bell,
  BellOff,
  Cpu
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
  const [notifsEnabled, setNotifsEnabled] = useState(false);

  // Load existing prompt and check notification status
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
    setNotifsEnabled(Notification.permission === 'granted');
  }, [selectedAgent]);

  const toggleNotifications = async () => {
    const permission = await Notification.requestPermission();
    setNotifsEnabled(permission === 'granted');
  };

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from('agent_config')
      .upsert({ agent_id: selectedAgent, system_prompt: prompt });
    
    if (!error) {
      // Logic for a subtle success state instead of a generic alert
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000814] text-slate-300 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Cpu className="w-6 h-6 text-cyan-500" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">Neural Configuration</h1>
              <p className="text-[10px] text-cyan-500/50 font-bold uppercase tracking-[0.3em] mt-1">Intelligence Protocol Management</p>
            </div>
          </div>

          <button 
            onClick={toggleNotifications}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${
              notifsEnabled 
              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
              : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'
            }`}
          >
            {notifsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            Alerts: {notifsEnabled ? 'System Active' : 'System Muted'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Persona Selection */}
          <div className="space-y-4">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">Core Personas</h2>
            {AGENT_PROFILES.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`w-full text-left p-6 rounded-[28px] border transition-all duration-300 ${
                  selectedAgent === agent.id 
                  ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.1)]' 
                  : 'bg-[#000d1a] border-white/5 hover:border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <Bot className={`w-5 h-5 ${selectedAgent === agent.id ? 'text-cyan-400' : 'text-slate-600'}`} />
                  {selectedAgent === agent.id && <Sparkles className="w-3 h-3 text-cyan-300 animate-pulse" />}
                </div>
                <p className={`font-black uppercase italic tracking-tighter ${selectedAgent === agent.id ? 'text-white' : 'text-slate-500'}`}>{agent.name}</p>
                <p className="text-[9px] text-cyan-500/60 uppercase font-bold mt-1 tracking-widest">{agent.role}</p>
              </button>
            ))}
          </div>

          {/* Prompt Editor */}
          <div className="lg:col-span-2">
            <div className="bg-[#000d1a] border border-white/5 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl" />
              
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-4 h-4 text-cyan-500" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Logic Stream Editor</h3>
              </div>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Initialize agent system instructions..."
                className="w-full h-80 bg-black/40 border border-white/5 rounded-3xl p-6 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/30 transition-all font-mono leading-relaxed resize-none"
              />

              <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-cyan-500 rounded-full animate-pulse" />
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">
                    Live Sync Protocol Enabled
                  </p>
                </div>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-[#000814] rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(6,182,212,0.2)] disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Uploading Logic...' : 'Synchronize Agent'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
