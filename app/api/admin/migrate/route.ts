import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authorization
    const authHeader = request.headers.get('authorization');
    const adminSecret = process.env.ADMIN_SECRET_KEY;

    if (!authHeader || authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get migration name from request body
    const { migration } = await request.json();
    
    if (!migration) {
      return NextResponse.json(
        { error: 'Migration name required' },
        { status: 400 }
      );
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Read migration file
    const migrationPath = path.join(process.cwd(), 'database', 'migrations', `${migration}.sql`);
    
    let migrationSQL: string;
    try {
      migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    } catch (error) {
      return NextResponse.json(
        { error: `Migration file not found: ${migration}.sql` },
        { status: 404 }
      );
    }

    console.log(`📦 Running migration: ${migration}`);
    console.log(`📄 SQL length: ${migrationSQL.length} characters`);

    // Execute migration
    // Note: Supabase doesn't support multi-statement execution via client
    // We need to split and execute statements individually
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    const results = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      // Skip comments and empty statements
      if (!statement || statement.startsWith('--')) continue;

      try {
        const { data, error } = await supabase.rpc('exec_sql', {
          sql: statement + ';'
        });

        if (error) {
          console.error(`❌ Statement ${i + 1} failed:`, error.message);
          errorCount++;
          results.push({
            statement: i + 1,
            status: 'error',
            error: error.message,
            sql: statement.substring(0, 100) + '...'
          });
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
          successCount++;
          results.push({
            statement: i + 1,
            status: 'success'
          });
        }
      } catch (err: any) {
        console.error(`❌ Statement ${i + 1} exception:`, err.message);
        errorCount++;
        results.push({
          statement: i + 1,
          status: 'error',
          error: err.message,
          sql: statement.substring(0, 100) + '...'
        });
      }
    }

    console.log(`📊 Migration complete: ${successCount} success, ${errorCount} errors`);

    return NextResponse.json({
      success: errorCount === 0,
      migration,
      totalStatements: statements.length,
      successCount,
      errorCount,
      results: results.filter(r => r.status === 'error') // Only return errors
    });

  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// Alternative: Direct SQL execution for Supabase
export async function GET(request: NextRequest) {
  try {
    // Verify admin authorization
    const authHeader = request.headers.get('authorization');
    const adminSecret = process.env.ADMIN_SECRET_KEY;

    if (!authHeader || authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Return migration SQL for manual execution
    const migrationPath = path.join(process.cwd(), 'database', 'migrations', '001_initial_schema.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    return new NextResponse(migrationSQL, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="001_initial_schema.sql"'
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
