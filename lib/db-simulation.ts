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

export type BusinessConfig = {
  id: string;
  name: string;
  phoneNumber: string;
  voiceAgentConfig?: any;
  active: boolean;
  createdAt: Date;
};

type DB = {
  callLogs: {
    update: (params: { where: { blandCallId: string }; data: Partial<CallLogEntry> }) => Promise<CallLogEntry>;
    findMany: (params: { where: { blandCallId: string } }) => Promise<CallLogEntry[]>;
  };
  client: {
    findUnique: (id: string) => ClientConfig | null;
  };
  businessConfig: {
    findFirst: (params: { where: { phoneNumber: string } }) => Promise<BusinessConfig | null>;
    findUnique: (params: { where: { id: string } }) => Promise<BusinessConfig | null>;
    create: (data: Omit<BusinessConfig, 'id' | 'createdAt'>) => Promise<BusinessConfig>;
    update: (params: { where: { id: string }; data: Partial<BusinessConfig> }) => Promise<BusinessConfig>;
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

const businessConfigs: BusinessConfig[] = [
  {
    id: 'demo-business-1',
    name: 'Demo Business',
    phoneNumber: '+11234567890',
    active: true,
    createdAt: new Date(),
  },
];

export const db: DB = {
  callLogs: {
    update: async (params: { where: { blandCallId: string }; data: Partial<CallLogEntry> }) => {
      const index = (db.callLogs as any).findMany({ where: { blandCallId: params.where.blandCallId } }).findIndex((log: any) => log.blandCallId === params.where.blandCallId);
      if (index === -1) {
        throw new Error('Call log not found');
      }
      (db.callLogs as any)[index] = { ...(db.callLogs as any)[index], ...params.data };
      return (db.callLogs as any)[index];
    },
    findMany: async (params: { where: { blandCallId: string } }) => {
      return (db.callLogs as any).filter((log: any) => log.blandCallId === params.where.blandCallId);
    },
  },
  client: {
    findUnique: (id: string) => {
      return clients.find(c => c.id === id) || null;
    },
  },
  businessConfig: {
    findFirst: async (params: { where: { phoneNumber: string } }) => {
      const config = businessConfigs.find(b => b.phoneNumber === params.where.phoneNumber);
      return config || null;
    },
    findUnique: async (params: { where: { id: string } }) => {
      const config = businessConfigs.find(b => b.id === params.where.id);
      return config || null;
    },
    create: async (data: Omit<BusinessConfig, 'id' | 'createdAt'>) => {
      const newConfig: BusinessConfig = {
        ...data,
        id: `business-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
      };
      businessConfigs.push(newConfig);
      return newConfig;
    },
    update: async (params: { where: { id: string }; data: Partial<BusinessConfig> }) => {
      const index = businessConfigs.findIndex(b => b.id === params.where.id);
      if (index === -1) {
        throw new Error('Business config not found');
      }
      businessConfigs[index] = { ...businessConfigs[index], ...params.data };
      return businessConfigs[index];
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
  (db.callLogs as any).push(entry);
}

export function getCallLogs() {
  return (db.callLogs as any);
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

// Helpers for business configs
export function addBusinessConfig(config: Omit<BusinessConfig, 'id' | 'createdAt'>) {
  const newConfig: BusinessConfig = {
    ...config,
    id: `business-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
  };
  businessConfigs.push(newConfig);
  return newConfig;
}

export function getBusinessConfigs() {
  return businessConfigs;
}
