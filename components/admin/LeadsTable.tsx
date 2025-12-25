'use client';

import React, { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { 
  PhoneIcon, 
  UserCircleIcon, 
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  status: string;
  created_at: string;
}

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create Supabase client for browser
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchLeads() {
      // Supabase automatically filters by user_id thanks to your RLS
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setLeads(data);
      setLoading(false);
    }
    fetchLeads();
  }, [supabase]);

  const filteredLeads = leads.filter(lead => 
    `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone_number.includes(searchTerm)
  );

  if (loading) return <div className="p-8 text-center text-slate-500">Loading leads...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Table Header & Search */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="font-bold text-slate-800">Lead Directory</h2>
        <div className="relative">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search leads..."
            className="pl-9 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Contact</th>
              <th className="px-6 py-4 font-semibold">Phone</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-cyan-100 p-2 rounded-full">
                      <UserCircleIcon className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{lead.first_name} {lead.last_name}</div>
                      <div className="text-xs text-slate-500">Added {new Date(lead.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                  {lead.phone_number}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    lead.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                    <PhoneIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLeads.length === 0 && (
          <div className="p-12 text-center text-slate-400 text-sm italic">
            No leads found. Use the uploader to add contacts.
          </div>
        )}
      </div>
    </div>
  );
}
