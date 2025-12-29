import { CallFeed } from '@/components/dashboard/CallFeed';
import { RevenueStats } from '@/components/dashboard/RevenueStats';
import { NodeStatus } from '@/components/dashboard/NodeStatus';

export default async function DashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Revenue Command Center</h1>
          <p className="text-gray-500">Global Workforce Status: <span className="text-green-500 font-medium">Active</span></p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-600 uppercase font-bold">Local Market Multiplier</p>
          <p className="text-2xl font-black text-blue-900">1.0x (Standard)</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RevenueStats />
        <NodeStatus />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CallFeed />
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="font-bold mb-4">Active Conversion Script</h2>
          <div className="bg-gray-50 p-4 rounded font-mono text-sm text-gray-700">
            "You are a Priority Agent. If the customer mentions a cancelled subscription, 
            offer the loyalty discount and verify the card on file..."
          </div>
        </div>
      </div>
    </div>
  );
}
