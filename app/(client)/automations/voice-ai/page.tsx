'use client';

import ConsentEnforcement from '@/components/Settings/ConsentEnforcement';

export default function VoiceAIPage() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Voice AI Automation</h1>

      <ConsentEnforcement />
    </main>
  );
}
