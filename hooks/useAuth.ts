'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Hook: Identity Bridge
 * Purpose: Centralized access to the Sovereign Global Financial Hub Auth State
 */

import { useAuth } from '@/context/AuthContext';

// Standardized re-export to maintain path cleanliness in components
export { useAuth };

/**
 * HOOK CONSUMPTION PATTERN:
 * const { user, tier, login, logout, loading } = useAuth();
 * * Logic ensures that 'user.tenant.tier' is available for 
 * dynamic pricing and feature availability logic.
 */
