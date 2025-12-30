import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, tenant_id } = req.body;
  const rawKey = `fd_${crypto.randomBytes(24).toString('hex')}`;
  const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

  const { error } = await supabase.from('api_keys').insert([{
    tenant_id,
    name,
    key_prefix: rawKey.substring(0, 8),
    key_hash: keyHash,
    is_active: true
  }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json({ apiKey: rawKey, warning: 'Store this safely. It will not be shown again.' });
}
