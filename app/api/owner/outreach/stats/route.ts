import { NextRequest, NextResponse } from "next/server";

function parseRange(timeRange: string): number | null {
  switch (timeRange) {
    case "7d":
      return 7;
    case "30d":
      return 30;
    case "90d":
      return 90;
    case "all":
      return null;
    default:
      return 30;
  }
}

function filterDailyByRange<T extends { date: string }>(daily: T[], rangeDays: number | null): T[] {
  if (rangeDays === null) return daily;

  // Expect YYYY-MM-DD
  const dates = daily
    .map((d) => new Date(`${d.date}T00:00:00Z`).getTime())
    .filter((t) => Number.isFinite(t));

  if (!dates.length) return daily;

  const maxTs = Math.max(...dates);
  const cutoff = maxTs - (rangeDays - 1) * 24 * 60 * 60 * 1000;

  return daily.filter((d) => {
    const ts = new Date(`${d.date}T00:00:00Z`).getTime();
    return Number.isFinite(ts) && ts >= cutoff;
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get("campaignId");
    const timeRange = searchParams.get("timeRange") || "30d"; // 7d, 30d, 90d, all
    const rangeDays = parseRange(timeRange);

    // Mock comprehensive stats
    const stats = {
      overview: {
        totalCampaigns: 2,
        activeCampaigns: 2,
        totalLeads: 400,
        qualifiedLeads: 320,
        contacted: 300,
        responses: 20,
        conversions: 5,
        responseRate: 6.67, // (20/300) * 100
        conversionRate: 1.25, // (5/400) * 100
        avgLeadScore: 84,
        avgResponseTime: 4.2 // hours
      },

      performance: {
        daily: [
          { date: "2026-01-06", leads: 50, contacted: 45, responses: 2, conversions: 0 },
          { date: "2026-01-07", leads: 60, contacted: 55, responses: 3, conversions: 1 },
          { date: "2026-01-08", leads: 55, contacted: 50, responses: 2, conversions: 0 },
          { date: "2026-01-09", leads: 65, contacted: 60, responses: 4, conversions: 1 },
          { date: "2026-01-10", leads: 70, contacted: 65, responses: 5, conversions: 2 },
          { date: "2026-01-11", leads: 50, contacted: 45, responses: 2, conversions: 1 },
          { date: "2026-01-12", leads: 50, contacted: 20, responses: 2, conversions: 0 }
        ],

        byChannel: {
          email: { sent: 180, opened: 90, clicked: 25, responses: 12, conversions: 3 },
          sms: { sent: 120, delivered: 115, responses: 8, conversions: 2 },
          phone: { attempted: 0, connected: 0, responses: 0, conversions: 0 }
        },

        byIndustry: {
          Healthcare: { leads: 250, responses: 12, conversions: 3, responseRate: 4.8 },
          "Legal Services": { leads: 150, responses: 8, conversions: 2, responseRate: 5.3 }
        },

        topPerformers: [
          { name: "Healthcare Q1 Campaign", responses: 12, conversions: 3, roi: 450 },
          { name: "Legal Services Outreach", responses: 8, conversions: 2, roi: 320 }
        ]
      },

      automation: {
        totalRules: 5,
        activeRules: 5,
        executionCount: 1247,
        successRate: 98.5,
        avgExecutionTime: 1.2 // seconds
      },

      revenue: {
        totalValue: 125000, // Total potential revenue from all leads
        qualifiedValue: 95000, // Revenue from qualified leads
        convertedValue: 15000, // Actual revenue from conversions
        projectedMonthly: 45000, // Projected monthly revenue
        avgDealSize: 3000
      },

      engagement: {
        emailOpenRate: 50.0, // (90/180) * 100
        emailClickRate: 13.9, // (25/180) * 100
        smsDeliveryRate: 95.8, // (115/120) * 100
        avgTimeToResponse: 6.5, // hours
        followUpRate: 85.0
      },

      leadQuality: {
        scoreDistribution: {
          "90-100": 45,
          "80-89": 120,
          "70-79": 95,
          "60-69": 60,
          "below-60": 0
        },
        topSources: [
          { source: "AI Lead Generation", count: 280, conversionRate: 1.4 },
          { source: "Google Maps", count: 80, conversionRate: 0.8 },
          { source: "Referral", count: 40, conversionRate: 2.5 }
        ]
      }
    };

    // ✅ Use timeRange by filtering daily stats
    const filteredDaily = filterDailyByRange(stats.performance.daily, rangeDays);

    const responsePayload = {
      timeRange, // ✅ now used
      rangeDays, // ✅ now used
      stats: {
        ...stats,
        performance: {
          ...stats.performance,
          daily: filteredDaily
        }
      }
    };

    // If specific campaign requested, filter data
    if (campaignId) {
      return NextResponse.json({
        campaignId,
        ...responsePayload,
        stats: {
          ...responsePayload.stats,
          overview: {
            ...responsePayload.stats.overview,
            totalCampaigns: 1,
            activeCampaigns: 1
          }
        }
      });
    }

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, event, data } = body;

    // Track custom events
    console.log(`Tracking event: ${event} for campaign ${campaignId}`);
    console.log("Event data:", data);

    // In production, this would:
    // 1. Save event to analytics database
    // 2. Update campaign metrics
    // 3. Trigger automation rules if applicable
    // 4. Update dashboards in real-time

    return NextResponse.json({
      success: true,
      message: "Event tracked successfully"
    });
  } catch (error) {
    console.error("Error tracking event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
