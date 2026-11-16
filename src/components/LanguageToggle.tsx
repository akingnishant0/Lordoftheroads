"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

/**
 * Language switcher button that toggles between English ('EN') and Hindi ('हिं').
 */
export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "hi" : "en");
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 px-2 py-1 rounded transition-colors cursor-pointer hover:bg-gray-100"
      title={locale === "en" ? "Switch to Hindi" : "Switch to English"}
      aria-label="Toggle language"
    >
      <GlobeAltIcon className="h-5 w-5" aria-hidden="true" />
      <span className="font-medium">{locale === "en" ? "EN" : "हिं"}</span>
    </button>
  );
}
