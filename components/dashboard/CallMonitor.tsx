'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Phone, ShieldCheck, Wifi, XCircle, Loader2 } from 'lucide-react';

interface CallMonitorProps {
  callId: string | null;
  onClose: () => void;
}

export const CallMonitor = ({ callId, onClose }: CallMonitorProps) => {
  const [status, setStatus] = useState<'initializing' | 'ringing' | 'in-progress' | 'completed' | 'failed'>('initializing');
  const [duration, setDuration] = useState(0);

  // Simulate or fetch real-time status updates
  useEffect(() => {
    if (!callId) return;

    const statusInterval = setInterval(() => {
      // In a real scenario, you'd fetch from /api/voice/status/${callId}
      setStatus((prev) => {
        if (prev === 'initializing') return 'ringing';
        if (prev === 'ringing') return 'in-progress';
        return prev;
      });
    }, 3000);

    const timer = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(timer);
    };
  }, [callId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!callId) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-[#050505] border border-cyan-500/30 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.15)]">
        
        {/* HEADER */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">Live Neural Link</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <XCircle className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* STATUS DISPLAY */}
        <div className="p-10 text-center space-y-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-cyan-500/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
              <Activity className="w-10 h-10 text-cyan-500" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
               <Phone className={`w-8 h-8 text-white ${status === 'ringing' ? 'animate-bounce' : ''}`} />
            </div>
          </div>

          <div>
            <p className="text-4xl font-black italic uppercase tracking-tighter text-white mb-2">
              {status.replace('-', ' ')}
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Session ID: <span className="text-cyan-500">{callId.slice(-8).toUpperCase()}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Duration</p>
              <p className="text-xl font-mono text-white">{formatTime(duration)}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Latency</p>
              <p className="text-xl font-mono text-cyan-500">24ms</p>
            </div>
          </div>
        </div>

        {/* TELEMETRY FOOTER */}
        <div className="bg-cyan-500/5 p-6 flex items-center justify-center gap-6 border-t border-cyan-500/10">
          <div className="flex items-center gap-2">
            <Wifi className="w-3 h-3 text-cyan-500" />
            <span className="text-[8px] font-black uppercase text-slate-400">Stream Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3 text-cyan-500" />
            <span className="text-[8px] font-black uppercase text-slate-400">Aegis Validated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
                
