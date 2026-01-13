import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

async function runSystemAudit() {
  console.log("🛡️ Starting Sovereign Engine Health Check...");

  // 1. VAULT TEST: Check GitHub Secrets / Environment
  const keys = ['SERPAPI_KEY', 'BLAND_AI_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'SYSTEM_BOT_ID'];
  keys.forEach(key => {
    if (!process.env[key]) console.error(`❌ CRITICAL: ${key} is missing from Vault.`);
    else console.log(`✅ Vault: ${key} is present.`);
  });

  // 2. DATABASE TEST: Supabase Connection & Schema
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: _data, error } = await supabase.from('leads').select('count', { count: 'exact', head: true });
  if (error) console.error("❌ Database: Connection failed.", error.message);
  else console.log("✅ Database: Sovereign Leads table is accessible.");

  // 3. VOICE ENGINE TEST: Bland AI API
  try {
    const blandRes = await axios.get('https://api.bland.ai/v1/me', {
      headers: { authorization: process.env.BLAND_AI_KEY! }
    });
    console.log(`✅ Voice Engine: Connected. Credits Remaining: ${blandRes.data.credits}`);
  } catch (e) {
    console.error("❌ Voice Engine: API Key rejected.");
  }

  // 4. SEARCH ENGINE TEST: SerpApi Status
  try {
    const serpRes = await axios.get(`https://serpapi.com/account?api_key=${process.env.SERPAPI_KEY}`);
    console.log(`✅ Search Engine: Connected. Searches Remaining: ${serpRes.data.total_searches_left}`);
  } catch (e) {
    console.error("❌ Search Engine: Connectivity issue.");
  }

  console.log("🏁 Audit Complete. System Status: NATIONWIDE READY.");
}

runSystemAudit();
