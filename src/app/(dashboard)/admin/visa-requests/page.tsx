"use client";

import React, { useState } from "react";

export default function AdminVisaRequestsPage() {
  const requests = [
    { id: "VISA-9912", applicant: "Rohan Sharma", country: "United Arab Emirates (Dubai)", visaType: "30-Day e-Visa", travelDate: "15 Apr 2026", officer: "Tariq Ahmad", status: "FILED_WITH_GDRFA" },
    { id: "VISA-8841", applicant: "Ananya Iyer", country: "Singapore", visaType: "e-Visa Multi Entry", travelDate: "20 May 2026", officer: "Priya Menon", status: "DOCS_VERIFIED" },
    { id: "VISA-7712", applicant: "Sameer Joshi", country: "Schengen (France/Swiss)", visaType: "Tourist Type C", travelDate: "10 Jun 2026", officer: "Vikram Singhania", status: "VFS_APPT_CONFIRMED" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Immigration & Documentation
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Tourist Visa Applications
          </h1>
          <p className="text-xs text-gray-500">
            Process applicant passports, verify ITR & flight vouchers, and manage consulate submissions.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-gray-500 bg-gray-50 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3">File Number</th>
              <th className="py-2.5 px-3">Applicant Name</th>
              <th className="py-2.5 px-3">Destination & Visa Type</th>
              <th className="py-2.5 px-3">Travel Date</th>
              <th className="py-2.5 px-3">Assigned Officer</th>
              <th className="py-2.5 px-3">Stage</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-3 font-mono font-bold text-[#173D32]">{r.id}</td>
                <td className="py-3 px-3 font-bold text-gray-900">{r.applicant}</td>
                <td className="py-3 px-3">
                  <div className="text-gray-900 font-medium">{r.country}</div>
                  <span className="text-[10px] text-gray-400">{r.visaType}</span>
                </td>
                <td className="py-3 px-3 text-gray-600">{r.travelDate}</td>
                <td className="py-3 px-3 text-gray-800 font-medium">{r.officer}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-800">
                    {r.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => alert(`Reviewing application ${r.id}`)}
                    className="text-xs font-semibold text-[#173D32] hover:underline"
                  >
                    Review Dossier →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
