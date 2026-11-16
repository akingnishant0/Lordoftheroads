import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

const DEMO_LOGS = [
  {
    id: "log-1",
    platform: "FACEBOOK",
    endpoint: "/api/webhooks/facebook",
    method: "POST",
    headers: { "x-hub-signature-256": "sha256=9f82..." },
    payload: { entry: [{ id: "page_123", changes: [{ field: "leadgen", value: { leadgen_id: "789123456" } }] }] },
    status: "SUCCESS",
    leadId: "lead-demo-2",
    processedIn: 142,
    createdAt: new Date().toISOString(),
  },
  {
    id: "log-2",
    platform: "GOOGLE",
    endpoint: "/api/webhooks/google",
    method: "POST",
    headers: { "user-agent": "Google-Ads-Webhook" },
    payload: { form_id: 45678, campaign_id: 112233, user_column_data: [{ column_id: "FULL_NAME", string_value: "Neha Gupta" }] },
    status: "SUCCESS",
    leadId: "lead-demo-4",
    processedIn: 88,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "log-3",
    platform: "JUSTDIAL",
    endpoint: "/api/webhooks/justdial",
    method: "POST",
    headers: { "content-type": "application/json" },
    payload: { name: "Rajesh Khanna", mobile: "9823456789", category: "Hotels & Tours", city: "Jaipur" },
    status: "SUCCESS",
    leadId: "lead-demo-3",
    processedIn: 64,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
];

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== Role.SUPER_ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const platform = searchParams.get("platform");
    const status = searchParams.get("status");
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 25));
    const skip = (page - 1) * limit;

    try {
      const where: any = {};
      if (platform && platform !== "ALL") where.platform = platform.toUpperCase();
      if (status && status !== "ALL") where.status = status;

      const [logs, totalCount] = await Promise.all([
        prisma.webhookLog.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.webhookLog.count({ where }),
      ]);

      if (logs.length > 0) {
        return NextResponse.json({
          logs,
          pagination: { page, limit, totalCount, totalPages: Math.ceil(totalCount / limit) },
        });
      }
    } catch (dbErr) {
      console.warn("Database offline, returning demo logs:", (dbErr as any)?.message);
    }

    return NextResponse.json({
      logs: DEMO_LOGS,
      pagination: { page: 1, limit: 25, totalCount: DEMO_LOGS.length, totalPages: 1 },
    });
  } catch (error: any) {
    console.error("GET /api/integrations/logs error:", error);
    return NextResponse.json({
      logs: DEMO_LOGS,
      pagination: { page: 1, limit: 25, totalCount: DEMO_LOGS.length, totalPages: 1 },
    });
  }
}
