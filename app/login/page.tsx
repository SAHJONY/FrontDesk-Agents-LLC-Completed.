'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase-client';
import { Card, Title, Text } from '@tremor/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#000814] flex items-center justify-center p-6">
      <Card className="max-w-md bg-slate-900 border-slate-800">
        <div className="text-center mb-8">
          <Title className="text-white text-2xl font-bold">FrontDesk Agents</Title>
          <Text className="text-slate-400">Ingresa a tu panel de control</Text>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google']}
          redirectTo={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`}
        />
      </Card>
    </div>
  );
}
