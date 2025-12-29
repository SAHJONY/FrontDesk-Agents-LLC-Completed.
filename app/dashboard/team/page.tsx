'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Dashboard: Team Management (Professional $399+ Tier Access)
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Plus, Mail, Shield, Edit, Trash2, Users, Crown, UserCog, AlertCircle } from 'lucide-react';

interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  role: 'owner' | 'admin' | 'manager' | 'user';
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

export default function TeamPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    if (!user) return;
    // Restrict access based on Permanent Tiers
    if (!['professional', 'growth', 'elite'].includes(user.tier)) {
      router.push('/dashboard');
      return;
    }
    fetchTeamMembers();
  }, [user, router]);

  async function fetchTeamMembers() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/team/list?tenant_id=${user?.tenant_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMembers(data.members || []);
      }
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    } finally {
      setLoading(false);
    }
  }

  const getTierLimit = () => {
    const limits: Record<string, number> = { professional: 5, growth: 20, elite: 999 };
    return limits[user?.tier || 'professional'];
  };

  const canAddMore = members.length < getTierLimit();

  if (!user || !['professional', 'growth', 'elite'].includes(user.tier)) return null;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase">Workforce Command</h1>
            <p className="text-blue-500 font-mono text-[10px] tracking-widest uppercase mt-1">
              Active Seats: {members.length} / {getTierLimit()}
            </p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            disabled={!canAddMore}
            className="flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all disabled:opacity-30"
          >
            <Plus className="w-4 h-4" />
            <span>Invite Personnel</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Personnel', val: members.length, icon: <Users />, color: 'text-white' },
            { label: 'Active Nodes', val: members.filter(m => m.isActive).length, icon: <Shield />, color: 'text-green-500' },
            { label: 'Available Seats', val: getTierLimit() - members.length, icon: <UserCog />, color: 'text-blue-500' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-zinc-800 bg-zinc-950/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className={`text-3xl font-black ${stat.color}`}>{stat.val}</p>
                </div>
                <div className="p-3 bg-zinc-900 rounded-xl text-zinc-400">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Members List */}
        <div className="glass-panel rounded-3xl border border-zinc-800 overflow-hidden bg-zinc-950/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Personnel</th>
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Access Role</th>
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Last Activity</th>
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs uppercase shadow-lg shadow-blue-500/20">
                          {member.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{member.fullName}</p>
                          <p className="text-[10px] text-zinc-500 font-mono">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-tighter text-blue-400">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[10px] text-zinc-500 font-mono">
                      {member.lastLogin ? new Date(member.lastLogin).toLocaleDateString() : 'NO_LOG_DATA'}
                    </td>
                    <td className="px-6 py-4">
                      {member.role !== 'owner' && (
                        <button className="p-2 text-zinc-600 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} onSuccess={() => { setShowInviteModal(false); fetchTeamMembers(); }} />
      )}
    </div>
  );
}

// Minimalist Invite Modal with Elite styling
function InviteModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-md w-full p-8">
        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter">Authorize Personnel</h2>
        <div className="space-y-4">
          <input className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" placeholder="Full Name" />
          <input className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" placeholder="Email Address" />
          <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none">
            <option value="user">User (Fleet Monitor)</option>
            <option value="manager">Manager (Fleet Architect)</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        <div className="flex gap-4 mt-8">
          <button onClick={onClose} className="flex-1 py-3 text-zinc-500 text-xs font-bold uppercase">Abort</button>
          <button onClick={onSuccess} className="flex-1 bg-white text-black py-3 rounded-xl text-xs font-black uppercase tracking-widest">Send Invite</button>
        </div>
      </div>
    </div>
  );
        }
