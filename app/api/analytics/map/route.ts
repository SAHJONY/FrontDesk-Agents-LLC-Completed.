import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type HeatPoint = { lat: number; lng: number; intensity: number };

function env(name: string) {
  return process.env[name];
}

function num(v: any): number | null {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function normalizePoints(rows: any[]): HeatPoint[] {
  const pts: HeatPoint[] = [];
  for (const r of rows || []) {
    const lat = num(r.lat ?? r.latitude);
    const lng = num(r.lng ?? r.lon ?? r.longitude);
    const intensity = num(r.intensity ?? r.weight ?? r.count ?? 1);

    if (lat == null || lng == null) continue;
    pts.push({
      lat,
      lng,
      intensity: Math.max(0.2, intensity ?? 1),
    });
  }
  return pts;
}

/**
 * Attempts in order:
 * 1) analytics_map_points (recommended)
 * 2) customers (lat/lng)
 * 3) calls (lat/lng)
 *
 * If none exist or no rows, returns empty list safely.
 */
export async function GET() {
  try {
    const supabaseUrl = env("NEXT_PUBLIC_SUPABASE_URL");
    const serviceKey = env("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        {
          points: [],
          meta: {
            ok: false,
            reason: "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
          },
        },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // 1) Preferred table: analytics_map_points
    {
      const { data, error } = await supabase
        .from("analytics_map_points")
        .select("lat,lng,intensity,latitude,longitude,weight,count")
        .limit(5000);

      if (!error && data && data.length) {
        return NextResponse.json({
          points: normalizePoints(data),
          meta: { ok: true, source: "analytics_map_points" },
        });
      }
    }

    // 2) Fallback: customers table (if you store lat/lng)
    {
      const { data, error } = await supabase
        .from("customers")
        .select("lat,lng,latitude,longitude")
        .limit(5000);

      if (!error && data && data.length) {
        // If customers has no intensity, default to 1 per point
        const points = normalizePoints(
          data.map((x: any) => ({ ...x, intensity: 1 }))
        );
        return NextResponse.json({
          points,
          meta: { ok: true, source: "customers" },
        });
      }
    }

    // 3) Fallback: calls table (only if it has lat/lng)
    {
      const { data, error } = await supabase
        .from("calls")
        .select("lat,lng,latitude,longitude")
        .limit(5000);

      if (!error && data && data.length) {
        const points = normalizePoints(
          data.map((x: any) => ({ ...x, intensity: 1 }))
        );
        return NextResponse.json({
          points,
          meta: { ok: true, source: "calls" },
        });
      }
    }

    // Nothing found (safe)
    return NextResponse.json({
      points: [],
      meta: {
        ok: true,
        source: "none",
        note:
          "No map point source found. Create analytics_map_points (recommended) or store lat/lng in customers/calls.",
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        points: [],
        meta: { ok: false, reason: e?.message || "Unknown error" },
      },
      { status: 200 }
    );
  }
}
