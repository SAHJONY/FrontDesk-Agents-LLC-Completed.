import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getAllTenants } from '@/lib/admin-actions';
import TenantOverview from '@/components/admin/TenantOverview';

export default async function AdminTenantsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect if not the Master Owner
  if (user?.email !== process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL) {
    redirect('/dashboard');
  }

  const tenants = await getAllTenants();

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">Global Tenant Command</h1>
        <p className="mt-2 text-sm text-gray-600">
          Monitoring {tenants.length} active business units across the platform.
        </p>
      </header>
      
      <TenantOverview tenants={tenants} />
    </div>
  );
}
