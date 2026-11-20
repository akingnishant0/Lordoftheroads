"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";

interface TrekItem {
  id: string;
  name: string;
  region: string;
  state: string;
  altitude: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Difficult";
  bestSeason: string;
  image: string;
  description: string;
  highlights: string[];
  startingBase: string;
  pricePerPerson: number;
}

const HIMALAYAN_TREKS: TrekItem[] = [
  {
    id: "kedarkantha",
    name: "Kedarkantha Winter Summit Trek",
    region: "Govind Pashu Vihar National Park, Sankri",
    state: "Uttarakhand",
    altitude: "12,500 ft (3,810 m)",
    duration: "5 Days / 4 Nights",
    difficulty: "Easy",
    bestSeason: "December to April (Snow Summit)",
    image: "/images/1 (5).jpg",
    description: "India's most beloved winter snow trek. Climb through dense pine forests to an open 360-degree ridge summit with sunrise views over Swargarohini, Bandarpoonch, and Black Peak.",
    highlights: ["Juda Ka Talab frozen lake campsite", "360° Himalayan summit panorama", "Dense snowy pine glades"],
    startingBase: "Dehradun / Sankri",
    pricePerPerson: 7850,
  },
  {
    id: "valley-of-flowers",
    name: "Valley of Flowers & Hemkund Sahib",
    region: "Chamoli, Garhwal",
    state: "Uttarakhand",
    altitude: "14,400 ft (Hemkund) / 12,000 ft (Valley)",
    duration: "6 Days / 5 Nights",
    difficulty: "Moderate",
    bestSeason: "July to September (Floral Monsoon Bloom)",
    image: "/images/1 (2).jpg",
    description: "UNESCO World Heritage site with over 500 species of wild Himalayan alpine flowers blooming along the Pushpawati riverbed, paired with the sacred high-altitude lake of Hemkund Sahib.",
    highlights: ["Rare Blue Poppy and Brahma Kamal", "Glacial Pushpawati river stream", "Hemkund high-altitude glacial lake"],
    startingBase: "Rishikesh / Govindghat",
    pricePerPerson: 9200,
  },
  {
    id: "hampta-pass",
    name: "Hampta Pass & Chandratal Alpine Lake",
    region: "Kullu to Spiti Valley Crossing",
    state: "Himachal Pradesh",
    altitude: "14,100 ft (4,298 m)",
    duration: "5 Days / 4 Nights",
    difficulty: "Moderate",
    bestSeason: "Mid-June to October",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    description: "Dramatic crossover trek that starts in the emerald green pine forests of Manali and culminates in the barren, moon-like desert expanse of Spiti, capped by the crescent-shaped blue waters of Chandratal.",
    highlights: ["Dramatic transition from lush green Kullu to arid Spiti", "Hampta river crossing", "Camp by the turquoise waters of Chandratal"],
    startingBase: "Manali / Jobra",
    pricePerPerson: 8900,
  },
  {
    id: "roopkund-bedni",
    name: "Ali Bedni Bugyal & Roopkund Alpine Meadows",
    region: "Trishul Massif, Chamoli",
    state: "Uttarakhand",
    altitude: "11,500 ft (Bedni) / 15,696 ft (Roopkund)",
    duration: "6 Days / 5 Nights",
    difficulty: "Moderate",
    bestSeason: "May – June & September – November",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description: "Among the twin grandest high-altitude meadows in Asia. Walk through miles of velvety green bugyals with Mt. Trishul rising sheer and massive right in front of your campsite.",
    highlights: ["Vast Ali & Bedni high-altitude undulating meadows", "Towering face of Mt. Trishul (7,120m)", "Ancient Nanda Devi Raj Jat route"],
    startingBase: "Rishikesh / Lohajung",
    pricePerPerson: 10500,
  },
  {
    id: "markha-valley",
    name: "Markha Valley High Plateau Expedition",
    region: "Hemis National Park, Ladakh",
    state: "Ladakh",
    altitude: "17,060 ft (Kongmaru La Pass)",
    duration: "7 Days / 6 Nights",
    difficulty: "Difficult",
    bestSeason: "June to September",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    description: "A legendary Ladakhi wilderness trek through ancient Buddhist villages, remote homestays, dramatic canyons, and high passes overlooking Mt. Kang Yatse.",
    highlights: ["Kongmaru La summit pass view", "Snow leopard habitat in Hemis", "Traditional Ladakhi village homestays"],
    startingBase: "Leh / Chilling",
    pricePerPerson: 16500,
  },
  {
    id: "har-ki-dun",
    name: "Har Ki Dun — Valley of Shiva & Swargarohini",
    region: "Rawain, Supin Valley",
    state: "Uttarakhand",
    altitude: "11,700 ft (3,566 m)",
    duration: "7 Days / 6 Nights",
    difficulty: "Moderate",
    bestSeason: "April to June & September to December",
    image: "/images/1 (8).jpg",
    description: "Cradle-shaped hanging valley steeped in Mahabharata legend, where Pandavas walked towards heaven. Centuries-old wooden temples of Osla and untouched pine forests.",
    highlights: ["Ancient wooden temple of Osla", "Jaundhar Glacier base view", "Swargarohini massif peak"],
    startingBase: "Dehradun / Sankri",
    pricePerPerson: 9800,
  },
];

export default function TreksPage() {
  const [filterDifficulty, setFilterDifficulty] = useState<string>("All");

  const difficulties = ["All", "Easy", "Moderate", "Difficult"];

  const filteredTreks =
    filterDifficulty === "All"
      ? HIMALAYAN_TREKS
      : HIMALAYAN_TREKS.filter((t) => t.difficulty.toLowerCase() === filterDifficulty.toLowerCase());

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F0605] flex flex-col font-sans">
      <CustomerHeader />

      {/* Breadcrumb Header */}
      <div className="bg-[#FAF8F5] border-b border-[#E7E6E0] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#737B76]">
          <Link href="/" className="hover:text-[#BA1E04] transition">Home</Link>
          <span>/</span>
          <span className="text-[#BA1E04] font-semibold">Treks & Trails</span>
          <span>/</span>
          <Link href="/travel-guides" className="hover:text-[#BA1E04] transition">Mountain Guides</Link>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#1F0605] via-[#2F0B09] to-[#1F0605] text-[#FAF8F5] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA1E04]/30 border border-[#EE6C19]/40 text-[#FBF774] text-xs font-bold uppercase tracking-wider">
              <span>🥾</span>
              <span>Himalayan High Passes & Alpine Meadows</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Treks & Mountain Trails of Bharat
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/85 leading-relaxed">
              Step onto ancient trails walked by shepherds, pilgrims, and explorers. Certified IMF leaders, micro-spikes and oxygen safety on all high-altitude expeditions.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/travel-guides"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-md hover:brightness-105 transition"
              >
                Hire Certified Trek Leader ➔
              </Link>
              <Link
                href="/holiday-packages"
                className="px-5 py-2.5 rounded-xl border border-white/30 text-[#FBF774] text-xs font-semibold hover:bg-white/10 transition"
              >
                All Holiday Packages 🎒
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center w-full md:w-72 shrink-0">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 p-2 border border-[#FBF774]">
              <img src="/images/icon5.png" alt="Treks & Trails" className="w-full h-full object-contain" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Wilderness Certified</h3>
            <p className="text-xs text-[#FAF8F5]/80 mt-1">
              Zero-waste Leave No Trace ethics with pulse-oximeter health logs.
            </p>
          </div>
        </div>
      </section>

      {/* Difficulty Filter */}
      <section className="bg-white border-b border-[#E7E6E0] py-4 px-4 sm:px-6 lg:px-8 sticky top-18 z-20">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-[#737B76] mr-2 shrink-0">Difficulty Grade:</span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => setFilterDifficulty(diff)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition shrink-0 cursor-pointer border ${
                filterDifficulty === diff
                  ? "bg-[#BA1E04] text-white border-[#BA1E04] shadow-xs"
                  : "bg-[#FAF8F5] text-[#737B76] border-[#E7E6E0] hover:text-[#1F0605]"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </section>

      {/* Treks Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreks.map((trek) => (
            <div
              key={trek.id}
              className="bg-white rounded-3xl border border-[#E7E6E0] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-neutral-900">
                  <img
                    src={trek.image}
                    alt={trek.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs ${
                      trek.difficulty === "Easy"
                        ? "bg-emerald-600 text-white"
                        : trek.difficulty === "Moderate"
                        ? "bg-[#EE6C19] text-white"
                        : "bg-[#BA1E04] text-white"
                    }`}
                  >
                    {trek.difficulty} Grade
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                    🏔️ {trek.altitude}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#EE6C19] tracking-wider">
                      {trek.state} • {trek.duration}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#1F0605] group-hover:text-[#BA1E04] transition">
                      {trek.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#737B76] leading-relaxed line-clamp-3">
                    {trek.description}
                  </p>

                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E7E6E0] space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#737B76]">Starting Base:</span>
                      <span className="font-bold text-[#1F0605]">{trek.startingBase}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#737B76]">Prime Season:</span>
                      <span className="font-semibold text-[#EE6C19]">{trek.bestSeason}</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-[10px] font-bold uppercase text-[#1F0605] tracking-wider block mb-1">
                      Trail Highlights:
                    </span>
                    <ul className="text-[11px] text-[#737B76] space-y-1">
                      {trek.highlights.map((hl, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-[#BA1E04]">✦</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#FAF8F5] flex items-center justify-between gap-3 mt-4">
                <div>
                  <span className="text-[10px] text-[#737B76] block">Starting from</span>
                  <span className="text-sm font-bold text-[#BA1E04]">₹{trek.pricePerPerson.toLocaleString("en-IN")}</span>
                  <span className="text-[10px] text-[#737B76]"> / person</span>
                </div>
                <Link
                  href="/holiday-packages"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-xs hover:brightness-105 transition"
                >
                  Book Trek ➔
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
