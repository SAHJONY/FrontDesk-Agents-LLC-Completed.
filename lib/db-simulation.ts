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

export type IntegrationControl = {
  provider: string;
  daily_limit: number;
  enabled: boolean;
};

export type ConsumptionEntry = {
  id: string;
  provider: string;
  created_at: Date;
};

type DB = {
  callLogs: CallLogEntry[];
  client: {
    findUnique: (id: string) => ClientConfig | null;
  };
  integrations_control: {
    findUnique: (params: { where: { provider: string } }) => Promise<IntegrationControl | null>;
  };
  consumption: {
    getDailyUsage: (provider: string) => Promise<number>;
    create: (data: { provider: string; timestamp: Date }) => Promise<void>;
    findMany: (params: {
      where: {
        provider: string;
        created_at: { gte: Date };
      };
    }) => Promise<ConsumptionEntry[]>;
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

const integrations: IntegrationControl[] = [
  {
    provider: 'bland_ai',
    daily_limit: 100,
    enabled: true,
  },
];

const consumptionLogs: ConsumptionEntry[] = [];

export const db: DB = {
  callLogs: [],
  client: {
    findUnique: (id: string) => {
      return clients.find(c => c.id === id) || null;
    },
  },
  integrations_control: {
    findUnique: async (params: { where: { provider: string } }) => {
      const integration = integrations.find(i => i.provider === params.where.provider);
      return integration || null;
    },
  },
  consumption: {
    getDailyUsage: async (provider: string) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayLogs = consumptionLogs.filter(log => {
        const logDate = new Date(log.created_at);
        logDate.setHours(0, 0, 0, 0);
        return log.provider === provider && logDate.getTime() === today.getTime();
      });
      
      return todayLogs.length;
    },
    create: async (data: { provider: string; timestamp: Date }) => {
      const newEntry: ConsumptionEntry = {
        id: `consumption-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        provider: data.provider,
        created_at: data.timestamp,
      };
      consumptionLogs.push(newEntry);
    },
    findMany: async (params: {
      where: {
        provider: string;
        created_at: { gte: Date };
      };
    }) => {
      return consumptionLogs.filter(log => {
        return log.provider === params.where.provider &&
               log.created_at >= params.where.created_at.gte;
      });
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

// Helper to manage integrations
export function addIntegration(integration: IntegrationControl) {
  const existing = integrations.findIndex(i => i.provider === integration.provider);
  if (existing !== -1) {
    integrations[existing] = integration;
  } else {
    integrations.push(integration);
  }
}

export function getIntegrations() {
  return integrations;
}

// Helper to view consumption logs
export function getConsumptionLogs() {
  return consumptionLogs;
}

// Helper to clear consumption logs (useful for testing)
export function clearConsumptionLogs() {
  consumptionLogs.length = 0;
      }
