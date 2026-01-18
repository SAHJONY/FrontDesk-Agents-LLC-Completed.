import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getAllTenants } from '@/lib/admin-actions';
import TenantOverview from '@/components/admin/TenantOverview';

export default async function AdminTenantsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // SECURITY: Only allow the specific Super Admin email
  if (!user || user.email !== process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL) {
    redirect('/dashboard');
  }

  const tenants = await getAllTenants();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Platform Command Center</h1>
        <p className="text-gray-600">Managing {tenants.length} active instances.</p>
      </div>
      
      <TenantOverview tenants={tenants} />
    </div>
  );
}
