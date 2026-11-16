"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/Button";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  TableCellsIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";

export interface FilterState {
  status: string;
  source: string;
  serviceType: string;
  search: string;
  officeId?: string;
  viewMode: "table" | "kanban";
}

interface LeadFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  stats: Record<string, number>;
  onExport: () => void;
  onCreateOpen: () => void;
  isExporting?: boolean;
}

const STATUS_KEYS = [
  { key: "ALL", labelKey: "crm.all" },
  { key: "NEW", labelKey: "crm.status_NEW", color: "bg-blue-100 text-blue-800" },
  { key: "CONTACTED", labelKey: "crm.status_CONTACTED", color: "bg-amber-100 text-amber-800" },
  { key: "QUOTE_SENT", labelKey: "crm.status_QUOTE_SENT", color: "bg-purple-100 text-purple-800" },
  { key: "BOOKED", labelKey: "crm.status_BOOKED", color: "bg-green-100 text-green-800" },
  { key: "LOST", labelKey: "crm.status_LOST", color: "bg-gray-100 text-gray-700" },
];

const SOURCES = [
  "ALL",
  "WEBSITE",
  "FACEBOOK",
  "GOOGLE",
  "JUSTDIAL",
  "BOOKING_COM",
  "MAKEMYTRIP",
  "WHATSAPP",
  "MANUAL",
  "CSV_IMPORT",
];

const SERVICE_TYPES = [
  "ALL",
  "HOLIDAY_PACKAGE",
  "HOTEL",
  "FLIGHT",
  "BUS",
  "TRAIN",
  "CAB",
  "TOUR_ACTIVITY",
  "INSURANCE",
  "TRAVEL_SHOP",
];

export function LeadFilters({
  filters,
  onChange,
  stats,
  onExport,
  onCreateOpen,
  isExporting,
}: LeadFiltersProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      {/* Top Bar: Search, View Switcher & Action Buttons */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder={t("crm.searchPlaceholder")}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* View Switcher & Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Table / Kanban Toggle */}
          <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
            <button
              onClick={() => onChange({ ...filters, viewMode: "table" })}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filters.viewMode === "table"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <TableCellsIcon className="w-4 h-4" />
              <span>{t("crm.tableView")}</span>
            </button>
            <button
              onClick={() => onChange({ ...filters, viewMode: "kanban" })}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filters.viewMode === "kanban"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ViewColumnsIcon className="w-4 h-4" />
              <span>{t("crm.kanbanView")}</span>
            </button>
          </div>

          {/* Export CSV */}
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            loading={isExporting}
            className="flex items-center gap-1.5"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>{t("crm.exportCsv")}</span>
          </Button>

          {/* Create Lead */}
          <Button
            variant="primary"
            size="sm"
            onClick={onCreateOpen}
            className="flex items-center gap-1.5"
          >
            <PlusIcon className="w-4 h-4" />
            <span>{t("crm.newLead")}</span>
          </Button>
        </div>
      </div>

      {/* Status Stage Tabs with Counters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-gray-100">
        {STATUS_KEYS.map((s) => {
          const isActive = filters.status === s.key;
          const count = s.key === "ALL" ? stats.TOTAL ?? 0 : stats[s.key] ?? 0;
          return (
            <button
              key={s.key}
              onClick={() => onChange({ ...filters, status: s.key })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{t(s.labelKey)}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Dropdown Filters: Source & Service */}
      <div className="flex items-center gap-3 flex-wrap text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-gray-500 font-medium">{t("crm.source")}:</span>
          <select
            value={filters.source}
            onChange={(e) => onChange({ ...filters, source: e.target.value })}
            className="py-1 px-2.5 rounded-md border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {SOURCES.map((src) => (
              <option key={src} value={src}>
                {src === "ALL" ? t("crm.all") : src.replace("_", ". ")}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-gray-500 font-medium">{t("crm.service")}:</span>
          <select
            value={filters.serviceType}
            onChange={(e) => onChange({ ...filters, serviceType: e.target.value })}
            className="py-1 px-2.5 rounded-md border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {SERVICE_TYPES.map((st) => (
              <option key={st} value={st}>
                {st === "ALL" ? t("crm.all") : st.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
