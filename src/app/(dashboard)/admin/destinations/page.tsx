"use client";

import React, { useState } from "react";
import { DESTINATIONS_DATA, DestinationItem } from "@/data/travelData";

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<DestinationItem[]>(DESTINATIONS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<DestinationItem | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [category, setCategory] = useState("Mountain");
  const [startingPrice, setStartingPrice] = useState<number>(18500);
  const [imageUrl, setImageUrl] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingDestination(null);
    setName("");
    setTagline("");
    setCategory("Mountain");
    setStartingPrice(18500);
    setImageUrl("https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800");
    setIsModalOpen(true);
  };

  const openEditModal = (d: DestinationItem) => {
    setEditingDestination(d);
    setName(d.name);
    setTagline(d.tagline);
    setCategory(d.category);
    setStartingPrice(d.startingPrice);
    setImageUrl(d.imageUrl);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !tagline) return;

    if (editingDestination) {
      setDestinations((prev) =>
        prev.map((item) =>
          item.id === editingDestination.id
            ? { ...item, name, tagline, category: category as any, startingPrice: Number(startingPrice), imageUrl }
            : item
        )
      );
      showToast(`✓ Updated "${name}" successfully!`);
    } else {
      const newDest: any = {
        id: `dest-${Date.now()}`,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        tagline,
        country: "India",
        region: "North India",
        isInternational: false,
        duration: "5 Days / 4 Nights",
        reviewsCount: 120,
        overview: tagline,
        highlights: ["Scenic Landscapes", "Local Cuisine", "Verified Stay"],
        itinerarySummary: [{ day: 1, title: "Arrival", desc: "Check-in and explore" }],
        recommendedStay: "Heritage Homestay",
        startingPrice: Number(startingPrice),
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
        rating: 4.9,
        category: category as any,
        bestTimeToVisit: "Oct - Apr",
      };
      setDestinations([newDest, ...destinations]);
      showToast(`✓ Published new destination "${name}"!`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, destName: string) => {
    if (confirm(`Are you sure you want to delete ${destName}?`)) {
      setDestinations((prev) => prev.filter((d) => d.id !== id));
      showToast(`✓ Removed "${destName}" from destination catalogue.`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#242A28]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#173D32] text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold border border-[#287C70] animate-in slide-in-from-top-4">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E6E0] gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            INVENTORY & GEOGRAPHIES
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#173D32] mt-0.5">
            Destinations & Regions Catalogue
          </h1>
          <p className="text-xs text-[#737B76]">
            Publish domestic and international travel destinations with photography, starting tariffs, and highlights.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
        >
          <span>+ Add New Destination</span>
        </button>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl border border-[#E7E6E0] overflow-hidden shadow-xs hover:border-[#287C70] transition flex flex-col justify-between"
          >
            <div className="h-44 relative bg-gray-100">
              <img src={d.imageUrl} alt={d.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-[#173D32]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {d.category}
              </div>
              <div className="absolute bottom-2 left-2 bg-white/95 text-[#173D32] text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
                ★ {d.rating}
              </div>
            </div>

            <div className="p-4 space-y-2 flex-grow">
              <h4 className="font-serif font-bold text-base text-[#173D32]">{d.name}</h4>
              <p className="text-xs text-[#737B76] line-clamp-2 leading-relaxed">{d.tagline}</p>
              <div className="flex justify-between items-center text-xs pt-3 border-t border-[#E7E6E0]">
                <span className="text-[#737B76]">Starting Tariff:</span>
                <span className="font-serif font-bold text-sm text-[#173D32]">
                  ₹{d.startingPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F4] border-t border-[#E7E6E0] flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-bold text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>PUBLISHED</span>
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openEditModal(d)}
                  className="text-[#287C70] font-bold hover:underline"
                >
                  Edit Details →
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(d.id, d.name)}
                  className="text-rose-600 hover:text-rose-800 text-[11px]"
                  title="Remove Destination"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT DESTINATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E7E6E0] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-[#E7E6E0] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B7955B] tracking-widest">
                  DESTINATION CATALOGUE
                </span>
                <h3 className="font-serif text-xl font-bold text-[#173D32] mt-0.5">
                  {editingDestination ? "Edit Destination Details" : "Add New Destination"}
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
                <label className="block font-bold text-[#173D32] mb-1">Destination Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rishikesh & Tapovan Riverfront"
                  className="w-full px-3.5 py-2.5 border border-[#E7E6E0] rounded-xl bg-white focus:outline-none focus:border-[#287C70]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  >
                    <option value="Mountain">Mountain</option>
                    <option value="Nature">Nature</option>
                    <option value="Cultural">Cultural & Heritage</option>
                    <option value="Wellness">Wellness & Yoga</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Beach">Beach & Coastal</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Starting Price (₹) *</label>
                  <input
                    type="number"
                    min={1000}
                    required
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#173D32] mb-1">Tagline / Short Brief *</label>
                <textarea
                  rows={2}
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. World capital of yoga, sacred evening Ganga Aarti, and Himalayan white-water rafting."
                  className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#173D32] mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                />
                <div className="flex gap-1.5 mt-2">
                  {[
                    { label: "Mountains", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" },
                    { label: "Ganga/Rishikesh", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800" },
                    { label: "Rajasthan", url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800" },
                    { label: "Kerala", url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800" },
                  ].map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageUrl(p.url)}
                      className="text-[10px] bg-[#FAF8F4] border border-[#E7E6E0] px-2 py-0.5 rounded-md text-[#737B76] hover:text-[#173D32]"
                    >
                      {p.label}
                    </button>
                  ))}
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
                  {editingDestination ? "Save Changes" : "Publish Destination →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
