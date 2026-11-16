import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getLeadStats, CurrentUserContext } from "@/services/leadService";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userContext: CurrentUserContext = {
      id: session.user.id,
      role: session.user.role as Role,
      officeId: (session.user as any).officeId,
    };

    const stats = await getLeadStats(userContext);
    return NextResponse.json(stats);
  } catch (error: any) {
    console.error("GET /api/leads/stats error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch lead stats" },
      { status: 500 }
    );
  }
}
