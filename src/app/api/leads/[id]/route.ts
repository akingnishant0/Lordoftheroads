import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getLeadById, updateLead, CurrentUserContext } from "@/services/leadService";
import { Role } from "@prisma/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userContext: CurrentUserContext = {
      id: session.user.id,
      role: session.user.role as Role,
      officeId: (session.user as any).officeId,
    };

    const lead = await getLeadById(id, userContext);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error: any) {
    console.error("GET /api/leads/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch lead" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const userContext: CurrentUserContext = {
      id: session.user.id,
      role: session.user.role as Role,
      officeId: (session.user as any).officeId,
    };

    const updated = await updateLead(
      id,
      {
        status: body.status,
        lostReason: body.lostReason,
        followUpDate: body.followUpDate,
        officeId: body.officeId,
        assignedAgentId: body.assignedAgentId,
        destination: body.destination,
        budgetMin: body.budgetMin ? Number(body.budgetMin) : undefined,
        budgetMax: body.budgetMax ? Number(body.budgetMax) : undefined,
        paxAdults: body.paxAdults ? Number(body.paxAdults) : undefined,
        paxChildren: body.paxChildren ? Number(body.paxChildren) : undefined,
        message: body.message,
      },
      userContext
    );

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PATCH /api/leads/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update lead" },
      { status: 500 }
    );
  }
}
