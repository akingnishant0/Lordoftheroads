import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { exportLeadsToCsv, CurrentUserContext } from "@/services/leadService";
import { LeadSource, LeadStatus, ServiceType, Role } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const params = {
      status: (searchParams.get("status") as LeadStatus | "ALL") || "ALL",
      source: (searchParams.get("source") as LeadSource | "ALL") || "ALL",
      serviceType: (searchParams.get("serviceType") as ServiceType | "ALL") || "ALL",
      search: searchParams.get("search") || undefined,
      officeId: searchParams.get("officeId") || undefined,
      assignedAgentId: searchParams.get("assignedAgentId") || undefined,
      pinCode: searchParams.get("pinCode") || undefined,
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
    };

    const userContext: CurrentUserContext = {
      id: session.user.id,
      role: session.user.role as Role,
      officeId: (session.user as any).officeId,
    };

    const csvData = await exportLeadsToCsv(params, userContext);
    const filename = `leads_export_${new Date().toISOString().split("T")[0]}.csv`;

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error("GET /api/leads/export error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to export leads" },
      { status: 500 }
    );
  }
}
