'use client';
import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  CurrencyDollarIcon, 
  CpuChipIcon, 
  UsersIcon,
  ArrowDownTrayIcon, // New Icon
  Loader2
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function TenantOverview({ initialData }: { initialData: any }) {
  const [search, setSearch] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();
  
  const { tenants, stats } = initialData;

  const filteredTenants = tenants.filter((t: any) => 
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  // --- CSV EXPORT LOGIC ---
  const exportToCSV = () => {
    // Define Headers
    const headers = ["ID", "Company Name", "Owner ID", "MRR", "Agents", "Created At"];
    
    // Map data to rows
    const rows = filteredTenants.map((t: any) => [
      t.id,
      `"${t.name}"`, // Wrap in quotes to handle commas in names
      t.owner_id,
      t.mrr,
      t.agent_count,
      new Date(t.created_at).toLocaleDateString()
    ]);

    // Combine into a single string
    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    // Create a blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `frontdesk_tenants_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImpersonate = async (ownerId: string) => {
    setLoadingId(ownerId);
    try {
      const res = await fetch('/api/admin/impersonate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId }),
      });
      const data = await res.json();
      if (data.success) router.push(data.redirectUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* --- STATS RIBBON --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Platform MRR" value={`$${stats.totalMrr}`} icon={<CurrencyDollarIcon className="h-6 w-6 text-green-600"/>} color="bg-green-50" />
        <StatCard title="AI Agents" value={stats.totalAgents} icon={<CpuChipIcon className="h-6 w-6 text-blue-600"/>} color="bg-blue-50" />
        <StatCard title="Tenants" value={tenants.length} icon={<UsersIcon className="h-6 w-6 text-purple-600"/>} color="bg-purple-50" />
      </div>

      {/* --- TOOLBAR: SEARCH & EXPORT --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by company name..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button 
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* --- TENANT GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((tenant: any) => (
          <div key={tenant.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{tenant.name}</h3>
              <p className="text-xs text-gray-400 font-mono mb-4 uppercase italic">
                Rev: ${tenant.mrr} | Agents: {tenant.agent_count}
              </p>
            </div>
            
            <button 
              onClick={() => handleImpersonate(tenant.owner_id || tenant.id)}
              disabled={loadingId === (tenant.owner_id || tenant.id)}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg flex justify-center items-center transition-all"
            >
              {loadingId === (tenant.owner_id || tenant.id) ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Enter Dashboard'
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className={`${color} p-6 rounded-2xl border border-gray-100 flex items-center gap-4`}>
      <div className="bg-white p-3 rounded-xl shadow-sm">{icon}</div>
      <div>
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
