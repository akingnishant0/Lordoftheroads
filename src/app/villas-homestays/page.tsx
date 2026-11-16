"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";
import { VILLAS_DATA, VillaProperty } from "@/data/travelData";

export default function VillasHomestaysPage() {
  const router = useRouter();
  const [selectedVilla, setSelectedVilla] = useState<VillaProperty | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBook = (villa: VillaProperty) => {
    router.push(`/checkout?item=${encodeURIComponent(villa.name + " (" + villa.location + ")")}&price=${villa.pricePerNight}&travellers=${villa.maxGuests}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow">
        {/* Header Hero */}
        <section className="bg-[#173D32] text-[#FAF8F4] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#287C70]/40">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              Private Living & Tranquil Escapes
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 mb-3 tracking-tight">
              Villas & Boutique Homestays
            </h1>
            <p className="text-sm sm:text-base text-[#EDE5D8] max-w-2xl font-light">
              Experience the warmth of handpicked private pool estates, heritage bungalows, and local host hospitality for families and friend getaways.
            </p>
          </div>
        </section>

        {/* Villas Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VILLAS_DATA.map((villa) => (
              <div
                key={villa.id}
                className="bg-white rounded-2xl border border-[#E7E6E0] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={villa.imageUrl}
                    alt={villa.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#173D32]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {villa.bedrooms} Bedrooms • Up to {villa.maxGuests} Guests
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs text-[#737B76] mb-1.5">
                    <span>📍 {villa.location}</span>
                    <span className="text-[#B7955B] font-bold">★ {villa.rating} ({villa.reviewsCount})</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#173D32] mb-1.5 group-hover:text-[#287C70] transition">
                    {villa.name}
                  </h3>

                  <p className="text-xs text-[#737B76] mb-4">Hosted by {villa.hostName}</p>

                  <div className="space-y-1.5 mb-6 flex-grow">
                    {villa.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#242A28]/80">
                        <span className="text-[#B7955B] font-bold">✦</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#E7E6E0] flex items-end justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737B76]">Entire Villa / Night</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-2xl font-bold text-[#173D32]">
                          ₹{villa.pricePerNight.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-medium">✓ Caretaker on-site</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBook(villa)}
                      className="px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition cursor-pointer"
                    >
                      Reserve Villa
                    </button>
                  </div>
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
          serviceType: "Villas & Homestays",
          destination: selectedVilla?.location || "Goa",
          budget: selectedVilla?.pricePerNight || 16500,
        }}
      />

      <AiTravelAgentModal />

      <CustomerFooter />
    </div>
  );
}
