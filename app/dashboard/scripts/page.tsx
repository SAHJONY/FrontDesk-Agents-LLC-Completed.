'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ScriptsPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Conversion Scripts</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">AI Logic configured for {profile?.tenant_id}</p>
      </div>
    </div>
  );
}
