'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'OWNER' | 'admin' | 'user';
  redirectTo?: string;
}

export const AuthGuard = ({ 
  children, 
  requiredRole,
  redirectTo = '/login' 
}: AuthGuardProps) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        router.push(redirectTo);
        return;
      }

      // Parse user data
      const user = JSON.parse(userData);

      // Check role if required
      if (requiredRole) {
        if (user.role !== requiredRole) {
          // Redirect based on actual role
          if (user.role === 'OWNER') {
            router.push('/dashboard/owner');
          } else if (user.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/dashboard');
          }
          return;
        }
      }

      // Verify token with server
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        // Token invalid, clear and redirect
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push(redirectTo);
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push(redirectTo);
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
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

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

// Hook for checking auth status
export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return { user, loading, logout };
};
