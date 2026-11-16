import { NextRequest, NextResponse } from "next/server";
import {
  REALTIME_PROPERTY_INVENTORY,
  CHANNELS_SYNC_STATUS,
  recordChannelBooking,
  getAggregatedInventoryStats,
  ChannelSource,
} from "@/services/channelManagerService";

/**
 * GET /api/channel-manager/sync
 * Returns real-time property room availability and synced channel status
 */
export async function GET(request: NextRequest) {
  try {
    const stats = getAggregatedInventoryStats();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      channels: CHANNELS_SYNC_STATUS,
      stats,
      properties: REALTIME_PROPERTY_INVENTORY,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error reading channel manager inventory" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/channel-manager/sync
 * Webhook endpoint for MakeMyTrip, Booking.com, Google Hotels, and Justdial to push real-time bookings
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      propertyId,
      channel,
      bookingId,
      guestName,
      checkIn,
      checkOut,
      unitsBooked = 1,
    } = body;

    if (!propertyId || !channel || !bookingId) {
      return NextResponse.json(
        { success: false, message: "propertyId, channel, and bookingId are required" },
        { status: 400 }
      );
    }

    const result = recordChannelBooking(
      propertyId,
      channel as ChannelSource,
      bookingId,
      guestName || "OTA Guest",
      checkIn || new Date().toISOString().split("T")[0],
      checkOut || new Date(Date.now() + 86400000).toISOString().split("T")[0],
      Number(unitsBooked) || 1
    );

    return NextResponse.json({
      success: result.success,
      message: result.message,
      availableRemaining: result.availableRemaining,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to record OTA channel booking" },
      { status: 500 }
    );
  }
}
