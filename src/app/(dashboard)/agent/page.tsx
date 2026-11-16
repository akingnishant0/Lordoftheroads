"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { InsurerQuote, IssuedPolicyRecord } from "@/services/insuranceEngineService";
import { AgentTravelBookingRecord } from "@/services/agentBookingService";

export default function AgentPartnerHubPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";

  const [activeTab, setActiveTab] = useState<
    "overview" | "travel-desk" | "insurance-desk" | "wallet" | "posp"
  >(
    initialTab === "insurance-desk"
      ? "insurance-desk"
      : initialTab === "travel-desk"
      ? "travel-desk"
      : initialTab === "wallet"
      ? "wallet"
      : initialTab === "posp"
      ? "posp"
      : "overview"
  );

  // Sync tab with URL search parameter if changed
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["overview", "travel-desk", "insurance-desk", "wallet", "posp"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  // Lead stats
  const [leadStats, setLeadStats] = useState<{ TOTAL?: number; NEW?: number }>({ TOTAL: 4, NEW: 2 });

  // Insurance State
  const [insuranceCategory, setInsuranceCategory] = useState<"BIKE" | "CAR" | "HEALTH" | "TRAVEL" | "TERM_LIFE" | "SHOP">("CAR");
  const [vehNumber, setVehNumber] = useState("DL 01 AB 1234");
  const [healthSumInsured, setHealthSumInsured] = useState("₹10 Lakhs");
  const [insCustomerName, setInsCustomerName] = useState("");
  const [insCustomerPhone, setInsCustomerPhone] = useState("");
  const [insQuotes, setInsQuotes] = useState<InsurerQuote[]>([]);
  const [quotesLoading, setQuotesLoading] = useState(false);
  const [issuedPolicies, setIssuedPolicies] = useState<IssuedPolicyRecord[]>([]);
  const [issuingQuoteId, setIssuingQuoteId] = useState<string | null>(null);
  const [policySuccessMsg, setPolicySuccessMsg] = useState<string | null>(null);

  // Travel B2B Desk State
  const [travelService, setTravelService] = useState<"FLIGHT" | "HOTEL" | "BUS" | "TRAIN" | "CAB" | "PACKAGE">("FLIGHT");
  const [trOrigin, setTrOrigin] = useState("Delhi (DEL)");
  const [trDestination, setTrDestination] = useState("Goa (GOI)");
  const [trDate, setTrDate] = useState("2026-11-20");
  const [trPax, setTrPax] = useState(2);
  const [trCustName, setTrCustName] = useState("");
  const [trCustPhone, setTrCustPhone] = useState("");
  const [trCustEmail, setTrCustEmail] = useState("");
  const [trMarkup, setTrMarkup] = useState(500);
  const [selectedSeat, setSelectedSeat] = useState("12A (Window)");
  const [trainClass, setTrainClass] = useState("3A (3rd AC Sleeper)");
  const [cabType, setCabType] = useState("Innova Crysta AC (6+1)");
  const [travelBookings, setTravelBookings] = useState<AgentTravelBookingRecord[]>([]);
  const [travelBookingSubmitting, setTravelBookingSubmitting] = useState(false);
  const [travelBookingSuccess, setTravelBookingSuccess] = useState<string | null>(null);

  // Wallet & Payout State
  const [walletBalance, setWalletBalance] = useState(28450);
  const [payoutAmount, setPayoutAmount] = useState(10000);
  const [payoutUpi, setPayoutUpi] = useState("partner@okhdfcbank");
  const [payoutSubmitting, setPayoutSubmitting] = useState(false);
  const [payoutMsg, setPayoutMsg] = useState<string | null>(null);
  const [payoutHistory, setPayoutHistory] = useState<any[]>([]);

  // Load live data
  const loadData = () => {
    fetch("/api/agent/insurance")
      .then((r) => r.json())
      .then((d) => {
        if (d.policies) setIssuedPolicies(d.policies);
      })
      .catch(() => {});

    fetch("/api/agent/travel")
      .then((r) => r.json())
      .then((d) => {
        if (d.bookings) setTravelBookings(d.bookings);
      })
      .catch(() => {});

    fetch("/api/agent/payout")
      .then((r) => r.json())
      .then((d) => {
        if (d.payouts) setPayoutHistory(d.payouts);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadData();
    // Pre-generate default quotes
    handleGenerateInsuranceQuotes("CAR");
  }, []);

  // Generate Insurance Quotes (Travel ShieldPro Engine)
  const handleGenerateInsuranceQuotes = async (cat = insuranceCategory) => {
    setQuotesLoading(true);
    setPolicySuccessMsg(null);
    try {
      const res = await fetch("/api/agent/insurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "GENERATE_QUOTES",
          request: {
            insuranceCategory: cat,
            vehicleNumber: vehNumber,
            healthSumInsured,
            customerName: insCustomerName || "Prospective Client",
            customerPhone: insCustomerPhone || "+91 98000 00000",
          },
        }),
      });
      const data = await res.json();
      if (data.quotes) setInsQuotes(data.quotes);
    } catch (err: any) {
      console.error(err);
    } finally {
      setQuotesLoading(false);
    }
  };

  // Issue Insurance Policy on behalf of customer
  const handleIssuePolicy = async (quote: InsurerQuote) => {
    if (!insCustomerName || !insCustomerPhone) {
      alert("Please enter Customer Full Name and WhatsApp Phone Number first.");
      return;
    }
    setIssuingQuoteId(quote.id);
    try {
      const res = await fetch("/api/agent/insurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ISSUE_POLICY",
          quote,
          customer: {
            name: insCustomerName,
            phone: insCustomerPhone,
            email: `${insCustomerName.toLowerCase().replace(/\s+/g, "")}@example.com`,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Policy issuance failed");

      setPolicySuccessMsg(
        `✓ Policy #${data.policy.policyNumber} issued successfully! Agency Commission of ₹${quote.agentCommissionAmount.toLocaleString("en-IN")} credited to your wallet.`
      );
      setWalletBalance((prev) => prev + quote.agentCommissionAmount);
      loadData();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIssuingQuoteId(null);
    }
  };

  // Travel B2B Booking Submit
  const handleTravelBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trCustName || !trCustPhone) {
      alert("Please fill in Customer Name and Contact Phone.");
      return;
    }

    setTravelBookingSubmitting(true);
    setTravelBookingSuccess(null);

    let netAmount = 4500;
    let title = `${travelService} Booking to ${trDestination}`;

    if (travelService === "FLIGHT") {
      netAmount = 4850 * trPax;
      title = `IndiGo Flight (6E-204) ${trOrigin} ➔ ${trDestination}`;
    } else if (travelService === "HOTEL") {
      netAmount = 3800 * 2; // 2 nights
      title = `4-Star Boutique Heritage Stay in ${trDestination}`;
    } else if (travelService === "BUS") {
      netAmount = 1450 * trPax;
      title = `IntrCity AC Multi-Axle Volvo Sleeper (${selectedSeat})`;
    } else if (travelService === "TRAIN") {
      netAmount = 1850 * trPax;
      title = `IRCTC Express ${trOrigin} ➔ ${trDestination} [Class: ${trainClass}]`;
    } else if (travelService === "CAB") {
      netAmount = 4200;
      title = `Chauffeured Outstation Rental [${cabType}]`;
    } else if (travelService === "PACKAGE") {
      netAmount = 24500 * trPax;
      title = `5-Day Curated Tour Package to ${trDestination}`;
    }

    const commissionAmount = Math.round(netAmount * 0.08); // 8% B2B margin
    const totalCustomerAmount = netAmount + Number(trMarkup);

    try {
      const res = await fetch("/api/agent/travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: travelService,
          origin: trOrigin,
          destination: trDestination,
          travelDate: trDate,
          paxAdults: trPax,
          customerName: trCustName,
          customerPhone: trCustPhone,
          customerEmail: trCustEmail || `${trCustName.toLowerCase().replace(/\s+/g, "")}@example.com`,
          selectedOptionTitle: title,
          netB2BAmount: netAmount,
          agentMarkupAmount: Number(trMarkup),
          agentCommissionAmount: commissionAmount,
          totalCustomerAmount,
          seatNumbers: travelService === "BUS" ? [selectedSeat] : undefined,
          trainClass: travelService === "TRAIN" ? trainClass : undefined,
          cabType: travelService === "CAB" ? cabType : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Travel booking failed");

      setTravelBookingSuccess(
        `✓ Booking Confirmed! Ref: ${data.booking.bookingRef} | PNR/Voucher: ${data.booking.pnrOrVoucher}. Your net agency earnings (Markup + Commission): ₹${(
          Number(trMarkup) + commissionAmount
        ).toLocaleString("en-IN")} credited to wallet.`
      );
      setWalletBalance((prev) => prev + Number(trMarkup) + commissionAmount);
      loadData();
      setTrCustName("");
      setTrCustPhone("");
    } catch (err: any) {
      alert("Booking error: " + err.message);
    } finally {
      setTravelBookingSubmitting(false);
    }
  };

  // Instant Payout Submit
  const handlePayoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (payoutAmount > walletBalance) {
      alert("Withdrawal amount cannot exceed available wallet balance.");
      return;
    }
    setPayoutSubmitting(true);
    setPayoutMsg(null);

    try {
      const res = await fetch("/api/agent/payout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: payoutAmount,
          method: "UPI Instant Transfer",
          destinationDetails: payoutUpi,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payout failed");

      setPayoutMsg(data.message);
      setWalletBalance((prev) => prev - payoutAmount);
      loadData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setPayoutSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#242A28]">
      {/* Agent Top Banner */}
      <div className="p-6 bg-[#173D32] text-[#EDE5D8] rounded-2xl border-b-4 border-[#B7955B] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#B7955B] text-white text-[10px] font-bold uppercase tracking-wider">
              AUTHORISED TRAVEL & INSURANCE DESK
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px] font-semibold border border-emerald-500/40">
              IRDAI PoSP: POSP-LOTR-7721
            </span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mt-1">
            Partner Hub — {session?.user?.name || "Verified Agent"} 💼
          </h1>
          <p className="text-xs text-[#FAF8F4] mt-0.5">
            Book Flights, Hotels, Buses, Trains & Cabs with B2B Net Rates + Sell Motor, Health & Travel Insurance like Travel ShieldPro.
          </p>
        </div>

        {/* Live Wallet Chip */}
        <div className="bg-[#287C70] p-3.5 rounded-xl border border-[#B7955B]/40 flex items-center gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#FAF8F4] block">
              Available Wallet Balance
            </span>
            <span className="text-xl font-extrabold text-white">
              ₹{walletBalance.toLocaleString("en-IN")}
            </span>
          </div>
          <button
            onClick={() => setActiveTab("wallet")}
            className="px-3 py-1.5 bg-[#B7955B] hover:bg-[#b85334] text-white text-xs font-bold rounded-lg transition-colors"
          >
            Instant Payout ⚡
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#E7E6E0] overflow-x-auto gap-2 text-xs font-semibold scrollbar-none pb-1">
        {[
          { id: "overview", label: "📊 Partner Overview", icon: "📈" },
          { id: "travel-desk", label: "✈️ Travel Booking Suite (Paytm / MMT)", icon: "🎟️" },
          { id: "insurance-desk", label: "🛡️ Insurance Desk (Travel ShieldPro)", icon: "📋" },
          { id: "wallet", label: `💰 Wallet & Payouts (₹${walletBalance.toLocaleString("en-IN")})`, icon: "💳" },
          { id: "posp", label: "📜 PoSP Certification & KYC", icon: "🎓" },
          { id: "connected-portals", label: "🔌 My Third-Party Portals (MMT, Booking, Google, Justdial)", icon: "🌐" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#FFFFFF] text-[#B7955B] border-t-2 border-x border-[#E7E6E0] border-t-[#B7955B] shadow-xs font-bold text-sm"
                : "text-[#667572] hover:text-[#173D32] hover:bg-[#FAF8F4]"
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-[#E7E6E0] rounded-xl">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Total Policies Sold</span>
              <div className="text-2xl font-bold text-[#173D32] mt-1">{issuedPolicies.length}</div>
              <span className="text-[10px] text-emerald-700">Travel Shield Multi-Insurer</span>
            </div>
            <div className="p-4 bg-white border border-[#E7E6E0] rounded-xl">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Travel Bookings</span>
              <div className="text-2xl font-bold text-[#173D32] mt-1">{travelBookings.length}</div>
              <span className="text-[10px] text-blue-700">Flights, Bus, Hotels & Cabs</span>
            </div>
            <div className="p-4 bg-white border border-[#E7E6E0] rounded-xl">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Active Customer Leads</span>
              <div className="text-2xl font-bold text-[#173D32] mt-1">{leadStats.TOTAL || 4}</div>
              <span className="text-[10px] text-amber-700">{leadStats.NEW || 2} Needing Follow-up</span>
            </div>
            <div className="p-4 bg-white border border-[#E7E6E0] rounded-xl">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Total Earned Payouts</span>
              <div className="text-2xl font-bold text-emerald-700 mt-1">₹43,850</div>
              <span className="text-[10px] text-gray-500">100% On-time UPI Credited</span>
            </div>
          </div>

          {/* Quick Portal Switcher Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Travel Tile */}
            <div
              onClick={() => setActiveTab("travel-desk")}
              className="p-6 bg-gradient-to-br from-[#f7eedc] to-white border-2 border-[#B7955B]/30 hover:border-[#B7955B] rounded-2xl cursor-pointer transition-all shadow-xs hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">✈️</span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#173D32]">
                    Travel Booking Suite (Paytm / MakeMyTrip)
                  </h3>
                  <p className="text-xs text-[#667572]">
                    Book Flights, Hotels, Volvo Buses, IRCTC Trains, and Outstation Cabs with Net B2B Rates + Your Markup.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs pt-2">
                <span className="px-2 py-1 bg-white rounded border border-[#E7E6E0]">✈️ Special Flight Fares</span>
                <span className="px-2 py-1 bg-white rounded border border-[#E7E6E0]">🏨 8% Hotel Commission</span>
                <span className="px-2 py-1 bg-white rounded border border-[#E7E6E0]">🚌 redBus Volvo Sleeper</span>
                <span className="px-2 py-1 bg-white rounded border border-[#E7E6E0]">🚕 Outstation Cabs</span>
              </div>
              <button className="mt-4 text-xs font-bold text-[#B7955B] flex items-center gap-1">
                Open Travel Booking Desk →
              </button>
            </div>

            {/* Insurance Tile */}
            <div
              onClick={() => setActiveTab("insurance-desk")}
              className="p-6 bg-gradient-to-br from-[#eaf4f2] to-white border-2 border-emerald-500/30 hover:border-emerald-600 rounded-2xl cursor-pointer transition-all shadow-xs hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🛡️</span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#173D32]">
                    Insurance Advisor Desk (Like Travel ShieldPro)
                  </h3>
                  <p className="text-xs text-[#667572]">
                    Compare Digit, HDFC ERGO, ICICI Lombard, Tata AIG, Care & Star Health. Earn 15% - 25% instant commission!
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs pt-2">
                <span className="px-2 py-1 bg-white rounded border border-emerald-200">🛵 Two-Wheeler / Bike</span>
                <span className="px-2 py-1 bg-white rounded border border-emerald-200">🚗 Private Car Zero-Dep</span>
                <span className="px-2 py-1 bg-white rounded border border-emerald-200">🏥 Health & Mediclaim</span>
                <span className="px-2 py-1 bg-white rounded border border-emerald-200">📲 WhatsApp Quote Share</span>
              </div>
              <button className="mt-4 text-xs font-bold text-emerald-800 flex items-center gap-1">
                Open Travel ShieldPro Insurance Desk →
              </button>
            </div>
          </div>

          {/* Recent Operations */}
          <div className="bg-white border border-[#E7E6E0] rounded-2xl p-5 space-y-4">
            <h3 className="font-serif font-bold text-base text-[#173D32]">
              Recent Client Bookings & Policies Issued
            </h3>
            <div className="space-y-2 text-xs">
              {issuedPolicies.slice(0, 3).map((pol) => (
                <div key={pol.id} className="p-3 bg-[#FAF8F4] rounded-xl flex justify-between items-center">
                  <div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                      INSURANCE
                    </span>{" "}
                    <b>{pol.planName}</b> for <b>{pol.customerName}</b> ({pol.customerPhone})
                    <p className="text-[10px] text-gray-500 mt-0.5">Policy #{pol.policyNumber} · {pol.insurerName}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-800">+₹{pol.agentCommissionAmount} Commission</span>
                    <p className="text-[10px] text-gray-500">Credited to Wallet</p>
                  </div>
                </div>
              ))}
              {travelBookings.slice(0, 3).map((tb) => (
                <div key={tb.id} className="p-3 bg-[#FAF8F4] rounded-xl flex justify-between items-center">
                  <div>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px]">
                      {tb.serviceType}
                    </span>{" "}
                    <b>{tb.selectedOptionTitle}</b> for <b>{tb.customerName}</b>
                    <p className="text-[10px] text-gray-500 mt-0.5">Ref: {tb.bookingRef} · PNR: {tb.pnrOrVoucher}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-blue-900">+₹{tb.agentMarkupAmount + tb.agentCommissionAmount} Earning</span>
                    <p className="text-[10px] text-gray-500">Client Paid: ₹{tb.totalCustomerAmount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRAVEL BOOKING SUITE (PAYTM / MAKEMYTRIP AGENT DESK) */}
      {activeTab === "travel-desk" && (
        <div className="space-y-6">
          <div className="p-5 bg-white border border-[#E7E6E0] rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#E7E6E0] pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#173D32]">
                  Travel Agent B2B Desk (Flights, Hotels, Buses, Trains, Cabs)
                </h3>
                <p className="text-xs text-[#667572]">
                  Book on behalf of travellers. Apply custom agency markup and print instant booking vouchers with your agency branding.
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-800 font-bold rounded-full border border-blue-200">
                Live GDS & Supplier Connected
              </span>
            </div>

            {/* Travel Service Switcher */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { id: "FLIGHT", label: "Flights", icon: "✈️" },
                { id: "HOTEL", label: "Hotels", icon: "🏨" },
                { id: "PACKAGE", label: "Packages", icon: "🏖️" },
                { id: "BUS", label: "Buses", icon: "🚌" },
                { id: "TRAIN", label: "Trains", icon: "🚂" },
                { id: "CAB", label: "Cabs", icon: "🚕" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setTravelService(s.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    travelService === s.id
                      ? "border-[#B7955B] bg-[#f7eedc] font-bold text-[#173D32]"
                      : "border-[#E7E6E0] bg-white hover:bg-[#FFFFFF]"
                  }`}
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-xs">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Travel Booking Form */}
            <form onSubmit={handleTravelBookingSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#173D32] mb-1">
                    Origin / Boarding Point
                  </label>
                  <input
                    type="text"
                    value={trOrigin}
                    onChange={(e) => setTrOrigin(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#173D32] mb-1">
                    Destination / Property
                  </label>
                  <input
                    type="text"
                    required
                    value={trDestination}
                    onChange={(e) => setTrDestination(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#173D32] mb-1">
                    Travel Departure Date
                  </label>
                  <input
                    type="date"
                    required
                    value={trDate}
                    onChange={(e) => setTrDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded text-xs bg-white"
                  />
                </div>
              </div>

              {/* Service-Specific Controls */}
              {travelService === "BUS" && (
                <div className="p-3 bg-[#FAF8F4] rounded-xl border border-[#E7E6E0] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Select Bus Seat (redBus / Paytm Layout)</label>
                    <select
                      value={selectedSeat}
                      onChange={(e) => setSelectedSeat(e.target.value)}
                      className="w-full px-2.5 py-1.5 border rounded bg-white"
                    >
                      <option>12A (Window - Lower Sleeper)</option>
                      <option>12B (Aisle - Lower Sleeper)</option>
                      <option>U4 (Window - Upper Sleeper)</option>
                      <option>U5 (Single Luxury Berth)</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Operator Inclusions</span>
                    <b className="text-emerald-800">IntrCity SmartBus Volvo Multi-Axle AC (Live GPS, Water, Blanket)</b>
                  </div>
                </div>
              )}

              {travelService === "TRAIN" && (
                <div className="p-3 bg-[#FAF8F4] rounded-xl border border-[#E7E6E0] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Select IRCTC Quota / Class</label>
                    <select
                      value={trainClass}
                      onChange={(e) => setTrainClass(e.target.value)}
                      className="w-full px-2.5 py-1.5 border rounded bg-white"
                    >
                      <option>1A (First AC Executive)</option>
                      <option>2A (2nd AC 2-Tier Sleeper)</option>
                      <option>3A (3rd AC 3-Tier Sleeper)</option>
                      <option>SL (Sleeper Class)</option>
                      <option>EC (Vande Bharat Executive Chair)</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Quota Status</span>
                    <b className="text-emerald-800">AVL 24 Confirmed Available (General / Tatkal Assistance)</b>
                  </div>
                </div>
              )}

              {travelService === "CAB" && (
                <div className="p-3 bg-[#FAF8F4] rounded-xl border border-[#E7E6E0] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Select Outstation Vehicle Category</label>
                    <select
                      value={cabType}
                      onChange={(e) => setCabType(e.target.value)}
                      className="w-full px-2.5 py-1.5 border rounded bg-white"
                    >
                      <option>Sedan AC (Dzire / Etios 4+1)</option>
                      <option>Innova Crysta AC (6+1)</option>
                      <option>Ertiga AC (6+1)</option>
                      <option>Tempo Traveller 12-Seater</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Driver & Tolls</span>
                    <b className="text-emerald-800">All Tolls, State Taxes & Chauffeur Allowance Included</b>
                  </div>
                </div>
              )}

              {/* Customer & Pricing Controls */}
              <div className="p-4 bg-white border border-[#E7E6E0] rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Customer Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={trCustName}
                    onChange={(e) => setTrCustName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full px-2.5 py-1.5 border rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Customer Phone (WhatsApp) <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    value={trCustPhone}
                    onChange={(e) => setTrCustPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-2.5 py-1.5 border rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Passengers / Rooms</label>
                  <input
                    type="number"
                    min={1}
                    value={trPax}
                    onChange={(e) => setTrPax(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-emerald-800">Your Custom Agency Markup (₹)</label>
                  <input
                    type="number"
                    value={trMarkup}
                    onChange={(e) => setTrMarkup(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-emerald-400 bg-emerald-50 font-bold text-emerald-900 rounded"
                  />
                </div>
              </div>

              {travelBookingSuccess && (
                <div className="p-3.5 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xl text-xs space-y-1">
                  <b>{travelBookingSuccess}</b>
                </div>
              )}

              <button
                type="submit"
                disabled={travelBookingSubmitting}
                className="px-6 py-3 bg-[#173D32] hover:bg-[#287C70] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
              >
                {travelBookingSubmitting ? "Issuing Ticket with GDS..." : "⚡ Issue Instant B2B Booking & Print Voucher →"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: INSURANCE DESK (Travel ShieldPRO STYLE) */}
      {activeTab === "insurance-desk" && (
        <div className="space-y-6">
          <div className="p-5 bg-white border border-[#E7E6E0] rounded-2xl space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#E7E6E0] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-lg text-[#173D32]">
                    Insurance Advisor Portal (Powered by Travel Shield Engine)
                  </h3>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    15–25% Agent Commission
                  </span>
                </div>
                <p className="text-xs text-[#667572]">
                  Instant multi-insurer quote comparison, IDV calculation, instant proposal generation & 1-click WhatsApp quote sharing for your clients.
                </p>
              </div>
            </div>

            {/* Sell & Earn on Travel ShieldPro Section (Exact match to app.Travel Shieldpro.com/sell) */}
            <div className="bg-[#FAF8F4] p-5 rounded-2xl border border-[#E6DFD3] space-y-6">
              <div className="flex justify-between items-center border-b border-[#E6DFD3] pb-3">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#173D32]">
                    Sell & Earn on Travel ShieldPro Partner Desk
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    Select any insurance or financial product to compare rates, generate proposal, and share with your client.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  PoSP Code: POSP-LOTR-7721
                </span>
              </div>

              {/* Category 1: Motor */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2.5">
                  Motor
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {[
                    { id: "BIKE", label: "Bike Insurance", icon: "🛵" },
                    { id: "CAR", label: "Car Insurance", icon: "🚗" },
                    { id: "CAR", label: "Comm. Vehicle Insurance", icon: "🚚" },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setInsuranceCategory(item.id as any);
                        handleGenerateInsuranceQuotes(item.id as any);
                      }}
                      className={`p-3 bg-white rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 hover:shadow-xs ${
                        insuranceCategory === item.id
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                          : "border-[#E6DFD3] text-gray-700"
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-[11px] leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category 2: Health & Life */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2.5">
                  Health & Life
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "HEALTH", label: "Health Insurance", icon: "❤️" },
                    { id: "TERM_LIFE", label: "Life Insurance", icon: "☂️" },
                    { id: "HEALTH", label: "Personal Accident", icon: "⚠️" },
                    { id: "TRAVEL", label: "Payment Fraud Protection", icon: "🛡️" },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setInsuranceCategory(item.id as any);
                        handleGenerateInsuranceQuotes(item.id as any);
                      }}
                      className={`p-3 bg-white rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 hover:shadow-xs ${
                        insuranceCategory === item.id
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                          : "border-[#E6DFD3] text-gray-700"
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-[11px] leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category 3: Loans & Credit & Investment */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2.5">
                  Loans, Credit & Investment
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {[
                    { label: "Personal Loans", icon: "💰" },
                    { label: "Business Loans", icon: "🏢" },
                    { label: "Credit Cards", icon: "💳" },
                    { label: "Home Loans", icon: "🏠" },
                    { label: "Free Credit Score", icon: "📈" },
                    { label: "Mutual Funds", icon: "🪙" },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        alert(`Referral Lead for ${item.label} initiated. Link dispatched to client with your partner tracking code.`);
                      }}
                      className="p-3 bg-white rounded-xl border border-[#E6DFD3] text-center transition-all flex flex-col items-center gap-1.5 hover:border-blue-500 hover:shadow-xs text-gray-700"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-[11px] leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category 4: SME & Commercial */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2.5">
                  SME & Commercial Insurance
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "SHOP", label: "Shopkeeper Insurance", icon: "🏪" },
                    { id: "TRAVEL", label: "International Travel Policy", icon: "✈️" },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setInsuranceCategory(item.id as any);
                        handleGenerateInsuranceQuotes(item.id as any);
                      }}
                      className={`p-3 bg-white rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 hover:shadow-xs ${
                        insuranceCategory === item.id
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                          : "border-[#E6DFD3] text-gray-700"
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-[11px] leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Inputs for Quote Generator */}
            <div className="p-4 bg-[#FAF8F4] rounded-xl border border-[#E7E6E0] grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs items-center">
              <div>
                <label className="block font-semibold mb-1 text-[#173D32]">Client Full Name</label>
                <input
                  type="text"
                  value={insCustomerName}
                  onChange={(e) => setInsCustomerName(e.target.value)}
                  placeholder="e.g. Vikram Sharma"
                  className="w-full px-2.5 py-1.5 border rounded bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-[#173D32]">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  value={insCustomerPhone}
                  onChange={(e) => setInsCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-2.5 py-1.5 border rounded bg-white"
                />
              </div>
              {(insuranceCategory === "CAR" || insuranceCategory === "BIKE") && (
                <div>
                  <label className="block font-semibold mb-1 text-[#173D32]">Registration Number</label>
                  <input
                    type="text"
                    value={vehNumber}
                    onChange={(e) => setVehNumber(e.target.value)}
                    placeholder="e.g. MH 02 CD 4567"
                    className="w-full px-2.5 py-1.5 border rounded bg-white uppercase"
                  />
                </div>
              )}
              {insuranceCategory === "HEALTH" && (
                <div>
                  <label className="block font-semibold mb-1 text-[#173D32]">Sum Insured Cover</label>
                  <select
                    value={healthSumInsured}
                    onChange={(e) => setHealthSumInsured(e.target.value)}
                    className="w-full px-2.5 py-1.5 border rounded bg-white"
                  >
                    <option>₹5 Lakhs</option>
                    <option>₹10 Lakhs</option>
                    <option>₹25 Lakhs</option>
                    <option>₹1 Crore (Super Cover)</option>
                  </select>
                </div>
              )}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleGenerateInsuranceQuotes()}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold transition-colors"
                >
                  {quotesLoading ? "Fetching Insurer APIs..." : "🔄 Refresh Live Quotes"}
                </button>
              </div>
            </div>

            {policySuccessMsg && (
              <div className="p-4 bg-emerald-100 border border-emerald-400 text-emerald-900 rounded-xl text-xs font-bold">
                {policySuccessMsg}
              </div>
            )}

            {/* Insurer Comparison Cards (Travel ShieldPro Engine) */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-serif font-bold text-sm text-[#173D32]">
                  Compare Top IRDAI Approved Insurers for {insuranceCategory}
                </h4>
                <span className="text-[11px] text-gray-500">Instant Cashless Tie-ups Verified</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {insQuotes.map((q) => (
                  <div
                    key={q.id}
                    className="p-5 bg-white border-2 border-[#E7E6E0] hover:border-emerald-600 rounded-2xl shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{q.insurerLogo}</span>
                          <div>
                            <b className="text-xs text-[#173D32] block">{q.insurerName}</b>
                            <span className="text-[10px] text-emerald-700 font-bold">{q.csrRating}</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-bold text-[10px]">
                          {q.agentCommissionPercent}% Payout
                        </span>
                      </div>

                      <h5 className="font-bold text-sm text-[#173D32] mt-1">{q.planName}</h5>

                      {q.idvAmount && (
                        <div className="text-xs text-gray-600 mt-1">
                          IDV: <b>₹{q.idvAmount.toLocaleString("en-IN")}</b> · Garages: <b>{q.networkGarages}+</b>
                        </div>
                      )}
                      {q.coverAmount && (
                        <div className="text-xs text-gray-600 mt-1">
                          Cover: <b>{q.coverAmount}</b> · Hospitals: <b>{q.cashlessHospitals}+</b>
                        </div>
                      )}

                      {/* Premium & Commission Box */}
                      <div className="my-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Annual Premium:</span>
                          <span className="text-lg font-extrabold text-[#173D32]">
                            ₹{q.annualPremium.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-1 border-t border-emerald-200/80 mt-1">
                          <span className="text-emerald-800 font-semibold">Your Net Commission:</span>
                          <b className="text-emerald-800">+₹{q.agentCommissionAmount.toLocaleString("en-IN")}</b>
                        </div>
                      </div>

                      <ul className="text-[11px] space-y-1 text-gray-700 mb-3">
                        {q.keyFeatures.map((feat, fi) => (
                          <li key={fi} className="flex items-start gap-1">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-[#E7E6E0] space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`https://wa.me/?text=Hello%20${encodeURIComponent(
                            insCustomerName || "Client"
                          )},%20here%20is%20the%20official%20insurance%20quote%20from%20${encodeURIComponent(
                            q.insurerName
                          )}%20(${encodeURIComponent(
                            q.planName
                          )})%20for%20₹${q.annualPremium}.%20Presented%20by%20Lord%20of%20the%20Road%20Advisor%20Desk.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg text-center text-[11px] font-bold hover:bg-emerald-100 transition-colors"
                        >
                          📲 WhatsApp Quote
                        </a>
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="py-2 border border-gray-300 text-gray-700 rounded-lg text-center text-[11px] font-bold hover:bg-gray-50 transition-colors"
                        >
                          📄 Download PDF
                        </button>
                      </div>

                      <button
                        type="button"
                        disabled={issuingQuoteId === q.id}
                        onClick={() => handleIssuePolicy(q)}
                        className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                      >
                        {issuingQuoteId === q.id ? "Issuing Policy with Insurer..." : "⚡ Issue Instant Policy Now"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WALLET & INSTANT PAYOUTS */}
      {activeTab === "wallet" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Wallet Balance Card */}
            <div className="p-6 bg-gradient-to-br from-[#173D32] to-[#287C70] text-white rounded-2xl border-2 border-[#B7955B] shadow-md space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#FAF8F4]">Withdrawable Balance</span>
              <div className="text-3xl font-extrabold">₹{walletBalance.toLocaleString("en-IN")}</div>
              <p className="text-[11px] text-[#FAF8F4]">
                Includes real-time commission from Travel Bookings (MMT/Paytm desk) and Insurance Policies (Travel Shield desk).
              </p>
              <div className="pt-2 border-t border-white/20 text-xs text-emerald-300">
                ● Instant 24x7 IMPS / UPI Withdrawal Enabled
              </div>
            </div>

            {/* Payout Form */}
            <div className="md:col-span-2 p-6 bg-white border border-[#E7E6E0] rounded-2xl shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#173D32]">
                Request Instant Commission Payout
              </h3>
              <form onSubmit={handlePayoutSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 text-[#173D32]">Withdrawal Amount (₹)</label>
                    <input
                      type="number"
                      min={500}
                      max={walletBalance}
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded font-bold text-sm bg-white"
                    />
                    <small className="text-gray-500">Minimum withdrawal: ₹500</small>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#173D32]">UPI ID / Bank Account</label>
                    <input
                      type="text"
                      required
                      value={payoutUpi}
                      onChange={(e) => setPayoutUpi(e.target.value)}
                      placeholder="e.g. partner@okhdfcbank"
                      className="w-full px-3 py-2 border rounded bg-white"
                    />
                    <small className="text-gray-500">Zero transfer fee on UPI & IMPS</small>
                  </div>
                </div>

                {payoutMsg && (
                  <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded font-semibold">
                    {payoutMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={payoutSubmitting}
                  className="px-6 py-2.5 bg-[#B7955B] hover:bg-[#b85334] text-white rounded-lg font-bold transition-colors"
                >
                  {payoutSubmitting ? "Processing IMPS Transfer..." : "⚡ Withdraw to UPI Now"}
                </button>
              </form>
            </div>
          </div>

          {/* Payout History Ledger */}
          <div className="p-5 bg-white border border-[#E7E6E0] rounded-2xl space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#173D32]">Payout Withdrawal History</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#FAF8F4] text-gray-700 uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Payout Ref</th>
                    <th className="p-2.5">Amount</th>
                    <th className="p-2.5">Transfer Mode</th>
                    <th className="p-2.5">Destination Details</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Requested Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payoutHistory.map((p) => (
                    <tr key={p.id}>
                      <td className="p-2.5 font-mono font-bold text-blue-900">{p.referenceId}</td>
                      <td className="p-2.5 font-bold">₹{p.amount.toLocaleString("en-IN")}</td>
                      <td className="p-2.5">{p.method}</td>
                      <td className="p-2.5">{p.destinationDetails}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-gray-500">{new Date(p.requestedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: POSP CERTIFICATION & IRDAI COMPLIANCE */}
      {activeTab === "posp" && (
        <div className="space-y-6">
          <div className="p-6 bg-white border border-[#E7E6E0] rounded-2xl space-y-5">
            <div className="flex justify-between items-start border-b border-[#E7E6E0] pb-4">
              <div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                  VERIFIED ADVISOR STATUS
                </span>
                <h3 className="font-serif font-bold text-xl text-[#173D32] mt-1">
                  Point of Sale Person (PoSP) Certification
                </h3>
                <p className="text-xs text-[#667572]">
                  Authorized under IRDAI Guidelines for POSP Insurance Intermediation (General, Health & Life).
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 border border-[#173D32] rounded-lg text-xs font-bold hover:bg-[#173D32] hover:text-white transition-colors"
              >
                🖨️ Download PoSP Certificate
              </button>
            </div>

            {/* Certificate Details Card */}
            <div className="p-5 border-2 border-dashed border-emerald-500/50 bg-[#eaf4f2]/40 rounded-xl space-y-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">PoSP Reg Code</span>
                  <b className="font-mono text-emerald-900 text-sm">POSP-LOTR-7721</b>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">Advisor Name</span>
                  <b>{session?.user?.name || "Authorized Travel Agent"}</b>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">Mandatory Training</span>
                  <b className="text-emerald-700">✓ 15 Hours Completed</b>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">Valid Till</span>
                  <b>31-Dec-2029 (Perpetual Active)</b>
                </div>
              </div>
            </div>

            {/* Compliance Note */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
              <b>IRDAI Statutory Compliance Notice:</b>
              <p>
                Selling insurance products requires registered PoSP accreditation. All policy issuances are routed through licensed insurance broker partner APIs. Premium collections are deposited directly to respective insurers without cash withholding.
              </p>
            </div>
          </div>
        </div>
      )}
    
      {/* TAB 6: AGENT SELF-MANAGED THIRD-PARTY PORTALS & CHANNELS */}
      {activeTab === "connected-portals" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E6E0]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌐</span>
                  <h2 className="text-xl font-serif font-bold text-[#173D32]">
                    My Independent Third-Party Portal Connections
                  </h2>
                </div>
                <p className="text-xs text-[#737B76] mt-1">
                  एजेंट अपने खुद के मर्चेंट/पार्टनर अकाउंट्स (MakeMyTrip, Booking.com, Google Hotel Center, Justdial, Goibibo) सीधे यहाँ जोड़ सकते हैं।
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                ✓ 4 Portals Connected & Active
              </span>
            </div>

            {/* Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {[
                {
                  id: "mmt",
                  name: "MakeMyTrip Partner Extranet",
                  hindi: "मेकमाईट्रिप एजेंट/सप्लायर कोड",
                  icon: "🔴",
                  connected: true,
                  partnerId: "MMT-AGT-89140-DEL",
                  accountType: "Verified B2B Direct Ticket & Hotel Desk",
                  lastSync: "3 mins ago",
                },
                {
                  id: "booking",
                  name: "Booking.com Connectivity Suite",
                  hindi: "बुकिंग.कॉम एक्सट्रानेट कनेक्शन",
                  icon: "🔵",
                  connected: true,
                  partnerId: "BK-HOTELIER-9921",
                  accountType: "Self-Managed Channel Manager & iCal",
                  lastSync: "Just now",
                },
                {
                  id: "google",
                  name: "Google Business & Hotel Center",
                  hindi: "गूगल बिजनेस व होटल सेंटर प्रोफाइल",
                  icon: "🟢",
                  connected: true,
                  partnerId: "GBIZ-LOTR-TAPOVAN",
                  accountType: "Direct Free Booking Links & Search Pins",
                  lastSync: "12 mins ago",
                },
                {
                  id: "justdial",
                  name: "Justdial Verified Merchant & Lead Desk",
                  hindi: "जस्टडायल मर्चेंट व लीड्स वेबहुक",
                  icon: "🟡",
                  connected: true,
                  partnerId: "JD-VERIFIED-4410",
                  accountType: "Instant SMS/WhatsApp Lead Dispatch",
                  lastSync: "25 mins ago",
                },
                {
                  id: "goibibo",
                  name: "Goibibo Travel Partner Network",
                  hindi: "गोइबिबो पार्टनर आईडी",
                  icon: "🟠",
                  connected: false,
                  partnerId: "Not Connected",
                  accountType: "Flight & Intercity Bus Extranet",
                  lastSync: "Never",
                },
              ].map((portal) => (
                <div
                  key={portal.id}
                  className="p-5 rounded-2xl border border-[#E7E6E0] bg-[#FAF8F4] flex flex-col justify-between hover:border-[#173D32] transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{portal.icon}</span>
                        <div>
                          <div className="font-bold text-sm text-[#173D32]">{portal.name}</div>
                          <div className="text-[11px] text-[#B7955B]">{portal.hindi}</div>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          portal.connected
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {portal.connected ? "ACTIVE" : "DISCONNECTED"}
                      </span>
                    </div>

                    <div className="text-xs text-[#55635E] mt-3 space-y-1">
                      <div>
                        <strong>Account / Partner ID:</strong>{" "}
                        <span className="font-mono text-[#173D32] bg-white px-1.5 py-0.5 rounded border border-[#E7E6E0]">
                          {portal.partnerId}
                        </span>
                      </div>
                      <div>
                        <strong>Mode:</strong> {portal.accountType}
                      </div>
                      <div>
                        <strong>Last Sync:</strong> {portal.lastSync}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E7E6E0] flex items-center justify-between">
                    <button
                      onClick={() =>
                        alert(
                          `${portal.name} credentials updated for your independent agent account.`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#173D32] text-[#173D32] text-xs font-bold hover:bg-[#173D32] hover:text-white transition"
                    >
                      {portal.connected ? "Manage / Re-sync" : "+ Connect Account"}
                    </button>
                    {portal.connected && (
                      <span className="text-[11px] text-emerald-700 font-medium">
                        ● Live 2-Way Sync
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Self-Service Portal Add Box */}
            <div className="mt-6 p-5 rounded-2xl border border-dashed border-[#173D32]/40 bg-white">
              <h3 className="font-bold text-sm text-[#173D32] mb-1">
                + Link Another OTA / Local Supplier Portal
              </h3>
              <p className="text-xs text-[#737B76] mb-4">
                अगर आपके पास कोई अन्य लोकल वेंडर, राज्य परिवहन, या थर्ड-पार्टी होटल एक्सट्रानेट का खाता है, तो उसका API Key या iCal लिंक यहाँ दर्ज करें:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Portal Name (उदा. RedBus, Agoda, Airbnb)"
                  className="px-3.5 py-2 rounded-lg border border-[#D5CDBD] text-xs bg-[#FAF8F4]"
                />
                <input
                  type="text"
                  placeholder="Your Extranet / Partner Merchant ID"
                  className="px-3.5 py-2 rounded-lg border border-[#D5CDBD] text-xs bg-[#FAF8F4]"
                />
                <button
                  type="button"
                  onClick={() => alert("New third-party partner portal successfully connected to your agent desk!")}
                  className="px-4 py-2 rounded-lg bg-[#173D32] text-white text-xs font-bold hover:bg-[#112B24]"
                >
                  Save & Connect Portal ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
</div>
  );
}
