"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import Link from "next/link";
import { getDashboardPath, getDashboardLabel } from "@/lib/utils";

export default function CustomerProfilePage() {
  const { data: session } = useSession();

  const [name, setName] = useState(session?.user?.name || "Rohan Sharma");
  const [email, setEmail] = useState(session?.user?.email || "rohan@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [passportNumber, setPassportNumber] = useState("Z8492019");
  const [seatPreference, setSeatPreference] = useState("Window");
  const [mealPreference, setMealPreference] = useState("Vegetarian Hindu Meal");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const userRole = (session?.user as { role?: string })?.role;
  const dashboardPath = getDashboardPath(userRole);
  const dashboardLabel = getDashboardLabel(userRole);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Top Breadcrumb & Return to Dashboard Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E6E0]">
            <div className="flex items-center gap-2 text-xs text-[#737B76]">
              <Link
                href={dashboardPath}
                className="hover:text-[#BA1E04] flex items-center gap-1 font-semibold transition"
              >
                <span>📊</span>
                <span>{dashboardLabel}</span>
              </Link>
              <span>/</span>
              <span className="text-[#BA1E04] font-medium">Profile Settings</span>
            </div>

            <Link
              href={dashboardPath}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#BA1E04] to-[#CD2306] hover:from-[#9E1803] hover:to-[#B7240C] text-white text-xs font-semibold shadow-xs transition border border-[#EE6C19]/40"
            >
              <span>← Back to Dashboard (डैशबोर्ड)</span>
            </Link>
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#EE6C19]">
              Traveller Identity & Settings
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F0605] mt-1">
              Account & Co-Travellers Profile
            </h1>
            <p className="text-xs text-[#737B76]">
              Keep your contact information, passport details, and flight preferences up to date for fast one-click checkouts.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#E7E6E0] p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-[#E7E6E0]">
              <div className="w-16 h-16 rounded-full bg-[#173D32] text-[#B7955B] font-serif text-2xl font-bold flex items-center justify-center">
                {name[0]}
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#173D32]">{name}</h3>
                <p className="text-xs text-[#737B76]">{email}</p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                  Verified Traveler • Tier: Gold Road Explorer
                </span>
              </div>
            </div>

            {savedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
                ✓ Profile details successfully updated!
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#737B76] mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                  />
                </div>
                <div>
                  <label className="block text-[#737B76] mb-1 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                  />
                </div>
                <div>
                  <label className="block text-[#737B76] mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                  />
                </div>
                <div>
                  <label className="block text-[#737B76] mb-1 font-medium">Passport Number (for international travel)</label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32] uppercase"
                  />
                </div>
                <div>
                  <label className="block text-[#737B76] mb-1 font-medium">Flight Seat Preference</label>
                  <select
                    value={seatPreference}
                    onChange={(e) => setSeatPreference(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#E7E6E0] bg-white focus:outline-none focus:border-[#173D32]"
                  >
                    <option value="Window">Window</option>
                    <option value="Aisle">Aisle</option>
                    <option value="Extra Legroom">Extra Legroom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#737B76] mb-1 font-medium">Meal Preference</label>
                  <select
                    value={mealPreference}
                    onChange={(e) => setMealPreference(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#E7E6E0] bg-white focus:outline-none focus:border-[#173D32]"
                  >
                    <option value="Vegetarian Hindu Meal">Vegetarian Hindu Meal</option>
                    <option value="Jain Meal">Jain Meal</option>
                    <option value="Non-Vegetarian Regular">Non-Vegetarian Regular</option>
                    <option value="Diabetic / Low Sodium">Diabetic / Low Sodium</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E6E0] flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}
