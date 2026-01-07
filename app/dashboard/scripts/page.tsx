export const dynamic = 'force-dynamic';

'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function ScriptsPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Conversion Scripts</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-medium text-gray-900 mb-2">AI Behavioral Logic</h3>
        <p className="text-sm text-gray-500 mb-4">
          Customized for the <strong>{profile?.tier}</strong> tier environment.
        </p>
        <div className="p-4 bg-blue-50 text-blue-700 rounded-lg text-sm italic">
          Defaulting to Global Standard Logic for {profile?.currencyCode || 'USD'}.
        </div>
      </div>
    </div>
  );
}
