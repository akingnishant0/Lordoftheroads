import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SAMPLE_BRANCHES = [
  { id: "b-jai-1", name: "Lord of the Road — Jaipur Hub", city: "Jaipur", pincode: "302001", phone: "+91 98290 12345", type: "Main Booking Office", active: true },
  { id: "b-blr-1", name: "Lord of the Road — Indiranagar", city: "Bengaluru", pincode: "560038", phone: "+91 98860 67890", type: "Franchise Office", active: true },
  { id: "b-del-1", name: "Lord of the Road — Connaught Place", city: "Delhi", pincode: "110001", phone: "+91 98110 54321", type: "Company Branch", active: true },
  { id: "b-mum-1", name: "Lord of the Road — Bandra West", city: "Mumbai", pincode: "400050", phone: "+91 98200 98765", type: "Booking Office", active: true },
  { id: "b-koc-1", name: "Lord of the Road — Fort Kochi", city: "Kochi", pincode: "682001", phone: "+91 98470 11223", type: "Branch & Experience Center", active: true },
  { id: "b-sri-1", name: "Lord of the Road — Dal Gate", city: "Srinagar", pincode: "190001", phone: "+91 99060 44556", type: "Mountain Outpost", active: true },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pincode = searchParams.get("pincode")?.trim();

    try {
      if (prisma) {
        const offices = await prisma.office.findMany({
          where: { isActive: true },
          take: 20,
        });

        if (offices && offices.length > 0) {
          let matched = offices;
          if (pincode) {
            matched = offices.filter(o => o.pinCodes?.includes(pincode) || o.pinCodes?.some(p => p.startsWith(pincode.slice(0, 2))));
            if (matched.length === 0) matched = offices.slice(0, 3);
          }
          return NextResponse.json({
            branches: matched.map(o => ({
              id: o.id,
              name: o.name,
              city: o.city,
              pincode: o.pinCodes?.[0] || "All",
              phone: o.phone || "+91 98290 12345",
              type: o.name.includes("Branch") ? "Company Branch" : "Booking Office",
              active: o.isActive,
            }))
          });
        }
      }
    } catch {
      // Fallback to sample branches if DB is not reachable
    }

    let branches = SAMPLE_BRANCHES;
    if (pincode) {
      const exact = SAMPLE_BRANCHES.filter(b => b.pincode === pincode);
      if (exact.length > 0) {
        branches = exact;
      } else {
        const zone = pincode.slice(0, 2);
        const near = SAMPLE_BRANCHES.filter(b => b.pincode.startsWith(zone));
        branches = near.length > 0 ? near : SAMPLE_BRANCHES.slice(0, 2);
      }
    }

    return NextResponse.json({ branches });
  } catch (error: any) {
    return NextResponse.json({ branches: SAMPLE_BRANCHES });
  }
}
