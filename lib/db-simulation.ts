// lib/db-simulation.ts

export type CallLogEntry = {
  id: string;
  timestamp: string; // ISO
  callerName?: string;
  callerPhone?: string;
  intent?: 'lead' | 'appointment' | 'support' | 'other';
  outcome?: 'answered' | 'missed' | 'voicemail';
  notes?: string;
  agentName?: string;
  qualified?: boolean;
  clientId: string; // requerido por crm-sync-utils
};

export type ClientConfig = {
  id: string;
  name: string;
  crmProvider: 'hubspot' | 'salesforce' | 'gohighlevel' | 'custom';
  apiKey?: string;
  endpoint?: string;
  active: boolean;
};

type DB = {
  callLogs: CallLogEntry[];
  client: {
    findUnique: (id: string) => ClientConfig | null;
  };
};

const clients: ClientConfig[] = [
  {
    id: 'demo-client',
    name: 'Demo Client',
    crmProvider: 'custom',
    active: true,
  },
];

export const db: DB = {
  callLogs: [],
  client: {
    findUnique: (id: string) => {
      return clients.find(c => c.id === id) || null;
    },
  },
};

// Helpers opcionales
export function addCallLog(entry: CallLogEntry) {
  db.callLogs.push(entry);
}

export function getCallLogs() {
  return db.callLogs;
}
