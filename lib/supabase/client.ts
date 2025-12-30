/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Supabase Client & Database Schema (LFAW v2.2)
 */

import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// 1. Server-side client (for API routes/PDX1 Node processing)
export const supabaseServer = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// 2. Client-side client (for Dashboard/Elite UI)
export const supabaseClient = createClientComponentClient<Database>({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});

// 3. Central Singleton Export (resolves build path issues)
export const supabase = supabaseClient;

export type Database = {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          company_name: string;
          subdomain: string;
          tier: 'basic' | 'professional' | 'growth' | 'elite';
          status: 'active' | 'suspended' | 'cancelled' | 'trial';
          regional_multiplier: number;
          country_code: string;
          currency_code: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tenants']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['tenants']['Insert']>;
      };
      // ... [Existing Users & Phone Numbers Tables Stay the Same]
      legal_merits_analysis: {
        Row: {
          id: string;
          tenant_id: string;
          case_id: string;
          accuracy_score: number;
          jurisdiction: string;
          merits_summary: string;
          governance_version: string; // e.g., "v2.2"
          rl_feedback_loop: any; // Stores RL weight updates
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['legal_merits_analysis']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['legal_merits_analysis']['Insert']>;
      };
      authority_citations: {
        Row: {
          id: string;
          analysis_id: string;
          proposition: string;
          citation_text: string;
          pincite: string;
          is_binding: boolean;
          verification_status: 'verified' | 'unverified' | 'adverse';
          official_source_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['authority_citations']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['authority_citations']['Insert']>;
      };
      revenue_events: {
        Row: {
          id: string;
          tenant_id: string;
          event_type: 'recovered_revenue' | 'new_sale' | 'upsell' | 'retention' | 'legal_recovery';
          recovered_amount: number;
          currency_code: string;
          success_fee_percentage: number;
          success_fee_amount: number;
          stripe_invoice_id: string | null;
          payment_status: 'pending' | 'paid' | 'failed' | 'disputed';
          source_call_id: string | null;
          recorded_at: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['revenue_events']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['revenue_events']['Insert']>;
      };
    };
  };
};
