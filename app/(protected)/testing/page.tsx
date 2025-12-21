'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  Send, Bot, User, RefreshCcw, 
  MessageSquare, Sparkles, AlertTriangle 
} from 'lucide-react';

export default function TestingSuite() {
  const supabase = createClient();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    supabase.from('agent_config').select('*').then(({ data }) => {
      if (data) {
        setAgents(data);
        if (data.length > 0) setSelectedAgent(data[0].id);
      }
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [chat]);

  const handleSend = async () => {
    if (!input.trim() || !selectedAgent) return;
    
    const userMsg = { role: 'user' as const, content: input };
    setChat(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const res = await fetch('/api/test-agent', {
      method: 'POST',
      body: JSON.stringify({ message: input, history: chat, agentId: selectedAgent })
    });
    
    const data = await res.json();
    setChat(prev => [...prev, { role: 'assistant', content: data.reply }]);
    setIsTyping(false);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6">
      
      {/* Configuration Sidebar */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="bg-[#000d1a] border border-white/5 p-6 rounded-[32px]">
          <h2 className="text-[10px] font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-cyan-500" /> Neural Selector
          </h2>
          <label className="text-[9px] font-bold text-slate-500 uppercase block mb-2">Active Personality</label>
          <select 
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-500/50"
          >
            {agents.map(a => <option key={a.id} value={a.id}>{a.name || 'Unnamed Agent'}</option>)}
          </select>
          <button 
            onClick={() => setChat([])}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 border border-white/5 rounded-xl text-[9px] font-black uppercase text-slate-500 hover:text-white transition-all"
          >
            <RefreshCcw className="w-3 h-3" /> Reset Session
          </button>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-[32px]">
          <div className="flex gap-3 text-amber-500 mb-3">
             <AlertTriangle className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase tracking-widest">Simulator Mode</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed uppercase">
            This environment mimics the AI's logic without triggering a PSTN uplink. Perfect for script debugging.
          </p>
        </div>
      </div>

      {/* Chat Terminal */}
      <div className="flex-1 bg-[#000d1a] border border-white/5 rounded-[40px] flex flex-col overflow-hidden shadow-2xl relative">
        <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6">
          {chat.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-20">
              <Bot className="w-12 h-12 mb-4" />
              <p className="text-xs font-black uppercase tracking-widest">Initialize conversation to begin testing</p>
            </div>
          )}
          {chat.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'assistant' ? '' : 'flex-row-reverse'}`}>
              <div className={`p-2 rounded-lg h-fit ${msg.role === 'assistant' ? 'bg-cyan-500/10' : 'bg-white/5'}`}>
                {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-cyan-500" /> : <User className="w-4 h-4 text-slate-400" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed ${
                msg.role === 'assistant' 
                ? 'bg-white/[0.03] text-slate-300 rounded-tl-none' 
                : 'bg-cyan-500 text-[#000814] font-medium rounded-tr-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 animate-pulse">
              <div className="p-2 bg-cyan-500/10 rounded-lg h-fit"><Bot className="w-4 h-4 text-cyan-500" /></div>
              <div className="bg-white/[0.03] px-6 py-4 rounded-3xl rounded-tl-none text-[10px] font-black text-slate-500 uppercase tracking-widest">Processing Logic...</div>
            </div>
          )}
        </div>

        {/* Input Dock */}
        <div className="p-6 bg-black/20 border-t border-white/5">
          <div className="relative flex items-center">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Simulate a lead's response (e.g., 'I'm not interested, why are you calling?')..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-xs text-white outline-none focus:border-cyan-500/50"
            />
            <button 
              onClick={handleSend}
              className="absolute right-3 p-2 bg-cyan-500 rounded-xl text-[#000814] hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
