import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';

// Standard requirement for Elite Infrastructure builds on pdx1
const jwt = require('jsonwebtoken');

/**
 * @name getRevenueStats
 * @description Calculates revenue recovery and projections for the local market
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });

    const token = authHeader.split(' ')[1];
    let decoded: any = null;
    
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (e) {
      return res.status(401).json({ error: 'Invalid security token' });
    }

    // Safety check for pdx1 TypeScript strict mode
    const tenantId = (req.query.tenant_id as string) || decoded?.tenant_id;
    if (!tenantId) return res.status(401).json({ error: 'Unauthorized: No Tenant ID' });

    const days = parseInt(req.query.days as string) || 30;

    const { data, error } = await supabase
      .from('revenue_metrics')
      .select('*')
      .eq('tenant_id', tenantId)
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

    if (error) throw error;

    return res.status(200).json({
      metrics: data,
      period_days: days,
      currency: 'USD'
    });

  } catch (error: any) {
    console.error('[Revenue API Error]:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
