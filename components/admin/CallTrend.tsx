'use client';

export default function CallTrend({ data }: { data: any[] }) {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl text-white">
      <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Weekly Call Volume</h3>
      <div className="flex items-end justify-between h-32 gap-1">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-indigo-500 rounded-sm opacity-80 hover:opacity-100 transition-opacity" 
              style={{ height: `${d.calls}%` }}
            ></div>
            <span className="text-[10px] text-gray-500">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
