'use client';

export default function GrowthChart({ data }: { data: { name: string, revenue: number }[] }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue), 1);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Growth (MRR)</h3>
      <div className="flex items-end gap-2 h-48">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            {/* The Bar */}
            <div 
              className="w-full bg-indigo-100 group-hover:bg-indigo-500 transition-all rounded-t-md relative"
              style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
            >
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                ${item.revenue}
              </div>
            </div>
            <span className="text-[10px] text-gray-400 font-medium uppercase">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
