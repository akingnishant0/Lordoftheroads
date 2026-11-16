"use client";

export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";

function BookingConfirmationPageContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id") || "LOTR-884210";
  const itemTitle = searchParams.get("title") || "Kashmir Valley 6D/5N Holiday Package";
  const amountPaid = searchParams.get("amount") || "59,848";
  const guestName = searchParams.get("guest") || "Rohan Sharma";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Banner */}
          <div className="bg-white rounded-3xl border border-[#E7E6E0] p-8 shadow-sm text-center mb-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto font-bold">
              ✓
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              Booking Confirmed & Guaranteed
            </span>

            <h1 className="font-serif text-3xl font-bold text-[#173D32]">
              Thank you, {guestName}!
            </h1>

            <p className="text-sm text-[#737B76] max-w-lg mx-auto">
              Your reservation has been confirmed with our verified supplier partners. A formal tax invoice and printable travel voucher have been sent to your email.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] text-xs font-mono font-bold text-[#173D32]">
              <span>Booking Reference:</span>
              <span className="text-[#287C70]">{bookingId}</span>
            </div>
          </div>

          {/* Official Voucher Preview Card */}
          <div className="bg-white rounded-3xl border border-[#E7E6E0] p-8 shadow-sm space-y-6 print:border-none print:shadow-none">
            <div className="flex items-center justify-between pb-6 border-b border-[#E7E6E0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#B7955B]/60 bg-black shrink-0">
                  <img src="/logo.jpg" alt="Lord of the Roads" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-serif text-xl font-bold text-[#173D32]">lord of the road</span>
                  <p className="text-[10px] text-[#B7955B] font-bold tracking-widest uppercase">Verified Travel Voucher</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 px-2.5 py-1 rounded bg-emerald-50">
                  STATUS: CONFIRMED
                </span>
                <p className="text-[11px] text-[#737B76] mt-1">Date: {new Date().toLocaleDateString("en-IN")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#737B76]">Service / Package</span>
                <p className="font-bold text-sm text-[#173D32] mt-0.5">{itemTitle}</p>
              </div>
              <div>
                <span className="text-[#737B76]">Primary Guest</span>
                <p className="font-bold text-sm text-[#173D32] mt-0.5">{guestName}</p>
              </div>
              <div>
                <span className="text-[#737B76]">Payment Authorization</span>
                <p className="font-bold text-[#173D32] mt-0.5">Paid Full (₹{Number(amountPaid).toLocaleString("en-IN")})</p>
              </div>
              <div>
                <span className="text-[#737B76]">Supplier Status</span>
                <p className="font-bold text-emerald-700 mt-0.5">Instant Confirmation #IRCTC/LOTR</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] text-xs text-[#737B76] space-y-1">
              <p className="font-bold text-[#173D32]">Important Travel Instructions:</p>
              <p>• Please carry a government-issued photo identity proof (Aadhaar / Passport) during check-in.</p>
              <p>• Dedicated chauffeur contact and vehicle number will be shared via WhatsApp 4 hours prior to pickup.</p>
              <p>• For 24/7 emergency dispatch or on-tour modifications, call +91 98765 43210.</p>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#E7E6E0]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-xl border border-[#173D32] text-[#173D32] hover:bg-[#FAF8F4] text-xs font-semibold transition cursor-pointer"
                >
                  🖨️ Print / Save PDF
                </button>
                <a
                  href={`https://wa.me/919876543210?text=Hello+Lord+of+the+Road,+I+have+a+question+regarding+booking+${bookingId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition inline-flex items-center gap-1.5"
                >
                  <span>💬 WhatsApp Updates</span>
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/my-trips/${bookingId}`}
                  className="px-5 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition"
                >
                  View in My Trips ➔
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}


export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-8 text-[#173B32]">Loading...</div>}>
      <BookingConfirmationPageContent />
    </Suspense>
  );
}
