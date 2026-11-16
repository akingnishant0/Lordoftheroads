"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { AiAgentResponse } from "@/services/aiTravelAgentService";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  data?: AiAgentResponse;
  timestamp: string;
}

export default function AiTravelAgentWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt");

  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Active workspace state (Right Panel)
  const [activePlan, setActivePlan] = useState<{
    destination: string;
    duration: string;
    totalBudget: number;
    budgetBreakdown?: { stay: number; transport: number; food_and_activities: number; buffer: number; total: number };
    itinerary?: { day: number; title: string; morning: string; afternoon: string; evening: string; meal_recommendation: string }[];
    selectedHotel?: string;
    selectedTransport?: string;
  }>({
    destination: "Kashmir Valley",
    duration: "6 Days / 5 Nights",
    totalBudget: 27999,
    budgetBreakdown: {
      stay: 12000,
      transport: 7500,
      food_and_activities: 6500,
      buffer: 1999,
      total: 27999,
    },
    itinerary: [
      {
        day: 1,
        title: "Srinagar Arrival & Dal Lake Shikara",
        morning: "Private airport pickup & check-in to heritage cedar wood houseboat.",
        afternoon: "Rest, saffron kehwa welcome drink, and floating lotus gardens walk.",
        evening: "1-hour sunset Shikara ride across Dal Lake with evening lights.",
        meal_recommendation: "Authentic Kashmiri Wazwan tasting (Gushtaba & Rogan Josh)",
      },
      {
        day: 2,
        title: "Gulmarg Alpine Expedition & Gondola",
        morning: "Scenic mountain drive past Tangmarg apple orchards to Gulmarg.",
        afternoon: "Ride the Phase 1 & 2 Gondola up to 13,780 ft high Apharwat Peak.",
        evening: "Warm kehwa at alpine lounge before returning to Srinagar resort.",
        meal_recommendation: "Hot Dum Aloo with fresh Kashmiri Girda bread",
      },
      {
        day: 3,
        title: "Pahalgam Lidder River & Betaab Valley",
        morning: "Drive along saffron fields of Pampore to pine-clad Pahalgam valley.",
        afternoon: "Explore Betaab Valley and scenic meadows of Aru along Lidder river.",
        evening: "Riverside bonfire and stargazing at pine resort.",
        meal_recommendation: "Fresh Himalayan trout fish grill with herb butter",
      },
    ],
    selectedHotel: "Heritage Houseboat on Dal Lake & Pine Glade Resort",
    selectedTransport: "Chauffeur-Driven AC Sedan (All 6 Days)",
  });

  const [savedTripNotice, setSavedTripNotice] = useState<string | null>(null);

  // Human Travel Expert Handoff Modal State
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [expertName, setExpertName] = useState("");
  const [expertPhone, setExpertPhone] = useState("");
  const [expertPinCode, setExpertPinCode] = useState("");
  const [expertNotes, setExpertNotes] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSuccessInfo, setLeadSuccessInfo] = useState<{ leadId: string; whatsappUrl: string } | null>(null);

  // Chat message stream
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: "Namaste! I am your AI Travel Concierge at Lord of the Road. What kind of journey are you imagining? I can customize day-by-day itineraries, calculate live budgets, compare transport, and connect you with human travel experts on WhatsApp.",
      timestamp: "Just now",
      data: {
        function_called: "welcome",
        reply: "Select an option below or type your trip vision:",
        suggestions: [
          "Plan a 4-day Rishikesh & Haridwar Yoga Retreat under ₹18,000",
          "5-day Kerala backwaters & tea hills trip under ₹25,000",
          "6-Day Royal Rajasthan heritage haveli itinerary",
          "Book chauffeur cab from Delhi to Lansdowne (PIN: 246149)",
        ],
      },
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendQuery = async (queryText?: string) => {
    const text = (queryText || inputQuery).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data: AiAgentResponse = await res.json();

      const aiMsg: ChatMessage = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: data.reply || "I've structured a recommended plan for you:",
        data,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);

      // If response includes an itinerary or budget, update active right panel
      if (data.itinerary && data.itinerary.length > 0) {
        let dest = "Custom Journey";
        if (text.toLowerCase().includes("kerala")) dest = "Kerala Backwaters & Munnar";
        else if (text.toLowerCase().includes("rajasthan") || text.toLowerCase().includes("jaipur")) dest = "Royal Rajasthan";
        else if (text.toLowerCase().includes("rishikesh") || text.toLowerCase().includes("yoga")) dest = "Rishikesh Yoga & Riverside Retreat";
        else if (text.toLowerCase().includes("lansdowne")) dest = "Lansdowne Pine Sanctuary";
        else if (text.toLowerCase().includes("dubai")) dest = "Dubai & Red Dunes";
        else if (text.toLowerCase().includes("ladakh")) dest = "High Roads of Ladakh";

        setActivePlan({
          destination: dest,
          duration: `${data.itinerary.length} Days / ${data.itinerary.length - 1} Nights`,
          totalBudget: data.budget_breakdown?.total || 24500,
          budgetBreakdown: data.budget_breakdown,
          itinerary: data.itinerary,
          selectedHotel: "Handpicked Verified Boutique Resort & Homestay",
          selectedTransport: "Private Sanitized Chauffeur AC Cab",
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "ai",
          text: "I encountered a slight network hiccup. You can still customize your plan on the right or connect directly with our human travel expert via WhatsApp.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialPrompt) {
      handleSendQuery(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSaveTrip = () => {
    const tripId = "TRIP-" + Math.floor(1000 + Math.random() * 9000);
    try {
      const savedTrips = JSON.parse(localStorage.getItem("lotr_saved_ai_trips") || "[]");
      savedTrips.unshift({
        id: tripId,
        createdAt: new Date().toISOString(),
        plan: activePlan,
      });
      localStorage.setItem("lotr_saved_ai_trips", JSON.stringify(savedTrips));
      setSavedTripNotice(`✓ Trip saved as #${tripId}! Link copied to workspace.`);
      setTimeout(() => setSavedTripNotice(null), 4000);
    } catch (e) {}
  };

  const handleTransferToCheckout = () => {
    router.push(
      `/checkout?item=${encodeURIComponent(activePlan.destination + " (" + activePlan.duration + ")")}&price=${activePlan.totalBudget}&travellers=2`
    );
  };

  // Submit Lead to API & Generate WhatsApp Link
  const handleConnectExpertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertName || !expertPhone) return;

    setIsSubmittingLead(true);
    const leadCode = `LEAD-LOTR-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // 1. Post to lead API
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: expertName,
          phone: expertPhone,
          pinCode: expertPinCode,
          destination: activePlan.destination,
          budgetMax: activePlan.totalBudget,
          paxAdults: 2,
          serviceType: "HOLIDAY_PACKAGE",
          source: "AI_CONCIERGE",
          message: `AI Itinerary Request: ${activePlan.destination} (${activePlan.duration}). Budget: ₹${activePlan.totalBudget}. Hotel: ${activePlan.selectedHotel}. Cab: ${activePlan.selectedTransport}. User notes: ${expertNotes}`,
          externalId: leadCode,
        }),
      });

      // 2. Format prefilled WhatsApp text for instant chat
      const waText = `Namaste Lord of the Road Expert! 
I planned a trip using your AI Concierge:
📍 Destination: ${activePlan.destination} (${activePlan.duration})
💰 Estimated Budget: ₹${activePlan.totalBudget.toLocaleString("en-IN")}
🏨 Stay: ${activePlan.selectedHotel}
🚖 Transport: ${activePlan.selectedTransport}
📮 Pickup PIN Code: ${expertPinCode || "Delhi-NCR"}
👤 Name: ${expertName} (${expertPhone})
Ref: #${leadCode}
Please confirm the itinerary and share the best booking quote!`;

      const whatsappUrl = `https://wa.me/919811234567?text=${encodeURIComponent(waText)}`;
      setLeadSuccessInfo({ leadId: leadCode, whatsappUrl });
    } catch (err) {
      // Fallback direct WhatsApp link even if network hiccups
      const waText = `Namaste! I would like to book ${activePlan.destination} (${activePlan.duration}). Name: ${expertName}, Phone: ${expertPhone}.`;
      setLeadSuccessInfo({
        leadId: leadCode,
        whatsappUrl: `https://wa.me/919811234567?text=${encodeURIComponent(waText)}`,
      });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        {/* Workspace Top Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E6E0] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#173D32] text-[#B7955B] flex items-center justify-center font-bold text-xl shadow-sm border border-[#287C70]/30">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#173D32]">
                  AI Travel Concierge & Human Expert Desk
                </h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Live Engine
                </span>
              </div>
              <p className="text-xs text-[#737B76]">
                Conversational trip architect with instant live verification & 1-click WhatsApp specialist handoff
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {savedTripNotice && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                {savedTripNotice}
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveTrip}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-[#E7E6E0] text-[#173D32] bg-white hover:bg-[#FAF8F4] transition cursor-pointer shadow-xs"
            >
              💾 Save Plan
            </button>
            <button
              type="button"
              onClick={() => {
                setLeadSuccessInfo(null);
                setShowExpertModal(true);
              }}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#287C70] hover:bg-[#1f6258] text-white shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <span>📱</span>
              <span>Ask Expert on WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={handleTransferToCheckout}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#173D32] hover:bg-[#123128] text-white shadow-xs transition cursor-pointer"
            >
              Book Directly ➔
            </button>
          </div>
        </div>

        {/* Split Screen Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow items-start">
          {/* LEFT PANEL: Conversational Travel Agent (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E7E6E0] shadow-sm flex flex-col h-[720px] overflow-hidden">
            <div className="p-3.5 border-b border-[#E7E6E0] bg-[#FAF8F4] flex items-center justify-between">
              <span className="text-xs font-bold text-[#173D32] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>AI Chat Concierge</span>
              </span>
              <span className="text-[11px] text-[#287C70] font-bold">● Dedicated Human Safety Net</span>
            </div>

            {/* Chat Stream */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#173D32] text-white rounded-br-none"
                        : "bg-[#FAF8F4] border border-[#E7E6E0] text-[#242A28] rounded-bl-none shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Suggestions Chips */}
                    {msg.data?.suggestions && (
                      <div className="mt-3 pt-2 border-t border-[#E7E6E0]/60 space-y-1.5">
                        <span className="text-[10px] font-bold text-[#737B76] uppercase tracking-wider block">
                          Popular Itineraries & Routes:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.data.suggestions.map((sug, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleSendQuery(sug)}
                              className="text-left text-[11px] px-2.5 py-1 rounded-lg bg-white border border-[#E7E6E0] text-[#173D32] hover:border-[#287C70] transition font-medium"
                            >
                              💡 {sug}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#737B76] mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#737B76] p-3 rounded-xl bg-[#FAF8F4] max-w-[60%]">
                  <span className="w-2 h-2 rounded-full bg-[#173D32] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#173D32] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#173D32] animate-bounce [animation-delay:0.4s]"></span>
                  <span>Architecting custom trip...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-[#E7E6E0] bg-[#FAF8F4]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendQuery();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask any question, dates, PIN code or budget..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="flex-grow p-2.5 rounded-xl border border-[#E7E6E0] bg-white text-xs focus:outline-none focus:border-[#173D32]"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition cursor-pointer"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT PANEL: Interactive Trip Planner Workspace (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E7E6E0] shadow-sm p-6 h-[720px] overflow-y-auto space-y-6">
            {/* Header of Active Plan */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E6E0] gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B7955B]">
                  Tailored Trip Blueprint
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#173D32]">
                  {activePlan.destination}
                </h2>
                <p className="text-xs text-[#737B76]">{activePlan.duration} • 2 Guests • Verified Inventory</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#737B76]">Estimated Total Budget</span>
                <p className="font-serif text-2xl font-bold text-[#173D32]">
                  ₹{activePlan.totalBudget.toLocaleString("en-IN")}
                </p>
                <span className="text-[10px] text-[#287C70] font-medium">₹{(activePlan.totalBudget / 2).toLocaleString("en-IN")}/person all-inclusive</span>
              </div>
            </div>

            {/* Budget Breakdown Chart / Bars */}
            <div className="space-y-3 p-4 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0]">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#173D32]">Transparent Budget Breakdown</span>
                <span className="text-[#287C70] font-semibold text-[11px]">Zero Hidden Fees</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 rounded-full bg-[#E7E6E0] overflow-hidden flex">
                <div className="h-full bg-[#173D32]" style={{ width: "45%" }} title="Stays"></div>
                <div className="h-full bg-[#287C70]" style={{ width: "25%" }} title="Transport"></div>
                <div className="h-full bg-[#B7955B]" style={{ width: "22%" }} title="Activities"></div>
                <div className="h-full bg-stone-400" style={{ width: "8%" }} title="Buffer"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#173D32]"></span>
                  <span className="text-[#737B76]">Stays:</span>
                  <span className="font-bold text-[#173D32]">₹{activePlan.budgetBreakdown?.stay || 12000}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#287C70]"></span>
                  <span className="text-[#737B76]">Travel:</span>
                  <span className="font-bold text-[#173D32]">₹{activePlan.budgetBreakdown?.transport || 7500}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B7955B]"></span>
                  <span className="text-[#737B76]">Food/Tours:</span>
                  <span className="font-bold text-[#173D32]">₹{activePlan.budgetBreakdown?.food_and_activities || 6500}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-stone-400"></span>
                  <span className="text-[#737B76]">Buffer:</span>
                  <span className="font-bold text-[#173D32]">₹{activePlan.budgetBreakdown?.buffer || 1999}</span>
                </div>
              </div>
            </div>

            {/* Selected Accommodations & Transport Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-[#E7E6E0] space-y-1 bg-[#FAF8F4]/50">
                <span className="text-[10px] uppercase font-bold text-[#287C70]">Verified Accommodation</span>
                <h4 className="font-bold text-[#173D32]">{activePlan.selectedHotel}</h4>
                <p className="text-[11px] text-[#737B76]">Includes breakfast, hygiene checked & mountain view</p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#E7E6E0] space-y-1 bg-[#FAF8F4]/50">
                <span className="text-[10px] uppercase font-bold text-[#B7955B]">Dedicated Transport</span>
                <h4 className="font-bold text-[#173D32]">{activePlan.selectedTransport}</h4>
                <p className="text-[11px] text-[#737B76]">Hill-certified chauffeur with pre-cleared toll passes</p>
              </div>
            </div>

            {/* Day-by-Day Timeline */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#173D32]">
                Curated Day-by-Day Itinerary
              </h3>

              <div className="space-y-4 border-l-2 border-[#EDE5D8] pl-5 ml-2 text-xs">
                {activePlan.itinerary?.map((day) => (
                  <div key={day.day} className="relative space-y-1.5 group">
                    <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#173D32] border-2 border-white"></div>
                    <span className="text-[10px] uppercase font-bold text-[#B7955B] tracking-wider">
                      Day 0{day.day}
                    </span>
                    <h4 className="font-bold text-[#173D32] text-sm">{day.title}</h4>
                    <div className="space-y-1 text-[#242A28]/80 leading-relaxed bg-[#FAF8F4] p-3 rounded-xl border border-[#E7E6E0]">
                      <p><strong>🌅 Morning:</strong> {day.morning}</p>
                      <p><strong>☀️ Afternoon:</strong> {day.afternoon}</p>
                      <p><strong>🌙 Evening:</strong> {day.evening}</p>
                      <p className="text-[#287C70] font-medium"><strong>🍽️ Suggested Dining:</strong> {day.meal_recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="pt-4 border-t border-[#E7E6E0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-[#737B76]">Need customizations or instant quote?</span>
                <p className="font-bold text-xs text-[#173D32]">Human travel expert ready on WhatsApp</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLeadSuccessInfo(null);
                    setShowExpertModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#287C70] hover:bg-[#1f6258] text-white font-bold text-xs shadow-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>📱</span>
                  <span>WhatsApp Expert Quote</span>
                </button>
                <button
                  type="button"
                  onClick={handleTransferToCheckout}
                  className="px-5 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#123128] text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  Book Online ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* HUMAN EXPERT CONSULTATION & WHATSAPP MODAL */}
      {showExpertModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E7E6E0] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-[#E7E6E0] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B7955B] tracking-widest">
                  LORD OF THE ROAD CONCIERGE
                </span>
                <h3 className="font-serif text-xl font-bold text-[#173D32] mt-0.5">
                  Connect with a Dedicated Travel Expert
                </h3>
              </div>
              <button
                onClick={() => setShowExpertModal(false)}
                className="text-[#737B76] hover:text-black text-lg p-1"
              >
                ✕
              </button>
            </div>

            {!leadSuccessInfo ? (
              <form onSubmit={handleConnectExpertSubmit} className="space-y-4 text-xs">
                <p className="text-[#737B76]">
                  Our destination expert will verify stay dates, apply agent B2B rate discounts, and send a final confirmed PDF voucher to your WhatsApp.
                </p>

                <div className="p-3 bg-[#FAF8F4] border border-[#E7E6E0] rounded-xl flex justify-between items-center font-medium">
                  <div>
                    <span className="text-[#737B76] block text-[10px]">Trip Destination</span>
                    <b className="text-[#173D32]">{activePlan.destination} ({activePlan.duration})</b>
                  </div>
                  <div className="text-right">
                    <span className="text-[#737B76] block text-[10px]">Estimated Tariff</span>
                    <b className="text-[#287C70]">₹{activePlan.totalBudget.toLocaleString("en-IN")}</b>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-[#173D32] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={expertName}
                      onChange={(e) => setExpertName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#173D32] mb-1">WhatsApp Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={expertPhone}
                        onChange={(e) => setExpertPhone(e.target.value)}
                        placeholder="e.g. +91 98112 34567"
                        className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#173D32] mb-1">Pickup PIN Code (6-Digits)</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={expertPinCode}
                        onChange={(e) => setExpertPinCode(e.target.value)}
                        placeholder="e.g. 110001 (Delhi)"
                        className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#173D32] mb-1">Special Preferences / Customizations</label>
                    <textarea
                      rows={2}
                      value={expertNotes}
                      onChange={(e) => setExpertNotes(e.target.value)}
                      placeholder="e.g. Need river-facing room, prefer pure vegetarian meals, travelling with senior citizens."
                      className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowExpertModal(false)}
                    className="px-4 py-2 border border-[#E7E6E0] rounded-xl font-bold text-[#737B76] hover:bg-[#FAF8F4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="px-5 py-2 bg-[#287C70] hover:bg-[#1f6258] text-white rounded-xl font-bold transition shadow-xs flex items-center gap-1.5"
                  >
                    {isSubmittingLead ? "Connecting..." : "Open WhatsApp Chat ➔"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs py-2 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#173D32]">
                    Itinerary Dispatched to Concierge Desk!
                  </h4>
                  <p className="text-[#737B76] mt-1">
                    Reference ID: <span className="font-mono font-bold text-[#B7955B]">{leadSuccessInfo.leadId}</span>
                  </p>
                  <p className="text-xs text-[#242A28] mt-2">
                    Click below to open WhatsApp with your customized trip summary pre-loaded. Our expert will reply within 15 minutes.
                  </p>
                </div>

                <a
                  href={leadSuccessInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl text-sm transition shadow-sm"
                >
                  <span>💬</span>
                  <span>Chat with Travel Expert on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <CustomerFooter />
    </div>
  );
}
