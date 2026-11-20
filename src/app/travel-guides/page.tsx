"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";

interface GuideProfile {
  id: string;
  name: string;
  category: string;
  region: string;
  state: string;
  languages: string[];
  experience: string;
  rating: number;
  reviewsCount: number;
  dailyRate: number;
  image: string;
  bio: string;
  verifiedBadge: string;
}

const VERIFIED_GUIDES: GuideProfile[] = [
  {
    id: "pandit-kailash",
    name: "Pandit Kailash Nath Mishra",
    category: "Vedic & River Heritage Storyteller",
    region: "Varanasi & Sarnath",
    state: "Uttar Pradesh",
    languages: ["Hindi", "Sanskrit", "English"],
    experience: "22 Years",
    rating: 4.99,
    reviewsCount: 312,
    dailyRate: 2500,
    image: "/images/profile1.jpg",
    bio: "Eighth-generation Kashi resident with comprehensive mastery over temple lore, ghat rituals, philosophy of Kabir and Tulsi, and dawn boat journeys.",
    verifiedBadge: "Ministry of Tourism Certified",
  },
  {
    id: "tashi-dorje",
    name: "Tashi Dorje & Team",
    category: "Senior High-Altitude Mountaineering Guide",
    region: "Leh, Nubra, Zanskar & Spiti",
    state: "Ladakh",
    languages: ["Ladakhi", "Hindi", "English", "Tibetan"],
    experience: "15 Years",
    rating: 4.97,
    reviewsCount: 245,
    dailyRate: 3500,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    bio: "Certified Nehru Institute of Mountaineering instructor. Specialized in pass crossings, acclimatization protocol, and rescue management.",
    verifiedBadge: "IMF Certified Mountain Leader",
  },
  {
    id: "surendra-shekhawat",
    name: "Surendra Singh Shekhawat",
    category: "Rajput History & Havelis Fresco Guide",
    region: "Shekhawati, Jaipur & Jodhpur",
    state: "Rajasthan",
    languages: ["Rajasthani", "Hindi", "English", "French"],
    experience: "14 Years",
    rating: 4.94,
    reviewsCount: 189,
    dailyRate: 2800,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    bio: "Passionate conservationist and storyteller deciphering the open-air fresco art galleries, royal stepwells, and desert forts of Rajasthan.",
    verifiedBadge: "Rajasthan Tourism Approved",
  },
  {
    id: "ananya-bhattacharya",
    name: "Ananya Bhattacharya",
    category: "Temple Sculpture & Classical Art Historian",
    region: "Bhubaneswar, Konark & Puri",
    state: "Odisha",
    languages: ["Odia", "Bengali", "Hindi", "English"],
    experience: "10 Years",
    rating: 4.96,
    reviewsCount: 140,
    dailyRate: 2400,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    bio: "Art curator guiding travelers through the Kalinga school of architecture, ancient rock inscriptions, and classical Odissi dance roots.",
    verifiedBadge: "Archaeological Historian",
  },
  {
    id: "ravindran-nair",
    name: "Captain Ravindran Nair",
    category: "Backwater Ecosystem & Spice Trail Guide",
    region: "Kumarakom, Alleppey & Wayanad",
    state: "Kerala",
    languages: ["Malayalam", "Tamil", "Hindi", "English"],
    experience: "18 Years",
    rating: 4.98,
    reviewsCount: 220,
    dailyRate: 2600,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
    bio: "Expert canoe navigator guiding through unmapped backwater canals, organic spice plantations, and Ayurvedic medicinal flora.",
    verifiedBadge: "Eco-Tourism Accredited",
  },
  {
    id: "pemba-sherpa",
    name: "Pemba Sherpa",
    category: "Himalayan Forest Naturalist & Birding Guide",
    region: "Uttarkashi, Gangotri & Harsil",
    state: "Uttarakhand",
    languages: ["Hindi", "Garhwali", "English"],
    experience: "12 Years",
    rating: 4.95,
    reviewsCount: 168,
    dailyRate: 2200,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
    bio: "Born and raised along the Bhagirathi river, Pemba knows every hidden alpine stream, deodar forest trail, and local village folklore in Harsil valley.",
    verifiedBadge: "Uttarakhand Forest Dept. Licensed",
  },
];

export default function TravelGuidesPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [bookedGuide, setBookedGuide] = useState<GuideProfile | null>(null);

  const regions = ["All", "Uttar Pradesh", "Ladakh", "Rajasthan", "Odisha", "Kerala", "Uttarakhand"];

  const filteredGuides =
    selectedRegion === "All"
      ? VERIFIED_GUIDES
      : VERIFIED_GUIDES.filter((g) => g.state.toLowerCase() === selectedRegion.toLowerCase());

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F0605] flex flex-col font-sans">
      <CustomerHeader />

      {/* Breadcrumb Header */}
      <div className="bg-[#FAF8F5] border-b border-[#E7E6E0] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#737B76]">
          <Link href="/" className="hover:text-[#BA1E04] transition">Home</Link>
          <span>/</span>
          <span className="text-[#BA1E04] font-semibold">Travel Guides</span>
          <span>/</span>
          <Link href="/archaeologist" className="hover:text-[#BA1E04] transition">Archaeologists</Link>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#1F0605] via-[#4A100A] to-[#1F0605] text-[#FAF8F5] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA1E04]/30 border border-[#EE6C19]/40 text-[#FBF774] text-xs font-bold uppercase tracking-wider">
              <span>🧭</span>
              <span>Certified Regional Curators & Storytellers</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Native Travel Guides of India
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/85 leading-relaxed">
              Experience places through the eyes of those who have lived there for generations. Certified heritage guides, alpine mountaineers, and local storytellers.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/archaeologist"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-md hover:brightness-105 transition"
              >
                Meet Lead Archaeologist 🏺
              </Link>
              <Link
                href="/support"
                className="px-5 py-2.5 rounded-xl border border-white/30 text-[#FBF774] text-xs font-semibold hover:bg-white/10 transition"
              >
                24/7 Concierge Support 💬
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center w-full md:w-72 shrink-0">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 p-2 border border-[#FBF774]">
              <img src="/images/icon6.png" alt="Travel Guides" className="w-full h-full object-contain" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">100% Verified</h3>
            <p className="text-xs text-[#FAF8F5]/80 mt-1">
              Government empanelled, background checked, and rated by real travelers.
            </p>
          </div>
        </div>
      </section>

      {/* Region Filter */}
      <section className="bg-white border-b border-[#E7E6E0] py-4 px-4 sm:px-6 lg:px-8 sticky top-18 z-20">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-[#737B76] mr-2 shrink-0">Filter Region:</span>
          {regions.map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition shrink-0 cursor-pointer border ${
                selectedRegion === reg
                  ? "bg-[#BA1E04] text-white border-[#BA1E04] shadow-xs"
                  : "bg-[#FAF8F5] text-[#737B76] border-[#E7E6E0] hover:text-[#1F0605]"
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </section>

      {/* Guides Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#BA1E04] shrink-0 bg-neutral-100">
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#EE6C19] block">
                      {guide.category}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#1F0605] group-hover:text-[#BA1E04] transition">
                      {guide.name}
                    </h3>
                    <span className="text-xs text-[#737B76] block">📍 {guide.region}, {guide.state}</span>
                    <span className="text-xs font-semibold text-[#BA1E04]">⭐ {guide.rating} ({guide.reviewsCount} reviews)</span>
                  </div>
                </div>

                <div className="inline-block px-2.5 py-1 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-[10px] font-bold text-[#BA1E04]">
                  ✓ {guide.verifiedBadge}
                </div>

                <p className="text-xs text-[#737B76] leading-relaxed line-clamp-3">
                  {guide.bio}
                </p>

                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E7E6E0] space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#737B76]">Experience:</span>
                    <span className="font-bold text-[#1F0605]">{guide.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#737B76]">Languages:</span>
                    <span className="font-semibold text-[#1F0605]">{guide.languages.join(", ")}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E6E0] mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#737B76] block">Day Fee</span>
                  <span className="text-sm font-bold text-[#BA1E04]">₹{guide.dailyRate.toLocaleString("en-IN")}</span>
                  <span className="text-[10px] text-[#737B76]"> / day</span>
                </div>
                <button
                  type="button"
                  onClick={() => setBookedGuide(guide)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-xs hover:brightness-105 transition cursor-pointer"
                >
                  Book Guide ➔
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {bookedGuide && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 border border-[#E7E6E0] shadow-2xl animate-fadeIn">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#BA1E04] tracking-wider">
                    Reserve Local Guide
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1F0605] mt-1">{bookedGuide.name}</h3>
                  <span className="text-xs text-[#737B76]">{bookedGuide.category}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setBookedGuide(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#1F0605] font-bold flex items-center justify-center hover:bg-neutral-200 transition"
                >
                  ✕
                </button>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E7E6E0] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#737B76]">Region:</span>
                  <span className="font-bold text-[#1F0605]">{bookedGuide.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737B76]">Daily Rate:</span>
                  <span className="font-bold text-[#BA1E04]">₹{bookedGuide.dailyRate} / day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737B76]">Certification:</span>
                  <span className="font-bold text-emerald-700">✓ {bookedGuide.verifiedBadge}</span>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Booking request sent for ${bookedGuide.name}! Our concierge will connect you directly.`);
                  setBookedGuide(null);
                }}
                className="space-y-3 pt-2"
              >
                <div>
                  <label className="block text-xs font-bold text-[#1F0605] mb-1">Your Travel Date</label>
                  <input
                    type="date"
                    required
                    defaultValue="2026-12-20"
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E6E0] text-xs outline-none focus:ring-1 focus:ring-[#BA1E04]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1F0605] mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E6E0] text-xs outline-none focus:ring-1 focus:ring-[#BA1E04]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-md hover:brightness-105 transition cursor-pointer"
                >
                  Confirm Guide Reservation ➔
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <CustomerFooter />
    </div>
  );
}
