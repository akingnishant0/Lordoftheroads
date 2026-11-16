"use client";

import React, { useState } from "react";

export default function AdminAgentsPage() {
  const agents = [
    { id: "AGT-101", name: "Rajesh Travels & Insurance", contact: "Rajesh Khanna (+91 98201 23456)", city: "Delhi NCR", status: "VERIFIED", pospLicense: "IRDAI-POSP-88210", gmv: 420000, commissionPaid: 33600 },
    { id: "AGT-102", name: "Himalayan Road Ways", contact: "Farooq Mir (+91 94190 65432)", city: "Srinagar, J&K", status: "VERIFIED", pospLicense: "IRDAI-POSP-77192", gmv: 680000, commissionPaid: 54400 },
    { id: "AGT-103", name: "South Coastal Journeys", contact: "Karthik Nair (+91 98470 99881)", city: "Kochi, Kerala", status: "PENDING_VERIFICATION", pospLicense: "Pending Exam", gmv: 45000, commissionPaid: 3600 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            B2B Network
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Travel Agent & PoSP Partner Network
          </h1>
          <p className="text-xs text-gray-500">
            Manage authorized travel agencies, Travel Shield PoSP certificates, and B2B commission settlements.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Add Agent modal opened")}
          className="px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold shadow-sm transition"
        >
          + Onboard New Partner
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-gray-500 bg-gray-50 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Agent ID</th>
              <th className="py-2.5 px-3">Agency Name</th>
              <th className="py-2.5 px-3">City & Primary Contact</th>
              <th className="py-2.5 px-3">PoSP License</th>
              <th className="py-2.5 px-3">Lifetime GMV</th>
              <th className="py-2.5 px-3">Commission Paid</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {agents.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-3 font-mono font-bold text-[#173D32]">{a.id}</td>
                <td className="py-3 px-3 font-bold text-gray-900">{a.name}</td>
                <td className="py-3 px-3">
                  <div className="text-gray-900 font-medium">{a.city}</div>
                  <span className="text-[10px] text-gray-400">{a.contact}</span>
                </td>
                <td className="py-3 px-3 font-mono text-gray-700">{a.pospLicense}</td>
                <td className="py-3 px-3 font-bold text-gray-900">₹{a.gmv.toLocaleString("en-IN")}</td>
                <td className="py-3 px-3 font-bold text-emerald-700">₹{a.commissionPaid.toLocaleString("en-IN")}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    a.status === "VERIFIED" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => alert(`Reviewing agent: ${a.name}`)}
                    className="text-xs font-semibold text-[#173D32] hover:underline cursor-pointer"
                  >
                    Manage Agency →
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
