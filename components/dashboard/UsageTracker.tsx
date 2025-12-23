'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Activity, Phone, MessageSquare, Mail } from 'lucide-react';

interface UsageStats {
  callMinutes: number;
  smsCount: number;
  emailCount: number;
  chatCount: number;
  plan: string;
  limits: {
    callMinutes: number;
    sms: number;
  };
}

export default function UsageTracker() {
  const supabase = createClient();
  const [stats, setStats] = useState<UsageStats>({
    callMinutes: 0,
    smsCount: 0,
    emailCount: 0,
    chatCount: 0,
    plan: 'starter',
    limits: {
      callMinutes: 1000,
      sms: 500,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsageStats();
  }, []);

  async function fetchUsageStats() {
    try {
      // Fetch current user's usage stats
      const { data: usage } = await supabase
        .from('usage_stats')
        .select('*')
        .single();

      if (usage) {
        setStats({
          callMinutes: usage.call_minutes || 0,
          smsCount: usage.sms_count || 0,
          emailCount: usage.email_count || 0,
          chatCount: usage.chat_count || 0,
          plan: usage.plan || 'starter',
          limits: {
            callMinutes: usage.call_minutes_limit || 1000,
            sms: usage.sms_limit || 500,
          },
        });
      }
    } catch (error) {
      console.error('Error fetching usage stats:', error);
    } finally {
      setLoading(false);
    }
  }

  const callPercentage = (stats.callMinutes / stats.limits.callMinutes) * 100;
  const smsPercentage = (stats.smsCount / stats.limits.sms) * 100;

  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-white/10 rounded w-1/2 mb-4"></div>
          <div className="h-20 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-5 h-5 text-cyan-500" />
        <h3 className="text-sm font-black uppercase tracking-widest text-white">
          Usage This Month
        </h3>
      </div>

      <div className="space-y-6">
        {/* Call Minutes */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-bold text-slate-400">Call Minutes</span>
            </div>
            <span className="text-xs font-black text-white">
              {stats.callMinutes} / {stats.limits.callMinutes}
            </span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                callPercentage >= 90
                  ? 'bg-red-500'
                  : callPercentage >= 75
                  ? 'bg-amber-500'
                  : 'bg-cyan-500'
              }`}
              style={{ width: `${Math.min(callPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* SMS Count */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-400">SMS Messages</span>
            </div>
            <span className="text-xs font-black text-white">
              {stats.smsCount} / {stats.limits.sms === -1 ? '∞' : stats.limits.sms}
            </span>
          </div>
          {stats.limits.sms !== -1 && (
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  smsPercentage >= 90
                    ? 'bg-red-500'
                    : smsPercentage >= 75
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(smsPercentage, 100)}%` }}
              />
            </div>
          )}
        </div>

        {/* Email Count */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-bold text-slate-400">Emails Sent</span>
            </div>
            <span className="text-xs font-black text-white">{stats.emailCount}</span>
          </div>
        </div>

        {/* Plan Badge */}
        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Current Plan
            </span>
            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 rounded-lg text-xs font-black uppercase">
              {stats.plan}
            </span>
          </div>
        </div>

        {/* Upgrade Warning */}
        {(callPercentage >= 80 || smsPercentage >= 80) && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <p className="text-xs text-amber-500 font-bold">
              ⚠️ You're approaching your usage limits. Consider upgrading your plan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Named export for compatibility
export { UsageTracker };
