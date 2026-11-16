import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createLead, getLeads, CurrentUserContext } from "@/services/leadService";
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
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 20,
    };

    const userContext: CurrentUserContext = {
      id: session.user.id,
      role: session.user.role as Role,
      officeId: (session.user as any).officeId,
    };

    const result = await getLeads(params, userContext);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: "Customer name and phone number are required" },
        { status: 400 }
      );
    }

    const session = await auth();
    const createdById = session?.user?.id || null;

    // Normalize serviceType from strings like "Holiday package", "Hotel", "Flight", etc.
    let mappedServiceType: ServiceType = ServiceType.HOLIDAY_PACKAGE;
    const rawType = (body.serviceType || body.tripType || "").toUpperCase();
    if (rawType.includes("HOTEL") || rawType.includes("VILLA")) mappedServiceType = ServiceType.HOTEL;
    else if (rawType.includes("FLIGHT")) mappedServiceType = ServiceType.FLIGHT;
    else if (rawType.includes("BUS")) mappedServiceType = ServiceType.BUS;
    else if (rawType.includes("TRAIN")) mappedServiceType = ServiceType.TRAIN;
    else if (rawType.includes("CAB")) mappedServiceType = ServiceType.CAB;
    else if (rawType.includes("TOUR")) mappedServiceType = ServiceType.TOUR_ACTIVITY;
    else if (rawType.includes("INSUR")) mappedServiceType = ServiceType.INSURANCE;
    else if (rawType.includes("SHOP") || rawType.includes("STORE")) mappedServiceType = ServiceType.TRAVEL_SHOP;
    else if (rawType in ServiceType) mappedServiceType = rawType as ServiceType;

    // Normalize source string
    let mappedSource: LeadSource = session ? LeadSource.MANUAL : LeadSource.WEBSITE;
    const rawSource = (body.source || "").toUpperCase().replace(/[\s.-]/g, "_");
    if (rawSource in LeadSource) {
      mappedSource = rawSource as LeadSource;
    } else if (rawSource.includes("FACEBOOK") || rawSource.includes("INSTAGRAM")) {
      mappedSource = LeadSource.FACEBOOK;
    } else if (rawSource.includes("GOOGLE")) {
      mappedSource = LeadSource.GOOGLE;
    } else if (rawSource.includes("JUSTDIAL")) {
      mappedSource = LeadSource.JUSTDIAL;
    } else if (rawSource.includes("MAKEMYTRIP") || rawSource.includes("MMT")) {
      mappedSource = LeadSource.MAKEMYTRIP;
    } else if (rawSource.includes("BOOKING")) {
      mappedSource = LeadSource.BOOKING_COM;
    } else if (rawSource.includes("WHATSAPP")) {
      mappedSource = LeadSource.WHATSAPP;
    }

    const paxNum = Number(body.pax || body.paxAdults || (typeof body.travellers === "string" ? parseInt(body.travellers, 10) : body.travellers) || 1);

    const result = await createLead({
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      pinCode: body.pinCode || body.pincode || null,
      destination: body.destination || (body.origin ? `From: ${body.origin}` : "India"),
      serviceType: mappedServiceType,
      source: mappedSource,
      travelDateStart: body.travelDateStart || body.travelStart || body.startDate || null,
      travelDateEnd: body.travelDateEnd || body.travelEnd || body.endDate || null,
      paxAdults: isNaN(paxNum) ? 1 : Math.max(1, paxNum),
      paxChildren: body.paxChildren ? Number(body.paxChildren) : 0,
      budgetMin: body.budgetMin ? Number(body.budgetMin) : null,
      budgetMax: body.budgetMax ? Number(body.budgetMax) : null,
      message: body.message || body.notes || (body.origin ? `Origin: ${body.origin}` : null),
      createdById,
      officeId: body.officeId || null,
      assignedAgentId: body.assignedAgentId || null,
      rawPayload: body.rawPayload || body,
      externalId: body.externalId,
    });

    return NextResponse.json(result, { status: result.isDuplicate ? 200 : 201 });
  } catch (error: any) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create lead" },
      { status: 500 }
    );
  }
}
