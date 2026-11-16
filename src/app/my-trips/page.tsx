"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { getDashboardPath, getDashboardLabel } from "@/lib/utils";

interface BookingRecord {
  id: string;
  title: string;
  travelDate: string;
  travellers: number;
  primaryGuest: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  totalPaid: number;
  category?: string;
}

const DEFAULT_BOOKINGS: BookingRecord[] = [
  {
    id: "LOTR-884210",
    title: "Kashmir Valley 6D/5N Holiday Package",
    travelDate: "15 April 2026",
    travellers: 2,
    primaryGuest: "Rohan Sharma",
    status: "CONFIRMED",
    totalPaid: 59848,
    category: "Holiday Package",
  },
  {
    id: "LOTR-731902",
    title: "Vande Bharat Express (NDLS - BSB)",
    travelDate: "02 March 2026",
    travellers: 2,
    primaryGuest: "Rohan Sharma",
    status: "COMPLETED",
    totalPaid: 3675,
    category: "Train Booking",
  },
];

export default function MyTripsPage() {
  const { data: session } = useSession();
  const userRole = (session?.user as { role?: string })?.role;
  const dashboardPath = getDashboardPath(userRole);
  const dashboardLabel = getDashboardLabel(userRole);

  const [filter, setFilter] = useState<"ALL" | "CONFIRMED" | "COMPLETED" | "CANCELLED">("ALL");
  const [bookings, setBookings] = useState<BookingRecord[]>(DEFAULT_BOOKINGS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lotr_customer_bookings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBookings([...parsed, ...DEFAULT_BOOKINGS]);
        }
      }
    } catch (e) {}
  }, []);

  const filtered = bookings.filter((b) => filter === "ALL" || b.status === filter);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Top Breadcrumb & Return to Dashboard Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E6E0]">
            <div className="flex items-center gap-2 text-xs text-[#737B76]">
              <Link
                href={dashboardPath}
                className="hover:text-[#173D32] flex items-center gap-1 font-semibold transition"
              >
                <span>📊</span>
                <span>{dashboardLabel}</span>
              </Link>
              <span>/</span>
              <span className="text-[#173D32] font-medium">My Bookings & Trips</span>
            </div>

            <Link
              href={dashboardPath}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#173D32] hover:bg-[#287C70] text-[#FAF8F4] text-xs font-semibold shadow-xs transition"
            >
              <span>← Back to Dashboard (डैशबोर्ड)</span>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
                Customer Itinerary Desk
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D32] mt-1">
                My Bookings & Trips
              </h1>
              <p className="text-xs text-[#737B76]">
                Manage upcoming reservations, download travel vouchers, or request cancellations.
              </p>
            </div>

            <Link
              href="/holiday-packages"
              className="px-4 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition self-start sm:self-auto"
            >
              + Plan New Journey
            </Link>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 border-b border-[#E7E6E0] pb-4">
            {(["ALL", "CONFIRMED", "COMPLETED", "CANCELLED"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  filter === tab
                    ? "bg-[#173D32] text-white"
                    : "bg-white border border-[#E7E6E0] text-[#737B76] hover:text-[#242A28]"
                }`}
              >
                {tab === "ALL" ? "All Bookings" : tab}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#287C70]">{item.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-700" :
                      item.status === "COMPLETED" ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#173D32]">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-[#737B76]">
                    <span>📅 Travel: {item.travelDate}</span>
                    <span>•</span>
                    <span>👥 {item.travellers} Travellers</span>
                    <span>•</span>
                    <span>👤 {item.primaryGuest}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:flex-col sm:items-end justify-between border-t sm:border-t-0 pt-4 sm:pt-0">
                  <div className="text-right">
                    <span className="text-[10px] text-[#737B76]">Total Amount</span>
                    <p className="font-serif text-xl font-bold text-[#173D32]">
                      ₹{item.totalPaid.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <Link
                    href={`/my-trips/${item.id}`}
                    className="px-4 py-2 rounded-xl border border-[#173D32] text-[#173D32] hover:bg-[#FAF8F4] text-xs font-semibold transition"
                  >
                    View Details & Voucher ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}
