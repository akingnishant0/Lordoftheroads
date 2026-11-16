"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function CreateLeadModal({
  isOpen,
  onClose,
  onCreated,
}: CreateLeadModalProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pinCode: "",
    destination: "",
    serviceType: "HOLIDAY_PACKAGE",
    paxAdults: 2,
    paxChildren: 0,
    budgetMin: "",
    budgetMax: "",
    travelDateStart: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDuplicateWarning(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create lead");
      }

      if (data.isDuplicate) {
        setDuplicateWarning(
          `Notice: An active lead for ${formData.phone} already existed (${data.lead.leadNumber}). An update note was attached.`
        );
        setTimeout(() => {
          onCreated();
          onClose();
        }, 2500);
      } else {
        onCreated();
        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">
            {t("crm.newLead")}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {duplicateWarning && (
          <div className="mt-3 p-3 text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-lg">
            {duplicateWarning}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          {/* Customer Name & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Customer Name *"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Amit Sharma"
            />
            <Input
              label="Phone Number (10 digits) *"
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 9876543210"
            />
          </div>

          {/* Email & Pin Code (Auto-assign key) */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="amit@example.com"
            />
            <Input
              label="Pin Code (6 digits)"
              value={formData.pinCode}
              onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
              placeholder="e.g. 110001"
              helperText="Auto-routes to nearest office"
            />
          </div>

          {/* Service & Destination */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                {t("crm.service")}
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full py-2 px-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="HOLIDAY_PACKAGE">Holiday Package</option>
                <option value="HOTEL">Hotel</option>
                <option value="FLIGHT">Flight</option>
                <option value="BUS">Bus</option>
                <option value="TRAIN">Train</option>
                <option value="CAB">Cab</option>
                <option value="TOUR_ACTIVITY">Tour Activity</option>
                <option value="INSURANCE">Insurance</option>
                <option value="TRAVEL_SHOP">Travel Shop</option>
              </select>
            </div>
            <Input
              label={t("crm.destination")}
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              placeholder="e.g. Goa, Manali, Kerala"
            />
          </div>

          {/* Pax & Dates */}
          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Adults"
              type="number"
              min="1"
              value={formData.paxAdults}
              onChange={(e) => setFormData({ ...formData, paxAdults: Number(e.target.value) })}
            />
            <Input
              label="Children"
              type="number"
              min="0"
              value={formData.paxChildren}
              onChange={(e) => setFormData({ ...formData, paxChildren: Number(e.target.value) })}
            />
            <Input
              label="Travel Date"
              type="date"
              value={formData.travelDateStart}
              onChange={(e) => setFormData({ ...formData, travelDateStart: e.target.value })}
            />
          </div>

          {/* Budget Range */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Budget Min (₹)"
              type="number"
              value={formData.budgetMin}
              onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
              placeholder="10000"
            />
            <Input
              label="Budget Max (₹)"
              type="number"
              value={formData.budgetMax}
              onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
              placeholder="50000"
            />
          </div>

          {/* Message / Remarks */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Customer Notes / Requests
            </label>
            <textarea
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Specific hotel preference, flight timing, cab requirements..."
              className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              {t("common.cancel")}
            </Button>
            <Button variant="primary" size="sm" type="submit" loading={loading}>
              {t("crm.newLead")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
