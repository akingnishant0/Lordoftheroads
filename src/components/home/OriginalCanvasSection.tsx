"use client";

import React, { useState } from "react";
import Link from "next/link";

interface PersonaItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  link: string;
  badge: string;
}

const ORIGINAL_PERSONAS: PersonaItem[] = [
  {
    id: "archaeologist",
    name: "Archaeologist",
    category: "Heritage & History",
    icon: "/images/icon1.png",
    description: "Study ancient monuments, rock edicts, and civilizational wonders across Bharat.",
    link: "/destinations",
    badge: "Heritage",
  },
  {
    id: "photographer",
    name: "Photographer",
    category: "Visual Expeditions",
    icon: "/images/icon2.png",
    description: "Capture golden-hour Himalayan ridges, royal forts, and cultural festivals.",
    link: "/destinations",
    badge: "Scenic Spots",
  },
  {
    id: "travelers",
    name: "Travelers",
    category: "Road & Multi-Modal",
    icon: "/images/icon3.png",
    description: "Thousands of verified routes to easily get you from A to B across any Indian city.",
    link: "/holiday-packages",
    badge: "Journeys",
  },
  {
    id: "hotel",
    name: "Hotel & Stays",
    category: "Handcrafted Living",
    icon: "/images/icon4.png",
    description: "Heritage havelis, pine chalets, village homestays, and boutique river resorts.",
    link: "/hotels",
    badge: "Verified Stays",
  },
  {
    id: "treks",
    name: "Treks & Trails",
    category: "Wilderness",
    icon: "/images/icon5.png",
    description: "High-altitude passes, alpine meadows, lake basecamps, and offbeat trails.",
    link: "/holiday-packages",
    badge: "Adventure",
  },
  {
    id: "guides",
    name: "Travel Guides",
    category: "Native Curators",
    icon: "/images/icon6.png",
    description: "Connect with certified local historians, mountain guides, and regional storytellers.",
    link: "/support",
    badge: "Certified Experts",
  },
  {
    id: "arch-sites",
    name: "Archaeological Sites",
    category: "Historical Landmarks",
    icon: "/images/icon8.png",
    description: "Unearth Harappan ruins, UNESCO cave complexes, and temple architecture.",
    link: "/destinations",
    badge: "Ancient Sites",
  },
  {
    id: "blog",
    name: "Canvas Stories & Blog",
    category: "Regional Chronicles",
    icon: "/images/icon7.png",
    description: "In-depth regional folklore, culinary traditions, and travel route dispatches.",
    link: "#canvas-stories",
    badge: "Stories",
  },
];

export function OriginalCanvasSection() {
  const [activePersona, setActivePersona] = useState<string>("archaeologist");

  const selectedItem = ORIGINAL_PERSONAS.find((p) => p.id === activePersona) || ORIGINAL_PERSONAS[0];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-t border-b border-[#E7E6E0]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Block honoring original typography & manifesto */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-[#BA1E04] text-xs font-bold uppercase tracking-widest shadow-2xs">
            <span>✦</span>
            <span>How Lord Of The Roads Works</span>
            <span>✦</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F0605] tracking-tight">
            The Complete Canvas of India
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-[#EE6C19]">
            "Moving beyond majestic beauty — experiencing arts, culture, history, and the way of life."
          </p>

          <p className="text-xs sm:text-sm text-[#737B76] leading-relaxed max-w-2xl mx-auto">
            Lord Of The Roads searches any city, town, landmark, attraction, or address across India with thousands of multi-modal routes to easily connect you from A to B.
          </p>
        </div>

        {/* Circular Persona Carousel Strip (Using Original User Icons) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E6E0] shadow-sm">
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA1E04]">
              Select Your Travel Calling
            </span>
            <p className="text-xs text-[#737B76]">Click an icon to preview specialized verified routes:</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
            {ORIGINAL_PERSONAS.map((item) => {
              const isSelected = activePersona === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePersona(item.id)}
                  className={`p-3 rounded-2xl transition-all duration-200 flex flex-col items-center gap-2.5 group cursor-pointer border ${
                    isSelected
                      ? "border-[#BA1E04] bg-[#FFF7ED] shadow-md -translate-y-1 ring-1 ring-[#BA1E04]/30"
                      : "border-transparent hover:border-[#EE6C19]/40 hover:bg-[#FAF8F5]"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full p-2 transition-transform duration-200 flex items-center justify-center shadow-xs ${
                      isSelected
                        ? "bg-white border-2 border-[#BA1E04] scale-110"
                        : "bg-[#FAF8F5] group-hover:scale-105 border border-[#E7E6E0]"
                    }`}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1F0605] group-hover:text-[#BA1E04] transition leading-tight">
                      {item.name}
                    </span>
                    <span className="text-[9px] text-[#737B76] font-medium block mt-0.5">
                      {item.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Persona Banner Details */}
          <div className="mt-6 pt-5 border-t border-[#E7E6E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF8F5] p-4 rounded-2xl">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white border border-[#BA1E04]/40 p-1.5 shrink-0">
                <img src={selectedItem.icon} alt={selectedItem.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#1F0605]">
                  {selectedItem.name} <span className="text-xs font-normal text-[#EE6C19]">({selectedItem.category})</span>
                </h4>
                <p className="text-xs text-[#737B76]">{selectedItem.description}</p>
              </div>
            </div>
            <Link
              href={selectedItem.link}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] hover:opacity-95 text-white text-xs font-bold transition shadow-xs shrink-0 self-start sm:self-auto text-center"
            >
              Explore {selectedItem.name} Routes ➔
            </Link>
          </div>
        </div>

        {/* Original Stories & Expedition Showcase (Harsil, Braj Holi, Heritage Sites) */}
        <div id="canvas-stories" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA1E04]">
                Authentic Field Chronicles
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F0605] mt-0.5">
                Stories from the Open Roads
              </h3>
            </div>
            <p className="text-xs text-[#737B76] max-w-md">
              Read curated stories from across various regions of India and decide what you would like to experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Story 1: Harsil Mini Switzerland */}
            <div className="bg-white rounded-3xl border border-[#E7E6E0] overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
              <div>
                <div className="relative h-56 overflow-hidden bg-black">
                  <img
                    src="/images/1 (2).jpg"
                    alt="Harsil Mini Switzerland"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1F0605]/80 backdrop-blur-md text-[#FBF774] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                    Himalayan Retreat
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#1F0605] group-hover:text-[#BA1E04] transition">
                    Harsil Valley — Mini Switzerland of India
                  </h4>
                  <p className="text-xs text-[#737B76] leading-relaxed line-clamp-3">
                    Harsil is an idyllic village perched on the pristine banks of the Bhagirathi River on the route to Gangotri, known for alpine apple orchards and tranquil deodar forests.
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 border-t border-[#E7E6E0]/60 flex items-center justify-between text-xs font-bold text-[#BA1E04]">
                <span>Read Full Chronicle</span>
                <span className="group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>

            {/* Story 2: Holi of Braj */}
            <div className="bg-white rounded-3xl border border-[#E7E6E0] overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
              <div>
                <div className="relative h-56 overflow-hidden bg-black">
                  <img
                    src="/images/1 (4).jpg"
                    alt="Braj Holi Celebration"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#BA1E04]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                    Cultural Festival
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#1F0605] group-hover:text-[#BA1E04] transition">
                    The Colours of Braj — Spring & Ancient Heritage
                  </h4>
                  <p className="text-xs text-[#737B76] leading-relaxed line-clamp-3">
                    A timeless cultural celebration of spring, vibrant hues, and sacred heritage across Mathura and Vrindavan, signifying the eternal triumph of good over evil.
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 border-t border-[#E7E6E0]/60 flex items-center justify-between text-xs font-bold text-[#BA1E04]">
                <span>Read Full Chronicle</span>
                <span className="group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>

            {/* Story 3: Archaeology & Ancient Sites */}
            <div className="bg-white rounded-3xl border border-[#E7E6E0] overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
              <div>
                <div className="relative h-56 overflow-hidden bg-black">
                  <img
                    src="/images/1 (6).jpg"
                    alt="Ancient Architecture"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#EE6C19]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                    Archaeological Sites
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#1F0605] group-hover:text-[#BA1E04] transition">
                    Stone Edicts & Forgotten Temples of India
                  </h4>
                  <p className="text-xs text-[#737B76] leading-relaxed line-clamp-3">
                    Gathering insights through detailed study of historic monuments, rock inscriptions, and timeless architectural traditions preserved across centuries.
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 border-t border-[#E7E6E0]/60 flex items-center justify-between text-xs font-bold text-[#BA1E04]">
                <span>Read Full Chronicle</span>
                <span className="group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Explorer & Curator Card (Honoring Dheerendra Sharma from prodetails.html) */}
        <div className="bg-gradient-to-r from-[#1F0605] via-[#2A0804] to-[#1F0605] rounded-3xl p-6 sm:p-8 text-white border border-[#EE6C19]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#EE6C19] shrink-0 shadow-md">
              <img
                src="/images/profiledt1.jpg"
                alt="Dheerendra Sharma"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FBF774]">
                Featured Heritage Researcher & Explorer
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                Dheerendra Sharma
              </h4>
              <p className="text-xs text-[#FED7AA] mt-1 max-w-xl">
                Documenting archaeological sites, rock-cut architecture, and untouched Himalayan valleys for Lord of the Roads.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/travel-agent"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-md hover:brightness-110 transition"
            >
              Consult with Explorer Desk ➔
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
