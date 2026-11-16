import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

const DEMO_OFFICES = [
  {
    id: "demo-office-delhi",
    name: "Lord of the Road – Delhi Connaught Place",
    code: "LOTR-DEL-01",
    city: "New Delhi",
    pinCodes: ["110001", "110002", "110003", "110004", "110005"],
  },
  {
    id: "demo-office-jaipur",
    name: "Lord of the Road – Jaipur MI Road",
    code: "LOTR-JAI-01",
    city: "Jaipur",
    pinCodes: ["302001", "302002", "302003"],
  },
];

const DEMO_AGENTS = [
  {
    id: "demo-agent",
    name: "Rahul Travel Agent",
    phone: "9999900003",
    officeId: "demo-office-delhi",
    agentProfile: {
      agencyName: "Rahul Travels",
      coveragePinCodes: ["110001", "110002"],
    },
  },
  {
    id: "demo-agent-2",
    name: "Pooja Sharma (Jaipur Branch)",
    phone: "9999900005",
    officeId: "demo-office-jaipur",
    agentProfile: {
      agencyName: "Royal Rajputana Tours",
      coveragePinCodes: ["302001"],
    },
  },
];

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.user.role as Role;
    const userOfficeId = (session.user as any).officeId;

    try {
      const offices = await prisma.office.findMany({
        where: role === Role.OFFICE_ADMIN && userOfficeId ? { id: userOfficeId } : { isActive: true },
        select: { id: true, name: true, code: true, city: true, pinCodes: true },
        orderBy: { name: "asc" },
      });

      const agents = await prisma.user.findMany({
        where: {
          role: Role.AGENT,
          status: "ACTIVE",
          ...(role === Role.OFFICE_ADMIN && userOfficeId ? { officeId: userOfficeId } : {}),
        },
        select: {
          id: true,
          name: true,
          phone: true,
          officeId: true,
          agentProfile: {
            select: {
              agencyName: true,
              coveragePinCodes: true,
            },
          },
        },
        orderBy: { name: "asc" },
      });

      if (offices.length > 0 || agents.length > 0) {
        return NextResponse.json({ offices, agents });
      }
    } catch (dbErr) {
      console.warn("Database offline, returning demo assignees:", (dbErr as any)?.message);
    }

    // Fallback when DB is offline or empty
    return NextResponse.json({
      offices: DEMO_OFFICES,
      agents: DEMO_AGENTS,
    });
  } catch (error: any) {
    console.error("GET /api/assignees error:", error);
    return NextResponse.json({ offices: DEMO_OFFICES, agents: DEMO_AGENTS });
  }
}
