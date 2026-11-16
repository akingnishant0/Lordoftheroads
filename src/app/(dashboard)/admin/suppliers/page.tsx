"use client";

import React, { useState } from "react";

export default function AdminSuppliersPage() {
  const suppliers = [
    { id: "SUP-01", name: "Kashmir Crown Hospitality Ltd", category: "Hotels & Houseboats", city: "Srinagar", activeListings: 14, balanceDue: 45000, status: "ACTIVE" },
    { id: "SUP-02", name: "Kerala Backwater Kettuvallam Co.", category: "Houseboats & Day Tours", city: "Alleppey", activeListings: 8, balanceDue: 28000, status: "ACTIVE" },
    { id: "SUP-03", name: "Royal Rajasthan Desert Safaris", category: "Camps & Camel Treks", city: "Jaisalmer", activeListings: 6, balanceDue: 35000, status: "ACTIVE" },
    { id: "SUP-04", name: "Zingbus Technologies India", category: "Intercity Bus Transits", city: "Gurgaon", activeListings: 120, balanceDue: 92000, status: "ACTIVE" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Supply Chain & Vendors
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Verified Supplier Partners
          </h1>
          <p className="text-xs text-gray-500">
            Hotels, bus fleet operators, local guides, and cab vendors with contracted B2B net rates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Add Supplier modal")}
          className="px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold shadow-sm transition"
        >
          + Register New Supplier
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-gray-500 bg-gray-50 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Supplier Name</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-3">Base Location</th>
              <th className="py-2.5 px-3">Active Listings</th>
              <th className="py-2.5 px-3">Payable Balance</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {suppliers.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-3 font-bold text-gray-900">{s.name}</td>
                <td className="py-3 px-3 text-gray-600">{s.category}</td>
                <td className="py-3 px-3 text-gray-600">{s.city}</td>
                <td className="py-3 px-3 font-semibold text-gray-800">{s.activeListings} Items</td>
                <td className="py-3 px-3 font-bold text-emerald-700">₹{s.balanceDue.toLocaleString("en-IN")}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800">
                    {s.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => alert(`Supplier ${s.name} statement`)}
                    className="text-xs font-semibold text-[#173D32] hover:underline"
                  >
                    View Contract →
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
