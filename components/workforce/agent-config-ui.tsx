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
  Key,
  Activity,
  Loader2
} from 'lucide-react';

// Real-world sync dependencies
import { syncAgentDNA } from '@/lib/supabase/agent-service';
import { toast } from 'sonner'; 

export function AgentConfigUI() {
  const [activeTab, setActiveTab] = useState('voice');
  const [isSaving, setIsSaving] = useState(false);
  
  // Local state for the form
  const [config, setConfig] = useState({
    name: 'Voice Pro Node-01',
    system_prompt: 'You are a professional assistant for a high-end medical clinic. Your goal is to book appointments and handle billing inquiries with extreme empathy...',
    tools: ['Inventory_API', 'Calendar_V3'],
    risk_threshold: 0.85
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await syncAgentDNA({
        type: activeTab as 'voice' | 'email' | 'sms',
        name: config.name,
        system_prompt: config.system_prompt,
        tools: config.tools,
        risk_threshold: config.risk_threshold
      });
      
      toast.success(`${activeTab.toUpperCase()} DNA Synchronized`, {
        description: "Neural weights and prompts updated in Supabase.",
        className: "bg-slate-900 border-sky-500 text-white font-black italic",
      });
    } catch (error) {
      toast.error("DNA Sync Failed", {
        description: "Verify database connection or RLS policies."
      });
    } finally {
      setIsSaving(false);
    }
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
              <p className="text-xs text-slate-500 font-medium italic">Define neural boundaries for the {activeTab} agent.</p>
            </div>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)]"
            >
              {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
              {isSaving ? 'Syncing...' : 'Sync DNA'}
            </button>
          </div>

          <div className="grid gap-6">
            {/* System Prompt */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-3 h-3 text-sky-500" /> System Prompt (Agent Personality)
              </label>
              <textarea 
                className="w-full h-48 bg-black/40 border border-slate-800 rounded-2xl p-4 text-sm text-slate-300 outline-none focus:border-sky-500/50 transition-colors font-medium leading-relaxed resize-none scrollbar-hide"
                value={config.system_prompt}
                onChange={(e) => setConfig({...config, system_prompt: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Tool Access */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Key className="w-3 h-3 text-sky-500" /> Enabled Capabilities
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Inventory_API', 'Calendar_V3', 'Sentiment_Analysis', 'Human_Transfer'].map(tool => (
                    <button 
                      key={tool} 
                      className={`px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase transition-all ${
                        config.tools.includes(tool) 
                          ? 'bg-sky-500/10 border-sky-500/50 text-sky-400' 
                          : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500'
                      }`}
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guardrail Sensitivity */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <ShieldAlert className="w-3 h-3 text-amber-500" /> Escalation Threshold
                </label>
                <input 
                  type="range" min="0" max="100" 
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  value={config.risk_threshold * 100}
                  onChange={(e) => setConfig({...config, risk_threshold: parseInt(e.target.value)/100})}
                />
                <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase italic">
                  <span>Aggressive</span>
                  <span className="text-sky-400">{config.risk_threshold.toFixed(2)} confidence req.</span>
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
        active 
          ? 'bg-sky-500 text-black shadow-[0_0_15px_rgba(56,189,248,0.3)]' 
          : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}
