import { headers } from 'next/headers';
import GlobalRevenueStats from '@/components/admin/GlobalRevenueStats';

export default async function AdminAnalyticsPage() {
  const headerList = await headers();
  const adminCountry = headerList.get('x-user-country') || 'US';
  const adminRegion = headerList.get('x-user-region') || 'WESTERN';

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Global Command Center</h1>
          <p className="text-neutral-500 mt-1">Real-time performance across 50+ localized markets.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Admin Access Point</p>
          <p className="text-sm font-medium text-blue-600">{adminCountry} ({adminRegion} Node)</p>
        </div>
      </div>

      <GlobalRevenueStats />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Market Penetration Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-100 p-8">
          <h3 className="font-bold text-lg mb-6">Top Performing Regions</h3>
          <div className="space-y-6">
            {[
              { country: "United States", users: "450", rev: "$22,500", growth: "up" },
              { country: "Vietnam", users: "320", rev: "$4,800", growth: "up" },
              { country: "Turkey", users: "180", rev: "$3,200", growth: "steady" },
              { country: "India", users: "510", rev: "$6,100", growth: "up" }
            ].map((item) => (
              <div key={item.country} className="flex items-center justify-between border-b border-neutral-50 pb-4">
                <span className="font-medium text-neutral-700">{item.country}</span>
                <div className="flex gap-12 text-sm">
                  <span className="text-neutral-500">{item.users} Clinics</span>
                  <span className="font-bold text-neutral-900">{item.rev}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language Distribution */}
        <div className="bg-neutral-900 rounded-3xl p-8 text-white">
          <h3 className="font-bold text-lg mb-6">Active AI Languages</h3>
          <div className="space-y-4">
            {['English', 'Spanish', 'Vietnamese', 'Arabic', 'Hindi'].map((lang, i) => (
              <div key={lang} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{lang}</span>
                  <span className="opacity-50">{100 - (i * 15)}%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: `${100 - (i * 15)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
