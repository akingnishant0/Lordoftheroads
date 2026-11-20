"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";

interface PhotoTrail {
  id: string;
  title: string;
  region: string;
  state: string;
  genre: string;
  goldenHour: string;
  bestSeason: string;
  image: string;
  description: string;
  keySpots: string[];
  recommendedGear: string;
}

const PHOTO_TRAILS: PhotoTrail[] = [
  {
    id: "braj-holi",
    title: "Braj Lathmar & Phoolon Ki Holi Expedition",
    region: "Barsana, Nandgaon & Vrindavan",
    state: "Uttar Pradesh",
    genre: "Cultural & Portrait",
    goldenHour: "8:00 AM – 11:30 AM & 4:30 PM",
    bestSeason: "February – March (Phalguna)",
    image: "/images/1 (4).jpg",
    description: "Capture the most vibrant explosion of colors on earth. Gulal cloud formations, traditional dhal protection rituals, and timeless Radha Rani temple courtyards.",
    keySpots: ["Barsana Ladli Ji Temple Roof", "Nandgaon Village Lanes", "Banke Bihari Flower Shower"],
    recommendedGear: "Weather-sealed body, 24-70mm f/2.8, Rain sleeves / plastic gulal shield, 85mm f/1.4",
  },
  {
    id: "spiti-astro",
    title: "Spiti & Pin Valley High-Altitude Astrophotography",
    region: "Kibber, Komic & Langza",
    state: "Himachal Pradesh",
    genre: "Astrophotography & Landscape",
    goldenHour: "Bortle 1 Night Skies (10:00 PM – 4:00 AM)",
    bestSeason: "May – October",
    image: "/images/1 (1).jpg",
    description: "Zero light pollution at 14,000+ feet. Frame the core of the Milky Way arching over ancient 1,000-year-old Buddhist monasteries and giant Buddha statues.",
    keySpots: ["Langza Giant Buddha Face", "Kee Monastery Rock Perch", "Dhankar Lake Cliff Edge"],
    recommendedGear: "Full-frame sensor, 14-24mm f/2.8, Heavy carbon-fiber tripod, Intervalometer, Lens heater",
  },
  {
    id: "varanasi-ghats",
    title: "Varanasi Mystic Dawn & Ganga Aarti Photowalk",
    region: "Assi to Manikarnika Ghats",
    state: "Uttar Pradesh",
    genre: "Street & Atmospheric Documentary",
    goldenHour: "5:15 AM (Dawn Mist) & 6:30 PM (Evening Aarti)",
    bestSeason: "October – March",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    description: "Wooden rowboat perspectives on mist-draped ghats, sadhu portraits, sacred rituals, brass lamps, and reflection ripples over Maa Ganga.",
    keySpots: ["Assi Ghat Morning Subah-e-Banaras", "Chet Singh Fort Ghat water silhouette", "Dashashwamedh Aarti tower"],
    recommendedGear: "35mm or 50mm fast prime, 70-200mm telephoto for boat shots, Circular Polarizer",
  },
  {
    id: "ladakh-sand-dunes",
    title: "Nubra Valley Cold Desert & Double-Humped Camels",
    region: "Hunder & Diskit",
    state: "Ladakh",
    genre: "Landscape & Travel",
    goldenHour: "5:30 PM – 7:15 PM (Sunset)",
    bestSeason: "June – September",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
    description: "Rippled silver sand dunes flanked by jagged snow-covered Karakoram pinnacles and Bactrian camels moving in twilight caravan lines.",
    keySpots: ["Hunder Sand Dune Ridges", "Diskit Monastery Maitreya Statue", "Shyok River Valley Bed"],
    recommendedGear: "24-105mm all-round zoom, UV filter, Blower & sensor cleaning kit for sand protection",
  },
  {
    id: "harsil-valley",
    title: "Harsil Bhagirathi River & Pine Forest Trail",
    region: "Uttarkashi & Dharali",
    state: "Uttarakhand",
    genre: "Landscape & Mountain Wilderness",
    goldenHour: "6:00 AM – 8:30 AM (Morning Rays)",
    bestSeason: "April – June & Autumn Colors (Oct – Nov)",
    image: "/images/1 (2).jpg",
    description: "Referred to as the Mini Switzerland of India. Crystal clear glacial river, wooden alpine chalets, apple orchards, and morning sunbeams through deodar needles.",
    keySpots: ["Bhagirathi Riverbed Pebble Bank", "Wilson Cottage Ruins", "Dharali Apple Orchard Views"],
    recommendedGear: "16-35mm wide lens, Graduated ND filter, Polarizer, Lightweight carbon tripod",
  },
  {
    id: "pushkar-camel-fair",
    title: "Thar Desert Twilight & Pushkar Pastoral Gathering",
    region: "Pushkar & Ajmer Hills",
    state: "Rajasthan",
    genre: "Documentary & Cultural Portraiture",
    goldenHour: "Sunrise Dune Caravans (6:15 AM) & Desert Sunset (5:45 PM)",
    bestSeason: "Kartik Purnima (October – November)",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    description: "Tens of thousands of decorated camels, Rajasthani turbaned herders, dust rays at dusk, and sacred Pushkar Sarovar ghat reflections.",
    keySpots: ["Mela Ground Dune Rims", "Brahma Temple Steps", "Sunset Camel Silhouette Ridge"],
    recommendedGear: "70-200mm f/2.8 for portraits, 28mm f/1.8 street lens, Dust cover",
  },
];

export default function PhotographyTrailsPage() {
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  const genres = ["All", "Cultural & Portrait", "Astrophotography & Landscape", "Street & Atmospheric Documentary", "Landscape & Travel", "Landscape & Mountain Wilderness"];

  const filteredTrails =
    selectedGenre === "All"
      ? PHOTO_TRAILS
      : PHOTO_TRAILS.filter((t) => t.genre.toLowerCase().includes(selectedGenre.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F0605] flex flex-col font-sans">
      <CustomerHeader />

      {/* Breadcrumb Header */}
      <div className="bg-[#FAF8F5] border-b border-[#E7E6E0] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#737B76]">
          <Link href="/" className="hover:text-[#BA1E04] transition">Home</Link>
          <span>/</span>
          <span className="text-[#BA1E04] font-semibold">Photography Trails</span>
          <span>/</span>
          <Link href="/stories" className="hover:text-[#BA1E04] transition">Stories & Field Blog</Link>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#1F0605] via-[#4A100A] to-[#1F0605] text-[#FAF8F5] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA1E04]/30 border border-[#EE6C19]/40 text-[#FBF774] text-xs font-bold uppercase tracking-wider">
              <span>📷</span>
              <span>Visual Expeditions & Golden Hour Trails</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Photography Trails Across Bharat
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/85 leading-relaxed">
              Curated locations for photographers, filmmakers, and storytellers. Verified golden-hour timings, drone permit guidelines, local fixer contacts, and equipment recommendations.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/stories"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-md hover:brightness-105 transition"
              >
                Read Field Stories 📜
              </Link>
              <Link
                href="/travel-guides"
                className="px-5 py-2.5 rounded-xl border border-white/30 text-[#FBF774] text-xs font-semibold hover:bg-white/10 transition"
              >
                Hire Local Photo Fixer 🗺️
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center w-full md:w-72 shrink-0">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 p-2 border border-[#FBF774]">
              <img src="/images/icon2.png" alt="Photographer" className="w-full h-full object-contain" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Visual Creator Kit</h3>
            <p className="text-xs text-[#FAF8F5]/80 mt-1">
              Dawn access permits, spotters, and battery charging hubs at high-altitude bases.
            </p>
          </div>
        </div>
      </section>

      {/* Filter by Genre */}
      <section className="bg-white border-b border-[#E7E6E0] py-4 px-4 sm:px-6 lg:px-8 sticky top-18 z-20">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-[#737B76] mr-2 shrink-0">Filter Genre:</span>
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition shrink-0 cursor-pointer border ${
                selectedGenre === g
                  ? "bg-[#BA1E04] text-white border-[#BA1E04] shadow-xs"
                  : "bg-[#FAF8F5] text-[#737B76] border-[#E7E6E0] hover:text-[#1F0605]"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      {/* Trails Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrails.map((trail) => (
            <div
              key={trail.id}
              className="bg-white rounded-3xl border border-[#E7E6E0] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-neutral-900">
                  <img
                    src={trail.image}
                    alt={trail.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1F0605]/80 backdrop-blur-md text-[#FBF774] text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/20">
                    {trail.genre}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                    📍 {trail.state}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#EE6C19] tracking-wider">
                      {trail.region}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#1F0605] group-hover:text-[#BA1E04] transition">
                      {trail.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#737B76] leading-relaxed line-clamp-3">
                    {trail.description}
                  </p>

                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E7E6E0] space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#737B76]">Prime Light:</span>
                      <span className="font-bold text-[#BA1E04]">{trail.goldenHour}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#737B76]">Best Window:</span>
                      <span className="font-semibold text-[#1F0605]">{trail.bestSeason}</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-[10px] font-bold uppercase text-[#1F0605] tracking-wider block mb-1">
                      Key Vantage Points:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {trail.keySpots.map((spot, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-neutral-100 text-[#1F0605] rounded-md font-medium">
                          ✦ {spot}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-[10px] font-bold uppercase text-[#737B76] tracking-wider block">
                      Recommended Glass & Gear:
                    </span>
                    <p className="text-[11px] text-[#737B76] italic mt-0.5">
                      {trail.recommendedGear}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#FAF8F5] flex items-center justify-between gap-3 mt-4">
                <Link
                  href="/holiday-packages"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-xs hover:brightness-105 transition text-center"
                >
                  Book Photography Expedition ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}
