import fs from 'fs';
import path from 'path';
import { handleBatchLeads } from '@/lib/services/lead-ingestion';
import 'dotenv/config';

/**
 * SOVEREIGN MASTER CLI v1.0
 * Usage: npx tsx scripts/sovereign-cli.ts ./leads/batch-01.json
 */
async function runProvisioning() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('❌ ERROR: No lead file provided.');
    console.info('Usage: npx tsx scripts/sovereign-cli.ts <path_to_json>');
    process.exit(1);
  }

  const absolutePath = path.resolve(filePath);
  
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ ERROR: File not found at ${absolutePath}`);
    process.exit(1);
  }

  console.log('--- 🛡️  INITIALIZING SOVEREIGN PROVISIONING ---');
  console.log(`📂 TARGET: ${path.basename(filePath)}`);
  
  try {
    const rawData = fs.readFileSync(absolutePath, 'utf8');
    const leads = JSON.parse(rawData);

    console.log(`📡 INGESTING ${leads.length} NODES TO PDX1 CLUSTER...`);
    
    const startTime = Date.now();
    const result = await handleBatchLeads(leads);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('--- ✅ PROVISIONING COMPLETE ---');
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`💎 Success: ${result.summary.success}`);
    console.log(`⚠️  Failed: ${result.summary.failed}`);
    console.log(`🔒 Vault Status: ${result.summary.vault_status}`);

    if (result.summary.failed > 0) {
      console.warn('Review individual results for failure details.');
    }

  } catch (error: any) {
    console.error('❌ CRITICAL SYSTEM ERROR DURING CLI EXECUTION:');
    console.error(error.message);
    process.exit(1);
  }
}

runProvisioning();
