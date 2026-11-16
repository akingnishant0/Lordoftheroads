"use client";

import React, { useState } from "react";

export default function AdminBookingsPage() {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const bookings = [
    {
      id: "LOTR-884210",
      customer: "Rohan Sharma",
      service: "Kashmir Valley 6D/5N Holiday Package",
      travelDate: "15 Apr 2026",
      supplier: "Kashmir Crown Hospitality",
      amount: 59848,
      status: "CONFIRMED",
      paymentStatus: "PAID_ONLINE",
    },
    {
      id: "LOTR-731902",
      customer: "Vikram Malhotra",
      service: "Vande Bharat Express (NDLS ➔ BSB)",
      travelDate: "02 Mar 2026",
      supplier: "IRCTC Direct Rail",
      amount: 3675,
      status: "COMPLETED",
      paymentStatus: "PAID_ONLINE",
    },
    {
      id: "LOTR-619284",
      customer: "Ananya Iyer",
      service: "Alleppey Thatched Houseboat Cruise",
      travelDate: "20 May 2026",
      supplier: "Kerala Backwater Kettuvallam Ltd",
      amount: 22800,
      status: "CONFIRMED",
      paymentStatus: "PAID_ONLINE",
    },
    {
      id: "LOTR-552109",
      customer: "Sameer Joshi",
      service: "IndiGo BOM ➔ DXB & Marina View Suites",
      travelDate: "12 Feb 2026",
      supplier: "IndiGo / Marina Pearl Dubai",
      amount: 145000,
      status: "CANCELLED",
      paymentStatus: "REFUNDED",
    },
  ];

  const filtered = bookings.filter((b) => {
    const matchesFilter = filter === "ALL" || b.status === filter;
    const matchesSearch =
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Platform Reservations Desk
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            All Bookings & Transactions
          </h1>
          <p className="text-xs text-gray-500">
            Real-time multi-service reservations across Flights, Stays, Rail, Packages, and Travel Shield Policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search booking ID, customer or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 px-3 text-xs border border-gray-200 rounded-xl bg-white w-full sm:w-64"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["ALL", "CONFIRMED", "COMPLETED", "CANCELLED"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
              filter === f ? "bg-[#173D32] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f === "ALL" ? "All Bookings" : f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-gray-500 bg-gray-50 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Booking Reference</th>
              <th className="py-2.5 px-3">Customer</th>
              <th className="py-2.5 px-3">Service & Supplier</th>
              <th className="py-2.5 px-3">Travel Date</th>
              <th className="py-2.5 px-3">Amount</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-3 font-mono font-bold text-[#173D32]">{b.id}</td>
                <td className="py-3 px-3 font-semibold text-gray-900">{b.customer}</td>
                <td className="py-3 px-3">
                  <div className="text-gray-900 font-medium">{b.service}</div>
                  <span className="text-[10px] text-gray-400">Supplier: {b.supplier}</span>
                </td>
                <td className="py-3 px-3 text-gray-700">{b.travelDate}</td>
                <td className="py-3 px-3 font-bold text-gray-900">₹{b.amount.toLocaleString("en-IN")}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    b.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-800" :
                    b.status === "COMPLETED" ? "bg-blue-50 text-blue-800" : "bg-red-50 text-red-800"
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => alert(`Inspection opened for ${b.id}`)}
                    className="text-xs font-semibold text-[#173D32] hover:underline cursor-pointer"
                  >
                    View Details →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
