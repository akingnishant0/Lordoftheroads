"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";
import { DESTINATIONS_DATA } from "@/data/travelData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DestinationDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const destination = DESTINATIONS_DATA.find((d) => d.slug === slug || d.id === slug);

  if (!destination) {
    notFound();
  }

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "stay" | "reviews">("overview");

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[480px] bg-[#173D32] overflow-hidden">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover opacity-60 mix-blend-overlay scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173D32] via-[#173D32]/40 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Link href="/destinations" className="text-xs font-semibold text-[#EDE5D8] hover:underline">
                ← All Destinations
              </Link>
              <span className="text-white/40">•</span>
              <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#B7955B] text-[#173D32]">
                {destination.category}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                {destination.isInternational ? "International" : "Domestic India"}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
              {destination.name}
            </h1>
            <p className="text-base sm:text-xl text-[#EDE5D8] font-light max-w-2xl mb-6">
              {destination.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#FAF8F4]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#B7955B] font-bold">★ {destination.rating}</span>
                <span className="text-white/60">({destination.reviewsCount} reviews)</span>
              </div>
              <div>
                <span className="text-white/60">Duration: </span>
                <span className="font-semibold">{destination.duration}</span>
              </div>
              <div>
                <span className="text-white/60">Best Time: </span>
                <span className="font-semibold">{destination.bestTimeToVisit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Booking Sticky Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left 2 Cols: Details & Tabs */}
            <div className="lg:col-span-2 space-y-8">
              {/* Navigation Tabs */}
              <div className="flex border-b border-[#E7E6E0] gap-8">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`pb-3 text-sm font-semibold transition border-b-2 cursor-pointer ${
                    activeTab === "overview"
                      ? "border-[#173D32] text-[#173D32]"
                      : "border-transparent text-[#737B76] hover:text-[#242A28]"
                  }`}
                >
                  Overview & Highlights
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("itinerary")}
                  className={`pb-3 text-sm font-semibold transition border-b-2 cursor-pointer ${
                    activeTab === "itinerary"
                      ? "border-[#173D32] text-[#173D32]"
                      : "border-transparent text-[#737B76] hover:text-[#242A28]"
                  }`}
                >
                  Suggested Itinerary
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("stay")}
                  className={`pb-3 text-sm font-semibold transition border-b-2 cursor-pointer ${
                    activeTab === "stay"
                      ? "border-[#173D32] text-[#173D32]"
                      : "border-transparent text-[#737B76] hover:text-[#242A28]"
                  }`}
                >
                  Stay & Experiences
                </button>
              </div>

              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#173D32] mb-3">About {destination.name}</h3>
                    <p className="text-base text-[#242A28]/80 leading-relaxed font-normal">
                      {destination.overview}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm uppercase font-bold tracking-wider text-[#173D32] mb-3">Trip Highlights</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {destination.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#E7E6E0]">
                          <span className="w-5 h-5 rounded-full bg-[#173D32]/10 text-[#173D32] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span className="text-sm text-[#242A28] font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "itinerary" && (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-[#173D32] mb-2">Curated Day-by-Day Journey</h3>
                  <div className="space-y-4 border-l-2 border-[#EDE5D8] pl-6 ml-3">
                    {destination.itinerarySummary.map((item) => (
                      <div key={item.day} className="relative group">
                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#173D32] border-2 border-white"></div>
                        <span className="text-xs uppercase font-bold tracking-wider text-[#B7955B]">Day 0{item.day}</span>
                        <h4 className="text-base font-bold text-[#173D32] mt-0.5 mb-1">{item.title}</h4>
                        <p className="text-sm text-[#737B76] leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "stay" && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white border border-[#E7E6E0] space-y-3">
                    <span className="text-xs uppercase font-bold text-[#287C70] tracking-wider">Recommended Stay</span>
                    <h4 className="font-serif text-xl font-bold text-[#173D32]">{destination.recommendedStay}</h4>
                    <p className="text-sm text-[#737B76]">
                      Hand-inspected property matching our verified hospitality, hygiene, and local authentic charm standards.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-[#E7E6E0] space-y-3">
                    <span className="text-xs uppercase font-bold text-[#B7955B] tracking-wider">Signature Experience</span>
                    <h4 className="font-serif text-xl font-bold text-[#173D32]">{destination.recommendedActivity}</h4>
                    <p className="text-sm text-[#737B76]">
                      Private, curated with local heritage guides. Fully vetted for safety and exceptional cultural depth.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Booking Box */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border border-[#E7E6E0] rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#737B76]">Starting from</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-3xl font-bold text-[#173D32]">
                      ₹{destination.startingPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[#737B76]">/ person</span>
                  </div>
                  <p className="text-[11px] text-[#287C70] mt-1 font-medium">Includes accommodation, transfers & breakfasts</p>
                </div>

                <div className="space-y-3 border-t border-b border-[#E7E6E0] py-4 text-xs space-y-2">
                  <div className="flex justify-between text-[#737B76]">
                    <span>Suggested duration</span>
                    <span className="font-semibold text-[#242A28]">{destination.duration}</span>
                  </div>
                  <div className="flex justify-between text-[#737B76]">
                    <span>Best travel window</span>
                    <span className="font-semibold text-[#242A28]">{destination.bestTimeToVisit.split("&")[0]}</span>
                  </div>
                  <div className="flex justify-between text-[#737B76]">
                    <span>Availability check</span>
                    <span className="font-semibold text-emerald-700">● Live on Booking Engine</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white font-semibold text-sm transition shadow-sm hover:shadow text-center cursor-pointer"
                >
                  Book This Destination
                </button>

                <Link
                  href={`/travel-agent?prompt=Plan+a+custom+trip+to+${encodeURIComponent(destination.name)}+with+budget+and+itinerary`}
                  className="w-full block py-2.5 px-4 rounded-xl border border-[#173D32] text-[#173D32] hover:bg-[#FAF8F4] font-medium text-xs text-center transition"
                >
                  Customize with AI Travel Agent 🤖
                </Link>

                <div className="text-center">
                  <span className="text-[11px] text-[#737B76]">
                    Zero fake availability • 100% Verified live quotes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BookingFlowModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialData={{
          destination: destination.name,
          serviceType: "Holiday Packages",
          budget: destination.startingPrice,
        }}
      />

      <AiTravelAgentModal />

      <CustomerFooter />
    </div>
  );
}
