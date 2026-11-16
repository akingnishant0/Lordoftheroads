"use client";

import React, { useState } from "react";
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
  description: string;
  icon: string;
  colorBorder: string;
  colorBg: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: "CUSTOMER",
    role: "CUSTOMER",
    badge: "Personal",
    title: "Traveler & Road Explorer",
    hindiTitle: "यात्री एवं एक्सप्लोरर",
    description: "Book verified stays, cabs, buses, roadside SOS and instant travel insurance.",
    icon: "🧭",
    colorBorder: "border-[#173B32]",
    colorBg: "bg-[#173B32]/10 text-[#173B32]",
  },
  {
    id: "AGENT",
    role: "AGENT",
    badge: "Franchise Partner",
    title: "Village & Town Booking Agent",
    hindiTitle: "ग्रामीण एवं शहरी अधिकृत एजेंट",
    description: "Open local booking counter, issue travel insurance, manage client bookings and earn commission.",
    icon: "🏢",
    colorBorder: "border-[#C5A66A]",
    colorBg: "bg-[#C5A66A]/15 text-[#8B6E32]",
  },
  {
    id: "MECHANIC",
    role: "TRAVEL_SHOP_VENDOR",
    badge: "Highway Partner",
    title: "Car / Bike Mechanic & Garage",
    hindiTitle: "कार / बाइक मैकेनिक व गैराज",
    description: "Receive roadside breakdown alerts, emergency towing requests, and mobile puncture jobs.",
    icon: "🔧",
    colorBorder: "border-blue-600",
    colorBg: "bg-blue-50 text-blue-800",
  },
  {
    id: "RESTAURANT",
    role: "TRAVEL_SHOP_VENDOR",
    badge: "Food & Dining",
    title: "Highway Dhaba & Jungle Cafe",
    hindiTitle: "हाईवे ढाबा, जंगल कैफ़े व रेस्टोरेंट",
    description: "List roadside eateries, highway dhabas, jungle cafes & receive traveler pre-orders.",
    icon: "🍲",
    colorBorder: "border-amber-600",
    colorBg: "bg-amber-50 text-amber-800",
  },
  {
    id: "STAY",
    role: "HOTEL_SUPPLIER",
    badge: "Hospitality",
    title: "Stays, Homestays & Resorts",
    hindiTitle: "होटल, होमस्टे व कैंप साइट्स",
    description: "List heritage havelis, mountain chalets, jungle camps and private pool villas.",
    icon: "🏡",
    colorBorder: "border-emerald-600",
    colorBg: "bg-emerald-50 text-emerald-800",
  },
  {
    id: "TRANSPORT",
    role: "CAB_BIKE_OPERATOR",
    badge: "Fleet Partner",
    title: "Cab, Bike & Bus Operators",
    hindiTitle: "कैब, बाइक रेंटल व बस ऑपरेटर",
    description: "List outstation cabs, self-drive 4x4s, mountain bikes, or intercity Volvo buses.",
    icon: "🚖",
    colorBorder: "border-purple-600",
    colorBg: "bg-purple-50 text-purple-800",
  },
  {
    id: "SHOP",
    role: "TRAVEL_SHOP_VENDOR",
    badge: "Gear Vendor",
    title: "Travel Gear & Gadget Vendor",
    hindiTitle: "ट्रैवल गियर व गैजेट विक्रेता",
    description: "Supply dashcams, trekking kits, camping gear, and GPS trackers to agent stores & travelers.",
    icon: "🎒",
    colorBorder: "border-rose-600",
    colorBg: "bg-rose-50 text-rose-800",
  },
];

export default function RegisterPage() {
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
      setError("कृपया अपने व्यवसाय/दुकान/प्रतिष्ठान का नाम दर्ज करें।");
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

      setSuccessMsg("खाता सफलतापूर्वक तैयार हो गया! सिस्टम में लॉगिन किया जा रहा है...");

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
    <div className="min-h-screen bg-[#F7F4EC] text-[#1A2621] py-8 sm:py-14 px-3 sm:px-6 lg:px-8">
      {/* Container widened from max-w-4xl to max-w-6xl for open, spacious responsive layout */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Brand Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">🛣️</span>
            <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#173B32]">
              Lord of the Road
            </span>
          </Link>
          <div className="block mt-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#173B32]/10 text-[#173B32] text-xs sm:text-sm font-bold rounded-full uppercase tracking-wider border border-[#173B32]/20">
              <span>🇮🇳</span>
              <span>Pan-India Travel & Roadside Ecosystem</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#173B32] mt-4">
            Join the Ecosystem · खाता बनाएं
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#4A5D53] max-w-3xl mx-auto px-2 leading-relaxed">
            कनेक्टिंग एव्री विलेज एंड सिटी — चाहे आप यात्री हों, ग्रामीण/शहरी अधिकृत एजेंट, हाईवे मैकेनिक, जंगल ढाबा या होटल पार्टनर, सबका समर्पित पोर्टल यहाँ है।
          </p>
        </div>

        {/* 2-Column Responsive Layout on Desktop (Left: Account Roles, Right: Input Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Role Selector (Span 5 on LG, Full on Mobile) */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-sm border border-[#E3DCC9] p-5 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3DCC9] mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#173B32]">
                  1. Select Account Type
                </h2>
                <div className="text-xs text-[#738379]">खाता श्रेणी चुनें (7 श्रेणियां)</div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#173B32]/10 text-[#173B32]">
                {selectedRoleConfig.title.split(" ")[0]}
              </span>
            </div>

            <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
              {ROLE_OPTIONS.map((opt) => {
                const isSelected = selectedCategory === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedCategory(opt.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all relative flex items-start gap-3.5 ${
                      isSelected
                        ? `${opt.colorBorder} bg-[#FAF8F4] shadow-md ring-1 ring-current`
                        : "border-[#E8E2D2] hover:border-[#173B32]/30 bg-white hover:bg-gray-50/80"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-white border border-[#E3DCC9] shadow-xs flex-shrink-0">
                      {opt.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-bold text-sm text-[#173B32] truncate">
                          {opt.title}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 flex-shrink-0">
                          {opt.badge}
                        </span>
                      </div>
                      <div className="text-xs text-[#8B6E32] font-semibold mb-1">
                        {opt.hindiTitle}
                      </div>
                      <p className="text-[11px] text-[#5A6D63] leading-relaxed line-clamp-2">
                        {opt.description}
                      </p>
                      {isSelected && (
                        <div className="mt-2 text-[11px] font-bold text-[#173B32] flex items-center gap-1">
                          <span>✓ चयनित (Selected)</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Form (Span 7 on LG, Full on Mobile) */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-[#E3DCC9] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E3DCC9] mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#173B32]">
                  2. Registration & Onboarding Details
                </h2>
                <p className="text-xs text-[#738379] mt-0.5">
                  विवरण भरें — साइन अप के तुरंत बाद आपका समर्पित डैशबोर्ड खुलेगा।
                </p>
              </div>
              <div className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF8F4] border border-[#E3DCC9] text-xs font-bold text-[#173B32]">
                <span className="text-base">{selectedRoleConfig.icon}</span>
                <span>{selectedRoleConfig.title}</span>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
                <span className="text-lg">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-2.5">
                <span className="text-lg">✅</span>
                <span className="font-medium">{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business / Shop Info Section (when role is partner) */}
              {selectedCategory !== "CUSTOMER" && (
                <div className="p-4 sm:p-5 bg-[#FAF8F4] rounded-2xl border border-[#E3DCC9] space-y-4">
                  <div className="font-bold text-sm text-[#173B32] flex items-center gap-2">
                    <span className="text-base">🏪</span>
                    <span>प्रतिष्ठान / दुकान / फ्रेंचाइजी का विवरण (Business Info)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4A5D53] mb-1.5">
                        प्रतिष्ठान / गैराज / ढाबे का नाम *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={
                          selectedCategory === "AGENT"
                            ? "उदा. शर्मा टूर एंड ट्रैवल्स / सीएससी केंद्र"
                            : selectedCategory === "MECHANIC"
                            ? "उदा. हाईवे ऑटो गैराज एंड रिकवरी"
                            : selectedCategory === "RESTAURANT"
                            ? "उदा. पहाड़ी रसोई व हाईवे ढाबा"
                            : "व्यापार का नाम"
                        }
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white transition shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A5D53] mb-1.5">
                        सेवा का प्रकार / श्रेणी (Category)
                      </label>
                      <input
                        type="text"
                        placeholder={
                          selectedCategory === "AGENT"
                            ? "विलेज टिकटिंग व इंश्योरेंस डेस्क"
                            : selectedCategory === "MECHANIC"
                            ? "कार/बाइक रिपेयर, टोइंग, पंचर"
                            : selectedCategory === "RESTAURANT"
                            ? "हाईवे ढाबा, फैमिली डाइनिंग, कैफे"
                            : "सेवा का प्रकार"
                        }
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white transition shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4A5D53] mb-1.5">
                        पिन कोड (PIN Code) *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        placeholder="उदा. 249201"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white transition shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A5D53] mb-1.5">
                        शहर / कस्बा / गाँव *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. ऋषिकेश / मनाली / जयपुर"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white transition shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A5D53] mb-1.5">
                        राज्य (State) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. उत्तराखंड / राजस्थान"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white transition shadow-2xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Info Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A5D53] mb-1.5">
                    आपका पूरा नाम (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. राहुल शर्मा"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white transition shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A5D53] mb-1.5">
                    10-अंकीय मोबाइल नंबर (Phone) *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-[#D5CDBD] bg-[#F7F4EC] text-[#173B32] text-sm font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-r-xl border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white transition shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A5D53] mb-1.5">
                  ईमेल पता (Email Address) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white transition shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A5D53] mb-1.5">
                    पासवर्ड (Password, min 6 chars) *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white transition shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A5D53] mb-1.5">
                    पासवर्ड की पुष्टि करें (Confirm Password) *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white transition shadow-2xs"
                  />
                </div>
              </div>

              {/* Trust Badge */}
              <div className="text-xs text-[#5A6D63] bg-[#FAF8F4] p-4 rounded-xl border border-[#E3DCC9] flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                <span>
                  साइन अप करके आप <strong>Lord of the Road</strong> के राष्ट्रव्यापी सुरक्षा, फेयर प्राइसिंग, और ग्रामीण-शहरी कनेक्टिविटी मानकों से सहमत होते हैं।
                </span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl bg-[#173B32] hover:bg-[#112B24] text-white font-bold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="animate-spin text-lg">⏳</span>
                    <span>खाता बनाया जा रहा है...</span>
                  </>
                ) : (
                  <>
                    <span>खाता बनाएँ व पोर्टल शुरू करें (Join {selectedRoleConfig.title})</span>
                    <span className="text-lg">➔</span>
                  </>
                )}
              </button>
            </form>

            {/* Already have an account */}
            <div className="mt-8 pt-6 border-t border-[#E3DCC9] text-center text-sm text-[#738379]">
              पहले से खाता मौजूद है?{" "}
              <Link href="/login" className="font-bold text-[#173B32] hover:underline">
                यहाँ लॉगिन करें (Log in here)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
