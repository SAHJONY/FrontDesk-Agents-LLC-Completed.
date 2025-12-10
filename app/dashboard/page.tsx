// app/dashboard/page.tsx

// 1. You can have imports here
import React from 'react'; 
// import DashboardLayout from '@/components/DashboardLayout'; 
// import Widget from '@/components/Widget';

// 2. Define your component
const DashboardPage = () => {
  return (
    <main>
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
      {/* ... rest of your dashboard content ... */}
    </main>
  );
};

// 3. CRITICAL: Export the component as the default export
export default DashboardPage; 
