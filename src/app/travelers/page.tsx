"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";

interface RouteItem {
  id: string;
  name: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  modes: string[];
  image: string;
  description: string;
  highlights: string[];
  startingPrice: number;
}

const VERIFIED_ROUTES: RouteItem[] = [
  {
    id: "delhi-manali-leh",
    name: "The Grand Himalayan Highway",
    from: "Delhi",
    to: "Leh (via Manali & Atal Tunnel)",
    distance: "1,020 km",
    duration: "4 Days Road Trip",
    modes: ["Volvo Bus", "4x4 SUV", "Self-Drive Cab"],
    image: "/images/1 (1).jpg",
    description: "Traverse high-altitude passes including Rohtang, Baralacha La, and Tanglang La. Multi-modal pickup with verified stopovers, oxygen safety kits, and mechanic backup.",
    highlights: ["Atal Tunnel crossing", "Keylong pine valley stay", "Gata Loops 21 hairpin bends"],
    startingPrice: 6500,
  },
  {
    id: "mumbai-goa-coastal",
    name: "Konkan Marine Coastal Route",
    from: "Mumbai",
    to: "Goa (via Alibaug & Ratnagiri)",
    distance: "590 km",
    duration: "2 Days Scenic Drive",
    modes: ["Roro Ferry", "Private Cab", "Vande Bharat"],
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    description: "Cliff-side coastal roads skirting the Arabian Sea with virgin beaches, Alphonso mango orchards, and sea-fort ferry crossings.",
    highlights: ["Murud Janjira Sea Fort", "Tarkarli scuba coastline", "Malvani coastal cuisine joints"],
    startingPrice: 4200,
  },
  {
    id: "delhi-agra-jaipur",
    name: "The Golden Triangle Heritage Corridor",
    from: "Delhi",
    to: "Jaipur (via Agra & Fatehpur Sikri)",
    distance: "720 km",
    duration: "3 Days Circuit",
    modes: ["Gatimaan Express", "AC Sedan", "Luxury Coach"],
    image: "/images/1 (6).jpg",
    description: "Connecting the Mughal splendor of the Taj Mahal and Agra Fort with the pink sandstone royal palaces of Jaipur over smooth expressways.",
    highlights: ["Taj Mahal sunrise access", "Fatehpur Sikri red sandstone gate", "Amer Fort jeep ascent"],
    startingPrice: 5100,
  },
  {
    id: "rishikesh-badrinath",
    name: "Devbhoomi Char Dham River Confluence Highway",
    from: "Rishikesh",
    to: "Badrinath & Mana (via Panch Prayag)",
    distance: "298 km",
    duration: "3 Days Sacred Journey",
    modes: ["Helicopter", "Tempo Traveller", "Private 4x4"],
    image: "/images/1 (2).jpg",
    description: "Following the sacred Alaknanda and Bhagirathi rivers across all five holy river confluences (Devprayag, Rudraprayag, Karnaprayag, Nandprayag, Vishnuprayag).",
    highlights: ["Devprayag dual-river संगम view", "Harsil deodar detour", "Mana — Last Indian Village"],
    startingPrice: 7800,
  },
  {
    id: "bangalore-coorg-wayanad",
    name: "Western Ghats Rainforest & Coffee Trail",
    from: "Bengaluru",
    to: "Wayanad (via Mysore & Coorg)",
    distance: "340 km",
    duration: "2 Days Forest Route",
    modes: ["AC Intercity Cab", "Self-Drive SUV", "KSRTC Airavat"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description: "Wind through lush mist-clad coffee plantations, Nagarhole tiger reserve buffer zones, and cascading waterfalls in the Western Ghats.",
    highlights: ["Coffee plantation estate stay", "Bandipur tiger reserve safari", "Banasura Sagar earth dam"],
    startingPrice: 3800,
  },
  {
    id: "kolkata-darjeeling",
    name: "Eastern Foothills & Toy Train Tea Route",
    from: "Kolkata",
    to: "Darjeeling & Gangtok (via Siliguri)",
    distance: "615 km",
    duration: "3 Days Hill Expedition",
    modes: ["Vande Bharat", "Heritage Toy Train", "Hill Taxi"],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    description: "From the bustling culture of Kolkata to the cool Himalayan tea gardens of Darjeeling overlooking the towering Kanchenjunga range.",
    highlights: ["UNESCO Darjeeling Himalayan Railway", "Tiger Hill sunrise view", "Mirik Lake pine boulevard"],
    startingPrice: 5900,
  },
];

export default function TravelersPage() {
  const [selectedRoute, setSelectedRoute] = useState<RouteItem | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F0605] flex flex-col font-sans">
      <CustomerHeader />

      {/* Breadcrumb Header */}
      <div className="bg-[#FAF8F5] border-b border-[#E7E6E0] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#737B76]">
          <Link href="/" className="hover:text-[#BA1E04] transition">Home</Link>
          <span>/</span>
          <span className="text-[#BA1E04] font-semibold">Travelers & Multi-Modal Routes</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#1F0605] via-[#BA1E04] to-[#1F0605] text-[#FAF8F5] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FBF774] text-xs font-bold uppercase tracking-wider">
              <span>🧭</span>
              <span>Point A to Point B Across Bharat</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Curated Road & Multi-Modal Journeys
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/85 leading-relaxed font-serif italic">
              "Lord Of The Roads searches any city, town, landmark, attraction, or address across India with thousands of multi-modal routes to easily get you from A to B."
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/holiday-packages"
                className="px-5 py-2.5 rounded-xl bg-white text-[#BA1E04] text-xs font-bold shadow-md hover:bg-[#FAF8F5] transition"
              >
                All Holiday Packages 🎒
              </Link>
              <Link
                href="/hotels"
                className="px-5 py-2.5 rounded-xl border border-white/30 text-[#FBF774] text-xs font-semibold hover:bg-white/10 transition"
              >
                Verified Roadside Stays 🏨
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center w-full md:w-72 shrink-0">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 p-2 border border-[#FBF774]">
              <img src="/images/icon3.png" alt="Travelers" className="w-full h-full object-contain" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Multi-Modal Connected</h3>
            <p className="text-xs text-[#FAF8F5]/80 mt-1">
              Seamlessly switch between trains, private cabs, buses, and flights on one ticket.
            </p>
          </div>
        </div>
      </section>

      {/* Routes Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VERIFIED_ROUTES.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-3xl border border-[#E7E6E0] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-neutral-900">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1F0605]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                    🛣️ {route.distance} • {route.duration}
                  </div>
                  <span className="absolute bottom-3 right-3 bg-[#BA1E04] text-[#FBF774] text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                    {route.from} ➔ {route.to}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif font-bold text-lg text-[#1F0605] group-hover:text-[#BA1E04] transition">
                    {route.name}
                  </h3>

                  <p className="text-xs text-[#737B76] leading-relaxed line-clamp-3">
                    {route.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {route.modes.map((m, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-[#FFF7ED] text-[#BA1E04] border border-[#FED7AA] rounded-md font-semibold">
                        ✓ {m}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#E7E6E0]/60">
                    <span className="text-[10px] uppercase font-bold text-[#737B76] tracking-wider block mb-1">
                      Route Highlights:
                    </span>
                    <ul className="text-[11px] text-[#737B76] space-y-1">
                      {route.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
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
                  <span className="text-[10px] text-[#737B76] block">Starting from</span>
                  <span className="text-sm font-bold text-[#BA1E04]">₹{route.startingPrice.toLocaleString("en-IN")}</span>
                </div>
                <Link
                  href={`/checkout?item=${encodeURIComponent(route.name)}&price=${route.startingPrice}&travellers=2`}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-xs hover:brightness-105 transition"
                >
                  Book Route ➔
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
