"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CheckCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";

export function PublicEnquiryForm() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pinCode: "",
    destination: "",
    serviceType: "HOLIDAY_PACKAGE",
    travelDateStart: "",
    paxAdults: 2,
    paxChildren: 0,
    budgetMax: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "WEBSITE",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setSubmittedLead(data.lead);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submittedLead) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-green-200 shadow-xl text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircleIcon className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Trip Enquiry Received!</h3>
        <p className="text-xs text-gray-500 mt-1">
          Reference Number:{" "}
          <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            {submittedLead.leadNumber}
          </span>
        </p>
        <p className="text-sm text-gray-600 mt-4 leading-relaxed">
          Thank you, <span className="font-semibold text-gray-900">{submittedLead.name}</span>!
          {submittedLead.office ? (
            <>
              {" "}Your inquiry has been assigned to our{" "}
              <span className="font-semibold text-blue-700">{submittedLead.office.name}</span>{" "}
              branch. An expert travel consultant will call or WhatsApp you on{" "}
              <span className="font-semibold text-gray-900">{submittedLead.phone}</span> shortly.
            </>
          ) : (
            <>
              {" "}Our travel concierge will contact you on{" "}
              <span className="font-semibold text-gray-900">{submittedLead.phone}</span> within 15 minutes with customized quotes.
            </>
          )}
        </p>

        <div className="mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSubmittedLead(null);
              setFormData({
                name: "",
                phone: "",
                email: "",
                pinCode: "",
                destination: "",
                serviceType: "HOLIDAY_PACKAGE",
                travelDateStart: "",
                paxAdults: 2,
                paxChildren: 0,
                budgetMax: "",
                message: "",
              });
            }}
          >
            Submit Another Enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 max-w-xl mx-auto">
      <div className="mb-5 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Quick Travel Inquiry
        </span>
        <h3 className="text-xl font-bold text-gray-900 mt-2">
          Plan Your Next Journey
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Fill in your details and get customized itineraries from trusted local offices across India.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        {/* Destination & Service Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Where do you want to go? *"
            required
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            placeholder="e.g. Goa, Kashmir, Dubai, Manali"
          />
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Service Type
            </label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full py-2 px-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="HOLIDAY_PACKAGE">Holiday Package 🏖️</option>
              <option value="HOTEL">Hotels & Resorts 🏨</option>
              <option value="FLIGHT">Flights ✈️</option>
              <option value="BUS">Bus Tickets 🚌</option>
              <option value="TRAIN">Train Travel 🚂</option>
              <option value="CAB">Outstation Cab 🚕</option>
            </select>
          </div>
        </div>

        {/* Customer Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Your Full Name *"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Vikram Singh"
          />
          <Input
            label="Phone Number (WhatsApp) *"
            required
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. 9876543210"
          />
        </div>

        {/* Pin Code & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Your Pin Code (6 digits)"
            value={formData.pinCode}
            onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
            placeholder="e.g. 110001"
            helperText="Routes automatically to your nearest office"
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="vikram@example.com"
          />
        </div>

        {/* Travel Date & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Approximate Travel Date"
            type="date"
            value={formData.travelDateStart}
            onChange={(e) => setFormData({ ...formData, travelDateStart: e.target.value })}
          />
          <Input
            label="Approx Budget (₹)"
            type="number"
            value={formData.budgetMax}
            onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
            placeholder="e.g. 35000"
          />
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Any Special Preferences or Requirements?
          </label>
          <textarea
            rows={2}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Number of adults/children, 3-star/5-star hotel, meal preference..."
            className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            type="submit"
            loading={loading}
            className="w-full justify-center text-sm py-2.5"
          >
            Get Best Travel Quotes
          </Button>
        </div>
      </form>
    </div>
  );
}
