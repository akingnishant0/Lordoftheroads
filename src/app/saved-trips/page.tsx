"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { DESTINATIONS_DATA, HOLIDAY_PACKAGES_DATA } from "@/data/travelData";
import { getDashboardPath, getDashboardLabel } from "@/lib/utils";

export default function SavedTripsPage() {
  const [savedPackages, setSavedPackages] = useState(HOLIDAY_PACKAGES_DATA.slice(0, 2));
  const [savedDestinations, setSavedDestinations] = useState(DESTINATIONS_DATA.slice(0, 2));

  const handleRemovePkg = (id: string) => {
    setSavedPackages(savedPackages.filter((p) => p.id !== id));
  };

  const handleRemoveDest = (id: string) => {
    setSavedDestinations(savedDestinations.filter((d) => d.id !== id));
  };

  const { data: session } = useSession();
  const userRole = (session?.user as { role?: string })?.role;
  const dashboardPath = getDashboardPath(userRole);
  const dashboardLabel = getDashboardLabel(userRole);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Top Breadcrumb & Return to Dashboard Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E6E0]">
            <div className="flex items-center gap-2 text-xs text-[#737B76]">
              <Link
                href={dashboardPath}
                className="hover:text-[#173D32] flex items-center gap-1 font-semibold transition"
              >
                <span>📊</span>
                <span>{dashboardLabel}</span>
              </Link>
              <span>/</span>
              <span className="text-[#173D32] font-medium">Saved Trips & Wishlist</span>
            </div>

            <Link
              href={dashboardPath}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#173D32] hover:bg-[#287C70] text-[#FAF8F4] text-xs font-semibold shadow-xs transition"
            >
              <span>← Back to Dashboard (डैशबोर्ड)</span>
            </Link>
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              Your Travel Wishlist
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D32] mt-1">
              Saved Trips & Destinations
            </h1>
            <p className="text-xs text-[#737B76]">
              Keep track of dream getaways and itineraries saved for upcoming holidays.
            </p>
          </div>

          {/* Section 1: Saved Packages */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#173D32]">Saved Packages</h2>
            {savedPackages.length === 0 ? (
              <p className="text-xs text-[#737B76]">No packages saved yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedPackages.map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-xs text-[#737B76] mb-1">
                        <span>📍 {pkg.destination}</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePkg(pkg.id)}
                          className="text-red-500 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#173D32] mb-2">{pkg.title}</h3>
                      <p className="text-xs text-[#737B76] mb-4">{pkg.durationDays} Days / {pkg.durationNights} Nights</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E7E6E0]">
                      <span className="font-serif text-xl font-bold text-[#173D32]">₹{pkg.pricePerPerson.toLocaleString("en-IN")}</span>
                      <Link
                        href={`/checkout?item=${encodeURIComponent(pkg.title)}&price=${pkg.pricePerPerson}&travellers=2`}
                        className="px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 2: Saved Destinations */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#173D32]">Saved Destinations</h2>
            {savedDestinations.length === 0 ? (
              <p className="text-xs text-[#737B76]">No destinations saved yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedDestinations.map((dest) => (
                  <div key={dest.id} className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-xs text-[#737B76] mb-1">
                        <span>{dest.emoji} {dest.country}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDest(dest.id)}
                          className="text-red-500 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#173D32] mb-1">{dest.name}</h3>
                      <p className="text-xs text-[#737B76] line-clamp-2 mb-4">{dest.tagline}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E7E6E0]">
                      <span className="text-xs text-[#737B76]">From ₹{dest.startingPrice.toLocaleString("en-IN")}</span>
                      <Link
                        href={`/destinations/${dest.slug}`}
                        className="px-4 py-2 rounded-xl border border-[#173D32] text-[#173D32] hover:bg-[#FAF8F4] text-xs font-semibold"
                      >
                        Explore ➔
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}
