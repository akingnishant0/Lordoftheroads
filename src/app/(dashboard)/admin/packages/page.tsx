"use client";

import React, { useState } from "react";
import { HOLIDAY_PACKAGES_DATA, HolidayPackage } from "@/data/travelData";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<HolidayPackage[]>(HOLIDAY_PACKAGES_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<HolidayPackage | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("Kashmir Valley");
  const [durationDays, setDurationDays] = useState(6);
  const [durationNights, setDurationNights] = useState(5);
  const [pricePerPerson, setPricePerPerson] = useState(27999);
  const [category, setCategory] = useState("Family & Leisure");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openCreateModal = () => {
    setEditingPackage(null);
    setTitle("");
    setDestination("Rishikesh Yoga & Riverside");
    setDurationDays(4);
    setDurationNights(3);
    setPricePerPerson(18500);
    setCategory("Wellness & Retreat");
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: HolidayPackage) => {
    setEditingPackage(pkg);
    setTitle(pkg.title);
    setDestination(pkg.destination);
    setDurationDays(pkg.durationDays);
    setDurationNights(pkg.durationNights);
    setPricePerPerson(pkg.pricePerPerson);
    setCategory("Family & Leisure");
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !destination) return;

    if (editingPackage) {
      setPackages((prev) =>
        prev.map((item) =>
          item.id === editingPackage.id
            ? {
                ...item,
                title,
                destination,
                durationDays: Number(durationDays),
                durationNights: Number(durationNights),
                pricePerPerson: Number(pricePerPerson),
              }
            : item
        )
      );
      showToast(`✓ Updated "${title}" successfully!`);
    } else {
      const newPkg: HolidayPackage = {
        id: `pkg-${Date.now()}`,
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        destination,
        durationDays: Number(durationDays),
        durationNights: Number(durationNights),
        pricePerPerson: Number(pricePerPerson),
        rating: 4.9,
        reviewsCount: 1,
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
        highlights: ["Daily Buffet Breakfast", "Dedicated AC Chauffeur", "Handpicked Heritage Stays"],
        inclusions: ["Accommodation", "Transfers", "Sightseeing", "Meals"],
        itinerary: [
          { day: 1, title: "Arrival & Check-in", description: "Private airport/railway pickup and check-in." },
          { day: 2, title: "Scenic Exploration", description: "Guided sightseeing and immersion experiences." },
        ],
      };
      setPackages([newPkg, ...packages]);
      showToast(`✓ Published holiday package "${title}"!`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, pkgTitle: string) => {
    if (confirm(`Remove "${pkgTitle}" from active catalogue?`)) {
      setPackages((prev) => prev.filter((p) => p.id !== id));
      showToast(`✓ Removed "${pkgTitle}".`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#242A28]">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#173D32] text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold border border-[#287C70] animate-in slide-in-from-top-4">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E6E0] gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            HOLIDAY PACKAGES CATALOGUE
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#173D32] mt-0.5">
            Tour & Holiday Packages
          </h1>
          <p className="text-xs text-[#737B76]">
            Configure package tariffs, verified itineraries, nights duration, and departure dates.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
        >
          <span>+ Create Holiday Package</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[#737B76] bg-[#FAF8F4] uppercase text-[10px] tracking-wider border-b border-[#E7E6E0]">
            <tr>
              <th className="py-3 px-3">Package Title</th>
              <th className="py-3 px-3">Destination</th>
              <th className="py-3 px-3">Duration</th>
              <th className="py-3 px-3">Price / Pax</th>
              <th className="py-3 px-3">Rating</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E6E0]">
            {packages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-[#FAF8F4]/80 transition">
                <td className="py-3.5 px-3">
                  <div className="font-bold text-[#173D32] text-sm">{pkg.title}</div>
                  <span className="text-[10px] text-[#737B76]">{pkg.highlights?.slice(0, 2).join(" · ")}</span>
                </td>
                <td className="py-3.5 px-3 text-[#242A28] font-medium">{pkg.destination}</td>
                <td className="py-3.5 px-3 text-[#737B76] font-mono">
                  {pkg.durationDays}D / {pkg.durationNights}N
                </td>
                <td className="py-3.5 px-3">
                  <span className="font-serif font-bold text-sm text-emerald-800">
                    ₹{pkg.pricePerPerson.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-[#737B76] block">all taxes incl.</span>
                </td>
                <td className="py-3.5 px-3 text-amber-700 font-bold">
                  ★ {pkg.rating} <span className="text-[#737B76] font-normal text-[10px]">({pkg.reviewsCount})</span>
                </td>
                <td className="py-3.5 px-3 text-right space-x-3">
                  <button
                    type="button"
                    onClick={() => openEditModal(pkg)}
                    className="text-xs font-bold text-[#287C70] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(pkg.id, pkg.title)}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE / EDIT PACKAGE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E7E6E0] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-[#E7E6E0] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B7955B] tracking-widest">
                  PACKAGE CREATOR
                </span>
                <h3 className="font-serif text-xl font-bold text-[#173D32] mt-0.5">
                  {editingPackage ? "Edit Package Parameters" : "Create New Tour Package"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#737B76] hover:text-black text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#173D32] mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Rishikesh Riverfront Meditation & Rafting Escape"
                  className="w-full px-3.5 py-2.5 border border-[#E7E6E0] rounded-xl bg-white focus:outline-none focus:border-[#287C70]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Destination Region *</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Rishikesh & Haridwar"
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Tariff per Passenger (₹) *</label>
                  <input
                    type="number"
                    min={2000}
                    required
                    value={pricePerPerson}
                    onChange={(e) => setPricePerPerson(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Duration (Nights)</label>
                  <input
                    type="number"
                    min={0}
                    max={29}
                    value={durationNights}
                    onChange={(e) => setDurationNights(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#E7E6E0]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E7E6E0] rounded-xl font-bold text-[#737B76] hover:bg-[#FAF8F4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#173D32] hover:bg-[#287C70] text-white rounded-xl font-bold transition shadow-xs"
                >
                  {editingPackage ? "Save Changes" : "Publish Package →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
