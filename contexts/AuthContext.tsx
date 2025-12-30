'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Intelligence Core: Authentication & Session State
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'owner' | 'admin' | 'manager' | 'user';
  tenant: {
    id: string;
    companyName: string;
    subdomain: string;
    tier: 'basic' | 'professional' | 'growth' | 'elite';
    status: string;
    regionalMultiplier: number;
    countryCode: string;
    currencyCode: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, subdomain?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Session Persistence Logic (Synchronizes with PDX1 Edge)
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        localStorage.clear(); // Total clear for security hygiene
      }
    } catch (error) {
      console.error('[AUTH] Critical identity check failure:', error);
    } finally {
      setLoading(false);
    }
  }

  // 2. Authorization Flow
  async function login(email: string, password: string, subdomain?: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, subdomain }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Identity Verification Failed');
    }

    const data = await response.json();
    
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    setUser(data.user);
    router.push('/dashboard');
  }

  // 3. Security Decommissioning
  async function logout() {
    localStorage.clear();
    setUser(null);
    router.push('/login');
  }

  async function refreshUser() {
    await checkAuth();
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
