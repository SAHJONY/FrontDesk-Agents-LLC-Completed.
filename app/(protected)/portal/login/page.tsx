'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function PortalLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const validateKey = async () => {
      const key = searchParams.get('key');
      if (!key) return;

      const { data, error } = await supabase
        .from('client_invitations')
        .select('*')
        .eq('access_key', key)
        .single();

      if (data) {
        // Set a session cookie or local storage token
        localStorage.setItem('client_access_token', key);
        router.push('/portal');
      }
    };

    validateKey();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#000814] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <SparklesIcon className="w-12 h-12 text-cyan-500 animate-spin" />
        <div className="text-[10px] font-black tracking-[0.5em] text-cyan-500 uppercase italic">Authenticating Secure Link...</div>
      </div>
    </div>
  );
}
