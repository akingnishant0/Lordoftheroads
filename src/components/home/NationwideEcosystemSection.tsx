"use client";

import React, { useState } from "react";
import Link from "next/link";

interface EcosystemItem {
  id: string;
  category: "ARCHAEOLOGY" | "MECHANIC" | "RESTAURANT" | "AGENT" | "GADGET";
  title: string;
  hindiTitle: string;
  tag: string;
  location: string;
  pinCode: string;
  route: string;
  rating: number;
  highlight: string;
  icon: string;
  ctaText: string;
  ctaLink: string;
}

const ECOSYSTEM_ITEMS: EcosystemItem[] = [
  // 1. Archaeological & Heritage Sites
  {
    id: "arch-1",
    category: "ARCHAEOLOGY",
    title: "Chand Baori Stepwell & Harshad Mata Temple",
    hindiTitle: "चांद बावड़ी व हर्षद माता प्राचीन मंदिर",
    tag: "9th-Century Archaeological Wonder",
    location: "Abhaneri, Rajasthan",
    pinCode: "303313",
    route: "Jaipur-Agra Highway (NH-21, Km 95)",
    rating: 4.9,
    highlight: "3,500 narrow steps over 13 stories into the earth; verified ASI heritage guide booking.",
    icon: "🏛️",
    ctaText: "Explore Heritage Guide",
    ctaLink: "/destinations/abhaneri-chand-baori",
  },
  {
    id: "arch-2",
    category: "ARCHAEOLOGY",
    title: "Bhimbetka Prehistoric Rock Shelters",
    hindiTitle: "भीमबेटका शैलचित्र एवं प्राचीन गुफाएं",
    tag: "UNESCO World Heritage Site",
    location: "Raisen District, Madhya Pradesh",
    pinCode: "464990",
    route: "Bhopal-Hoshangabad Highway (NH-46)",
    rating: 4.95,
    highlight: "30,000-year-old Paleolithic cave art nestled inside dense teak jungles.",
    icon: "🗿",
    ctaText: "Discover Cave Trails",
    ctaLink: "/destinations/bhimbetka-caves",
  },
  {
    id: "arch-3",
    category: "ARCHAEOLOGY",
    title: "Martand Sun Temple Ruins",
    hindiTitle: "मार्तंड सूर्य मंदिर के ऐतिहासिक खंडहर",
    tag: "8th-Century Karkota Dynasty",
    location: "Anantnag, Kashmir Valley",
    pinCode: "192125",
    route: "NH-44 Highway to Pahalgam bypass",
    rating: 4.88,
    highlight: "Grand limestone colonnades overlooking the Pir Panjal mountains.",
    icon: "⛩️",
    ctaText: "View Historic Route",
    ctaLink: "/destinations/martand-sun-temple",
  },

  // 2. Car & Bike Mechanics
  {
    id: "mech-1",
    category: "MECHANIC",
    title: "Highway Express Recovery & 24/7 Garage",
    hindiTitle: "24/7 हाईवे कार-बाइक रिकवरी व गैराज",
    tag: "Flatbed Towing & On-site Repair",
    location: "Khatauli Bypass, NH-58",
    pinCode: "251201",
    route: "Delhi-Dehradun-Rishikesh Highway",
    rating: 4.92,
    highlight: "Rapid 20-min mobile dispatch: tubeless tyre puncture, battery jumpstart & hydraulic towing.",
    icon: "🔧",
    ctaText: "Call Roadside Assistance",
    ctaLink: "tel:18007623243",
  },
  {
    id: "mech-2",
    category: "MECHANIC",
    title: "Himalayan Ridge 4x4 & Royal Enfield Spares",
    hindiTitle: "हिमालयन 4x4 एवं बुलेट बाइक वर्कशॉप",
    tag: "High-Altitude Mechanical Support",
    location: "Old Manali, Himachal Pradesh",
    pinCode: "175131",
    route: "Manali-Leh Highway Start Point",
    rating: 4.96,
    highlight: "Carburetor oxygen tuning, off-road winch recovery & genuine OEM spares in stock.",
    icon: "🏍️",
    ctaText: "Request Expedition Check",
    ctaLink: "/supplier",
  },

  // 3. Restaurants & Jungle Cafes
  {
    id: "rest-1",
    category: "RESTAURANT",
    title: "Pahadi Rasoi & Jungle Dhaba",
    hindiTitle: "पहाड़ी रसोई, जंगल कैफ़े व फैमिली ढाबा",
    tag: "Authentic Chulha Food & River View",
    location: "Shivpuri Forest Bend, Rishikesh",
    pinCode: "249192",
    route: "Badrinath Highway Overlook",
    rating: 4.87,
    highlight: "Pure desi ghee dal makhani, authentic manduwa roti, clean washrooms & fast EV chargers.",
    icon: "🍲",
    ctaText: "Pre-order Highway Meal",
    ctaLink: "/supplier",
  },
  {
    id: "rest-2",
    category: "RESTAURANT",
    title: "The Banyan Grove Wild Jungle Cafe",
    hindiTitle: "द बरगद ग्रोव जंगल रिट्रीट कैफ़े",
    tag: "Wildlife Corridor Rustic Cafe",
    location: "Jim Corbett Buffer Zone, Ramnagar",
    pinCode: "244715",
    route: "Kotdwar-Ramnagar Forest Link",
    rating: 4.91,
    highlight: "Forest-canopy seating, fresh organic herbal tea, woodfire pizza & local Kumaoni thali.",
    icon: "☕",
    ctaText: "View Forest Table Menu",
    ctaLink: "/supplier",
  },

  // 4. Village & Town Agents
  {
    id: "agent-1",
    category: "AGENT",
    title: "Lord of the Road Village Booking Desk",
    hindiTitle: "अधिकृत ग्रामीण व कस्बा ट्रैवल केंद्र",
    tag: "Offline Ticket & Insurance Counter",
    location: "Mandi Govindgarh / Kotputli Hub",
    pinCode: "303108",
    route: "Grassroots Town Market Centre",
    rating: 4.94,
    highlight: "Zero-internet assisted bookings: bus tickets, train PNR, verified stays & ₹49 travel insurance.",
    icon: "🏢",
    ctaText: "Find Nearest Agent Desk",
    ctaLink: "/register?category=AGENT",
  },

  // 5. Travel Gadgets & Gear Stores
  {
    id: "gadget-1",
    category: "GADGET",
    title: "Expedition Gear Hub & Safety Kits",
    hindiTitle: "ट्रैवल गैजेट्स, डैशकैम व फर्स्ट-एड हब",
    tag: "Available at all Agent Stores & Delivery",
    location: "Pan-India Highway Network Hubs",
    pinCode: "Available in 500+ PINs",
    route: "Same-Day Pickup at Certified Counters",
    rating: 4.98,
    highlight: "Dual 4K night-vision dashcams, portable electric tyre inflators, solar SOS beacons & hill medical kits.",
    icon: "🎒",
    ctaText: "Browse Travel Gear",
    ctaLink: "/supplier",
  },
];

export default function NationwideEcosystemSection() {
  const [activeFilter, setActiveFilter] = useState<
    "ALL" | "ARCHAEOLOGY" | "MECHANIC" | "RESTAURANT" | "AGENT" | "GADGET"
  >("ALL");

  const [searchPin, setSearchPin] = useState("");

  const filteredItems = ECOSYSTEM_ITEMS.filter((item) => {
    const matchesFilter = activeFilter === "ALL" || item.category === activeFilter;
    const matchesPin =
      !searchPin ||
      item.pinCode.toLowerCase().includes(searchPin.toLowerCase()) ||
      item.location.toLowerCase().includes(searchPin.toLowerCase()) ||
      item.title.toLowerCase().includes(searchPin.toLowerCase());
    return matchesFilter && matchesPin;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#173B32] text-[#F7F4EC] relative overflow-hidden">
      {/* Decorative subtle map lines background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C5A66A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A66A]/20 border border-[#C5A66A]/40 text-[#C5A66A] text-xs font-bold uppercase tracking-wider mb-4">
            <span>🛣️</span>
            <span>रोड के किसी भी कोने तक कुछ छूटे नहीं</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#F7F4EC]">
            The Complete Highway & Travel Ecosystem
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D5CDBD] leading-relaxed">
            आर्कियोलॉजिकल व ऐतिहासिक धरोहरें, 24/7 कार व बाइक मैकेनिक, हाईवे ढाबे व जंगल कैफ़े, गाँव-गाँव अधिकृत एजेंट स्टोर्स, और एसेंशियल ट्रैवल गैजेट्स।
          </p>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: "ALL", label: "All Ecosystem (समग्र नेटवर्क)", icon: "🌐" },
            { id: "ARCHAEOLOGY", label: "Archaeological Sites (धरोहर स्थल)", icon: "🏛️" },
            { id: "MECHANIC", label: "Car & Bike Mechanics (मैकेनिक/गैराज)", icon: "🔧" },
            { id: "RESTAURANT", label: "Dhabas & Jungle Cafes (ढाबा/कैफे)", icon: "🍲" },
            { id: "AGENT", label: "Village Agent Stores (एजेंट केंद्र)", icon: "🏢" },
            { id: "GADGET", label: "Travel Gear & Gadgets (गैजेट्स)", icon: "🎒" },
          ].map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#C5A66A] text-[#173B32] shadow-lg scale-105 font-bold"
                    : "bg-[#244E44] text-[#D5CDBD] hover:bg-[#2F6155] hover:text-white"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick PIN Code / City Lookup Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by PIN code, City or Route (उदा. 249201, NH-58, Manali, Jaipur)..."
              value={searchPin}
              onChange={(e) => setSearchPin(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#C5A66A] backdrop-blur-md text-sm"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-70">
              🔍
            </span>
            {searchPin && (
              <button
                onClick={() => setSearchPin("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-white/20 px-2 py-1 rounded text-white hover:bg-white/30"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Grid of Ecosystem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1E4A3F] border border-[#2F6155] rounded-2xl p-6 flex flex-col justify-between hover:border-[#C5A66A] hover:-translate-y-1 transition-all duration-300 shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-3xl p-2.5 rounded-xl bg-white/10 group-hover:bg-[#C5A66A]/20 transition-all">
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#C5A66A]/20 text-[#C5A66A] border border-[#C5A66A]/30">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg sm:text-xl text-white mb-1 group-hover:text-[#C5A66A] transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs text-[#C5A66A] font-medium mb-3">
                  {item.hindiTitle}
                </div>

                <div className="text-xs text-[#D5CDBD] space-y-1 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span>📍</span>
                    <span className="font-semibold text-white">{item.location}</span>
                    <span className="font-mono bg-black/20 px-1.5 py-0.5 rounded text-[11px] text-[#C5A66A]">
                      PIN: {item.pinCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>🛣️</span>
                    <span className="text-[#A4B5AC]">{item.route}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#E2ECE7] leading-relaxed mb-4 bg-black/15 p-3 rounded-xl border border-white/5">
                  {item.highlight}
                </p>
              </div>

              <div className="pt-4 border-t border-[#2F6155] flex items-center justify-between">
                <span className="text-xs font-bold text-[#C5A66A] flex items-center gap-1">
                  ★ {item.rating} Verified Node
                </span>
                <Link
                  href={item.ctaLink}
                  className="px-4 py-2 rounded-xl bg-[#C5A66A] hover:bg-[#D4B77D] text-[#173B32] font-bold text-xs shadow-sm transition-all flex items-center gap-1"
                >
                  <span>{item.ctaText}</span>
                  <span>➔</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner for Partners */}
        <div className="mt-16 bg-gradient-to-r from-[#244E44] to-[#1A3830] rounded-3xl p-8 sm:p-12 border border-[#C5A66A]/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <span className="text-4xl mb-3 block">🤝</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
              Join the Lord of the Road Nationwide Network
            </h3>
            <p className="text-sm text-[#D5CDBD] leading-relaxed mb-6">
              क्या आप लोकल मैकेनिक हैं, हाईवे ढाबा संचालक, विलेज एजेंट या स्टे ओनर? लॉर्ड ऑफ द रोड से जुड़कर हर यात्री की यात्रा सुरक्षित और यादगार बनाएं।
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register?category=AGENT"
                className="px-6 py-3.5 rounded-xl bg-[#C5A66A] hover:bg-[#D4B77D] text-[#173B32] font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>🏢 विलेज / टाउन एजेंट बनें (Become an Agent)</span>
              </Link>
              <Link
                href="/register?category=MECHANIC"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <span>🔧 मैकेनिक व गैराज पार्टनर जुड़ें (Join as Garage)</span>
              </Link>
              <Link
                href="/register?category=RESTAURANT"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <span>🍲 ढाबा व कैफ़े रजिस्टर करें (List Dhaba / Cafe)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
