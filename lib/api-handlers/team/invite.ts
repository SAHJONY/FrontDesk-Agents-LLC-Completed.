/**
 * FRONTDESK AGENTS — TEAM INVITATION
 * Node: pdx1 Deployment
 * Strategy: Secure Tenant Onboarding
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer as supabase } from '@/lib/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, role, tenant_id } = req.body;

  try {
    // We capture 'data' and return it in the response to satisfy TypeScript
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { role, tenant_id },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/setup-password`
    });

    if (error) throw error;

    return res.status(200).json({ 
      message: 'Invitation sent successfully', 
      invitation: data.user // Using 'data' here clears the build error
    });
  } catch (err) {
    console.error('Invite Error:', err);
    return res.status(500).json({ error: 'Failed to send team invitation' });
  }
}

