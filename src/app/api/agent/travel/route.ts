import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createAgentTravelBooking,
  getAgentTravelBookings,
  AgentTravelBookingRequest,
} from "@/services/agentBookingService";

export async function GET() {
  try {
    const bookings = getAgentTravelBookings();
    const totalMarkupCommission = bookings.reduce(
      (sum, b) => sum + (b.agentMarkupAmount || 0) + (b.agentCommissionAmount || 0),
      0
    );
    return NextResponse.json({ bookings, totalMarkupCommission });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body: AgentTravelBookingRequest = await req.json();

    if (!body.destination || !body.customerName || !body.customerPhone) {
      return NextResponse.json({ error: "Destination, customer name, and phone are required" }, { status: 400 });
    }

    const booking = createAgentTravelBooking({
      ...body,
      agentId: session?.user?.id || "agent-demo",
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error: any) {
    console.error("Agent travel booking error:", error);
    return NextResponse.json({ error: error.message || "Failed to create booking" }, { status: 500 });
  }
}
