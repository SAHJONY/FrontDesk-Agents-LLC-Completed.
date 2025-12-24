'use client';
import { useState } from 'react';

export default function EmergencyOverride() {
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('Idle');

  const triggerNationwideSniper = async () => {
    setStatus('🚀 Deploying Sniper...');
    
    // Calls your internal API which triggers the scraper script
    await fetch('/api/admin/force-scrape', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-platform-secret': process.env.NEXT_PUBLIC_INTERNAL_KEY || ''
      },
      body: JSON.stringify({ city, industry: 'plumbing' })
    });
    
    setStatus('✅ Targets Ingested. AI Dispatch Armed.');
  };

  return (
    <div className="p-6 bg-slate-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-red-500">Weather-Crisis Override</h1>
      <p className="text-slate-400 mb-6">Manual force-injection for nationwide winter emergencies.</p>
      
      <div className="space-y-4">
        <input 
          className="w-full p-3 bg-slate-800 rounded border border-slate-700"
          placeholder="Enter City (e.g. Houston, TX)" 
          onChange={(e) => setCity(e.target.value)}
        />
        <button 
          onClick={triggerNationwideSniper}
          className="w-full bg-red-600 hover:bg-red-700 p-4 rounded font-bold transition-all"
        >
          FORCE SCRAPE & DISPATCH
        </button>
        <div className="text-center text-sm font-mono text-cyan-400">{status}</div>
      </div>
    </div>
  );
}
