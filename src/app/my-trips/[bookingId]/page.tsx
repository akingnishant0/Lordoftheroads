"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";

interface PageProps {
  params: Promise<{ bookingId: string }>;
}

export default function TripDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const bookingId = resolvedParams.bookingId;

  const [cancellationRequested, setCancellationRequested] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Link href="/my-trips" className="text-xs font-semibold text-[#173D32] hover:underline">
              ← Back to My Trips
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#737B76]">Booking: {bookingId}</span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                {cancellationRequested ? "CANCELLATION IN REVIEW" : "CONFIRMED & ACTIVE"}
              </span>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl border border-[#E7E6E0] p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E7E6E0] gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
                  Confirmed Itinerary
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">
                  Kashmir Valley 6D/5N Holiday Package
                </h1>
                <p className="text-xs text-[#737B76] mt-1">
                  Travel Dates: 15 April 2026 – 20 April 2026 • 2 Adults
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#737B76]">Grand Total Paid</span>
                <p className="font-serif text-2xl font-bold text-[#173D32]">₹59,848</p>
                <span className="text-[11px] text-emerald-700 font-medium">✓ Inclusive of GST & Insurance</span>
              </div>
            </div>

            {/* Inclusions & Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] space-y-2">
                <h4 className="font-bold text-sm text-[#173D32]">Included Services</h4>
                <ul className="space-y-1 text-[#242A28]/80">
                  <li>• 1 Night Dal Lake Wooden Houseboat</li>
                  <li>• 4 Nights Luxury Pine Glade Resort</li>
                  <li>• Daily Breakfast and 4-Course Dinners</li>
                  <li>• Chauffeur-driven private sedan for 6 days</li>
                  <li>• Gulmarg Phase 1 & 2 Gondola passes</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] space-y-2">
                <h4 className="font-bold text-sm text-[#173D32]">Assigned Chauffeur & Coordinator</h4>
                <div className="text-[#242A28]/80 space-y-1">
                  <p><strong>Coordinator:</strong> Tariq Ahmad (+91 94190 12345)</p>
                  <p><strong>Vehicle:</strong> Toyota Innova Crysta (JK-01-AB-4421)</p>
                  <p><strong>Flight Details:</strong> IndiGo 6E 214 (DEL ➔ SXR)</p>
                  <p><strong>Insurance Policy:</strong> Travel Shield #TM-LOTR-99214</p>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-6 border-t border-[#E7E6E0] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => typeof window !== "undefined" && window.print()}
                  className="px-4 py-2 rounded-xl border border-[#173D32] text-[#173D32] hover:bg-[#FAF8F4] text-xs font-semibold transition"
                >
                  🖨️ Download Voucher PDF
                </button>
                <a
                  href={`https://wa.me/919876543210?text=Assistance+needed+for+trip+${bookingId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition inline-flex items-center gap-1.5"
                >
                  💬 Contact Chauffeur
                </a>
              </div>

              {!cancellationRequested ? (
                <button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  className="px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold transition"
                >
                  Request Cancellation / Refund
                </button>
              ) : (
                <span className="text-xs text-amber-700 font-semibold">
                  Cancellation ticket #CAN-{Math.floor(1000 + Math.random() * 9000)} is being processed.
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Cancellation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#173D32]">Confirm Cancellation</h3>
            <p className="text-xs text-[#737B76]">
              According to the standard policy for {bookingId}, cancelling &gt; 7 days prior to departure allows an 85% refund (₹50,870) processed to your original payment method.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 rounded-xl border border-[#E7E6E0] text-xs font-semibold"
              >
                Keep Trip
              </button>
              <button
                type="button"
                onClick={() => {
                  setCancellationRequested(true);
                  setShowCancelModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      <CustomerFooter />
    </div>
  );
}
