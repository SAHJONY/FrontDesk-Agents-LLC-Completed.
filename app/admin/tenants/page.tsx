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
  
  // Verify the user is logged in
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  // Security Gate: Redirect anyone who isn't the Super Admin
  if (
    !user || 
    authError || 
    user.email !== process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL
  ) {
    redirect('/dashboard');
  }

  // Fetch the data using the corrected action name
  const dashboardData = await getAdminDashboardData();

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="p-8 max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Live Oversight
            </span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Executive Dashboard
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Global revenue, tenant health, and autonomous agent metrics.
          </p>
        </header>
        
        {/* Pass data to the client-side interactive table */}
        <TenantOverview initialData={dashboardData} />
      </div>
    </div>
  );
}
