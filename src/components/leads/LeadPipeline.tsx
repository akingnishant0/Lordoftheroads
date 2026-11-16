"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  MapPinIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface LeadItem {
  id: string;
  leadNumber: string;
  source: string;
  serviceType: string;
  name: string;
  phone: string;
  email?: string | null;
  pinCode?: string | null;
  destination?: string | null;
  paxAdults: number;
  paxChildren: number;
  budgetMin?: number | null;
  budgetMax?: number | null;
  status: string;
  followUpDate?: string | null;
  createdAt: string;
  office?: { name: string } | null;
  assignedAgent?: { name: string } | null;
}

interface LeadPipelineProps {
  leads: LeadItem[];
  onSelectLead: (lead: LeadItem) => void;
  onQuickStatusChange: (leadId: string, nextStatus: string) => void;
  loading?: boolean;
}

const STAGES = [
  { key: "NEW", labelKey: "crm.status_NEW", color: "border-blue-500 bg-blue-50 text-blue-800" },
  { key: "CONTACTED", labelKey: "crm.status_CONTACTED", color: "border-amber-500 bg-amber-50 text-amber-800" },
  { key: "QUOTE_SENT", labelKey: "crm.status_QUOTE_SENT", color: "border-purple-500 bg-purple-50 text-purple-800" },
  { key: "BOOKED", labelKey: "crm.status_BOOKED", color: "border-green-500 bg-green-50 text-green-800" },
  { key: "LOST", labelKey: "crm.status_LOST", color: "border-gray-400 bg-gray-50 text-gray-700" },
];

export function LeadPipeline({
  leads,
  onSelectLead,
  onQuickStatusChange,
  loading,
}: LeadPipelineProps) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm">{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
      {STAGES.map((stage) => {
        const stageLeads = leads.filter((l) => l.status === stage.key);

        return (
          <div
            key={stage.key}
            className="bg-gray-50/70 rounded-xl border border-gray-200/70 p-3 flex flex-col min-w-[280px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${stage.color.split(" ")[0].replace("border-", "bg-")}`} />
                <h3 className="font-semibold text-xs text-gray-800 uppercase tracking-wider">
                  {t(stage.labelKey)}
                </h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-700">
                {stageLeads.length}
              </span>
            </div>

            {/* Column Cards */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
              {stageLeads.length === 0 ? (
                <div className="py-8 text-center text-[11px] text-gray-400 italic">
                  No leads in this stage
                </div>
              ) : (
                stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => onSelectLead(lead)}
                    className="bg-white rounded-lg p-3 border border-gray-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
                  >
                    {/* Top Row: Lead # & Source */}
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5">
                      <span className="font-mono font-medium text-gray-500">
                        {lead.leadNumber}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded font-medium">
                        {lead.source}
                      </span>
                    </div>

                    {/* Customer Name & Destination */}
                    <div className="font-semibold text-xs text-gray-900 group-hover:text-blue-600 transition-colors">
                      {lead.name}
                    </div>
                    <div className="text-[11px] font-medium text-gray-600 mt-0.5">
                      {lead.destination || "General Travel Enquiry"}
                    </div>

                    {/* Metadata pills: Service, Pax, Pin */}
                    <div className="flex items-center gap-1.5 flex-wrap mt-2 text-[10px] text-gray-500">
                      <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                        {lead.serviceType.replace("_", " ")}
                      </span>
                      {lead.pinCode && (
                        <span className="flex items-center bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded">
                          <MapPinIcon className="w-2.5 h-2.5 mr-0.5" />
                          {lead.pinCode}
                        </span>
                      )}
                      {(lead.budgetMin || lead.budgetMax) && (
                        <span className="font-semibold text-gray-700">
                          {lead.budgetMax ? formatCurrency(Number(lead.budgetMax)) : formatCurrency(Number(lead.budgetMin || 0))}
                        </span>
                      )}
                    </div>

                    {/* Follow-up reminder */}
                    {lead.followUpDate && (
                      <div className="flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-1 rounded mt-2">
                        <ClockIcon className="w-3 h-3" />
                        <span>Due: {formatDate(lead.followUpDate)}</span>
                      </div>
                    )}

                    {/* Bottom Action Bar */}
                    <div
                      className="flex items-center justify-between border-t border-gray-100 pt-2 mt-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/91${lead.phone.replace(/\D/g, "").slice(-10)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700 p-1 rounded hover:bg-emerald-50"
                          title="WhatsApp"
                        >
                          <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                          title="Call"
                        >
                          <PhoneIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* Quick stage transition dropdown */}
                      <select
                        value={lead.status}
                        onChange={(e) => onQuickStatusChange(lead.id, e.target.value)}
                        className="text-[10px] py-0.5 px-1.5 rounded border border-gray-200 bg-gray-50 text-gray-700 font-medium focus:outline-none"
                      >
                        {STAGES.map((s) => (
                          <option key={s.key} value={s.key}>
                            {t(s.labelKey)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
