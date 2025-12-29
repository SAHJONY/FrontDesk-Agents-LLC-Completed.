// FrontDesk Agents: Global Revenue Workforce
// Supabase Client Initialization

import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Server-side client (for API routes and server components)
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Client-side client (for browser/React components)
export const supabaseClient = createClientComponentClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});

// Type-safe database types
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
      users: {
        Row: {
          id: string;
          tenant_id: string;
          email: string;
          password_hash: string;
          full_name: string;
          role: 'owner' | 'admin' | 'manager' | 'user';
          is_active: boolean;
          last_login: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      phone_numbers: {
        Row: {
          id: string;
          tenant_id: string;
          twilio_sid: string;
          phone_number: string;
          country_code: string;
          capabilities: any;
          status: 'active' | 'released' | 'suspended';
          assigned_node_type: 'receptionist' | 'qualification' | 'scaling' | 'priority' | null;
          provisioned_at: string;
          created_at: string;
          metadata: any;
        };
        Insert: Omit<Database['public']['Tables']['phone_numbers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['phone_numbers']['Insert']>;
      };
      call_logs: {
        Row: {
          id: string;
          tenant_id: string;
          phone_number_id: string | null;
          twilio_call_sid: string;
          from_number: string;
          to_number: string;
          direction: 'inbound' | 'outbound';
          status: string;
          duration_seconds: number | null;
          recording_url: string | null;
          transcription: string | null;
          ai_node_type: string | null;
          lead_qualified: boolean;
          metadata: any;
          started_at: string | null;
          ended_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['call_logs']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['call_logs']['Insert']>;
      };
      revenue_events: {
        Row: {
          id: string;
          tenant_id: string;
          event_type: 'recovered_revenue' | 'new_sale' | 'upsell' | 'retention';
          recovered_amount: number;
          currency_code: string;
          success_fee_percentage: number;
          success_fee_amount: number;
          stripe_invoice_id: string | null;
          payment_status: 'pending' | 'paid' | 'failed' | 'disputed';
          source_call_id: string | null;
          client_reference: string | null;
          notes: string | null;
          recorded_at: string;
          paid_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['revenue_events']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['revenue_events']['Insert']>;
      };
    };
  };
};

// Export typed client
export const supabase = supabaseClient as ReturnType<typeof createClientComponentClient<Database>>;
