'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAutonomous } from '@/lib/autonomous/provider';

export function AutonomousStatusIndicator() {
  const { status, isLoading } = useAutonomous();

  if (isLoading || !status) {
    return null;
  }

  const getStatusColor = () => {
    if (!status.isRunning) return 'text-slate-400';
    if (status.systemHealth === 'critical') return 'text-red-400';
    if (status.systemHealth === 'warning') return 'text-yellow-400';
    return 'text-green-400';
  };

  const getStatusIcon = () => {
    if (!status.isRunning) return <Cpu className="w-4 h-4" />;
    if (status.systemHealth === 'critical') return <AlertTriangle className="w-4 h-4" />;
    if (status.systemHealth === 'warning') return <Activity className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (!status.isRunning) return 'Offline';
    if (status.systemHealth === 'critical') return 'Critical';
    if (status.systemHealth === 'warning') return 'Warning';
    return 'Operational';
  };

  return (
    <Link
      href="/dashboard/autonomous"
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-colors"
      title="View Autonomous System Status"
    >
      <div className={`${getStatusColor()} ${status.isRunning ? 'animate-pulse' : ''}`}>
        {getStatusIcon()}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-white">{getStatusText()}</span>
        <span className="text-[10px] text-slate-400">
          {status.activeAgents}/{status.totalAgents} agents
        </span>
      </div>
    </Link>
  );
}
