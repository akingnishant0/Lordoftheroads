"use client";

import React, { useState } from "react";

export default function AdminRefundsPage() {
  const refunds = [
    { id: "REF-4412", booking: "LOTR-552109", customer: "Sameer Joshi", originalAmount: 145000, refundAmount: 123250, deduction: 21750, reason: "Client medical emergency", status: "REFUNDED_TO_SOURCE" },
    { id: "REF-3901", booking: "LOTR-412098", customer: "Pooja Hegde", originalAmount: 18500, refundAmount: 18500, deduction: 0, reason: "Flight schedule cancelled by airline", status: "PROCESSING" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Cancellation Desk
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Refunds & Dispute Management
          </h1>
          <p className="text-xs text-gray-500">
            Authorize passenger refunds, enforce cancellation slab rules, and track payout disbursements.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-gray-500 bg-gray-50 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Refund ID</th>
              <th className="py-2.5 px-3">Booking & Customer</th>
              <th className="py-2.5 px-3">Original Paid</th>
              <th className="py-2.5 px-3">Refund Payable</th>
              <th className="py-2.5 px-3">Policy Deduction</th>
              <th className="py-2.5 px-3">Reason</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {refunds.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-3 font-mono font-bold text-[#173D32]">{r.id}</td>
                <td className="py-3 px-3">
                  <div className="text-gray-900 font-bold">{r.customer}</div>
                  <span className="text-[10px] text-gray-400">Ref: {r.booking}</span>
                </td>
                <td className="py-3 px-3 text-gray-700">₹{r.originalAmount.toLocaleString("en-IN")}</td>
                <td className="py-3 px-3 font-bold text-emerald-700">₹{r.refundAmount.toLocaleString("en-IN")}</td>
                <td className="py-3 px-3 text-red-600 font-medium">₹{r.deduction.toLocaleString("en-IN")}</td>
                <td className="py-3 px-3 text-gray-600">{r.reason}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    r.status === "REFUNDED_TO_SOURCE" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
                  }`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
