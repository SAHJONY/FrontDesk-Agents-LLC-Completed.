/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Gateway: Multitenant Authentication & Session Hydration
 */

import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { supabaseServer as supabase } from '@/lib/supabase/client';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  subdomain: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { email, password, subdomain } = loginSchema.parse(req.body);

    // 1. SOVEREIGN MULTITENANT LOOKUP
    // We join the 'tenants' table to fetch the permanent tier and regional config
    const { data: users, error } = await supabase
      .from('users')
      .select(`
        *,
        tenants!inner (
          id, subdomain, tier, status, regional_multiplier, currency_code
        )
      `)
      .eq('email', email.toLowerCase())
      .eq('is_active', true)
      .eq('tenants.subdomain', subdomain || ''); // Enforce subdomain for elite organizational isolation

    if (error || !users?.length) {
      return res.status(401).json({ error: 'INVALID_CREDENTIALS' });
    }

    const user = users[0];
    const tenant = user.tenants;

    // 2. ACCOUNT INTEGRITY CHECK
    if (tenant.status === 'suspended') {
      return res.status(403).json({ error: 'ACCOUNT_SUSPENDED', message: 'Financial settlement required.' });
    }

    // 3. CRYPTOGRAPHIC VERIFICATION
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(401).json({ error: 'INVALID_CREDENTIALS' });

    // 4. SESSION HYDRATION [cite: 2025-12-28]
    // Tokens contain the tier (e.g., 'elite') to drive the 15% success fee logic in middleware
    const token = jwt.sign(
      {
        sub: user.id,
        tenant_id: tenant.id,
        role: user.role,
        tier: tenant.tier, // THE REVENUE TRIGGER
        region: tenant.currency_code
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token,
      profile: {
        name: user.full_name,
        tier: tenant.tier,
        multiplier: tenant.regional_multiplier,
        currency: tenant.currency_code
      }
    });

  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
