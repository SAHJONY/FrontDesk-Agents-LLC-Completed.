import { NextApiRequest, NextApiResponse } from 'next';

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
	
	    // Gatekeeping: Outbound is reserved for Professional, Growth, and Elite tiers
	    if (decoded.tier === 'basic') {
	      return res.status(403).json({ error: 'Tier Upgrade Required', message: 'Outbound calls require Professional tier or higher.' });
	    }
	
	    // OWNER-ONLY GATE: Verification for frontdeskllc@outlook.com
	    if (decoded.email !== 'frontdeskllc@outlook.com') {
	      return res.status(403).json({ error: 'Sovereign Owner Access Required' });
	    }

    const { phoneNumber } = req.body;
    if (!phoneNumber) return res.status(400).json({ error: 'Target number is required' });

    // Success response for the owner
    return res.status(200).json({ 
      success: true, 
      message: 'Sovereign call session authorized',
      tenantId: decoded.tenant_id
    });

  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to authorize call' });
  }
}
