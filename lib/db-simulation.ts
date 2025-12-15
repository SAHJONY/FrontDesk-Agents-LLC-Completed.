// ./lib/db-simulation.ts (Ensure correct export structure)

// ... (Interface and data definitions above) ...

// --- Funciones de Simulación ---

// Ensure the export keyword is used here!
export const db = {
  client: {
    findUnique: (key: string): ClientConfig | undefined => {
      // ...
    },
    // ...
  },
  callLog: {
    create: (data: Omit<CallLogEntry, 'id' | 'createdAt'>): CallLogEntry => {
      // ...
    },
    getRecentLogs: (clientId: string, limit: number = 10): CallLogEntry[] => {
      // ...
    }
  }
};
