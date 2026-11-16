"use client";

import React, { useState } from "react";

export default function AdminSupportInboxPage() {
  const tickets = [
    { id: "TCK-8821", source: "CUSTOMER", from: "Rohan Sharma", subject: "Airport pickup time coordination for Kashmir", priority: "NORMAL", status: "OPEN", time: "10 mins ago" },
    { id: "TCK-8819", source: "AGENT", from: "Rajesh Travels (AGT-101)", subject: "Urgent PNR modification on IndiGo 6E 214", priority: "HIGH", status: "ASSIGNED", time: "35 mins ago" },
    { id: "TCK-8810", source: "SUPPLIER", from: "Kashmir Crown Resort", subject: "Room inventory blocked for peak festival weekend", priority: "NORMAL", status: "RESOLVED", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Helpdesk Dispatch
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Support Desk & Tickets
          </h1>
          <p className="text-xs text-gray-500">
            Unified inbox across Customers, Travel Agents, and Inventory Suppliers.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-gray-500 bg-gray-50 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Ticket ID</th>
              <th className="py-2.5 px-3">Sender Type</th>
              <th className="py-2.5 px-3">From</th>
              <th className="py-2.5 px-3">Subject</th>
              <th className="py-2.5 px-3">Priority</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-3 font-mono font-bold text-[#173D32]">{t.id}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-bold text-gray-700">
                    {t.source}
                  </span>
                </td>
                <td className="py-3 px-3 font-bold text-gray-900">{t.from}</td>
                <td className="py-3 px-3 text-gray-700">{t.subject}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    t.priority === "HIGH" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
                  }`}>
                    {t.priority}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    t.status === "RESOLVED" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => alert(`Opening ticket ${t.id}`)}
                    className="text-xs font-semibold text-[#173D32] hover:underline cursor-pointer"
                  >
                    Reply →
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
