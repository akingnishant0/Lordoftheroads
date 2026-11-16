import { prisma } from "@/lib/prisma";
import { ServiceType, PaymentStatus } from "@prisma/client";

export interface BookingTraveller {
  fullName: string;
  age: number;
  gender: string;
  idProofType?: string;
  idProofNumber?: string;
}

export interface CreateBookingPayload {
  serviceType: string;
  destination: string;
  origin?: string;
  travelDateStart: string;
  travelDateEnd?: string;
  paxAdults: number;
  paxChildren?: number;
  rooms?: number;
  selectedOptionTitle: string;
  selectedOptionTier: "Economy" | "Standard" | "Premium";
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
  travellers: BookingTraveller[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequests?: string;
  paymentMethod: string;
  paymentAuthId?: string;
  userId?: string | null;
}

export interface BookingRecord {
  id: string;
  bookingNumber: string;
  serviceType: string;
  destination: string;
  origin?: string;
  travelDateStart: string;
  travelDateEnd?: string;
  paxAdults: number;
  paxChildren: number;
  rooms: number;
  selectedOptionTitle: string;
  selectedOptionTier: string;
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: "CONFIRMED" | "PENDING" | "CANCELLED" | "REFUNDED";
  paymentMethod: string;
  paymentAuthId: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  travellers: BookingTraveller[];
  status: "UPCOMING" | "COMPLETED" | "CANCELLED";
  providerConfirmationRef: string;
  cancellationAllowedUntil: string;
  createdAt: string;
  refundStatus?: "NONE" | "REQUESTED" | "APPROVED" | "PROCESSING" | "CREDITED";
  refundAmount?: number;
}

// In-Memory store for bookings with demo sample records
let inMemoryBookings: BookingRecord[] = [
  {
    id: "bk-101",
    bookingNumber: "LOTR-BK-20261024-7801",
    serviceType: "Holiday package",
    destination: "Kerala Backwaters & Munnar",
    origin: "Bengaluru",
    travelDateStart: "2026-11-15",
    travelDateEnd: "2026-11-20",
    paxAdults: 2,
    paxChildren: 0,
    rooms: 1,
    selectedOptionTitle: "Private Houseboat + Tea Estate Resort",
    selectedOptionTier: "Standard",
    baseAmount: 38000,
    taxAmount: 1900,
    totalAmount: 39900,
    paidAmount: 39900,
    paymentStatus: "CONFIRMED",
    paymentMethod: "UPI / Razorpay Verified",
    paymentAuthId: "pay_rzp_live_7891234",
    contactName: "Rohan Sharma",
    contactEmail: "rohan.sharma@example.com",
    contactPhone: "+91 98765 43210",
    travellers: [
      { fullName: "Rohan Sharma", age: 32, gender: "Male", idProofType: "Aadhaar", idProofNumber: "XXXX-XXXX-4589" },
      { fullName: "Ananya Sharma", age: 29, gender: "Female", idProofType: "Aadhaar", idProofNumber: "XXXX-XXXX-8912" },
    ],
    status: "UPCOMING",
    providerConfirmationRef: "KER-CONF-90214",
    cancellationAllowedUntil: "2026-11-05",
    createdAt: "2026-10-24T08:30:00.000Z",
    refundStatus: "NONE",
  },
  {
    id: "bk-102",
    bookingNumber: "LOTR-BK-20261024-5502",
    serviceType: "Hotel",
    destination: "The Heritage Haveli & Spa, Jaipur",
    travelDateStart: "2026-12-22",
    travelDateEnd: "2026-12-25",
    paxAdults: 2,
    paxChildren: 1,
    rooms: 1,
    selectedOptionTitle: "Royal Courtyard Suite with Breakfast",
    selectedOptionTier: "Premium",
    baseAmount: 24000,
    taxAmount: 1200,
    totalAmount: 25200,
    paidAmount: 25200,
    paymentStatus: "CONFIRMED",
    paymentMethod: "Credit Card / Razorpay",
    paymentAuthId: "pay_rzp_live_1102934",
    contactName: "Vikram Malhotra",
    contactEmail: "vikram.m@example.com",
    contactPhone: "+91 98200 12345",
    travellers: [
      { fullName: "Vikram Malhotra", age: 40, gender: "Male", idProofType: "Passport", idProofNumber: "Z5891204" },
      { fullName: "Pooja Malhotra", age: 36, gender: "Female", idProofType: "Passport", idProofNumber: "Z5891205" },
      { fullName: "Aarav Malhotra", age: 8, gender: "Male" },
    ],
    status: "UPCOMING",
    providerConfirmationRef: "JPR-HAV-7788",
    cancellationAllowedUntil: "2026-12-10",
    createdAt: "2026-10-24T09:15:00.000Z",
    refundStatus: "NONE",
  },
  {
    id: "bk-103",
    bookingNumber: "LOTR-BK-20260910-3341",
    serviceType: "Flight",
    destination: "Goa (GOI)",
    origin: "Delhi (DEL)",
    travelDateStart: "2026-09-15",
    travelDateEnd: "2026-09-18",
    paxAdults: 1,
    paxChildren: 0,
    rooms: 0,
    selectedOptionTitle: "IndiGo Non-Stop (6E-502)",
    selectedOptionTier: "Economy",
    baseAmount: 8500,
    taxAmount: 750,
    totalAmount: 9250,
    paidAmount: 9250,
    paymentStatus: "CONFIRMED",
    paymentMethod: "NetBanking",
    paymentAuthId: "pay_net_6782109",
    contactName: "Pooja Mehta",
    contactEmail: "pooja.mehta@example.com",
    contactPhone: "+91 98110 99887",
    travellers: [
      { fullName: "Pooja Mehta", age: 27, gender: "Female", idProofType: "PAN", idProofNumber: "ABCDE1234F" },
    ],
    status: "COMPLETED",
    providerConfirmationRef: "6E-PNR-K7G9L2",
    cancellationAllowedUntil: "2026-09-12",
    createdAt: "2026-09-10T11:00:00.000Z",
    refundStatus: "NONE",
  },
];

export async function createBooking(data: CreateBookingPayload): Promise<BookingRecord> {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const bookingNumber = `LOTR-BK-${dateStr}-${randomSuffix}`;
  const providerRef = `PRV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const cancellationDate = new Date(data.travelDateStart);
  cancellationDate.setDate(cancellationDate.getDate() - 7);

  const newBooking: BookingRecord = {
    id: `bk-${Date.now()}`,
    bookingNumber,
    serviceType: data.serviceType,
    destination: data.destination,
    origin: data.origin,
    travelDateStart: data.travelDateStart,
    travelDateEnd: data.travelDateEnd,
    paxAdults: data.paxAdults || 1,
    paxChildren: data.paxChildren || 0,
    rooms: data.rooms || 1,
    selectedOptionTitle: data.selectedOptionTitle,
    selectedOptionTier: data.selectedOptionTier,
    baseAmount: data.baseAmount,
    taxAmount: data.taxAmount,
    totalAmount: data.totalAmount,
    paidAmount: data.totalAmount,
    paymentStatus: "CONFIRMED",
    paymentMethod: data.paymentMethod || "UPI / Razorpay",
    paymentAuthId: data.paymentAuthId || `pay_auth_${Date.now()}`,
    contactName: data.contactName,
    contactEmail: data.contactEmail,
    contactPhone: data.contactPhone,
    travellers: data.travellers || [],
    status: "UPCOMING",
    providerConfirmationRef: providerRef,
    cancellationAllowedUntil: cancellationDate.toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
    refundStatus: "NONE",
  };

  inMemoryBookings.unshift(newBooking);

  // Attempt database sync if PostgreSQL is online
  try {
    if (prisma) {
      await prisma.booking.create({
        data: {
          bookingNumber,
          totalAmount: data.totalAmount,
          paidAmount: data.totalAmount,
          paymentStatus: PaymentStatus.PAID,
          razorpayPaymentId: newBooking.paymentAuthId,
          travelDate: new Date(data.travelDateStart),
          notes: JSON.stringify({
            destination: data.destination,
            origin: data.origin,
            serviceType: data.serviceType,
            tier: data.selectedOptionTier,
            travellers: data.travellers,
            providerConfirmationRef: providerRef,
          }),
        },
      });
    }
  } catch {
    // In-memory fallback
  }

  return newBooking;
}

export async function getBookings(filter?: {
  status?: string;
  email?: string;
  phone?: string;
}): Promise<BookingRecord[]> {
  let records = [...inMemoryBookings];

  if (filter?.status && filter.status !== "ALL") {
    records = records.filter((r) => r.status === filter.status);
  }

  if (filter?.email) {
    const qEmail = filter.email.toLowerCase().trim();
    records = records.filter((r) => r.contactEmail?.toLowerCase() === qEmail);
  }

  if (filter?.phone) {
    const cleanPhone = filter.phone.replace(/[^\d]/g, "");
    records = records.filter((r) => r.contactPhone?.replace(/[^\d]/g, "").includes(cleanPhone));
  }

  return records;
}

export async function cancelBooking(
  bookingId: string,
  reason: string
): Promise<{ success: boolean; booking: BookingRecord; refundEstimate: number; message: string }> {
  const index = inMemoryBookings.findIndex((b) => b.id === bookingId || b.bookingNumber === bookingId);
  if (index === -1) {
    throw new Error("Booking not found");
  }

  const booking = inMemoryBookings[index];
  const travelDate = new Date(booking.travelDateStart);
  const now = new Date();
  const diffDays = Math.ceil((travelDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  let refundPercent = 0.5; // default 50%
  if (diffDays >= 30) refundPercent = 0.9;
  else if (diffDays >= 15) refundPercent = 0.75;
  else if (diffDays >= 7) refundPercent = 0.5;
  else refundPercent = 0.1; // last minute

  const refundEstimate = Math.round(booking.totalAmount * refundPercent);

  booking.status = "CANCELLED";
  booking.paymentStatus = "CANCELLED";
  booking.refundStatus = "PROCESSING";
  booking.refundAmount = refundEstimate;

  inMemoryBookings[index] = booking;

  return {
    success: true,
    booking,
    refundEstimate,
    message: `Cancellation initiated. As per cancellation policy (${diffDays} days before departure), an estimated refund of ₹${refundEstimate.toLocaleString("en-IN")} will be credited to your original payment method in 5-7 business days.`,
  };
}
