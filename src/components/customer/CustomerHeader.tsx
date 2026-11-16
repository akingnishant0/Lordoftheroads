"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useLanguage } from "@/i18n/LanguageContext";

export function CustomerHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  // Monitor scroll for Sticky Search Pill
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 280);
    };

    const updateSavedCount = () => {
      try {
        const stored = localStorage.getItem("lotr_saved_stays");
        if (stored) {
          const list = JSON.parse(stored);
          setSavedCount(Array.isArray(list) ? list.length : 0);
        } else {
          setSavedCount(0);
        }
      } catch {
        setSavedCount(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("lotr-wishlist-updated", updateSavedCount);
    window.addEventListener("storage", updateSavedCount);
    updateSavedCount();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("lotr-wishlist-updated", updateSavedCount);
      window.removeEventListener("storage", updateSavedCount);
    };
  }, []);

  const handleOpenWishlist = () => {
    window.dispatchEvent(new CustomEvent("lotr-open-wishlist-drawer"));
  };

  const handleStickySearchClick = () => {
    const searchBar = document.getElementById("airbnb-search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      router.push("/#airbnb-search-bar");
    }
  };

  const navServices = [
    { name: "Holiday Packages", href: "/holiday-packages", icon: "🌴" },
    { name: "Hotels", href: "/hotels", icon: "🏨" },
    { name: "Villas & Homestays", href: "/villas-homestays", icon: "🏡" },
    { name: "Flights", href: "/flights", icon: "✈️" },
    { name: "Trains (IRCTC)", href: "/trains", icon: "🚆" },
    { name: "Buses", href: "/buses", icon: "🚌" },
    { name: "Cabs & Transfers", href: "/cabs", icon: "🚕" },
    { name: "Tours & Activities", href: "/tours", icon: "🗺️" },
    { name: "Visa Guidance", href: "/visa-help", icon: "🛂" },
  ];

  const userRole = (session?.user as { role?: string })?.role;

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F4]/95 backdrop-blur-md border-b border-[#E7E6E0] transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-[#173D32] text-[#FAF8F4] px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B7955B] animate-pulse"></span>
          <span>
            {language === "hi"
              ? "भारत एवं विदेश यात्राएं • 100% सत्यापित दरें एवं Airbnb-Style Stays"
              : "Curated India & Global Journeys • Live Real-time Rates & Stays"}
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-[#EDE5D8]">
          <Link href="/support" className="hover:text-white transition">24/7 Concierge Support</Link>
          <span className="opacity-40">|</span>
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="hover:text-[#B7955B] font-semibold flex items-center gap-1 cursor-pointer"
          >
            🌐 {language === "en" ? "हिन्दी" : "English"}
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 rounded-2xl overflow-hidden border-2 border-[#B7955B]/50 shadow-sm group-hover:scale-105 transition-transform bg-black shrink-0">
            <img src="/logo.jpg" alt="Lord of the Roads" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold text-[#173D32] tracking-tight leading-tight">
              lord <i className="font-normal font-serif text-[#B7955B]">of the</i> road
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#737B76] font-semibold">
              Travel Booking Platform
            </span>
          </div>
        </Link>

        {/* Floating Airbnb Sticky Search Pill (appears on scroll) */}
        {isScrolled ? (
          <button
            type="button"
            onClick={handleStickySearchClick}
            className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full border border-[#E7E6E0] bg-white shadow-md hover:shadow-lg transition-all text-xs font-semibold text-[#173D32] animate-fadeIn cursor-pointer"
            title="Search destinations, dates, and guests"
          >
            <span>Anywhere in India</span>
            <span className="w-1 h-1 rounded-full bg-[#E7E6E0]"></span>
            <span>Any week</span>
            <span className="w-1 h-1 rounded-full bg-[#E7E6E0]"></span>
            <span className="text-[#737B76]">Add guests</span>
            <span className="w-7 h-7 rounded-full bg-[#173D32] text-white flex items-center justify-center text-xs ml-1 shadow-xs">
              🔍
            </span>
          </button>
        ) : (
          /* Desktop Navigation (default when at top) */
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/destinations"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith("/destinations")
                  ? "text-[#173D32] font-semibold bg-[#EDE5D8]/50"
                  : "text-[#242A28] hover:text-[#173D32] hover:bg-[#FAF8F4]"
              }`}
            >
              Destinations
            </Link>

            {/* Services Mega Dropdown */}
            <div className="relative" onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button
                type="button"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1.5 ${
                  servicesDropdownOpen ? "text-[#173D32] bg-[#EDE5D8]/60" : "text-[#242A28] hover:text-[#173D32]"
                }`}
              >
                <span>Travel Services</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white border border-[#E7E6E0] rounded-xl shadow-xl p-3 grid grid-cols-1 gap-1 z-50 animate-fadeIn">
                  <div className="text-[10px] uppercase font-bold text-[#737B76] px-3 py-1 tracking-wider border-b border-[#E7E6E0] mb-1">
                    Book Transport & Stays
                  </div>
                  {navServices.map((srv) => (
                    <Link
                      key={srv.href}
                      href={srv.href}
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#242A28] hover:bg-[#FAF8F4] hover:text-[#173D32] transition group"
                    >
                      <span className="text-base p-1.5 rounded-md bg-[#FAF8F4] group-hover:bg-[#EDE5D8]/60 transition">
                        {srv.icon}
                      </span>
                      <span>{srv.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/holiday-packages"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === "/holiday-packages"
                  ? "text-[#173D32] font-semibold bg-[#EDE5D8]/50"
                  : "text-[#242A28] hover:text-[#173D32]"
              }`}
            >
              Holiday Packages
            </Link>

            <Link
              href="/travel-agent"
              className="ml-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#173D32] to-[#287C70] text-[#FAF8F4] text-xs font-semibold shadow-sm hover:shadow hover:brightness-105 transition"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7955B] animate-ping"></span>
              <span>AI Travel Agent</span>
            </Link>
          </nav>
        )}

        {/* Right CTA & Account */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Wishlist Button with Badge */}
          <button
            type="button"
            onClick={handleOpenWishlist}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E7E6E0] bg-white hover:border-[#173D32] transition relative cursor-pointer"
            title="View Saved Wishlist"
          >
            <span>❤️</span>
            <span className="hidden sm:inline text-[#242A28]">Wishlist</span>
            {savedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#B7955B] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </button>

          {/* My Trips */}
          <Link
            href="/my-trips"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E7E6E0] hover:border-[#173D32] transition ${
              pathname.startsWith("/my-trips")
                ? "bg-[#173D32] text-white border-[#173D32]"
                : "text-[#242A28] bg-white"
            }`}
          >
            <span>🧳</span>
            <span>My Trips</span>
          </Link>

          {session?.user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-[#E7E6E0] hover:border-[#287C70] transition"
              >
                <span className="w-5 h-5 rounded-full bg-[#EDE5D8] text-[#173D32] flex items-center justify-center font-bold text-[10px]">
                  {(session.user.name || session.user.email || "U")[0].toUpperCase()}
                </span>
                <span className="max-w-[90px] truncate text-[#242A28]">{session.user.name || "Account"}</span>
              </Link>
              {userRole === "AGENT" && (
                <Link
                  href="/agent/dashboard"
                  className="px-2.5 py-1 bg-[#287C70] text-white text-[11px] font-semibold rounded-md"
                >
                  Agent Desk
                </Link>
              )}
              {userRole === "SUPER_ADMIN" && (
                <Link
                  href="/admin/dashboard"
                  className="px-2.5 py-1 bg-[#173D32] text-[#B7955B] text-[11px] font-semibold rounded-md"
                >
                  Admin Desk
                </Link>
              )}
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-1.5 text-[#737B76] hover:text-red-600 rounded-md transition"
                title="Sign out"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-1.5 text-xs font-semibold text-[#173D32] hover:text-[#287C70] transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#173D32] text-white hover:bg-[#287C70] transition shadow-sm"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#242A28] hover:bg-[#EDE5D8]/50"
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7E6E0] bg-[#FAF8F4] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <Link
            href="/travel-agent"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-xl bg-[#173D32] text-white font-medium"
          >
            <span className="flex items-center gap-2">
              <span>🤖</span>
              <span>AI Travel Agent Concierge</span>
            </span>
            <span className="text-xs bg-[#B7955B] text-[#173D32] font-bold px-2 py-0.5 rounded-full">New</span>
          </Link>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white border border-[#E7E6E0] text-sm font-medium text-[#242A28]"
            >
              🧭 Destinations
            </Link>
            <Link
              href="/holiday-packages"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white border border-[#E7E6E0] text-sm font-medium text-[#242A28]"
            >
              🌴 Packages
            </Link>
            <Link
              href="/hotels"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white border border-[#E7E6E0] text-sm font-medium text-[#242A28]"
            >
              🏨 Hotels
            </Link>
            <Link
              href="/villas-homestays"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white border border-[#E7E6E0] text-sm font-medium text-[#242A28]"
            >
              🏡 Villas & Stays
            </Link>
            <Link
              href="/flights"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white border border-[#E7E6E0] text-sm font-medium text-[#242A28]"
            >
              ✈️ Flights
            </Link>
            <Link
              href="/trains"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white border border-[#E7E6E0] text-sm font-medium text-[#242A28]"
            >
              🚆 Trains (IRCTC)
            </Link>
            <Link
              href="/buses"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white border border-[#E7E6E0] text-sm font-medium text-[#242A28]"
            >
              🚌 Buses
            </Link>
            <Link
              href="/cabs"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white border border-[#E7E6E0] text-sm font-medium text-[#242A28]"
            >
              🚕 Cabs
            </Link>
          </div>

          <div className="pt-2 border-t border-[#E7E6E0] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenWishlist();
              }}
              className="text-sm font-medium text-[#173D32] flex items-center gap-1.5"
            >
              ❤️ Saved Wishlist ({savedCount})
            </button>
            <Link
              href="/support"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#737B76]"
            >
              Customer Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
