import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createBooking, getBookings } from "@/services/bookingService";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "ALL";

    const email = searchParams.get("email") || session?.user?.email || undefined;
    const phone = searchParams.get("phone") || (session?.user as any)?.phone || undefined;

    const bookings = await getBookings({ status, email, phone });
    return NextResponse.json({ bookings });
  } catch (error: any) {
    console.error("GET /api/bookings error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json();

    if (!body.destination || !body.contactName || !body.contactPhone) {
      return NextResponse.json({ error: "Destination, contact name and phone are required" }, { status: 400 });
    }

    const booking = await createBooking({
      ...body,
      userId: session?.user?.id || null,
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/bookings error:", error);
    return NextResponse.json({ error: error.message || "Failed to create booking" }, { status: 500 });
  }
}
