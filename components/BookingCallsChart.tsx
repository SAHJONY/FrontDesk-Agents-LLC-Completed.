'use client';

import React from 'react';

interface TimeSeriesPoint {
  date: string;
  value: number;
}

interface BookingCallsChartProps {
  data: TimeSeriesPoint[];
}

export default function BookingCallsChart({ data }: BookingCallsChartProps) {
  return (
    <div className="p-6 bg-[#10213A] rounded-xl border border-white/10">
      <h3 className="text-white font-bold text-lg mb-1">Booking Calls Over Time</h3>
      <p className="text-gray-400 text-sm mb-6">Track your daily call volume</p>
      
      {/* Gráfico Simple con CSS puro */}
      <div className="h-64 flex items-end gap-2 px-2">
        {data.map((point, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div 
              className="w-full bg-cyan-500/40 border-t-2 border-cyan-400 rounded-t-sm transition-all group-hover:bg-cyan-500/60" 
              style={{ height: `${(point.value / Math.max(...data.map(d => d.value))) * 100}%` }}
            />
            <span className="text-[10px] text-gray-500 rotate-45 md:rotate-0">
              {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
