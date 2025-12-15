'use client';

import Link from 'next/link';
import { Home, Settings, Shield } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-black text-white p-6">
      <h1 className="text-xl font-bold mb-8">FrontDesk Agents</h1>

      <nav className="space-y-4 text-sm">
        <Link href="/dashboard" className="flex items-center gap-2 hover:text-blue-400">
          <Home size={16} />
          Dashboard
        </Link>

        <Link
          href="/automations/voice-ai"
          className="flex items-center gap-2 hover:text-blue-400"
        >
          <Settings size={16} />
          Voice AI
        </Link>

        <Link
          href="/admin/compliance-center"
          className="flex items-center gap-2 hover:text-blue-400"
        >
          <Shield size={16} />
          Compliance
        </Link>
      </nav>
    </aside>
  );
}
