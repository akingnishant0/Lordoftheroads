export interface AgentTravelBookingRequest {
  serviceType: "FLIGHT" | "HOTEL" | "BUS" | "TRAIN" | "CAB" | "PACKAGE";
  origin?: string;
  destination: string;
  travelDate: string;
  returnDate?: string;
  paxAdults: number;
  paxChildren?: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  selectedOptionTitle: string;
  netB2BAmount: number;
  agentMarkupAmount: number;
  agentCommissionAmount: number;
  totalCustomerAmount: number;
  seatNumbers?: string[]; // for Bus or Flight
  trainClass?: string; // 1A, 2A, 3A, SL, EC
  hotelRooms?: number;
  hotelCategory?: string;
  cabType?: string;
  agentId?: string;
}

export interface AgentTravelBookingRecord {
  id: string;
  bookingRef: string;
  serviceType: string;
  origin?: string;
  destination: string;
  travelDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  selectedOptionTitle: string;
  netB2BAmount: number;
  agentMarkupAmount: number;
  agentCommissionAmount: number;
  totalCustomerAmount: number;
  seatNumbers?: string[];
  status: "CONFIRMED" | "CANCELLED";
  pnrOrVoucher: string;
  createdAt: string;
}

let agentTravelBookings: AgentTravelBookingRecord[] = [
  {
    id: "atb-201",
    bookingRef: "LOTR-AGT-FL-9912",
    serviceType: "FLIGHT",
    origin: "Delhi (DEL)",
    destination: "Goa (GOI)",
    travelDate: "2026-11-18",
    customerName: "Rakesh Gupta",
    customerPhone: "+91 98111 22334",
    customerEmail: "rakesh.g@example.com",
    selectedOptionTitle: "IndiGo 6E-204 (Non-Stop)",
    netB2BAmount: 4400,
    agentMarkupAmount: 500,
    agentCommissionAmount: 250,
    totalCustomerAmount: 5150,
    seatNumbers: ["12D", "12E"],
    status: "CONFIRMED",
    pnrOrVoucher: "6E-PNR-W8R4K1",
    createdAt: "2026-10-24T11:00:00.000Z",
  },
  {
    id: "atb-202",
    bookingRef: "LOTR-AGT-BUS-8832",
    serviceType: "BUS",
    origin: "Bengaluru",
    destination: "Goa",
    travelDate: "2026-11-22",
    customerName: "Praveen Nair",
    customerPhone: "+91 98860 11990",
    customerEmail: "praveen.n@example.com",
    selectedOptionTitle: "KSRTC / IntrCity Volvo Multi-Axle AC Sleeper",
    netB2BAmount: 1250,
    agentMarkupAmount: 150,
    agentCommissionAmount: 100,
    totalCustomerAmount: 1500,
    seatNumbers: ["U4 (Upper Sleeper)"],
    status: "CONFIRMED",
    pnrOrVoucher: "BUS-TKT-990812",
    createdAt: "2026-10-24T12:30:00.000Z",
  },
];

export function createAgentTravelBooking(req: AgentTravelBookingRequest): AgentTravelBookingRecord {
  const dateCode = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  const prefix = req.serviceType.slice(0, 2);
  const bookingRef = `LOTR-AGT-${prefix}-${dateCode}-${rand}`;
  const pnrOrVoucher = `${req.serviceType.slice(0, 3)}-VCH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const record: AgentTravelBookingRecord = {
    id: `atb-${Date.now()}`,
    bookingRef,
    serviceType: req.serviceType,
    origin: req.origin,
    destination: req.destination,
    travelDate: req.travelDate,
    customerName: req.customerName,
    customerPhone: req.customerPhone,
    customerEmail: req.customerEmail,
    selectedOptionTitle: req.selectedOptionTitle,
    netB2BAmount: req.netB2BAmount,
    agentMarkupAmount: req.agentMarkupAmount,
    agentCommissionAmount: req.agentCommissionAmount,
    totalCustomerAmount: req.totalCustomerAmount,
    seatNumbers: req.seatNumbers,
    status: "CONFIRMED",
    pnrOrVoucher,
    createdAt: new Date().toISOString(),
  };

  agentTravelBookings.unshift(record);
  return record;
}

export function getAgentTravelBookings(): AgentTravelBookingRecord[] {
  return agentTravelBookings;
}
