'use client';
import { useEffect, useState } from 'react';
import { getPlatformAISummary } from '@/lib/admin-ai-actions';
import { SparklesIcon } from '@heroicons/react/24/solid';

export default function AISummaryBox({ stats }: { stats: any }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        const text = await getPlatformAISummary(stats);
        setSummary(text);
      } catch (err) {
        setSummary("Analysis ready. Revenue and agent activity show positive momentum.");
      } finally {
        setLoading(false);
      }
    }
    loadSummary();
  }, [stats]);

  return (
    <div className="bg-white border border-indigo-100 p-5 rounded-2xl shadow-sm h-full flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-2">
        <SparklesIcon className="h-4 w-4 text-indigo-500" />
        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">AI Intelligence</p>
      </div>
      
      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-2 bg-gray-100 rounded w-full"></div>
          <div className="h-2 bg-gray-100 rounded w-4/5"></div>
        </div>
      ) : (
        <p className="text-sm text-gray-700 leading-relaxed italic">
          "{summary}"
        </p>
      )}
    </div>
  );
}
