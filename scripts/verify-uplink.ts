import { supabase } from '../lib/supabase/client';
import OpenAI from 'openai';
import twilio from 'twilio';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function runDiagnostics() {
  console.log('🚀 Initializing Neural Uplink Diagnostics...\n');

  // 1. Test Supabase Connection
  const { data: _data, error: sbError } = await supabase.from('leads').select('count').single();
  console.log(sbError ? '❌ Supabase: Connection Failed' : '✅ Supabase: Connection Active');

  // 2. Test OpenAI Latency
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const start = Date.now();
  try {
    await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "ping" }],
    });
    console.log(`✅ OpenAI: Responsive (${Date.now() - start}ms)`);
  } catch (e) {
    console.log('❌ OpenAI: API Key Invalid or Quota Exceeded');
  }

  // 3. Test Twilio Configuration
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  try {
    await client.api.v2010.account.fetch();
    console.log('✅ Twilio: Credentials Verified');
  } catch (e) {
    console.log('❌ Twilio: SID/Auth Token Rejected');
  }

  console.log('\n--- Status: Ready for Portland (pdx1) Deployment ---');
}

runDiagnostics();
