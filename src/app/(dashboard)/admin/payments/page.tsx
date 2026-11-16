"use client";

import React, { useState } from "react";

export default function AdminPaymentsPage() {
  const transactions = [
    { id: "TXN-90812", booking: "LOTR-884210", payer: "Rohan Sharma", gateway: "Razorpay UPI", amount: 59848, gst: 2849, fee: 0, date: "Today 10:14 AM", status: "SUCCESS" },
    { id: "TXN-87421", booking: "LOTR-731902", payer: "Vikram Malhotra", gateway: "HDFC PG Netbanking", amount: 3675, gst: 175, fee: 12, date: "Yesterday", status: "SUCCESS" },
    { id: "TXN-65490", booking: "LOTR-619284", payer: "Ananya Iyer", gateway: "Stripe International", amount: 22800, gst: 1085, fee: 450, date: "3 days ago", status: "SUCCESS" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Financial Settlement
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Payments & Gateway Authorizations
          </h1>
          <p className="text-xs text-gray-500">
            Monitor real-time incoming UPI, Card, Netbanking transactions and merchant fee deductions.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-gray-500 bg-gray-50 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Transaction ID</th>
              <th className="py-2.5 px-3">Booking ID</th>
              <th className="py-2.5 px-3">Payer & Gateway</th>
              <th className="py-2.5 px-3">Amount</th>
              <th className="py-2.5 px-3">GST Component</th>
              <th className="py-2.5 px-3">Gateway Fee</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-3 font-mono font-bold text-[#173D32]">{t.id}</td>
                <td className="py-3 px-3 font-mono font-bold text-gray-700">{t.booking}</td>
                <td className="py-3 px-3">
                  <div className="text-gray-900 font-medium">{t.payer}</div>
                  <span className="text-[10px] text-gray-400">{t.gateway}</span>
                </td>
                <td className="py-3 px-3 font-bold text-gray-900">₹{t.amount.toLocaleString("en-IN")}</td>
                <td className="py-3 px-3 text-gray-600">₹{t.gst}</td>
                <td className="py-3 px-3 text-gray-400">₹{t.fee}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800">
                    {t.status}
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
