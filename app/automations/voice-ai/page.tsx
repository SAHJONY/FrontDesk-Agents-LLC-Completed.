// ./app/(client)/automations/voice-ai/page.tsx

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { MicrophoneIcon, CodeBracketIcon, ClipboardIcon, CheckIcon, WrenchScrewdriverIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { generateBlandAiScript, MASTER_PROMPT, DEFAULT_VOICE_ID } from '@/lib/voice-config';

// Simulated Client ID (In production, this comes from the authenticated user's data)
const CLIENT_UNIQUE_KEY = 'FDDG-SARAV1-93A2X-57B'; 

export default function VoiceAIConfigurationPage() {
  const [voiceId, setVoiceId] = useState(DEFAULT_VOICE_ID);
  const [customPrompt, setCustomPrompt] = useState(MASTER_PROMPT.trim());
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Generates the final, executable script dynamically
  const deploymentScript = useMemo(() => {
    return generateBlandAiScript({
      clientKey: CLIENT_UNIQUE_KEY,
      voiceId,
      customPrompt,
    });
  }, [voiceId, customPrompt]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(deploymentScript);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [deploymentScript]);

  const handleRetrain = () => {
    setIsLoading(true);
    // SIMULATION: In production, this would call an API route:
    // POST /api/bland/retrain?clientKey=... 
    // Which triggers the web scraping and knowledge ingestion (Pillar 2)
    setTimeout(() => {
        alert('AI Retraining Initiated! New knowledge base will be active within 5 minutes.');
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-8 md:p-12 w-full">
      <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center">
        <MicrophoneIcon className="w-8 h-8 mr-3 text-[var(--color-primary)]" />
        SARA.AI Voice Receptionist Configuration
      </h1>
      <p className="text-gray-400 mb-10">
        Activate your AI agent by installing the script below and customize its core behavior.
      </p>

      {/* --- 1. Deployment Script Section --- */}
      <div className="glass-card p-6 mb-10">
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
          <h2 className="text-xl font-bold text-white flex items-center">
            <CodeBracketIcon className="w-6 h-6 mr-2 text-[var(--color-primary)]" />
            1. Installation Script
          </h2>
          <button 
            onClick={handleCopy} 
            className={`flex items-center text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 
              ${isCopied ? 'bg-green-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            disabled={isCopied}
          >
            {isCopied ? <CheckIcon className="w-5 h-5 mr-1" /> : <ClipboardIcon className="w-5 h-5 mr-1" />}
            {isCopied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mb-3">
          Paste this **single line of code** just before the closing `&lt;/body&gt;` tag on your website.
        </p>
        
        <div className="bg-black/50 p-4 rounded-lg overflow-x-auto font-mono text-sm text-gray-200 border border-gray-700">
          <pre className="whitespace-pre-wrap">{deploymentScript}</pre>
        </div>
        
        <p className="mt-4 text-xs text-gray-500">
          Your unique client key: <span className="text-gray-400">{CLIENT_UNIQUE_KEY}</span>
        </p>
      </div>

      {/* --- 2. Customization Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Voice ID Selector */}
        <div className="glass-card p-6 lg:col-span-1">
          <h2 className="text-xl font-bold text-white flex items-center mb-4">
            <WrenchScrewdriverIcon className="w-6 h-6 mr-2 text-[var(--color-gold)]" />
            Voice Settings
          </h2>
          <label htmlFor="voice-select" className="block text-sm font-medium text-gray-400 mb-2">
            AI Voice ID (Bland AI)
          </label>
          <select
            id="voice-select"
            value={voiceId}
            onChange={(e) => setVoiceId(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
          >
            <option value={DEFAULT_VOICE_ID}>SARA (Default Human Female)</option>
            <option value="male-calm-v1">Agent Mark (Calm Male)</option>
            <option value="female-energetic-v1">Agent Jen (Energetic Female)</option>
          </select>

          <button 
            onClick={handleRetrain} 
            disabled={isLoading}
            className={`mt-6 w-full py-2 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 ${
              isLoading ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-[var(--color-primary)] text-black hover:bg-white'
            }`}
          >
            <ArrowPathIcon className={`w-5 h-5 mr-2 inline ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Retraining...' : 'Trigger Knowledge Retrain'}
          </button>
        </div>

        {/* Master Prompt Editor */}
        <div className="glass-card p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-white flex items-center mb-4">
            <WrenchScrewdriverIcon className="w-6 h-6 mr-2 text-[var(--color-gold)]" />
            Master Prompt Editor
          </h2>
          <label htmlFor="master-prompt" className="block text-sm font-medium text-gray-400 mb-2">
            SARA.AI Core Directives (Advanced)
          </label>
          <textarea
            id="master-prompt"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={10}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] font-mono text-xs"
          />
          <p className="text-xs text-gray-500 mt-2">
            Changes here directly influence SARA's conversation flow and personality. Save changes, then copy the script again.
          </p>
        </div>
      </div>
    </div>
  );
          }
