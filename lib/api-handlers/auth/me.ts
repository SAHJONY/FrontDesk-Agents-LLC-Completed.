/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * API: Session Hydration & Tier Verification
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabase-client'; // Using the updated singleton
import { verifyJWT } from '@/lib/auth/jwt-verify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'AUTH_REQUIRED' });
    }

    const decoded = verifyJWT(token);

    // Fetch user with expanded tenant context for Global Market readiness
    const { data: user, error } = await supabaseServer
      .from('users')
      .select(`
        id,
        email,
        full_name,
        role,
        tenant_id,
        tenants (
          id,
          company_name,
          subdomain,
          tier,
          status,
          regional_multiplier,
          country_code,
          currency_code
        )
      `)
      .eq('id', decoded.sub)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'USER_NOT_FOUND' });
    }

    // Handle Supabase join result (object vs array)
    const tenant: any = Array.isArray(user.tenants) ? user.tenants[0] : user.tenants;

    /**
     * AUTHENTICATION FLOW
     * Decodes the JWT, verifies against the Hub database, 
     * and maps the organizational tier for feature-gatekeeping.
     */
    

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        tier: tenant.tier, // Explicitly exposed for Elite-gatekeeping
        tenant: {
          id: tenant.id,
          companyName: tenant.company_name,
          subdomain: tenant.subdomain,
          tier: tenant.tier,
          status: tenant.status,
          regionalMultiplier: tenant.regional_multiplier,
          countryCode: tenant.country_code,
          currencyCode: tenant.currency_code,
        },
      },
      meta: {
        platform_version: '2.2.0',
        region: 'pdx1-edge',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('[AUTH] Identity retrieval failed:', error);
    return res.status(401).json({ error: 'INVALID_OR_EXPIRED_TOKEN' });
  }
}
