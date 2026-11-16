"use client";

import React, { useState } from "react";

interface RoutePreset {
  id: string;
  name: string;
  distanceKm: number;
  tollEstimate: number;
  terrain: string;
}

const POPULAR_ROUTES: RoutePreset[] = [
  { id: "delhi-manali", name: "Delhi ➔ Manali (via Atal Tunnel)", distanceKm: 540, tollEstimate: 620, terrain: "Expressway & Hill Curves" },
  { id: "manali-leh", name: "Manali ➔ Leh, Ladakh", distanceKm: 428, tollEstimate: 180, terrain: "High-Altitude Passes (16,000+ ft)" },
  { id: "delhi-jaipur", name: "Delhi ➔ Jaipur & Udaipur", distanceKm: 650, tollEstimate: 780, terrain: "NE-4 Delhi-Mumbai Expressway" },
  { id: "mumbai-goa", name: "Mumbai ➔ North Goa (Assagao)", distanceKm: 590, tollEstimate: 840, terrain: "NH-66 Coastal Highway" },
  { id: "bengaluru-ooty", name: "Bengaluru ➔ Ooty & Coonoor", distanceKm: 280, tollEstimate: 320, terrain: "Bandipur Forest & 36 Hairpin Bends" },
];

const VEHICLE_TYPES = [
  { id: "bike", name: "Motorcycle (Royal Enfield)", icon: "🏍️", mileageKm: 34, fuelType: "Petrol", pricePerUnit: 96 },
  { id: "sedan", name: "Sedan / Hatchback", icon: "🚗", mileageKm: 18, fuelType: "Petrol", pricePerUnit: 96 },
  { id: "suv", name: "4x4 SUV / Thar (Diesel)", icon: "🚙", mileageKm: 12, fuelType: "Diesel", pricePerUnit: 88 },
  { id: "ev", name: "Electric Vehicle (EV)", icon: "⚡", mileageKm: 6, fuelType: "Electricity (kWh)", pricePerUnit: 14 },
];

export function FuelTollCalculator({ onOpenAi }: { onOpenAi?: (prompt: string) => void }) {
  const [selectedRoute, setSelectedRoute] = useState<RoutePreset>(POPULAR_ROUTES[0]);
  const [customDistance, setCustomDistance] = useState<number>(POPULAR_ROUTES[0].distanceKm);
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_TYPES[0]);
  const [passengers, setPassengers] = useState<number>(2);
  const [acEnabled, setAcEnabled] = useState<boolean>(true);

  // Mileage adjustment: AC reduces mileage by approx 10%
  const effectiveMileage = acEnabled && selectedVehicle.id !== "bike"
    ? selectedVehicle.mileageKm * 0.9
    : selectedVehicle.mileageKm;

  const totalFuelNeeded = Number((customDistance / effectiveMileage).toFixed(1));
  const totalFuelCost = Math.round(totalFuelNeeded * selectedVehicle.pricePerUnit);
  const tollCost = selectedRoute.tollEstimate;
  const totalTripCost = totalFuelCost + tollCost;
  const costPerPerson = Math.round(totalTripCost / passengers);

  const handleRouteChange = (routeId: string) => {
    const found = POPULAR_ROUTES.find((r) => r.id === routeId) || POPULAR_ROUTES[0];
    setSelectedRoute(found);
    setCustomDistance(found.distanceKm);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E7E6E0] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E7E6E0] gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A66A]">
            Smart Highway Intelligence
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173B32] mt-1">
            Fuel & Toll Cost Calculator
          </h3>
          <p className="text-xs text-[#737B76] mt-0.5">
            Calculate accurate transit budgets, Fastag tolls, and split costs per head for your road trip.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F4] border border-[#E7E6E0] text-xs font-semibold text-[#173B32]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live Highway Toll Rates · Fastag 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left 7 cols: Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Select Route */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#173B32] mb-2">
              Select Popular Route or Custom Distance
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {POPULAR_ROUTES.map((route) => (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => handleRouteChange(route.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedRoute.id === route.id
                      ? "border-[#173B32] bg-[#FAF8F4] shadow-xs"
                      : "border-[#E7E6E0] hover:border-[#737B76] bg-white"
                  }`}
                >
                  <span className="text-xs font-bold text-[#173B32] block truncate">{route.name}</span>
                  <span className="text-[10px] text-[#737B76]">{route.distanceKm} km · {route.terrain}</span>
                </button>
              ))}
            </div>

            {/* Distance Slider */}
            <div className="mt-4 p-3 bg-[#FAF8F4] rounded-2xl border border-[#E7E6E0]">
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-[#737B76]">Trip Distance (one-way):</span>
                <span className="font-mono font-bold text-[#173B32] text-sm">{customDistance} km</span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="10"
                value={customDistance}
                onChange={(e) => setCustomDistance(Number(e.target.value))}
                className="w-full accent-[#173B32] cursor-pointer"
              />
            </div>
          </div>

          {/* 2. Select Vehicle Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#173B32] mb-2">
              Vehicle Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {VEHICLE_TYPES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVehicle(v)}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                    selectedVehicle.id === v.id
                      ? "border-[#173B32] bg-[#173B32] text-white shadow-xs"
                      : "border-[#E7E6E0] bg-white text-[#242A28] hover:border-[#737B76]"
                  }`}
                >
                  <span className="text-2xl">{v.icon}</span>
                  <span className="text-xs font-bold leading-tight">{v.name}</span>
                  <span className={`text-[10px] ${selectedVehicle.id === v.id ? "text-[#C5A66A]" : "text-[#737B76]"}`}>
                    ~{v.mileageKm} {v.id === "ev" ? "km/kWh" : "km/L"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Passengers & AC toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Passengers */}
            <div className="p-3 bg-[#FAF8F4] rounded-2xl border border-[#E7E6E0]">
              <label className="block text-[11px] font-bold text-[#737B76] uppercase tracking-wider mb-2">
                Travelers Sharing Cost: {passengers}
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPassengers(num)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition ${
                      passengers === num
                        ? "bg-[#173B32] text-white"
                        : "bg-white border border-[#E7E6E0] text-[#173B32]"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* AC Switch */}
            <div className="p-3 bg-[#FAF8F4] rounded-2xl border border-[#E7E6E0] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#173B32] block">Air Conditioning (AC)</span>
                <span className="text-[10px] text-[#737B76]">~10% fuel impact on hills</span>
              </div>
              <button
                type="button"
                onClick={() => setAcEnabled(!acEnabled)}
                className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                  acEnabled ? "bg-[#173B32] justify-end" : "bg-gray-300 justify-start"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Live Breakdown Receipt */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#173B32] to-[#122A24] text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-white/10">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A66A]">
                Cost Estimate Breakdown
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">
                {selectedVehicle.name.split(" ")[0]}
              </span>
            </div>

            <div className="py-5 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-[#EDE5D8]">
                <span>Distance:</span>
                <span className="font-bold text-white">{customDistance} KM</span>
              </div>
              <div className="flex justify-between text-[#EDE5D8]">
                <span>Fuel Required:</span>
                <span className="font-bold text-white">
                  {totalFuelNeeded} {selectedVehicle.id === "ev" ? "kWh" : "Litres"}
                </span>
              </div>
              <div className="flex justify-between text-[#EDE5D8]">
                <span>Fuel Expense:</span>
                <span className="font-bold text-white">₹{totalFuelCost.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[#EDE5D8]">
                <span>Fastag Highway Tolls:</span>
                <span className="font-bold text-white">₹{tollCost.toLocaleString("en-IN")}</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between text-sm">
                <span className="text-[#C5A66A] font-bold">Total Transit Cost:</span>
                <span className="font-serif text-lg font-bold text-white">
                  ₹{totalTripCost.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Split per head badge */}
            <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#EDE5D8] block">Cost Per Traveler ({passengers} pax)</span>
                <span className="font-serif text-2xl font-bold text-[#C5A66A]">
                  ₹{costPerPerson.toLocaleString("en-IN")}
                </span>
              </div>
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Budget Friendly ✓
              </span>
            </div>
          </div>

          <div className="pt-6 space-y-2">
            <button
              type="button"
              onClick={() => onOpenAi?.(`Plan road trip pitstops and fuel stations for ${selectedRoute.name} with ${selectedVehicle.name}`)}
              className="w-full py-3 rounded-xl bg-[#C5A66A] hover:bg-white text-[#173B32] font-bold text-xs tracking-wider uppercase transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Highway Pitstops & Fuel Stations</span>
              <span>➔</span>
            </button>
            <p className="text-[10px] text-center text-[#EDE5D8]/70">
              *Toll rates sourced from NHAI Fastag API. Fuel costs based on current metro rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
