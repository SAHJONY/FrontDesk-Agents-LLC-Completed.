import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getAdminDashboardData } from '@/lib/admin-actions';
import TenantOverview from '@/components/admin/TenantOverview';

/**
 * EXECUTIVE COMMAND CENTER
 * This is a Server Component that handles authentication and 
 * initial data fetching for the platform owner.
 */
export default async function AdminTenantsPage() {
  const supabase = await createClient();
  
  // 1. Authenticate the user session
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  // 2. SECURITY GUARD: 
  // Strict check against the SUPER_ADMIN_EMAIL environment variable.
  // This prevents any unauthorized tenant from seeing the global dashboard.
  if (
    !user || 
    authError || 
    user.email !== process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL
  ) {
    redirect('/dashboard');
  }

  // 3. DATA AGGREGATION:
  // Fetches global MRR, Agent counts, and Tenant lists via the Admin SDK.
  const dashboardData = await getAdminDashboardData();

  // 4. FALLBACK:
  // If the database is empty or the fetch fails, we pass a safe initial state.
  const safeData = dashboardData || { 
    tenants: [], 
    stats: { totalMrr: 0, totalAgents: 0 } 
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="p-8 max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-2 bg-indigo-600 rounded-full"></div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Executive Dashboard
            </h1>
          </div>
          <p className="text-gray-500 mt-2 ml-11">
            Global oversight: Revenue tracking, AI workforce metrics, and account management.
          </p>
        </div>
        
        {/* INTERACTIVE DASHBOARD COMPONENT */}
        {/* This component handles the search, export, and impersonation logic */}
        <TenantOverview initialData={safeData} />
      </div>
    </div>
  );
}
