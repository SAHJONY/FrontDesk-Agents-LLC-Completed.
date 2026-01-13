import { NextApiRequest, NextApiResponse } from 'next';
import { verifyJWT } from '@/lib/auth/jwt-verify';
import { LEGAL_WORKFORCE_CONFIG } from '@/lib/agents/legal-workforce-prompt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = (await verifyJWT(token)) as any;

    // Gate de Seguridad de FrontDesk Agents: Industrias Excluidas
    const restricted = ['Military', 'Political', 'Medical-Decision'];
    if (restricted.includes(decoded.industry)) {
      return res.status(403).json({ error: 'Industry restricted by FrontDesk Agents safety policy' });
    }

    return res.status(200).json({
      status: 'completed',
      agentRole: LEGAL_WORKFORCE_CONFIG.role,
      timestamp: new Date().toISOString(),
      platform: "FrontDesk Agents GIB"
    });
  } catch (err) {
    return res.status(500).json({ error: 'Analysis failed' });
  }
}
