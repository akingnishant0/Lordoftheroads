"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export interface BookingFlowInitialData {
  serviceType?: string;
  destination?: string;
  origin?: string;
  travelDateStart?: string;
  travelDateEnd?: string;
  adults?: number;
  children?: number;
  rooms?: number;
  budget?: number;
}

interface BookingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: BookingFlowInitialData;
  onBookingSuccess?: (bookingNumber: string) => void;
}

interface OptionCard {
  tier: "Economy" | "Standard" | "Premium";
  title: string;
  provider: string;
  rating: number;
  pricePerPerson: number;
  totalEstimate: number;
  features: string[];
  availability: string;
  cancellationSummary: string;
}

export function BookingFlowModal({
  isOpen,
  onClose,
  initialData,
  onBookingSuccess,
}: BookingFlowModalProps) {
  const { t, language } = useLanguage();

  // 11 Booking Steps
  // 1: select_service
  // 2: enter_trip_details
  // 3: search_options
  // 4: check_availability
  // 5: compare_results
  // 6: select_option
  // 7: enter_traveller_details
  // 8: review_booking
  // 9: authorize_payment
  // 10: confirm_with_provider
  // 11: display_booking_confirmation
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Select Service
  const [serviceType, setServiceType] = useState<string>("Holiday Packages");

  // Step 2: Trip Details
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(1);
  const [budget, setBudget] = useState<string>("35000");
  const [preferences, setPreferences] = useState<string>("");

  // Step 3 & 4: Search & Live Availability
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [availabilityVerified, setAvailabilityVerified] = useState<boolean>(false);

  // Step 5 & 6: Compare & Select Options
  const [options, setOptions] = useState<OptionCard[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionCard | null>(null);

  // Step 7: Traveller Details
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [travellers, setTravellers] = useState<
    Array<{ fullName: string; age: number; gender: string; idProofType: string; idProofNumber: string }>
  >([
    { fullName: "", age: 30, gender: "Male", idProofType: "Aadhaar", idProofNumber: "" },
  ]);

  // Step 9: Payment
  const [paymentMethod, setPaymentMethod] = useState<string>("UPI (Google Pay / PhonePe)");
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const [paymentAuthId, setPaymentAuthId] = useState<string>("");

  // Step 10 & 11: Confirmation
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Sync initialData when modal opens
  useEffect(() => {
    if (initialData) {
      if (initialData.serviceType) setServiceType(initialData.serviceType);
      if (initialData.destination) setDestination(initialData.destination);
      if (initialData.origin) setOrigin(initialData.origin);
      if (initialData.travelDateStart) setStartDate(initialData.travelDateStart);
      if (initialData.travelDateEnd) setEndDate(initialData.travelDateEnd);
      if (initialData.adults) setAdults(initialData.adults);
      if (initialData.children) setChildren(initialData.children);
      if (initialData.rooms) setRooms(initialData.rooms);
    }
  }, [initialData]);

  if (!isOpen) return null;

  // Step Navigation logic
  const handleNextFromTripDetails = () => {
    if (!destination.trim()) {
      alert("Please enter a destination.");
      return;
    }
    // Start search & live verification (Steps 3 & 4)
    setCurrentStep(3);
    setIsSearching(true);
    setAvailabilityVerified(false);

    setTimeout(() => {
      setIsSearching(false);
      setAvailabilityVerified(true);
      setCurrentStep(4);

      // Generate realistic options for Step 5: compare_results
      const baseRate = parseInt(budget, 10) || 30000;
      const genOptions: OptionCard[] = [
        {
          tier: "Economy",
          title: `Smart Value ${serviceType} in ${destination}`,
          provider: "Lord of the Road Verified Partner",
          rating: 4.4,
          pricePerPerson: Math.round(baseRate * 0.75),
          totalEstimate: Math.round(baseRate * 0.75 * Math.max(1, adults)),
          features: [
            "Comfortable 3-Star AC accommodation",
            "Daily complimentary breakfast",
            "Shared sightseeing transfers",
            "Standard cancellation protection",
          ],
          availability: "4 slots remaining (Live Verified)",
          cancellationSummary: "Free cancellation up to 15 days before travel",
        },
        {
          tier: "Standard",
          title: `Comfort & Experience ${serviceType} in ${destination}`,
          provider: "Lord of the Road Heritage Desk",
          rating: 4.8,
          pricePerPerson: baseRate,
          totalEstimate: baseRate * Math.max(1, adults),
          features: [
            "Handpicked 4-Star Boutique Stay / Resort",
            "Breakfast & Dinner included",
            "Dedicated private chauffeured AC cab",
            "Personal destination specialist support",
            "Flexible rescheduling available",
          ],
          availability: "Instant confirmation available",
          cancellationSummary: "Free cancellation up to 7 days before travel",
        },
        {
          tier: "Premium",
          title: `Luxury Signature ${serviceType} in ${destination}`,
          provider: "Lord of the Road Luxury Collection",
          rating: 4.95,
          pricePerPerson: Math.round(baseRate * 1.45),
          totalEstimate: Math.round(baseRate * 1.45 * Math.max(1, adults)),
          features: [
            "5-Star Palace / Private Pool Villa",
            "All gourmet meals & high-tea experiences",
            "Premium chauffeur vehicle (Innova Crysta / Luxury SUV)",
            "Private VIP guided tours & fast-track passes",
            "100% full refund on medical emergencies",
          ],
          availability: "Only 2 suites available (Live Verified)",
          cancellationSummary: "Full refund up to 72 hours before travel",
        },
      ];
      setOptions(genOptions);
      setSelectedOption(genOptions[1]); // Default to Standard
    }, 1500);
  };

  const handleSelectOptionAndProceed = (opt: OptionCard) => {
    setSelectedOption(opt);
    // Ensure travellers array matches adults count
    const count = Math.max(1, adults);
    const newTravellers = [...travellers];
    while (newTravellers.length < count) {
      newTravellers.push({
        fullName: "",
        age: 28,
        gender: "Female",
        idProofType: "Aadhaar",
        idProofNumber: "",
      });
    }
    setTravellers(newTravellers.slice(0, count));
    setCurrentStep(7); // enter_traveller_details
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      alert("Please provide primary contact name and phone number.");
      return;
    }
    setCurrentStep(8); // review_booking
  };

  const handleAuthorizePayment = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      const authId = `pay_auth_live_${Date.now()}`;
      setPaymentAuthId(authId);
      setIsAuthorizing(false);
      setCurrentStep(10); // confirm_with_provider

      // Execute provider confirmation API
      handleConfirmWithProvider(authId);
    }, 1600);
  };

  const handleConfirmWithProvider = async (authId: string) => {
    setIsConfirming(true);
    try {
      const baseAmt = selectedOption ? selectedOption.totalEstimate : 30000;
      const taxAmt = Math.round(baseAmt * 0.05); // 5% GST
      const totalAmt = baseAmt + taxAmt;

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType,
          destination,
          origin,
          travelDateStart: startDate || new Date().toISOString().slice(0, 10),
          travelDateEnd: endDate || null,
          paxAdults: adults,
          paxChildren: children,
          rooms,
          selectedOptionTitle: selectedOption?.title || `${serviceType} in ${destination}`,
          selectedOptionTier: selectedOption?.tier || "Standard",
          baseAmount: baseAmt,
          taxAmount: taxAmt,
          totalAmount: totalAmt,
          travellers,
          contactName,
          contactEmail,
          contactPhone,
          paymentMethod,
          paymentAuthId: authId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to confirm booking.");

      setConfirmedBooking(data.booking);
      if (onBookingSuccess) onBookingSuccess(data.booking.bookingNumber);
      setCurrentStep(11); // display_booking_confirmation
    } catch (err: any) {
      alert("Provider confirmation error: " + err.message);
    } finally {
      setIsConfirming(false);
    }
  };

  const serviceTabList = [
    { id: "Holiday Packages", icon: "🏖️", label: "Holidays" },
    { id: "Hotels", icon: "🏨", label: "Hotels" },
    { id: "Villas & Homestays", icon: "🏡", label: "Villas" },
    { id: "Flights", icon: "✈️", label: "Flights" },
    { id: "Buses", icon: "🚌", label: "Buses" },
    { id: "Trains", icon: "🚂", label: "Trains" },
    { id: "Cabs", icon: "🚕", label: "Cabs" },
    { id: "Tours", icon: "🧭", label: "Tours" },
    { id: "Visa Help", icon: "🛂", label: "Visa Help" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#fffdf8] rounded-2xl shadow-2xl border border-[#e1d8c8] overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#1b353b] text-[#f4ead3] px-6 py-4 flex items-center justify-between border-b-2 border-[#cf6241]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#cf6241] flex items-center justify-center text-white font-bold text-sm">
              {currentStep}
            </span>
            <div>
              <h3 className="font-serif font-bold text-lg text-white tracking-tight">
                Lord of the Road — Booking Engine
              </h3>
              <p className="text-xs text-[#eadcc0]">
                {currentStep === 1 && "Step 1: Select Service"}
                {currentStep === 2 && "Step 2: Enter Trip Details"}
                {currentStep === 3 && "Step 3: Searching Live Inventory..."}
                {currentStep === 4 && "Step 4: Live Availability Verified"}
                {currentStep === 5 && "Step 5: Compare Options & Tiers"}
                {currentStep === 6 && "Step 6: Review Selected Option"}
                {currentStep === 7 && "Step 7: Enter Passenger Information"}
                {currentStep === 8 && "Step 8: Review Fare Breakdown & Policies"}
                {currentStep === 9 && "Step 9: Authorize Payment"}
                {currentStep === 10 && "Step 10: Confirming with Provider..."}
                {currentStep === 11 && "Step 11: Booking Confirmed!"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar (11 Steps) */}
        <div className="w-full bg-[#eadcc0]/40 h-1.5 flex">
          <div
            className="bg-[#cf6241] h-1.5 transition-all duration-300"
            style={{ width: `${(currentStep / 11) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-[#263639]">
          {/* STEP 1: Select Service */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto">
                <h4 className="text-xl font-serif font-bold text-[#1b353b]">
                  What would you like to book today?
                </h4>
                <p className="text-xs text-[#667572] mt-1">
                  Choose from our verified travel services across India and international routes.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {serviceTabList.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setServiceType(tab.id);
                      setCurrentStep(2);
                    }}
                    className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                      serviceType === tab.id
                        ? "border-[#cf6241] bg-[#f7f2e7] shadow-sm font-semibold"
                        : "border-[#e1d8c8] hover:border-[#cf6241]/60 hover:bg-[#fffdf8]"
                    }`}
                  >
                    <span className="text-2xl">{tab.icon}</span>
                    <span className="text-sm text-[#1b353b]">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Enter Trip Details */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#e1d8c8]">
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#1b353b]">
                    Enter Details for {serviceType}
                  </h4>
                  <p className="text-xs text-[#667572]">Tell us where and when you plan to travel.</p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#cf6241] underline hover:opacity-80"
                >
                  Change service
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1b353b] uppercase mb-1">
                    Starting From (Origin)
                  </label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Delhi, Mumbai, Bengaluru"
                    className="w-full px-3 py-2 border border-[#e1d8c8] rounded-lg text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1b353b] uppercase mb-1">
                    Destination <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Kashmir, Kerala, Goa, Jaipur"
                    required
                    className="w-full px-3 py-2 border border-[#e1d8c8] rounded-lg text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1b353b] uppercase mb-1">
                    Travel Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e1d8c8] rounded-lg text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1b353b] uppercase mb-1">
                    Return / Check-out Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e1d8c8] rounded-lg text-sm bg-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1b353b] uppercase mb-1">
                      Adults
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-[#e1d8c8] rounded-lg text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1b353b] uppercase mb-1">
                      Children
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-[#e1d8c8] rounded-lg text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1b353b] uppercase mb-1">
                      Rooms
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-[#e1d8c8] rounded-lg text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1b353b] uppercase mb-1">
                    Target Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="35000"
                    className="w-full px-3 py-2 border border-[#e1d8c8] rounded-lg text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1b353b] uppercase mb-1">
                  Travel Preferences or Notes (Optional)
                </label>
                <input
                  type="text"
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="e.g. Honeymoon couple, veg meals, private cab, mountain view room"
                  className="w-full px-3 py-2 border border-[#e1d8c8] rounded-lg text-sm bg-white"
                />
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 border border-[#e1d8c8] rounded-lg text-xs font-semibold"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNextFromTripDetails}
                  className="px-6 py-2.5 bg-[#cf6241] hover:bg-[#b85334] text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Search & Check Availability →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 & 4: Searching & Live Verification */}
          {(currentStep === 3 || currentStep === 4) && (
            <div className="py-12 text-center space-y-4">
              {isSearching ? (
                <>
                  <div className="w-16 h-16 border-4 border-[#1b353b] border-t-[#cf6241] rounded-full animate-spin mx-auto" />
                  <h4 className="text-xl font-serif font-bold text-[#1b353b]">
                    Checking Live Inventory for {destination}...
                  </h4>
                  <p className="text-xs text-[#667572] max-w-md mx-auto">
                    Contacting local branches, verified hotels, and transport aggregators. We never fake availability.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto border border-emerald-300">
                    ✓
                  </div>
                  <h4 className="text-xl font-serif font-bold text-[#1b353b]">
                    Live Availability Verified!
                  </h4>
                  <p className="text-xs text-[#667572]">
                    Confirmed departures and verified accommodations found for {destination}.
                  </p>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="mt-4 px-6 py-2.5 bg-[#1b353b] text-white rounded-lg text-sm font-semibold hover:bg-[#24434a]"
                  >
                    Compare 3 Available Options →
                  </button>
                </>
              )}
            </div>
          )}

          {/* STEP 5: Compare Results */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#1b353b]">
                    Compare Available Options for {destination}
                  </h4>
                  <p className="text-xs text-[#667572]">
                    Showing real-time pricing and verified inclusions.
                  </p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-medium border border-emerald-200">
                  ✓ Verified Live Rates
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {options.map((opt) => (
                  <div
                    key={opt.tier}
                    className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                      selectedOption?.tier === opt.tier
                        ? "border-[#cf6241] ring-2 ring-[#cf6241]/20 bg-[#fffdf8]"
                        : "border-[#e1d8c8] bg-white hover:border-[#1b353b]/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                            opt.tier === "Premium"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : opt.tier === "Standard"
                              ? "bg-blue-100 text-blue-900 border border-blue-300"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {opt.tier} Plan
                        </span>
                        <span className="text-xs font-semibold text-amber-700">
                          ★ {opt.rating}
                        </span>
                      </div>

                      <h5 className="font-serif font-bold text-sm text-[#1b353b] mb-1">
                        {opt.title}
                      </h5>
                      <p className="text-[11px] text-[#667572] mb-3">{opt.provider}</p>

                      <div className="text-xl font-extrabold text-[#1b353b] mb-3">
                        ₹{opt.pricePerPerson.toLocaleString("en-IN")}{" "}
                        <span className="text-xs font-normal text-[#667572]">/ person</span>
                      </div>

                      <ul className="space-y-1.5 text-xs text-[#263639] mb-4">
                        {opt.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-[#e1d8c8]">
                      <div className="text-[10px] text-emerald-700 font-medium mb-3">
                        ● {opt.availability}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectOptionAndProceed(opt)}
                        className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                          selectedOption?.tier === opt.tier
                            ? "bg-[#cf6241] text-white hover:bg-[#b85334]"
                            : "bg-[#1b353b] text-white hover:bg-[#24434a]"
                        }`}
                      >
                        Select & Enter Travellers →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: Enter Traveller Details */}
          {currentStep === 7 && (
            <form onSubmit={handleProceedToReview} className="space-y-5">
              <div className="pb-3 border-b border-[#e1d8c8] flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#1b353b]">
                    Enter Traveller & Contact Information
                  </h4>
                  <p className="text-xs text-[#667572]">
                    Please provide passenger names as shown on official government ID proof.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="text-xs text-[#cf6241] underline"
                >
                  Change plan
                </button>
              </div>

              {/* Primary Contact */}
              <div className="bg-[#f7f2e7] p-4 rounded-xl border border-[#e1d8c8] space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#1b353b]">
                  Primary Contact Person (Booking Vouchers sent here)
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1b353b] mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 border border-[#e1d8c8] rounded-lg text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1b353b] mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                      placeholder="rahul@example.com"
                      className="w-full px-3 py-2 border border-[#e1d8c8] rounded-lg text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1b353b] mb-1">
                      Phone Number (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 border border-[#e1d8c8] rounded-lg text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Individual Passengers */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#1b353b]">
                  Passenger Details ({travellers.length} Passenger{travellers.length > 1 ? "s" : ""})
                </h5>

                {travellers.map((trav, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 border border-[#e1d8c8] rounded-lg bg-white grid grid-cols-1 md:grid-cols-4 gap-3 items-center"
                  >
                    <div>
                      <label className="block text-[10px] font-semibold text-[#667572] uppercase">
                        Passenger {idx + 1} Name
                      </label>
                      <input
                        type="text"
                        value={trav.fullName}
                        onChange={(e) => {
                          const updated = [...travellers];
                          updated[idx].fullName = e.target.value;
                          setTravellers(updated);
                        }}
                        placeholder="Name as per ID"
                        required
                        className="w-full px-2.5 py-1.5 border border-[#e1d8c8] rounded text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#667572] uppercase">
                        Age
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={trav.age}
                        onChange={(e) => {
                          const updated = [...travellers];
                          updated[idx].age = Number(e.target.value);
                          setTravellers(updated);
                        }}
                        className="w-full px-2.5 py-1.5 border border-[#e1d8c8] rounded text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#667572] uppercase">
                        Gender
                      </label>
                      <select
                        value={trav.gender}
                        onChange={(e) => {
                          const updated = [...travellers];
                          updated[idx].gender = e.target.value;
                          setTravellers(updated);
                        }}
                        className="w-full px-2.5 py-1.5 border border-[#e1d8c8] rounded text-xs mt-1 bg-white"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#667572] uppercase">
                        ID Proof Type
                      </label>
                      <select
                        value={trav.idProofType}
                        onChange={(e) => {
                          const updated = [...travellers];
                          updated[idx].idProofType = e.target.value;
                          setTravellers(updated);
                        }}
                        className="w-full px-2.5 py-1.5 border border-[#e1d8c8] rounded text-xs mt-1 bg-white"
                      >
                        <option>Aadhaar</option>
                        <option>Passport</option>
                        <option>Voter ID</option>
                        <option>Driving License</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-4 py-2 border border-[#e1d8c8] rounded-lg text-xs font-semibold"
                >
                  ← Back to Options
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#cf6241] hover:bg-[#b85334] text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Review Booking Details →
                </button>
              </div>
            </form>
          )}

          {/* STEP 8: Review Booking */}
          {currentStep === 8 && selectedOption && (
            <div className="space-y-5">
              <div className="pb-3 border-b border-[#e1d8c8]">
                <h4 className="text-lg font-serif font-bold text-[#1b353b]">
                  Step 8: Review Booking Summary
                </h4>
                <p className="text-xs text-[#667572]">
                  Please review trip details, guest names, fare calculation, and cancellation rules.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Trip & Passenger Summary */}
                <div className="p-4 bg-white rounded-xl border border-[#e1d8c8] space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#1b353b] border-b pb-1.5">
                    Trip Itinerary Details
                  </h5>
                  <div className="text-xs space-y-1.5">
                    <div><b>Service:</b> {serviceType} ({selectedOption.tier} Plan)</div>
                    <div><b>Destination:</b> {destination} {origin ? `(From: ${origin})` : ""}</div>
                    <div><b>Dates:</b> {startDate || "Dates flexible"} {endDate ? `to ${endDate}` : ""}</div>
                    <div><b>Travellers:</b> {travellers.length} Passenger(s), {rooms} Room(s)</div>
                    <div><b>Lead Contact:</b> {contactName} ({contactPhone})</div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 bg-[#f7f2e7] rounded-xl border border-[#e1d8c8] space-y-2.5">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#1b353b] border-b pb-1.5">
                    Fare Calculation (Live Pricing)
                  </h5>
                  <div className="flex justify-between text-xs">
                    <span>Base Package Fare ({travellers.length} pax):</span>
                    <span>₹{selectedOption.totalEstimate.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Government Taxes & GST (5%):</span>
                    <span>₹{Math.round(selectedOption.totalEstimate * 0.05).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-700 font-medium">
                    <span>Convenience Fee / Booking Desk Fee:</span>
                    <span>FREE (Waived)</span>
                  </div>
                  <div className="border-t border-[#e1d8c8] pt-2 flex justify-between text-base font-bold text-[#1b353b]">
                    <span>Total Amount Payable:</span>
                    <span>
                      ₹{Math.round(selectedOption.totalEstimate * 1.05).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Policy note */}
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                <b>Cancellation Policy:</b> {selectedOption.cancellationSummary}. Full refund estimate will be calculated in real-time if cancelled before departure.
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(7)}
                  className="px-4 py-2 border border-[#e1d8c8] rounded-lg text-xs font-semibold"
                >
                  ← Edit Travellers
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(9)}
                  className="px-6 py-2.5 bg-[#cf6241] hover:bg-[#b85334] text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Proceed to Payment Authorization →
                </button>
              </div>
            </div>
          )}

          {/* STEP 9: Authorize Payment */}
          {currentStep === 9 && selectedOption && (
            <div className="space-y-5">
              <div className="pb-3 border-b border-[#e1d8c8]">
                <h4 className="text-lg font-serif font-bold text-[#1b353b]">
                  Step 9: Payment Authorization
                </h4>
                <p className="text-xs text-[#667572]">
                  Total Amount: ₹{Math.round(selectedOption.totalEstimate * 1.05).toLocaleString("en-IN")} (Secured by Razorpay / UPI Test Mode)
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "UPI (Google Pay, PhonePe, Paytm)",
                  "Credit / Debit Card (Visa, MasterCard, RuPay)",
                  "NetBanking (All Indian Scheduled Banks)",
                  "Corporate Account / Agent Credit Ledger",
                ].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === method
                        ? "border-[#cf6241] bg-[#f7f2e7] font-semibold"
                        : "border-[#e1d8c8] bg-white hover:bg-[#fffdf8]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    <span className="text-xs text-[#1b353b]">{method}</span>
                  </label>
                ))}
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-900">
                🔒 <b>Bank-grade 256-bit encryption:</b> This transaction authorizes the payment hold. Your booking will only be confirmed once provider inventory lock is completed.
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(8)}
                  className="px-4 py-2 border border-[#e1d8c8] rounded-lg text-xs font-semibold"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={isAuthorizing}
                  onClick={handleAuthorizePayment}
                  className="px-6 py-2.5 bg-[#1b353b] hover:bg-[#24434a] text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {isAuthorizing ? "Authorizing Payment..." : "Authorize & Confirm Booking →"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 10: Provider Confirmation */}
          {currentStep === 10 && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-[#1b353b] border-t-[#cf6241] rounded-full animate-spin mx-auto" />
              <h4 className="text-xl font-serif font-bold text-[#1b353b]">
                Confirming with Travel Provider...
              </h4>
              <p className="text-xs text-[#667572] max-w-md mx-auto">
                Payment Authorized ({paymentAuthId}). Issuing booking voucher reference and allocating local territory agent...
              </p>
            </div>
          )}

          {/* STEP 11: Display Booking Confirmation */}
          {currentStep === 11 && confirmedBooking && (
            <div className="space-y-6">
              <div className="text-center py-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                <div className="text-3xl">🎉</div>
                <h4 className="text-xl font-serif font-bold text-emerald-900">
                  Booking Confirmed!
                </h4>
                <p className="text-xs text-emerald-700">
                  Booking Reference: <span className="font-mono font-bold">{confirmedBooking.bookingNumber}</span>
                </p>
              </div>

              {/* Printable Voucher Card */}
              <div className="p-5 border-2 border-dashed border-[#e1d8c8] rounded-xl bg-white space-y-4 print:border-solid">
                <div className="flex justify-between items-start border-b border-[#e1d8c8] pb-3">
                  <div>
                    <h5 className="font-serif font-bold text-base text-[#1b353b]">
                      Lord of the Road Travel Co.
                    </h5>
                    <p className="text-[10px] text-[#667572]">Official Trip Confirmation Voucher</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#cf6241]">
                      {confirmedBooking.bookingNumber}
                    </span>
                    <p className="text-[10px] text-gray-500">Provider Ref: {confirmedBooking.providerConfirmationRef}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-[#667572] block uppercase">Service</span>
                    <b>{confirmedBooking.serviceType}</b>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#667572] block uppercase">Destination</span>
                    <b>{confirmedBooking.destination}</b>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#667572] block uppercase">Travel Date</span>
                    <b>{confirmedBooking.travelDateStart}</b>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#667572] block uppercase">Total Paid</span>
                    <b className="text-emerald-700">₹{confirmedBooking.totalAmount.toLocaleString("en-IN")}</b>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#e1d8c8] text-xs">
                  <span className="text-[10px] text-[#667572] block uppercase mb-1">Confirmed Travellers</span>
                  <div className="flex flex-wrap gap-2">
                    {confirmedBooking.travellers.map((tr: any, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-[#f7f2e7] rounded text-xs border border-[#e1d8c8]">
                        {tr.fullName} ({tr.age}y, {tr.gender})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 border border-[#1b353b] rounded-lg text-xs font-semibold hover:bg-[#1b353b] hover:text-white transition-colors"
                >
                  🖨️ Print Voucher
                </button>
                <a
                  href={`https://wa.me/919876543210?text=Hello%20Lord%20of%20the%20Road,%20I%20have%20confirmed%20booking%20${confirmedBooking.bookingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors"
                >
                  📲 WhatsApp Booking Details
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#cf6241] text-white rounded-lg text-xs font-semibold hover:bg-[#b85334] transition-colors"
                >
                  Done / View in Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
