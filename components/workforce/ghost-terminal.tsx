"use client";

import React, { useState } from 'react';
import { Ghost, Mic, Send, Zap } from 'lucide-react';

export function GhostTerminal({ callId }: { callId: string }) {
  const [text, setText] = useState("");
  const [isGhosting, setIsGhosting] = useState(true);

  const sendGhostMessage = async () => {
    if (!text) return;
    
    // Optimistic UI
    const currentText = text;
    setText("");

    await fetch('/api/workforce/ghost', {
      method: 'POST',
      body: JSON.stringify({ callId, text: currentText }),
    });
  };

  return (
    <div className="p-4 bg-slate-950 border-t border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`h-1.5 w-1.5 rounded-full ${isGhosting ? 'bg-purple-500 animate-pulse' : 'bg-slate-600'}`} />
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
            {isGhosting ? "Ghost Mode Active (Voice Synthesis)" : "Chat Mode"}
          </span>
        </div>
        <button 
          onClick={() => setIsGhosting(!isGhosting)}
          className={`p-1.5 rounded-lg transition-all ${isGhosting ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-500'}`}
        >
          <Ghost size={12} />
        </button>
      </div>

      <div className="relative">
        <input 
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendGhostMessage()}
          placeholder="Speak through the agent..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-4 pr-12 text-xs text-white outline-none focus:border-purple-500/50 transition-all font-medium italic"
        />
        <button 
          onClick={sendGhostMessage}
          className="absolute right-2 top-1.5 p-2 bg-purple-600 rounded-xl text-white hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/20"
        >
          <Zap size={14} />
        </button>
      </div>
    </div>
  );
}
