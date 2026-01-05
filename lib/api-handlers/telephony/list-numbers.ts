import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
const jwt = require('jsonwebtoken');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
<<<<<<< HEAD
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });
    const token = authHeader.split(' ')[1];
=======
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'AUTH_REQUIRED' });
    }

    const decoded = verifyJWT(token) as any; if (!decoded) return res.status(401).json({ error: "INVALID_TOKEN" });
    const tenantId = req.query.tenant_id as string || decoded.tenantId;

    // Strict Multi-tenant Isolation
    if (tenantId !== decoded.tenantId) {
      return res.status(403).json({ error: 'TENANT_MISMATCH_SECURITY_BLOCK' });
    }

    // 1. Fetch Primary Number Fleet
    const { data: phoneNumbers, error: phoneError } = await supabase
      .from('phone_numbers')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (phoneError) throw phoneError;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const isoToday = startOfToday.toISOString();

    /**
     * WORKFORCE TELEPHONY FLOW
     * This orchestrates how incoming/outgoing calls are mapped 
     * to the specific AI Voice Nodes in the architecture.
     */
>>>>>>> dee1cb87 (Fix: Resolve all TypeScript and build errors for Vercel deployment)
    
    let decoded: any = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (e) { return res.status(401).json({ error: 'Invalid security token' }); }

    // COMPILER FIX: Explicit Null Guard
    if (!decoded || typeof decoded !== 'object') return res.status(401).json({ error: 'Unauthorized' });

    // OWNER-ONLY CHECK
    if (decoded.email !== 'frontdeskllc@outlook.com') return res.status(403).json({ error: 'Owner access only' });

    const { data, error } = await supabase
      .from('telephony_numbers')
      .select('*')
      .eq('tenant_id', decoded.tenant_id);

    if (error) throw error;
    return res.status(200).json({ numbers: data });
  } catch (error: any) { return res.status(500).json({ error: 'Internal Server Error' }); }
}
