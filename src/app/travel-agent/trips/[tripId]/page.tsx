"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";

interface PageProps {
  params: Promise<{ tripId: string }>;
}

export default function SavedAiTripWorkspace({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const tripId = resolvedParams.tripId;

  const [tripPlan, setTripPlan] = useState<any>({
    destination: "Kashmir Valley",
    duration: "6 Days / 5 Nights",
    totalBudget: 27999,
    itinerary: [
      { day: 1, title: "Srinagar Arrival & Dal Lake Shikara", morning: "Pickup & cedar houseboat check-in", afternoon: "Floating markets walk", evening: "Sunset shikara cruise" },
      { day: 2, title: "Gulmarg Gondola Expedition", morning: "Drive past apple orchards", afternoon: "Ascend to Phase 2 (13,780 ft)", evening: "Kehwa by alpine fire" },
      { day: 3, title: "Pahalgam Valley & Betaab", morning: "Pampore saffron fields trail", afternoon: "Lidder river stroll", evening: "Pine glade resort stay" },
    ],
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lotr_saved_ai_trips");
      if (stored) {
        const parsed = JSON.parse(stored);
        const match = parsed.find((item: any) => item.id === tripId);
        if (match && match.plan) {
          setTripPlan(match.plan);
        }
      }
    } catch (e) {}
  }, [tripId]);

  const handleCheckout = () => {
    router.push(
      `/checkout?item=${encodeURIComponent(tripPlan.destination + " (" + tripPlan.duration + ")")}&price=${tripPlan.totalBudget}&travellers=2`
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Link href="/travel-agent" className="text-xs font-semibold text-[#173D32] hover:underline">
              ← Return to AI Concierge Workspace
            </Link>
            <span className="text-xs font-mono font-bold text-[#737B76]">Workspace Reference: #{tripId}</span>
          </div>

          <div className="bg-white rounded-3xl border border-[#E7E6E0] p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E7E6E0] gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
                  Saved AI Custom Journey
                </span>
                <h1 className="font-serif text-3xl font-bold text-[#173D32] mt-1">
                  {tripPlan.destination}
                </h1>
                <p className="text-xs text-[#737B76] mt-1">{tripPlan.duration} • Customized for 2 Travellers</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#737B76]">Calculated Budget</span>
                <p className="font-serif text-2xl font-bold text-[#173D32]">
                  ₹{Number(tripPlan.totalBudget).toLocaleString("en-IN")}
                </p>
                <span className="text-[11px] text-[#287C70] font-medium">Verified Live Availability</span>
              </div>
            </div>

            {/* Day Itinerary */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#173D32]">Day-by-Day Schedule</h3>
              <div className="space-y-3">
                {tripPlan.itinerary?.map((day: any) => (
                  <div key={day.day} className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#B7955B]">Day 0{day.day}</span>
                    <h4 className="font-bold text-sm text-[#173D32]">{day.title}</h4>
                    <p className="text-xs text-[#242A28]/80 leading-relaxed">
                      {day.morning} • {day.afternoon} • {day.evening}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E7E6E0] flex items-center justify-between">
              <Link
                href={`/travel-agent?prompt=Modify+trip+${tripId}+for+${encodeURIComponent(tripPlan.destination)}`}
                className="px-4 py-2.5 rounded-xl border border-[#173D32] text-[#173D32] hover:bg-[#FAF8F4] text-xs font-semibold"
              >
                🤖 Ask AI to Modify Days
              </Link>

              <button
                type="button"
                onClick={handleCheckout}
                className="px-6 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold shadow-sm transition"
              >
                Proceed to Checkout ➔
              </button>
            </div>
          </div>
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}
