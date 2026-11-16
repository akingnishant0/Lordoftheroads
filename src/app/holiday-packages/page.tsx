"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";
import { HOLIDAY_PACKAGES_DATA, HolidayPackage } from "@/data/travelData";

export default function HolidayPackagesPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<HolidayPackage | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const filteredPackages = HOLIDAY_PACKAGES_DATA.filter((pkg) => {
    const matchesCategory =
      selectedFilter === "ALL" ||
      pkg.category.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookNow = (pkg: HolidayPackage) => {
    router.push(`/checkout?item=${encodeURIComponent(pkg.title)}&price=${pkg.pricePerPerson}&travellers=2`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow">
        {/* Header Hero */}
        <section className="bg-[#173D32] text-[#FAF8F4] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#287C70]/40">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              Handcrafted Travel Experiences
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 mb-4 tracking-tight">
              Curated Holiday Packages
            </h1>
            <p className="text-sm sm:text-base text-[#EDE5D8] max-w-2xl font-light">
              Explore bespoke holiday itineraries across India and abroad. Every package includes private transfers, hand-inspected stays, daily breakfasts, and verified local guides.
            </p>

            {/* Quick Filter Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {["ALL", "Domestic", "International", "Honeymoon", "Family"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                    selectedFilter === cat
                      ? "bg-[#B7955B] text-[#173D32] shadow-sm"
                      : "bg-[#287C70]/40 text-[#EDE5D8] hover:bg-[#287C70]/60"
                  }`}
                >
                  {cat === "ALL" ? "All Packages" : cat}
                </button>
              ))}

              <div className="relative ml-auto w-full sm:w-64 mt-3 sm:mt-0">
                <input
                  type="text"
                  placeholder="Search destination or package..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-2 pl-9 text-xs bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/20 focus:outline-none focus:border-[#B7955B]"
                />
                <span className="absolute left-3 top-2.5 text-white/50 text-xs">🔍</span>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-[#E7E6E0] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#173D32]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[11px] font-semibold">
                    {pkg.durationDays} Days / {pkg.durationNights} Nights
                  </div>
                  <div className="absolute top-3 right-3 bg-[#B7955B] text-[#173D32] px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {pkg.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 text-xs text-[#737B76] mb-1.5">
                    <span>📍 {pkg.destination}</span>
                    <span>•</span>
                    <span className="text-[#B7955B] font-bold">★ {pkg.rating}</span>
                    <span>({pkg.reviewsCount})</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#173D32] mb-3 group-hover:text-[#287C70] transition">
                    {pkg.title}
                  </h3>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-6 flex-grow">
                    {pkg.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#242A28]/80">
                        <span className="text-[#287C70] font-bold">✓</span>
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 border-t border-[#E7E6E0] flex items-end justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737B76]">From</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-2xl font-bold text-[#173D32]">
                          ₹{pkg.pricePerPerson.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[11px] text-[#737B76] line-through">
                          ₹{pkg.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#287C70] font-medium">per person on twin sharing</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleBookNow(pkg)}
                        className="px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>
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
          serviceType: "Holiday Packages",
          destination: selectedPackage?.destination || "Kashmir",
          budget: selectedPackage?.pricePerPerson || 25000,
        }}
      />

      <AiTravelAgentModal />

      <CustomerFooter />
    </div>
  );
}
