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
      `Partner application: ${body.type || "Travel Agent"}`,
      body.city ? `City: ${body.city}` : "",
      body.pincode ? `PIN Code: ${body.pincode}` : "",
      body.businessName ? `Business Name: ${body.businessName}` : "",
      body.experience ? `Experience: ${body.experience}` : "",
    ].filter(Boolean).join(" | ");

    await createLead({
      name: body.name,
      phone: body.phone,
      pinCode: body.pincode || null,
      destination: body.city || "Pan-India",
      serviceType: ServiceType.TOUR_ACTIVITY,
      source: LeadSource.WEBSITE,
      message: notes,
      rawPayload: body,
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted. Our territory onboarding team will review your PIN code and contact you within 24 hours.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to submit application" }, { status: 500 });
  }
}
