/**
 * FRONTDESK AGENTS - GLOBAL TYPE DEFINITIONS
 * Sovereign Type System for Multi-Tenant Platform
 */

// ============================================
// REGIONAL PRICING & MULTIPLIERS
// ============================================

export const REGIONAL_MULTIPLIERS = {
  US: 1.0,
  EU: 1.15,
  APAC: 1.25,
  LATAM: 1.10,
  MEA: 1.20,
  AFRICA: 1.18,
  OCEANIA: 1.22,
} as const;

export type Region = keyof typeof REGIONAL_MULTIPLIERS;

export interface RegionalPricing {
  region: Region;
  multiplier: number;
  currency: string;
}

// ============================================
// BILLING & SUBSCRIPTION TYPES
// ============================================

export type SubscriptionTier = 'Basic' | 'Professional' | 'Growth' | 'Elite';

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  basePrice: number;
  features: string[];
  callLimit: number;
  agentCount: number;
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  Basic: {
    tier: 'Basic',
    basePrice: 199,
    features: ['Basic AI', '100 calls/month', 'Email support'],
    callLimit: 100,
    agentCount: 1,
  },
  Professional: {
    tier: 'Professional',
    basePrice: 399,
    features: ['Advanced AI', '500 calls/month', 'Priority support'],
    callLimit: 500,
    agentCount: 3,
  },
  Growth: {
    tier: 'Growth',
    basePrice: 799,
    features: ['Elite AI', '2000 calls/month', 'Dedicated support'],
    callLimit: 2000,
    agentCount: 10,
  },
  Elite: {
    tier: 'Elite',
    basePrice: 1499,
    features: ['Full AI Suite', 'Unlimited calls', '24/7 support'],
    callLimit: -1, // unlimited
    agentCount: -1, // unlimited
  },
};

export interface BillingRecord {
  id: string;
  tenant_id: string;
  amount: number;
  region: Region;
  tier: SubscriptionTier;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

// ============================================
// USER & TENANT TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'owner' | 'admin' | 'agent' | 'viewer';
  tenant_id: string;
  created_at: string;
  updated_at: string;
}

export interface Tenant {
  id: string;
  name: string;
  tier: SubscriptionTier;
  region: Region;
  status: 'active' | 'suspended' | 'trial';
  created_at: string;
  updated_at: string;
}

// ============================================
// JWT & AUTH TYPES
// ============================================

export interface JWTPayload {
  user_id: string;
  tenant_id: string;
  role: string;
  email: string;
  exp?: number;
  iat?: number;
}

export interface AuthContext {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============================================
// CALL LOG TYPES
// ============================================

export interface CallLog {
  id: string;
  tenant_id: string;
  phone_number: string;
  duration: number;
  status: 'completed' | 'failed' | 'in_progress' | 'scheduled';
  direction: 'inbound' | 'outbound';
  agent_id?: string;
  recording_url?: string;
  transcript?: string;
  created_at: string;
  updated_at: string;
}

export interface CallMetrics {
  total_calls: number;
  successful_calls: number;
  failed_calls: number;
  total_duration: number;
  average_duration: number;
  recovery_rate: number;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================
// DASHBOARD TYPES
// ============================================

export interface DashboardStats {
  calls_today: number;
  calls_this_month: number;
  recovery_yield: number;
  active_agents: number;
  revenue_this_month: number;
}

export interface NodeStatus {
  region: string;
  status: 'active' | 'degraded' | 'offline';
  latency: number;
  uptime: number;
  last_check: string;
}

// ============================================
// AUDIT LOG TYPES
// ============================================

export interface AuditLog {
  id: string;
  tenant_id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// ============================================
// VAULT/SECRETS TYPES
// ============================================

export interface Secret {
  id: string;
  tenant_id: string;
  key: string;
  value: string; // encrypted
  description?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface VaultEntry {
  name: string;
  value: string;
  masked?: boolean;
}
