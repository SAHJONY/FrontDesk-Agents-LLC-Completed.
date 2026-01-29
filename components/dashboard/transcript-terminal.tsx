"use client";

import { useTranscriptStream } from '@/hooks/use-transcript-stream';
import { Terminal, Cpu } from 'lucide-react';

export function TranscriptTerminal() {
  const { logs } = useTranscriptStream();

  return (
    <div className="rounded-3xl border border-emerald-500/20 bg-black/40 backdrop-blur-xl p-6 font-mono overflow-hidden h-[400px] flex flex-col shadow-[0_0_30px_rgba(16,185,129,0.05)]">
      <div className="flex justify-between items-center mb-4 border-b border-emerald-500/10 pb-4">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-emerald-500" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
            Neural Transcript Stream
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-emerald-500/50 uppercase italic">Live Feed</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
        {logs.length === 0 && (
          <p className="text-emerald-500/20 text-[10px] italic">Waiting for incoming neural transmission...</p>
        )}
        {logs.map((log) => (
          <div key={log.id} className="group animate-in fade-in slide-in-from-left-2 duration-500">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] text-emerald-500/40">[{log.timestamp}]</span>
              <span className="text-[9px] font-bold text-sky-400 uppercase tracking-tighter">{log.agent}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300 group-hover:text-emerald-400 transition-colors">
              {log.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
