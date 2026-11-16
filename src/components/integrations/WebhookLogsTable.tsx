"use client";

import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import {
  CodeBracketIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export interface WebhookLogItem {
  id: string;
  platform: string;
  endpoint: string;
  method: string;
  headers?: any;
  payload: any;
  ipAddress?: string | null;
  status: string;
  leadId?: string | null;
  errorMessage?: string | null;
  processedIn?: number | null;
  createdAt: string;
}

interface WebhookLogsTableProps {
  logs: WebhookLogItem[];
  loading?: boolean;
}

const STATUS_BADGES: Record<string, { bg: string; icon: any }> = {
  SUCCESS: { bg: "bg-green-50 text-green-700 border-green-200", icon: CheckCircleIcon },
  DUPLICATE_IGNORED: { bg: "bg-blue-50 text-blue-700 border-blue-200", icon: CheckCircleIcon },
  SIGNATURE_INVALID: { bg: "bg-red-50 text-red-700 border-red-200", icon: XCircleIcon },
  FAILED: { bg: "bg-rose-50 text-rose-700 border-rose-200", icon: XCircleIcon },
  DISABLED: { bg: "bg-gray-100 text-gray-700 border-gray-200", icon: ExclamationTriangleIcon },
};

export function WebhookLogsTable({ logs, loading }: WebhookLogsTableProps) {
  const [selectedLog, setSelectedLog] = useState<WebhookLogItem | null>(null);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm">Loading webhook event logs...</p>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <p className="text-gray-500 font-medium mb-1">No Webhook Logs Yet</p>
        <p className="text-xs text-gray-400">
          Incoming payloads from Facebook, Google Ads, Justdial, and Zapier will appear here in real time.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Endpoint</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">Result / Error</th>
                <th className="py-3 px-4 text-right">Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => {
                const badge = STATUS_BADGES[log.status] || STATUS_BADGES.FAILED;
                const Icon = badge.icon;

                return (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedLog(log)}
                  >
                    <td className="py-3 px-4 whitespace-nowrap text-gray-500 font-mono text-[11px]">
                      {new Date(log.createdAt).toLocaleTimeString()} • {formatDate(log.createdAt)}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap font-semibold text-gray-900">
                      {log.platform}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap font-mono text-gray-600 text-[11px]">
                      {log.endpoint}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{log.status}</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-gray-500 text-[11px]">
                      {log.processedIn !== null && log.processedIn !== undefined
                        ? `${log.processedIn} ms`
                        : "-"}
                    </td>

                    <td className="py-3 px-4 text-gray-600 max-w-xs truncate text-[11px]">
                      {log.errorMessage ? (
                        <span className="text-red-600 font-medium">{log.errorMessage}</span>
                      ) : log.leadId ? (
                        <span className="text-blue-600 font-mono">Lead ID: {log.leadId.slice(-8)}</span>
                      ) : (
                        <span className="text-gray-400">Processed</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLog(log);
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Inspect Payload"
                      >
                        <CodeBracketIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payload Inspector Drawer */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 flex justify-end">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {selectedLog.platform} Webhook Event
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Received at {new Date(selectedLog.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs font-mono">
              <div>
                <span className="text-gray-400 block font-sans text-[11px] font-bold uppercase mb-1">
                  Raw Payload JSON:
                </span>
                <pre className="p-3 bg-gray-900 text-gray-100 rounded-xl overflow-x-auto text-[11px] max-h-72">
                  {JSON.stringify(selectedLog.payload, null, 2)}
                </pre>
              </div>

              {selectedLog.headers && (
                <div>
                  <span className="text-gray-400 block font-sans text-[11px] font-bold uppercase mb-1">
                    Sanitized Headers:
                  </span>
                  <pre className="p-3 bg-gray-100 text-gray-800 rounded-xl overflow-x-auto text-[10px] max-h-48">
                    {JSON.stringify(selectedLog.headers, null, 2)}
                  </pre>
                </div>
              )}

              {selectedLog.errorMessage && (
                <div>
                  <span className="text-red-500 block font-sans text-[11px] font-bold uppercase mb-1">
                    Error Diagnostic:
                  </span>
                  <p className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-sans">
                    {selectedLog.errorMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
