'use client';

import React, { useState, useEffect } from 'react';
import { 
  Cpu, Activity, Zap, Shield, TrendingUp, AlertTriangle, 
  CheckCircle, XCircle, Play, Pause, RefreshCw
} from 'lucide-react';

export default function AutonomousSystemPage() {
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/autonomous/status');
      const data = await response.json();
      setSystemStatus(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const controlSystem = async (action: 'start' | 'stop') => {
    try {
      await fetch('/api/autonomous/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      fetchStatus();
    } catch (error) {
      console.error('Error controlling system:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading autonomous system status...</p>
        </div>
      </div>
    );
  }

  const { orchestrator, health, summary } = systemStatus || {};

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Autonomous System</h1>
            <p className="text-slate-400 text-sm mt-1">Self-managing AI workforce with auto-healing</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {orchestrator?.isRunning ? (
            <button
              onClick={() => controlSystem('stop')}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-white transition-colors"
            >
              <Pause className="w-4 h-4" />
              Stop System
            </button>
          ) : (
            <button
              onClick={() => controlSystem('start')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-white transition-colors"
            >
              <Play className="w-4 h-4" />
              Start System
            </button>
          )}
        </div>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className={`p-6 rounded-lg border ${
          summary?.isOperational 
            ? 'bg-green-500/10 border-green-500/30' 
            : 'bg-red-500/10 border-red-500/30'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm">System Status</span>
            {summary?.isOperational ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {summary?.isOperational ? 'Operational' : 'Offline'}
          </div>
          <div className={`text-xs ${summary?.isOperational ? 'text-green-400' : 'text-red-400'}`}>
            {orchestrator?.isRunning ? 'Running autonomously' : 'System stopped'}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm">Active Agents</span>
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {summary?.activeAgents || 0}/{summary?.totalAgents || 0}
          </div>
          <div className="text-xs text-slate-400">
            Auto-scaling enabled
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm">System Health</span>
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1 capitalize">
            {summary?.systemHealth || 'Unknown'}
          </div>
          <div className="text-xs text-slate-400">
            Self-healing active
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm">Incidents</span>
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {summary?.unresolvedIncidents || 0}
          </div>
          <div className="text-xs text-slate-400">
            Unresolved issues
          </div>
        </div>
      </div>

      {/* Active Agents */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          Active Agents
        </h2>
        
        <div className="space-y-3">
          {orchestrator?.agents?.map((agent: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${
                  agent.status === 'active' ? 'bg-green-400 animate-pulse' :
                  agent.status === 'training' ? 'bg-yellow-400' :
                  'bg-slate-400'
                }`} />
                <div>
                  <div className="font-semibold text-white">{agent.name}</div>
                  <div className="text-sm text-slate-400 capitalize">{agent.role} • {agent.status}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm text-slate-400">Calls</div>
                  <div className="font-semibold text-white">{agent.performance.callsHandled}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">Conversion</div>
                  <div className="font-semibold text-cyan-400">{agent.performance.conversionRate.toFixed(1)}%</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">Revenue</div>
                  <div className="font-semibold text-green-400">${agent.performance.revenue.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Metrics */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          System Metrics
        </h2>
        
        <div className="space-y-4">
          {health?.metrics?.map((metric: any, index: number) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{metric.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">{metric.value.toFixed(2)}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    metric.status === 'healthy' ? 'bg-green-500/20 text-green-400' :
                    metric.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {metric.status}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  style={{ width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%` }}
                  className={`h-full ${
                    metric.status === 'healthy' ? 'bg-green-500' :
                    metric.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      {health?.incidents && health.incidents.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Recent Incidents
          </h2>
          
          <div className="space-y-3">
            {health.incidents.map((incident: any, index: number) => (
              <div key={index} className={`p-4 rounded-lg border ${
                incident.resolved 
                  ? 'bg-slate-900/50 border-slate-700' 
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {incident.resolved ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      )}
                      <span className="font-semibold text-white capitalize">{incident.type.replace('_', ' ')}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        incident.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                        incident.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        incident.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {incident.severity}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{incident.description}</p>
                    {incident.resolution && (
                      <p className="text-xs text-green-400">✓ {incident.resolution}</p>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(incident.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
