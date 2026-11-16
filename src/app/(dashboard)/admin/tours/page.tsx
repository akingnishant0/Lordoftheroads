"use client";

import React, { useState } from "react";
import { TOURS_DATA, TourOption } from "@/data/travelData";

export default function AdminToursPage() {
  const [tours, setTours] = useState<TourOption[]>(TOURS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<TourOption | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Rishikesh, Uttarakhand");
  const [duration, setDuration] = useState("Full Day (7h)");
  const [category, setCategory] = useState("Adventure");
  const [price, setPrice] = useState(1800);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingTour(null);
    setTitle("");
    setLocation("Rishikesh, Uttarakhand");
    setDuration("Full Day (7h)");
    setCategory("Adventure");
    setPrice(1800);
    setIsModalOpen(true);
  };

  const openEditModal = (t: TourOption) => {
    setEditingTour(t);
    setTitle(t.title);
    setLocation(t.location);
    setDuration(t.duration);
    setCategory(t.category);
    setPrice(t.price);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location) return;

    if (editingTour) {
      setTours((prev) =>
        prev.map((item) =>
          item.id === editingTour.id
            ? { ...item, title, location, duration, category: category as any, price: Number(price) }
            : item
        )
      );
      showToast(`✓ Updated experience "${title}"!`);
    } else {
      const newTour: any = {
        id: `tour-${Date.now()}`,
        title,
        location,
        duration,
        category,
        price: Number(price),
        rating: 4.9,
        reviewsCount: 1,
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
        description: "Curated guided immersion with local experts and verified safety gear.",
        includes: ["Guide", "Equipment", "Refreshments"],
      };
      setTours([newTour, ...tours]);
      showToast(`✓ Published experience "${title}"!`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, tourTitle: string) => {
    if (confirm(`Remove "${tourTitle}" from active catalogue?`)) {
      setTours((prev) => prev.filter((t) => t.id !== id));
      showToast(`✓ Removed "${tourTitle}".`);
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
            EXPERIENCES & IMMERSION
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#173D32] mt-0.5">
            Day Tours & Curated Activities
          </h1>
          <p className="text-xs text-[#737B76]">
            Publish guided heritage walks, adventure river rafting, and wellness immersions.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
        >
          <span>+ Add New Experience</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[#737B76] bg-[#FAF8F4] uppercase text-[10px] tracking-wider border-b border-[#E7E6E0]">
            <tr>
              <th className="py-3 px-3">Tour Experience</th>
              <th className="py-3 px-3">Location</th>
              <th className="py-3 px-3">Duration</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Rate / Person</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E6E0]">
            {tours.map((t) => (
              <tr key={t.id} className="hover:bg-[#FAF8F4]/80 transition">
                <td className="py-3.5 px-3">
                  <div className="font-bold text-[#173D32] text-sm">{t.title}</div>
                  <span className="text-[10px] text-[#737B76]">★ {t.rating} ({t.reviewsCount} reviews)</span>
                </td>
                <td className="py-3.5 px-3 text-[#242A28] font-medium">{t.location}</td>
                <td className="py-3.5 px-3 text-[#737B76] font-mono">{t.duration}</td>
                <td className="py-3.5 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF8F4] border border-[#E7E6E0] text-[#173D32]">
                    {t.category}
                  </span>
                </td>
                <td className="py-3.5 px-3 font-serif font-bold text-sm text-emerald-800">
                  ₹{t.price.toLocaleString("en-IN")}
                </td>
                <td className="py-3.5 px-3 text-right space-x-3">
                  <button
                    type="button"
                    onClick={() => openEditModal(t)}
                    className="text-xs font-bold text-[#287C70] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(t.id, t.title)}
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

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E7E6E0] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-[#E7E6E0] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B7955B] tracking-widest">
                  EXPERIENCES CATALOGUE
                </span>
                <h3 className="font-serif text-xl font-bold text-[#173D32] mt-0.5">
                  {editingTour ? "Edit Tour Experience" : "Add New Tour Experience"}
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
                <label className="block font-bold text-[#173D32] mb-1">Experience Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Ganga River White Water Rafting (16km Shivpuri to Rishikesh)"
                  className="w-full px-3.5 py-2.5 border border-[#E7E6E0] rounded-xl bg-white focus:outline-none focus:border-[#287C70]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Rishikesh, Uttarakhand"
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Rate / Person (₹) *</label>
                  <input
                    type="number"
                    min={200}
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  >
                    <option value="Adventure">Adventure</option>
                    <option value="Heritage">Heritage & Culture</option>
                    <option value="Wellness">Wellness & Yoga</option>
                    <option value="Nature">Nature & Wildlife</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 3 Hours"
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
                  {editingTour ? "Save Changes" : "Publish Experience →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
