"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";
import { TOURS_DATA, TourExperience } from "@/data/travelData";

export default function ToursPage() {
  const router = useRouter();
  const [selectedTour, setSelectedTour] = useState<TourExperience | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBook = (tour: TourExperience) => {
    router.push(`/checkout?item=${encodeURIComponent(tour.title + " - " + tour.location)}&price=${tour.price}&travellers=2`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow">
        <section className="bg-[#173D32] text-[#FAF8F4] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#287C70]/40">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              Immersive Local Discovery
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 mb-3 tracking-tight">
              Curated Day Tours & Activities
            </h1>
            <p className="text-sm sm:text-base text-[#EDE5D8] max-w-2xl font-light">
              Led by certified resident storytellers, naturalists, and historians. Skip the tourist traps and connect deeply with the culture of every destination.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TOURS_DATA.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#737B76] mb-2">
                    <span>📍 {tour.location}</span>
                    <span className="text-[#B7955B] font-bold">★ {tour.rating} ({tour.reviewsCount})</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#173D32] mb-2">
                    {tour.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-[#737B76] mb-4">
                    <span className="px-2.5 py-0.5 rounded bg-[#FAF8F4] border border-[#E7E6E0] font-semibold text-[#173D32]">
                      ⏱️ {tour.duration}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-[#FAF8F4] border border-[#E7E6E0] font-semibold text-[#173D32]">
                      🏷️ {tour.category}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-6">
                    {tour.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#242A28]/80">
                        <span className="text-[#287C70] font-bold">✓</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E6E0] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#737B76]">Price per person</span>
                    <div className="font-serif text-2xl font-bold text-[#173D32]">
                      ₹{tour.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBook(tour)}
                    className="px-5 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Book Experience
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
          serviceType: "Tour Activity",
          destination: selectedTour?.location || "Jaipur",
          budget: selectedTour?.price || 1450,
        }}
      />

      <AiTravelAgentModal />

      <CustomerFooter />
    </div>
  );
}
