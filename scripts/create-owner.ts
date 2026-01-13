import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

async function createOwnerAccount() {
  // Get environment variables from Vercel
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials');
    console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING');
    console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? 'SET' : 'MISSING');
    process.exit(1);
  }

  console.log('✅ Supabase credentials found');
  console.log('📡 Connecting to Supabase...');

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // Owner account details
  const email = 'frontdeskllc@outlook.com';
  const password = 'Cabezon24$';
  const fullName = 'FrontDesk LLC Owner';
  const role = 'OWNER';
  const tier = 'enterprise';

  console.log('🔐 Hashing password...');
  const passwordHash = await bcrypt.hash(password, 10);

  console.log('🔍 Checking if user already exists...');
  const { data: existingUsers, error: checkError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .limit(1);

  if (checkError) {
    console.error('❌ Error checking for existing user:', checkError);
    process.exit(1);
  }

  if (existingUsers && existingUsers.length > 0) {
    console.log('👤 User already exists. Updating password...');
    
    const { error: updateError } = await supabase
      .from('users')
      .update({
        password_hash: passwordHash,
        role: role,
        tier: tier,
        full_name: fullName,
        updated_at: new Date().toISOString()
      })
      .eq('email', email.toLowerCase());

    if (updateError) {
      console.error('❌ Error updating user:', updateError);
      process.exit(1);
    }

    console.log('✅ User updated successfully!');
  } else {
    console.log('👤 Creating new owner account...');
    
    const { data, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          email: email.toLowerCase(),
          password_hash: passwordHash,
          full_name: fullName,
          role: role,
          tier: tier,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select();

    if (insertError) {
      console.error('❌ Error creating user:', insertError);
      console.error('Details:', JSON.stringify(insertError, null, 2));
      process.exit(1);
    }

    console.log('✅ Owner account created successfully!');
    console.log('📧 Email:', email);
    console.log('👤 Name:', fullName);
    console.log('🎭 Role:', role);
    console.log('💎 Tier:', tier);
  }

  console.log('\n🎉 Setup complete! You can now login at:');
  console.log('🔗 https://www.frontdeskagents.com/login');
  console.log('📧 Email:', email);
  console.log('🔑 Password:', password);
}

createOwnerAccount().catch(console.error);
