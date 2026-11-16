"use client";

import React, { useState } from "react";

export default function AgentSupportDeskPage() {
  const [ticketSubject, setTicketSubject] = useState("");
  const [priority, setPriority] = useState("HIGH");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            B2B Partner Assistance
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Agent Priority Support Desk
          </h1>
          <p className="text-xs text-gray-500">
            Dedicated 24/7 partner operations helpline for booking modifications, PNR reissuance, and wallet payout inquiries.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-1 text-center">
          <span className="text-2xl">📞</span>
          <h4 className="font-bold text-sm text-gray-900">Partner Hotline</h4>
          <p className="text-xs text-emerald-700 font-bold">+91 98765 43299</p>
          <span className="text-[10px] text-gray-400">Direct line to Operations Manager</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-1 text-center">
          <span className="text-2xl">💬</span>
          <h4 className="font-bold text-sm text-gray-900">Agent WhatsApp Desk</h4>
          <a
            href="https://wa.me/919876543299"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-700 font-bold hover:underline block"
          >
            Chat with Operations ↗
          </a>
          <span className="text-[10px] text-gray-400">&lt; 3 mins average response</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-1 text-center">
          <span className="text-2xl">✉️</span>
          <h4 className="font-bold text-sm text-gray-900">Agent Payouts Email</h4>
          <p className="text-xs font-bold text-gray-800">partners@lordoftheroad.in</p>
          <span className="text-[10px] text-gray-400">For invoice & GST reconciliation</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm max-w-2xl space-y-4">
        <h3 className="font-bold text-base text-gray-900">Raise Partner Support Ticket</h3>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1 text-xs">
            <span className="text-2xl">🎟️</span>
            <h4 className="font-bold text-emerald-800 text-sm">Priority Ticket #AGT-TCK-{Math.floor(1000 + Math.random() * 9000)} Created!</h4>
            <p className="text-emerald-700">An operations desk lead has been paged and will reach out to you within 15 minutes.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-500 mb-1 font-medium">Issue Subject</label>
              <input
                type="text"
                required
                placeholder="e.g. Urgent PNR modification or Hotel voucher reissuance"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32]"
              />
            </div>

            <div>
              <label className="block text-gray-500 mb-1 font-medium">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 bg-white"
              >
                <option value="CRITICAL">Critical (Passenger traveling within 24 hours)</option>
                <option value="HIGH">High (Urgent Booking / Payment issue)</option>
                <option value="NORMAL">Normal General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-500 mb-1 font-medium">Description</label>
              <textarea
                rows={4}
                required
                placeholder="Detail passenger names, PNR / Booking references, and the requested modification..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white font-semibold transition cursor-pointer"
            >
              Submit Priority Ticket
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
