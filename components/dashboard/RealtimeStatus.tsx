'use client';

import { useState, useEffect } from 'react';

export default function RealtimeStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeAgents, setActiveAgents] = useState(3);
  const [callsToday, setCallsToday] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallsToday(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">System Status</h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className={`text-sm font-medium ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
          <p className="text-sm text-blue-400 font-medium mb-2">Active Agents</p>
          <p className="text-3xl font-bold text-white">{activeAgents}</p>
        </div>

        <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
          <p className="text-sm text-green-400 font-medium mb-2">Calls Today</p>
          <p className="text-3xl font-bold text-white">{callsToday}</p>
        </div>

        <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/30">
          <p className="text-sm text-purple-400 font-medium mb-2">Avg Response</p>
          <p className="text-3xl font-bold text-white">1.8s</p>
        </div>
      </div>
    </div>
  );
}
