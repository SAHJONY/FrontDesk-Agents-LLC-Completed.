export const dynamic = 'force-dynamic';

'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function NumbersPage() {
  const { profile } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Phone Provisioning</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-gray-600">
          Managing local communication lines for <strong>{profile?.companyName}</strong> in <strong>{profile?.countryCode}</strong>.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="block text-xs text-gray-400 uppercase">Active Lines</span>
            <span className="text-xl font-semibold">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
