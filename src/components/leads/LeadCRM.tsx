"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LeadFilters, FilterState } from "./LeadFilters";
import { LeadTable } from "./LeadTable";
import { LeadPipeline } from "./LeadPipeline";
import { LeadDetailModal } from "./LeadDetailModal";
import { CreateLeadModal } from "./CreateLeadModal";

interface LeadCRMProps {
  initialOfficeId?: string;
  initialAgentId?: string;
  title?: string;
  subtitle?: string;
}

export function LeadCRM({
  initialOfficeId,
  initialAgentId,
  title,
  subtitle,
}: LeadCRMProps) {
  const { t } = useLanguage();

  const [filters, setFilters] = useState<FilterState>({
    status: "ALL",
    source: "ALL",
    serviceType: "ALL",
    search: "",
    officeId: initialOfficeId,
    viewMode: "table",
  });

  const [leads, setLeads] = useState<any[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [pagination, setPagination] = useState({ page: 1, limit: 25, totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Fetch leads and stats
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filters.status !== "ALL") query.set("status", filters.status);
      if (filters.source !== "ALL") query.set("source", filters.source);
      if (filters.serviceType !== "ALL") query.set("serviceType", filters.serviceType);
      if (filters.search) query.set("search", filters.search);
      if (filters.officeId) query.set("officeId", filters.officeId);
      if (initialAgentId) query.set("assignedAgentId", initialAgentId);
      query.set("page", String(pagination.page));
      query.set("limit", String(pagination.limit));

      const [leadsRes, statsRes] = await Promise.all([
        fetch(`/api/leads?${query.toString()}`),
        fetch(`/api/leads/stats`),
      ]);

      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.leads || []);
        if (data.pagination) setPagination(data.pagination);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit, initialAgentId]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handle CSV export
  const handleExport = async () => {
    setExporting(true);
    try {
      const query = new URLSearchParams();
      if (filters.status !== "ALL") query.set("status", filters.status);
      if (filters.source !== "ALL") query.set("source", filters.source);
      if (filters.serviceType !== "ALL") query.set("serviceType", filters.serviceType);
      if (filters.search) query.set("search", filters.search);
      if (filters.officeId) query.set("officeId", filters.officeId);
      if (initialAgentId) query.set("assignedAgentId", initialAgentId);

      const res = await fetch(`/api/leads/export?${query.toString()}`);
      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads_export_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CSV Export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  // Quick status changer (from Kanban or Table)
  const handleQuickStatusChange = async (leadId: string, nextStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (res.ok) {
        fetchLeads();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          {title || t("crm.title")}
        </h1>
        <p className="text-xs md:text-sm text-gray-500 mt-0.5">
          {subtitle || t("crm.subtitle")}
        </p>
      </div>

      {/* Filters, Search & Action Bar */}
      <LeadFilters
        filters={filters}
        onChange={setFilters}
        stats={stats}
        onExport={handleExport}
        onCreateOpen={() => setCreateModalOpen(true)}
        isExporting={exporting}
      />

      {/* Main Content: Table or Kanban view */}
      {filters.viewMode === "table" ? (
        <LeadTable
          leads={leads}
          onSelectLead={(l) => setSelectedLeadId(l.id)}
          loading={loading}
        />
      ) : (
        <LeadPipeline
          leads={leads}
          onSelectLead={(l) => setSelectedLeadId(l.id)}
          onQuickStatusChange={handleQuickStatusChange}
          loading={loading}
        />
      )}

      {/* Pagination (Table view only) */}
      {filters.viewMode === "table" && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-gray-500 px-2">
          <span>
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of{" "}
            {pagination.totalCount} leads
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page <= 1}
              className="px-3 py-1 rounded-md border border-gray-200 bg-white disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="font-semibold text-gray-700">
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page >= pagination.totalPages}
              className="px-3 py-1 rounded-md border border-gray-200 bg-white disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Lead Detail Slide-over Modal */}
      {selectedLeadId && (
        <LeadDetailModal
          leadId={selectedLeadId}
          onClose={() => setSelectedLeadId(null)}
          onLeadUpdated={fetchLeads}
        />
      )}

      {/* Create Lead Modal */}
      <CreateLeadModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreated={fetchLeads}
      />
    </div>
  );
}
