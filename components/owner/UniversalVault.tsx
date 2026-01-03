// components/owner/UniversalVault.tsx
'use client';

import React, { useState } from 'react';

// Definimos las claves que sostienen la plataforma
const CRITICAL_KEYS = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE', 'DATABASE_URL', 'VERCEL_PROJECT_ID', 'VERCEL_AUTH_TOKEN'];

export const UniversalVault = () => {
  const [secrets, setSecrets] = useState([{ key: '', value: '' }]);
  const [loading, setLoading] = useState(false);

  const syncAll = async () => {
    // 1. Identificar si hay claves críticas en la lista
    const foundCritical = secrets.filter(s => CRITICAL_KEYS.includes(s.key.toUpperCase()));

    if (foundCritical.length > 0) {
      const confirmMsg = `ADVERTENCIA: Estás intentando modificar claves críticas: ${foundCritical.map(s => s.key).join(', ')}. Esto podría desconectar la plataforma global. ¿Deseas continuar?`;
      if (!window.confirm(confirmMsg)) return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/wholesale/sync-bulk-secrets', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ secrets })
      });
      if (response.ok) alert("Configuración global actualizada con éxito.");
    } catch (error) {
      console.error("Error en la sincronización:", error);
    } finally {
      setLoading(false);
    }
  };

  // ... (Resto del código de inputs del mensaje anterior)
};
