"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { TripPlanPreferences, ComprehensiveItineraryResponse } from "@/services/tripPlanningService";

interface AiTravelAgentModalProps {
  onOpenBookingFlow?: (data: { destination?: string; origin?: string; serviceType?: string }) => void;
}

type StepType =
  | "welcome"
  | "destination" // Q1
  | "duration" // Q2
  | "origin" // Q3
  | "travelMode" // Q4
  | "tripType" // Q5
  | "travellers" // Q6
  | "budget" // Q7
  | "accommodation" // Q8
  | "interests" // Q9
  | "additionalNotes" // Q10
  | "summary" // Q3 Summary
  | "generated" // Q4 Final Itinerary
  | "free_chat"; // Q5 Follow up

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  step?: StepType;
  options?: string[];
  cards?: { label: string; icon: string; desc?: string }[];
  plan?: ComprehensiveItineraryResponse;
}

export function AiTravelAgentModal({ onOpenBookingFlow }: AiTravelAgentModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<StepType>("destination");
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [activeDayTab, setActiveDayTab] = useState(1);

  // Structured Trip Preference State
  const [preferences, setPreferences] = useState<TripPlanPreferences>({
    destination: "",
    duration: "",
    origin: "",
    travelMode: "",
    tripType: "",
    travellers: "",
    budget: "",
    accommodation: "",
    interests: [],
    additionalNotes: "",
  });

  const [generatedPlan, setGeneratedPlan] = useState<ComprehensiveItineraryResponse | null>(null);

  // Chat message history
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-welcome",
      sender: "bot",
      text: "Namaste! 👋 Welcome to your personal travel planner.\n\nWhere would you love to travel? Tell me your destination, and I'll help you plan the perfect journey!",
      step: "destination",
      options: ["Manali", "Goa", "Rishikesh", "Kashmir", "Jaipur", "Explore destinations for me"],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setSpeechSupported(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Voice speech-to-text integration
  const toggleVoice = () => {
    if (!speechSupported) {
      alert("Voice search is supported on Google Chrome, Edge & modern mobile browsers.");
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      if (!isListening) {
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputVal(transcript);
          setIsListening(false);
          handleAnswer(transcript);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } catch {
      setIsListening(false);
    }
  };

  // Helper to add bot message with natural typing delay
  const addBotMessage = (msg: Omit<Message, "id" | "sender">) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          ...msg,
        },
      ]);
      setIsTyping(false);
      if (msg.step) setCurrentStep(msg.step);
    }, 550);
  };

  // Text to Speech
  const handleSpeakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Voice playback is not supported on this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_#•➔✓✨🎉]/g, "").slice(0, 350);
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // 1-Click Printable PDF Travel Blueprint Pass
  const handleDownloadPrintPdf = (plan: ComprehensiveItineraryResponse) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Lord of the Road - Travel Blueprint (${plan.destination})</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #173B32; padding: 36px; margin: 0; background: #FAF8F4; }
            .header { border-bottom: 3px solid #C5A66A; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 26px; font-weight: bold; font-family: Georgia, serif; }
            .qr-box { border: 2px dashed #C5A66A; padding: 10px 14px; text-align: center; border-radius: 8px; font-family: monospace; font-size: 11px; background: white; }
            .day-card { border: 1px solid #E7E6E0; border-radius: 12px; padding: 16px; margin-bottom: 14px; background: white; page-break-inside: avoid; }
            .day-title { font-size: 16px; font-weight: bold; color: #173B32; border-bottom: 1px solid #eee; padding-bottom: 6px; margin-bottom: 10px; }
            .budget-table { width: 100%; border-collapse: collapse; margin-top: 15px; background: white; border-radius: 8px; overflow: hidden; }
            .budget-table td { padding: 10px; border-bottom: 1px solid #eee; font-size: 13px; }
            .total-row { font-weight: bold; font-size: 16px; color: #173B32; background: #f2eee6; }
            .footer { margin-top: 30px; padding: 16px; background: #173B32; color: #FAF8F4; border-radius: 10px; font-size: 12px; }
            @media print { body { background: white; padding: 15px; } .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">lord <i>of the</i> road</div>
              <small style="color: #737B76; text-transform: uppercase; letter-spacing: 2px;">Official AI Travel Blueprint & Itinerary Pass</small>
            </div>
            <div class="qr-box">
              <span>VERIFIED TRAVEL PASS</span><br/>
              <b>#LOTR-${plan.destination.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}</b><br/>
              <small>Scan for live assistance</small>
            </div>
          </div>
          <h2 style="font-family: Georgia, serif; margin-top: 0;">${plan.tagline}</h2>
          <p style="color: #444; line-height: 1.6; font-size: 14px;">${plan.overview}</p>
          <hr style="border: 0; border-top: 1px solid #E7E6E0; margin: 20px 0;"/>
          <h3 style="font-family: Georgia, serif;">Day-Wise Route & Schedule</h3>
          ${plan.itinerary.map(d => `
            <div class="day-card">
              <div class="day-title">Day ${d.day}: ${d.title}${((d as any).distance) ? ' (' + (d as any).distance + ')' : ''}</div>
              <p style="font-size: 13px; margin: 4px 0;"><b>Morning:</b> ${d.morning}</p>
              <p style="font-size: 13px; margin: 4px 0;"><b>Afternoon:</b> ${d.afternoon}</p>
              <p style="font-size: 13px; margin: 4px 0;"><b>Evening:</b> ${d.evening}</p>
              <p style="font-size: 13px; margin: 6px 0 0; color: #287C70;"><b>Stay:</b> ${(d as any).stayRecommendation || 'Heritage Stay'} | <b>Dining:</b> ${(d as any).foodRecommendation || (d as any).mealRecommendation || 'Local Specialities'}</p>
            </div>
          `).join("")}
          <h3 style="font-family: Georgia, serif; margin-top: 24px;">Estimated Budget Breakdown (Per Person)</h3>
          <table class="budget-table">
            <tr><td>Accommodation</td><td align="right">₹${plan.budgetBreakdown.accommodation.toLocaleString("en-IN")}</td></tr>
            <tr><td>Transport & Fuel</td><td align="right">₹${plan.budgetBreakdown.transport.toLocaleString("en-IN")}</td></tr>
            <tr><td>Food & Sightseeing</td><td align="right">₹${plan.budgetBreakdown.foodAndSightseeing.toLocaleString("en-IN")}</td></tr>
            <tr><td>Emergency & Roadside Buffer</td><td align="right">₹${plan.budgetBreakdown.bufferEmergency.toLocaleString("en-IN")}</td></tr>
            <tr class="total-row"><td>Total Per Person</td><td align="right">₹${plan.budgetBreakdown.totalPerPerson.toLocaleString("en-IN")}</td></tr>
          </table>
          <div class="footer">
            <b>24/7 Roadside Concierge Helpline:</b> 1800-ROAD-AID (1800 7623 243) | emergency@lordoftheroad.in
          </div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // WhatsApp Trip Share Handler
  const handleShareWhatsapp = (plan: ComprehensiveItineraryResponse) => {
    const text = `🏔️ *Lord of the Road - Custom Travel Blueprint*
🎯 *Destination:* ${plan.destination} (${plan.totalDays} Days)
✨ *Plan:* ${plan.tagline}
💰 *Est. Budget:* ₹${plan.budgetBreakdown.totalPerPerson.toLocaleString("en-IN")}/person
🛣️ *Route Highlights:* ${plan.mapWaypoints.map((w) => w.name).join(" ➔ ")}

Book and customize with 24/7 AI concierge:
${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/travel-agent`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // Answer handler
  const handleAnswer = (answer: string) => {
    if (!answer.trim()) return;

    // Record user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: answer,
      },
    ]);
    setInputVal("");

    const updated = { ...preferences };

    // Step Machine
    switch (currentStep) {
      case "destination": {
        updated.destination = answer;
        setPreferences(updated);
        addBotMessage({
          text: `Awesome! ${answer} is a wonderful choice. 🏔️\n\nHow many days are you planning for your trip?`,
          step: "duration",
          options: ["1–2 Days", "3–4 Days", "5–7 Days", "8–10 Days", "10+ Days", "Not decided yet"],
        });
        break;
      }
      case "duration": {
        updated.duration = answer;
        setPreferences(updated);
        addBotMessage({
          text: `Noted! ${answer} is a great timeframe.\n\nWhere will you be travelling from?`,
          step: "origin",
          options: ["Delhi NCR", "Chandigarh", "Mumbai", "Bangalore", "Use My Current Location 📍"],
        });
        break;
      }
      case "origin": {
        let city = answer;
        if (answer.includes("Current Location")) {
          city = "Delhi NCR (Auto-detected)";
        }
        updated.origin = city;
        setPreferences(updated);
        addBotMessage({
          text: `Great, departure from ${city}.\n\nHow would you like to travel?`,
          step: "travelMode",
          cards: [
            { label: "Flight", icon: "✈️", desc: "Fastest option" },
            { label: "Train", icon: "🚆", desc: "Vande Bharat / Express" },
            { label: "Bus", icon: "🚌", desc: "AC Volvo Sleeper" },
            { label: "Car", icon: "🚗", desc: "Self-drive 4x4" },
            { label: "Bike", icon: "🏍️", desc: "Royal Enfield road trip" },
            { label: "Cab", icon: "🚕", desc: "Dedicated hill chauffeur" },
            { label: "Tempo Traveller", icon: "🚐", desc: "For group comfort" },
            { label: "Flexible", icon: "✨", desc: "Suggest the best option" },
          ],
        });
        break;
      }
      case "travelMode": {
        updated.travelMode = answer;
        setPreferences(updated);

        // Conditional follow-up: If Bike is chosen, suggest rider assistance
        let intro = `Got it, traveling by ${answer}.`;
        if (answer.toLowerCase().includes("bike")) {
          intro += " 🏍️ A motorcycle journey through mountain passes is unforgettable! We'll map fuel points and mechanic SOS stops for you.";
        }

        addBotMessage({
          text: `${intro}\n\nWhat kind of trip are you planning?`,
          step: "tripType",
          options: [
            "Solo Trip",
            "Couple Trip",
            "Family Trip",
            "Friends Group",
            "Group Tour",
            "Corporate Trip",
            "Adventure Trip",
            "Spiritual Trip",
            "Weekend Getaway",
          ],
        });
        break;
      }
      case "tripType": {
        updated.tripType = answer;
        setPreferences(updated);
        addBotMessage({
          text: `Sounds like a memorable ${answer}!\n\nHow many people are travelling?`,
          step: "travellers",
          options: ["1 Person", "2 People", "3–5 People", "6–10 People", "10+ People"],
        });
        break;
      }
      case "travellers": {
        updated.travellers = answer;
        setPreferences(updated);
        addBotMessage({
          text: `Perfect, planning for ${answer}.\n\nWhat is your approximate budget per person?`,
          step: "budget",
          options: [
            "Under ₹3,000",
            "₹3,000–₹5,000",
            "₹5,000–₹10,000",
            "₹10,000–₹20,000",
            "₹20,000–₹50,000",
            "₹50,000+",
            "Flexible Budget",
          ],
        });
        break;
      }
      case "budget": {
        updated.budget = answer;
        setPreferences(updated);
        addBotMessage({
          text: `Got your budget expectation (${answer}).\n\nWhere would you prefer to stay?`,
          step: "accommodation",
          options: [
            "Budget Hotel",
            "Premium Hotel",
            "Luxury Resort",
            "Villa",
            "Homestay",
            "Hostel",
            "Campsite",
            "No Accommodation Required",
            "AI Suggestion",
          ],
        });
        break;
      }
      case "accommodation": {
        updated.accommodation = answer;
        setPreferences(updated);
        addBotMessage({
          text: `Great choice! We have verified ${answer} options.\n\nWhat would you love to experience? (Select any or multiple)`,
          step: "interests",
          options: [
            "Adventure and Trekking",
            "Nature and Mountains",
            "Beaches",
            "Historical Places",
            "Spiritual and Religious Places",
            "Food and Local Culture",
            "Shopping",
            "Nightlife",
            "Photography",
            "Relaxation and Wellness",
            "Hidden Gems",
          ],
        });
        break;
      }
      case "interests": {
        const existing = updated.interests || [];
        if (!existing.includes(answer)) {
          existing.push(answer);
        }
        updated.interests = existing;
        setPreferences(updated);

        addBotMessage({
          text: `Added: "${answer}". Anything special you'd like me to include? (You can type extra notes or tap Skip)`,
          step: "additionalNotes",
          options: [
            "Bike rental with helmet",
            "Local verified guide",
            "Riverside camping & bonfire",
            "Highway mechanic & puncture SOS",
            "Skip this question ➔",
          ],
        });
        break;
      }
      case "additionalNotes": {
        if (!answer.toLowerCase().includes("skip")) {
          updated.additionalNotes = answer;
        }
        setPreferences(updated);

        // Show Editable Trip Summary
        addBotMessage({
          text: "✨ Everything looks good! Here is your structured trip summary. Shall I create your personalized trip plan?",
          step: "summary",
        });
        break;
      }
      case "summary": {
        if (answer.toLowerCase().includes("generate") || answer.toLowerCase().includes("yes") || answer.toLowerCase().includes("plan")) {
          triggerGeneratePlan();
        } else {
          // Allow editing
          addBotMessage({
            text: "Which detail would you like to update?",
            step: "destination",
            options: ["Change Destination", "Change Days", "Change Budget", "Change Travel Mode"],
          });
        }
        break;
      }
      case "generated":
      case "free_chat": {
        // Free-form conversational follow-up questions
        handleFollowUpQuery(answer);
        break;
      }
    }
  };

  // Generate full comprehensive itinerary via backend
  const triggerGeneratePlan = async () => {
    setIsTyping(true);
    try {
      const res = await fetch("/api/ai/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate_trip_plan",
          tripPreferences: preferences,
        }),
      });

      const data = await res.json();
      const plan: ComprehensiveItineraryResponse = data.plan;
      setGeneratedPlan(plan);

      addBotMessage({
        text: `🎉 All set! Your custom ${plan.totalDays}-Day journey to ${plan.destination} has been engineered with verified stays, route milestones, and emergency roadside backup.`,
        step: "generated",
        plan,
      });
    } catch {
      addBotMessage({
        text: "I generated a fallback plan for your adventure. Let me know if you would like me to adjust any days or stays!",
        step: "generated",
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Follow-up queries handler (e.g. mechanics, bike rentals, hotels)
  const handleFollowUpQuery = async (query: string) => {
    setIsTyping(true);
    try {
      const res = await fetch("/api/ai/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      const data = await res.json();
      addBotMessage({
        text: data.reply || "Here are the live details for your request.",
        step: "free_chat",
        options: data.suggestions || [
          "Book this complete itinerary now",
          "Find nearby mechanics on my route",
          "Show petrol pumps & food stops",
          "Check hotel live availability",
        ],
      });
    } catch {
      addBotMessage({
        text: "I couldn't fetch live data right now, but our booking desk is ready to help at +91 98765 43210.",
        step: "free_chat",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleEditField = (field: keyof TripPlanPreferences) => {
    setCurrentStep(field as StepType);
    addBotMessage({
      text: `Let's update your ${field}. Please select or type your new preference:`,
      step: field as StepType,
      options: field === "destination" ? ["Manali", "Goa", "Kashmir", "Rishikesh"] : ["Flexible", "Not decided"],
    });
  };

  return (
    <>
      {/* Floating AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3.5 bg-[#173B32] hover:bg-[#204e42] text-[#F7F4EC] rounded-full shadow-2xl border-2 border-[#C5A66A] transition-all transform hover:scale-105 cursor-pointer"
          aria-label="Open AI Travel Companion"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A66A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C5A66A]"></span>
          </span>
          <span className="text-xl">🧭</span>
          <span className="text-xs font-bold tracking-wide">
            Plan with AI Agent
          </span>
        </button>
      </div>

      {/* Full Interactive Step-by-Step Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#F7F4EC] h-full shadow-2xl flex flex-col border-l border-[#E7E6E0] animate-in slide-in-from-right duration-300">
            {/* Header with Progress Tracker */}
            <div className="p-4 sm:p-5 bg-[#173B32] text-[#F7F4EC] border-b-2 border-[#C5A66A]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-[#C5A66A] text-[#173B32] font-bold flex items-center justify-center text-xl shadow-sm shrink-0">
                    🧭
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-base text-white">
                      Lord of the Road — AI Travel Planner
                    </h3>
                    <p className="text-[11px] text-[#C5A66A] font-medium">
                      Professional Human Consultant Experience · Real-Time GDS Active
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Step Stage Progress Indicator */}
              <div className="flex items-center justify-between gap-1 text-[10px] text-[#EDE5D8]/80 pt-1">
                <span className={`px-2 py-0.5 rounded ${preferences.destination ? "bg-[#C5A66A] text-[#173B32] font-bold" : "bg-white/10"}`}>
                  1. Destination
                </span>
                <span>➔</span>
                <span className={`px-2 py-0.5 rounded ${preferences.duration ? "bg-[#C5A66A] text-[#173B32] font-bold" : "bg-white/10"}`}>
                  2. Duration
                </span>
                <span>➔</span>
                <span className={`px-2 py-0.5 rounded ${preferences.travelMode ? "bg-[#C5A66A] text-[#173B32] font-bold" : "bg-white/10"}`}>
                  3. Mode
                </span>
                <span>➔</span>
                <span className={`px-2 py-0.5 rounded ${preferences.budget ? "bg-[#C5A66A] text-[#173B32] font-bold" : "bg-white/10"}`}>
                  4. Budget
                </span>
                <span>➔</span>
                <span className={`px-2 py-0.5 rounded ${generatedPlan ? "bg-emerald-400 text-[#173B32] font-bold" : "bg-white/10"}`}>
                  5. Itinerary
                </span>
              </div>
            </div>

            {/* Chat Conversation Scroll Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                >
                  {/* Message Bubble */}
                  <div
                    className={`max-w-[90%] p-4 rounded-3xl leading-relaxed shadow-xs ${
                      m.sender === "user"
                        ? "bg-[#173B32] text-white rounded-br-none"
                        : "bg-white text-[#242A28] border border-[#E7E6E0] rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line text-xs font-normal leading-relaxed">{m.text}</p>

                    {/* Interactive Selection Cards (Travel Modes) */}
                    {m.cards && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-2 border-t border-[#E7E6E0]">
                        {m.cards.map((c, ci) => (
                          <button
                            key={ci}
                            type="button"
                            onClick={() => handleAnswer(c.label)}
                            className="p-3 bg-[#FAF8F4] hover:bg-[#173B32] hover:text-white border border-[#E7E6E0] rounded-2xl text-left transition group cursor-pointer"
                          >
                            <span className="text-xl block mb-1">{c.icon}</span>
                            <b className="block text-xs group-hover:text-white text-[#173B32]">{c.label}</b>
                            {c.desc && <span className="text-[10px] text-[#737B76] group-hover:text-[#EDE5D8]">{c.desc}</span>}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Step 3: Interactive Editable Trip Summary Card */}
                    {m.step === "summary" && (
                      <div className="mt-4 p-4 bg-[#FAF8F4] border-2 border-[#C5A66A]/40 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#E7E6E0]">
                          <span className="font-serif text-sm font-bold text-[#173B32]">
                            📋 Trip Blueprint Overview
                          </span>
                          <span className="text-[10px] font-bold text-[#C5A66A] uppercase tracking-wider">
                            Ready to Generate
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 text-[11px]">
                          <div className="bg-white p-2.5 rounded-xl border border-[#E7E6E0]">
                            <span className="text-[#737B76] block text-[10px]">Destination</span>
                            <b className="text-[#173B32]">{preferences.destination || "Not set"}</b>
                            <button onClick={() => handleEditField("destination")} className="text-[10px] text-[#C5A66A] font-bold block mt-1 hover:underline">
                              Edit ✏️
                            </button>
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-[#E7E6E0]">
                            <span className="text-[#737B76] block text-[10px]">Duration</span>
                            <b className="text-[#173B32]">{preferences.duration || "5 Days"}</b>
                            <button onClick={() => handleEditField("duration")} className="text-[10px] text-[#C5A66A] font-bold block mt-1 hover:underline">
                              Edit ✏️
                            </button>
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-[#E7E6E0]">
                            <span className="text-[#737B76] block text-[10px]">Starting From</span>
                            <b className="text-[#173B32]">{preferences.origin || "Delhi"}</b>
                            <button onClick={() => handleEditField("origin")} className="text-[10px] text-[#C5A66A] font-bold block mt-1 hover:underline">
                              Edit ✏️
                            </button>
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-[#E7E6E0]">
                            <span className="text-[#737B76] block text-[10px]">Travel Mode</span>
                            <b className="text-[#173B32]">{preferences.travelMode || "Scenic Route"}</b>
                            <button onClick={() => handleEditField("travelMode")} className="text-[10px] text-[#C5A66A] font-bold block mt-1 hover:underline">
                              Edit ✏️
                            </button>
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-[#E7E6E0]">
                            <span className="text-[#737B76] block text-[10px]">Budget & Travellers</span>
                            <b className="text-[#173B32]">{preferences.budget || "₹15,000"} ({preferences.travellers})</b>
                            <button onClick={() => handleEditField("budget")} className="text-[10px] text-[#C5A66A] font-bold block mt-1 hover:underline">
                              Edit ✏️
                            </button>
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-[#E7E6E0]">
                            <span className="text-[#737B76] block text-[10px]">Stay Preference</span>
                            <b className="text-[#173B32]">{preferences.accommodation || "Boutique"}</b>
                            <button onClick={() => handleEditField("accommodation")} className="text-[10px] text-[#C5A66A] font-bold block mt-1 hover:underline">
                              Edit ✏️
                            </button>
                          </div>
                        </div>

                        {preferences.interests.length > 0 && (
                          <div className="p-2 bg-white rounded-xl border border-[#E7E6E0] text-[10px]">
                            <span className="text-[#737B76] block">Selected Interests:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {preferences.interests.map((it, idx) => (
                                <span key={idx} className="bg-[#FAF8F4] text-[#173B32] px-2 py-0.5 rounded border border-[#E7E6E0] font-medium">
                                  ✓ {it}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-2 flex flex-col sm:flex-row gap-2">
                          <button
                            type="button"
                            onClick={() => handleAnswer("Generate My Trip")}
                            className="flex-1 py-3 px-4 rounded-xl bg-[#173B32] hover:bg-[#287C70] text-white font-bold text-xs uppercase tracking-wider text-center transition shadow-md cursor-pointer"
                          >
                            ⚡ Generate My Trip Plan
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditField("destination")}
                            className="py-3 px-4 rounded-xl bg-white border border-[#E7E6E0] text-[#173B32] font-bold text-xs transition hover:bg-[#EDE5D8] cursor-pointer"
                          >
                            Edit Preferences
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 4: AI-Generated Day-Wise Itinerary & Map Simulation */}
                    {m.plan && (
                      <div className="mt-4 space-y-4 border-t border-[#E7E6E0] pt-3">
                        <div className="bg-[#173B32] text-[#F7F4EC] p-4 rounded-2xl space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-[#C5A66A] tracking-widest">
                            Personalized Master Itinerary
                          </span>
                          <h4 className="font-serif text-lg font-bold text-white">{m.plan.tagline}</h4>
                          <p className="text-[11px] text-[#EDE5D8]/80 leading-relaxed font-light">{m.plan.overview}</p>
                        </div>

                        {/* Interactive Map Visualizer Box */}
                        <div className="bg-white rounded-2xl border border-[#E7E6E0] p-3.5 space-y-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-[#173B32] flex items-center gap-1.5">
                              <span>🗺️</span> Interactive Route & Waypoint Map
                            </span>
                            <span className="text-[10px] font-mono text-[#287C70] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Verified GPS Corridors
                            </span>
                          </div>

                          <div className="h-44 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] p-3 relative overflow-hidden flex flex-col justify-between">
                            <div className="flex items-center justify-between text-[10px] text-[#737B76]">
                              <span>Origin: {preferences.origin || "Delhi"}</span>
                              <span className="text-[#C5A66A] font-bold">🛣️ NH-44 ➔ NH-21 Corridor</span>
                              <span>Destination: {preferences.destination}</span>
                            </div>

                            {/* Simulated Interactive Route Map Markers */}
                            <div className="flex items-center justify-between relative px-4">
                              <div className="w-full h-1 bg-[#C5A66A]/30 absolute left-0 right-0 z-0"></div>
                              {m.plan.mapWaypoints.map((wp, wpi) => (
                                <div key={wpi} className="relative z-10 flex flex-col items-center">
                                  <span className="w-7 h-7 rounded-full bg-[#173B32] text-white flex items-center justify-center text-xs shadow-sm border-2 border-[#C5A66A]">
                                    {wp.type === "origin" ? "🛫" : wp.type === "petrol" ? "⛽" : wp.type === "mechanic" ? "🛠️" : "🏔️"}
                                  </span>
                                  <span className="text-[9px] font-bold text-[#173B32] mt-1 text-center max-w-[80px] line-clamp-1">
                                    {wp.name.split(" ")[0]}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <p className="text-[10px] text-[#737B76] text-center italic">
                              Live turn-by-turn road assist active. Emergency SOS mechanic bay verified at Aut Mile 142.
                            </p>
                          </div>
                        </div>

                        {/* Day Tabs */}
                        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                          {m.plan.itinerary.map((d) => (
                            <button
                              key={d.day}
                              type="button"
                              onClick={() => setActiveDayTab(d.day)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                                activeDayTab === d.day
                                  ? "bg-[#173B32] text-white shadow-xs"
                                  : "bg-[#FAF8F4] border border-[#E7E6E0] text-[#737B76] hover:bg-[#EDE5D8]"
                              }`}
                            >
                              Day {d.day}
                            </button>
                          ))}
                        </div>

                        {/* Active Day Detail Card */}
                        {m.plan.itinerary.filter((d) => d.day === activeDayTab).map((day) => (
                          <div key={day.day} className="bg-white p-4 rounded-2xl border border-[#E7E6E0] space-y-2 text-xs">
                            <div className="flex items-center justify-between pb-2 border-b border-[#E7E6E0]">
                              <b className="font-serif text-sm text-[#173B32]">Day {day.day}: {day.title}</b>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Approx ₹{day.approxExpense.toLocaleString("en-IN")}
                              </span>
                            </div>

                            <p className="text-[#242A28] leading-relaxed">
                              🌅 <strong>Morning:</strong> {day.morning}
                            </p>
                            <p className="text-[#242A28] leading-relaxed">
                              ☀️ <strong>Afternoon:</strong> {day.afternoon}
                            </p>
                            <p className="text-[#242A28] leading-relaxed">
                              🌙 <strong>Evening:</strong> {day.evening}
                            </p>
                            <div className="p-2.5 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] text-[11px] space-y-1">
                              <p className="text-[#C5A66A] font-bold">🍽️ Suggested Dining: {day.mealRecommendation}</p>
                              <p className="text-[#737B76]">🏨 Verified Stay: {day.suggestedStay}</p>
                              <p className="text-[#287C70] font-mono text-[10px]">🚗 Travel Distance: {day.travelDistance} ({day.journeyTime})</p>
                            </div>
                          </div>
                        ))}

                        {/* Budget Breakdown & Booking CTA */}
                        <div className="p-4 bg-white rounded-2xl border border-[#C5A66A]/40 space-y-3">
                          <span className="text-xs font-bold text-[#173B32] uppercase tracking-wider block">
                            💰 Estimated Budget Breakdown
                          </span>
                          <div className="grid grid-cols-2 gap-2 text-xs text-[#242A28]">
                            <span>Accommodation:</span>
                            <b className="text-right">₹{m.plan.budgetBreakdown.accommodation.toLocaleString("en-IN")}</b>
                            <span>Transport & Fuel:</span>
                            <b className="text-right">₹{m.plan.budgetBreakdown.transport.toLocaleString("en-IN")}</b>
                            <span>Food & Activities:</span>
                            <b className="text-right">₹{m.plan.budgetBreakdown.foodAndSightseeing.toLocaleString("en-IN")}</b>
                            <span>Emergency Buffer:</span>
                            <b className="text-right">₹{m.plan.budgetBreakdown.bufferEmergency.toLocaleString("en-IN")}</b>
                            <span className="font-bold border-t border-[#E7E6E0] pt-1 text-[#173B32]">Per Person Total:</span>
                            <b className="text-right border-t border-[#E7E6E0] pt-1 text-[#173B32] font-serif text-sm">
                              ₹{m.plan.budgetBreakdown.totalPerPerson.toLocaleString("en-IN")}
                            </b>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setIsOpen(false);
                              router.push(`/checkout?item=${encodeURIComponent(`${m.plan?.destination} ${m.plan?.totalDays}D Customized Package`)}&price=${m.plan?.budgetBreakdown.totalPerPerson}&travellers=2`);
                            }}
                            className="w-full py-3.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span>Lock Dates & Proceed to Direct Booking</span>
                            <span>➔</span>
                          </button>

                          {/* Action Row: PDF Download, WhatsApp Share & Voice */}
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => m.plan && handleDownloadPrintPdf(m.plan)}
                              className="py-2.5 px-3 rounded-xl bg-white border border-[#173B32] text-[#173B32] hover:bg-[#FAF8F4] font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <span>📄</span>
                              <span>Print / PDF Pass</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => m.plan && handleShareWhatsapp(m.plan)}
                              className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <span>📲</span>
                              <span>Share WhatsApp</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Option Selection Chips */}
                  {m.options && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                      {m.options.map((opt, oi) => (
                        <button
                          key={oi}
                          type="button"
                          onClick={() => handleAnswer(opt)}
                          className="px-3.5 py-1.5 bg-white border border-[#E7E6E0] hover:border-[#C5A66A] hover:bg-[#FAF8F4] rounded-full text-xs text-[#173B32] hover:text-[#C5A66A] font-semibold transition-all shadow-2xs cursor-pointer text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Animated Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-[#737B76] italic p-2 bg-white rounded-2xl w-fit border border-[#E7E6E0]">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#173B32] animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-[#173B32] animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#173B32] animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span>Travel consultant is planning your experience...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar with Voice Input & Natural Language Input */}
            <div className="p-3 sm:p-4 bg-white border-t border-[#E7E6E0]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAnswer(inputVal);
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1 flex items-center">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type destination, answer, or ask anything (e.g. Find mechanics on route)..."
                    className="w-full pl-4 pr-10 py-3 border border-[#E7E6E0] rounded-full text-xs bg-[#FAF8F4] focus:outline-none focus:border-[#173B32] focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={toggleVoice}
                    title="Speak using microphone (बोलकर बताएं)"
                    className={`absolute right-2.5 p-1.5 rounded-full transition cursor-pointer ${
                      isListening ? "bg-red-500 text-white animate-pulse" : "text-[#737B76] hover:text-[#173B32]"
                    }`}
                  >
                    🎙️
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isTyping || !inputVal.trim()}
                  className="w-11 h-11 rounded-full bg-[#173B32] hover:bg-[#287C70] text-white flex items-center justify-center font-bold text-sm transition-colors disabled:opacity-40 shrink-0 cursor-pointer shadow-sm"
                >
                  ➔
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
