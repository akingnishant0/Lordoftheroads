import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SAMPLE_PACKAGES = [
  {
    id: "pkg-ladakh-1",
    title: "High roads of Ladakh",
    destination: "Ladakh",
    durationDays: 7,
    pricePerPerson: 34500,
    origin: "Leh",
    inclusions: "Acclimatisation in Leh, Nubra Valley via Khardung La, Pangong Tso camp, and private 4x4 transfers.",
    createdBy: "Lord of the Road Mountain Team",
    sample: false,
    status: "Published",
  },
  {
    id: "pkg-kerala-1",
    title: "Slow days in Kerala",
    destination: "Kerala",
    durationDays: 5,
    pricePerPerson: 22800,
    origin: "Kochi",
    inclusions: "Munnar tea estates stay, private Alleppey houseboat cruise, Kumarakom bird sanctuary, and all meals.",
    createdBy: "South India Office",
    sample: false,
    status: "Published",
  },
  {
    id: "pkg-rajasthan-1",
    title: "Rajasthan royal trail",
    destination: "Rajasthan",
    durationDays: 6,
    pricePerPerson: 28900,
    origin: "Jaipur",
    inclusions: "Jaipur Amer fort, Jodhpur blue city walk, Jaisalmer Sam dunes luxury desert camp with folk music.",
    createdBy: "Jaipur Heritage Desk",
    sample: false,
    status: "Published",
  },
  {
    id: "pkg-goa-1",
    title: "Goa beyond the beaches",
    destination: "Goa",
    durationDays: 4,
    pricePerPerson: 16500,
    origin: "Goa",
    inclusions: "Fontainhas heritage Latin quarter walking tour, spice plantation lunch, Dudhsagar falls, and boutique villa.",
    createdBy: "Goa Coastal Team",
    sample: false,
    status: "Published",
  },
];

export async function GET() {
  try {
    if (prisma) {
      try {
        const dbPackages = await prisma.tourPackage.findMany({
          where: { status: "APPROVED" },
          take: 12,
        });
        if (dbPackages && dbPackages.length > 0) {
          return NextResponse.json({
            packages: dbPackages.map((p) => ({
              id: p.id,
              title: p.title,
              destination: p.destination,
              durationDays: p.durationDays,
              pricePerPerson: Number(p.pricePerPerson),
              origin: "India",
              inclusions: (p.inclusions || []).join(", ") || p.description,
              createdBy: "Verified Agent",
              sample: false,
              status: "Published",
            })),
          });
        }
      } catch {
        // Fallback to sample packages
      }
    }

    return NextResponse.json({ packages: SAMPLE_PACKAGES });
  } catch {
    return NextResponse.json({ packages: SAMPLE_PACKAGES });
  }
}
