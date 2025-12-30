'use client';

import React from 'react';
// We go up two levels: from api-keys -> settings -> dashboard -> app
import { useAuth } from '../../../contexts/AuthContext';

export default function ApiKeysPage() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sovereign API Access</h1>
      <div className="bg-gray-900 rounded-xl p-8 text-white">
        <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">Secure Credentials</h3>
        <div className="p-4 bg-gray-800 rounded border border-gray-700 font-mono text-sm">
          {user?.id ? `SK_LIVE_${user.id.substring(0, 12)}...` : 'Provisioning Key...'}
        </div>
      </div>
    </div>
  );
}
