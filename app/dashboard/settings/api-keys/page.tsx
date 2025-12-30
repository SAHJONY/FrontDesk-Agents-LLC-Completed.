'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ApiKeysPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Developer API Keys</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-400 text-sm mb-4">Market Identity: {profile?.tenant_id}</p>
        {/* API Key Management UI */}
      </div>
    </div>
  );
}
