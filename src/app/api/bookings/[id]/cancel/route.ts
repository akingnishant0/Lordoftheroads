import { NextRequest, NextResponse } from "next/server";
import { cancelBooking } from "@/services/bookingService";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const reason = body.reason || "Customer requested cancellation";

    const result = await cancelBooking(id, reason);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Cancel booking error:", error);
    return NextResponse.json({ error: error.message || "Failed to cancel booking" }, { status: 400 });
  }
}
