"use client";

import React from 'react';
// Import icons individually to reduce manifest size
import RocketLaunchIcon from '@heroicons/react/24/outline/RocketLaunchIcon';
import CpuChipIcon from '@heroicons/react/24/outline/CpuChipIcon';
import ShieldCheckIcon from '@heroicons/react/24/outline/ShieldCheckIcon';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/outline/ChatBubbleLeftRightIcon';

export const dynamic = 'force-dynamic';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-[#0a1929] text-white">
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          FrontDesk Agents LLC
        </h1>
        <p className="text-xl text-gray-400 mb-12">The future of AI-powered operations.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-6 border border-gray-800 rounded-xl bg-gray-900/50">
            <RocketLaunchIcon className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Fast Setup</h3>
          </div>
          <div className="p-6 border border-gray-800 rounded-xl bg-gray-900/50">
            <CpuChipIcon className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold">AI Native</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
