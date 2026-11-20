"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";

interface ArchaeologistProfile {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  image: string;
  location: string;
  rating: number;
  expeditionsCount: number;
  bio: string;
  keyProjects: string[];
  badges: string[];
}

const ARCHAEOLOGISTS: ArchaeologistProfile[] = [
  {
    id: "dheerendra-sharma",
    name: "Dheerendra Sharma",
    title: "Chief Field Archaeologist & Heritage Conservator",
    specialization: "Ancient Temple Architecture & Rock Edict Epigraphy",
    experience: "16+ Years",
    image: "/images/profiledt1.jpg",
    location: "Uttarakhand & Madhya Pradesh",
    rating: 4.98,
    expeditionsCount: 142,
    bio: "Pioneering researcher focused on documenting Himalayan temple architecture, ancient trade passages, and historical stone inscriptions. Dedicated to making ancient Indian civilizational history accessible to passionate travelers.",
    keyProjects: [
      "Bhagirathi Valley Rock Cave Formations",
      "Kedar Khanda Temple Chronology Project",
      "Central Indian Rock Art Epigraphy Survey",
    ],
    badges: ["ASI Empanelled", "Field Director", "Lead Curator"],
  },
  {
    id: "dr-meenakshi-sundaram",
    name: "Dr. Meenakshi Sundaram",
    title: "Senior Epigraphist & Dravidian Architecture Specialist",
    specialization: "Chola Bronzes & Pallava Rock-Cut Shrines",
    experience: "14 Years",
    image: "/images/profile1.jpg",
    location: "Tamil Nadu & Karnataka",
    rating: 4.95,
    expeditionsCount: 98,
    bio: "Expert in Brahmi and Grantha scripts with deep expertise in decode-reading temple inscriptions at Thanjavur, Mahabalipuram, and Badami.",
    keyProjects: ["Brihadisvara Inscription Mapping", "Pattadakal Structural Analysis"],
    badges: ["PhD Archaeology", "Epigraphist of the Year"],
  },
  {
    id: "vikram-singh-rathore",
    name: "Vikram Singh Rathore",
    title: "Fortress Architect & Rajput Heritage Researcher",
    specialization: "Medieval Water Harvesting & Fort Defense Networks",
    experience: "11 Years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    location: "Rajasthan & Gujarat",
    rating: 4.92,
    expeditionsCount: 84,
    bio: "Uncovering the engineering ingenuity of stepwells (baolis), hill fort bastions, and desert caravan sarais across the Thar Desert.",
    keyProjects: ["Kumbhalgarh Bastion Documentation", "Rani ki Vav Hydrology Study"],
    badges: ["Heritage Conservator", "Stepwell Specialist"],
  },
];

export default function ArchaeologistPage() {
  const [selectedProfile, setSelectedProfile] = useState<ArchaeologistProfile>(ARCHAEOLOGISTS[0]);
  const [activeTab, setActiveTab] = useState<"about" | "expeditions" | "consultation">("about");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [consultForm, setConsultForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "2026-12-20",
    destination: "Garhwal & Kedar Valley",
    notes: "",
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F0605] flex flex-col font-sans">
      <CustomerHeader />

      {/* Breadcrumb Navigation matching original prototype */}
      <div className="bg-[#FAF8F5] border-b border-[#E7E6E0] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#737B76] overflow-x-auto">
          <Link href="/" className="hover:text-[#BA1E04] transition">Home</Link>
          <span>/</span>
          <Link href="/archaeological-sites" className="hover:text-[#BA1E04] transition">Archaeological Sites</Link>
          <span>/</span>
          <span className="text-[#BA1E04] font-semibold">Archaeologist</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#1F0605] via-[#2F0B09] to-[#1F0605] text-[#FAF8F5] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#BA1E04]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA1E04]/30 border border-[#EE6C19]/40 text-[#FBF774] text-xs font-bold uppercase tracking-wider">
              <span>🏛️</span>
              <span>Lord Of The Roads • Heritage & Epigraphy</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Archaeologists & Field Historians
            </h1>
            <p className="text-sm sm:text-base text-[#FAF8F5]/80 leading-relaxed font-serif italic">
              "The purpose of Archaeology is to study how people in the past interacted with their world. We gather information through detailed study of historic objects, sites, monuments, and living heritage."
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#profiles-section"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-md hover:brightness-110 transition"
              >
                Explore Curators & Historians ➔
              </a>
              <Link
                href="/archaeological-sites"
                className="px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-[#FBF774] text-xs font-semibold transition"
              >
                View Ancient Monument Sites 🏛️
              </Link>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 grid grid-cols-2 gap-4 w-full md:w-80 shrink-0 text-center">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-2xl font-bold text-[#FBF774] block">42+</span>
              <span className="text-[11px] text-[#FAF8F5]/70 uppercase tracking-wider">Certified Scholars</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-2xl font-bold text-[#EE6C19] block">1,200+</span>
              <span className="text-[11px] text-[#FAF8F5]/70 uppercase tracking-wider">Documented Sites</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-2xl font-bold text-[#FBF774] block">100%</span>
              <span className="text-[11px] text-[#FAF8F5]/70 uppercase tracking-wider">ASI Verified</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-2xl font-bold text-[#EE6C19] block">4.96 ★</span>
              <span className="text-[11px] text-[#FAF8F5]/70 uppercase tracking-wider">Explorer Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Featured Profile & Explorer Directory */}
      <main id="profiles-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Featured Profile Details (Honoring original prodetails.html) */}
        <div className="bg-white rounded-3xl border border-[#E7E6E0] shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF8F5] to-white border-b border-[#E7E6E0] flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#BA1E04] shadow-md shrink-0 bg-neutral-100">
              <img
                src={selectedProfile.image}
                alt={selectedProfile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/profile1.jpg";
                }}
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {selectedProfile.badges.map((b) => (
                  <span
                    key={b}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFF7ED] text-[#BA1E04] border border-[#FED7AA]"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F0605]">
                {selectedProfile.name}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#EE6C19]">
                {selectedProfile.title} • <span className="text-[#737B76]">{selectedProfile.location}</span>
              </p>
              <p className="text-xs sm:text-sm text-[#737B76] max-w-3xl leading-relaxed">
                {selectedProfile.bio}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-[#1F0605]">
                <span>⭐ <strong>{selectedProfile.rating}</strong> (Explorer Rating)</span>
                <span>🧭 <strong>{selectedProfile.expeditionsCount}</strong> Led Expeditions</span>
                <span>⏳ <strong>{selectedProfile.experience}</strong> Field Research</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab("consultation")}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold text-center shadow-xs hover:brightness-105 transition cursor-pointer"
              >
                Book Guided Expedition 📅
              </button>
              <Link
                href="/stories"
                className="px-5 py-2.5 rounded-xl border border-[#E7E6E0] hover:bg-[#FAF8F5] text-xs font-semibold text-[#1F0605] text-center transition"
              >
                Read Field Chronicles 📜
              </Link>
            </div>
          </div>

          {/* Tab Navigation (About, Key Expeditions, Book Consultation) */}
          <div className="border-b border-[#E7E6E0] px-6 sm:px-8 flex items-center gap-6 bg-[#FAF8F5] text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("about")}
              className={`py-3.5 border-b-2 transition cursor-pointer ${
                activeTab === "about"
                  ? "border-[#BA1E04] text-[#BA1E04]"
                  : "border-transparent text-[#737B76] hover:text-[#1F0605]"
              }`}
            >
              📖 About & Methodology
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("expeditions")}
              className={`py-3.5 border-b-2 transition cursor-pointer ${
                activeTab === "expeditions"
                  ? "border-[#BA1E04] text-[#BA1E04]"
                  : "border-transparent text-[#737B76] hover:text-[#1F0605]"
              }`}
            >
              🏺 Major Expeditions & Findings
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("consultation")}
              className={`py-3.5 border-b-2 transition cursor-pointer ${
                activeTab === "consultation"
                  ? "border-[#BA1E04] text-[#BA1E04]"
                  : "border-transparent text-[#737B76] hover:text-[#1F0605]"
              }`}
            >
              ✉️ Book Consultation & Trail Guide
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1F0605] mb-2">Research Background</h3>
                  <p className="text-xs sm:text-sm text-[#737B76] leading-relaxed">
                    Over the last 16 years, field studies have combined archaeological surveying, photogrammetry, and regional oral history to preserve the memory of endangered rock carvings and forgotten pilgrimage arteries across the Garhwal and Kumaon Himalayas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E6E0]">
                    <span className="text-lg mb-1 block">🗿</span>
                    <h4 className="font-bold text-xs text-[#1F0605]">Rock Inscription Epigraphy</h4>
                    <p className="text-[11px] text-[#737B76] mt-1">Decoding Ashokan Brahmi, Shankhalipi, and Nagari stone edicts across North India.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E6E0]">
                    <span className="text-lg mb-1 block">🗺️</span>
                    <h4 className="font-bold text-xs text-[#1F0605]">Ancient Route Cartography</h4>
                    <p className="text-[11px] text-[#737B76] mt-1">Reconstructing ancient Himalayan salt, wool, and trade corridors across Bhagirathi and Alaknanda.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E6E0]">
                    <span className="text-lg mb-1 block">🛡️</span>
                    <h4 className="font-bold text-xs text-[#1F0605]">Community Heritage Safeguard</h4>
                    <p className="text-[11px] text-[#737B76] mt-1">Training local villagers and trek leaders in the non-destructive conservation of ancient monuments.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "expeditions" && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#1F0605]">Featured Key Expeditions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProfile.keyProjects.map((proj, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E6E0] flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#EE6C19]">Documented Project</span>
                        <h4 className="font-serif font-bold text-sm text-[#1F0605]">{proj}</h4>
                        <p className="text-[11px] text-[#737B76] mt-0.5">High-definition photogrammetry & site cataloging completed with Lord Of The Roads field team.</p>
                      </div>
                      <Link
                        href="/archaeological-sites"
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#BA1E04] text-[#BA1E04] text-[11px] font-bold shrink-0 hover:bg-[#BA1E04] hover:text-white transition"
                      >
                        View Sites ➔
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "consultation" && (
              <div className="max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-[#1F0605] mb-1">
                  Schedule Private Heritage Consultation with {selectedProfile.name}
                </h3>
                <p className="text-xs text-[#737B76] mb-6">
                  Plan an in-depth archaeological field walk, historical itinerary curation, or academic expedition support.
                </p>

                {bookingSuccess && (
                  <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold">
                    ✓ Thank you! Your expedition request has been sent to {selectedProfile.name}. Our heritage concierge team will contact you within 4 hours.
                  </div>
                )}

                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1F0605] mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Verma"
                        value={consultForm.name}
                        onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E7E6E0] text-xs focus:ring-1 focus:ring-[#BA1E04] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1F0605] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={consultForm.phone}
                        onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E7E6E0] text-xs focus:ring-1 focus:ring-[#BA1E04] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1F0605] mb-1">Target Heritage Region</label>
                      <input
                        type="text"
                        value={consultForm.destination}
                        onChange={(e) => setConsultForm({ ...consultForm, destination: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E7E6E0] text-xs focus:ring-1 focus:ring-[#BA1E04] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1F0605] mb-1">Preferred Travel Date</label>
                      <input
                        type="date"
                        value={consultForm.date}
                        onChange={(e) => setConsultForm({ ...consultForm, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E7E6E0] text-xs focus:ring-1 focus:ring-[#BA1E04] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1F0605] mb-1">Expedition Scope / Questions</label>
                    <textarea
                      rows={3}
                      placeholder="Specify temple circuits, rock caves, or academic research needs..."
                      value={consultForm.notes}
                      onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#E7E6E0] text-xs focus:ring-1 focus:ring-[#BA1E04] outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-md hover:brightness-105 transition cursor-pointer"
                  >
                    Confirm Consultation Request ➔
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Directory of All Archaeologists & Epigraphists */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA1E04]">
                Lord Of The Roads Scholars
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1F0605]">
                Curators & Field Archaeologists Directory
              </h3>
            </div>
            <p className="text-xs text-[#737B76]">
              Select a researcher to review their field credentials and consultation availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARCHAEOLOGISTS.map((arch) => {
              const isCurrent = selectedProfile.id === arch.id;
              return (
                <div
                  key={arch.id}
                  onClick={() => {
                    setSelectedProfile(arch);
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                  className={`bg-white rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? "border-[#BA1E04] shadow-md ring-2 ring-[#BA1E04]/20"
                      : "border-[#E7E6E0] hover:border-[#EE6C19]/50 hover:shadow-md"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#BA1E04] shrink-0 bg-neutral-100">
                        <img
                          src={arch.image}
                          alt={arch.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/profile1.jpg";
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#1F0605]">{arch.name}</h4>
                        <span className="text-xs text-[#EE6C19] font-medium block">{arch.location}</span>
                        <span className="text-[11px] text-[#737B76]">⭐ {arch.rating} ({arch.expeditionsCount} expeditions)</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#737B76] line-clamp-3 leading-relaxed">
                      {arch.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E7E6E0] mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#1F0605]">{arch.experience} Exp.</span>
                    <span className="text-xs font-bold text-[#BA1E04] group-hover:underline">
                      {isCurrent ? "Currently Selected ✓" : "View Profile ➔"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}
