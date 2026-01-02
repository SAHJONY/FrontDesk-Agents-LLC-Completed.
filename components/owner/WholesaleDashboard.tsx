import React, { useEffect, useState } from 'react';

interface Stats {
  total_leads: number;
  pipeline_value: number;
  hot_leads: number;
}

export const WholesaleDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSovereignData = async () => {
      try {
        const response = await fetch('/api/wholesale/stats', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        if (data.success) setStats(data.metrics);
      } catch (err) {
        console.error("Sovereign Access Denied");
      } finally {
        setLoading(false);
      }
    };
    fetchSovereignData();
  }, []);

  if (loading) return <div>Initializing Sovereign Systems...</div>;
  if (!stats) return null; // Component hides itself if not the owner

  return (
    <div className="p-6 bg-slate-900 text-white rounded-lg shadow-xl border-2 border-amber-500">
      <h2 className="text-2xl font-bold mb-4 text-amber-500">Sovereign Wholesale Command</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-slate-800 rounded border border-slate-700">
          <p className="text-sm text-slate-400 uppercase">Total Leads Found</p>
          <p className="text-3xl font-mono">{stats.total_leads}</p>
        </div>
        <div className="p-4 bg-slate-800 rounded border border-slate-700">
          <p className="text-sm text-slate-400 uppercase">Pipeline ARV Spread</p>
          <p className="text-3xl font-mono text-green-400">${stats.pipeline_value.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-slate-800 rounded border border-slate-700">
          <p className="text-sm text-slate-400 uppercase">Hot Deals (10% + Margin)</p>
          <p className="text-3xl font-mono text-amber-400">{stats.hot_leads}</p>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded font-bold">Trigger Crawler</button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-bold">Start Voice Agents</button>
      </div>
    </div>
  );
};
