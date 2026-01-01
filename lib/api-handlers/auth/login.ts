// @ts-ignore
import jwt from 'jsonwebtoken'; 
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { supabaseServer as supabase } from '@/lib/supabase/client';

// Schema validation ensures reliable data entry
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { email, password } = loginSchema.parse(req.body);

    // Verify user via Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) return res.status(401).json({ error: 'Invalid credentials' });

    // bcrypt use satisfies the linter
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    // jwt use satisfies the linter
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '8h' });

    return res.status(200).json({ token, plan: user.plan });
  } catch (err) {
    return res.status(400).json({ error: 'Authentication failed' });
  }
}
