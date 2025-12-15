'use client';

import React from 'react';
import { Globe, MonitorSmartphone, Cpu } from 'lucide-react';

export default function GlobalHeader() {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <span className="text-xl font-semibold tracking-tight text-gray-900">
          FrontDesk Agents
        </span>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
          Enterprise
        </span>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Cpu size={16} />
          <span>Autonomous 24/7</span>
        </div>

        <div className="flex items-center gap-1">
          <MonitorSmartphone size={16} />
          <span>Multi-Device</span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
          <Globe size={16} />
          <span>EN</span>
        </div>
      </div>
    </header>
  );
}
