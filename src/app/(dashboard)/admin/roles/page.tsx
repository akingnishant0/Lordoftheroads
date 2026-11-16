"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheckIcon,
  UserGroupIcon,
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface RoleDefinition {
  id: string;
  code: string;
  title: string;
  category: "Leadership" | "Operations" | "Supply Partner" | "Consumer";
  demoEmail: string;
  demoPass: string;
  userCount: number;
  description: string;
  permissions: {
    globalFinance: boolean;
    directBooking: boolean;
    telecallingCRM: boolean;
    hotelInventory: boolean;
    busSchedules: boolean;
    cabBikeDispatch: boolean;
    shopMerchandise: boolean;
    aiConcierge: boolean;
  };
}

export default function AdminRolesPage() {
  const [selectedRoleCode, setSelectedRoleCode] = useState<string>("ALL");

  const roles: RoleDefinition[] = [
    {
      id: "role-1",
      code: "SUPER_ADMIN",
      title: "Super Administrator",
      category: "Leadership",
      demoEmail: "admin@lordoftheroad.in",
      demoPass: "Admin@123",
      userCount: 3,
      description: "Full root governance over all platform modules, financial disbursements, API keys, and staff roles.",
      permissions: {
        globalFinance: true,
        directBooking: true,
        telecallingCRM: true,
        hotelInventory: true,
        busSchedules: true,
        cabBikeDispatch: true,
        shopMerchandise: true,
        aiConcierge: true,
      },
    },
    {
      id: "role-2",
      code: "OFFICE_ADMIN",
      title: "Office Operations Admin",
      category: "Operations",
      demoEmail: "office@lordoftheroad.in",
      demoPass: "Office@123",
      userCount: 8,
      description: "Branch operations manager overseeing regional bookings, customer escalations, and local agent verification.",
      permissions: {
        globalFinance: false,
        directBooking: true,
        telecallingCRM: true,
        hotelInventory: true,
        busSchedules: true,
        cabBikeDispatch: true,
        shopMerchandise: true,
        aiConcierge: true,
      },
    },
    {
      id: "role-3",
      code: "AGENT",
      title: "Travel Agent Specialist",
      category: "Operations",
      demoEmail: "agent@lordoftheroad.in",
      demoPass: "Agent@123",
      userCount: 42,
      description: "B2B travel partner issuing custom quotations, managing client CRM leads, and earning commission payouts.",
      permissions: {
        globalFinance: false,
        directBooking: true,
        telecallingCRM: true,
        hotelInventory: false,
        busSchedules: false,
        cabBikeDispatch: false,
        shopMerchandise: false,
        aiConcierge: true,
      },
    },
    {
      id: "role-4",
      code: "CALLING_STAFF",
      title: "Calling Staff (Telecaller CRM)",
      category: "Operations",
      demoEmail: "caller@lordoftheroad.in",
      demoPass: "Caller@123",
      userCount: 16,
      description: "Telecalling dialer desk for lead qualification, requirement collection, and WhatsApp specialist handoff.",
      permissions: {
        globalFinance: false,
        directBooking: false,
        telecallingCRM: true,
        hotelInventory: false,
        busSchedules: false,
        cabBikeDispatch: false,
        shopMerchandise: false,
        aiConcierge: true,
      },
    },
    {
      id: "role-5",
      code: "HOTEL_SUPPLIER",
      title: "Hotel & Homestay Partner",
      category: "Supply Partner",
      demoEmail: "hotel@lordoftheroad.in",
      demoPass: "Hotel@123",
      userCount: 68,
      description: "Property owner managing room inventory, nightly tariffs, seasonal blockout calendar, and guest check-ins.",
      permissions: {
        globalFinance: false,
        directBooking: false,
        telecallingCRM: false,
        hotelInventory: true,
        busSchedules: false,
        cabBikeDispatch: false,
        shopMerchandise: false,
        aiConcierge: false,
      },
    },
    {
      id: "role-6",
      code: "BUS_OPERATOR",
      title: "Bus Operator Partner",
      category: "Supply Partner",
      demoEmail: "bus@lordoftheroad.in",
      demoPass: "Bus@123",
      userCount: 24,
      description: "Fleet operator managing Volvo/AC sleeper coaches, origin/destination PIN codes, and seat reservations.",
      permissions: {
        globalFinance: false,
        directBooking: false,
        telecallingCRM: false,
        hotelInventory: false,
        busSchedules: true,
        cabBikeDispatch: false,
        shopMerchandise: false,
        aiConcierge: false,
      },
    },
    {
      id: "role-7",
      code: "CAB_BIKE_OPERATOR",
      title: "Cab / Bike Fleet Partner",
      category: "Supply Partner",
      demoEmail: "cab@lordoftheroad.in",
      demoPass: "Cab@123",
      userCount: 51,
      description: "Outstation chauffeur fleet and bike rental vendor managing per-km tariffs, hill certification, and dispatch.",
      permissions: {
        globalFinance: false,
        directBooking: false,
        telecallingCRM: false,
        hotelInventory: false,
        busSchedules: false,
        cabBikeDispatch: true,
        shopMerchandise: false,
        aiConcierge: false,
      },
    },
    {
      id: "role-8",
      code: "TRAVEL_SHOP_VENDOR",
      title: "Traveling Shops Vendor",
      category: "Supply Partner",
      demoEmail: "shop@lordoftheroad.in",
      demoPass: "Shop@123",
      userCount: 12,
      description: "Retail vendor fulfilling travel essentials, luggage, camping kits, and road trip accessories.",
      permissions: {
        globalFinance: false,
        directBooking: false,
        telecallingCRM: false,
        hotelInventory: false,
        busSchedules: false,
        cabBikeDispatch: false,
        shopMerchandise: true,
        aiConcierge: false,
      },
    },
    {
      id: "role-9",
      code: "CUSTOMER",
      title: "Customer Portal User",
      category: "Consumer",
      demoEmail: "customer@lordoftheroad.in",
      demoPass: "Customer@123",
      userCount: 3840,
      description: "End consumer exploring curated holiday packages, booking stays, downloading vouchers, and using AI Concierge.",
      permissions: {
        globalFinance: false,
        directBooking: true,
        telecallingCRM: false,
        hotelInventory: false,
        busSchedules: false,
        cabBikeDispatch: false,
        shopMerchandise: false,
        aiConcierge: true,
      },
    },
  ];

  const filteredRoles =
    selectedRoleCode === "ALL"
      ? roles
      : roles.filter((r) => r.code === selectedRoleCode || r.category === selectedRoleCode);

  return (
    <div className="space-y-8 max-w-7xl mx-auto select-none text-[#242A28]">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#173D32] text-[#FAF8F4] p-8 border border-[#287C70]/40 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#B7955B] bg-[#123128] px-2.5 py-0.5 rounded-full border border-[#B7955B]/30">
                GOVERNANCE & PERMISSIONS
              </span>
              <span className="text-xs text-emerald-300 font-medium">● 9 Strict Role Tiers Active</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Role-Based Access Control (RBAC)
            </h1>
            <p className="text-xs sm:text-sm text-[#EDE5D8] font-light leading-relaxed">
              Fine-grained access enforcement across platform leadership, branch operations, B2B travel agents, telecalling staff, hotel suppliers, bus operators, cab fleets, traveling shops, and customers.
            </p>
          </div>

          <div className="p-4 bg-[#123128] border border-[#287C70]/50 rounded-2xl flex flex-col justify-between shrink-0 min-w-[200px]">
            <span className="text-[10px] uppercase font-bold text-[#EDE5D8]/70">Total Active Roles</span>
            <div className="font-serif text-3xl font-bold text-[#B7955B]">9 Tiers</div>
            <span className="text-[11px] text-emerald-400 font-medium">Zero Privilege Leakage ✓</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E7E6E0] pb-3 text-xs font-semibold">
        {[
          { id: "ALL", label: "All 9 Roles" },
          { id: "Leadership", label: "Leadership" },
          { id: "Operations", label: "Operations & Sales" },
          { id: "Supply Partner", label: "Supply & Fleet Partners" },
          { id: "Consumer", label: "Consumer" },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setSelectedRoleCode(f.id)}
            className={`px-4 py-2 rounded-xl transition ${
              selectedRoleCode === f.id
                ? "bg-[#173D32] text-[#FAF8F4] font-bold shadow-xs"
                : "bg-white text-[#737B76] hover:text-[#242A28] border border-[#E7E6E0]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Roles Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRoles.map((r) => (
          <div
            key={r.id}
            className="p-6 bg-white border border-[#E7E6E0] rounded-3xl shadow-xs hover:border-[#287C70] transition flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF8F4] border border-[#E7E6E0] text-[#173D32]">
                  {r.category}
                </span>
                <span className="text-xs font-mono font-bold text-[#B7955B]">{r.code}</span>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#173D32]">{r.title}</h3>
              <p className="text-xs text-[#737B76] mt-1 leading-relaxed">{r.description}</p>

              {/* Demo Credentials Box */}
              <div className="mt-4 p-3.5 bg-[#FAF8F4] border border-[#E7E6E0] rounded-2xl text-xs space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#737B76]">Demo Login:</span>
                  <span className="font-mono font-bold text-[#173D32]">{r.demoEmail}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#737B76]">Password:</span>
                  <span className="font-mono text-[#287C70] font-bold">{r.demoPass}</span>
                </div>
              </div>

              {/* Permission Checkmarks Mini-list */}
              <div className="mt-4 pt-3 border-t border-[#E7E6E0] space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#737B76]">Global Finance & Settlements</span>
                  {r.permissions.globalFinance ? (
                    <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircleIcon className="w-4 h-4 text-gray-300" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737B76]">Booking & PNR Issuance</span>
                  {r.permissions.directBooking ? (
                    <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircleIcon className="w-4 h-4 text-gray-300" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737B76]">Telecaller & CRM Dialer</span>
                  {r.permissions.telecallingCRM ? (
                    <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircleIcon className="w-4 h-4 text-gray-300" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737B76]">Inventory & Fleet Control</span>
                  {r.permissions.hotelInventory || r.permissions.busSchedules || r.permissions.cabBikeDispatch ? (
                    <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircleIcon className="w-4 h-4 text-gray-300" />
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E7E6E0] flex items-center justify-between text-xs">
              <span className="text-[#737B76]">{r.userCount} active users</span>
              <Link
                href="/login"
                className="text-[#287C70] font-bold hover:underline flex items-center gap-1"
              >
                <span>Login as {r.title.split(" ")[0]}</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Comprehensive Permission Matrix Table */}
      <div className="bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#173D32]">
            Detailed 9-Role Permission Matrix
          </h3>
          <p className="text-xs text-[#737B76]">
            Server-side authorization enforced on every API route and dashboard layout.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F4] text-[#737B76] uppercase text-[10px] tracking-wider border-b border-[#E7E6E0]">
              <tr>
                <th className="py-3 px-3">Role Tier</th>
                <th className="py-3 px-2 text-center">Finance</th>
                <th className="py-3 px-2 text-center">Bookings</th>
                <th className="py-3 px-2 text-center">Dialer CRM</th>
                <th className="py-3 px-2 text-center">Hotel Supply</th>
                <th className="py-3 px-2 text-center">Bus Routes</th>
                <th className="py-3 px-2 text-center">Cab/Bike Fleet</th>
                <th className="py-3 px-2 text-center">Travel Shop</th>
                <th className="py-3 px-2 text-center">AI Concierge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E6E0]/70">
              {roles.map((r) => (
                <tr key={r.code} className="hover:bg-[#FAF8F4]/80 transition">
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#173D32]">{r.title}</span>
                    <span className="block font-mono text-[10px] text-[#B7955B]">{r.code}</span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    {r.permissions.globalFinance ? "✅" : "—"}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {r.permissions.directBooking ? "✅" : "—"}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {r.permissions.telecallingCRM ? "✅" : "—"}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {r.permissions.hotelInventory ? "✅" : "—"}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {r.permissions.busSchedules ? "✅" : "—"}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {r.permissions.cabBikeDispatch ? "✅" : "—"}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {r.permissions.shopMerchandise ? "✅" : "—"}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {r.permissions.aiConcierge ? "✅" : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
