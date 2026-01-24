"use client";

export type AppUser = {
  id?: string;
  email?: string;
  name?: string;
};

export type AppProfile = {
  role?: "SUPER_ADMIN" | "ADMIN" | "USER" | string;
};

export function useUser(): {
  user: AppUser | null;
  profile: AppProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
} {
  /**
   * Placeholder implementation to unblock builds.
   * Replace this with your real auth provider (Supabase/Auth0/Clerk) + profile lookup.
   */
  return {
    user: null,
    profile: null,
    loading: false,
    isAuthenticated: false,
  };
}
