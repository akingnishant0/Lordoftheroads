"use client";

import React from "react";

export default function AdminAuditLogsPage() {
  const logs = [
    { id: "LOG-9921", action: "BOOKING_CREATED", actor: "customer@lordoftheroad.in", details: "Booking LOTR-884210 confirmed with Razorpay payment ₹59,848", ip: "103.212.14.88", time: "Today 10:14 AM" },
    { id: "LOG-9920", action: "WALLET_PAYOUT_REQUEST", actor: "agent@lordoftheroad.in", details: "Payout ₹10,000 requested to UPI partner@okhdfcbank", ip: "49.36.12.190", time: "Today 09:30 AM" },
    { id: "LOG-9919", action: "INTEGRATION_SYNC", actor: "SYSTEM_DAEMON", details: "Travel Protection Shield Engine quote API ping status 200 OK", ip: "127.0.0.1", time: "Today 08:00 AM" },
    { id: "LOG-9918", action: "DESTINATION_UPDATE", actor: "admin@lordoftheroad.in", details: "Updated Kashmir starting price to ₹28,500", ip: "157.34.82.11", time: "Yesterday" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            System Security
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Audit Trails & Security Logs
          </h1>
          <p className="text-xs text-gray-500">
            Immutable log of all user logins, financial transactions, configuration changes, and integration syncs.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="text-gray-500 bg-gray-50 uppercase text-[10px] tracking-wider font-sans">
            <tr>
              <th className="py-2.5 px-3">Log ID</th>
              <th className="py-2.5 px-3">Action Type</th>
              <th className="py-2.5 px-3">Actor / Principal</th>
              <th className="py-2.5 px-3">Action Details</th>
              <th className="py-2.5 px-3">IP Address</th>
              <th className="py-2.5 px-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-sans">
            {logs.map((l) => (
              <tr key={l.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-3 font-mono font-bold text-[#173D32]">{l.id}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-gray-100 font-semibold text-gray-800">
                    {l.action}
                  </span>
                </td>
                <td className="py-3 px-3 font-medium text-gray-900">{l.actor}</td>
                <td className="py-3 px-3 text-gray-700 text-xs">{l.details}</td>
                <td className="py-3 px-3 font-mono text-gray-400">{l.ip}</td>
                <td className="py-3 px-3 text-gray-400 text-xs">{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
