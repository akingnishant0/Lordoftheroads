"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { BookingRecord } from "@/services/bookingService";

interface TravellerProfile {
  id: string;
  fullName: string;
  gender: string;
  dob: string;
  idProofType: string;
  idProofNumber: string;
  phone: string;
}

const DEFAULT_CUSTOMER_BOOKINGS: BookingRecord[] = [
  {
    id: "bk-cust-1",
    bookingNumber: "LOTR-884210",
    serviceType: "Holiday Packages",
    destination: "Kashmir Valley",
    origin: "New Delhi",
    travelDateStart: "15 Apr 2026",
    travelDateEnd: "21 Apr 2026",
    adults: 2,
    children: 0,
    rooms: 1,
    budget: 59848,
    selectedOptionTier: "Premium",
    selectedOptionTitle: "Heritage Cedar Houseboat + Mountain Glade Resort",
    totalAmount: 59848,
    gstAmount: 2849,
    netPayable: 59848,
    travellers: [
      { fullName: "Rohan Sharma", phone: "+91 98765 43210", email: "rohan@example.com", idType: "Aadhaar Card", idNumber: "XXXX-4821" },
      { fullName: "Ananya Sharma", phone: "+91 98765 43211", email: "ananya@example.com", idType: "Passport", idNumber: "Z5891204" },
    ],
    paymentMethod: "UPI Authorization (Success)",
    providerConfirmationRef: "IRCTC/KSH-9921",
    status: "UPCOMING",
    createdAt: new Date().toISOString(),
    cancellationSummary: "Free cancellation up to 7 days before departure.",
  },
  {
    id: "bk-cust-2",
    bookingNumber: "LOTR-731902",
    serviceType: "Train Tickets",
    destination: "Varanasi Jn",
    origin: "New Delhi",
    travelDateStart: "02 Mar 2026",
    adults: 2,
    children: 0,
    rooms: 1,
    budget: 3675,
    selectedOptionTier: "Executive Chair Car",
    selectedOptionTitle: "Vande Bharat Express (22436)",
    totalAmount: 3675,
    gstAmount: 175,
    netPayable: 3675,
    travellers: [
      { fullName: "Rohan Sharma", phone: "+91 98765 43210", email: "rohan@example.com", idType: "Aadhaar", idNumber: "XXXX-4821" },
    ],
    paymentMethod: "Net Banking",
    providerConfirmationRef: "PNR-2481029481",
    status: "COMPLETED",
    createdAt: "2026-03-01T10:00:00Z",
    cancellationSummary: "Completed journey.",
  },
];

export default function CustomerDashboardPage() {
  const { data: session } = useSession();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<
    "upcoming_trips" | "booking_history" | "traveller_profiles" | "payments" | "cancellations" | "refund_status" | "support"
  >("upcoming_trips");

  const [bookings, setBookings] = useState<BookingRecord[]>(DEFAULT_CUSTOMER_BOOKINGS);
  const [loading, setLoading] = useState(false);

  // Cancellation modal state
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelSubmitting, setCancelSubmitting] = useState(false);
  const [cancelResult, setCancelResult] = useState<string | null>(null);

  // Saved Travellers
  const [travellers, setTravellers] = useState<TravellerProfile[]>([
    {
      id: "tr-1",
      fullName: session?.user?.name || "Rohan Sharma",
      gender: "Male",
      dob: "1994-05-12",
      idProofType: "Aadhaar Card",
      idProofNumber: "XXXX-XXXX-4589",
      phone: (session?.user as any)?.phone || "+91 98765 43210",
    },
    {
      id: "tr-2",
      fullName: "Ananya Sharma",
      gender: "Female",
      dob: "1997-09-24",
      idProofType: "Passport",
      idProofNumber: "Z5891204",
      phone: "+91 98765 43211",
    },
  ]);

  const [newTravellerName, setNewTravellerName] = useState("");
  const [newTravellerGender, setNewTravellerGender] = useState("Male");
  const [newTravellerDob, setNewTravellerDob] = useState("");
  const [newTravellerIdType, setNewTravellerIdType] = useState("Aadhaar Card");
  const [newTravellerIdNum, setNewTravellerIdNum] = useState("");
  const [newTravellerPhone, setNewTravellerPhone] = useState("");
  const [showAddTraveller, setShowAddTraveller] = useState(false);

  // Support Ticket Form
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMsg, setTicketMsg] = useState("");
  const [ticketSent, setTicketSent] = useState(false);

  const fetchBookings = () => {
    setLoading(true);
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (data.bookings && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancellingBookingId) return;
    setCancelSubmitting(true);
    setCancelResult(null);

    try {
      const res = await fetch(`/api/bookings/${encodeURIComponent(cancellingBookingId)}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: cancelReason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to cancel booking.");

      setCancelResult(data.message);
      fetchBookings();
      setTimeout(() => {
        setCancellingBookingId(null);
        setCancelReason("");
        setCancelResult(null);
        setActiveTab("cancellations");
      }, 2500);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCancelSubmitting(false);
    }
  };

  const handleAddTraveller = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTravellerName) return;

    setTravellers([
      ...travellers,
      {
        id: `tr-${Date.now()}`,
        fullName: newTravellerName,
        gender: newTravellerGender,
        dob: newTravellerDob || "1995-01-01",
        idProofType: newTravellerIdType,
        idProofNumber: newTravellerIdNum || "Verified",
        phone: newTravellerPhone || "+91 98000 00000",
      },
    ]);

    setNewTravellerName("");
    setNewTravellerDob("");
    setNewTravellerIdNum("");
    setNewTravellerPhone("");
    setShowAddTraveller(false);
  };

  const upcomingBookings = bookings.filter((b) => b.status === "UPCOMING");
  const pastBookings = bookings.filter((b) => b.status === "COMPLETED");
  const cancelledBookings = bookings.filter((b) => b.status === "CANCELLED");

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-[#242A28]">
      {/* Top Luxury Editorial Hero Banner */}
      <div className="p-8 bg-[#173D32] text-[#FAF8F4] rounded-3xl border border-[#287C70]/40 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B7955B] animate-pulse"></span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#B7955B]">
              THE TRAVELER&apos;S LOUNGE
            </span>
            <span className="text-white/40">•</span>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#287C70]/50 text-[#EDE5D8]">
              Tier: Gold Road Explorer
            </span>
          </div>

          <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
            Welcome, {session?.user?.name || "Rohan Sharma"}
          </h1>
          <p className="text-xs text-[#EDE5D8] max-w-xl leading-relaxed">
            Manage your journeys, download certified provider travel vouchers, track real-time refunds, and access your 24/7 concierge.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <Link
            href="/holiday-packages"
            className="px-4 py-2.5 bg-[#B7955B] hover:bg-[#a3844f] text-[#173D32] font-bold text-xs rounded-xl transition shadow-sm"
          >
            + Plan New Journey
          </Link>
          <Link
            href="/travel-agent"
            className="px-4 py-2.5 bg-[#287C70] hover:bg-[#1f6258] text-white font-semibold text-xs rounded-xl transition shadow-sm flex items-center gap-1.5"
          >
            <span>🤖 AI Concierge</span>
          </Link>
        </div>
      </div>

      {/* 4 Quick Performance Metric Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E7E6E0] p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#737B76] mb-1">
            <span>Upcoming Journeys</span>
            <span>✈️</span>
          </div>
          <div className="font-serif text-2xl font-bold text-[#173D32]">
            {upcomingBookings.length} Active
          </div>
          <span className="text-[10px] text-emerald-700 font-medium">100% Guaranteed</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E7E6E0] p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#737B76] mb-1">
            <span>Completed Trips</span>
            <span>📜</span>
          </div>
          <div className="font-serif text-2xl font-bold text-[#173D32]">
            {pastBookings.length || 2} Journeys
          </div>
          <span className="text-[10px] text-[#737B76]">Since Jan 2026</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E7E6E0] p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#737B76] mb-1">
            <span>Co-Traveller Profiles</span>
            <span>👥</span>
          </div>
          <div className="font-serif text-2xl font-bold text-[#173D32]">
            {travellers.length} Saved
          </div>
          <span className="text-[10px] text-[#287C70] font-medium">1-Click Fast Checkout</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E7E6E0] p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#737B76] mb-1">
            <span>Support Helpline</span>
            <span>🎧</span>
          </div>
          <div className="font-serif text-lg font-bold text-[#173D32]">
            +91 98765 43210
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">24/7 Live Desk</span>
        </div>
      </div>

      {/* Navigation Tabs (7 Features) */}
      <div className="flex border-b border-[#E7E6E0] overflow-x-auto gap-2 text-xs font-semibold scrollbar-none pb-0.5">
        {[
          { id: "upcoming_trips", label: `Upcoming Trips (${upcomingBookings.length})`, icon: "✈️" },
          { id: "booking_history", label: `Booking History (${pastBookings.length})`, icon: "📜" },
          { id: "traveller_profiles", label: `Saved Travellers (${travellers.length})`, icon: "👥" },
          { id: "payments", label: "Payments & Invoices", icon: "💳" },
          { id: "cancellations", label: `Cancellations (${cancelledBookings.length})`, icon: "❌" },
          { id: "refund_status", label: "Refund Status Tracker", icon: "🔄" },
          { id: "support", label: "24/7 Support Desk", icon: "🎧" },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                active
                  ? "bg-white text-[#173D32] border-t-2 border-x border-[#E7E6E0] border-t-[#B7955B] font-bold shadow-xs"
                  : "text-[#737B76] hover:text-[#173D32] hover:bg-white/50"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Upcoming Trips */}
      {activeTab === "upcoming_trips" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-lg text-[#173D32]">
              Confirmed Active Reservations
            </h3>
            <span className="text-xs text-[#737B76]">
              All provider vouchers are live, verified, and ready for departure.
            </span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-[#737B76]">Loading active trips...</div>
          ) : upcomingBookings.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E7E6E0] rounded-2xl space-y-3 shadow-xs">
              <span className="text-4xl">🎒</span>
              <h4 className="font-serif font-bold text-lg text-[#173D32]">
                No upcoming trips planned yet
              </h4>
              <p className="text-xs text-[#737B76] max-w-sm mx-auto leading-relaxed">
                Ready for the open road? Browse handcrafted holiday packages or let our AI travel concierge architect your journey.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/holiday-packages"
                  className="px-5 py-2.5 bg-[#173D32] hover:bg-[#287C70] text-white rounded-xl text-xs font-semibold transition"
                >
                  Explore Packages →
                </Link>
                <Link
                  href="/travel-agent"
                  className="px-5 py-2.5 border border-[#173D32] text-[#173D32] hover:bg-[#FAF8F4] rounded-xl text-xs font-semibold transition"
                >
                  Plan with AI Concierge 🤖
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {upcomingBookings.map((bk) => (
                <div
                  key={bk.id}
                  className="p-6 bg-white border border-[#E7E6E0] rounded-2xl shadow-xs hover:border-[#287C70]/60 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-[#E7E6E0] pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-[#FAF8F4] border border-[#E7E6E0] text-[#173D32] rounded-md font-bold text-[10px] uppercase">
                          {bk.serviceType}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#287C70]">
                          {bk.bookingNumber}
                        </span>
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 rounded-full font-bold text-[10px]">
                          ✓ CONFIRMED & GUARANTEED
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xl text-[#173D32] mt-1.5">
                        {bk.destination} {bk.origin ? `(From: ${bk.origin})` : ""}
                      </h4>
                      <p className="text-xs text-[#737B76]">{bk.selectedOptionTitle}</p>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-2xl font-serif font-bold text-[#173D32]">
                        ₹{bk.totalAmount.toLocaleString("en-IN")}
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium">● {bk.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#FAF8F4] p-4 rounded-xl border border-[#E7E6E0]">
                    <div>
                      <span className="text-[10px] uppercase text-[#737B76] font-bold block">Travel Start</span>
                      <b className="text-sm text-[#173D32]">{bk.travelDateStart}</b>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#737B76] font-bold block">Check-out / Return</span>
                      <b className="text-sm text-[#173D32]">{bk.travelDateEnd || "Open Return"}</b>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#737B76] font-bold block">Party Size</span>
                      <b className="text-sm text-[#173D32]">{bk.travellers.length} Adult(s)</b>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#737B76] font-bold block">Provider Voucher</span>
                      <b className="font-mono text-xs text-[#287C70]">{bk.providerConfirmationRef}</b>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-[#737B76]">
                      <span>📞 Assigned Chauffeur & Dispatch Desk: <b>+91 98765 43210</b></span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/my-trips/${bk.bookingNumber}`}
                        className="px-4 py-2 border border-[#173D32] text-[#173D32] rounded-xl text-xs font-semibold hover:bg-[#FAF8F4] transition"
                      >
                        View Full Voucher ➔
                      </Link>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="px-4 py-2 bg-[#FAF8F4] border border-[#E7E6E0] text-[#242A28] rounded-xl text-xs font-semibold hover:bg-[#EDE5D8]"
                      >
                        🖨️ Print
                      </button>
                      <button
                        type="button"
                        onClick={() => setCancellingBookingId(bk.id)}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold transition"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Booking History */}
      {activeTab === "booking_history" && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#173D32]">
            Past Journeys & Travel Archive
          </h3>
          {pastBookings.length === 0 ? (
            <div className="p-8 text-center bg-white border border-[#E7E6E0] rounded-2xl text-xs text-[#737B76]">
              No past completed trips on record.
            </div>
          ) : (
            <div className="space-y-3">
              {pastBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 bg-white border border-[#E7E6E0] rounded-2xl flex justify-between items-center text-xs shadow-xs"
                >
                  <div>
                    <span className="font-mono text-[#737B76]">{b.bookingNumber}</span>
                    <h5 className="font-serif font-bold text-[#173D32] text-base">{b.destination}</h5>
                    <p className="text-[#737B76]">{b.travelDateStart} · {b.serviceType}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-lg font-bold text-[#173D32]">₹{b.totalAmount.toLocaleString("en-IN")}</div>
                    <span className="text-[10px] text-emerald-700 font-bold">● COMPLETED</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Saved Traveller Profiles */}
      {activeTab === "traveller_profiles" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#173D32]">
                Saved Passenger Dossiers
              </h3>
              <p className="text-xs text-[#737B76]">
                Save family and co-traveller details for seamless 1-click checkout without re-entering ID proofs.
              </p>
            </div>
            <button
              onClick={() => setShowAddTraveller(!showAddTraveller)}
              className="px-4 py-2 bg-[#173D32] text-white rounded-xl text-xs font-semibold hover:bg-[#287C70] transition"
            >
              {showAddTraveller ? "Close Form" : "+ Add New Traveller"}
            </button>
          </div>

          {showAddTraveller && (
            <form onSubmit={handleAddTraveller} className="p-6 bg-white border border-[#287C70] rounded-2xl space-y-4 shadow-sm">
              <h4 className="font-serif font-bold text-sm text-[#173D32]">
                Add Passenger Dossier
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#173D32] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newTravellerName}
                    onChange={(e) => setNewTravellerName(e.target.value)}
                    placeholder="As shown on Passport / Aadhaar"
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl text-xs bg-white focus:outline-none focus:border-[#173D32]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#173D32] mb-1">Gender</label>
                  <select
                    value={newTravellerGender}
                    onChange={(e) => setNewTravellerGender(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl text-xs bg-white"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#173D32] mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={newTravellerDob}
                    onChange={(e) => setNewTravellerDob(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#173D32] mb-1">ID Proof Type</label>
                  <select
                    value={newTravellerIdType}
                    onChange={(e) => setNewTravellerIdType(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl text-xs bg-white"
                  >
                    <option>Aadhaar Card</option>
                    <option>Passport</option>
                    <option>Voter ID</option>
                    <option>Driving License</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#173D32] mb-1">ID Proof Number</label>
                  <input
                    type="text"
                    value={newTravellerIdNum}
                    onChange={(e) => setNewTravellerIdNum(e.target.value)}
                    placeholder="e.g. XXXX-XXXX-1234"
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#173D32] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={newTravellerPhone}
                    onChange={(e) => setNewTravellerPhone(e.target.value)}
                    placeholder="+91"
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl text-xs bg-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#173D32] text-white rounded-xl text-xs font-semibold hover:bg-[#287C70] transition"
              >
                Save Passenger Dossier
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {travellers.map((tr) => (
              <div key={tr.id} className="p-5 bg-white border border-[#E7E6E0] rounded-2xl text-xs space-y-1.5 shadow-xs">
                <div className="flex justify-between items-center">
                  <b className="font-serif text-base text-[#173D32]">{tr.fullName}</b>
                  <span className="px-2.5 py-0.5 bg-[#FAF8F4] border border-[#E7E6E0] rounded-md text-[10px] font-bold text-[#173D32]">
                    {tr.gender}
                  </span>
                </div>
                <p className="text-[#737B76]">Date of Birth: {tr.dob}</p>
                <p className="text-[#242A28]"><b>{tr.idProofType}:</b> {tr.idProofNumber}</p>
                <p className="text-[#737B76]">📞 {tr.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Payments & Invoices */}
      {activeTab === "payments" && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#173D32]">
            Payment Ledger & Official GST Invoices
          </h3>

          <div className="bg-white border border-[#E7E6E0] rounded-2xl overflow-hidden text-xs shadow-xs">
            <table className="w-full text-left">
              <thead className="bg-[#FAF8F4] text-[#173D32] font-semibold uppercase text-[10px] tracking-wider border-b border-[#E7E6E0]">
                <tr>
                  <th className="p-3.5">Booking Ref</th>
                  <th className="p-3.5">Destination / Service</th>
                  <th className="p-3.5">Payment Method</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E6E0]">
                {bookings.map((bk) => (
                  <tr key={bk.id} className="hover:bg-[#FAF8F4]/50 transition">
                    <td className="p-3.5 font-mono font-bold text-[#287C70]">{bk.bookingNumber}</td>
                    <td className="p-3.5 font-medium">{bk.destination}</td>
                    <td className="p-3.5 text-[#737B76]">{bk.paymentMethod}</td>
                    <td className="p-3.5 font-bold text-[#173D32]">₹{bk.totalAmount.toLocaleString("en-IN")}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800">
                        {bk.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 border border-[#173D32] text-[#173D32] rounded-lg text-xs font-semibold hover:bg-[#173D32] hover:text-white transition"
                      >
                        PDF Receipt ⬇
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Cancellations */}
      {activeTab === "cancellations" && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#173D32]">
            Cancelled Reservations
          </h3>
          {cancelledBookings.length === 0 ? (
            <div className="p-8 text-center bg-white border border-[#E7E6E0] rounded-2xl text-xs text-[#737B76]">
              No cancelled bookings. All active trips are on track!
            </div>
          ) : (
            <div className="space-y-3">
              {cancelledBookings.map((bk) => (
                <div
                  key={bk.id}
                  className="p-5 bg-white border border-red-200 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs shadow-xs"
                >
                  <div>
                    <span className="font-mono text-red-600 font-bold">{bk.bookingNumber}</span>
                    <h5 className="font-serif font-bold text-[#173D32] text-base">{bk.destination}</h5>
                    <p className="text-[#737B76]">Scheduled Departure: {bk.travelDateStart}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="px-2.5 py-0.5 bg-red-50 text-red-800 rounded-full font-bold text-[10px]">
                      CANCELLED
                    </span>
                    <div className="mt-1 font-semibold text-emerald-700">
                      Refund Amount: ₹{(bk.refundAmount || 0).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: Refund Status Tracker */}
      {activeTab === "refund_status" && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#173D32]">
            Refund Status Tracker
          </h3>
          <p className="text-xs text-[#737B76]">
            Track bank processing and credit timelines for any cancelled reservations.
          </p>

          <div className="p-6 bg-white border border-[#E7E6E0] rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E7E6E0] pb-3">
              <div>
                <b className="font-serif text-base text-[#173D32]">Standard Bank Refund Cycle: 3-5 Business Days</b>
                <p className="text-xs text-[#737B76]">Refunds are initiated directly to your original payment method (UPI / Bank Account).</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-semibold">
                Auto-Verification Active
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center text-xs pt-2">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-xl">1️⃣</span>
                <b className="block mt-1 text-emerald-900">Request Received</b>
                <small className="text-[#737B76]">Instant</small>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-xl">2️⃣</span>
                <b className="block mt-1 text-emerald-900">Policy Approved</b>
                <small className="text-[#737B76]">Within 4 Hours</small>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="text-xl">3️⃣</span>
                <b className="block mt-1 text-amber-900">Bank Processing</b>
                <small className="text-[#737B76]">2-4 Business Days</small>
              </div>
              <div className="p-3 bg-[#FAF8F4] border border-[#E7E6E0] rounded-xl">
                <span className="text-xl">4️⃣</span>
                <b className="block mt-1 text-[#242A28]">Account Credited</b>
                <small className="text-[#737B76]">Confirmation SMS</small>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: 24/7 Support Desk */}
      {activeTab === "support" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border border-[#E7E6E0] rounded-2xl space-y-4 shadow-xs">
            <h3 className="font-serif font-bold text-lg text-[#173D32]">
              24/7 Dedicated Trip Concierge
            </h3>
            <p className="text-xs text-[#737B76] leading-relaxed">
              Need on-tour coordination or want to adjust your itinerary? Our team of resident destination specialists is always available.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 p-3.5 bg-[#FAF8F4] border border-[#E7E6E0] rounded-xl">
                <span className="text-2xl">📞</span>
                <div>
                  <b className="text-[#173D32]">24/7 Emergency Line:</b>
                  <p className="text-[#737B76] font-bold">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-[#FAF8F4] border border-[#E7E6E0] rounded-xl">
                <span className="text-2xl">💬</span>
                <div>
                  <b className="text-[#173D32]">WhatsApp Dispatch Desk:</b>
                  <p className="text-[#737B76]">Direct link with your assigned local driver</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-[#FAF8F4] border border-[#E7E6E0] rounded-xl">
                <span className="text-2xl">✉️</span>
                <div>
                  <b className="text-[#173D32]">Email Support:</b>
                  <p className="text-[#737B76]">concierge@lordoftheroad.in</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-[#E7E6E0] rounded-2xl space-y-4 shadow-xs">
            <h3 className="font-serif font-bold text-lg text-[#173D32]">
              Raise a Priority Concierge Ticket
            </h3>

            {ticketSent ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs space-y-1">
                <b>✓ Ticket Submitted! Reference #TKT-89012</b>
                <p>An on-duty support executive will contact your registered phone number within 15 minutes.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setTicketSent(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-[11px] font-semibold text-[#173D32] mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. Flight rescheduling, cab pickup change, invoice query"
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl text-xs bg-white focus:outline-none focus:border-[#173D32]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#173D32] mb-1">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    value={ticketMsg}
                    onChange={(e) => setTicketMsg(e.target.value)}
                    placeholder="Describe your issue or request..."
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl text-xs bg-white focus:outline-none focus:border-[#173D32]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#173D32] text-white rounded-xl text-xs font-semibold hover:bg-[#287C70] transition"
                >
                  Submit Concierge Ticket ➔
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Cancellation Modal */}
      {cancellingBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#E7E6E0] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h4 className="font-serif font-bold text-base text-red-600">
                Cancel Trip Booking
              </h4>
              <button
                type="button"
                onClick={() => setCancellingBookingId(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#737B76] leading-relaxed">
              Are you sure you want to cancel this booking? Refund will be calculated automatically based on the policy rules for your travel date.
            </p>

            <form onSubmit={handleCancelBooking} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#242A28] mb-1">
                  Reason for cancellation
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl text-xs bg-white"
                >
                  <option value="">Select reason...</option>
                  <option>Change of travel dates</option>
                  <option>Medical or emergency reason</option>
                  <option>Personal schedule conflict</option>
                  <option>Found alternative arrangements</option>
                </select>
              </div>

              {cancelResult && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs">
                  {cancelResult}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCancellingBookingId(null)}
                  className="px-4 py-2 border border-[#E7E6E0] rounded-xl text-xs"
                >
                  Keep Booking
                </button>
                <button
                  type="submit"
                  disabled={cancelSubmitting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold"
                >
                  {cancelSubmitting ? "Processing..." : "Confirm Cancellation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
