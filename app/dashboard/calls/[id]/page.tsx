"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Play, CheckCircle, Phone, Clock, 
  Activity, MessageSquare, ShieldAlert, Star, Send
} from 'lucide-react';
import { LegalComplianceBadge } from '../../../components/LegalComplianceBadge';

export default function CallDetailPage() {
  const params = useParams();
  const router = useRouter();
  const callId = params?.id;
  
  const [call, setCall] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sendingSms, setSendingSms] = useState(false);

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

  const handleFollowUp = async () => {
    setSendingSms(true);
    try {
      const res = await fetch('/api/calls/follow-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: call.customer_number,
          intent: call.summary
        }),
      });
      if (res.ok) alert('Neural Follow-up Transmitted via SMS.');
    } catch (err) {
      alert('Transmission failed.');
    } finally {
      setSendingSms(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-pulse text-green-500 font-mono">INITIALIZING ANALYSIS...</div>
    </div>
  );

  const isLead = call?.summary?.toLowerCase().includes('book') || call?.summary?.toLowerCase().includes('appoint');

  return (
    <div className="p-6 min-h-screen bg-black text-white selection:bg-green-500/30">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="flex justify-between items-start mb-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-500 hover:text-green-500 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
          </button>
          <LegalComplianceBadge />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Analysis & Transcript */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-3 mb-1">
                  Analysis: <span className="text-zinc-500 font-mono text-lg">{callId?.toString().slice(0, 8)}</span>
                </h1>
                <p className="text-zinc-500 text-xs font-medium uppercase tracking-tighter">
                  {call?.customer_number} • {new Date(call?.created_at).toLocaleString()}
                </p>
              </div>
              <Activity className="text-green-500 animate-pulse" size={20} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5">
                <Clock className="w-4 h-4 mb-2 text-zinc-500" />
                <p className="text-xl font-mono">{call?.duration || 0}s</p>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5">
                <Star className={`w-4 h-4 mb-2 ${isLead ? 'text-yellow-500' : 'text-zinc-500'}`} />
                <p className="text-[10px] font-bold uppercase tracking-widest">{isLead ? 'Lead' : 'Inquiry'}</p>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5">
                <CheckCircle className="w-4 h-4 mb-2 text-green-500" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Verified</p>
              </div>
            </div>

            <div className="p-6 bg-zinc-900 rounded-xl border-l-4 border-green-500">
              <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <ShieldAlert size={14} className="text-green-500" /> Summary
              </h3>
              <p className="text-zinc-200 italic">"{call?.summary}"</p>
            </div>

            <div className="bg-zinc-900/30 rounded-xl border border-white/5">
              <div className="p-4 border-b border-white/5 text-xs font-bold uppercase tracking-widest text-zinc-500">Log Transcript</div>
              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                {call?.transcript?.split('\n').map((line: string, i: number) => (
                  <div key={i} className={`text-sm ${line.toLowerCase().startsWith('agent') ? 'text-zinc-400' : 'text-green-400'}`}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Action Sidebar */}
          <div className="space-y-6">
            <div className="p-6 bg-zinc-900 border border-green-500/20 rounded-2xl shadow-2xl shadow-green-500/5">
              <h3 className="text-xs font-black text-green-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Send size={14} /> Recovery Action
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-black rounded-lg border border-white/5">
                  <p className="text-[10px] text-zinc-500 uppercase mb-2">Sentiment Analysis</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold">{call?.sentiment || 'POSITIVE'}</span>
                  </div>
                </div>
                
                <p className="text-xs text-zinc-400 leading-relaxed">
                  The AI identified this caller as a potential lead. Execute an immediate follow-up SMS to maximize conversion probability.
                </p>

                <button 
                  onClick={handleFollowUp}
                  disabled={sendingSms}
                  className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-green-900/20"
                >
                  {sendingSms ? 'Transmitting...' : 'Send Follow-up SMS'}
                </button>
              </div>
            </div>

            <div className="p-4 bg-zinc-900/30 border border-white/5 rounded-xl">
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Neural Engine ID</p>
              <p className="text-[10px] font-mono text-zinc-500 break-all">{call?.call_id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
