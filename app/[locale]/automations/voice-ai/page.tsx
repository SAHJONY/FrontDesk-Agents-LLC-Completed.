import React from 'react';
import { 
  MicrophoneIcon, 
  WrenchScrewdriverIcon, 
  ArrowPathIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default async function VoiceAIConfigPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  // Await the params to identify the market context
  const { locale } = await params;

  // Configuration tied to the Sovereign Node
  const currentConfig = {
    enabled: true,
    mode: 'Standard (Scraping + CRM + Booking)',
    last_refresh: '2025-12-24 09:00 AM CST',
    industry: 'Med-Spas',
    widget_script_key: 'FDDG-SARAV1-4829J-AB3',
    node: locale.toUpperCase()
  };

  return (
    <div className="p-8 md:p-12 w-full max-w-7xl mx-auto">
      {/* Header with Locale Context */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center">
          <MicrophoneIcon className="w-8 h-8 mr-3 text-cyan-500" />
          SARA.AI Activation <span className="ml-3 text-sm font-mono text-slate-500 border border-white/10 px-2 py-1 rounded">NODE: {currentConfig.node}</span>
        </h1>
        <p className="text-gray-400">
          Deploy your 24/7, human-like voice agent for instant conversions in the {locale === 'en' ? 'English' : locale} market.
        </p>
      </div>

      {/* Deployment Status Card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-10 backdrop-blur-md">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <ShieldCheckIcon className="w-5 h-5 text-green-400" />
          System Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-black/40 rounded-xl border border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Service Mode</p>
            <p className="text-lg font-bold text-cyan-400">{currentConfig.mode}</p>
          </div>
          <div className="p-4 bg-black/40 rounded-xl border border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Knowledge Refresh</p>
            <p className="text-lg font-bold text-white flex items-center justify-between">
              {currentConfig.last_refresh}
              <button className="text-cyan-500 hover:text-white transition">
                <ArrowPathIcon className="w-5 h-5" />
              </button>
            </p>
          </div>
          <div className="p-4 bg-black/40 rounded-xl border border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Industry Profile</p>
            <p className="text-lg font-bold text-white">{currentConfig.industry}</p>
          </div>
        </div>
      </div>
      
      {/* Installation Script Container */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center">
                <WrenchScrewdriverIcon className="w-6 h-6 mr-2 text-yellow-500" />
                Installation Script
            </h2>
            <button className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all">
                REGENERATE KEY
            </button>
        </div>

        <p className="text-gray-400 text-sm">
          Copy and paste this script into the <code className="text-cyan-400">&lt;head&gt;</code> or before the closing <code className="text-cyan-400">&lt;/body&gt;</code> tag of the client website.
        </p>
        
        {/* The Actual Script Block */}
        <div className="bg-black p-5 rounded-xl font-mono text-sm overflow-x-auto border border-white/10 text-yellow-500 select-all">
          {`<script src="https://frontdesk-agents.com/sara.js" data-node="${locale}" data-key="${currentConfig.widget_script_key}"></script>`}
        </div>
        
        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 animate-pulse" />
          <p className="text-xs text-red-400 leading-relaxed">
            <strong>COMPLIANCE NOTICE:</strong> Enabling SARA.AI requires adherence to local call recording and data privacy laws for the <strong>{locale.toUpperCase()}</strong> region.
          </p>
        </div>
      </div>
    </div>
  );
          }
