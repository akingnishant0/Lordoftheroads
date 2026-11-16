"use client";

import React, { useState } from "react";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";

export default function CustomerSupportPage() {
  const [ticketSubject, setTicketSubject] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I cancel or reschedule my booking?",
      a: "You can navigate to My Trips, select your active booking, and click 'Request Cancellation / Refund'. Alternatively, message our 24/7 concierge with your booking reference.",
    },
    {
      q: "When will I receive my flight or train PNR voucher?",
      a: "All confirmed bookings generate an instant digital voucher viewable in your account. Train and Flight tickets are issued within 15 minutes of payment authorization with verified PNRs.",
    },
    {
      q: "What is your refund timeframe?",
      a: "Refunds for eligible cancellations are initiated immediately and credited back to your original payment method (UPI / Bank Account) within 3-5 business days.",
    },
    {
      q: "Is travel insurance mandatory for international trips?",
      a: "Yes, for Schengen countries and select international destinations, comprehensive overseas travel insurance with medical evacuation coverage is legally required. We provide instant policies via Travel Shield.",
    },
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              Lord of the Road Helpdesk
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D32]">
              24/7 Traveler Assistance & Support
            </h1>
            <p className="text-sm text-[#737B76]">
              Whether you are en route on the Himalayan highways or preparing for a flight, our concierge team is always by your side.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white border border-[#E7E6E0] shadow-sm space-y-2">
              <span className="text-2xl">📞</span>
              <h3 className="font-bold text-sm text-[#173D32]">Emergency Hotline</h3>
              <p className="text-xs text-[#737B76]">24 hours a day, 7 days a week</p>
              <a href="tel:+919876543210" className="text-sm font-bold text-[#287C70] block">
                +91 98765 43210
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7E6E0] shadow-sm space-y-2">
              <span className="text-2xl">💬</span>
              <h3 className="font-bold text-sm text-[#173D32]">WhatsApp Support</h3>
              <p className="text-xs text-[#737B76]">Average response under 5 mins</p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-emerald-700 block"
              >
                Chat on WhatsApp ↗
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7E6E0] shadow-sm space-y-2">
              <span className="text-2xl">✉️</span>
              <h3 className="font-bold text-sm text-[#173D32]">Email Desk</h3>
              <p className="text-xs text-[#737B76]">For corporate & visa queries</p>
              <a href="mailto:concierge@lordoftheroad.in" className="text-sm font-bold text-[#173D32] block">
                concierge@lordoftheroad.in
              </a>
            </div>
          </div>

          {/* FAQs & Ticket Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* FAQ Accordion */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#173D32]">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-white rounded-xl border border-[#E7E6E0] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full p-4 text-left font-bold text-xs text-[#173D32] flex justify-between items-center cursor-pointer"
                    >
                      <span>{f.q}</span>
                      <span className="text-base text-[#737B76]">{activeFaq === i ? "−" : "+"}</span>
                    </button>
                    {activeFaq === i && (
                      <div className="p-4 pt-0 text-xs text-[#737B76] leading-relaxed border-t border-[#E7E6E0]/50">
                        {f.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Support Ticket */}
            <div className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#173D32]">
                Raise a Support Ticket
              </h3>

              {ticketSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <span className="text-2xl">🎫</span>
                  <h4 className="text-sm font-bold text-emerald-800">Support Ticket Created!</h4>
                  <p className="text-xs text-emerald-700">
                    Ticket ID #LOTR-TCK-{Math.floor(1000 + Math.random() * 9000)} has been queued. Our officer will respond within 30 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#737B76] mb-1 font-medium">Booking ID (if applicable)</label>
                    <input
                      type="text"
                      placeholder="e.g. LOTR-884210"
                      value={bookingRef}
                      onChange={(e) => setBookingRef(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#737B76] mb-1 font-medium">Issue Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flight baggage inquiry or Chauffeur change"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#737B76] mb-1 font-medium">Message / Query Description</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Provide specific details so our support engineer can assist you swiftly..."
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white font-semibold text-xs transition cursor-pointer"
                  >
                    Submit Support Ticket
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <AiTravelAgentModal />

      <CustomerFooter />
    </div>
  );
}
