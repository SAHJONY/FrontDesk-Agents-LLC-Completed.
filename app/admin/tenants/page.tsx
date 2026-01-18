import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getAdminDashboardData } from '@/lib/admin-actions';
import TenantOverview from '@/components/admin/TenantOverview';
import GrowthChart from '@/components/admin/GrowthChart';

// Next.js 15: Ensure we don't cache admin data; it must be live.
export const dynamic = 'force-dynamic';

/**
 * SUPER ADMIN TENANT CONTROL
 * Features: Live Oversight, Revenue Growth, and Impersonation Access
 */
export default async function AdminTenantsPage() {
  const supabase = await createClient();
  
  // 1. Verify the session
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  // 2. Security Gate: Strict check for Super Admin
  const superAdminEmail = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL;

  if (
    !user || 
    authError || 
    user.email !== superAdminEmail
  ) {
    redirect('/dashboard');
  }

  // 3. Fetch the enhanced data (Includes tenants, stats, and chartData)
  const dashboardData = await getAdminDashboardData();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="p-8 max-w-7xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <header>
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

        {/* ANALYTICS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Custom Bar Chart Component */}
            <GrowthChart data={dashboardData.chartData} />
          </div>
          
          <div className="bg-indigo-600 rounded-2xl p-8 text-white flex flex-col justify-center shadow-xl shadow-indigo-200">
            <p className="text-indigo-100 text-sm font-semibold uppercase tracking-wider">
              Strategic Growth
            </p>
            <h4 className="text-2xl font-bold mt-3 leading-tight">
              Scaling Your Workforce
            </h4>
            <p className="text-indigo-50/80 text-sm mt-4 leading-relaxed">
              Your platform currently manages <span className="text-white font-bold">{dashboardData.stats.totalAgents} AI Agents</span>. 
              Based on your MRR growth, adding 5 enterprise tenants would put your revenue on track to hit new records this quarter.
            </p>
            <div className="mt-8 pt-6 border-t border-indigo-500">
              <p className="text-xs text-indigo-200 italic">
                Data refreshed live via Supabase.
              </p>
            </div>
          </div>
        </div>
        
        {/* INTERACTIVE TENANT TABLE/GRID */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Active Tenants</h2>
            <div className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-500">
              {dashboardData.tenants.length} Total Accounts
            </div>
          </div>
          <TenantOverview initialData={dashboardData} />
        </section>

      </div>
    </div>
  );
}
