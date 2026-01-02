import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';

// Use direct require for PDX1 environment compatibility
const jwt = require('jsonwebtoken');

/**
 * @name makeCall
 * @description Initiates an outbound agentic call for the owner
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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

    // COMPILER FIX: Explicit Guard against null
    if (!decoded || typeof decoded !== 'object') {
      return res.status(401).json({ error: 'Unauthorized: Identity required' });
    }

    // OWNER-ONLY GATE: Verification for frontdeskllc@outlook.com
    if (decoded.email !== 'frontdeskllc@outlook.com') {
      return res.status(403).json({ error: 'Sovereign Owner Access Required' });
    }

    // Now safe to access properties
    const tenantId = decoded.tenant_id;
    const { phoneNumber, scriptId, leadId } = req.body;

    if (!phoneNumber || !tenantId) {
      return res.status(400).json({ error: 'Target number and Tenant ID are required' });
    }

    // Logic for initiating the outbound call goes here
    // Example: Triggering the AI Voice Agent via Supabase or external provider
    
    return res.status(200).json({ 
      success: true, 
      message: 'Outbound call initiated',
      tenantId: tenantId
    });

  } catch (error: any) {
    console.error('[Telephony Error]:', error.message);
    return res.status(500).json({ error: 'Failed to initiate call' });
  }
}
