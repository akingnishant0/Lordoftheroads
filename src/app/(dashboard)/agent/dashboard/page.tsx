"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  CurrencyRupeeIcon,
  TicketIcon,
  InboxIcon,
  UserGroupIcon,
  SparklesIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  ArrowUpRightIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default function AgentOperationsDashboardPage() {
  const { data: session } = useSession();
  const agentName = session?.user?.name || "Travel Partner";
  const [walletBalance, setWalletBalance] = useState(28450);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutUpi, setPayoutUpi] = useState("partner@okhdfcbank");
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  const stats = [
    { label: "B2B Monthly GMV", value: "₹8,42,000", change: "+24.2% MoM", icon: CurrencyRupeeIcon, color: "text-[#173D32]" },
    { label: "Commission Earned", value: "₹68,450", change: "₹18,200 pending payout", icon: CurrencyRupeeIcon, color: "text-emerald-700" },
    { label: "Active CRM Pipeline", value: "18 Leads", change: "6 awaiting quotation", icon: InboxIcon, color: "text-[#287C70]" },
    { label: "Confirmed Bookings", value: "42 PNRs", change: "100% issued vouchers", icon: TicketIcon, color: "text-[#B7955B]" },
  ];

  const recentLeads = [
    { id: "lead-101", name: "Vikram Malhotra", phone: "+91 98112 34567", dest: "Kashmir Valley (Family 4)", budget: "₹1,20,000", stage: "Requirements Gathered", date: "Today 11:30 AM" },
    { id: "lead-102", name: "Ananya Iyer", phone: "+91 98450 11223", dest: "Kerala Backwaters & Munnar", budget: "₹48,000", stage: "Quotation Sent", date: "Yesterday" },
    { id: "lead-103", name: "Sameer Joshi", phone: "+91 98200 44556", dest: "Dubai Red Dunes & Atlantis", budget: "₹1,80,000", stage: "Drafting Itinerary", date: "2 days ago" },
    { id: "lead-104", name: "Pooja Hegde", phone: "+91 98765 44321", dest: "Goa Private Villa (Group 8)", budget: "₹1,10,000", stage: "Payment Pending", date: "3 days ago" },
  ];

  const handlePayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutSuccess(true);
    setTimeout(() => {
      setWalletBalance((prev) => Math.max(0, prev - 10000));
      setPayoutSuccess(false);
      setShowPayoutModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Executive Agent Terminal Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#173D32] text-[#FAF8F4] p-8 border border-[#287C70]/40 shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#287C70]/30 via-[#B7955B]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#B7955B] animate-pulse"></span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#B7955B]">
                B2B PARTNER TERMINAL
              </span>
              <span className="text-white/30">•</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#287C70]/50 text-white border border-[#287C70]">
                IRDAI PoSP ACCREDITED PARTNER
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Welcome back, {agentName}
            </h1>

            <p className="text-xs sm:text-sm text-[#EDE5D8]/90 font-light leading-relaxed">
              Dispatch branded quotations, book verified IRCTC & flight inventory with custom agency markups, and earn up to 15% instant spot commissions via Travel Protection Shield.
            </p>
          </div>

          {/* Wallet Balance Card */}
          <div className="bg-[#123128] border border-[#287C70]/50 rounded-2xl p-5 shrink-0 flex flex-col justify-between space-y-3 min-w-[240px]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#EDE5D8]/70 tracking-wider">
                Agency Wallet Balance
              </span>
              <div className="font-serif text-3xl font-bold text-[#B7955B] mt-0.5">
                ₹{walletBalance.toLocaleString("en-IN")}
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">✓ Ready for instant UPI payout</span>
            </div>

            <button
              type="button"
              onClick={() => setShowPayoutModal(true)}
              className="w-full py-2 bg-[#B7955B] hover:bg-[#a3844f] text-[#173D32] text-xs font-bold rounded-xl transition shadow-xs cursor-pointer text-center"
            >
              Withdraw to UPI ➔
            </button>
          </div>
        </div>

        {/* Quick Launchpad Strip */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-[#EDE5D8]/80 gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/agent/quotes"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition"
            >
              + Create Client Quote
            </Link>
            <Link
              href="/agent/itineraries"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition"
            >
              + Build PDF Itinerary
            </Link>
            <Link
              href="/agent?tab=insurance-desk"
              className="px-3 py-1.5 rounded-xl bg-[#287C70] hover:bg-[#1f6258] text-white font-semibold text-xs transition flex items-center gap-1"
            >
              <ShieldCheckIcon className="w-3.5 h-3.5 text-[#B7955B]" />
              <span>Travel Protection Shield Hub</span>
            </Link>
          </div>

          <Link
            href="/travel-agent"
            className="text-xs text-[#B7955B] font-semibold hover:underline flex items-center gap-1"
          >
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>AI Concierge Co-Pilot ↗</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#737B76] font-medium">{s.label}</span>
                <div className="w-9 h-9 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#173D32]" />
                </div>
              </div>
              <div className={`font-serif text-2xl font-bold ${s.color}`}>{s.value}</div>
              <p className="text-[11px] text-[#737B76] font-medium border-t border-[#E7E6E0]/60 pt-2">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Active CRM Leads & Priority Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: CRM Leads Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E6E0]">
            <div>
              <h3 className="font-serif text-base font-bold text-[#173D32]">Active CRM Inquiries</h3>
              <p className="text-xs text-[#737B76]">Clients awaiting custom quotes or day plans</p>
            </div>
            <Link href="/agent/leads" className="text-xs font-bold text-[#287C70] hover:underline">
              View All CRM Leads →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F4] text-[#737B76] uppercase text-[10px] tracking-wider border-b border-[#E7E6E0]">
                <tr>
                  <th className="py-2.5 px-3">Client</th>
                  <th className="py-2.5 px-3">Journey & Budget</th>
                  <th className="py-2.5 px-3">Stage</th>
                  <th className="py-2.5 px-3 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E6E0]/60">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FAF8F4]/80 transition">
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#242A28]">{lead.name}</div>
                      <span className="text-[10px] text-[#737B76]">{lead.date}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-[#242A28] font-medium">{lead.dest}</div>
                      <span className="text-[10px] text-emerald-700 font-bold">{lead.budget}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {lead.stage}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 inline-block"
                        title="Chat on WhatsApp"
                      >
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      </a>
                      <Link
                        href={`/agent/leads/${lead.id}`}
                        className="px-2.5 py-1 rounded-lg border border-[#E7E6E0] hover:border-[#173D32] text-xs font-semibold text-[#173D32] inline-block"
                      >
                        Manage →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Travel Shield Spot Commission & Tasks */}
        <div className="space-y-6">
          {/* Insurance Card */}
          <div className="bg-gradient-to-br from-[#173D32] to-[#287C70] rounded-3xl p-6 text-white shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#B7955B]">
                Travel Protection Shield
              </span>
              <span className="text-xs bg-[#B7955B] text-[#173D32] font-bold px-2 py-0.5 rounded-full">
                Up to 15% Payout
              </span>
            </div>

            <div>
              <h4 className="font-serif text-xl font-bold">Instant Policy Issuance</h4>
              <p className="text-xs text-[#EDE5D8] mt-1 leading-relaxed">
                Sell motor, overseas travel, personal accident, and super top-up health policies to your travelers with instant WhatsApp delivery.
              </p>
            </div>

            <Link
              href="/agent?tab=insurance-desk"
              className="block w-full py-2.5 rounded-xl bg-white text-[#173D32] font-bold text-xs text-center hover:bg-[#FAF8F4] transition shadow-xs"
            >
              Open Travel Shield Desk ➔
            </Link>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-[#173D32] border-b border-[#E7E6E0] pb-2">Agency Tools</h4>
            <div className="space-y-2">
              <Link
                href="/agent/quotes"
                className="p-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#EDE5D8]/50 border border-[#E7E6E0] flex justify-between items-center text-[#242A28] font-medium"
              >
                <span>📝 Generate Custom Markup Quote</span>
                <span className="text-[#287C70]">→</span>
              </Link>
              <Link
                href="/agent/bookings"
                className="p-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#EDE5D8]/50 border border-[#E7E6E0] flex justify-between items-center text-[#242A28] font-medium"
              >
                <span>🎫 Download Client Vouchers</span>
                <span className="text-[#287C70]">→</span>
              </Link>
              <Link
                href="/agent/support"
                className="p-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#EDE5D8]/50 border border-[#E7E6E0] flex justify-between items-center text-[#242A28] font-medium"
              >
                <span>🎧 24/7 Operations Helpline</span>
                <span className="text-[#287C70]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-[#E7E6E0] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#173D32]">Withdraw Agency Earnings</h3>
              <button
                type="button"
                onClick={() => setShowPayoutModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            {payoutSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <span className="text-2xl">🎉</span>
                <h4 className="font-bold text-sm text-emerald-800">Transfer Initiated!</h4>
                <p className="text-xs text-emerald-700">₹10,000 sent to {payoutUpi}. Reference #UPI-LOTR-{Math.floor(1000 + Math.random() * 9000)}.</p>
              </div>
            ) : (
              <form onSubmit={handlePayout} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#737B76] mb-1 font-medium">Available Wallet Balance</label>
                  <p className="font-serif text-2xl font-bold text-[#173D32]">₹{walletBalance.toLocaleString("en-IN")}</p>
                </div>

                <div>
                  <label className="block text-[#737B76] mb-1 font-medium">Withdrawal Amount (₹)</label>
                  <input
                    type="number"
                    defaultValue={10000}
                    max={walletBalance}
                    required
                    className="w-full p-2.5 rounded-xl border border-[#E7E6E0] font-bold text-sm text-[#173D32]"
                  />
                </div>

                <div>
                  <label className="block text-[#737B76] mb-1 font-medium">Recipient UPI ID / VPA</label>
                  <input
                    type="text"
                    required
                    value={payoutUpi}
                    onChange={(e) => setPayoutUpi(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E7E6E0] font-medium"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPayoutModal(false)}
                    className="px-4 py-2 rounded-xl border border-[#E7E6E0] text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold shadow-xs"
                  >
                    Authorize Instant Transfer
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
