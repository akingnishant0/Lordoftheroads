import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/services/leadService";
import { ServiceType, LeadSource } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ error: "Name and phone number are required" }, { status: 400 });
    }

    const itemsSummary = (body.items || [])
      .map((it: any) => `${it.product} x ${it.quantity}`)
      .join(", ");

    const notes = [
      `Travel Shop Enquiry: ${itemsSummary || "Selected Items"}`,
      body.pincode ? `Delivery PIN: ${body.pincode}` : "",
      body.notes ? `Customer notes: ${body.notes}` : "",
    ].filter(Boolean).join(" | ");

    await createLead({
      name: body.name,
      phone: body.phone,
      pinCode: body.pincode || null,
      destination: "Travel Shop Essentials",
      serviceType: ServiceType.TRAVEL_SHOP,
      source: LeadSource.WEBSITE,
      message: notes,
      rawPayload: body,
    });

    return NextResponse.json({
      success: true,
      message: "Product enquiry received. Our store desk will check local stock and reach out to confirm delivery.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to submit order enquiry" }, { status: 500 });
  }
}
