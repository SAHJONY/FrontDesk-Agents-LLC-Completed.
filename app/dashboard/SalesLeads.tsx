import { PhoneIcon } from '@heroicons/react/24/outline';

export function SalesLeads({ leads }: { leads: any }) {
  const handleCall = async (phone: string, name: string) => {
    await fetch('/api/sales/call', {
      method: 'POST',
      body: JSON.stringify({ phone, name }),
    });
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
      <h3 className="text-white font-bold mb-4">Sales Leads</h3>
      <div className="space-y-4">
        {leads?.map((lead: any) => (
          <div key={lead.id} className="flex justify-between items-center border-b border-white/5 pb-2">
            <div>
              <p className="text-white text-sm font-medium">{lead.name}</p>
              <p className="text-gray-500 text-xs">{lead.phone}</p>
            </div>
            <button 
              onClick={() => handleCall(lead.phone, lead.name)}
              className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full transition"
            >
              <PhoneIcon className="w-4 h-4 text-cyan-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
