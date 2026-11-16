"use client";

export const dynamic = "force-dynamic";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function AgentQuotesPageContent() {
  const searchParams = useSearchParams();
  const initialClient = searchParams.get("client") || "Vikram Malhotra";
  const initialDest = searchParams.get("dest") || "Kashmir Valley 6D/5N";

  const [clientName, setClientName] = useState(initialClient);
  const [destination, setDestination] = useState(initialDest);
  const [basePrice, setBasePrice] = useState(28500);
  const [travellers, setTravellers] = useState(4);
  const [agencyMarkup, setAgencyMarkup] = useState(2500);
  const [generated, setGenerated] = useState(false);

  const totalBase = basePrice * travellers;
  const totalMarkup = agencyMarkup * travellers;
  const subtotal = totalBase + totalMarkup;
  const gst = Math.round(subtotal * 0.05);
  const finalQuote = subtotal + gst;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Agency Quotation Generator
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Create Client Quotations
          </h1>
          <p className="text-xs text-gray-500">
            Set custom agency margins, configure inclusions, and share branded quote summaries with clients.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-gray-900">Quotation Parameters</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-500 mb-1 font-medium">Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32]"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1 font-medium">Destination / Package</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32]"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1 font-medium">Net B2B Supplier Cost / Person (₹)</label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32]"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1 font-medium">Number of Travellers</label>
              <input
                type="number"
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32]"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1 font-medium">Your Agency Markup / Person (₹)</label>
              <input
                type="number"
                value={agencyMarkup}
                onChange={(e) => setAgencyMarkup(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setGenerated(true)}
              className="px-5 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition"
            >
              Generate Branded Quote
            </button>
          </div>
        </div>

        {/* Live Calculation Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-gray-900">Commercial Summary</h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>B2B Net Cost ({travellers} Pax)</span>
              <span>₹{totalBase.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Your Profit Markup</span>
              <span>+₹{totalMarkup.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>GST (5%)</span>
              <span>₹{gst.toLocaleString("en-IN")}</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline font-bold text-sm text-gray-900">
              <span>Client Total Price</span>
              <span className="text-xl text-[#173D32]">₹{finalQuote.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {generated && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
              <span className="font-bold text-emerald-800">✓ Quote #QUO-{Math.floor(1000 + Math.random() * 9000)} Ready!</span>
              <p className="text-emerald-700 text-[11px]">
                Valid for 7 days. Quote document created with your agency logo and contact.
              </p>
              <button
                type="button"
                onClick={() => typeof window !== "undefined" && window.print()}
                className="w-full py-2 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition"
              >
                Download Client PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default function AgentQuotesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-8 text-[#173B32]">Loading...</div>}>
      <AgentQuotesPageContent />
    </Suspense>
  );
}
