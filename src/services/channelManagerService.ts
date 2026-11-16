/**
 * Channel Manager & Real-Time Multi-OTA Inventory Synchronization Service
 * 
 * Synchronizes property room inventory, availability calendars, and bookings
 * across MakeMyTrip (MMT), Booking.com, Google Hotels/Vacation Rentals,
 * Justdial, and Lord of the Road's direct Agent Network.
 */

export type ChannelSource = "MAKEMYTRIP" | "BOOKING_COM" | "GOOGLE_HOTELS" | "JUSTDIAL" | "LOTR_DIRECT" | "OFFLINE_AGENT";

export interface ChannelSyncStatus {
  channel: ChannelSource;
  displayName: string;
  icon: string;
  status: "CONNECTED" | "SYNCING" | "ERROR" | "IDLE";
  lastSyncAt: string;
  activeListingsCount: number;
  apiProtocol: "REST_WEBHOOK" | "OTA_XML" | "ICAL_FEED" | "PARTNER_CONNECT";
}

export interface RoomInventorySnapshot {
  propertyId: string;
  propertyName: string;
  roomType: string;
  totalInventory: number;
  ratesPerNight: number;
  pinCode: string;
  location: string;
  currentBookings: {
    source: ChannelSource;
    bookingId: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
    unitsBooked: number;
  }[];
  reservedUnits: number;
  availableUnits: number;
  instantBookable: boolean;
  lastSynchronized: string;
}

// Initial Live Inventory Snapshot for Lord of the Road Stays & Camps
export let REALTIME_PROPERTY_INVENTORY: RoomInventorySnapshot[] = [
  {
    propertyId: "lotr-stay-001",
    propertyName: "The Heritage Haveli & Spa (Courtyard Suite)",
    roomType: "Royal Courtyard Heritage Suite",
    totalInventory: 10,
    ratesPerNight: 4200,
    pinCode: "302002",
    location: "Jaipur, Rajasthan",
    currentBookings: [
      {
        source: "MAKEMYTRIP",
        bookingId: "MMT-8829104",
        guestName: "Rohit Malhotra",
        checkIn: "2026-11-13",
        checkOut: "2026-11-15",
        unitsBooked: 2,
      },
      {
        source: "BOOKING_COM",
        bookingId: "BK-499120",
        guestName: "Sarah Jenkins (UK)",
        checkIn: "2026-11-13",
        checkOut: "2026-11-16",
        unitsBooked: 1,
      },
      {
        source: "GOOGLE_HOTELS",
        bookingId: "GOOG-77123",
        guestName: "Aditya Singhal",
        checkIn: "2026-11-14",
        checkOut: "2026-11-15",
        unitsBooked: 1,
      },
      {
        source: "OFFLINE_AGENT",
        bookingId: "LOTR-AGT-2041",
        guestName: "Vikas Meena (Walk-in via Kotputli Agent)",
        checkIn: "2026-11-13",
        checkOut: "2026-11-14",
        unitsBooked: 2,
      },
    ],
    reservedUnits: 6,
    availableUnits: 4, // 10 - 6 = 4 remaining available
    instantBookable: true,
    lastSynchronized: new Date().toISOString(),
  },
  {
    propertyId: "lotr-stay-002",
    propertyName: "Ganga Serene Riverside Yoga Retreat",
    roomType: "Deluxe Ganga View Riverside Cottage",
    totalInventory: 12,
    ratesPerNight: 3800,
    pinCode: "249201",
    location: "Tapovan, Rishikesh, Uttarakhand",
    currentBookings: [
      {
        source: "MAKEMYTRIP",
        bookingId: "MMT-7740211",
        guestName: "Neha Kashyap",
        checkIn: "2026-11-13",
        checkOut: "2026-11-15",
        unitsBooked: 3,
      },
      {
        source: "BOOKING_COM",
        bookingId: "BK-310892",
        guestName: "Marcus Vance",
        checkIn: "2026-11-13",
        checkOut: "2026-11-17",
        unitsBooked: 2,
      },
      {
        source: "JUSTDIAL",
        bookingId: "JD-992014",
        guestName: "Dr. Sandeep Rawat",
        checkIn: "2026-11-14",
        checkOut: "2026-11-16",
        unitsBooked: 2,
      },
    ],
    reservedUnits: 7,
    availableUnits: 5, // 12 - 7 = 5 remaining available
    instantBookable: true,
    lastSynchronized: new Date().toISOString(),
  },
  {
    propertyId: "lotr-stay-003",
    propertyName: "Himalayan Ridge Alpine Chalet & Camp",
    roomType: "Luxury Heated Geodesic Glass Dome",
    totalInventory: 6,
    ratesPerNight: 5500,
    pinCode: "175131",
    location: "Old Manali, Himachal Pradesh",
    currentBookings: [
      {
        source: "BOOKING_COM",
        bookingId: "BK-882103",
        guestName: "Priya & Harsh Mehta",
        checkIn: "2026-11-13",
        checkOut: "2026-11-16",
        unitsBooked: 2,
      },
      {
        source: "LOTR_DIRECT",
        bookingId: "LOTR-DIR-1144",
        guestName: "Kunal Bansal",
        checkIn: "2026-11-13",
        checkOut: "2026-11-15",
        unitsBooked: 2,
      },
    ],
    reservedUnits: 4,
    availableUnits: 2, // 6 - 4 = 2 remaining available
    instantBookable: true,
    lastSynchronized: new Date().toISOString(),
  },
  {
    propertyId: "lotr-stay-004",
    propertyName: "Jim Corbett Wild Tiger Reserve Jungle Lodge",
    roomType: "Forest Canopy Safari Tent",
    totalInventory: 8,
    ratesPerNight: 4800,
    pinCode: "244715",
    location: "Ramnagar, Uttarakhand",
    currentBookings: [
      {
        source: "MAKEMYTRIP",
        bookingId: "MMT-918233",
        guestName: "Amitabh Bhattacharya",
        checkIn: "2026-11-13",
        checkOut: "2026-11-14",
        unitsBooked: 2,
      },
      {
        source: "GOOGLE_HOTELS",
        bookingId: "GOOG-66291",
        guestName: "Deepak Chauhan",
        checkIn: "2026-11-13",
        checkOut: "2026-11-15",
        unitsBooked: 1,
      },
      {
        source: "JUSTDIAL",
        bookingId: "JD-551029",
        guestName: "Rajeev Srivastava",
        checkIn: "2026-11-14",
        checkOut: "2026-11-16",
        unitsBooked: 2,
      },
    ],
    reservedUnits: 5,
    availableUnits: 3, // 8 - 5 = 3 remaining available
    instantBookable: true,
    lastSynchronized: new Date().toISOString(),
  },
];

// Channels Status Tracking
export const CHANNELS_SYNC_STATUS: ChannelSyncStatus[] = [
  {
    channel: "MAKEMYTRIP",
    displayName: "MakeMyTrip (MMT Partner Central)",
    icon: "🔴",
    status: "CONNECTED",
    lastSyncAt: "1 min ago",
    activeListingsCount: 142,
    apiProtocol: "OTA_XML",
  },
  {
    channel: "BOOKING_COM",
    displayName: "Booking.com Connectivity Suite",
    icon: "🔵",
    status: "CONNECTED",
    lastSyncAt: "Just now",
    activeListingsCount: 128,
    apiProtocol: "REST_WEBHOOK",
  },
  {
    channel: "GOOGLE_HOTELS",
    displayName: "Google Hotels & Vacation Rentals",
    icon: "🟢",
    status: "CONNECTED",
    lastSyncAt: "2 mins ago",
    activeListingsCount: 165,
    apiProtocol: "REST_WEBHOOK",
  },
  {
    channel: "JUSTDIAL",
    displayName: "Justdial Verified Highway Stays",
    icon: "🟡",
    status: "CONNECTED",
    lastSyncAt: "4 mins ago",
    activeListingsCount: 89,
    apiProtocol: "PARTNER_CONNECT",
  },
  {
    channel: "OFFLINE_AGENT",
    displayName: "Lord of the Road Village & City Agent Counters",
    icon: "🏢",
    status: "CONNECTED",
    lastSyncAt: "Live Real-Time",
    activeListingsCount: 512,
    apiProtocol: "REST_WEBHOOK",
  },
];

/**
 * Sync an incoming booking from an external OTA channel
 */
export function recordChannelBooking(
  propertyId: string,
  source: ChannelSource,
  bookingId: string,
  guestName: string,
  checkIn: string,
  checkOut: string,
  unitsBooked: number
): { success: boolean; availableRemaining: number; message: string } {
  const item = REALTIME_PROPERTY_INVENTORY.find((p) => p.propertyId === propertyId);
  if (!item) {
    return { success: false, availableRemaining: 0, message: "Property not found" };
  }

  if (item.availableUnits < unitsBooked) {
    return {
      success: false,
      availableRemaining: item.availableUnits,
      message: `Overbooking prevented! Only ${item.availableUnits} units available, requested ${unitsBooked}.`,
    };
  }

  item.currentBookings.unshift({
    source,
    bookingId,
    guestName,
    checkIn,
    checkOut,
    unitsBooked,
  });

  item.reservedUnits += unitsBooked;
  item.availableUnits = Math.max(0, item.totalInventory - item.reservedUnits);
  item.lastSynchronized = new Date().toISOString();

  return {
    success: true,
    availableRemaining: item.availableUnits,
    message: `Synchronized ${unitsBooked} units with ${source}. ${item.availableUnits} remaining.`,
  };
}

/**
 * Get aggregated live inventory counts across all channels
 */
export function getAggregatedInventoryStats() {
  const totalProperties = REALTIME_PROPERTY_INVENTORY.length;
  const totalRooms = REALTIME_PROPERTY_INVENTORY.reduce((sum, p) => sum + p.totalInventory, 0);
  const totalReserved = REALTIME_PROPERTY_INVENTORY.reduce((sum, p) => sum + p.reservedUnits, 0);
  const totalAvailable = REALTIME_PROPERTY_INVENTORY.reduce((sum, p) => sum + p.availableUnits, 0);

  const bookingsByChannel: Record<ChannelSource, number> = {
    MAKEMYTRIP: 0,
    BOOKING_COM: 0,
    GOOGLE_HOTELS: 0,
    JUSTDIAL: 0,
    LOTR_DIRECT: 0,
    OFFLINE_AGENT: 0,
  };

  REALTIME_PROPERTY_INVENTORY.forEach((p) => {
    p.currentBookings.forEach((b) => {
      bookingsByChannel[b.source] = (bookingsByChannel[b.source] || 0) + b.unitsBooked;
    });
  });

  return {
    totalProperties,
    totalRooms,
    totalReserved,
    totalAvailable,
    occupancyRate: Math.round((totalReserved / totalRooms) * 100),
    bookingsByChannel,
  };
}
