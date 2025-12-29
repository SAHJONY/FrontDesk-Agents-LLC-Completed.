'use client';
import React, { useState } from 'react';
import { Save, Terminal } from 'lucide-react';

export const ScriptEditor = () => {
  const [script, setScript] = useState("// Initialize AI Receptionist Logic...");

  return (
    <div className="titan-card overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-brand-cyan" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Sales_Logic_V2.sh</span>
        </div>
        <button className="flex items-center gap-2 text-brand-cyan text-[10px] font-bold uppercase hover:text-white transition-colors">
          <Save className="w-3 h-3" /> Save Changes
        </button>
      </div>
      <textarea 
        value={script}
        onChange={(e) => setScript(e.target.value)}
        className="w-full h-64 bg-[#050505] p-6 text-brand-cyan font-mono text-xs focus:outline-none resize-none"
      />
    </div>
  );
};
