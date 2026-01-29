"use client"; // Required for hooks and realtime subscriptions

import React from 'react';
import { useRealtimeWorkforce } from '@/hooks/use-realtime-workforce';

/**
 * LiveActivityFeed
 * Displays real-time communication events as they happen
 */
export function LiveActivityFeed() {
  const { latestTask } = useRealtimeWorkforce();

  if (!latestTask) {
    return (
      <div className="p-4 border border-dashed border-gray-200 rounded-lg text-center">
        <p className="text-sm text-gray-500 italic">Waiting for AI activity...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-500 bg-blue-50 border-l-4 border-blue-500 p-4 rounded shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-xs uppercase tracking-wider text-blue-700">
          Live AI Event
        </span>
        <span className="text-[10px] font-medium text-blue-400">
          JUST NOW
        </span>
      </div>
      <p className="text-sm text-gray-800 leading-relaxed">
        Agent <span className="font-mono text-blue-600 font-bold">#{latestTask.agent_id?.slice(0, 5)}</span> handled 
        a <span className="font-semibold">{latestTask.type}</span> task with{" "}
        <span className={`font-bold ${latestTask.sentiment === 'positive' ? 'text-green-600' : 'text-amber-600'}`}>
          {latestTask.sentiment}
        </span> sentiment.
      </p>
    </div>
  );
}
