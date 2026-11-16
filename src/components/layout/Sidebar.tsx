"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSession, signOut } from "next-auth/react";
import {
  HomeIcon,
  InboxIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  GiftIcon,
  TicketIcon,
  Cog6ToothIcon,
  CurrencyRupeeIcon,
  UserIcon,
  ArrowsRightLeftIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  ArrowRightOnRectangleIcon,
  DocumentTextIcon,
  MapPinIcon,
  TagIcon,
  ClipboardDocumentCheckIcon,
  PhoneIcon,
  TruckIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export interface SidebarProps {
  role: string;
  currentPath: string;
}

interface NavSection {
  title?: string;
  items: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

export function Sidebar({ role, currentPath }: SidebarProps) {
  const { t } = useLanguage();
  const { data: session } = useSession();

  const userRole = ((session?.user as { role?: string })?.role || role || "CUSTOMER").toUpperCase();
  const userName = session?.user?.name || "Travel Professional";
  const userEmail = session?.user?.email || "";

  // 1. SUPER_ADMIN Sections
  const adminSections: NavSection[] = [
    {
      title: "OPERATIONS & DESK",
      items: [
        { label: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
        { label: "Bookings & PNRs", href: "/admin/bookings", icon: TicketIcon, badge: "Live" },
        { label: "Lead Pipeline CRM", href: "/admin/leads", icon: InboxIcon },
        { label: "Registered Customers", href: "/admin/customers", icon: UserIcon },
        { label: "Agent Network", href: "/admin/agents", icon: UserGroupIcon },
      ],
    },
    {
      title: "INVENTORY & EXPERIENCES",
      items: [
        { label: "Destinations", href: "/admin/destinations", icon: MapPinIcon },
        { label: "Holiday Packages", href: "/admin/packages", icon: GiftIcon },
        { label: "Hotels & Stays", href: "/admin/properties", icon: BuildingOfficeIcon },
        { label: "Tours & Sightseeing", href: "/admin/tours", icon: GlobeAltIcon },
        { label: "Suppliers & Fleets", href: "/supplier", icon: TruckIcon },
        { label: "Visa Applications", href: "/admin/visa-requests", icon: ShieldCheckIcon },
      ],
    },
    {
      title: "COMMERCIALS & GOVERNANCE",
      items: [
        { label: "Payments & Invoices", href: "/admin/payments", icon: CurrencyRupeeIcon },
        { label: "Refunds & Disputes", href: "/admin/refunds", icon: ArrowsRightLeftIcon },
        { label: "Promo Coupons", href: "/admin/coupons", icon: TagIcon },
        { label: "Reports & Analytics", href: "/admin/reports", icon: AcademicCapIcon },
        { label: "RBAC 9-Tier Roles", href: "/admin/roles", icon: UserGroupIcon, badge: "RBAC" },
        { label: "Platform Settings", href: "/admin/settings", icon: Cog6ToothIcon },
      ],
    },
  ];

  // 2. OFFICE_ADMIN Sections
  const officeAdminSections: NavSection[] = [
    {
      title: "BRANCH OPERATIONS",
      items: [
        { label: "Branch Dashboard", href: "/admin/dashboard", icon: HomeIcon },
        { label: "Branch Bookings", href: "/admin/bookings", icon: TicketIcon },
        { label: "Regional CRM Leads", href: "/admin/leads", icon: InboxIcon },
        { label: "Branch Agents", href: "/admin/agents", icon: UserGroupIcon },
      ],
    },
    {
      title: "SUPPLIER & LOCAL FLEETS",
      items: [
        { label: "Local Homestays & Stays", href: "/supplier", icon: BuildingOfficeIcon },
        { label: "Branch Support Inbox", href: "/admin/support", icon: InboxIcon },
      ],
    },
  ];

  // 3. AGENT (Travel Agent Specialist)
  const agentSections: NavSection[] = [
    {
      title: "AGENT DESK",
      items: [
        { label: "Operations Dashboard", href: "/agent/dashboard", icon: HomeIcon },
        { label: "My Leads & CRM", href: "/agent/leads", icon: InboxIcon, badge: "CRM" },
        { label: "Itinerary Designer", href: "/agent/itineraries", icon: GiftIcon },
        { label: "Quotation Generator", href: "/agent/quotes", icon: CurrencyRupeeIcon },
        { label: "Confirmed Bookings", href: "/agent/bookings", icon: TicketIcon },
        { label: "Client Directory", href: "/agent/customers", icon: UserGroupIcon },
      ],
    },
    {
      title: "B2B COMMISSIONS & PROTECTION",
      items: [
        { label: "Travel B2B Desk", href: "/agent?tab=travel-desk", icon: TicketIcon },
        { label: "Travel Protection Shield", href: "/agent?tab=insurance-desk", icon: ShieldCheckIcon, badge: "15% Payout" },
        { label: "Commission Wallet", href: "/agent?tab=wallet", icon: CurrencyRupeeIcon },
        { label: "Priority Support Desk", href: "/agent/support", icon: Cog6ToothIcon },
      ],
    },
  ];

  // 4. CALLING_STAFF (Calling Staff / Telecaller CRM)
  const telecallerSections: NavSection[] = [
    {
      title: "TELECALLING CRM",
      items: [
        { label: "Calling Queue Desk", href: "/admin/leads", icon: PhoneIcon, badge: "Dialer" },
        { label: "Fresh Inquiries", href: "/agent/leads", icon: InboxIcon },
        { label: "Daily Callback Tasks", href: "/agent/tasks", icon: ClipboardDocumentCheckIcon },
        { label: "AI Itinerary Co-Pilot", href: "/travel-agent", icon: SparklesIcon },
        { label: "Customer Profiles", href: "/admin/customers", icon: UserIcon },
      ],
    },
  ];

  // 5. HOTEL_SUPPLIER (Hotel & Homestay Partner)
  const hotelSupplierSections: NavSection[] = [
    {
      title: "HOTEL & HOMESTAY DESK",
      items: [
        { label: "Inventory Dashboard", href: "/supplier", icon: BuildingOfficeIcon },
        { label: "Property Listings & PINs", href: "/supplier?tab=add-listing", icon: MapPinIcon },
        { label: "Live Guest Check-ins", href: "/supplier?tab=bookings", icon: TicketIcon },
        { label: "Tariff & Blockout Dates", href: "/supplier?tab=calendar", icon: TagIcon },
        { label: "Direct Bank Payouts", href: "/supplier?tab=payouts", icon: CurrencyRupeeIcon },
      ],
    },
  ];

  // 6. BUS_OPERATOR (Bus Operator Partner)
  const busOperatorSections: NavSection[] = [
    {
      title: "INTERCITY BUS DESK",
      items: [
        { label: "Bus Fleet Dashboard", href: "/supplier", icon: TruckIcon },
        { label: "Intercity Bus Routes & PINs", href: "/supplier?tab=add-listing", icon: MapPinIcon },
        { label: "Live Seat Reservations", href: "/buses", icon: TicketIcon },
        { label: "Schedule & Timetable", href: "/supplier?tab=calendar", icon: TagIcon },
        { label: "Settlement Statements", href: "/supplier?tab=payouts", icon: CurrencyRupeeIcon },
      ],
    },
  ];

  // 7. CAB_BIKE_OPERATOR (Cab / Bike Fleet Partner)
  const cabOperatorSections: NavSection[] = [
    {
      title: "CAB & BIKE FLEET DESK",
      items: [
        { label: "Fleet Fleet Dashboard", href: "/supplier", icon: TruckIcon },
        { label: "Register Cab / Bike Fleet", href: "/supplier?tab=add-listing", icon: MapPinIcon },
        { label: "Outstation Dispatches", href: "/cabs", icon: TicketIcon },
        { label: "Driver Hill Certification", href: "/supplier", icon: ShieldCheckIcon },
        { label: "Daily Trip Payouts", href: "/supplier?tab=payouts", icon: CurrencyRupeeIcon },
      ],
    },
  ];

  // 8. TRAVEL_SHOP_VENDOR (Traveling Shops Vendor)
  const travelShopSections: NavSection[] = [
    {
      title: "TRAVEL STORE VENDOR",
      items: [
        { label: "Store Orders Desk", href: "/admin/orders", icon: ShoppingBagIcon },
        { label: "Travel Gear & Luggage", href: "/holiday-packages", icon: TagIcon },
        { label: "Customer Dispatches", href: "/admin/bookings", icon: TicketIcon },
        { label: "Vendor Payouts", href: "/admin/payments", icon: CurrencyRupeeIcon },
      ],
    },
  ];

  // 9. CUSTOMER (Customer Portal User)
  const customerSections: NavSection[] = [
    {
      title: "MY TRAVEL LOUNGE",
      items: [
        { label: "Traveler Dashboard", href: "/customer", icon: HomeIcon },
        { label: "My Active Trips & Vouchers", href: "/my-trips", icon: TicketIcon },
        { label: "Saved Itineraries", href: "/saved-trips", icon: GiftIcon },
        { label: "AI Travel Concierge", href: "/travel-agent", icon: GlobeAltIcon, badge: "AI" },
        { label: "Explore Destinations", href: "/destinations", icon: MapPinIcon },
        { label: "Profile & Identity Proofs", href: "/profile", icon: UserIcon },
        { label: "Help & Support Desk", href: "/support", icon: Cog6ToothIcon },
      ],
    },
  ];

  const sections =
    userRole === "SUPER_ADMIN"
      ? adminSections
      : userRole === "OFFICE_ADMIN"
      ? officeAdminSections
      : userRole === "AGENT"
      ? agentSections
      : userRole === "CALLING_STAFF"
      ? telecallerSections
      : userRole === "HOTEL_SUPPLIER"
      ? hotelSupplierSections
      : userRole === "BUS_OPERATOR"
      ? busOperatorSections
      : userRole === "CAB_BIKE_OPERATOR"
      ? cabOperatorSections
      : userRole === "TRAVEL_SHOP_VENDOR"
      ? travelShopSections
      : customerSections;

  const isItemActive = (href: string) => {
    if (href === "/admin" || href === "/admin/dashboard" || href === "/agent/dashboard" || href === "/customer" || href === "/supplier") {
      return currentPath === href;
    }
    return currentPath.startsWith(href);
  };

  const getRoleDisplayName = (r: string) => {
    switch (r) {
      case "SUPER_ADMIN": return "Super Administrator";
      case "OFFICE_ADMIN": return "Office Operations Admin";
      case "AGENT": return "Travel Agent Specialist";
      case "CALLING_STAFF": return "Calling Staff CRM";
      case "HOTEL_SUPPLIER": return "Hotel & Homestay";
      case "BUS_OPERATOR": return "Bus Operator Fleet";
      case "CAB_BIKE_OPERATOR": return "Cab & Bike Partner";
      case "TRAVEL_SHOP_VENDOR": return "Traveling Shop";
      case "CUSTOMER": return "Customer Portal User";
      default: return r;
    }
  };

  return (
    <aside className="w-64 bg-[#173D32] text-[#FAF8F4] flex flex-col shrink-0 h-screen sticky top-0 border-r border-[#123128] z-30 select-none shadow-xl">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-[#287C70]/30 bg-[#123128]/70">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-[#B7955B]/60 shadow-sm group-hover:scale-105 transition-transform bg-black shrink-0">
            <img src="/logo.jpg" alt="Lord of the Roads" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm tracking-wide text-white leading-tight">
              lord of the road
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#B7955B] font-semibold">
              Travel Super Platform
            </span>
          </div>
        </Link>
      </div>

      {/* Role Pill Card */}
      <div className="mx-4 mt-3 p-3 rounded-2xl bg-[#123128] border border-[#287C70]/40 flex items-center justify-between">
        <div className="truncate">
          <span className="text-[9px] font-bold tracking-widest uppercase text-[#B7955B] block truncate">
            {getRoleDisplayName(userRole)}
          </span>
          <p className="text-xs font-semibold text-white truncate">{userName}</p>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-grow px-3 py-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#287C70]/40">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.title && (
              <h3 className="px-3 text-[10px] font-bold tracking-widest uppercase text-[#EDE5D8]/50 mb-2">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isItemActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                        active
                          ? "bg-gradient-to-r from-[#287C70] to-[#1f6258] text-white shadow-xs font-semibold"
                          : "text-[#EDE5D8]/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            active
                              ? "text-[#B7955B]"
                              : "text-[#EDE5D8]/60 group-hover:text-[#B7955B]"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            active
                              ? "bg-white text-[#173D32]"
                              : "bg-[#B7955B] text-[#173D32]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-[#287C70]/30 bg-[#123128]/70 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-[#EDE5D8]/70 hover:text-white hover:bg-white/5 transition"
        >
          <GlobeAltIcon className="w-4 h-4 text-[#B7955B]" />
          <span>View Public Platform</span>
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 transition"
        >
          <div className="flex items-center gap-2">
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            <span>Sign Out</span>
          </div>
          <span className="text-[10px] text-white/30">End Session</span>
        </button>
      </div>
    </aside>
  );
}
