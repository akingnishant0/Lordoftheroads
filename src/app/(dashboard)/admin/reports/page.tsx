"use client";

import React from "react";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Platform Performance
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Reports & Business Intelligence
          </h1>
          <p className="text-xs text-gray-500">
            Financial analytics, GMV growth curves, B2B partner yields, and top destination booking conversions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => typeof window !== "undefined" && window.print()}
          className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-800"
        >
          🖨️ Export Financial PDF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-2">
          <span className="text-xs text-gray-500 font-medium">Monthly Gross Volume (GMV)</span>
          <div className="font-serif text-3xl font-bold text-[#173D32]">₹24,85,000</div>
          <p className="text-xs text-emerald-700 font-semibold">↑ +18.4% vs last month</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-2">
          <span className="text-xs text-gray-500 font-medium">Net Platform Revenue</span>
          <div className="font-serif text-3xl font-bold text-[#287C70]">₹3,72,750</div>
          <p className="text-xs text-emerald-700 font-semibold">Average 15% platform take-rate</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-2">
          <span className="text-xs text-gray-500 font-medium">B2B Commission Disbursed</span>
          <div className="font-serif text-3xl font-bold text-[#B7955B]">₹1,98,400</div>
          <p className="text-xs text-gray-500">To 48 verified active PoSP agents</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-gray-900">Destination Yield Breakdown</h3>
        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between mb-1 text-gray-700">
              <span className="font-semibold">Kashmir Valley (Packages & Houseboats)</span>
              <span className="font-bold">42% (₹10.4L)</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#173D32]" style={{ width: "42%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-gray-700">
              <span className="font-semibold">Kerala Backwaters & Munnar Hills</span>
              <span className="font-bold">28% (₹6.9L)</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#287C70]" style={{ width: "28%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-gray-700">
              <span className="font-semibold">Dubai Red Dunes & International Flights</span>
              <span className="font-bold">20% (₹4.9L)</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#B7955B]" style={{ width: "20%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-gray-700">
              <span className="font-semibold">Other Domestic Stays & Rail (IRCTC)</span>
              <span className="font-bold">10% (₹2.4L)</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-stone-400" style={{ width: "10%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
