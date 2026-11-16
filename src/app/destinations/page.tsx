"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";

interface DestinationItem {
  id: string;
  name: string;
  country: string;
  category: "Mountain" | "Beach" | "Cultural" | "Adventure" | "Wellness" | "Nature";
  isInternational: boolean;
  bestTimeToVisit: string;
  duration: string;
  estimatedBudget: number;
  rating: number;
  reviewsCount: number;
  tagline: string;
  highlights: string[];
  recommendedStay: string;
  recommendedActivity: string;
  image: string;
}

const DESTINATIONS: DestinationItem[] = [
  {
    id: "dest-kashmir",
    name: "Kashmir Valley",
    country: "India",
    category: "Mountain",
    isInternational: false,
    bestTimeToVisit: "April – October (Spring/Autumn) & Dec – Feb (Snow)",
    duration: "5 – 7 Days",
    estimatedBudget: 28500,
    rating: 4.9,
    reviewsCount: 642,
    tagline: "Paradise on Earth with Dal Lake houseboats and snow-capped peaks",
    highlights: ["Shikara ride on Dal Lake", "Gondola ride at Gulmarg Phase 2", "Betaab Valley & Aru in Pahalgam", "Saffron farm walks in Pampore"],
    recommendedStay: "Heritage Wooden Houseboat or Mountain Resort",
    recommendedActivity: "Guided Pahalgam meadow trek with local tea",
    image: "🏔️",
  },
  {
    id: "dest-kerala",
    name: "Kerala Backwaters & Munnar",
    country: "India",
    category: "Nature",
    isInternational: false,
    bestTimeToVisit: "September – March",
    duration: "5 – 6 Days",
    estimatedBudget: 22800,
    rating: 4.85,
    reviewsCount: 820,
    tagline: "Slow days by peaceful backwaters, lush tea hills, and Ayurvedic wellness",
    highlights: ["Private Alleppey Houseboat with chef", "Munnar tea plantation jeep safari", "Periyar wildlife boat safari", "Kathakali cultural performance"],
    recommendedStay: "Waterfront Private Villa or Tea Estate Bungalow",
    recommendedActivity: "Evening sunset cruise through backwater canals",
    image: "🌴",
  },
  {
    id: "dest-rajasthan",
    name: "Royal Rajasthan (Jaipur & Jaisalmer)",
    country: "India",
    category: "Cultural",
    isInternational: false,
    bestTimeToVisit: "October – March",
    duration: "6 – 8 Days",
    estimatedBudget: 26500,
    rating: 4.92,
    reviewsCount: 910,
    tagline: "Golden sand dunes, majestic amber forts, and heritage palatial stays",
    highlights: ["Amer Fort sunrise visit", "Sam Sand Dunes luxury desert camp", "Jodhpur Blue City heritage walk", "Folk acoustic & campfire night"],
    recommendedStay: "Royal Heritage Haveli or Desert Glamping Swiss Tent",
    recommendedActivity: "Private camel safari and stargazing in Thar desert",
    image: "🏰",
  },
  {
    id: "dest-ladakh",
    name: "High Roads of Ladakh",
    country: "India",
    category: "Adventure",
    isInternational: false,
    bestTimeToVisit: "May – September",
    duration: "7 – 8 Days",
    estimatedBudget: 34500,
    rating: 4.95,
    reviewsCount: 512,
    tagline: "High mountain passes, magnetic hills, and azure Pangong Tso",
    highlights: ["Pangong Lake sunrise camp", "Khardung La (17,982 ft pass)", "Nubra Valley Bactrian camel ride", "Thiksey & Diskit monasteries"],
    recommendedStay: "Luxury Geodesic Domes near Pangong Lake",
    recommendedActivity: "Chauffeured 4x4 off-road mountain traverse",
    image: "🌌",
  },
  {
    id: "dest-goa",
    name: "Goa (Heritage & Coastal)",
    country: "India",
    category: "Beach",
    isInternational: false,
    bestTimeToVisit: "November – April",
    duration: "4 – 5 Days",
    estimatedBudget: 18500,
    rating: 4.8,
    reviewsCount: 1240,
    tagline: "Portuguese heritage quarters, serene south beaches, and sunset cruises",
    highlights: ["Fontainhas Latin Quarter heritage walk", "Dudhsagar waterfalls jeep trek", "Sunset catamaran cruise", "Spice plantation organic lunch"],
    recommendedStay: "Portuguese Boutique Villa with private plunge pool",
    recommendedActivity: "South Goa private island dolphin-spotting boat",
    image: "🏖️",
  },
  {
    id: "dest-dubai",
    name: "Dubai & Desert Safari",
    country: "United Arab Emirates",
    category: "Cultural",
    isInternational: true,
    bestTimeToVisit: "November – March",
    duration: "5 – 6 Days",
    estimatedBudget: 48000,
    rating: 4.88,
    reviewsCount: 780,
    tagline: "Futuristic architecture, red dune desert safaris, and luxury shopping",
    highlights: ["Burj Khalifa At the Top 124th floor", "Red Dune 4x4 desert safari with BBQ", "Marina luxury yacht cruise", "Museum of the Future"],
    recommendedStay: "Downtown 5-Star Hotel or Palm Jumeirah Beachfront",
    recommendedActivity: "Desert starlight dinner with Tanoura folk show",
    image: "🏙️",
  },
  {
    id: "dest-bali",
    name: "Bali (Ubud & Seminyak)",
    country: "Indonesia",
    category: "Wellness",
    isInternational: true,
    bestTimeToVisit: "April – October",
    duration: "6 – 7 Days",
    estimatedBudget: 42000,
    rating: 4.91,
    reviewsCount: 650,
    tagline: "Emerald rice terraces, ancient water temples, and tropical beach sunsets",
    highlights: ["Tegallalang rice terrace & jungle swing", "Mount Batur sunrise jeep tour", "Uluwatu sunset cliff temple", "Nusa Penida island day trip"],
    recommendedStay: "Private Jungle Pool Villa in Ubud",
    recommendedActivity: "Traditional Balinese holistic wellness & flower bath",
    image: "🌺",
  },
  {
    id: "dest-switzerland",
    name: "Swiss Alps & Interlaken",
    country: "Switzerland",
    category: "Mountain",
    isInternational: true,
    bestTimeToVisit: "May – September (Hikes) & Dec – March (Ski)",
    duration: "7 – 8 Days",
    estimatedBudget: 115000,
    rating: 4.98,
    reviewsCount: 420,
    tagline: "Glacier summits, panoramic alpine trains, and crystal clear mountain lakes",
    highlights: ["Jungfraujoch – Top of Europe", "Scenic Glacier Express panoramic train", "Lake Brienz steamboat cruise", "Zermatt & Matterhorn views"],
    recommendedStay: "Alpine Chalet with balcony mountain vistas",
    recommendedActivity: "First Cliff Walk and Grindelwald cable car",
    image: "❄️",
  },
];

export default function DestinationsExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [destinationType, setDestinationType] = useState<"ALL" | "DOMESTIC" | "INTERNATIONAL">("ALL");

  // Booking Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<any>({});

  const filteredDestinations = DESTINATIONS.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "ALL" || d.category === selectedCategory;

    const matchesType =
      destinationType === "ALL" ||
      (destinationType === "DOMESTIC" && !d.isInternational) ||
      (destinationType === "INTERNATIONAL" && d.isInternational);

    return matchesSearch && matchesCategory && matchesType;
  });

  const router = useRouter();

  const handleOpenBooking = (dest: DestinationItem) => {
    router.push(`/checkout?item=${encodeURIComponent(dest.name + " " + dest.duration + " Travel Package")}&price=${dest.estimatedBudget}&travellers=2`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#FAF8F4]/95 backdrop-blur-md border-b border-[#E6DFD3] px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#B7955B]/60 shadow-sm group-hover:scale-105 transition-transform bg-black shrink-0">
            <img src="/logo.jpg" alt="Lord of the Roads" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base text-[#173D32] leading-tight">lord of the road</span>
            <small className="block text-[9px] tracking-widest text-[#B7955B] uppercase font-bold">
              DESTINATION EXPLORER
            </small>
          </div>
        </Link>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <Link href="/" className="hover:text-[#287C70]">Home</Link>
          <Link href="/customer" className="hover:text-[#287C70]">My Trips</Link>
          <Link href="/agent" className="hover:text-[#287C70]">Agent Portal</Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="py-12 px-6 max-w-6xl mx-auto text-center space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#287C70] bg-[#e2e8df] px-3 py-1 rounded-full">
          Curated Destination Guides
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#173D32] tracking-tight">
          Where will the road take you next?
        </h1>
        <p className="text-xs md:text-sm text-[#647470] max-w-2xl mx-auto">
          Explore iconic mountain retreats, tranquil backwaters, golden sand dunes, and hand-crafted international journeys.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-6 max-w-3xl mx-auto space-y-3">
          <div className="flex items-center bg-white p-2 rounded-2xl border border-[#E6DFD3] shadow-xs">
            <span className="text-lg px-2">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by destination or country (e.g. Kashmir, Bali, Switzerland, Kerala)..."
              className="flex-1 px-2 py-2 text-xs bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-gray-400 px-2"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs pt-1">
            <button
              type="button"
              onClick={() => setDestinationType("ALL")}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                destinationType === "ALL" ? "bg-[#173D32] text-white" : "bg-white border border-[#E6DFD3] text-gray-600"
              }`}
            >
              All Types
            </button>
            <button
              type="button"
              onClick={() => setDestinationType("DOMESTIC")}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                destinationType === "DOMESTIC" ? "bg-[#173D32] text-white" : "bg-white border border-[#E6DFD3] text-gray-600"
              }`}
            >
              🇮🇳 Domestic India
            </button>
            <button
              type="button"
              onClick={() => setDestinationType("INTERNATIONAL")}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                destinationType === "INTERNATIONAL" ? "bg-[#173D32] text-white" : "bg-white border border-[#E6DFD3] text-gray-600"
              }`}
            >
              ✈️ International
            </button>

            <span className="text-gray-300 mx-1">|</span>

            {["ALL", "Mountain", "Beach", "Cultural", "Adventure", "Wellness", "Nature"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#287C70] text-white"
                    : "bg-white border border-[#E6DFD3] text-gray-600 hover:border-[#287C70]"
                }`}
              >
                {cat === "ALL" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b border-[#E6DFD3] pb-3">
          <h2 className="font-serif font-bold text-lg text-[#173D32]">
            Showing {filteredDestinations.length} Verified Destination{filteredDestinations.length !== 1 ? "s" : ""}
          </h2>
          <span className="text-xs text-[#647470]">
            Estimated trip budgets clearly labelled with transparent inclusions
          </span>
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#E6DFD3] space-y-2">
            <span className="text-4xl">🗺️</span>
            <h3 className="font-serif font-bold text-base text-[#173D32]">No matching destinations</h3>
            <p className="text-xs text-gray-500">Try clearing filters or search for another region.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-2xl border border-[#E6DFD3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="p-6 bg-gradient-to-br from-[#FAF8F4] to-[#EDE5D8]/40 border-b border-[#E6DFD3] flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{dest.image}</span>
                        <div>
                          <h3 className="font-serif font-bold text-xl text-[#173D32]">{dest.name}</h3>
                          <span className="text-xs text-[#287C70] font-semibold">{dest.country} · {dest.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        ★ {dest.rating} ({dest.reviewsCount})
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs text-[#242A28] leading-relaxed italic">
                      &quot;{dest.tagline}&quot;
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF8F4] p-3 rounded-xl border border-[#E6DFD3]">
                      <div>
                        <span className="text-[10px] text-gray-500 block uppercase font-semibold">Best Time to Visit</span>
                        <b className="text-[#173D32]">{dest.bestTimeToVisit}</b>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block uppercase font-semibold">Suggested Duration</span>
                        <b className="text-[#173D32]">{dest.duration}</b>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1.5">Key Highlights:</span>
                      <ul className="text-xs space-y-1">
                        {dest.highlights.map((h, hi) => (
                          <li key={hi} className="flex items-center gap-2 text-gray-700">
                            <span className="text-[#287C70] font-bold">✓</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-xs space-y-1 pt-2 border-t border-[#E6DFD3]">
                      <p className="text-gray-600">🏨 <b>Curated Stay:</b> {dest.recommendedStay}</p>
                      <p className="text-gray-600">🧭 <b>Signature Experience:</b> {dest.recommendedActivity}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[#FAF8F4] border-t border-[#E6DFD3] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block font-semibold">Estimated Budget</span>
                    <span className="text-lg font-extrabold text-[#173D32]">
                      From ₹{dest.estimatedBudget.toLocaleString("en-IN")}{" "}
                      <span className="text-xs font-normal text-gray-500">/ person</span>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenBooking(dest)}
                      className="px-4 py-2 bg-[#173D32] hover:bg-[#287C70] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                    >
                      Book This Package →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 11-Step Interactive Booking Engine Modal */}
      <BookingFlowModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialData={bookingInitialData}
      />

      {/* Interactive AI Concierge */}
      <AiTravelAgentModal
        onOpenBookingFlow={(data) => {
          setBookingInitialData(data);
          setBookingModalOpen(true);
        }}
      />
    </div>
  );
}
