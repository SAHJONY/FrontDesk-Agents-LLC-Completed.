import React from 'react';
import { TrendingUp, PhoneCall, CalendarCheck, DollarSign } from 'lucide-react';

interface SalesStats {
  totalRevenueGenerated: number;
  appointmentsBooked: number;
  conversionRate: number;
  aiMinutesUsed: number | 'Unlimited';
}

export const SalesAnalytics: React.FC<{ stats: SalesStats }> = ({ stats }) => {
  const cards = [
    { label: 'Revenue Generated', value: `$${stats.totalRevenueGenerated}`, icon: DollarSign, color: 'text-green-500' },
    { label: 'Appointments Booked', value: stats.appointmentsBooked, icon: CalendarCheck, color: 'text-blue-500' },
    { label: 'Sales Conversion', value: `${stats.conversionRate}%`, icon: TrendingUp, color: 'text-purple-500' },
    { label: 'Minutes Consumed', value: stats.aiMinutesUsed, icon: PhoneCall, color: 'text-slate-400' },
  ];

  return (
    <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Sales Performance Hub</h2>
          <p className="text-slate-400 text-sm">Real-time ROI from your AI Agent Fleet</p>
        </div>
        <div className="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full">
          <span className="text-blue-500 text-xs font-bold uppercase">Elite Node Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <card.icon className={`w-5 h-5 ${card.color}`} />
              <span className="text-slate-400 text-xs font-medium uppercase">{card.label}</span>
            </div>
            <div className="text-2xl font-bold text-white">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Conversion Chart Placeholder */}
      <div className="mt-8 h-48 w-full bg-slate-900/50 border border-dashed border-slate-700 rounded-xl flex items-center justify-center">
        <span className="text-slate-500 text-sm italic">Sales Velocity Graph: Syncing with Global Nodes...</span>
      </div>
    </div>
  );
};
