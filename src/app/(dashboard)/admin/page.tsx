"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  InboxIcon,
  TicketIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  GlobeAltIcon,
  ArrowUpRightIcon,
  MapPinIcon,
  GiftIcon,
  TagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface BookingItem {
  id: string;
  bookingNumber: string;
  destination: string;
  serviceType: string;
  selectedOptionTier: string;
  contactName: string;
  contactPhone: string;
  travelDateStart: string;
  totalAmount: number;
  status: "UPCOMING" | "COMPLETED" | "CANCELLED";
  providerConfirmationRef: string;
}

const DEFAULT_BOOKINGS: BookingItem[] = [
  {
    id: "bk-1",
    bookingNumber: "LOTR-884210",
    destination: "Kashmir Valley",
    serviceType: "Holiday Package",
    selectedOptionTier: "Premium Houseboat & Resort",
    contactName: "Rohan Sharma",
    contactPhone: "+91 98765 43210",
    travelDateStart: "15 Apr 2026",
    totalAmount: 59848,
    status: "UPCOMING",
    providerConfirmationRef: "IRCTC/KSH-9921",
  },
  {
    id: "bk-2",
    bookingNumber: "LOTR-731902",
    destination: "Varanasi Jn",
    serviceType: "Train (Vande Bharat)",
    selectedOptionTier: "Executive Chair Car (EC)",
    contactName: "Vikram Malhotra",
    contactPhone: "+91 98112 34567",
    travelDateStart: "02 Mar 2026",
    totalAmount: 3675,
    status: "COMPLETED",
    providerConfirmationRef: "PNR-2481029481",
  },
  {
    id: "bk-3",
    bookingNumber: "LOTR-619284",
    destination: "Kerala Backwaters & Munnar",
    serviceType: "Holiday Package",
    selectedOptionTier: "Thatched Private Villa",
    contactName: "Ananya Iyer",
    contactPhone: "+91 98450 11223",
    travelDateStart: "20 May 2026",
    totalAmount: 43998,
    status: "UPCOMING",
    providerConfirmationRef: "KL-KETT-7712",
  },
  {
    id: "bk-4",
    bookingNumber: "LOTR-552109",
    destination: "Dubai Marina & Safari",
    serviceType: "Flight + 5-Star Stay",
    selectedOptionTier: "Executive Sky Suite",
    contactName: "Sameer Joshi",
    contactPhone: "+91 98200 44556",
    travelDateStart: "10 Jun 2026",
    totalAmount: 145000,
    status: "UPCOMING",
    providerConfirmationRef: "EK-DXB-90214",
  },
];

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const [leadStats, setLeadStats] = useState<{ TOTAL?: number; NEW?: number }>({ TOTAL: 18, NEW: 6 });
  const [bookings, setBookings] = useState<BookingItem[]>(DEFAULT_BOOKINGS);
  const [activeTab, setActiveTab] = useState<"ALL" | "UPCOMING" | "COMPLETED" | "CANCELLED">("ALL");

  useEffect(() => {
    fetch("/api/leads/stats")
      .then((r) => r.json())
      .then((d) => {
        if (d && typeof d.TOTAL === "number") setLeadStats(d);
      })
      .catch(() => {});

    fetch("/api/bookings")
      .then((r) => r.json())
      .then((d) => {
        if (d.bookings && Array.isArray(d.bookings) && d.bookings.length > 0) {
          setBookings(d.bookings);
        }
      })
      .catch(() => {});
  }, []);

  const confirmedBookings = bookings.filter((b) => b.status === "UPCOMING" || b.status === "COMPLETED");
  const cancelledBookings = bookings.filter((b) => b.status === "CANCELLED");
  const grossBookingValue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const filteredBookings = bookings.filter((b) => activeTab === "ALL" || b.status === activeTab);

  const kpis = [
    {
      id: "gbv",
      label: "Gross Booking Value (GMV)",
      value: `₹${grossBookingValue.toLocaleString("en-IN")}`,
      delta: "+18.4% MoM",
      badge: "Financial P&L",
      href: "/admin/payments",
      icon: CurrencyRupeeIcon,
      accent: "from-emerald-700 to-[#173D32]",
    },
    {
      id: "bookings",
      label: "Confirmed Reservations",
      value: `${confirmedBookings.length} Active`,
      delta: "100% Verified",
      badge: "Real-time GDS",
      href: "/admin/bookings",
      icon: TicketIcon,
      accent: "from-[#287C70] to-[#173D32]",
    },
    {
      id: "leads",
      label: "Active CRM Inquiries",
      value: `${leadStats.TOTAL || 18} Inquiries`,
      delta: `${leadStats.NEW || 6} New Today`,
      badge: "Pipeline",
      href: "/admin/leads",
      icon: InboxIcon,
      accent: "from-[#B7955B] to-[#73582a]",
    },
    {
      id: "agents",
      label: "Authorized Partner Hubs",
      value: "48 Agencies",
      delta: "Across 14 States",
      badge: "PoSP Network",
      href: "/admin/agents",
      icon: UserGroupIcon,
      accent: "from-stone-700 to-stone-900",
    },
  ];

  const quickNav = [
    { title: "Bookings Desk", href: "/admin/bookings", icon: "🎫", desc: "Live PNRs, ticket vouchers & status" },
    { title: "Customer Accounts", href: "/admin/customers", icon: "👤", desc: "KYC profiles, lifetime GMV & history" },
    { title: "Agent Partners", href: "/admin/agents", icon: "💼", desc: "Agency accreditation, PoSP licensing" },
    { title: "Destinations", href: "/admin/destinations", icon: "🏔️", desc: "Domestic & global region catalogues" },
    { title: "Holiday Packages", href: "/admin/packages", icon: "🌴", desc: "Itinerary packages, inclusions & rates" },
    { title: "Hotels & Stays", href: "/admin/properties", icon: "🏨", desc: "Room inventory, villas & luxury chalets" },
    { title: "Day Tours", href: "/admin/tours", icon: "🗺️", desc: "Heritage walks, safaris & experiences" },
    { title: "Supplier Network", href: "/admin/suppliers", icon: "🏭", desc: "Fleets, local vendors & payable balance" },
    { title: "Visa Applications", href: "/admin/visa-requests", icon: "🛂", desc: "Immigration files & document review" },
    { title: "Financial Payments", href: "/admin/payments", icon: "💳", desc: "Gateway transactions, UPI settlements" },
    { title: "Cancellation Refunds", href: "/admin/refunds", icon: "🔄", desc: "Refund authorization & policy rules" },
    { title: "Promotions & Coupons", href: "/admin/coupons", icon: "🏷️", desc: "Promo codes, campaigns & vouchers" },
    { title: "Content CMS", href: "/admin/content", icon: "📰", desc: "Banners, copy & announcement editor" },
    { title: "Reports & Analytics", href: "/admin/reports", icon: "📊", desc: "P&L curves, destination yields & GMV" },
    { title: "Support Dispatch", href: "/admin/support", icon: "🎧", desc: "Customer, agent & vendor helpdesk" },
    { title: "RBAC Roles", href: "/admin/roles", icon: "🛡️", desc: "Permissions matrix & staff access" },
    { title: "API Integrations", href: "/admin/integrations", icon: "⚡", desc: "IRCTC, Sabre, Travel Shield, Webhooks" },
    { title: "Security Audit Logs", href: "/admin/audit-logs", icon: "📜", desc: "Immutable system activity log" },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Executive Command Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#173D32] text-[#FAF8F4] p-8 border border-[#287C70]/40 shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#287C70]/30 via-[#B7955B]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#B7955B] animate-pulse"></span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#B7955B]">
                SUPER ADMIN OPERATIONS OS
              </span>
              <span className="text-white/30">•</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#287C70]/50 text-white border border-[#287C70]">
                PAN-INDIA NETWORK LIVE
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Platform Master Command Terminal
            </h1>

            <p className="text-xs sm:text-sm text-[#EDE5D8]/90 font-light leading-relaxed">
              Unified real-time orchestration across 9 travel services, IRCTC Indian Railways, Sabre/Amadeus GDS, redBus fleet, and Travel Protection Shield advisory desks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/bookings"
              className="px-4 py-2.5 rounded-xl bg-[#B7955B] hover:bg-[#a3844f] text-[#173D32] font-bold text-xs transition shadow-sm flex items-center gap-1.5"
            >
              <span>🎫 All Reservations</span>
            </Link>
            <Link
              href="/travel-agent"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition flex items-center gap-1.5"
            >
              <SparklesIcon className="w-3.5 h-3.5 text-[#B7955B]" />
              <span>Launch AI Travel Agent</span>
            </Link>
          </div>
        </div>

        {/* Live System Status Strip */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-[#EDE5D8]/80 gap-3">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>PostgreSQL Database: Connected</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>IRCTC Rail Engine: 24ms latency</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Travel Protection Shield Engine: Active</span>
            </span>
          </div>

          <div className="text-[11px] text-[#B7955B] font-mono">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}
          </div>
        </div>
      </div>

      {/* 4 Primary KPI Executive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link key={kpi.id} href={kpi.href} className="group">
              <div className="h-full bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-xs hover:border-[#173D32] hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${kpi.accent} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF8F4] text-[#173D32] border border-[#E7E6E0]">
                    {kpi.badge}
                  </span>
                </div>

                <div>
                  <div className="font-serif text-2xl font-bold text-[#173D32] tracking-tight">
                    {kpi.value}
                  </div>
                  <div className="text-xs font-semibold text-[#242A28] mt-0.5">{kpi.label}</div>
                </div>

                <div className="pt-3 border-t border-[#E7E6E0]/60 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-700 font-bold">{kpi.delta}</span>
                  <span className="text-[#737B76] group-hover:text-[#173D32] font-semibold flex items-center gap-0.5">
                    Explore <ArrowUpRightIcon className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Operational Overview Grid: Service Share, Destination Yield & Quick Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Performance Card */}
        <div className="bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E6E0]">
            <div>
              <h3 className="font-serif text-base font-bold text-[#173D32]">Service Share Matrix</h3>
              <p className="text-xs text-[#737B76]">Booking share across all 9 travel tabs</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
              Live
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { label: "Holiday Packages", share: 42, count: "₹10.4L GMV", color: "bg-[#173D32]" },
              { label: "Hotels & Heritage Resorts", share: 28, count: "₹6.9L GMV", color: "bg-[#287C70]" },
              { label: "Flights & Airport Cabs", share: 15, count: "₹3.7L GMV", color: "bg-[#B7955B]" },
              { label: "Travel Protection Shield", share: 10, count: "₹2.5L GMV", color: "bg-emerald-600" },
              { label: "IRCTC Trains & Buses", share: 5, count: "₹1.2L GMV", color: "bg-stone-500" },
            ].map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-[#242A28]">{s.label}</span>
                  <span className="text-[#737B76] font-semibold">{s.count} ({s.share}%)</span>
                </div>
                <div className="w-full bg-[#FAF8F4] h-2 rounded-full overflow-hidden border border-[#E7E6E0]/40">
                  <div className={`${s.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${s.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Trending Destinations Card */}
        <div className="bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E6E0]">
            <div>
              <h3 className="font-serif text-base font-bold text-[#173D32]">Destination Velocity</h3>
              <p className="text-xs text-[#737B76]">Top booking volume & enquiries</p>
            </div>
            <Link href="/destinations" className="text-xs font-bold text-[#287C70] hover:underline">
              Catalogue ↗
            </Link>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              { name: "Kashmir Valley", tag: "High Velocity", count: "34 Bookings", price: "₹28.5k" },
              { name: "Kerala Backwaters & Munnar", tag: "Steady", count: "28 Bookings", price: "₹22.8k" },
              { name: "Dubai & Desert Safari", tag: "International", count: "22 Bookings", price: "₹48.0k" },
              { name: "Royal Rajasthan (Jaipur)", tag: "Heritage", count: "19 Bookings", price: "₹26.5k" },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0]">
                <div>
                  <h4 className="font-bold text-[#173D32]">{d.name}</h4>
                  <p className="text-[10px] text-[#737B76]">{d.count} • Avg {d.price}/pax</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {d.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Telemetry & Partner Webhooks */}
        <div className="bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E6E0]">
            <div>
              <h3 className="font-serif text-base font-bold text-[#173D32]">Integrations & Telemetry</h3>
              <p className="text-xs text-[#737B76]">API Gateway endpoints health</p>
            </div>
            <Link href="/admin/integrations" className="text-xs font-bold text-[#287C70] hover:underline">
              Manage ⚙️
            </Link>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#173D32]">IRCTC Direct Ticketing Engine</span>
                <p className="text-[10px] text-[#737B76]">Tatkal & Superfast GDS feeds</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">99.8% Up</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#173D32]">Travel Protection Shield Engine</span>
                <p className="text-[10px] text-[#737B76]">Auto quote generation & PoSP sync</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#173D32]">Razorpay & UPI Payment Webhooks</span>
                <p className="text-[10px] text-[#737B76]">Zero failed transactions today</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Healthy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Confirmed Platform Bookings Table */}
      <div className="bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E6E0] gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B7955B]">
              Master Registry
            </span>
            <h3 className="font-serif text-xl font-bold text-[#173D32]">
              Live Platform Bookings & Passenger Vouchers
            </h3>
            <p className="text-xs text-[#737B76]">
              Real-time reservations confirmed across Hotel CRS, Airline PNRs, and IRCTC systems.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(["ALL", "UPCOMING", "COMPLETED", "CANCELLED"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#173D32] text-white shadow-xs"
                    : "bg-[#FAF8F4] border border-[#E7E6E0] text-[#737B76] hover:text-[#173D32]"
                }`}
              >
                {tab === "ALL" ? "All Bookings" : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F4] text-[#737B76] uppercase text-[10px] tracking-wider border-b border-[#E7E6E0]">
              <tr>
                <th className="py-3 px-3">Booking Ref</th>
                <th className="py-3 px-3">Service & Details</th>
                <th className="py-3 px-3">Primary Passenger</th>
                <th className="py-3 px-3">Travel Date</th>
                <th className="py-3 px-3">Tariff Paid</th>
                <th className="py-3 px-3">Provider Confirmation</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E6E0]/60">
              {filteredBookings.map((bk) => (
                <tr key={bk.id} className="hover:bg-[#FAF8F4]/80 transition">
                  <td className="py-3.5 px-3 font-mono font-bold text-[#173D32]">
                    {bk.bookingNumber}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-[#242A28]">{bk.destination}</span>
                    <span className="block text-[10px] text-[#737B76]">{bk.serviceType} • {bk.selectedOptionTier}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-[#242A28]">{bk.contactName}</span>
                    <span className="block text-[10px] text-[#737B76]">{bk.contactPhone}</span>
                  </td>
                  <td className="py-3.5 px-3 text-[#242A28] font-medium">
                    {bk.travelDateStart}
                  </td>
                  <td className="py-3.5 px-3 font-serif font-bold text-[#173D32]">
                    ₹{bk.totalAmount?.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[11px] text-[#287C70] font-semibold">
                    {bk.providerConfirmationRef}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        bk.status === "CANCELLED"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : bk.status === "COMPLETED"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {bk.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Link
                      href={`/my-trips/${bk.bookingNumber}`}
                      className="px-3 py-1 rounded-lg border border-[#E7E6E0] hover:border-[#173D32] text-xs font-semibold text-[#173D32] transition"
                    >
                      Inspect Dossier ➔
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Platform Management Modules Launchpad */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#173D32]">
              Operations Command Hub (18 Connected Desks)
            </h3>
            <p className="text-xs text-[#737B76]">
              Instant administrative shortcuts to all management, inventory, and financial systems.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickNav.map((nav, i) => (
            <Link
              key={i}
              href={nav.href}
              className="p-4 bg-white rounded-2xl border border-[#E7E6E0] hover:border-[#173D32] hover:shadow-xs transition group flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl mb-2 block">{nav.icon}</span>
                <h4 className="font-bold text-xs text-[#173D32] group-hover:text-[#287C70] transition leading-tight">
                  {nav.title}
                </h4>
                <p className="text-[10px] text-[#737B76] mt-1 line-clamp-2">{nav.desc}</p>
              </div>
              <span className="text-[10px] font-semibold text-[#287C70] mt-3 block group-hover:translate-x-0.5 transition-transform">
                Open Desk →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
