import { BarChart, Globe, Zap, TrendingUp } from 'lucide-react';

export const CeoDashboard = ({ globalStats }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-slate-50">
      {/* Global Intelligence Card */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <Globe size={20} />
          <h3 className="font-bold">Global Reach</h3>
        </div>
        <p className="text-2xl font-bold">195 Countries</p>
        <p className="text-xs text-slate-500">Active RL Workforce</p>
      </div>

      {/* Reward Score Card */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <TrendingUp size={20} />
          <h3 className="font-bold">Avg. Reward</h3>
        </div>
        <p className="text-2xl font-bold">+8.42</p>
        <p className="text-xs text-slate-500">Self-Optimization Rate: 94%</p>
      </div>

      {/* VP Performance */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 text-purple-600 mb-2">
          <Zap size={20} />
          <h3 className="font-bold">VP Growth</h3>
        </div>
        <p className="text-2xl font-bold">42.1%</p>
        <p className="text-xs text-slate-500">Conversion Increase</p>
      </div>

      {/* Finance Recovery */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 text-orange-600 mb-2">
          <BarChart size={20} />
          <h3 className="font-bold">VP Finance</h3>
        </div>
        <p className="text-2xl font-bold">$1.2M</p>
        <p className="text-xs text-slate-500">Auto-Recovered Today</p>
      </div>
    </div>
  );
};
