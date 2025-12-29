import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { getRegionalPricing } from '@/lib/pricing/regional-multiplier';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Production Signup Engine - App Router Version
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Use Service Key for bypass RLS on signup
);

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
  companyName: z.string().min(2, 'Company name required'),
  subdomain: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Lowercase/hyphens only'),
  countryCode: z.string().length(2),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = signupSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.issues }, { status: 400 });
    }

    const { fullName, email, password, companyName, subdomain, countryCode } = validation.data;

    // 1. Availability Checks
    const { data: existingUser } = await supabase.from('users').select('id').eq('email', email.toLowerCase()).single();
    if (existingUser) return NextResponse.json({ error: 'Email already registered' }, { status: 400 });

    const { data: existingTenant } = await supabase.from('tenants').select('id').eq('subdomain', subdomain.toLowerCase()).single();
    if (existingTenant) return NextResponse.json({ error: 'Subdomain taken' }, { status: 400 });

    // 2. Global Mandate: Apply Regional Multiplier
    const pricing = getRegionalPricing(countryCode);
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Create Tenant (Fleet Hub)
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        company_name: companyName,
        subdomain: subdomain.toLowerCase(),
        tier: 'basic',
        status: 'trial',
        regional_multiplier: pricing.multiplier,
        country_code: countryCode,
        currency_code: pricing.currencyCode,
      })
      .select().single();

    if (tenantError || !tenant) throw new Error(`Tenant creation failed: ${tenantError?.message}`);

    // 4. Create Owner User
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        tenant_id: tenant.id,
        email: email.toLowerCase(),
        password_hash: passwordHash,
        full_name: fullName,
        role: 'owner',
        is_active: true,
      })
      .select().single();

    if (userError || !user) {
      await supabase.from('tenants').delete().eq('id', tenant.id); // Rollback
      throw new Error(`User creation failed: ${userError?.message}`);
    }

    // 5. Initialize Permanent Pricing Subscription ($199 Basic)
    await supabase.from('subscriptions').insert({
      tenant_id: tenant.id,
      tier: 'basic',
      base_price_usd: 199, // Permanent price [cite: 2025-12-28]
      regional_price: 199 * pricing.multiplier,
      currency_code: pricing.currencyCode,
      status: 'trialing',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    });

    return NextResponse.json({
      success: true,
      tenant: { id: tenant.id, subdomain: tenant.subdomain },
      user: { id: user.id, email: user.email }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Registration failed', message: error.message }, { status: 500 });
  }
                             }
