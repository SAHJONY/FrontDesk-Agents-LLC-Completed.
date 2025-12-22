'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function CheckoutSuccessPage() {
  const [status, setStatus] = useState<'loading' | 'active' | 'error'>('loading');
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const verifyActivation = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Poll the database to see when the Webhook has finished the upgrade
      const { data, error } = await supabase
        .from('BusinessConfig')
        .select('status, planType')
        .eq('user_id', user.id)
        .single();

      if (data?.status === 'active') {
        setStatus('active');
      } else {
        // Retry logic: Webhooks can take a few seconds
        setTimeout(verifyActivation, 2000);
      }
    };

    verifyActivation();
  }, [supabase]);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mb-4"></div>
        <p className="text-lg font-mono">AI CEO is provisioning your workspace...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-center">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        System Activated.
      </h1>
      <p className="text-xl text-gray-400 mb-12">
        Your AI workforce is now standing by. The Guardian and Medic protocols are live.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
          <h3 className="text-blue-400 font-bold mb-2">Next Step</h3>
          <p className="text-sm text-gray-500">Configure your First Agent to start handling calls and leads.</p>
        </div>
        <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
          <h3 className="text-emerald-400 font-bold mb-2">Security Note</h3>
          <p className="text-sm text-gray-500">The Guardian has established a secure tunnel for your data.</p>
        </div>
      </div>

      <button 
        onClick={() => router.push('/dashboard')}
        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
      >
        Enter Command Center
      </button>
    </div>
  );
}
