/**
 * FrontDesk Agents LLC - Dependency Checker
 * Validates all packages for 15 AI Services before deployment
 * Run: node check-dependencies.js
 */

const https = require('https');
const packageJson = require('./package.json');

// Service-to-Package mapping for your 15 services
const SERVICE_DEPENDENCIES = {
  // PILLAR 1: Omnichannel Communication
  'AI Voice Receptionist': ['twilio', 'openai', 'mic-recorder-to-mp3'],
  'WhatsApp Business Concierge': ['twilio', 'openai'],
  'Live Chat Web Widget': ['@supabase/supabase-js', 'lucide-react'],
  'Proactive SMS Agent': ['twilio'],
  'Autonomous Email Assistant': ['@sendgrid/mail', 'resend', '@react-email/components', 'openai'],

  // PILLAR 2: Sales & Revenue Growth
  'AI SDR (Outbound Prospecting)': ['twilio', 'openai', 'airtable'],
  'Instant Lead Qualifier': ['twilio', 'openai', '@supabase/supabase-js'],
  'Meeting Scheduler': ['@supabase/supabase-js', 'resend'],
  'Lead Nurturing Sequence': ['@sendgrid/mail', 'resend', 'twilio'],
  'Revenue Attribution Tracker': ['@supabase/supabase-js', 'recharts', '@tremor/react'],

  // PILLAR 3: Operations & Quality Control
  'AI Quality Analyst': ['openai', '@supabase/supabase-js'],
  'Real-time Sentiment Monitor': ['openai', '@supabase/supabase-js', 'twilio'],
  'Collections & Billing Agent': ['stripe', 'twilio', 'resend'],
  'KYC & Security Gatekeeper': ['openai', '@supabase/supabase-js'],
  'Global Kill-Switch': ['@supabase/supabase-js', 'stripe']
};

// Critical packages that must be present
const CRITICAL_PACKAGES = [
  'next',
  'react',
  'react-dom',
  'openai',
  'twilio',
  'stripe',
  '@supabase/supabase-js',
  'mic-recorder-to-mp3'
];

console.log('\n🔍 FrontDesk Agents LLC - Dependency Validation\n');
console.log('=' .repeat(60));

// Check if package exists on npm
function checkPackageExists(packageName, version) {
  return new Promise((resolve) => {
    const cleanVersion = version.replace(/[\^~]/g, '');
    const url = `https://registry.npmjs.org/${packageName.replace('/', '%2F')}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const pkg = JSON.parse(data);
          if (pkg.error) {
            resolve({ exists: false, package: packageName, version });
          } else {
            const versions = Object.keys(pkg.versions || {});
            const versionExists = versions.some(v => v === cleanVersion || v.startsWith(cleanVersion.split('.')[0]));
            resolve({ 
              exists: true, 
              package: packageName, 
              version,
              versionExists,
              latestVersion: pkg['dist-tags']?.latest
            });
          }
        } catch (e) {
          resolve({ exists: false, package: packageName, version, error: e.message });
        }
      });
    }).on('error', (err) => {
      resolve({ exists: false, package: packageName, version, error: err.message });
    });
  });
}

// Main validation
async function validateDependencies() {
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };

  console.log(`\n📦 Checking ${Object.keys(allDeps).length} packages...\n`);

  const results = await Promise.all(
    Object.entries(allDeps).map(([pkg, version]) => 
      checkPackageExists(pkg, version)
    )
  );

  // Categorize results
  const errors = [];
  const warnings = [];
  const success = [];

  results.forEach(result => {
    if (!result.exists) {
      errors.push(`❌ ${result.package}@${result.version} - DOES NOT EXIST`);
    } else if (!result.versionExists) {
      warnings.push(`⚠️  ${result.package}@${result.version} - Version not found (Latest: ${result.latestVersion})`);
    } else {
      success.push(`✅ ${result.package}@${result.version}`);
    }
  });

  // Display results
  if (errors.length > 0) {
    console.log('\n🚨 CRITICAL ERRORS - These will break your build:\n');
    errors.forEach(err => console.log(err));
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS - Consider updating these:\n');
    warnings.forEach(warn => console.log(warn));
  }

  console.log(`\n✅ ${success.length} packages validated successfully\n`);

  // Check service coverage
  console.log('\n🏢 SERVICE COVERAGE VALIDATION\n');
  console.log('=' .repeat(60));

  let allServicesReady = true;
  Object.entries(SERVICE_DEPENDENCIES).forEach(([service, packages]) => {
    const missingPackages = packages.filter(pkg => !allDeps[pkg]);
    if (missingPackages.length > 0) {
      console.log(`❌ ${service}`);
      console.log(`   Missing: ${missingPackages.join(', ')}`);
      allServicesReady = false;
    } else {
      console.log(`✅ ${service}`);
    }
  });

  // Check critical packages
  console.log('\n🔐 CRITICAL PACKAGE CHECK\n');
  console.log('=' .repeat(60));

  const missingCritical = CRITICAL_PACKAGES.filter(pkg => !allDeps[pkg]);
  if (missingCritical.length > 0) {
    console.log(`❌ Missing critical packages: ${missingCritical.join(', ')}`);
    allServicesReady = false;
  } else {
    console.log('✅ All critical packages present');
  }

  // Final verdict
  console.log('\n' + '=' .repeat(60));
  if (errors.length > 0) {
    console.log('\n❌ BUILD WILL FAIL - Fix errors above before deploying\n');
    process.exit(1);
  } else if (!allServicesReady) {
    console.log('\n⚠️  SOME SERVICES INCOMPLETE - Review missing packages\n');
    process.exit(1);
  } else {
    console.log('\n✅ ALL SYSTEMS GO - Ready for deployment! 🚀\n');
    console.log('Next steps:');
    console.log('  1. git add package.json');
    console.log('  2. git commit -m "Validated all dependencies for 15 services"');
    console.log('  3. git push origin SAHJONY-patch-1');
    console.log('');
    process.exit(0);
  }
}

// Run the validation
validateDependencies().catch(err => {
  console.error('\n❌ Validation failed:', err.message);
  process.exit(1);
});
