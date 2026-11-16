import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/services/leadService";
import { ServiceType, LeadSource } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ error: "Name and phone number are required" }, { status: 400 });
    }

    const notes = [
      `Travel Insurance Callback Request`,
      body.region ? `Trip type: ${body.region}` : "",
      body.departureDate ? `Departure date: ${body.departureDate}` : "",
      body.travellers ? `Travellers: ${body.travellers}` : "",
    ].filter(Boolean).join(" | ");

    await createLead({
      name: body.name,
      phone: body.phone,
      destination: body.destination || "Travel Insurance",
      serviceType: ServiceType.INSURANCE,
      source: LeadSource.WEBSITE,
      message: notes,
      travelDateStart: body.departureDate || null,
      paxAdults: Number(body.travellers) || 1,
      rawPayload: body,
    });

    return NextResponse.json({
      success: true,
      message: "Information request received. A licensed partner representative will contact you with policy details.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to submit request" }, { status: 500 });
  }
}
