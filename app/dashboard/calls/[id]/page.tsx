'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Dashboard: Call Detail with Recording Playback (Elite Monitoring)
 */

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Play, Pause, Volume2, Download, CheckCircle, XCircle, Phone, Clock, Activity } from 'lucide-react';

interface CallDetail {
  id: string;
  direction: 'inbound' | 'outbound';
  fromNumber: string;
  toNumber: string;
  status: string;
  duration: number;
  recordingUrl: string | null;
  transcription: string | null;
  leadQualified: boolean;
  nodeType: string;
  startedAt: string;
  endedAt: string;
  metadata: any;
}

export default function CallDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [call, setCall] = useState<CallDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetchCallDetail();
  }, [params.id]);

  async function fetchCallDetail() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/calls/detail?id=${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setCall(data.call);
      }
    } catch (error) {
      console.error('Failed to fetch call detail:', error);
    } finally {
      setLoading(false);
    }
  }

  function togglePlayPause() {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing);
  }

  function handleTimeUpdate() {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  }

  function handleLoadedMetadata() {
    if (audioRef.current) setDuration(audioRef.current.duration);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <Activity className="text-blue-500 w-12 h-12 mb-4" />
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Accessing Node Data...</p>
      </div>
    </div>
  );

  if (!call) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-center">
      <div>
        <p className="text-zinc-500 mb-4">Node Data Not Found</p>
        <button onClick={() => router.back()} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Return to Command Center</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Fleet Logs</span>
        </button>

        <div className="glass-panel rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
          {/* Header Section */}
          <div className="p-8 border-b border-zinc-800 bg-gradient-to-br from-zinc-900 to-black">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                    <Phone className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black tracking-tighter">
                      {call.direction === 'inbound' ? 'INBOUND_NODE' : 'OUTBOUND_NODE'}
                    </h1>
                    <p className="text-blue-500 font-mono text-[10px] tracking-widest uppercase mt-0.5">
                      {call.direction === 'inbound' ? `FROM: ${call.fromNumber}` : `TO: ${call.toNumber}`}
                    </p>
                  </div>
                </div>
                <p className="text-zinc-500 text-xs font-mono">{new Date(call.startedAt).toLocaleString()}</p>
              </div>

              <div className="flex items-center">
                {call.leadQualified ? (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-bold text-green-500 uppercase tracking-tighter">Qualified Revenue Lead</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-full">
                    <XCircle className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Non-Qualified Node</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* KPI Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-zinc-900/30 border-b border-zinc-800">
            {[
              { label: 'Duration', val: formatTime(call.duration), icon: <Clock className="w-3 h-3"/> },
              { label: 'Agent Tier', val: call.nodeType, icon: null },
              { label: 'Status', val: call.status, icon: null },
              { label: 'Route ID', val: call.id.slice(0, 8), icon: null }
            ].map((stat, idx) => (
              <div key={idx} className="border-r border-zinc-800 last:border-0 px-2">
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">{stat.label}</p>
                <p className="text-sm font-bold text-white uppercase">{stat.val}</p>
              </div>
            ))}
          </div>

          {/* Recording Playback */}
          {call.recordingUrl && (
            <div className="p-8 border-b border-zinc-800">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Voice Audit Playback</h2>
              <div className="bg-black/50 border border-zinc-800 rounded-2xl p-6">
                <audio ref={audioRef} src={call.recordingUrl} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setPlaying(false)} className="hidden" />
                <div className="flex items-center gap-6">
                  <button onClick={togglePlayPause} className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-xl shadow-white/5">
                    {playing ? <Pause className="fill-current" /> : <Play className="fill-current ml-1" />}
                  </button>
                  <div className="flex-1">
                    <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeek} className="premium-range w-full" />
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-2">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                  <a href={call.recordingUrl} download className="p-3 border border-zinc-800 rounded-xl hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all">
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Analysis & Transcription */}
          <div className="grid md:grid-cols-2">
            <div className="p-8 border-r border-zinc-800">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">AI Analytics</h2>
              <div className="space-y-4">
                {call.metadata?.sentiment && (
                  <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Sentiment Analysis</p>
                    <p className="text-sm font-bold capitalize text-blue-400">{call.metadata.sentiment}</p>
                  </div>
                )}
                {call.metadata?.lead_score && (
                  <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Yield Probability</p>
                    <p className="text-xl font-black text-white">{call.metadata.lead_score}%</p>
                  </div>
                )}
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Transcription</h2>
              <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-900 max-h-64 overflow-y-auto font-serif italic text-zinc-400 leading-relaxed">
                {call.transcription || "Transcription pending node processing..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
      }
