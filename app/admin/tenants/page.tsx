import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getAdminDashboardData } from '@/lib/admin-actions';
import TenantOverview from '@/components/admin/TenantOverview';

/**
 * SUPER ADMIN TENANT CONTROL
 * Only accessible by the email defined in NEXT_PUBLIC_SUPER_ADMIN_EMAIL
 */
export default async function AdminTenantsPage() {
  const supabase = await createClient();
  
  // 1. Verify the session
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  // 2. Security Gate: Strict check for Super Admin
  // Note: Using process.env on the server is safer than NEXT_PUBLIC for sensitive gates
  const superAdminEmail = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL;

  if (
    !user || 
    authError || 
    user.email !== superAdminEmail
  ) {
    redirect('/dashboard');
  }

  // 3. Fetch the data
  // This now works perfectly with the function we updated in the previous step
  const dashboardData = await getAdminDashboardData();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="p-8 max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Platform Oversight
            </span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Executive Dashboard
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Global revenue, tenant health, and autonomous agent metrics.
          </p>
        </header>
        
        {/* 4. Interactive Table
            dashboardData contains { tenants: [], stats: { totalMrr, totalAgents } }
        */}
        <TenantOverview initialData={dashboardData} />
      </div>
    </div>
  );
}
