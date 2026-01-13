import React from 'react';
import { TrendingUp, Clock, Zap, ShieldCheck } from 'lucide-react';

interface Props {
  recoveredLeads: number;
  leadValue: number;
  conversionRate: number;
}

export const RevenueRecoveryWidget: React.FC<Props> = ({ 
  recoveredLeads = 0, 
  leadValue = 2500, 
  conversionRate = 0.20 
}) => {
  const recoveredRevenue = recoveredLeads * leadValue * conversionRate;
  const roiMultiplier = (recoveredRevenue / 1499).toFixed(1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-slate-900 font-bold text-xl">Revenue Recovery</h3>
          <p className="text-slate-500 text-sm">Autonomous Front Office Performance</p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg">
          <ShieldCheck size={24} />
        </div>
      </div>

      <div className="mb-8">
        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Recovered Revenue</span>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black text-slate-900">${recoveredRevenue.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600">
            <Clock size={16} />
            <span className="text-xs font-bold uppercase">After-Hours</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{Math.floor(recoveredLeads * 0.6)}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-600">
            <Zap size={16} />
            <span className="text-xs font-bold uppercase">Overflow</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{Math.floor(recoveredLeads * 0.4)}</p>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <TrendingUp size={18} className="text-emerald-500" />
          <span>System ROI:</span>
        </div>
        <span className="text-emerald-600 font-black text-lg">{roiMultiplier}x</span>
      </div>
    </div>
  );
};
