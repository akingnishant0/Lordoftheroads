"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/i18n/LanguageContext";

/**
 * Root providers wrapper for NextAuth session and bilingual i18n support.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </SessionProvider>
  );
}
