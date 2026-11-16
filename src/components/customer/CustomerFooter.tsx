"use client";

import React from "react";
import Link from "next/link";

export function CustomerFooter() {
  return (
    <footer className="bg-[#173D32] text-[#EDE5D8] border-t border-[#287C70]/40 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#287C70]/40">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden border-2 border-[#B7955B]/60 shadow-md bg-black shrink-0">
                <img src="/logo.jpg" alt="Lord of the Roads" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-white tracking-tight leading-tight">
                  lord <i className="font-serif text-[#B7955B]">of the</i> road
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#B7955B] font-bold">
                  TRAVEL SUPER PLATFORM
                </span>
              </div>
            </div>

            <p className="text-sm text-[#EDE5D8]/80 leading-relaxed max-w-sm">
              India journeys and international getaways, planned around you. From hand-crafted holiday itineraries and IRCTC authorized rail ticketing to luxury stays and 24/7 AI travel concierge support.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#FAF8F4]/80">
              <span className="px-2.5 py-1 rounded-md bg-[#287C70]/40 border border-[#287C70]">IATA Accredited</span>
              <span className="px-2.5 py-1 rounded-md bg-[#287C70]/40 border border-[#287C70]">IRCTC Authorized</span>
              <span className="px-2.5 py-1 rounded-md bg-[#287C70]/40 border border-[#287C70]">Travel Protection Shield</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#B7955B]">Book Travel</h4>
            <ul className="space-y-2 text-sm text-[#EDE5D8]/80">
              <li><Link href="/holiday-packages" className="hover:text-white transition">Holiday Packages</Link></li>
              <li><Link href="/hotels" className="hover:text-white transition">Hotels & Resorts</Link></li>
              <li><Link href="/villas-homestays" className="hover:text-white transition">Villas & Homestays</Link></li>
              <li><Link href="/flights" className="hover:text-white transition">Domestic & Intl Flights</Link></li>
              <li><Link href="/trains" className="hover:text-white transition">IRCTC Train Booking</Link></li>
              <li><Link href="/buses" className="hover:text-white transition">Intercity Bus Seats</Link></li>
              <li><Link href="/cabs" className="hover:text-white transition">Airport & Outstation Cabs</Link></li>
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#B7955B]">Experiences & AI</h4>
            <ul className="space-y-2 text-sm text-[#EDE5D8]/80">
              <li><Link href="/travel-agent" className="hover:text-white transition">AI Travel Concierge</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition">Explore Destinations</Link></li>
              <li><Link href="/tours" className="hover:text-white transition">Curated Day Tours</Link></li>
              <li><Link href="/visa-help" className="hover:text-white transition">Visa Assistance</Link></li>
              <li><Link href="/saved-trips" className="hover:text-white transition">Saved Trips & Wishlist</Link></li>
              <li><Link href="/my-trips" className="hover:text-white transition">Manage My Booking</Link></li>
            </ul>
          </div>

          {/* Col 4: Support & Portals */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#B7955B]">Support & Partners</h4>
            <ul className="space-y-2 text-sm text-[#EDE5D8]/80">
              <li><Link href="/support" className="hover:text-white transition">24/7 Helpline Desk</Link></li>
              <li><Link href="/agent/dashboard" className="hover:text-white transition">Agent Partner Hub</Link></li>
              <li><Link href="/supplier" className="hover:text-white transition">Hotel Supplier Portal</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-white transition">Operations Desk</Link></li>
              <li><a href="tel:+919876543210" className="text-[#B7955B] font-semibold block pt-1">📞 +91 98765 43210</a></li>
              <li><span className="text-xs text-[#EDE5D8]/60">concierge@lordoftheroad.in</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EDE5D8]/60 gap-4">
          <p>© {new Date().getFullYear()} Lord of the Road Travel Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>PCI-DSS Level 1 Secure</span>
            <span>256-Bit SSL Encryption</span>
            <span>Made with precision in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
