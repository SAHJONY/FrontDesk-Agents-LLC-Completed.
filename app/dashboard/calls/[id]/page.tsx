"use client"; // This must be the absolute first line

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Download, 
  CheckCircle, 
  XCircle, 
  Phone, 
  Clock, 
  Activity 
} from 'lucide-react';

export default function CallDetailPage() {
  const params = useParams();
  const router = useRouter();

  // Ensuring params are used to satisfy the production compiler
  const callId = params?.id;

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Control */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> 
          <span>Back to Hub</span>
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Phone className="text-green-500" />
            Call Analysis: <span className="text-zinc-500">{callId}</span>
          </h1>
          <Activity className="text-green-500 animate-pulse" />
        </div>

        {/* Tier-Specific UI (Growth & Elite) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-900 rounded-lg border border-white/10">
            <Clock className="w-4 h-4 mb-2 text-zinc-500" />
            <p className="text-sm text-zinc-400">Duration</p>
            <p className="text-lg font-mono">04:12</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-lg border border-white/10">
            <Play className="w-4 h-4 mb-2 text-zinc-500" />
            <p className="text-sm text-zinc-400">Playback</p>
            <p className="text-lg">Ready</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-lg border border-white/10">
            <CheckCircle className="w-4 h-4 mb-2 text-green-500" />
            <p className="text-sm text-zinc-400">Compliance</p>
            <p className="text-lg">Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
}
