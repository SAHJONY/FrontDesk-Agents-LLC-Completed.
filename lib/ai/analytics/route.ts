import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { businessId } = await req.json();

    // 1. Get the business info
    const business = await db.businessConfig.findUnique({
      where: { id: businessId },
    });

    if (!business) return NextResponse.json({ error: "No data found" }, { status: 404 });

    // 2. Fetch calls separately to avoid "include" relation errors
    const calls = await (db as any).callLogs.findMany({
      where: { businessId: businessId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      business,
      calls,
      stats: {
        totalCalls: calls.length,
        // Add more basic stats here
      }
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
