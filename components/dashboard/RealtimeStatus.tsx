// ./components/Dashboard/RealtimeStatus.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { SignalIcon, BoltIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

/**
 * Muestra el estado operativo en tiempo real de SARA.AI.
 * En producción, esto se conectaría a un WebSocket o a una caché de Redis.
 */
const RealtimeStatus: React.FC = () => {
  const [status, setStatus] = useState<'online' | 'offline' | 'error'>('online');
  const [activity, setActivity] = useState('Listening for calls...');

  useEffect(() => {
    // SIMULACIÓN DE ACTIVIDAD EN TIEMPO REAL
    const interval = setInterval(() => {
      // Simula que la mayoría del tiempo está en línea, pero a veces tiene errores
      const statuses = ['online', 'online', 'online', 'online', 'error'];
      const currentStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      let currentActivity = 'Listening for inbound requests...';
      if (currentStatus === 'online' && Math.random() < 0.3) {
        currentActivity = 'Active on call: Prospect #879';
      } else if (currentStatus === 'error') {
        currentActivity = 'System error - Check API keys.';
      }

      setStatus(currentStatus as 'online' | 'offline' | 'error');
      setActivity(currentActivity);
    }, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const getStatusDisplay = () => {
    switch (status) {
      case 'online':
        return { 
          icon: BoltIcon, 
          text: 'SARA.AI Active', 
          color: 'text-green-400', 
          bgColor: 'bg-green-600/20',
          borderColor: 'var(--color-green-light)'
        };
      case 'offline':
        return { 
          icon: XCircleIcon, 
          text: 'System Offline', 
          color: 'text-red-400', 
          bgColor: 'bg-red-600/20',
          borderColor: 'var(--color-red-light)'
        };
      case 'error':
        return { 
          icon: XCircleIcon, 
          text: 'Error Detected', 
          color: 'text-red-400', 
          bgColor: 'bg-red-600/20',
          borderColor: 'var(--color-red-light)'
        };
    }
  };

  const display = getStatusDisplay();

  return (
    <div 
      className={`glass-card p-6 flex flex-col justify-between border-l-4 h-full ${display.bgColor}`} 
      style={{ borderColor: display.borderColor }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Live Status
        </h3>
        <SignalIcon className={`w-6 h-6 ${display.color} ${status === 'online' ? 'animate-pulse' : ''}`} />
      </div>
      <div className="mt-4">
        <div className="flex items-center">
          <display.icon className={`w-5 h-5 mr-2 ${display.color}`} />
          <p className="text-xl font-bold text-white">
            {display.text}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-1 truncate">
          {activity}
        </p>
      </div>
    </div>
  );
};

export default RealtimeStatus;
