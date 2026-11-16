"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";
import { BUSES_DATA, BusOption } from "@/data/travelData";

export default function BusesPage() {
  const router = useRouter();
  const [selectedBus, setSelectedBus] = useState<BusOption | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBook = (bus: BusOption) => {
    router.push(`/checkout?item=${encodeURIComponent(bus.operator + " (" + bus.origin + " to " + bus.destination + ")")}&price=${bus.price}&travellers=1`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow">
        <section className="bg-[#173D32] text-[#FAF8F4] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#287C70]/40">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              Intercity Sleeper & Luxury Bus Routes
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 mb-3 tracking-tight">
              Book Bus Tickets
            </h1>
            <p className="text-sm sm:text-base text-[#EDE5D8] max-w-2xl font-light">
              Travel comfortably on top Volvo Multi-Axle, BharatBenz AC sleepers, and electric coaches across North, West, and South India.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="space-y-4">
            {BUSES_DATA.map((bus) => (
              <div
                key={bus.id}
                className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4 min-w-[220px]">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] flex items-center justify-center font-bold text-xl">
                    🚌
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#173D32]">{bus.operator}</h4>
                    <p className="text-xs text-[#737B76]">{bus.busType}</p>
                    <span className="text-[10px] text-amber-700 font-bold">★ {bus.rating} Rating</span>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-center flex-grow justify-center">
                  <div>
                    <span className="text-base font-bold text-[#173D32]">{bus.departureTime}</span>
                    <p className="text-xs text-[#737B76]">{bus.origin.split("(")[0]}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] text-[#737B76]">{bus.duration}</span>
                    <div className="w-24 h-0.5 bg-[#EDE5D8] my-1"></div>
                    <span className="text-[10px] text-[#287C70] font-semibold">{bus.seatsAvailable} Seats Left</span>
                  </div>
                  <div>
                    <span className="text-base font-bold text-[#173D32]">{bus.arrivalTime}</span>
                    <p className="text-xs text-[#737B76]">{bus.destination.split("(")[0]}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 min-w-[180px] justify-end border-t md:border-t-0 pt-4 md:pt-0 w-full md:w-auto">
                  <div className="text-right">
                    <span className="font-serif text-2xl font-bold text-[#173D32]">
                      ₹{bus.price.toLocaleString("en-IN")}
                    </span>
                    <p className="text-[10px] text-[#737B76]">inclusive of taxes</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBook(bus)}
                    className="px-4 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Select Seat
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
          serviceType: "Bus Tickets",
          origin: selectedBus?.origin || "Delhi",
          destination: selectedBus?.destination || "Manali",
          budget: selectedBus?.price || 1250,
        }}
      />

      <AiTravelAgentModal />

      <CustomerFooter />
    </div>
  );
}
