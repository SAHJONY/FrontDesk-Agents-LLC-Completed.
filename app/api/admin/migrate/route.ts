import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

type ExecSqlResult = {
  success: boolean;
  migration: string;
  totalStatements: number;
  successCount: number;
  errorCount: number;
  results: Array<{
    statement: number;
    status: "success" | "error";
    error?: string;
    sql?: string;
  }>;
};

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function getAdminSecret() {
  return process.env.ADMIN_SECRET_KEY || "";
}

function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const adminSecret = getAdminSecret();
  if (!adminSecret) return false;
  return !!authHeader && authHeader === `Bearer ${adminSecret}`;
}

function getServiceSupabase(): { supabase: any; error: string | null } {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return { supabase: null, error: "Supabase configuration missing" };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  return { supabase, error: null };
}

function readMigrationFile(migration: string) {
  const migrationPath = path.join(
    process.cwd(),
    "database",
    "migrations",
    `${migration}.sql`
  );

  try {
    const sql = fs.readFileSync(migrationPath, "utf8");
    return { sql, error: null as string | null };
  } catch {
    return { sql: "", error: `Migration file not found: ${migration}.sql` };
  }
}

function splitSqlStatements(sql: string) {
  // Basic splitting. NOTE: This will not handle complex SQL containing semicolons inside
  // functions/procedures/DO blocks. For production-grade migrations, prefer Supabase CLI.
  return sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));
}

export async function POST(request: NextRequest) {
  try {
    if (!verifyAdmin(request)) return unauthorized();

    const body = await request.json().catch(() => ({}));
    const migration = String(body?.migration || "").trim();

    if (!migration) {
      return NextResponse.json(
        { error: "Migration name required" },
        { status: 400 }
      );
    }

    const { supabase, error: supaErr } = getServiceSupabase();
    if (supaErr) {
      return NextResponse.json({ error: supaErr }, { status: 500 });
    }

    const { sql: migrationSQL, error: fileErr } = readMigrationFile(migration);
    if (fileErr) {
      return NextResponse.json({ error: fileErr }, { status: 404 });
    }

    console.log(`📦 Running migration: ${migration}`);
    console.log(`📄 SQL length: ${migrationSQL.length} characters`);

    const statements = splitSqlStatements(migrationSQL);

    const results: ExecSqlResult["results"] = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (!statement) continue;

      try {
        // Requires a Postgres function in Supabase:
        // create or replace function exec_sql(sql text) returns void ...
        const { error } = await supabase.rpc("exec_sql", {
          sql: statement + ";",
        });

        if (error) {
          errorCount++;
          results.push({
            statement: i + 1,
            status: "error",
            error: error.message,
            sql:
              statement.substring(0, 140) +
              (statement.length > 140 ? "..." : ""),
          });
          console.error(`❌ Statement ${i + 1} failed:`, error.message);
        } else {
          successCount++;
          results.push({ statement: i + 1, status: "success" });
          console.log(`✅ Statement ${i + 1} executed successfully`);
        }
      } catch (err: any) {
        errorCount++;
        results.push({
          statement: i + 1,
          status: "error",
          error: err?.message || String(err),
          sql:
            statement.substring(0, 140) +
            (statement.length > 140 ? "..." : ""),
        });
        console.error(`❌ Statement ${i + 1} exception:`, err?.message || err);
      }
    }

    console.log(
      `📊 Migration complete: ${successCount} success, ${errorCount} errors`
    );

    return NextResponse.json({
      success: errorCount === 0,
      migration,
      totalStatements: statements.length,
      successCount,
      errorCount,
      results: results.filter((r) => r.status === "error"), // return only errors
    } satisfies ExecSqlResult);
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!verifyAdmin(request)) return unauthorized();

    const migrationPath = path.join(
      process.cwd(),
      "database",
      "migrations",
      "001_initial_schema.sql"
    );

    const migrationSQL = fs.readFileSync(migrationPath, "utf8");

    return new NextResponse(migrationSQL, {
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": 'attachment; filename="001_initial_schema.sql"',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
