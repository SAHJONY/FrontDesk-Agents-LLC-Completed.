'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'OWNER' | 'ADMIN' | 'USER';
  redirectTo?: string;
}

export const AuthGuard = ({ 
  children, 
  requiredRole,
  redirectTo = '/login' 
}: AuthGuardProps) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        // Redirect based on actual role if not authorized for the required role
        if (user.role === 'ADMIN') {
          router.push('/admin/tenants');
        } else if (user.role === 'OWNER') {
          router.push('/owner');
        } else {
          router.push('/dashboard');
        }
      }
    }
  }, [user, loading, requiredRole, redirectTo, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400 font-mono uppercase tracking-widest text-sm">
            Verifying Access...
          </p>
        </div>
      </div>
    );
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
};
