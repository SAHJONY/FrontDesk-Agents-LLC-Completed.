/**
 * WebSocket Server for Real-Time Updates
 * 
 * Provides real-time updates for:
 * - Active call status
 * - Dashboard metrics
 * - Agent status changes
 * - System health
 */

import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

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

let io: SocketIOServer | null = null;

export function initializeWebSocket(server: HTTPServer) {
  if (io) {
    console.log('⚠️  WebSocket server already initialized');
    return io;
  }

  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    path: '/api/socket',
  });

  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    // Handle room subscriptions
    socket.on('subscribe:dashboard', (customerId: string) => {
      socket.join(`dashboard:${customerId}`);
      console.log(`📊 Client ${socket.id} subscribed to dashboard:${customerId}`);
    });

    socket.on('subscribe:calls', (customerId: string) => {
      socket.join(`calls:${customerId}`);
      console.log(`📞 Client ${socket.id} subscribed to calls:${customerId}`);
    });

    socket.on('subscribe:agents', (customerId: string) => {
      socket.join(`agents:${customerId}`);
      console.log(`🤖 Client ${socket.id} subscribed to agents:${customerId}`);
    });

    // Handle unsubscriptions
    socket.on('unsubscribe:dashboard', (customerId: string) => {
      socket.leave(`dashboard:${customerId}`);
    });

    socket.on('unsubscribe:calls', (customerId: string) => {
      socket.leave(`calls:${customerId}`);
    });

    socket.on('unsubscribe:agents', (customerId: string) => {
      socket.leave(`agents:${customerId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  console.log('🚀 WebSocket server initialized');
  return io;
}

export function getWebSocketServer(): SocketIOServer | null {
  return io;
}

// Broadcast functions
export function broadcastCallUpdate(customerId: string, update: CallUpdate) {
  if (!io) {
    console.warn('⚠️  WebSocket server not initialized');
    return;
  }

  io.to(`calls:${customerId}`).emit('call:update', update);
  console.log(`📡 Broadcast call update to calls:${customerId}`, update.id);
}

export function broadcastDashboardMetrics(customerId: string, metrics: DashboardMetrics) {
  if (!io) {
    console.warn('⚠️  WebSocket server not initialized');
    return;
  }

  io.to(`dashboard:${customerId}`).emit('dashboard:metrics', metrics);
  console.log(`📡 Broadcast dashboard metrics to dashboard:${customerId}`);
}

export function broadcastAgentStatus(customerId: string, status: AgentStatus) {
  if (!io) {
    console.warn('⚠️  WebSocket server not initialized');
    return;
  }

  io.to(`agents:${customerId}`).emit('agent:status', status);
  console.log(`📡 Broadcast agent status to agents:${customerId}`, status.id);
}

// Utility function to broadcast to all rooms
export function broadcastToAll(event: string, data: any) {
  if (!io) {
    console.warn('⚠️  WebSocket server not initialized');
    return;
  }

  io.emit(event, data);
  console.log(`📡 Broadcast to all clients: ${event}`);
}
