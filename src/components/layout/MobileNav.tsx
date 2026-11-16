"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  HomeIcon,
  InboxIcon,
  UserGroupIcon,
  GiftIcon,
  TicketIcon,
  CurrencyRupeeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export interface MobileNavProps {
  role: string;
  currentPath: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Mobile bottom tab navigation bar, fixed at screen bottom with role-aware tabs.
 */
export function MobileNav({ role, currentPath }: MobileNavProps) {
  const { t } = useLanguage();

  const tabConfig: Record<string, NavItem[]> = {
    SUPER_ADMIN: [
      { label: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
      { label: "Bookings", href: "/admin/bookings", icon: TicketIcon },
      { label: "Agents", href: "/admin/agents", icon: UserGroupIcon },
      { label: "Leads", href: "/admin/leads", icon: InboxIcon },
    ],
    OFFICE_ADMIN: [
      { label: "Dashboard", href: "/office", icon: HomeIcon },
      { label: "Leads", href: "/office/leads", icon: InboxIcon },
      { label: "Agents", href: "/office/agents", icon: UserGroupIcon },
      { label: "Packages", href: "/office/packages", icon: GiftIcon },
    ],
    AGENT: [
      { label: "Dashboard", href: "/agent/dashboard", icon: HomeIcon },
      { label: "Leads", href: "/agent/leads", icon: InboxIcon },
      { label: "Bookings", href: "/agent/bookings", icon: TicketIcon },
      { label: "Desk", href: "/agent", icon: CurrencyRupeeIcon },
    ],
    CUSTOMER: [
      { label: "Lounge", href: "/customer", icon: HomeIcon },
      { label: "My Trips", href: "/my-trips", icon: TicketIcon },
      { label: "Packages", href: "/holiday-packages", icon: GiftIcon },
      { label: "Profile", href: "/profile", icon: UserIcon },
    ],
  };

  const tabs = tabConfig[role] || [];

  const isTabActive = (href: string) => {
    const cleanPath = currentPath.split("?")[0].replace(/\/$/, "");
    const cleanHref = href.split("?")[0].replace(/\/$/, "");

    if (cleanPath === cleanHref) {
      return true;
    }

    const isRootRolePath = [
      "/admin",
      "/office",
      "/agent",
      "/customer",
    ].includes(cleanHref);

    if (!isRootRolePath && cleanPath.startsWith(cleanHref)) {
      return true;
    }

    return false;
  };

  if (tabs.length === 0) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#173D32] border-t border-[#287C70]/40 md:hidden shadow-xl">
      <div className="grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const active = isTabActive(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-2 text-[11px] transition-colors ${
                active
                  ? "text-[#B7955B] font-bold"
                  : "text-[#EDE5D8]/70 hover:text-white"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  active ? "text-[#B7955B]" : "text-[#EDE5D8]/70"
                }`}
              />
              <span className="truncate max-w-[64px]">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
