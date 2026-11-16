"use client";

export const dynamic = "force-dynamic";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { getDashboardPath } from "@/lib/utils";

type AccountCategory = "CUSTOMER" | "AGENT" | "MECHANIC" | "RESTAURANT" | "STAY" | "TRANSPORT" | "SHOP";

interface RoleOption {
  id: AccountCategory;
  role: string;
  badge: string;
  title: string;
  hindiTitle: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
  perks: string[];
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: "CUSTOMER",
    role: "CUSTOMER",
    badge: "Personal Explorer",
    title: "Traveler & Explorer",
    hindiTitle: "यात्री एवं अन्वेषक",
    tagline: "Unrestricted Pan-India Journeys",
    description: "Book verified mountain chalets, heritage havelis, buses, cabs, roadside SOS & instant travel insurance.",
    icon: "🧭",
    accentColor: "#173B32",
    perks: ["Verified Stays & Chalets", "24/7 Roadside SOS", "₹5L Travel Insurance"],
  },
  {
    id: "AGENT",
    role: "AGENT",
    badge: "Official Franchise",
    title: "Village & Town Booking Agent",
    hindiTitle: "अधिकृत ग्रामीण व शहरी एजेंट",
    tagline: "Empower Your Local Community",
    description: "Operate a certified travel & insurance desk. Issue instant tickets, book holidays & earn direct commissions.",
    icon: "🏢",
    accentColor: "#C5A66A",
    perks: ["Direct Ticket Desk", "Instant PoSP Insurance", "Daily Wallet Payouts"],
  },
  {
    id: "MECHANIC",
    role: "TRAVEL_SHOP_VENDOR",
    badge: "Highway Life-Line",
    title: "Car / Bike Mechanic & Garage",
    hindiTitle: "हाईवे ऑटो वर्कशॉप व मैकेनिक",
    tagline: "On-Demand Roadside Breakdown Support",
    description: "Receive real-time breakdown alerts along highways, battery jumpstart calls, puncture jobs & towing dispatches.",
    icon: "🔧",
    accentColor: "#2563EB",
    perks: ["Live GPS Dispatch", "Flatbed Towing Jobs", "Guaranteed Service Fee"],
  },
  {
    id: "RESTAURANT",
    role: "TRAVEL_SHOP_VENDOR",
    badge: "Culinary Stop",
    title: "Highway Dhaba & Jungle Cafe",
    hindiTitle: "हाईवे ढाबा, जंगल कैफ़े व रेस्टोरेंट",
    tagline: "Authentic Regional Roadside Dining",
    description: "Attract highway travelers, list rustic dining retreats, hygienic washroom amenities & receive advance table orders.",
    icon: "🍲",
    accentColor: "#D97706",
    perks: ["Advance Table Orders", "Verified Clean Spot Tag", "EV Charging Footfall"],
  },
  {
    id: "STAY",
    role: "HOTEL_SUPPLIER",
    badge: "Hospitality Partner",
    title: "Stays, Homestays & Camps",
    hindiTitle: "बुटीक होटल, होमस्टे व टेंट कैंप",
    tagline: "Showcase Distinctive Indian Stays",
    description: "List off-grid riverside camps, boutique mountain homes & private pool villas with zero onboarding fees.",
    icon: "🏡",
    accentColor: "#059669",
    perks: ["2-Way Channel Sync", "Zero Listing Charges", "Instant Guest Check-in"],
  },
  {
    id: "TRANSPORT",
    role: "CAB_BIKE_OPERATOR",
    badge: "Fleet Network",
    title: "Outstation Cabs & Bus Fleets",
    hindiTitle: "कैब, बाइक व वॉल्वो बस ऑपरेटर",
    tagline: "Intercity & Mountain Road Mobility",
    description: "Connect your luxury Volvo sleepers, hill-certified Innova cabs, or 4x4 expedition rentals to nationwide travelers.",
    icon: "🚖",
    accentColor: "#7C3AED",
    perks: ["Direct Fleet Bookings", "Zero Middleman Cuts", "Advance Route Schedules"],
  },
  {
    id: "SHOP",
    role: "TRAVEL_SHOP_VENDOR",
    badge: "Gear Supplier",
    title: "Travel Gear & Safety Gadgets",
    hindiTitle: "ट्रैवल गियर व गैजेट विक्रेता",
    tagline: "Equip Travelers with Essential Gear",
    description: "Supply dashcams, portable tyre inflators, emergency beacons & trekking kits to verified agent counters.",
    icon: "🎒",
    accentColor: "#E11D48",
    perks: ["Agent Store Distribution", "Bulk Counter Demand", "Automated Dispatches"],
  },
];

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = (searchParams?.get("category") as AccountCategory) || "CUSTOMER";

  const [selectedCategory, setSelectedCategory] = useState<AccountCategory>(initialCategory);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Business specific fields
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const selectedRoleConfig = ROLE_OPTIONS.find((r) => r.id === selectedCategory) || ROLE_OPTIONS[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!name.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      setError("सभी आवश्यक फ़ील्ड (नाम, ईमेल, फ़ोन, पासवर्ड) भरना अनिवार्य है।");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setError("कृपया 10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें।");
      return;
    }

    if (password !== confirmPassword) {
      setError("पासवर्ड और कन्फर्म पासवर्ड एक समान होने चाहिए।");
      return;
    }

    if (password.length < 6) {
      setError("पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।");
      return;
    }

    if (selectedCategory !== "CUSTOMER" && !businessName.trim()) {
      setError("कृपया अपने व्यापार / दुकान / प्रतिष्ठान का नाम दर्ज करें।");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: cleanPhone,
          password,
          role: selectedRoleConfig.role,
          businessName: businessName.trim(),
          businessType: businessType || selectedCategory,
          pinCode: pinCode.trim(),
          city: city.trim(),
          state: stateName.trim(),
          address: address.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "पंजीकरण विफल रहा। कृपया पुन: प्रयास करें।");
        setLoading(false);
        return;
      }

      setSuccessMsg("खाता सफलतापूर्वक तैयार हो गया! आपको आपके समर्पित डैशबोर्ड पर ले जाया जा रहा है...");

      // Auto login
      const loginResult = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (loginResult?.error) {
        router.push("/login");
        return;
      }

      const targetPath = getDashboardPath(selectedRoleConfig.role);
      router.push(targetPath);
      router.refresh();
    } catch (err: any) {
      console.error("Registration error:", err);
      setError("सर्वर से संपर्क नहीं हो पाया। कृपया इंटरनेट कनेक्शन जांचें।");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#173B32] selection:bg-[#C5A66A] selection:text-[#173B32]">
      {/* Editorial Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F4]/90 backdrop-blur-md border-b border-[#E7E2D6] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#C5A66A]/60 shadow-xs bg-[#173B32] flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
              <img src="/logo.jpg" alt="Lord of the Road" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#173B32] leading-none block">
                lord <span className="font-normal italic text-[#C5A66A]">of the</span> road
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#8B6E32] font-semibold block mt-0.5">
                Pan-India Travel Ecosystem
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-[#5A6D63]">
              पहले से खाता है?
            </span>
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl border border-[#173B32] text-[#173B32] hover:bg-[#173B32] hover:text-[#F7F4EC] text-xs font-bold transition-all shadow-2xs"
            >
              Sign In / लॉगिन ➔
            </Link>
          </div>
        </div>
      </header>

      {/* Main Luxury Hero Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Editorial Heading Box */}
        <div className="relative mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#173B32]/5 border border-[#173B32]/15 text-[#173B32] text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="text-[#C5A66A]">✦</span>
            <span>Uniting India's Roads, Villages & Cities</span>
            <span className="text-[#C5A66A]">✦</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#173B32] tracking-tight leading-[1.15]">
            Begin Your Journey Across India
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#8B6E32] mt-1">
            "रोड के किसी भी कोने तक कुछ छूटे नहीं"
          </p>
          <p className="mt-3 text-xs sm:text-sm text-[#5A6D63] max-w-2xl mx-auto leading-relaxed">
            यात्री, विलेज बुकिंग एजेंट, हाईवे कार व बाइक मैकेनिक, जंगल ढाबा या बुटीक स्टे ओनर — अपनी भूमिका चुनें और राष्ट्रव्यापी नेटवर्क का हिस्सा बनें।
          </p>
        </div>

        {/* 2-Column Luxury Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Role Selector (Span 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E7E2D6] shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-5 sm:p-7 relative overflow-hidden">
            {/* Subtle decorative gold sheen */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(ellipse_at_top_right,#C5A66A20,transparent_70%)] pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D6] mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B6E32]">
                  Step 1 of 2
                </span>
                <h2 className="text-lg font-serif font-bold text-[#173B32]">
                  Choose Account Persona
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#FAF8F4] text-[#8B6E32] border border-[#E7E2D6]">
                7 Categories
              </span>
            </div>

            <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-[#E7E2D6]">
              {ROLE_OPTIONS.map((opt) => {
                const isSelected = selectedCategory === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedCategory(opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 relative group flex items-start gap-4 ${
                      isSelected
                        ? "border-[#173B32] bg-[#FAF8F4] shadow-md ring-1 ring-[#173B32]/20"
                        : "border-[#EFECE3] hover:border-[#C5A66A]/60 bg-white hover:bg-[#FAF8F4]/50"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-105 shadow-2xs ${
                        isSelected
                          ? "bg-[#173B32] text-white"
                          : "bg-[#FAF8F4] border border-[#E7E2D6] text-[#173B32]"
                      }`}
                    >
                      {opt.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-serif font-bold text-sm text-[#173B32] group-hover:text-[#112B24] truncate">
                          {opt.title}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                            isSelected
                              ? "bg-[#173B32] text-[#F7F4EC]"
                              : "bg-[#EFECE3] text-[#5A6D63]"
                          }`}
                        >
                          {opt.badge}
                        </span>
                      </div>

                      <div className="text-xs text-[#8B6E32] font-semibold mt-0.5">
                        {opt.hindiTitle}
                      </div>

                      <div className="text-[11px] text-[#5A6D63] mt-1 line-clamp-2 leading-relaxed">
                        {opt.description}
                      </div>

                      {/* Micro Perks Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {opt.perks.map((p, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-medium px-2 py-0.5 rounded bg-white border border-[#E7E2D6] text-[#5A6D63]"
                          >
                            ✓ {p}
                          </span>
                        ))}
                      </div>

                      {isSelected && (
                        <div className="mt-2.5 pt-2 border-t border-[#E7E2D6] flex items-center justify-between text-[11px] font-bold text-[#173B32]">
                          <span>चयनित (Active Selection)</span>
                          <span>➔</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Luxury Onboarding Form (Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E7E2D6] shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 sm:p-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E7E2D6] mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B6E32]">
                  Step 2 of 2
                </span>
                <h2 className="text-xl font-serif font-bold text-[#173B32]">
                  Account & Onboarding Profile
                </h2>
                <p className="text-xs text-[#5A6D63] mt-0.5">
                  पंजीकरण के बाद आपका समर्पित डैशबोर्ड तुरंत सक्रिय हो जाएगा।
                </p>
              </div>

              {/* Active Role Pill in Header */}
              <div className="self-start sm:self-auto flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#FAF8F4] border border-[#C5A66A]/40 text-[#173B32] shadow-2xs">
                <span className="text-xl">{selectedRoleConfig.icon}</span>
                <div>
                  <div className="text-xs font-bold leading-tight">{selectedRoleConfig.title}</div>
                  <div className="text-[10px] text-[#8B6E32]">{selectedRoleConfig.hindiTitle}</div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3 shadow-2xs">
                <span className="text-lg">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3 shadow-2xs">
                <span className="text-lg">✅</span>
                <span className="font-medium">{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Business / Commercial Specific Card */}
              {selectedCategory !== "CUSTOMER" && (
                <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E7E2D6] space-y-4 relative overflow-hidden">
                  <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#173B32]">
                    <span className="text-base">🏪</span>
                    <span>व्यावसायिक प्रतिष्ठान का विवरण (Business & Location Details)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5A6D63] mb-1.5">
                        प्रतिष्ठान / दुकान / गैराज का नाम *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={
                          selectedCategory === "AGENT"
                            ? "उदा. शर्मा टूर एंड ट्रैवल्स / सीएससी केंद्र"
                            : selectedCategory === "MECHANIC"
                            ? "उदा. हाईवे ऑटो गैराज एंड 24/7 रिकवरी"
                            : selectedCategory === "RESTAURANT"
                            ? "उदा. पहाड़ी रसोई व हाईवे ढाबा"
                            : "व्यवसाय का नाम"
                        }
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] text-xs sm:text-sm bg-white text-[#173B32] focus:outline-none focus:ring-2 focus:ring-[#C5A66A] focus:border-[#173B32] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5A6D63] mb-1.5">
                        सेवा का प्रकार / स्पेशलाइजेशन
                      </label>
                      <input
                        type="text"
                        placeholder={
                          selectedCategory === "AGENT"
                            ? "विलेज टिकटिंग, बस, ट्रेन व इंश्योरेंस"
                            : selectedCategory === "MECHANIC"
                            ? "कार/बाइक रिपेयर, टोइंग, पंचर, ईसीयू"
                            : selectedCategory === "RESTAURANT"
                            ? "शुद्ध शाकाहारी ढाबा, टी-स्टॉप, कैफे"
                            : "सेवा का प्रकार"
                        }
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] text-xs sm:text-sm bg-white text-[#173B32] focus:outline-none focus:ring-2 focus:ring-[#C5A66A] focus:border-[#173B32] transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5A6D63] mb-1.5">
                        पिन कोड (PIN Code) *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        placeholder="उदा. 249201"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] text-xs sm:text-sm bg-white text-[#173B32] focus:outline-none focus:ring-2 focus:ring-[#C5A66A] focus:border-[#173B32] transition font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5A6D63] mb-1.5">
                        शहर / कस्बा / गाँव *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. ऋषिकेश / मनाली"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] text-xs sm:text-sm bg-white text-[#173B32] focus:outline-none focus:ring-2 focus:ring-[#C5A66A] focus:border-[#173B32] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5A6D63] mb-1.5">
                        राज्य (State) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. उत्तराखंड / राजस्थान"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] text-xs sm:text-sm bg-white text-[#173B32] focus:outline-none focus:ring-2 focus:ring-[#C5A66A] focus:border-[#173B32] transition"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5A6D63] mb-1.5">
                    आपका पूरा नाम (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. राहुल शर्मा"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] text-xs sm:text-sm bg-[#FAF8F4]/50 focus:bg-white text-[#173B32] focus:outline-none focus:ring-2 focus:ring-[#C5A66A] focus:border-[#173B32] transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5A6D63] mb-1.5">
                    10-अंकीय मोबाइल नंबर (Phone) *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-[#D5CDBD] bg-[#FAF8F4] text-[#173B32] text-xs sm:text-sm font-bold font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-r-xl border border-[#D5CDBD] text-xs sm:text-sm bg-[#FAF8F4]/50 focus:bg-white text-[#173B32] focus:outline-none focus:ring-2 focus:ring-[#C5A66A] focus:border-[#173B32] transition font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5A6D63] mb-1.5">
                  ईमेल पता (Email Address) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@lordoftheroad.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] text-xs sm:text-sm bg-[#FAF8F4]/50 focus:bg-white text-[#173B32] focus:outline-none focus:ring-2 focus:ring-[#C5A66A] focus:border-[#173B32] transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5A6D63] mb-1.5">
                    पासवर्ड (Password, min 6 chars) *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] text-xs sm:text-sm bg-[#FAF8F4]/50 focus:bg-white text-[#173B32] focus:outline-none focus:ring-2 focus:ring-[#C5A66A] focus:border-[#173B32] transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5A6D63] mb-1.5">
                    पासवर्ड की पुष्टि करें (Confirm Password) *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDBD] text-xs sm:text-sm bg-[#FAF8F4]/50 focus:bg-white text-[#173B32] focus:outline-none focus:ring-2 focus:ring-[#C5A66A] focus:border-[#173B32] transition"
                  />
                </div>
              </div>

              {/* Trust & Guarantee Banner */}
              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E7E2D6] flex items-center gap-3">
                <span className="text-2xl text-[#C5A66A] shrink-0">🛡️</span>
                <span className="text-[11px] sm:text-xs text-[#5A6D63] leading-relaxed">
                  लॉर्ड ऑफ द रोड से जुड़कर आप पारदर्शी मूल्य, 24/7 हाईवे सुरक्षा और भारतीय यात्रा मानकों के प्रति प्रतिबद्धता दर्ज करते हैं।
                </span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl bg-[#173B32] hover:bg-[#112B24] text-[#F7F4EC] font-serif font-bold text-sm sm:text-base tracking-wide shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer group"
              >
                {loading ? (
                  <>
                    <span className="animate-spin text-lg">⏳</span>
                    <span>खाता बनाया जा रहा है...</span>
                  </>
                ) : (
                  <>
                    <span>खाता बनाएँ व {selectedRoleConfig.title} शुरू करें</span>
                    <span className="group-hover:translate-x-1 transition-transform">➔</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#E7E2D6] text-center text-xs text-[#5A6D63]">
              पहले से पंजीकृत हैं?{" "}
              <Link href="/login" className="font-bold text-[#173B32] hover:text-[#C5A66A] transition-colors underline">
                यहाँ लॉगिन करें (Sign In Here)
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-8 text-[#173B32]">Loading...</div>}>
      <RegisterPageContent />
    </Suspense>
  );
}
