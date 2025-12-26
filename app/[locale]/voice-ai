// ./app/(client)/automations/voice-ai/page.tsx

import React from 'react';
import { MicrophoneIcon, WrenchScrewdriverIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function VoiceAIConfigPage() {
  // Mock data representing the configuration saved by the user
  const currentConfig = {
    enabled: true,
    mode: 'Standard (Scraping + CRM + Booking)',
    last_refresh: '2025-12-14 09:00 AM CST',
    industry: 'Med-Spas',
    widget_script_key: 'FDDG-SARAV1-4829J-AB3', // This is the unique key to paste on the client site
  };

  return (
    <div className="p-8 md:p-12 w-full">
      <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center">
        <MicrophoneIcon className="w-8 h-8 mr-3 text-[var(--color-primary)]" />
        AI Voice Receptionist Activation
      </h1>
      <p className="text-gray-400 mb-10">
        Deploy your 24/7, human-like voice agent (SARA.AI) for instant conversions and booking.
      </p>

      {/* Configuration Status Card */}
      <div className="glass-card p-6 md:p-8 mb-10">
        <h2 className="text-xl font-bold text-white mb-4">
          Deployment Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-[var(--color-navy)] rounded-lg">
            <p className="text-sm text-gray-500">Service Mode</p>
            <p className="text-lg font-semibold text-green-400">{currentConfig.mode}</p>
          </div>
          <div className="p-4 bg-[var(--color-navy)] rounded-lg">
            <p className="text-sm text-gray-500">Last Knowledge Refresh</p>
            <p className="text-lg font-semibold text-white flex items-center">
              {currentConfig.last_refresh}
              <button className="ml-3 text-[var(--color-primary)] hover:text-white transition">
                <ArrowPathIcon className="w-5 h-5" />
              </button>
            </p>
          </div>
          <div className="p-4 bg-[var(--color-navy)] rounded-lg">
            <p className="text-sm text-gray-500">Industry Profile</p>
            <p className="text-lg font-semibold text-white">{currentConfig.industry}</p>
          </div>
        </div>
      </div>
      
      {/* Widget Script & Instructions */}
      <div className="glass-card p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
                <WrenchScrewdriverIcon className="w-6 h-6 inline mr-2 text-[var(--color-gold)]" />
                Installation Script
            </h2>
            <button className="btn-premium py-2 px-4 text-sm">
                Generate New Script
            </button>
        </div>

        <p className="text-gray-400">
          Paste the following script **before the closing `&lt;/body&gt;` tag** on the client's website to activate SARA.AI.
        </p>
        
        {/* Code Block for the script key */}
        <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto text-yellow-400">
          {`<script src="https://frontdesk-agents.com/sara.js" data-widget-key="${currentConfig.widget_script_key}"></script>`}
        </div>
        
        <p className="text-sm text-red-400 font-semibold">
          Compliance Notice: Enabling this widget requires you to adhere to local call recording laws.
        </p>
      </div>
      
      {/* Integration Options/Roadmap Summary */}
      <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Integration Summary (Option 2: Standard)</h2>
          <ul className="space-y-3 text-gray-300 list-disc list-inside">
              <li>**Voice:** Real-time, low-latency, interruptible conversations.</li>
              <li>**Knowledge:** Scrapes the client's live website data for up-to-date answers.</li>
              <li>**CRM & Booking:** Directly integrates with the FrontDesk Agents CRM (GHL) to capture leads and book appointments automatically.</li>
              <li>**Monetization:** Supports the **recurring subscription** model outlined in your plan.</li>
          </ul>
      </div>

    </div>
  );
}
