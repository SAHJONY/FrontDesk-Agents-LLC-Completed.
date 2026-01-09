'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Socket } from 'socket.io-client';

// Dynamically import socket.io-client only on client side
let io: any;
if (typeof window !== 'undefined') {
  io = require('socket.io-client').io;
}

export interface UseWebSocketOptions {
  customerId?: string;
  autoConnect?: boolean;
}

export interface CallUpdate {
  id: string;
  status: 'initiated' | 'ringing' | 'in-progress' | 'completed' | 'failed';
  agent_id: string;
  customer_id: string;
  duration?: number;
  timestamp: string;
}

export interface DashboardMetrics {
  activeCalls: number;
  activeAgents: number;
  callsToday: number;
  successRate: number;
  timestamp: string;
}

export interface AgentStatus {
  id: string;
  status: 'active' | 'inactive' | 'busy';
  currentCall?: string;
  timestamp: string;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { customerId, autoConnect = true } = options;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [callUpdates, setCallUpdates] = useState<CallUpdate[]>([]);
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics | null>(null);
  const [agentStatuses, setAgentStatuses] = useState<Record<string, AgentStatus>>({});

  useEffect(() => {
    if (!autoConnect) return;

    const socketInstance = io({
      path: '/api/socket',
      transports: ['websocket', 'polling'],
    });

    socketInstance.on('connect', () => {
      console.log('✅ WebSocket connected');
      setIsConnected(true);

      // Auto-subscribe if customerId is provided
      if (customerId) {
        socketInstance.emit('subscribe:dashboard', customerId);
        socketInstance.emit('subscribe:calls', customerId);
        socketInstance.emit('subscribe:agents', customerId);
      }
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ WebSocket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('call:update', (update: CallUpdate) => {
      console.log('📞 Received call update:', update);
      setCallUpdates((prev) => {
        const existing = prev.findIndex((c) => c.id === update.id);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = update;
          return updated;
        }
        return [...prev, update];
      });
    });

    socketInstance.on('dashboard:metrics', (metrics: DashboardMetrics) => {
      console.log('📊 Received dashboard metrics:', metrics);
      setDashboardMetrics(metrics);
    });

    socketInstance.on('agent:status', (status: AgentStatus) => {
      console.log('🤖 Received agent status:', status);
      setAgentStatuses((prev) => ({
        ...prev,
        [status.id]: status,
      }));
    });

    setSocket(socketInstance);

    return () => {
      if (customerId) {
        socketInstance.emit('unsubscribe:dashboard', customerId);
        socketInstance.emit('unsubscribe:calls', customerId);
        socketInstance.emit('unsubscribe:agents', customerId);
      }
      socketInstance.disconnect();
    };
  }, [customerId, autoConnect]);

  const subscribeToDashboard = useCallback((id: string) => {
    if (socket) {
      socket.emit('subscribe:dashboard', id);
    }
  }, [socket]);

  const subscribeToCalls = useCallback((id: string) => {
    if (socket) {
      socket.emit('subscribe:calls', id);
    }
  }, [socket]);

  const subscribeToAgents = useCallback((id: string) => {
    if (socket) {
      socket.emit('subscribe:agents', id);
    }
  }, [socket]);

  const unsubscribeFromDashboard = useCallback((id: string) => {
    if (socket) {
      socket.emit('unsubscribe:dashboard', id);
    }
  }, [socket]);

  const unsubscribeFromCalls = useCallback((id: string) => {
    if (socket) {
      socket.emit('unsubscribe:calls', id);
    }
  }, [socket]);

  const unsubscribeFromAgents = useCallback((id: string) => {
    if (socket) {
      socket.emit('unsubscribe:agents', id);
    }
  }, [socket]);

  return {
    socket,
    isConnected,
    callUpdates,
    dashboardMetrics,
    agentStatuses,
    subscribeToDashboard,
    subscribeToCalls,
    subscribeToAgents,
    unsubscribeFromDashboard,
    unsubscribeFromCalls,
    unsubscribeFromAgents,
  };
}
