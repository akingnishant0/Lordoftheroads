"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { data: session } = useSession();
  const { language, setLanguage } = useLanguage();

  const userRole = (session?.user as { role?: string })?.role || "CUSTOMER";
  const userName = session?.user?.name || session?.user?.email || "User";

  return (
    <header className="h-18 bg-[#FAF8F4]/90 backdrop-blur-md border-b border-[#E7E6E0] px-4 sm:px-6 flex items-center justify-between shadow-xs shrink-0 select-none z-30">
      {/* Left: Mobile hamburger & Context breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="p-2 -ml-2 rounded-xl text-[#242A28] hover:bg-[#EDE5D8]/50 md:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <Link href="/" className="md:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-[#B7955B]/60 bg-black shrink-0">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
        </Link>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#B7955B]">
            {userRole === "SUPER_ADMIN" ? "Master Command" : userRole === "AGENT" ? "B2B Partner Terminal" : "Customer Desk"}
          </span>
          <span className="text-gray-300">•</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Real-time GDS Active</span>
          </span>
        </div>
      </div>

      {/* Center: Search & AI Quick Trigger */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search bookings, PNRs, leads, flights..."
            className="w-full bg-white border border-[#E7E6E0] rounded-xl pl-9 pr-4 py-2 text-xs text-[#242A28] placeholder-[#737B76] focus:outline-none focus:border-[#173D32] focus:ring-1 focus:ring-[#173D32] transition"
          />
          <MagnifyingGlassIcon className="h-4 w-4 text-[#737B76] absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Right: AI Shortcut, Language, User Badge & Logout */}
      <div className="flex items-center gap-3">
        <Link
          href="/travel-agent"
          className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#173D32] to-[#287C70] text-[#FAF8F4] text-xs font-semibold shadow-xs hover:brightness-110 transition"
        >
          <SparklesIcon className="w-3.5 h-3.5 text-[#B7955B]" />
          <span>AI Concierge</span>
        </Link>

        {/* Bilingual Switcher */}
        <button
          type="button"
          onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          className="px-2.5 py-1.5 rounded-xl border border-[#E7E6E0] bg-white text-xs font-semibold text-[#173D32] hover:bg-[#FAF8F4] transition flex items-center gap-1 cursor-pointer"
          title="Switch Language"
        >
          <span>🌐</span>
          <span>{language === "en" ? "हिन्दी" : "EN"}</span>
        </button>

        {/* User Pill */}
        {session?.user && (
          <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-[#E7E6E0]">
            <div className="w-8 h-8 rounded-xl bg-[#173D32] text-[#B7955B] font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {userName[0].toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-[#242A28] leading-tight truncate max-w-[120px]">
                {userName}
              </span>
              <span className="text-[10px] font-semibold text-[#287C70] uppercase tracking-wider">
                {userRole.replace("_", " ")}
              </span>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="p-2 text-[#737B76] hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
          title="Sign out"
          aria-label="Sign out"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
