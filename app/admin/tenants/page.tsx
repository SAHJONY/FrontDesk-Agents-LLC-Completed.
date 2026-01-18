import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getAdminDashboardData } from '@/lib/admin-actions';
import TenantOverview from '@/components/admin/TenantOverview';

export default async function AdminTenantsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // SECURITY: Ensure ONLY the Super Admin can access
  if (!user || user.email !== process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL) {
    redirect('/dashboard');
  }

  const dashboardData = await getAdminDashboardData();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Executive Dashboard</h1>
        <p className="text-gray-500 mt-1">Real-time platform oversight and revenue tracking.</p>
      </div>
      
      <TenantOverview initialData={dashboardData} />
    </div>
  );
}
