// ./lib/db-simulation.ts (SIMULACIÓN DE BASE DE DATOS)

import { PlanTier } from './plan-utils';

// --- Esquemas de Datos ---

interface ClientConfig {
  clientKey: string;
  email: string; // Propietario de la cuenta
  plan: PlanTier;
  crmType: 'HubSpot' | 'Salesforce' | 'Custom API' | 'None';
  crmEndpoint?: string; // URL o clave API para el CRM
}

interface CallLogEntry {
  id: number;
  callId: string;
  clientId: string;
  status: 'completed' | 'failed';
  outcome: 'booked' | 'qualified' | 'hangup';
  durationSeconds: number;
  transcript: string;
  leadData: { name: string; phone: string; email: string };
  createdAt: Date;
}

// --- Almacenamiento Simulado ---
let CLIENTS: ClientConfig[] = [
  { clientKey: 'FDDG-SARAV1-93A2X-57B', email: 'client@example.com', plan: 'Premium', crmType: 'HubSpot', crmEndpoint: 'https://api.hubspot.com/...' },
];
let CALL_LOGS: CallLogEntry[] = [];
let logIdCounter = 1;

// --- Funciones de Simulación ---

export const db = {
  client: {
    findUnique: (key: string): ClientConfig | undefined => {
      return CLIENTS.find(c => c.clientKey === key);
    },
    update: (key: string, data: Partial<ClientConfig>): ClientConfig | undefined => {
      const index = CLIENTS.findIndex(c => c.clientKey === key);
      if (index === -1) return undefined;
      CLIENTS[index] = { ...CLIENTS[index], ...data };
      return CLIENTS[index];
    }
  },
  callLog: {
    create: (data: Omit<CallLogEntry, 'id' | 'createdAt'>): CallLogEntry => {
      const newLog: CallLogEntry = {
        id: logIdCounter++,
        createdAt: new Date(),
        ...data,
      };
      CALL_LOGS.push(newLog);
      console.log(`[DB SIM] Logged new call: ${newLog.callId}`);
      return newLog;
    },
    // Función para el Dashboard
    getRecentLogs: (clientId: string, limit: number = 10): CallLogEntry[] => {
      return CALL_LOGS
        .filter(log => log.clientId === clientId)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, limit);
    }
  }
};
