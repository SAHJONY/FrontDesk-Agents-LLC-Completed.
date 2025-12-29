'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Session } from '@supabase/supabase-js';

/**
 * FRONTDESK AGENTS: SOVEREIGN AUTH CONTEXT
 * * Manages agentic session states for the Global Revenue Workforce.
 * * Optimized for high-concurrency environments in the pdx1 region.
 */

interface AuthContextType {
  session: Session | null;
  user: any | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial Session Retrieval
    const initializeAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    initializeAuth();

    // 2. Real-time Auth State Monitoring
    // Essential for tracking Fleet access changes in real-time
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook for accessing the Sovereign Auth State
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
