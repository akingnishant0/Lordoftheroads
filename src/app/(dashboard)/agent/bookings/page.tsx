"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AgentBookingsPage() {
  const [filter, setFilter] = useState("ALL");

  const bookings = [
    {
      id: "AGT-BK-9912",
      client: "Vikram Malhotra",
      service: "Kashmir Valley 6D/5N Holiday Package",
      travelDate: "15 Apr 2026",
      pax: 4,
      amount: 122850,
      commission: 10000,
      status: "CONFIRMED",
    },
    {
      id: "AGT-BK-8841",
      client: "Ananya Iyer",
      service: "IndiGo Flights (DEL - COK) + Munnar Resort",
      travelDate: "20 May 2026",
      pax: 2,
      amount: 48900,
      commission: 3600,
      status: "CONFIRMED",
    },
    {
      id: "AGT-BK-7712",
      client: "Sameer Joshi",
      service: "Dubai Red Dunes & Atlantis Resort",
      travelDate: "10 Feb 2026",
      pax: 2,
      amount: 104000,
      commission: 8500,
      status: "COMPLETED",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Client Reservations
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Agent Bookings Desk
          </h1>
          <p className="text-xs text-gray-500">
            Track confirmed bookings, download passenger vouchers, and verify payout commissions.
          </p>
        </div>

        <Link
          href="/agent?tab=travel-desk"
          className="px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold shadow-sm transition"
        >
          + New B2B Booking
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-gray-500 bg-gray-50 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Booking ID</th>
                <th className="py-2.5 px-3">Client</th>
                <th className="py-2.5 px-3">Service & Travel Date</th>
                <th className="py-2.5 px-3">Total Amount</th>
                <th className="py-2.5 px-3">Your Commission</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-3 font-mono font-bold text-[#173D32]">{b.id}</td>
                  <td className="py-3 px-3 font-semibold text-gray-900">{b.client}</td>
                  <td className="py-3 px-3">
                    <div className="text-gray-800 font-medium">{b.service}</div>
                    <span className="text-[10px] text-gray-400">📅 {b.travelDate} ({b.pax} Guests)</span>
                  </td>
                  <td className="py-3 px-3 font-bold text-gray-900">₹{b.amount.toLocaleString("en-IN")}</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">+₹{b.commission.toLocaleString("en-IN")}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      b.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-800" : "bg-blue-50 text-blue-800"
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Voucher for ${b.id} ready for printing.`)}
                      className="text-xs font-semibold text-[#173D32] hover:underline cursor-pointer"
                    >
                      Voucher ↗
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
