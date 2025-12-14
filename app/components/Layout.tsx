// ./app/components/Layout.tsx

import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* 1. Global Navigation Sidebar */}
      <Sidebar />
      
      {/* 2. Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-100">
        {/*
          Content Header (Optional: Can be added here for breadcrumbs/alerts)
          <header className="p-4 bg-white border-b sticky top-0 z-10 shadow-sm">
            <h2 className="text-xl font-medium">Page Title</h2>
          </header>
        */}
        
        {/* Actual Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
