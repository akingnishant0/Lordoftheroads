"use client";

import React, { useState } from "react";

export default function AgentCustomersDirectoryPage() {
  const [search, setSearch] = useState("");

  const customers = [
    {
      id: "CUST-01",
      name: "Vikram Malhotra",
      phone: "+91 98112 34567",
      email: "vikram.m@gmail.com",
      city: "New Delhi",
      totalTrips: 3,
      totalSpend: 248000,
      lastTrip: "Kashmir Valley",
    },
    {
      id: "CUST-02",
      name: "Ananya Iyer",
      phone: "+91 98450 11223",
      email: "ananya.iyer@outlook.com",
      city: "Bangalore",
      totalTrips: 2,
      totalSpend: 95000,
      lastTrip: "Kerala Backwaters",
    },
    {
      id: "CUST-03",
      name: "Sameer Joshi",
      phone: "+91 98200 44556",
      email: "s.joshi@corp.in",
      city: "Mumbai",
      totalTrips: 4,
      totalSpend: 380000,
      lastTrip: "Dubai & Swiss Alps",
    },
  ];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Client Directory
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Agent Customers & Travellers
          </h1>
          <p className="text-xs text-gray-500">
            View repeat client profiles, total spend volume, and previous destinations.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by client name, city or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2.5 px-3.5 rounded-xl border border-gray-200 text-xs w-full sm:w-72 bg-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#173D32] text-white flex items-center justify-center font-bold text-sm">
                  {c.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{c.name}</h4>
                  <p className="text-[11px] text-gray-400">{c.city}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                {c.totalTrips} Trips
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Phone:</span>
                <span className="font-medium text-gray-900">{c.phone}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Email:</span>
                <span className="font-medium text-gray-900">{c.email}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Lifetime Value:</span>
                <span className="font-bold text-emerald-700">₹{c.totalSpend.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Latest Journey:</span>
                <span className="font-medium text-gray-900">{c.lastTrip}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <a href={`tel:${c.phone}`} className="text-xs font-semibold text-[#173D32] hover:underline">
                Call 📞
              </a>
              <a
                href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                WhatsApp 💬
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
