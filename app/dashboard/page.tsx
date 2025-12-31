'use client';

import React from 'react';
// This relative path is correct if team/page.tsx is in /app/dashboard/
import { useAuth } from '../contexts/AuthContext';

export default function TeamPage() {
  const { profile } = useAuth();
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Node Workforce: {profile?.companyName}</h2>
    </div>
  );
}
