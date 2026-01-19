import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getAdminDashboardData } from '@/lib/admin-actions'; 
import TenantOverview from '@/components/admin/TenantOverview';
import GrowthChart from '@/components/admin/GrowthChart';
import AISummaryBox from '@/components/admin/AISummaryBox';
import PerformanceTable from '@/components/admin/PerformanceTable';
import CallTrend from '@/components/admin/CallTrend';

export const dynamic = 'force-dynamic';

export default async function AdminTenantsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const superAdminEmail = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL;

  // Security Gate
  if (!user || user.email !== superAdminEmail) {
    redirect('/dashboard');
  }

  const dashboardData = await getAdminDashboardData();

  return (
    <div className="min-h-screen bg-[#fafafa] p-8 space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-gray-500 mt-1">Global revenue and platform health oversight.</p>
        </div>
        <div className="w-full md:w-96">
          <AISummaryBox stats={dashboardData.stats} />
        </div>
      </header>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GrowthChart data={dashboardData.chartData} />
        </div>
        <div className="space-y-6">
          <CallTrend data={dashboardData.callTrend} />
          <PerformanceTable data={dashboardData.performance} />
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Operations Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Tenants</h2>
        <TenantOverview initialData={dashboardData} />
      </section>
    </div>
  );
}
