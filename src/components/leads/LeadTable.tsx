"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
  MapPinIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
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
  office?: { name: string; city: string } | null;
  assignedAgent?: { name: string; phone: string } | null;
  _count?: { notes: number };
}

interface LeadTableProps {
  leads: LeadItem[];
  onSelectLead: (lead: LeadItem) => void;
  loading?: boolean;
}

const STATUS_BADGES: Record<string, { bg: string; text: string }> = {
  NEW: { bg: "bg-blue-50 text-blue-700 border-blue-200", text: "crm.status_NEW" },
  CONTACTED: { bg: "bg-amber-50 text-amber-700 border-amber-200", text: "crm.status_CONTACTED" },
  QUOTE_SENT: { bg: "bg-purple-50 text-purple-700 border-purple-200", text: "crm.status_QUOTE_SENT" },
  BOOKED: { bg: "bg-green-50 text-green-700 border-green-200", text: "crm.status_BOOKED" },
  LOST: { bg: "bg-gray-100 text-gray-700 border-gray-200", text: "crm.status_LOST" },
};

const SOURCE_COLORS: Record<string, string> = {
  WEBSITE: "bg-emerald-50 text-emerald-700",
  FACEBOOK: "bg-blue-50 text-blue-700",
  GOOGLE: "bg-red-50 text-red-700",
  JUSTDIAL: "bg-orange-50 text-orange-700",
  BOOKING_COM: "bg-sky-50 text-sky-700",
  MAKEMYTRIP: "bg-rose-50 text-rose-700",
  WHATSAPP: "bg-green-50 text-green-700",
  MANUAL: "bg-gray-100 text-gray-700",
};

export function LeadTable({ leads, onSelectLead, loading }: LeadTableProps) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm">{t("common.loading")}</p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <p className="text-gray-500 font-medium mb-1">{t("common.noData")}</p>
        <p className="text-xs text-gray-400">No leads match your current search and filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50/75 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">{t("crm.leadNumber")}</th>
              <th className="py-3 px-4">{t("crm.customer")}</th>
              <th className="py-3 px-4">{t("crm.tripDetails")}</th>
              <th className="py-3 px-4">{t("crm.source")}</th>
              <th className="py-3 px-4">{t("crm.status")}</th>
              <th className="py-3 px-4">{t("crm.assignment")}</th>
              <th className="py-3 px-4">{t("crm.followUp")}</th>
              <th className="py-3 px-4 text-right">{t("common.edit")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => {
              const statusCfg = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
              const sourceClass = SOURCE_COLORS[lead.source] || "bg-gray-100 text-gray-700";

              return (
                <tr
                  key={lead.id}
                  onClick={() => onSelectLead(lead)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                >
                  {/* Lead # & Date */}
                  <td className="py-3.5 px-4 font-mono font-medium text-gray-900 whitespace-nowrap">
                    <div>{lead.leadNumber}</div>
                    <div className="text-[10px] text-gray-400 font-sans">
                      {formatDate(lead.createdAt)}
                    </div>
                  </td>

                  {/* Customer Info & Quick Action Buttons */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-900">{lead.name}</div>
                    <div className="flex items-center gap-2 mt-0.5 text-gray-500">
                      <span>{lead.phone}</span>
                      {lead.pinCode && (
                        <span className="flex items-center text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                          <MapPinIcon className="w-3 h-3 mr-0.5 text-gray-400" />
                          {lead.pinCode}
                        </span>
                      )}
                    </div>
                    {/* Quick WhatsApp & Call buttons */}
                    <div
                      className="flex items-center gap-2 mt-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={`https://wa.me/91${lead.phone.replace(/\D/g, "").slice(-10)}?text=Hello%20${encodeURIComponent(
                          lead.name
                        )},%20greetings%20from%20Lord%20of%20the%20Road!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded transition-colors"
                      >
                        <ChatBubbleLeftRightIcon className="w-3 h-3" />
                        <span>{t("crm.quickWhatsApp")}</span>
                      </a>
                      <a
                        href={`tel:${lead.phone}`}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors"
                      >
                        <PhoneIcon className="w-3 h-3" />
                        <span>{t("crm.quickCall")}</span>
                      </a>
                    </div>
                  </td>

                  {/* Destination, Service, Pax & Budget */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-gray-900">
                      {lead.destination || "Custom Travel"}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {lead.serviceType.replace("_", " ")} • {lead.paxAdults}A
                      {lead.paxChildren > 0 ? `, ${lead.paxChildren}C` : ""}
                    </div>
                    {(lead.budgetMin || lead.budgetMax) && (
                      <div className="text-[10px] text-gray-400 font-medium mt-0.5">
                        {lead.budgetMin ? formatCurrency(Number(lead.budgetMin)) : "₹0"}
                        {lead.budgetMax ? ` - ${formatCurrency(Number(lead.budgetMax))}` : "+"}
                      </div>
                    )}
                  </td>

                  {/* Source */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${sourceClass}`}
                    >
                      {lead.source.replace("_", ". ")}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusCfg.bg}`}
                    >
                      {t(statusCfg.text)}
                    </span>
                  </td>

                  {/* Branch Office & Agent Assignment */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {lead.office ? (
                      <div className="flex items-center gap-1 text-gray-800 font-medium">
                        <BuildingOfficeIcon className="w-3.5 h-3.5 text-gray-400" />
                        <span>{lead.office.name}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-medium">
                        {t("crm.unassigned")}
                      </span>
                    )}

                    {lead.assignedAgent ? (
                      <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                        <UserCircleIcon className="w-3.5 h-3.5 text-gray-400" />
                        <span>{lead.assignedAgent.name}</span>
                      </div>
                    ) : null}
                  </td>

                  {/* Follow-up reminder */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {lead.followUpDate ? (
                      <span className="text-gray-700 font-medium">
                        {formatDate(lead.followUpDate)}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[11px]">-</span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLead(lead);
                      }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title={t("crm.leadDetails")}
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
