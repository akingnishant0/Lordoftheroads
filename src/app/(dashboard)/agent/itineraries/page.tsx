"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AgentItinerariesPage() {
  const [itineraries, setItineraries] = useState([
    {
      id: "ITN-101",
      title: "Kashmir 6D5N Royal Houseboat & Gondola",
      dest: "Kashmir Valley",
      duration: "6D / 5N",
      createdFor: "Vikram Malhotra",
      status: "Ready for Client",
      price: "₹34,500/pax",
    },
    {
      id: "ITN-102",
      title: "Kerala Backwaters & Munnar Tea Mist",
      dest: "Kerala Backwaters",
      duration: "5D / 4N",
      createdFor: "Ananya Iyer",
      status: "Client Approved",
      price: "₹24,800/pax",
    },
    {
      id: "ITN-103",
      title: "Dubai Red Dunes & Luxury Marina Yacht",
      dest: "Dubai (UAE)",
      duration: "5D / 4N",
      createdFor: "Sameer Joshi",
      status: "Draft",
      price: "₹52,000/pax",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Itinerary Designer & Library
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Client Travel Itineraries
          </h1>
          <p className="text-xs text-gray-500">
            Create branded day-by-day travel schedules with photos, stay inclusions, and custom pricing.
          </p>
        </div>

        <Link
          href="/travel-agent"
          className="px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold shadow-sm transition"
        >
          🤖 Generate with AI Concierge
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itineraries.map((itn) => (
          <div key={itn.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>📍 {itn.dest}</span>
                <span className="font-mono font-bold">{itn.id}</span>
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1">{itn.title}</h3>
              <p className="text-xs text-gray-500">Prepared for: <strong>{itn.createdFor}</strong></p>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-gray-400">Duration</span>
                <p className="font-bold text-gray-800">{itn.duration}</p>
              </div>
              <div className="text-right">
                <span className="text-gray-400">Rate</span>
                <p className="font-bold text-emerald-700">{itn.price}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                itn.status === "Client Approved" ? "bg-emerald-50 text-emerald-800" : "bg-blue-50 text-blue-800"
              }`}>
                {itn.status}
              </span>
              <a
                href={`https://wa.me/?text=Here+is+your+itinerary+for+${encodeURIComponent(itn.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#173D32] hover:underline"
              >
                Share on WhatsApp ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
