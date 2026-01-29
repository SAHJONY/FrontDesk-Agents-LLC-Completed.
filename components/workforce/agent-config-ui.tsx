"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Settings2, 
  ShieldAlert, 
  Terminal, 
  Volume2, 
  Mail, 
  MessageSquare,
  Key
} from 'lucide-react';

export function AgentConfigUI() {
  const [activeTab, setActiveTab] = useState('voice');
  const [isSaving, setIsSaving] = useState(false);
  
  const [config, setConfig] = useState({
    name: 'Voice Pro Node-01',
    system_prompt: 'You are a professional assistant for a high-end medical clinic. Your goal is to book appointments and handle billing inquiries with extreme empathy...',
    tools: ['bland_ai', 'cal_com', 'stripe'],
    risk_threshold: 0.85
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Logic to sync with Supabase: 
    // await supabase.from('workforce_agents').update(config).eq('type', activeTab);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/40 overflow-hidden">
      <div className="grid lg:grid-cols-4 min-h-[500px]">
        
        {/* Sidebar Tabs */}
        <div className="border-r border-slate-800 p-6 space-y-2 bg-black/20">
          <div className="flex items-center gap-2 mb-6 px-2">
            <Settings2 className="w-4 h-4 text-sky-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Agent DNA</span>
          </div>
          
          <TabButton 
            active={activeTab === 'voice'} 
            onClick={() => setActiveTab('voice')} 
            icon={Volume2} 
            label="Voice Node" 
          />
          <TabButton 
            active={activeTab === 'email'} 
            onClick={() => setActiveTab('email')} 
            icon={Mail} 
            label="Email Node" 
          />
          <TabButton 
            active={activeTab === 'sms'} 
            onClick={() => setActiveTab('sms')} 
            icon={MessageSquare} 
            label="SMS Node" 
          />
        </div>

        {/* Configuration Panel */}
        <div className="lg:col-span-3 p-8 space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">
                {activeTab} Configuration
              </h3>
              <p className="text-xs text-slate-500 font-medium">Define behavior and tool access for the {activeTab} agent.</p>
            </div>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
            >
              {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
              {isSaving ? 'Saving...' : 'Sync DNA'}
            </button>
          </div>

          <div className="grid gap-6">
            {/* System Prompt */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-3 h-3" /> Base Personality (System Prompt)
              </label>
              <textarea 
                className="w-full h-32 bg-black/40 border border-slate-800 rounded-2xl p-4 text-sm text-slate-300 outline-none focus:border-sky-500/50 transition-colors font-medium leading-relaxed"
                value={config.system_prompt}
                onChange={(e) => setConfig({...config, system_prompt: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Tool Access */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Key className="w-3 h-3" /> Enabled Capabilities
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Inventory_API', 'Calendar_V3', 'Sentiment_Analysis', 'Human_Transfer'].map(tool => (
                    <button key={tool} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-[9px] font-bold text-slate-400 uppercase hover:border-sky-500 hover:text-white transition-all">
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guardrail Sensitivity */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <ShieldAlert className="w-3 h-3 text-amber-500" /> Escalation Threshold
                </label>
                <input 
                  type="range" min="0" max="100" 
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  value={config.risk_threshold * 100}
                  onChange={(e) => setConfig({...config, risk_threshold: parseInt(e.target.value)/100})}
                />
                <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase">
                  <span>Aggressive</span>
                  <span className="text-sky-400">{config.risk_threshold} confidence</span>
                  <span>Conservative</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
        active ? 'bg-sky-500 text-black shadow-[0_0_15px_rgba(56,189,248,0.3)]' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

function Loader2({ className }: { className?: string }) {
  return <Activity className={`${className} animate-spin`} />;
}
