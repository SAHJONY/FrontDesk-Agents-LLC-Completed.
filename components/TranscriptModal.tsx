'use client';

import React from 'react';
import { XMarkIcon, PhoneIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface TranscriptLine {
  role: 'assistant' | 'user';
  content: string;
}

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  callId: string;
  phoneNumber: string;
  transcript: TranscriptLine[];
}

export const TranscriptModal = ({ isOpen, onClose, callId, phoneNumber, transcript }: TranscriptModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#050505] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* HEADER */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-2xl">
              <PhoneIcon className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Forensic Transcript</h3>
              <p className="text-[9px] font-mono text-slate-500 uppercase">{phoneNumber} • {callId}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-500">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* TRANSCRIPT BODY */}
        <div className="h-[450px] overflow-y-auto p-8 space-y-6 bg-black/40 font-mono text-xs leading-relaxed">
          {transcript.map((line, i) => (
            <div key={i} className={`flex flex-col ${line.role === 'assistant' ? 'items-start' : 'items-end'}`}>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 mb-2">
                {line.role === 'assistant' ? 'SARA Node' : 'Remote Lead'}
              </span>
              <div className={`max-w-[85%] p-4 rounded-3xl border ${
                line.role === 'assistant' 
                ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-50 rounded-tl-none' 
                : 'bg-white/5 border-white/10 text-slate-300 rounded-tr-none'
              }`}>
                {line.content}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-6 bg-white/[0.02] border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
            Encryption: Verified AES-256
          </div>
          <button onClick={onClose} className="px-6 py-2 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-xl">
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
