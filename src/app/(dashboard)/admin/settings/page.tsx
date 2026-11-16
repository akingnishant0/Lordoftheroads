"use client";

import React, { useState } from "react";

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState("Lord of the Road");
  const [gstin, setGstin] = useState("07AAAAA0000A1Z5");
  const [currency, setCurrency] = useState("INR (₹)");
  const [aiEnabled, setAiEnabled] = useState(true);
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
            System Configuration
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Platform Settings & Integrations
          </h1>
          <p className="text-xs text-gray-500">
            Configure global brand identity, tax rates, IRCTC rail API, and AI Concierge parameters.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm max-w-2xl space-y-4">
        {saved && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
            ✓ Settings updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-500 mb-1 font-medium">Platform Brand Name</label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32]"
            />
          </div>

          <div>
            <label className="block text-gray-500 mb-1 font-medium">Company GSTIN Number</label>
            <input
              type="text"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32] uppercase"
            />
          </div>

          <div>
            <label className="block text-gray-500 mb-1 font-medium">Primary Currency</label>
            <input
              type="text"
              disabled
              value={currency}
              className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
            />
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-900 block">AI Travel Concierge Status</span>
              <p className="text-gray-500 text-[11px]">Enables split-screen AI trip planning for customers and agents</p>
            </div>
            <input
              type="checkbox"
              checked={aiEnabled}
              onChange={(e) => setAiEnabled(e.target.checked)}
              className="accent-[#173D32] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white font-semibold transition"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
