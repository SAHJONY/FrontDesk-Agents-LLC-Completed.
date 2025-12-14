// ./app/(client)/layout.tsx

import Sidebar from '@/components/Sidebar';
import React from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

// Note: This layout is designed to wrap all pages that require the 
// client-side navigation experience (e.g., Dashboard, Automations).
// The outer <body> tag and metadata are handled by the root layout.
export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[var(--color-navy-dark)]">
      {/* The Sidebar is fixed and positioned on the left.
        We assume '@/components/Sidebar' has been created as detailed previously.
      */}
      <Sidebar />
      
      {/* Main Content Area: takes up the remaining horizontal space.
        Uses flex-1 and overflow-y-auto for scrollable content within the layout.
      */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
