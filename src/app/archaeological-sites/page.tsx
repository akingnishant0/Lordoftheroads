"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";

interface ArchaeologicalSite {
  id: string;
  name: string;
  era: string;
  period: string;
  location: string;
  state: string;
  image: string;
  significance: string;
  highlights: string[];
  asiProtected: boolean;
  unesco: boolean;
  bestSeason: string;
  nearbyStay: string;
}

const HISTORICAL_SITES: ArchaeologicalSite[] = [
  {
    id: "dholavira",
    name: "Dholavira — Harappan Metropolis",
    era: "Indus Valley Civilization",
    period: "c. 3000 BCE – 1500 BCE",
    location: "Khadir Bet, Rann of Kutch",
    state: "Gujarat",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    significance: "One of the five largest Harappan sites in South Asia, world-renowned for its monumental water reservoirs and ancient urban geometry.",
    highlights: ["Rock-cut storm reservoirs", "Ancient signboard with 10 symbols", "Citadel and lower town layout"],
    asiProtected: true,
    unesco: true,
    bestSeason: "October to March",
    nearbyStay: "Desert Rann Chalets",
  },
  {
    id: "ellora-caves",
    name: "Ellora Caves & Kailasa Temple (Cave 16)",
    era: "Rashtrakuta & Yadava Dynasties",
    period: "c. 600 CE – 1000 CE",
    location: "Verul, Chhatrapati Sambhaji Nagar",
    state: "Maharashtra",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    significance: "The world's largest monolithic rock-cut monument carved top-down from a single basaltic cliff face. An unparalleled marvel of engineering.",
    highlights: ["Monolithic Kailash Temple", "Multi-faith rock monasteries (Hindu, Buddhist, Jain)", "Intricate pillar sculptures"],
    asiProtected: true,
    unesco: true,
    bestSeason: "July to March",
    nearbyStay: "Heritage Verul Haveli",
  },
  {
    id: "hampi",
    name: "Hampi & Vijayanagara Capital Ruins",
    era: "Vijayanagara Empire",
    period: "c. 1336 CE – 1565 CE",
    location: "Tungabhadra Basin, Bellary",
    state: "Karnataka",
    image: "https://images.unsplash.com/photo-1600100397608-f010f4438dfc?auto=format&fit=crop&w=1200&q=80",
    significance: "Breathtaking boulder-strewn capital covering over 4,100 hectares of palaces, riverside bathing ghats, chariot temples, and musical stone columns.",
    highlights: ["Stone Chariot at Vittala Temple", "Virupaksha riverside temple", "Lotus Mahal & Elephant Stables"],
    asiProtected: true,
    unesco: true,
    bestSeason: "October to February",
    nearbyStay: "Hampi Boulder Cottages",
  },
  {
    id: "nalanda",
    name: "Nalanda Mahavihara Ancient University",
    era: "Gupta & Pala Empires",
    period: "c. 5th – 12th Century CE",
    location: "Rajgir, Nalanda",
    state: "Bihar",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    significance: "The world's foremost ancient residential university where Hiuen Tsang studied logic, grammar, astronomy, and Buddhist metaphysics.",
    highlights: ["Stupa of Sariputra", "Excavated red-brick monastic cells", "Ancient meditation halls"],
    asiProtected: true,
    unesco: true,
    bestSeason: "November to March",
    nearbyStay: "Rajgir Foothills Resort",
  },
  {
    id: "khajuraho",
    name: "Khajuraho Monument Complex",
    era: "Chandela Dynasty",
    period: "c. 885 CE – 1050 CE",
    location: "Chhatarpur District",
    state: "Madhya Pradesh",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    significance: "Exquisite sandstone temples celebrating human expression, spirituality, and cosmos through world-famous nagara-style curvilinear spires.",
    highlights: ["Kandariya Mahadeva Temple", "Lakshmana Temple carvings", "Light & Sound evening exhibition"],
    asiProtected: true,
    unesco: true,
    bestSeason: "October to March",
    nearbyStay: "Madhya Pradesh Forest Retreat",
  },
  {
    id: "konark",
    name: "Konark Sun Temple (Black Pagoda)",
    era: "Eastern Ganga Dynasty",
    period: "c. 1250 CE",
    location: "Bay of Bengal Shore, Puri",
    state: "Odisha",
    image: "https://images.unsplash.com/photo-1588096344356-9a2872bc9776?auto=format&fit=crop&w=1200&q=80",
    significance: "Colossal stone chariot dedicated to Surya, with 24 elaborately carved wheels functioning as precise astronomical sundials.",
    highlights: ["Stone Sundial Wheels", "Nata Mandira dance hall", "Marine stone carving preservation"],
    asiProtected: true,
    unesco: true,
    bestSeason: "November to February",
    nearbyStay: "Konark Coast Villa",
  },
];

export default function ArchaeologicalSitesPage() {
  const [selectedEra, setSelectedEra] = useState<string>("All");
  const [selectedSite, setSelectedSite] = useState<ArchaeologicalSite | null>(null);

  const eras = ["All", "Indus Valley", "Rashtrakuta", "Vijayanagara", "Gupta & Pala", "Chandela", "Eastern Ganga"];

  const filteredSites =
    selectedEra === "All"
      ? HISTORICAL_SITES
      : HISTORICAL_SITES.filter((s) => s.era.toLowerCase().includes(selectedEra.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F0605] flex flex-col font-sans">
      <CustomerHeader />

      {/* Breadcrumb Header */}
      <div className="bg-[#FAF8F5] border-b border-[#E7E6E0] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#737B76]">
          <Link href="/" className="hover:text-[#BA1E04] transition">Home</Link>
          <span>/</span>
          <span className="text-[#BA1E04] font-semibold">Archaeological Sites</span>
          <span>/</span>
          <Link href="/archaeologist" className="hover:text-[#BA1E04] transition">Consult Archaeologist</Link>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#1F0605] via-[#BA1E04] to-[#1F0605] text-[#FAF8F5] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FBF774] text-xs font-bold uppercase tracking-wider">
              <span>🏛️</span>
              <span>5,000 Years of Civilizational Heritage</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Archaeological Sites of Bharat
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/85 leading-relaxed">
              Explore monumental Harappan urban centers, rock-cut monoliths, celestial sundial chariots, and ancient universities curated with certified archaeological roadmaps.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/archaeologist"
                className="px-5 py-2.5 rounded-xl bg-white text-[#BA1E04] text-xs font-bold shadow-md hover:bg-[#FAF8F5] transition"
              >
                Meet Field Archaeologist (Dheerendra Sharma) ➔
              </Link>
              <Link
                href="/stories"
                className="px-5 py-2.5 rounded-xl border border-white/30 text-[#FBF774] text-xs font-semibold hover:bg-white/10 transition"
              >
                Read Ancient Route Chronicles 📜
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center w-full md:w-72 shrink-0">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 p-2 border border-[#FBF774]">
              <img src="/images/icon8.png" alt="Archaeological Sites" className="w-full h-full object-contain" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Curated Heritage Pass</h3>
            <p className="text-xs text-[#FAF8F5]/80 mt-1">
              ASI e-ticket passes, certified historian audio-walks, and seamless transport.
            </p>
          </div>
        </div>
      </section>

      {/* Filter by Historical Era */}
      <section className="bg-white border-b border-[#E7E6E0] py-4 px-4 sm:px-6 lg:px-8 sticky top-18 z-20">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-[#737B76] mr-2 shrink-0">Filter Era:</span>
          {eras.map((era) => (
            <button
              key={era}
              type="button"
              onClick={() => setSelectedEra(era)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition shrink-0 cursor-pointer border ${
                selectedEra === era
                  ? "bg-[#BA1E04] text-white border-[#BA1E04] shadow-xs"
                  : "bg-[#FAF8F5] text-[#737B76] border-[#E7E6E0] hover:text-[#1F0605]"
              }`}
            >
              {era}
            </button>
          ))}
        </div>
      </section>

      {/* Sites Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-3xl border border-[#E7E6E0] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-neutral-900">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {site.unesco && (
                      <span className="bg-[#BA1E04] text-[#FBF774] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                        UNESCO World Heritage
                      </span>
                    )}
                    {site.asiProtected && (
                      <span className="bg-[#1F0605]/80 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/20">
                        ASI Monument
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                    📍 {site.state}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#EE6C19] tracking-wider">
                      {site.era} • {site.period}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#1F0605] group-hover:text-[#BA1E04] transition">
                      {site.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#737B76] leading-relaxed line-clamp-3">
                    {site.significance}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase text-[#1F0605] tracking-wider block">
                      Archaeological Highlights:
                    </span>
                    <ul className="text-[11px] text-[#737B76] space-y-1">
                      {site.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-[#EE6C19]">✦</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#FAF8F5] flex items-center justify-between gap-3 mt-4">
                <div>
                  <span className="text-[10px] text-[#737B76] block">Best Season</span>
                  <span className="text-xs font-bold text-[#1F0605]">{site.bestSeason}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSite(site)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-xs hover:brightness-105 transition cursor-pointer"
                >
                  Expedition Plan ➔
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for site expedition plan */}
        {selectedSite && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-[#E7E6E0] shadow-2xl animate-fadeIn">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#BA1E04] tracking-wider">
                    Site Itinerary & Guide
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1F0605] mt-1">{selectedSite.name}</h3>
                  <span className="text-xs text-[#737B76]">{selectedSite.location}, {selectedSite.state}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSite(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#1F0605] font-bold flex items-center justify-center hover:bg-neutral-200 transition"
                >
                  ✕
                </button>
              </div>

              <div className="h-44 rounded-2xl overflow-hidden">
                <img src={selectedSite.image} alt={selectedSite.name} className="w-full h-full object-cover" />
              </div>

              <p className="text-xs text-[#737B76] leading-relaxed">
                {selectedSite.significance}
              </p>

              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E7E6E0] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#737B76]">Recommended Stay:</span>
                  <span className="font-bold text-[#1F0605]">{selectedSite.nearbyStay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737B76]">Ideal Exploration Window:</span>
                  <span className="font-bold text-[#EE6C19]">{selectedSite.bestSeason}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737B76]">Assigned Archaeologist:</span>
                  <span className="font-bold text-[#BA1E04]">Dheerendra Sharma</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Link
                  href="/archaeologist"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold text-center shadow-md hover:brightness-105 transition"
                >
                  Book with Archaeologist 🏺
                </Link>
                <Link
                  href="/hotels"
                  className="flex-1 py-2.5 rounded-xl border border-[#E7E6E0] text-[#1F0605] text-xs font-semibold text-center hover:bg-[#FAF8F5] transition"
                >
                  Find Nearby Stays 🏨
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <CustomerFooter />
    </div>
  );
}
