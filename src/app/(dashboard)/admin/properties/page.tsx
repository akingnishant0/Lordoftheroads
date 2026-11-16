"use client";

import React, { useState } from "react";
import { HOTELS_DATA, VILLAS_DATA, HotelOption, VillaOption } from "@/data/travelData";

export default function AdminPropertiesPage() {
  const [tab, setTab] = useState<"HOTELS" | "VILLAS">("HOTELS");
  const [hotels, setHotels] = useState<HotelOption[]>(HOTELS_DATA);
  const [villas, setVillas] = useState<VillaOption[]>(VILLAS_DATA);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Resort");
  const [pricePerNight, setPricePerNight] = useState(6500);
  const [bedrooms, setBedrooms] = useState(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingItem(null);
    setName("");
    setLocation("Rishikesh, Uttarakhand");
    setPropertyType(tab === "HOTELS" ? "Resort" : "Villa");
    setPricePerNight(tab === "HOTELS" ? 5500 : 12500);
    setBedrooms(2);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setName(item.name);
    setLocation(item.city || item.location || "");
    setPropertyType(item.type || (item.bedrooms ? `${item.bedrooms} BHK Villa` : "Hotel"));
    setPricePerNight(item.pricePerNight);
    setBedrooms(item.bedrooms || 2);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) return;

    if (tab === "HOTELS") {
      if (editingItem) {
        setHotels((prev) =>
          prev.map((h) =>
            h.id === editingItem.id
              ? { ...h, name, city: location, type: propertyType as any, pricePerNight: Number(pricePerNight) }
              : h
          )
        );
        showToast(`✓ Updated hotel "${name}" successfully!`);
      } else {
        const newHotel: any = {
          id: `hotel-${Date.now()}`,
          name,
          city: location,
          country: "India",
          rating: 4.9,
          reviewsCount: 1,
          pricePerNight: Number(pricePerNight),
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
          amenities: ["Free WiFi", "Swimming Pool", "Spa & Wellness", "Mountain View"],
          type: propertyType as any,
          availableRooms: 6,
        };
        setHotels([newHotel, ...hotels]);
        showToast(`✓ Added hotel "${name}" to active inventory!`);
      }
    } else {
      if (editingItem) {
        setVillas((prev) =>
          prev.map((v) =>
            v.id === editingItem.id
              ? { ...v, name, location, bedrooms: Number(bedrooms), pricePerNight: Number(pricePerNight) }
              : v
          )
        );
        showToast(`✓ Updated villa "${name}" successfully!`);
      } else {
        const newVilla: any = {
          id: `villa-${Date.now()}`,
          name,
          location,
          bedrooms: Number(bedrooms),
          maxGuests: Number(bedrooms) * 2,
          pricePerNight: Number(pricePerNight),
          rating: 4.95,
          reviewsCount: 1,
          imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
          amenities: ["Private Pool", "Care-taker on site", "Lush Lawn", "Barbeque"],
        };
        setVillas([newVilla, ...villas]);
        showToast(`✓ Added villa "${name}" to active inventory!`);
      }
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, itemName: string) => {
    if (confirm(`Remove "${itemName}" from active inventory?`)) {
      if (tab === "HOTELS") {
        setHotels((prev) => prev.filter((h) => h.id !== id));
      } else {
        setVillas((prev) => prev.filter((v) => v.id !== id));
      }
      showToast(`✓ Removed "${itemName}".`);
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
            STAYS & ACCOMMODATION INVENTORY
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#173D32] mt-0.5">
            Hotels, Resorts & Private Villas
          </h1>
          <p className="text-xs text-[#737B76]">
            Control room allotments, amenities, live tariffs, and check-in schedules.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
        >
          <span>+ Add New {tab === "HOTELS" ? "Hotel" : "Villa"}</span>
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTab("HOTELS")}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            tab === "HOTELS"
              ? "bg-[#173D32] text-white shadow-xs"
              : "bg-white border border-[#E7E6E0] text-[#737B76] hover:text-[#242A28]"
          }`}
        >
          🏨 Hotels & Resorts ({hotels.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("VILLAS")}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            tab === "VILLAS"
              ? "bg-[#173D32] text-white shadow-xs"
              : "bg-white border border-[#E7E6E0] text-[#737B76] hover:text-[#242A28]"
          }`}
        >
          🏡 Villas & Homestays ({villas.length})
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-[#E7E6E0] p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[#737B76] bg-[#FAF8F4] uppercase text-[10px] tracking-wider border-b border-[#E7E6E0]">
            <tr>
              <th className="py-3 px-3">Property Name</th>
              <th className="py-3 px-3">Location</th>
              <th className="py-3 px-3">Type / Category</th>
              <th className="py-3 px-3">Base Tariff / Night</th>
              <th className="py-3 px-3">Rating</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E6E0]">
            {tab === "HOTELS"
              ? hotels.map((h) => (
                  <tr key={h.id} className="hover:bg-[#FAF8F4]/80 transition">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-[#173D32] text-sm">{h.name}</div>
                      <span className="text-[10px] text-[#737B76]">{h.amenities?.slice(0, 2).join(" · ")}</span>
                    </td>
                    <td className="py-3.5 px-3 text-[#242A28] font-medium">{h.city}, {h.country}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF8F4] border border-[#E7E6E0] text-[#173D32]">
                        {h.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-serif font-bold text-sm text-emerald-800">
                        ₹{h.pricePerNight.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] text-[#737B76] block">/ night</span>
                    </td>
                    <td className="py-3.5 px-3 text-amber-700 font-bold">
                      ★ {h.rating} <span className="text-[#737B76] font-normal text-[10px]">({h.reviewsCount})</span>
                    </td>
                    <td className="py-3.5 px-3 text-right space-x-3">
                      <button
                        type="button"
                        onClick={() => openEditModal(h)}
                        className="text-xs font-bold text-[#287C70] hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(h.id, h.name)}
                        className="text-xs font-bold text-rose-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : villas.map((v) => (
                  <tr key={v.id} className="hover:bg-[#FAF8F4]/80 transition">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-[#173D32] text-sm">{v.name}</div>
                      <span className="text-[10px] text-[#737B76]">{v.amenities?.slice(0, 2).join(" · ")}</span>
                    </td>
                    <td className="py-3.5 px-3 text-[#242A28] font-medium">{v.location}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF8F4] border border-[#E7E6E0] text-[#173D32]">
                        {v.bedrooms} BHK Private Villa
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-serif font-bold text-sm text-emerald-800">
                        ₹{v.pricePerNight.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] text-[#737B76] block">/ night</span>
                    </td>
                    <td className="py-3.5 px-3 text-amber-700 font-bold">
                      ★ {v.rating} <span className="text-[#737B76] font-normal text-[10px]">({v.reviewsCount})</span>
                    </td>
                    <td className="py-3.5 px-3 text-right space-x-3">
                      <button
                        type="button"
                        onClick={() => openEditModal(v)}
                        className="text-xs font-bold text-[#287C70] hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(v.id, v.name)}
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

      {/* ADD / EDIT PROPERTY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E7E6E0] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-[#E7E6E0] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B7955B] tracking-widest">
                  STAYS INVENTORY
                </span>
                <h3 className="font-serif text-xl font-bold text-[#173D32] mt-0.5">
                  {editingItem ? `Edit ${tab === "HOTELS" ? "Hotel" : "Villa"}` : `Add New ${tab === "HOTELS" ? "Hotel" : "Villa"}`}
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
                <label className="block font-bold text-[#173D32] mb-1">Property Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ganga View Boutique Resort & Spa"
                  className="w-full px-3.5 py-2.5 border border-[#E7E6E0] rounded-xl bg-white focus:outline-none focus:border-[#287C70]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#173D32] mb-1">City, State / PIN *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Rishikesh (249201)"
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Base Tariff / Night (₹) *</label>
                  <input
                    type="number"
                    min={500}
                    required
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  />
                </div>
              </div>

              {tab === "HOTELS" ? (
                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Property Category</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  >
                    <option value="Resort">Boutique Resort</option>
                    <option value="Heritage Palace">Heritage Palace / Haveli</option>
                    <option value="Luxury Hotel">Luxury 4/5-Star Hotel</option>
                    <option value="Riverside Camp">Riverside Luxury Camp</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-[#173D32] mb-1">Number of Bedrooms (BHK)</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E7E6E0] rounded-xl bg-white"
                  />
                </div>
              )}

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
                  {editingItem ? "Save Changes" : "Publish to Live Inventory →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
