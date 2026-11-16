"use client";

import React, { useState } from "react";

export default function AdminContentPage() {
  const [announcementEn, setAnnouncementEn] = useState("India journeys, planned around you • Live Real-time Rates");
  const [announcementHi, setAnnouncementHi] = useState("भारत यात्राएं, आपकी पसंद के अनुसार • 100% सत्यापित दरें");
  const [heroHeadline, setHeroHeadline] = useState("Your Next Journey Starts Here.");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Platform Editorial
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Content & Homepage CMS
          </h1>
          <p className="text-xs text-gray-500">
            Update top announcement bar, hero photography copy, travel store items, and editorial story sections.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm max-w-3xl space-y-4">
        {saved && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
            ✓ Content changes published to website!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-500 mb-1 font-medium">Top Announcement Strip (English)</label>
            <input
              type="text"
              value={announcementEn}
              onChange={(e) => setAnnouncementEn(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32]"
            />
          </div>

          <div>
            <label className="block text-gray-500 mb-1 font-medium">Top Announcement Strip (Hindi)</label>
            <input
              type="text"
              value={announcementHi}
              onChange={(e) => setAnnouncementHi(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32]"
            />
          </div>

          <div>
            <label className="block text-gray-500 mb-1 font-medium">Homepage Main Hero Headline</label>
            <input
              type="text"
              value={heroHeadline}
              onChange={(e) => setHeroHeadline(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition"
          >
            Save & Publish Content
          </button>
        </form>
      </div>
    </div>
  );
}
