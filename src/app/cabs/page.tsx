"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";
import { CABS_DATA, CabOption } from "@/data/travelData";

export default function CabsPage() {
  const router = useRouter();
  const [selectedCab, setSelectedCab] = useState<CabOption | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBookCab = (cab: CabOption) => {
    router.push(`/checkout?item=${encodeURIComponent(cab.category + " Cab (" + cab.modelExample + ")")}&price=${cab.localPackagePrice}&travellers=2`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow">
        <section className="bg-[#173D32] text-[#FAF8F4] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#287C70]/40">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              Chauffeured Road Travel
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 mb-3 tracking-tight">
              Airport Transfers, Local & Outstation Cabs
            </h1>
            <p className="text-sm sm:text-base text-[#EDE5D8] max-w-2xl font-light">
              Courteous hill-certified chauffeurs, clean sanitize-checked vehicles, and fixed transparent per-kilometer billing with zero surge pricing.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CABS_DATA.map((cab) => (
              <div
                key={cab.id}
                className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FAF8F4] border border-[#E7E6E0] text-[#173D32]">
                      {cab.category}
                    </span>
                    <span className="text-xs text-[#737B76]">e.g. {cab.modelExample}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#173D32] mb-1">
                    {cab.category} • {cab.capacity}
                  </h3>
                  <p className="text-xs text-[#737B76] mb-4">🧳 {cab.luggage}</p>

                  <div className="space-y-1.5 mb-6">
                    {cab.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#242A28]/80">
                        <span className="text-[#287C70] font-bold">✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] text-xs mb-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737B76]">Local 8h / 80km</span>
                      <p className="font-bold text-[#173D32] text-sm">₹{cab.localPackagePrice}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737B76]">Outstation rate</span>
                      <p className="font-bold text-[#173D32] text-sm">₹{cab.outstationRatePerKm}/km</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E6E0] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#737B76]">Airport transfer flat</span>
                    <div className="font-serif text-xl font-bold text-[#173D32]">
                      ₹{cab.airportFlatRate}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBookCab(cab)}
                    className="px-5 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Book Cab
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BookingFlowModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialData={{
          serviceType: "Cab Booking",
          origin: "City Hotel / Airport",
          destination: "Local / Outstation",
          budget: selectedCab?.localPackagePrice || 1999,
        }}
      />

      <AiTravelAgentModal />

      <CustomerFooter />
    </div>
  );
}
