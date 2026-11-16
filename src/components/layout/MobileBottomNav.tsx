"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
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

    updateCount();
    window.addEventListener("lotr-wishlist-updated", updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("lotr-wishlist-updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  const handleOpenAi = () => {
    const btn = document.querySelector('button[aria-label="Open AI Travel Companion"]') as HTMLButtonElement;
    if (btn) {
      btn.click();
    } else {
      window.location.href = "/travel-agent";
    }
  };

  const handleOpenWishlist = () => {
    window.dispatchEvent(new CustomEvent("lotr-open-wishlist-drawer"));
  };

  const handleScrollToStays = () => {
    const el = document.getElementById("airbnb-stays-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#airbnb-stays-section";
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F4]/95 backdrop-blur-md border-t border-[#E7E6E0] py-2 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Explore */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
            pathname === "/" ? "text-[#173B32]" : "text-[#737B76] hover:text-[#173B32]"
          }`}
        >
          <span className="text-lg">🧭</span>
          <span>Explore</span>
        </Link>

        {/* Stays & Map */}
        <button
          type="button"
          onClick={handleScrollToStays}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-[#737B76] hover:text-[#173B32] transition"
        >
          <span className="text-lg">🗺️</span>
          <span>Stays & Map</span>
        </button>

        {/* AI Travel Agent Floating Center Pill */}
        <button
          type="button"
          onClick={handleOpenAi}
          className="flex flex-col items-center -mt-5 group"
          title="Open AI Travel Planner"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#173B32] via-[#287C70] to-[#B7955B] text-white flex items-center justify-center shadow-lg group-active:scale-95 transition-transform border-2 border-white">
            <span className="text-xl">✨</span>
          </div>
          <span className="text-[10px] font-bold text-[#173B32] mt-0.5">AI Planner</span>
        </button>

        {/* Wishlist / Saved */}
        <button
          type="button"
          onClick={handleOpenWishlist}
          className="relative flex flex-col items-center gap-0.5 text-[10px] font-semibold text-[#737B76] hover:text-[#173B32] transition"
        >
          <div className="relative">
            <span className="text-lg">❤️</span>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#B7955B] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </div>
          <span>Wishlist</span>
        </button>

        {/* My Trips */}
        <Link
          href="/my-trips"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
            pathname.startsWith("/my-trips") ? "text-[#173B32]" : "text-[#737B76] hover:text-[#173B32]"
          }`}
        >
          <span className="text-lg">🎒</span>
          <span>My Trips</span>
        </Link>
      </div>
    </nav>
  );
}
