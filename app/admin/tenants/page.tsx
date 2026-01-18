import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getAdminDashboardData } from '@/lib/admin-actions';
import TenantOverview from '@/components/admin/TenantOverview';
import GrowthChart from '@/components/admin/GrowthChart';
import PerformanceTable from '@/components/admin/PerformanceTable';
import CallTrend from '@/components/admin/CallTrend';

export const dynamic = 'force-dynamic';

export default async function AdminTenantsPage() {
  const supabase = await createClient();
  
  // 1. Security Gate
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  const superAdminEmail = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL;

  if (!user || authError || user.email !== superAdminEmail) {
    redirect('/dashboard');
  }

  // 2. Fetch all consolidated data
  const dashboardData = await getAdminDashboardData();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="p-8 max-w-7xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                Platform Oversight
              </span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Executive Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Live revenue and autonomous agent performance metrics.
            </p>
          </div>
          
          {/* Quick AI Summary Hook (Placeholder for future AI integration) */}
          <div className="bg-white border border-indigo-100 p-4 rounded-xl shadow-sm max-w-xs">
            <p className="text-[10px] font-bold text-indigo-600 uppercase mb-1">AI Insight</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Platform activity is up <span className="text-green-600 font-bold">12%</span> this week. High agent retention detected across core tenants.
            </p>
          </div>
        </header>

        {/* TOP ROW: REVENUE & USAGE TRENDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GrowthChart data={dashboardData.chartData} />
          </div>
          <div className="space-y-6">
            <CallTrend data={dashboardData.callTrend} />
            
            {/* Strategic Growth Card */}
            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-100">
              <h4 className="font-bold text-lg">Workforce Stats</h4>
              <p className="text-indigo-100 text-sm mt-1">
                Managing {dashboardData.stats.totalAgents} agents across {dashboardData.tenants.length} tenants.
              </p>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: LEADERBOARD & PERFORMANCE */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
             <div className="h-full bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-center">
                <p className="text-gray-500 text-sm italic">"The best way to predict the future is to create it."</p>
                <p className="text-gray-400 text-xs mt-2">— Platform Management</p>
             </div>
          </div>
          <div className="lg:col-span-3">
            <PerformanceTable data={dashboardData.performance} />
          </div>
        </div>
        
        {/* BOTTOM SECTION: DETAILED TENANT CONTROL */}
        <section className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900">Tenant Directory</h2>
            <span className="text-sm font-medium text-gray-400">
              {dashboardData.tenants.length} Active Records
            </span>
          </div>
          <TenantOverview initialData={dashboardData} />
        </section>

      </div>
    </div>
  );
}
