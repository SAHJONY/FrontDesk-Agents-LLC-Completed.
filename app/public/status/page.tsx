'use client';

import React from 'react';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/solid';

// 1. Interfaces de TypeScript
interface SystemStatus {
  id: number;
  name: string;
  status: 'Operational' | 'Performance Issues' | 'Down';
  lastUpdated: string;
}

// 2. Función de ayuda tipada
const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Operational':
      return { 
        icon: CheckCircleIcon, 
        color: 'text-green-600', 
        bg: 'bg-green-100', 
        indicator: 'bg-green-500' 
      };
    case 'Performance Issues':
      return { 
        icon: ExclamationCircleIcon, 
        color: 'text-yellow-600', 
        bg: 'bg-yellow-100', 
        indicator: 'bg-yellow-500' 
      };
    default:
      return { 
        icon: XCircleIcon, 
        color: 'text-red-600', 
        bg: 'bg-red-100', 
        indicator: 'bg-red-500' 
      };
  }
};

// 3. EXPORT DEFAULT (Obligatorio para solucionar "is not a module")
export default function StatusPage() {
  const systems: SystemStatus[] = [
    { id: 1, name: 'Voice AI Core', status: 'Operational', lastUpdated: 'Just now' },
    { id: 2, name: 'Dashboard API', status: 'Operational', lastUpdated: '5 mins ago' },
    { id: 3, name: 'Database Clusters', status: 'Operational', lastUpdated: '10 mins ago' },
  ];

  return (
    <div className="min-h-screen bg-[#0a1929] pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">System Status</h1>
        <div className="bg-[#10213A] rounded-xl border border-white/10 overflow-hidden">
          {systems.map((system) => {
            const styles = getStatusStyles(system.status);
            const Icon = styles.icon;
            return (
              <div key={system.id} className="flex items-center justify-between p-6 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-4">
                  <Icon className={`w-6 h-6 ${styles.color}`} />
                  <div>
                    <h3 className="text-white font-medium">{system.name}</h3>
                    <p className="text-gray-500 text-xs">Updated: {system.lastUpdated}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${styles.bg} ${styles.color}`}>
                  {system.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
