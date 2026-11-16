"use client";

import React, { useState } from "react";

export default function AdminCouponsPage() {
  const coupons = [
    { code: "WELCOME1000", discount: "₹1,000 Flat", minSpend: "₹20,000", usedCount: 142, maxUsage: 500, expiry: "31 Dec 2026", status: "ACTIVE" },
    { code: "LOTR1000", discount: "₹1,000 Flat", minSpend: "₹15,000", usedCount: 89, maxUsage: 250, expiry: "30 Jun 2026", status: "ACTIVE" },
    { code: "SUMMERESCAPE", discount: "10% (Up to ₹3,000)", minSpend: "₹40,000", usedCount: 34, maxUsage: 100, expiry: "31 Jul 2026", status: "ACTIVE" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Promotions & Campaigns
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Coupon Codes & Discounts
          </h1>
          <p className="text-xs text-gray-500">
            Create promotional coupon vouchers, set minimum booking values, and monitor redemptions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("New Coupon modal")}
          className="px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold shadow-sm transition"
        >
          + Create Promo Coupon
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-gray-500 bg-gray-50 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Coupon Code</th>
              <th className="py-2.5 px-3">Discount Value</th>
              <th className="py-2.5 px-3">Min Order Value</th>
              <th className="py-2.5 px-3">Redemptions</th>
              <th className="py-2.5 px-3">Expiry Date</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {coupons.map((c) => (
              <tr key={c.code} className="hover:bg-gray-50 transition">
                <td className="py-3 px-3 font-mono font-bold text-[#173D32] text-sm">{c.code}</td>
                <td className="py-3 px-3 font-bold text-emerald-700">{c.discount}</td>
                <td className="py-3 px-3 text-gray-600">{c.minSpend}</td>
                <td className="py-3 px-3 text-gray-800 font-semibold">{c.usedCount} / {c.maxUsage}</td>
                <td className="py-3 px-3 text-gray-500">{c.expiry}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800">
                    {c.status}
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
