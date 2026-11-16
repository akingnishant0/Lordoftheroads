"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import en from "./en.json";
import hi from "./hi.json";

export type Locale = "en" | "hi";

export interface LanguageContextType {
  locale: Locale;
  language: Locale;
  setLocale: (l: Locale) => void;
  setLanguage: (l: Locale) => void;
  t: (key: string) => string;
}

const dictionaries: Record<Locale, Record<string, unknown>> = {
  en,
  hi,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize locale: default to 'en', synced with localStorage in client
  const [locale, setLocale] = useState<Locale>("en");

  // Load persisted language preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lotr-lang");
      if (saved === "en" || saved === "hi") {
        setLocale(saved);
      }
    } catch {
      // Safely handle environments where localStorage is blocked
    }
  }, []);

  // Persist locale changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("lotr-lang", locale);
    } catch {
      // Safely handle environments where localStorage is blocked
    }
  }, [locale]);

  // Lookup nested translation key (e.g. 'nav.dashboard')
  const t = useCallback(
    (key: string): string => {
      const dict = dictionaries[locale] || dictionaries.en;
      const parts = key.split(".");
      let current: unknown = dict;

      for (const part of parts) {
        if (
          current &&
          typeof current === "object" &&
          part in (current as Record<string, unknown>)
        ) {
          current = (current as Record<string, unknown>)[part];
        } else {
          return key;
        }
      }

      return typeof current === "string" ? current : key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider
      value={{
        locale,
        language: locale,
        setLocale,
        setLanguage: setLocale,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
