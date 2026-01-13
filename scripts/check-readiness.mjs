import fs from 'fs';
import path from 'path';
import { chalk } from 'zx'; // You may need to run 'npm install zx'

const REQUIRED_ENV = [
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'BLAND_AI_API_KEY',
  'NEXT_PUBLIC_BASE_URL'
];

const REQUIRED_FILES = [
  'app/globals.css',
  'components/marketing/PricingGrid.tsx',
  'components/dashboard/TranscriptModal.tsx',
  'app/api/webhooks/stripe/route.ts'
];

async function runCheck() {
  console.log("🛡️  INITIALIZING AEGIS READINESS CHECK...");
  let errors = 0;

  // 1. Check File System & Case Sensitivity
  console.log("\n📁 Checking File Infrastructure...");
  REQUIRED_FILES.forEach(file => {
    if (fs.existsSync(path.join(process.cwd(), file))) {
      console.log(`✅ FOUND: ${file}`);
    } else {
      console.error(`❌ MISSING: ${file}`);
      errors++;
    }
  });

  // 2. Check Environment Variables (Local)
  console.log("\n🔑 Checking Environment Keys...");
  REQUIRED_ENV.forEach(key => {
    if (process.env[key]) {
      console.log(`✅ ARMED: ${key}`);
    } else {
      console.warn(`⚠️  NOT SET: ${key} (Ignore if setting in Vercel Dashboard)`);
    }
  });

  // 3. Verify Layout Imports
  const layoutPath = 'app/[locale]/layout.tsx';
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');
    if (content.includes('@/app/globals.css')) {
      console.log("✅ LAYOUT: CSS Import Path is Absolute.");
    } else {
      console.error("❌ LAYOUT: CSS Import is relative. This will break Vercel.");
      errors++;
    }
  }

  console.log("\n------------------------------------");
  if (errors === 0) {
    console.log("🚀 ALL SYSTEMS OPTIMAL. READY FOR DEPLOYMENT.");
    process.exit(0);
  } else {
    console.log(`🚫 FOUND ${errors} CRITICAL ISSUES. FIX BEFORE PUSHING.`);
    process.exit(1);
  }
}

runCheck();
