"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  XMarkIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  CalendarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface LeadDetailModalProps {
  leadId: string | null;
  onClose: () => void;
  onLeadUpdated: () => void;
}

export function LeadDetailModal({
  leadId,
  onClose,
  onLeadUpdated,
}: LeadDetailModalProps) {
  const { t } = useLanguage();
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  // Assignment options
  const [offices, setOffices] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);

  // Editable fields
  const [status, setStatus] = useState("NEW");
  const [lostReason, setLostReason] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [officeId, setOfficeId] = useState("");
  const [assignedAgentId, setAssignedAgentId] = useState("");

  // Load Lead details
  useEffect(() => {
    if (!leadId) return;

    async function loadData() {
      setLoading(true);
      try {
        const [leadRes, assigneesRes] = await Promise.all([
          fetch(`/api/leads/${leadId}`),
          fetch(`/api/assignees`),
        ]);

        if (leadRes.ok) {
          const data = await leadRes.json();
          setLead(data);
          setStatus(data.status);
          setLostReason(data.lostReason || "");
          setFollowUpDate(data.followUpDate ? data.followUpDate.split("T")[0] : "");
          setOfficeId(data.officeId || "");
          setAssignedAgentId(data.assignedAgentId || "");
        }

        if (assigneesRes.ok) {
          const assignees = await assigneesRes.json();
          setOffices(assignees.offices || []);
          setAgents(assignees.agents || []);
        }
      } catch (err) {
        console.error("Failed to load lead details:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [leadId]);

  if (!leadId) return null;

  const handleSaveDetails = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          lostReason: status === "LOST" ? lostReason : null,
          followUpDate: followUpDate || null,
          officeId: officeId || null,
          assignedAgentId: assignedAgentId || null,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setLead((prev: any) => ({ ...prev, ...updated }));
        onLeadUpdated();
      }
    } catch (err) {
      console.error("Error updating lead:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    setAddingNote(true);
    try {
      const res = await fetch(`/api/leads/${leadId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: noteContent }),
      });

      if (res.ok) {
        const newNote = await res.json();
        setLead((prev: any) => ({
          ...prev,
          notes: [newNote, ...(prev.notes || [])],
        }));
        setNoteContent("");
      }
    } catch (err) {
      console.error("Error adding note:", err);
    } finally {
      setAddingNote(false);
    }
  };

  // Filter agents for selected office
  const filteredAgents = officeId
    ? agents.filter((a) => !a.officeId || a.officeId === officeId)
    : agents;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {lead?.leadNumber}
              </span>
              <span className="text-xs text-gray-400">
                Source: {lead?.source}
              </span>
            </div>
            <h2 className="text-base font-bold text-gray-900 mt-1">
              {lead?.name || "Loading..."}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {loading || !lead ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Quick Contact & Action Bar */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs text-blue-700 font-medium">Customer Contact</p>
                <p className="text-sm font-bold text-gray-900">{lead.phone}</p>
                {lead.email && <p className="text-xs text-gray-600">{lead.email}</p>}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/91${lead.phone.replace(/\D/g, "").slice(-10)}?text=Hello%20${encodeURIComponent(
                    lead.name
                  )},%20greetings%20from%20Lord%20of%20the%20Road!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  <span>{t("crm.quickWhatsApp")}</span>
                </a>
                <a
                  href={`tel:${lead.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span>{t("crm.quickCall")}</span>
                </a>
              </div>
            </div>

            {/* Trip Details Grid */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                <span>{t("crm.tripDetails")}</span>
              </h3>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400">{t("crm.destination")}</span>
                  <p className="font-semibold text-gray-900 mt-0.5">
                    {lead.destination || "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">{t("crm.service")}</span>
                  <p className="font-semibold text-gray-900 mt-0.5">
                    {lead.serviceType.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Travelers</span>
                  <p className="font-semibold text-gray-900 mt-0.5">
                    {lead.paxAdults} Adults, {lead.paxChildren} Children
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">{t("crm.pinCode")}</span>
                  <p className="font-semibold text-gray-900 mt-0.5">
                    {lead.pinCode || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">{t("crm.budget")}</span>
                  <p className="font-semibold text-gray-900 mt-0.5">
                    {lead.budgetMin ? formatCurrency(Number(lead.budgetMin)) : "₹0"}
                    {lead.budgetMax ? ` - ${formatCurrency(Number(lead.budgetMax))}` : ""}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Travel Dates</span>
                  <p className="font-semibold text-gray-900 mt-0.5">
                    {lead.travelDateStart ? formatDate(lead.travelDateStart) : "Flexible"}
                  </p>
                </div>
              </div>

              {lead.message && (
                <div className="mt-3 pt-3 border-t border-gray-100 text-xs">
                  <span className="text-gray-400">Customer Message / Note:</span>
                  <p className="mt-1 text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    "{lead.message}"
                  </p>
                </div>
              )}
            </div>

            {/* Pipeline Stage & Assignment Controls */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Pipeline & Territory Management
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Status selector */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    {t("crm.status")}
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-gray-200 bg-white font-medium focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="NEW">{t("crm.status_NEW")}</option>
                    <option value="CONTACTED">{t("crm.status_CONTACTED")}</option>
                    <option value="QUOTE_SENT">{t("crm.status_QUOTE_SENT")}</option>
                    <option value="BOOKED">{t("crm.status_BOOKED")}</option>
                    <option value="LOST">{t("crm.status_LOST")}</option>
                  </select>
                </div>

                {/* Follow-up date */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    {t("crm.followUp")} Date
                  </label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full py-1.5 px-3 rounded-lg border border-gray-200 bg-white text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Office selector */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    {t("crm.office")}
                  </label>
                  <select
                    value={officeId}
                    onChange={(e) => setOfficeId(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 text-xs"
                  >
                    <option value="">{t("crm.unassigned")}</option>
                    {offices.map((off) => (
                      <option key={off.id} value={off.id}>
                        {off.name} ({off.city})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Agent selector */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    {t("crm.assignedAgent")}
                  </label>
                  <select
                    value={assignedAgentId}
                    onChange={(e) => setAssignedAgentId(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 text-xs"
                  >
                    <option value="">None / Office Pool</option>
                    {filteredAgents.map((ag) => (
                      <option key={ag.id} value={ag.id}>
                        {ag.name} ({ag.phone})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lost Reason input if LOST */}
              {status === "LOST" && (
                <div className="text-xs">
                  <label className="block text-red-600 font-medium mb-1">
                    {t("crm.lostReason")}
                  </label>
                  <input
                    type="text"
                    value={lostReason}
                    onChange={(e) => setLostReason(e.target.value)}
                    placeholder="e.g. Budget exceeded, booked elsewhere, trip cancelled..."
                    className="w-full py-2 px-3 rounded-lg border border-red-200 bg-red-50/50 text-xs focus:ring-2 focus:ring-red-400"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleSaveDetails}
                  loading={saving}
                >
                  Update Lead
                </Button>
              </div>
            </div>

            {/* Internal Notes Timeline */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                {t("crm.internalNotes")} ({lead.notes?.length || 0})
              </h3>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="mb-4">
                <textarea
                  rows={2}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder={t("crm.writeNotePlaceholder")}
                  className="w-full p-2.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end mt-1.5">
                  <Button
                    size="sm"
                    variant="secondary"
                    type="submit"
                    loading={addingNote}
                    disabled={!noteContent.trim()}
                  >
                    {t("crm.addNote")}
                  </Button>
                </div>
              </form>

              {/* Notes List */}
              <div className="space-y-3">
                {lead.notes?.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No notes added yet.</p>
                ) : (
                  lead.notes.map((note: any) => (
                    <div
                      key={note.id}
                      className="bg-gray-50 border border-gray-100 p-3 rounded-lg text-xs"
                    >
                      <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                        <span className="font-semibold text-gray-700">
                          {note.author?.name || "System"} ({note.author?.role})
                        </span>
                        <span>{formatDate(note.createdAt)}</span>
                      </div>
                      <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
