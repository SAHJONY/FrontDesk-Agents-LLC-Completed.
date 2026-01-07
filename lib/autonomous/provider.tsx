'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AutonomousStatus {
  isRunning: boolean;
  totalAgents: number;
  activeAgents: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  unresolvedIncidents: number;
}

interface AutonomousContextType {
  status: AutonomousStatus | null;
  isLoading: boolean;
  startSystem: () => Promise<void>;
  stopSystem: () => Promise<void>;
  refreshStatus: () => Promise<void>;
}

const AutonomousContext = createContext<AutonomousContextType | undefined>(undefined);

export function AutonomousProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AutonomousStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/autonomous/status');
      const data = await response.json();
      
      if (data.success && data.summary) {
        setStatus({
          isRunning: data.summary.isOperational,
          totalAgents: data.summary.totalAgents || 0,
          activeAgents: data.summary.activeAgents || 0,
          systemHealth: data.summary.systemHealth || 'healthy',
          unresolvedIncidents: data.summary.unresolvedIncidents || 0
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching autonomous status:', error);
      setIsLoading(false);
    }
  };

  const startSystem = async () => {
    try {
      await fetch('/api/autonomous/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start' })
      });
      await fetchStatus();
    } catch (error) {
      console.error('Error starting system:', error);
    }
  };

  const stopSystem = async () => {
    try {
      await fetch('/api/autonomous/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'stop' })
      });
      await fetchStatus();
    } catch (error) {
      console.error('Error stopping system:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchStatus();

    // Auto-start the autonomous system on mount
    const autoStart = async () => {
      try {
        const response = await fetch('/api/autonomous/status');
        const data = await response.json();
        
        // If system is not running, start it automatically
        if (data.success && !data.orchestrator?.isRunning) {
          console.log('🤖 Auto-starting autonomous system...');
          await startSystem();
        }
      } catch (error) {
        console.error('Error auto-starting system:', error);
      }
    };

    autoStart();

    // Refresh status every 30 seconds
    const interval = setInterval(fetchStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AutonomousContext.Provider
      value={{
        status,
        isLoading,
        startSystem,
        stopSystem,
        refreshStatus: fetchStatus
      }}
    >
      {children}
    </AutonomousContext.Provider>
  );
}

export function useAutonomous() {
  const context = useContext(AutonomousContext);
  if (context === undefined) {
    throw new Error('useAutonomous must be used within an AutonomousProvider');
  }
  return context;
}
