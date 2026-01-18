'use client';

export default function PerformanceTable({ data }: { data: any[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-bold text-gray-900">Top Performing Tenants</h3>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-500 font-medium">
          <tr>
            <th className="px-6 py-3">Tenant</th>
            <th className="px-6 py-3 text-center">Agents</th>
            <th className="px-6 py-3 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item, i) => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
              <td className="px-6 py-4 text-center text-gray-600">{item.agents}</td>
              <td className="px-6 py-4 text-right">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                  item.health === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {item.health}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
