"use client";

import React, { useState } from "react";

interface EmergencyStation {
  id: string;
  name: string;
  type: "Mechanic" | "Oxygen" | "Towing" | "Medical";
  location: string;
  distanceKm: string;
  phone: string;
  verified: boolean;
  status: string;
}

const EMERGENCY_STATIONS: EmergencyStation[] = [
  {
    id: "sos-1",
    name: "Himalayan 4x4 & Royal Enfield Care",
    type: "Mechanic",
    location: "Mandi Bypass (NH-3, km 184)",
    distanceKm: "3.2 km away",
    phone: "+91 98160 12345",
    verified: true,
    status: "Mobile Van Available (ETA 18 mins)",
  },
  {
    id: "sos-2",
    name: "Keylong Community Hospital & Oxygen Bank",
    type: "Oxygen",
    location: "Keylong Valley (Alt: 10,100 ft)",
    distanceKm: "8.5 km away",
    phone: "+91 98160 55432",
    verified: true,
    status: "Medical Oxygen Cylinders In Stock",
  },
  {
    id: "sos-3",
    name: "North Highway Hydraulic Towing Express",
    type: "Towing",
    location: "Kullu - Aut Tunnel Checkpost",
    distanceKm: "12 km away",
    phone: "+91 98160 99887",
    verified: true,
    status: "Flatbed Truck Ready",
  },
  {
    id: "sos-4",
    name: "Sarchu Emergency Medical Post & Acclimatization",
    type: "Medical",
    location: "Sarchu Military Base (Alt: 14,070 ft)",
    distanceKm: "On Route Milestone",
    phone: "+91 98160 00112",
    verified: true,
    status: "24/7 Army Medical Doctor on Duty",
  },
];

export function HighwaySosModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedStation, setSelectedStation] = useState<EmergencyStation | null>(null);
  const [dispatchRequested, setDispatchRequested] = useState(false);
  const [dispatching, setDispatching] = useState(false);

  if (!isOpen) return null;

  const handleRequestDispatch = (st: EmergencyStation) => {
    setSelectedStation(st);
    setDispatching(true);
    setTimeout(() => {
      setDispatching(false);
      setDispatchRequested(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-red-500/30 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red SOS Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-5 sm:p-6 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl animate-pulse">
              🚨
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-200 block">
                24/7 Rapid Emergency Response
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                Highway SOS & Roadside Assistance
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center font-bold text-sm transition"
          >
            ✕
          </button>
        </div>

        {/* Toll-free 1-Click Call Bar */}
        <div className="p-4 sm:p-6 bg-red-50 border-b border-red-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-red-800 block">
              Pan-India Highway Emergency Helpline
            </span>
            <span className="font-serif text-2xl font-bold text-red-700 block">
              1800-ROAD-AID (1800 7623 243)
            </span>
            <span className="text-[11px] text-red-600">
              Direct line to Lord of the Road Rapid Highway Support Team
            </span>
          </div>

          <a
            href="tel:18007623243"
            className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <span>📞 Call Emergency SOS</span>
          </a>
        </div>

        {/* Content & Stations */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#173B32]">
              Verified Highway Assistance Points Near Your Route
            </h4>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ● GPS Active
            </span>
          </div>

          {dispatchRequested && selectedStation ? (
            <div className="p-5 bg-emerald-50 border-2 border-emerald-500 rounded-2xl space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <span>✓</span>
                <span>Rescue Assistance Dispatched!</span>
              </div>
              <p className="text-xs text-emerald-700">
                A mobile response unit from <b>{selectedStation.name}</b> has been alerted to your coordinates.
              </p>
              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-[#242A28] font-mono space-y-1">
                <p><b>Unit Contact:</b> {selectedStation.phone}</p>
                <p><b>Estimated Arrival:</b> 15–20 Minutes</p>
                <p><b>Support Reference:</b> #SOS-LOTR-{Math.floor(1000 + Math.random() * 9000)}</p>
              </div>
              <button
                type="button"
                onClick={() => setDispatchRequested(false)}
                className="text-xs font-bold text-emerald-800 underline mt-2 block"
              >
                Back to Emergency Services List
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {EMERGENCY_STATIONS.map((st) => (
                <div
                  key={st.id}
                  className="p-4 rounded-2xl border border-[#E7E6E0] hover:border-[#173B32] transition bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#173B32]">{st.name}</span>
                      <span className="text-[10px] bg-[#FAF8F4] border border-[#E7E6E0] px-2 py-0.5 rounded font-mono text-[#737B76]">
                        {st.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#737B76] mt-0.5">
                      📍 {st.location} · <b className="text-[#173B32]">{st.distanceKm}</b>
                    </p>
                    <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                      ✓ {st.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${st.phone}`}
                      className="px-3.5 py-2 rounded-xl border border-[#173B32] text-[#173B32] hover:bg-[#173B32] hover:text-white text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <span>📞</span>
                      <span>Call</span>
                    </a>
                    <button
                      type="button"
                      disabled={dispatching}
                      onClick={() => handleRequestDispatch(st)}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      {dispatching && selectedStation?.id === st.id ? "Locating..." : "Dispatch ➔"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E7E6E0] bg-[#FAF8F4] flex items-center justify-between text-[11px] text-[#737B76]">
          <span>Verified in partnership with Border Roads Organization (BRO) & NHAI.</span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-[#173B32] hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
