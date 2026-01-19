'use client';

export default function CallTrend({ data }: { data: any[] }) {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl text-white shadow-xl">
      <h3 className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">Weekly Activity</h3>
      <div className="flex items-end justify-between h-24 gap-2">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-indigo-500 rounded-t-sm opacity-80 hover:opacity-100 transition-all" 
              style={{ height: `${(d.calls / 100) * 100}%`, minHeight: '4px' }}
            ></div>
            <span className="text-[8px] text-gray-500 font-bold">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
