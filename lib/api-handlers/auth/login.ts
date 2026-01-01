// @ts-ignore: This module is provided at runtime but lacks dev-time type declarations
import jwt from 'jsonwebtoken'; 
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { supabaseServer as supabase } from '@/lib/supabase/client';

/**
 * FRONTDESK AGENTS: AUTHENTICATION HANDLER
 * Node: pdx1 Deployment
 * Tier Protection: $199 - $1,499
 */
