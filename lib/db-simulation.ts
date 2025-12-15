// lib/db-simulation.ts

export type CallLogEntry = {
  id: string;
  timestamp: string; // ISO string
  callerName?: string;
  callerPhone?: string;
  intent?: 'lead' | 'appointment' | 'support' | 'other';
  outcome?: 'answered' | 'missed' | 'voicemail';
  notes?: string;
  agentName?: string;
  qualified?: boolean;
};

type DB = {
  callLogs: CallLogEntry[];
};

export const db: DB = {
  callLogs: [],
};

// Helpers opcionales
export function addCallLog(entry: CallLogEntry) {
  db.callLogs.push(entry);
}

export function getCallLogs() {
  return db.callLogs;
}
