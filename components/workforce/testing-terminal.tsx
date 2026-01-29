"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, Bot, User, Zap, ShieldCheck } from 'lucide-react';

export function TestingTerminal({ agentConfig }: { agentConfig: any }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const testAgent = async () => {
    if (!input) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsProcessing(true);

    // This would call your /api/ai/test-node route
    // passing the agentConfig.system_prompt + the user input
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `[SIMULATED RESPONSE]: Based on my ${agentConfig.risk_threshold} confidence threshold, I have processed your request using the ${agentConfig.tools[0] || 'Base'} tool. How else can I assist?` 
      }]);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="mt-8 rounded-[2rem] border border-slate-800 bg-black/40 p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Terminal size={16} className="text-sky-500" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Agent Logic Debugger</h4>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span className="text-[9px] font-bold text-slate-500 uppercase">Sandbox Mode Active</span>
        </div>
      </div>

      <div className="h-48 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
        {messages.length === 0 && (
          <p className="text-[10px] text-slate-600 italic text-center mt-12 uppercase font-bold tracking-widest">
            Send a message to test the new DNA configuration...
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-[11px] font-medium leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-sky-500/10 border border-sky-500/20 text-sky-100' 
                : 'bg-slate-800 border border-slate-700 text-slate-300'
            }`}>
              <div className="flex items-center gap-2 mb-1 opacity-50">
                {msg.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                <span className="text-[8px] font-black uppercase">{msg.role}</span>
              </div>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <input 
          type="text" 
          placeholder="Type a test prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && testAgent()}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-4 pr-12 text-xs text-white outline-none focus:border-sky-500/50 transition-all"
        />
        <button 
          onClick={testAgent}
          disabled={isProcessing}
          className="absolute right-2 top-1.5 p-2 bg-sky-500 rounded-lg text-black hover:bg-sky-400 transition-colors"
        >
          {isProcessing ? <Zap size={14} className="animate-spin" /> : <Send size={14} />}
        </button>
      </div>
    </div>
  );
}
