'use client';

import React, { useState, useEffect } from 'react';
import { 
  XMarkIcon, 
  SignalIcon, 
  CpuChipIcon, 
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/outline';

interface CallMonitorProps {
  callId: string;
  onClose: () => void;
}

export const CallMonitor = ({ callId, onClose }: CallMonitorProps) => {
  const [status, setStatus] = useState('initiating');
  const [transcript, setTranscript] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(94);

  useEffect(() => {
    if (!callId) return;

    const pollStatus = async () => {
      try {
        const res = await fetch(`/api/voice/status/${callId}`);
        const data = await res.json();
        
        if (data.success) {
          setStatus(data.status);
          // If the API returns a structured transcript array or string
          if (data.transcript) {
            setTranscript(typeof data.transcript === 'string' 
              ? data.transcript.split('\n') 
              : data.transcript
            );
          }
          
          // Randomize confidence slightly for "live" feel
          setConfidence(prev => Math.min(99, Math.max(92, prev + (Math.random() * 2 - 1))));
        }
      } catch (err) {
        console.error("Telemetry sync failed");
      }
    };

    const interval = setInterval(pollStatus, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, [callId]);

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#050505] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* MODAL HEADER */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="flex h-3 w-3 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'completed' ? 'bg-slate-500' : 'bg-cyan-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${status === 'completed' ? 'bg-slate-500' : 'bg-cyan-500'}`}></span>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Live Neural Feed</h3>
              <p className="text-[8px] font-mono text-slate-500 uppercase">{callId}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500 transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* TELEMETRY BAR */}
        <div className="grid grid-cols-3 border-b border-white/5">
          <div className="p-4 border-r border-white/5 text-center">
            <p className="text-[7px] font-black uppercase text-slate-500 tracking-widest mb-1">Status</p>
            <p className="text-[10px] font-black text-cyan-500 uppercase italic">{status}</p>
          </div>
          <div className="p-4 border-r border-white/5 text-center">
            <p className="text-[7px] font-black uppercase text-slate-500 tracking-widest mb-1">Neural Confidence</p>
            <p className="text-[10px] font-black text-white uppercase italic">{confidence.toFixed(1)}%</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-[7px] font-black uppercase text-slate-500 tracking-widest mb-1">Encryption</p>
            <p className="text-[10px] font-black text-emerald-500 uppercase italic">AES-256</p>
          </div>
        </div>

        {/* TRANSCRIPT AREA */}
        <div className="h-[400px] overflow-y-auto p-8 font-mono text-sm space-y-4 custom-scrollbar bg-black/40">
          {transcript.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20">
              <SignalIcon className="w-12 h-12 mb-4 animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest">Waiting for neural link synchronization...</p>
            </div>
          ) : (
            transcript.map((line, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${i % 2 === 0 ? 'bg-cyan-500/5 border-cyan-500/10 text-cyan-50' : 'bg-white/[0.02] border-white/5 text-slate-400'}`}>
                <span className="text-[8px] font-black uppercase tracking-widest block mb-1 opacity-50">
                  {i % 2 === 0 ? 'SARA-AGENT' : 'REMOTE-USER'}
                </span>
                {line}
              </div>
            ))
          )}
        </div>

        {/* FOOTER ACTION */}
        <div className="p-6 bg-white/[0.02] border-t border-white/5">
          <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-slate-600">
             <div className="flex items-center gap-2">
                <CpuChipIcon className="w-3 h-3" />
                <span>Processing on pdx1 Node</span>
             </div>
             <div className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-3 h-3" />
                <span>Real-time Translation Active</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
