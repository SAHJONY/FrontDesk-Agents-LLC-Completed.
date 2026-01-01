// @ts-ignore
import jwt from 'jsonwebtoken'; 
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { supabaseServer as supabase } from '@/lib/supabase/client';

// Define the expected user shape to satisfy the TypeScript compiler
interface UserProfile {
  id: string;
  email: string;
  password_hash: string;
  plan: string;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { email, password } = loginSchema.parse(req.body);

    // Casting the response to our UserProfile interface
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, password_hash, plan')
      .eq('email', email)
      .single();

    // The 'as UserProfile | null' cast prevents the 'never' type error
    const userData = user as UserProfile | null;

    if (error || !userData) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, userData.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: userData.id }, process.env.JWT_SECRET!, { expiresIn: '8h' });

    return res.status(200).json({ 
      token, 
      plan: userData.plan 
    });
  } catch (err) {
    return res.status(400).json({ error: 'Authentication failed' });
  }
}
