import React from 'react';

interface StatsProps {
  label: string;
  value: string | number;
  trend?: string;
}

export const StatsWidget = ({ label, value, trend }: StatsProps) => {
  return (
    <div className="titan-card p-6">
      <p className="text-brand-slate text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-3">
        <h3 className="text-3xl font-black text-white">{value}</h3>
        {trend && <span className="text-green-400 text-[10px] font-bold">{trend}</span>}
      </div>
    </div>
  );
};
