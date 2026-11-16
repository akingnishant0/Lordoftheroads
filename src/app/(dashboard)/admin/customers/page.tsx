"use client";

import React, { useState } from "react";

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");

  const customers = [
    { id: "USR-01", name: "Rohan Sharma", email: "customer@lordoftheroad.in", phone: "+91 98765 43210", trips: 4, spend: 185000, joined: "Jan 2026", status: "ACTIVE" },
    { id: "USR-02", name: "Vikram Malhotra", email: "vikram.m@gmail.com", phone: "+91 98112 34567", trips: 2, spend: 126500, joined: "Feb 2026", status: "ACTIVE" },
    { id: "USR-03", name: "Ananya Iyer", email: "ananya.iyer@outlook.com", phone: "+91 98450 11223", trips: 1, spend: 22800, joined: "Mar 2026", status: "ACTIVE" },
    { id: "USR-04", name: "Sameer Joshi", email: "s.joshi@corp.in", phone: "+91 98200 44556", trips: 3, spend: 280000, joined: "Dec 2025", status: "ACTIVE" },
  ];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Platform Users
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Registered Customers & Accounts
          </h1>
          <p className="text-xs text-gray-500">
            Audit user accounts, KYC verification, trip booking frequencies, and customer lifetime value.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search customer by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 px-3 text-xs border border-gray-200 rounded-xl bg-white w-full sm:w-72"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-gray-500 bg-gray-50 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3">User ID</th>
              <th className="py-2.5 px-3">Customer Name</th>
              <th className="py-2.5 px-3">Email & Contact</th>
              <th className="py-2.5 px-3">Bookings</th>
              <th className="py-2.5 px-3">Lifetime Value</th>
              <th className="py-2.5 px-3">Member Since</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-3 font-mono font-bold text-[#173D32]">{c.id}</td>
                <td className="py-3 px-3 font-bold text-gray-900">{c.name}</td>
                <td className="py-3 px-3 text-gray-600">
                  <div>{c.email}</div>
                  <span className="text-[10px] text-gray-400">{c.phone}</span>
                </td>
                <td className="py-3 px-3 font-semibold text-gray-800">{c.trips} Trips</td>
                <td className="py-3 px-3 font-bold text-emerald-700">₹{c.spend.toLocaleString("en-IN")}</td>
                <td className="py-3 px-3 text-gray-500">{c.joined}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800">
                    {c.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => alert(`Customer profile: ${c.name}`)}
                    className="text-xs font-semibold text-[#173D32] hover:underline cursor-pointer"
                  >
                    View Account →
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
