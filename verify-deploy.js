/**
 * FRONTDESK AGENTS - SOVEREIGN DEPLOYMENT VERIFIER
 * Version: 2.2.1
 * Purpose: Validates Route Integrity, Middleware Bypasses, and Asset Availability.
 */

const SITE_URL = 'https://www.frontdeskagents.com'; 
const EMERALD_TOKEN = 'emerald_public_access';

const checks = [
  { 
    name: 'MARKETING: Home Page', 
    url: `${SITE_URL}/`, 
    expected: 200 
  },
  { 
    name: 'MARKETING: Pricing Grid', 
    url: `${SITE_URL}/pricing`, 
    expected: 200 
  },
  { 
    name: 'INFRASTRUCTURE: AI Agents Fleet', 
    url: `${SITE_URL}/ai-agents`, 
    expected: 200 
  },
  { 
    name: 'SECURITY: Protected Dashboard (Auth Guard)', 
    url: `${SITE_URL}/dashboard`, 
    expected: 307 // Redirect to /login
  },
  { 
    name: 'SECURITY: Emerald Bypass Access', 
    url: `${SITE_URL}/dashboard?token=${EMERALD_TOKEN}`, 
    expected: 200 
  }
];

async function runAudit() {
  console.log('\n--- 🛡️ FRONTDESK AGENTS: SYSTEM DIAGNOSTIC START ---');
  console.log(`Target Environment: ${SITE_URL}\n`);

  let passedAll = true;

  for (const check of checks) {
    try {
      // We use redirect: 'manual' to catch the 307 instead of following it to /login
      const response = await fetch(check.url, { redirect: 'manual' });
      const status = response.status;
      
      const isSuccess = status === check.expected;
      const icon = isSuccess ? '✅' : '❌';
      
      console.log(`${icon} ${check.name.padEnd(40)} | Status: ${status} (Expected: ${check.expected})`);
      
      if (!isSuccess) passedAll = false;
    } catch (error) {
      console.log(`❌ ${check.name.padEnd(40)} | Connection Failed: ${error.message}`);
      passedAll = false;
    }
  }

  console.log('\n--- 🏁 AUDIT SUMMARY ---');
  if (passedAll) {
    console.log('✅ ALL SYSTEMS OPERATIONAL: Infrastructure is ready for global traffic.');
  } else {
    console.log('⚠️ WARNING: Some nodes failed validation. Check Vercel logs for 500 errors.');
  }
  console.log('--------------------------------------------------\n');
}

runAudit().catch(console.error);
