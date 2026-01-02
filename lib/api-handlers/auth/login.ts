// @ts-ignore
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { supabaseServer as supabase } from '@/lib/supabase/client';

interface UserProfile {
  id: string;
  email: string;
  password_hash: string;
  plan: 'Basic' | 'Professional' | 'Growth' | 'Elite';
  industry: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, password_hash, plan, industry')
      .eq('email', email)
      .single();

    const userData = user as UserProfile | null;

    if (error || !userData) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, userData.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: userData.id, plan: userData.plan, industry: userData.industry },
      process.env.JWT_SECRET!,
      { expiresIn: '8h' }
    );

    return res.status(200).json({ 
      token, 
      plan: userData.plan,
      platform: "FrontDesk Agents"
    });
  } catch (err) {
    return res.status(400).json({ error: 'Authentication failed' });
  }
}
