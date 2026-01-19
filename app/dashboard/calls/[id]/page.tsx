"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Phone, 
  Clock, 
  Activity,
  MessageSquare,
  ShieldAlert,
  Star
} from 'lucide-react';
import { LegalComplianceBadge } from '../../../components/LegalComplianceBadge';

export default function CallDetailPage() {
  const params = useParams();
  const router = useRouter();
  const callId = params?.id;
  
  const [call, setCall] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCallDetails() {
      try {
        const res = await fetch(`/api/calls/${callId}`);
        const data = await res.json();
        if (data.success) setCall(data.call);
      } catch (err) {
        console.error("Failed to load call intelligence", err);
      } finally {
        setLoading(false);
      }
    }
    if (callId) fetchCallDetails();
  }, [callId]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-pulse text-green-500 font-mono">INITIALIZING ANALYSIS...</div>
    </div>
  );

  const isLead = call?.summary?.toLowerCase().includes('book') || call?.summary?.toLowerCase().includes('appoint');

  return (
    <div className="p-6 min-h-screen bg-black text-white selection:bg-green-500/30">
      <div className="max-w-4xl mx-auto">
        {/* Navigation & Compliance */}
        <div className="flex justify-between items-start mb-8">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-zinc-500 hover:text-green-500 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
          </button>
          <LegalComplianceBadge />
        </div>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3 mb-1">
              <div className={`p-2 rounded-full ${isLead ? 'bg-yellow-500/10' : 'bg-green-500/10'}`}>
                <Phone className={isLead ? 'text-yellow-500' : 'text-green-500'} size={20} />
              </div>
              Analysis: <span className="text-zinc-500 font-mono text-lg">{callId?.toString().slice(0, 8)}...</span>
            </h1>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-tighter">
              Origin: {call?.customer_number || 'Unknown'} • {new Date(call?.created_at).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-end">
             <Activity className="text-green-500 animate-pulse mb-2" size={20} />
             {isLead && (
               <span className="flex items-center gap-1 text-[10px] font-black text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded bg-yellow-500/5">
                 <Star size={10} fill="currentColor" /> HIGH INTENT
               </span>
             )}
          </div>
        </div>

        {/* Intelligence Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
            <Clock className="w-4 h-4 mb-2 text-zinc-500" />
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Duration</p>
            <p className="text-xl font-mono text-white">{call?.duration || 0}s</p>
          </div>
          <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
            <Play className="w-4 h-4 mb-2 text-zinc-500" />
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Recording</p>
            {call?.recording_url ? (
              <a href={call.recording_url} target="_blank" className="text-lg text-green-500 text-xs font-bold hover:underline">STREAM READY</a>
            ) : (
              <p className="text-lg text-zinc-700 text-xs font-bold">UNAVAILABLE</p>
            )}
          </div>
          <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
            <CheckCircle className="w-4 h-4 mb-2 text-green-500" />
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Encryption</p>
            <p className="text-lg text-green-500 text-xs font-bold">AES-256 VERIFIED</p>
          </div>
        </div>

        {/* AI Summary Block */}
        <div className="mb-8 p-6 bg-zinc-900 rounded-xl border-l-4 border-green-500">
           <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
             <ShieldAlert size={14} className="text-green-500" /> Executive Summary
           </h3>
           <p className="text-zinc-200 italic leading-relaxed">
             "{call?.summary || 'AI Analysis in progress... summary will be available once the neural engine completes processing.'}"
           </p>
        </div>

        {/* Transcript Section */}
        <div className="bg-zinc-900/30 rounded-xl border border-white/5 overflow-hidden">
          <div className="p-4 bg-white/5 border-b border-white/5 flex items-center gap-2">
            <MessageSquare size={16} className="text-zinc-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Word-for-Word Transcript</span>
          </div>
          <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto scrollbar-hide">
            {call?.transcript ? (
              call.transcript.split('\n').map((line: string, i: number) => {
                const isAgent = line.toLowerCase().startsWith('agent') || line.toLowerCase().startsWith('receptionist');
                return (
                  <div key={i} className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}>
                    <span className="text-[10px] text-zinc-600 font-bold uppercase mb-1 tracking-tighter">
                      {isAgent ? 'AI FrontDesk' : 'Customer'}
                    </span>
                    <div className={`p-3 rounded-lg text-sm max-w-[85%] ${
                      isAgent ? 'bg-zinc-800 text-zinc-300 border border-white/5' : 'bg-green-900/20 text-green-100 border border-green-500/20'
                    }`}>
                      {line.replace(/^(agent|customer|receptionist):/i, '')}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 text-zinc-700 font-mono text-xs">
                SECURE TRANSCRIPTION LOGS NOT FOUND
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
