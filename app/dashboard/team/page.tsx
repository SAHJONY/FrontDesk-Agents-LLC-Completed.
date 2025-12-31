'use client';

import React from 'react';
// If your file is in /app/dashboard/team/page.tsx, 
// you must go up TWO levels to reach /app/
import { useAuth } from '../../contexts/AuthContext'; 

export default function TeamPage() {
  const { profile } = useAuth();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Workforce Management</h1>
      <p>Node: {profile?.companyName || 'Sovereign Node'}</p>
    </div>
  );
}

