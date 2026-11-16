"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";
import { FLIGHTS_DATA, FlightOption } from "@/data/travelData";

export default function FlightsPage() {
  const router = useRouter();
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [origin, setOrigin] = useState("Delhi (DEL)");
  const [destination, setDestination] = useState("Srinagar (SXR)");
  const [departDate, setDepartDate] = useState("2026-04-15");
  const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBookFlight = (flight: FlightOption) => {
    router.push(`/checkout?item=${encodeURIComponent(flight.airline + " (" + flight.flightNumber + ") " + flight.origin + " to " + flight.destination)}&price=${flight.price}&travellers=1`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow">
        {/* Header Hero */}
        <section className="bg-[#173D32] text-[#FAF8F4] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#287C70]/40">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              Air Travel & Instant Ticketing
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 mb-3 tracking-tight">
              Domestic & International Flights
            </h1>
            <p className="text-sm sm:text-base text-[#EDE5D8] max-w-2xl font-light">
              Compare non-stop and connecting flights with transparent baggage rules, upfront fare breakdowns, and zero hidden convenience charges.
            </p>

            {/* Flight Search Widget */}
            <div className="mt-8 bg-white text-[#242A28] rounded-2xl p-6 shadow-xl border border-[#E7E6E0]">
              <div className="flex items-center gap-6 mb-4 text-xs font-semibold">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="trip"
                    checked={tripType === "one-way"}
                    onChange={() => setTripType("one-way")}
                    className="accent-[#173D32]"
                  />
                  <span>One Way</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="trip"
                    checked={tripType === "round-trip"}
                    onChange={() => setTripType("round-trip")}
                    className="accent-[#173D32]"
                  />
                  <span>Round Trip</span>
                </label>
                <span className="text-xs text-[#287C70] ml-auto font-medium">IATA Certified Ticketing Portal</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0]">
                  <span className="text-[10px] uppercase font-bold text-[#737B76]">From</span>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-transparent font-bold text-sm text-[#173D32] focus:outline-none"
                  />
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0]">
                  <span className="text-[10px] uppercase font-bold text-[#737B76]">To</span>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent font-bold text-sm text-[#173D32] focus:outline-none"
                  />
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0]">
                  <span className="text-[10px] uppercase font-bold text-[#737B76]">Departure Date</span>
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm text-[#173D32] focus:outline-none"
                  />
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="w-full h-full py-3.5 px-4 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white font-semibold text-sm transition shadow-sm cursor-pointer"
                  >
                    Search Flights
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flight Results */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-[#173D32]">
              Available Flights: {origin.split(" ")[0]} ➔ {destination.split(" ")[0]}
            </h2>
            <span className="text-xs text-[#737B76]">Showing verified real-time airline seats</span>
          </div>

          <div className="space-y-4">
            {FLIGHTS_DATA.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-center justify-between gap-6"
              >
                {/* Airline & Number */}
                <div className="flex items-center gap-4 min-w-[180px]">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] flex items-center justify-center font-bold text-[#173D32] text-sm">
                    ✈️
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#173D32]">{flight.airline}</h4>
                    <p className="text-xs text-[#737B76]">{flight.flightNumber}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                      {flight.cabinClass}
                    </span>
                  </div>
                </div>

                {/* Times & Route */}
                <div className="flex items-center gap-8 text-center flex-grow justify-center">
                  <div>
                    <span className="text-base font-bold text-[#173D32]">{flight.departureTime}</span>
                    <p className="text-xs text-[#737B76]">{flight.origin.split(" ")[0]}</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[11px] text-[#737B76] font-medium">{flight.duration}</span>
                    <div className="w-28 h-0.5 bg-[#EDE5D8] my-1 relative">
                      <div className="absolute left-1/2 -top-1 w-2 h-2 rounded-full bg-[#287C70] -translate-x-1/2"></div>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      {flight.stops === 0 ? "Non-Stop" : `${flight.stops} Stop`}
                    </span>
                  </div>

                  <div>
                    <span className="text-base font-bold text-[#173D32]">{flight.arrivalTime}</span>
                    <p className="text-xs text-[#737B76]">{flight.destination.split(" ")[0]}</p>
                  </div>
                </div>

                {/* Baggage info */}
                <div className="text-xs text-[#737B76] hidden lg:block text-right">
                  <p className="font-medium text-[#242A28]">🧳 {flight.baggage.split("(")[0]}</p>
                  <p className="text-[11px] text-[#287C70]">Free web check-in support</p>
                </div>

                {/* Price & Book */}
                <div className="flex items-center gap-4 min-w-[200px] justify-end border-t md:border-t-0 pt-4 md:pt-0 w-full md:w-auto">
                  <div className="text-right">
                    <span className="font-serif text-2xl font-bold text-[#173D32]">
                      ₹{flight.price.toLocaleString("en-IN")}
                    </span>
                    <p className="text-[10px] text-[#737B76]">per passenger</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookFlight(flight)}
                    className="px-5 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Select
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
          serviceType: "Flight Tickets",
          origin: selectedFlight?.origin || origin,
          destination: selectedFlight?.destination || destination,
          budget: selectedFlight?.price || 4850,
        }}
      />

      <AiTravelAgentModal />

      <CustomerFooter />
    </div>
  );
}
