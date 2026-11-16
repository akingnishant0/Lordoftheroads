"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";
import { HOTELS_DATA, HotelProperty } from "@/data/travelData";

export default function HotelsPage() {
  const router = useRouter();
  const [cityFilter, setCityFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedHotel, setSelectedHotel] = useState<HotelProperty | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const filteredHotels = HOTELS_DATA.filter((htl) => {
    const matchesCity =
      cityFilter === "ALL" || htl.city.toLowerCase() === cityFilter.toLowerCase();
    const matchesSearch =
      htl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      htl.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      htl.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const handleBookHotel = (htl: HotelProperty) => {
    router.push(`/checkout?item=${encodeURIComponent(htl.name + " (" + htl.city + ")")}&price=${htl.pricePerNight}&travellers=2`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow">
        {/* Header Hero */}
        <section className="bg-[#173D32] text-[#FAF8F4] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#287C70]/40">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              Handpicked Accommodations
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 mb-3 tracking-tight">
              Hotels & Heritage Resorts
            </h1>
            <p className="text-sm sm:text-base text-[#EDE5D8] max-w-2xl font-light">
              Verified luxury stays, royal heritage havelis, and boutique valley resorts. Enjoy guaranteed rooms, complimentary breakfasts, and flexible cancellation policies.
            </p>

            {/* Search & City Filter */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {["ALL", "Srinagar", "Munnar", "Jaipur", "Dubai"].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setCityFilter(city)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                    cityFilter === city
                      ? "bg-[#B7955B] text-[#173D32]"
                      : "bg-[#287C70]/40 text-[#EDE5D8] hover:bg-[#287C70]/60"
                  }`}
                >
                  {city === "ALL" ? "All Cities" : city}
                </button>
              ))}

              <div className="relative ml-auto w-full sm:w-64 mt-3 sm:mt-0">
                <input
                  type="text"
                  placeholder="Search hotel name or landmark..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-2 pl-9 text-xs bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/20 focus:outline-none focus:border-[#B7955B]"
                />
                <span className="absolute left-3 top-2.5 text-white/50 text-xs">🔍</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hotels List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredHotels.map((htl) => (
              <div
                key={htl.id}
                className="bg-white rounded-2xl border border-[#E7E6E0] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row group"
              >
                {/* Photo */}
                <div className="md:w-5/12 h-60 md:h-auto relative overflow-hidden bg-gray-100">
                  <img
                    src={htl.imageUrl}
                    alt={htl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#173D32]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {htl.type}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#173D32] text-xs font-bold px-2 py-1 rounded">
                    {"★".repeat(htl.stars)} Star
                  </div>
                </div>

                {/* Info */}
                <div className="md:w-7/12 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#737B76] mb-1">
                      <span>📍 {htl.city}, {htl.country}</span>
                      <span className="text-[#B7955B] font-bold">★ {htl.rating} ({htl.reviewsCount})</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#173D32] mb-1 group-hover:text-[#287C70] transition">
                      {htl.name}
                    </h3>
                    <p className="text-xs text-[#737B76] line-clamp-1 mb-4">{htl.address}</p>

                    {/* Amenities Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {htl.amenities.slice(0, 4).map((a, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-[#FAF8F4] border border-[#E7E6E0] text-[11px] text-[#242A28]">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Room Selection Box */}
                  <div className="pt-4 border-t border-[#E7E6E0] flex items-end justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737B76]">Starting per night</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-2xl font-bold text-[#173D32]">
                          ₹{htl.pricePerNight.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-[#737B76]"> + taxes</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-medium">✓ Free Cancellation Available</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBookHotel(htl)}
                      className="px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition cursor-pointer"
                    >
                      Select Room
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
          serviceType: "Hotels",
          destination: selectedHotel?.city || "Srinagar",
          budget: selectedHotel?.pricePerNight || 8500,
        }}
      />

      <AiTravelAgentModal />

      <CustomerFooter />
    </div>
  );
}
