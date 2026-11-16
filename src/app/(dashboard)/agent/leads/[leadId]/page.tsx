"use client";

import React, { useState, use } from "react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ leadId: string }>;
}

export default function AgentLeadDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const leadId = resolvedParams.leadId;

  const [lead, setLead] = useState({
    id: leadId,
    name: "Vikram Malhotra",
    phone: "+91 98112 34567",
    email: "vikram.m@gmail.com",
    destination: "Kashmir Valley",
    dates: "15 April – 21 April 2026",
    travellers: "4 Adults + 1 Child",
    budget: "₹1,20,000",
    stage: "Requirements Gathered",
    notes: [
      { date: "Today 10:45 AM", text: "Client requested cedar wood houseboat on Dal Lake and Gondola Phase 2 for Gulmarg." },
      { date: "Yesterday 4:20 PM", text: "Spoke with client on phone. Prefers Innova Crysta for all 6 days." },
    ],
  });

  const [newNote, setNewNote] = useState("");

  const stages = [
    "New Lead",
    "Contacted",
    "Requirements Gathered",
    "Itinerary Drafted",
    "Quotation Sent",
    "Booking Confirmed",
  ];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setLead({
      ...lead,
      notes: [{ date: "Just now", text: newNote.trim() }, ...lead.notes],
    });
    setNewNote("");
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link href="/agent/leads" className="text-xs font-semibold text-[#173D32] hover:underline">
            ← All Leads
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-xs font-mono font-bold text-gray-500">#{lead.id}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/agent/quotes?client=${encodeURIComponent(lead.name)}&dest=${encodeURIComponent(lead.destination)}`}
            className="px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition"
          >
            Generate Quotation ➔
          </Link>
        </div>
      </div>

      {/* Stage Progression Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3">
        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Pipeline Stage</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {stages.map((stg) => {
            const isCurrent = lead.stage === stg;
            return (
              <button
                key={stg}
                type="button"
                onClick={() => setLead({ ...lead, stage: stg })}
                className={`p-2.5 rounded-xl text-xs font-semibold text-center transition cursor-pointer ${
                  isCurrent
                    ? "bg-[#173D32] text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {stg}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details & Notes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-gray-900">Lead Travel Profile</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500">Destination</span>
                <p className="font-bold text-gray-900 mt-0.5">{lead.destination}</p>
              </div>
              <div>
                <span className="text-gray-500">Client Budget</span>
                <p className="font-bold text-emerald-700 mt-0.5">{lead.budget}</p>
              </div>
              <div>
                <span className="text-gray-500">Travel Window</span>
                <p className="font-bold text-gray-900 mt-0.5">{lead.dates}</p>
              </div>
              <div>
                <span className="text-gray-500">Party Size</span>
                <p className="font-bold text-gray-900 mt-0.5">{lead.travellers}</p>
              </div>
            </div>
          </div>

          {/* Notes Log */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-gray-900">Agent Call Notes & Activity History</h3>

            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                rows={3}
                placeholder="Log customer preference, call notes, or supplier quote..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#173D32]"
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition"
                >
                  Add Note
                </button>
              </div>
            </form>

            <div className="space-y-2 pt-2">
              {lead.notes.map((n, i) => (
                <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs space-y-0.5">
                  <span className="text-[10px] text-gray-400 font-medium">{n.date}</span>
                  <p className="text-gray-800">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Customer Contact Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-gray-900">Client Contact</h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400">Full Name</span>
                <p className="font-bold text-gray-900 text-sm">{lead.name}</p>
              </div>
              <div>
                <span className="text-gray-400">Phone</span>
                <p className="font-bold text-gray-900">{lead.phone}</p>
              </div>
              <div>
                <span className="text-gray-400">Email</span>
                <p className="font-bold text-gray-900">{lead.email}</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${lead.phone}`}
                className="w-full py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-center text-xs font-semibold text-gray-800 block"
              >
                📞 Direct Phone Call
              </a>
              <a
                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-center text-xs font-semibold text-white block"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
