"use client";

export const dynamic = "force-dynamic";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";

function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  // URL parameters or default fallback values
  const serviceTitle = searchParams.get("item") || "Kashmir Valley 6D/5N Holiday Package";
  const initialBasePrice = Number(searchParams.get("price")) || 27999;
  const initialTravellers = Number(searchParams.get("travellers")) || 2;

  const [travellersCount, setTravellersCount] = useState(initialTravellers);
  const [primaryName, setPrimaryName] = useState(session?.user?.name || "Rohan Sharma");
  const [primaryPhone, setPrimaryPhone] = useState("+91 98765 43210");
  const [primaryEmail, setPrimaryEmail] = useState(session?.user?.email || "rohan@example.com");
  const [idType, setIdType] = useState("Aadhaar");
  const [idNumber, setIdNumber] = useState("•••• •••• 4821");

  // Add-ons
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [includeAirportTransfer, setIncludeAirportTransfer] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState<string | null>(null);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CARD" | "NETBANKING">("UPI");
  const [upiId, setUpiId] = useState("rohan@okaxis");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (session?.user) {
      if (session.user.name) setPrimaryName(session.user.name);
      if (session.user.email) setPrimaryEmail(session.user.email);
    }
  }, [session]);

  // Calculations
  const baseTotal = initialBasePrice * travellersCount;
  const insuranceCost = includeInsurance ? 499 * travellersCount : 0;
  const transferCost = includeAirportTransfer ? 1200 : 0;
  const subtotal = baseTotal + insuranceCost + transferCost - discount;
  const gstAmount = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gstAmount;

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "WELCOME1000" || couponCode.trim().toUpperCase() === "LOTR1000") {
      setDiscount(1000);
      setCouponStatus("Coupon applied: ₹1,000 discount!");
    } else {
      setCouponStatus("Invalid coupon code");
    }
  };

  const handlePayAndConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const bookingRef = "LOTR-" + Math.floor(100000 + Math.random() * 900000);

    // Save to customer trips in localStorage for instant retrieval
    const newBooking = {
      id: bookingRef,
      title: serviceTitle,
      date: new Date().toISOString(),
      travelDate: "15 April 2026",
      travellers: travellersCount,
      primaryGuest: primaryName,
      status: "CONFIRMED",
      paymentMethod,
      totalPaid: grandTotal,
      voucherUrl: `/my-trips/${bookingRef}`,
    };

    try {
      const existing = JSON.parse(localStorage.getItem("lotr_customer_bookings") || "[]");
      existing.unshift(newBooking);
      localStorage.setItem("lotr_customer_bookings", JSON.stringify(existing));
    } catch (err) {}

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      router.push(`/booking-confirmation?id=${bookingRef}&title=${encodeURIComponent(serviceTitle)}&amount=${grandTotal}&guest=${encodeURIComponent(primaryName)}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              Secure 256-Bit SSL Checkout
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D32] mt-1">
              Complete Your Reservation
            </h1>
            <p className="text-xs text-[#737B76]">Instant Online Booking & Payment Gateway • Live Seat & Room Allotment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left 2 Cols: Guest Details, Add-ons & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Card 1: Review Selection */}
              <div className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-[#E7E6E0]">
                  <div>
                    <span className="text-xs font-bold text-[#287C70] uppercase">Selected Service</span>
                    <h3 className="font-serif text-xl font-bold text-[#173D32]">{serviceTitle}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#737B76]">Rate / Person</span>
                    <p className="font-bold text-[#173D32]">₹{initialBasePrice.toLocaleString("en-IN")}</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs">
                  <span className="text-[#737B76]">Number of Travellers:</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTravellersCount(Math.max(1, travellersCount - 1))}
                      className="w-7 h-7 rounded-lg border border-[#E7E6E0] flex items-center justify-center font-bold hover:bg-[#FAF8F4]"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm text-[#173D32]">{travellersCount} Adult(s)</span>
                    <button
                      type="button"
                      onClick={() => setTravellersCount(travellersCount + 1)}
                      className="w-7 h-7 rounded-lg border border-[#E7E6E0] flex items-center justify-center font-bold hover:bg-[#FAF8F4]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Primary Traveller Form */}
              <div className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#173D32]">
                  Primary Guest Contact & Verification
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#737B76] mb-1 font-medium">Full Name (as per Govt ID)</label>
                    <input
                      type="text"
                      required
                      value={primaryName}
                      onChange={(e) => setPrimaryName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#737B76] mb-1 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={primaryPhone}
                      onChange={(e) => setPrimaryPhone(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#737B76] mb-1 font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      value={primaryEmail}
                      onChange={(e) => setPrimaryEmail(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#737B76] mb-1 font-medium">Govt ID Type</label>
                    <select
                      value={idType}
                      onChange={(e) => setIdType(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32] bg-white"
                    >
                      <option value="Aadhaar">Aadhaar Card</option>
                      <option value="Passport">Passport</option>
                      <option value="VoterID">Voter ID</option>
                      <option value="DrivingLicence">Driving Licence</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Card 3: Travel Protection Shield Add-on */}
              <div className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="insure"
                      checked={includeInsurance}
                      onChange={(e) => setIncludeInsurance(e.target.checked)}
                      className="mt-1 accent-[#173D32] w-4 h-4"
                    />
                    <div>
                      <label htmlFor="insure" className="font-bold text-sm text-[#173D32] cursor-pointer block">
                        🛡️ Add Comprehensive Travel Insurance (Travel Shield Partnered)
                      </label>
                      <p className="text-xs text-[#737B76] mt-0.5">
                        Coverage up to ₹5,00,000 for emergency medical expenses, trip cancellation, baggage delay, and personal accidents.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#173D32]">
                    +₹{499 * travellersCount}
                  </span>
                </div>
              </div>

              {/* Card 4: Payment Method */}
              <div className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#173D32]">
                  Select Payment Authorization
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("UPI")}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                      paymentMethod === "UPI"
                        ? "border-[#173D32] bg-[#FAF8F4] font-bold text-[#173D32]"
                        : "border-[#E7E6E0] text-[#737B76]"
                    }`}
                  >
                    <span className="text-lg block">📱</span>
                    <span className="text-xs">UPI / GPay / PhonePe</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CARD")}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                      paymentMethod === "CARD"
                        ? "border-[#173D32] bg-[#FAF8F4] font-bold text-[#173D32]"
                        : "border-[#E7E6E0] text-[#737B76]"
                    }`}
                  >
                    <span className="text-lg block">💳</span>
                    <span className="text-xs">Debit / Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("NETBANKING")}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                      paymentMethod === "NETBANKING"
                        ? "border-[#173D32] bg-[#FAF8F4] font-bold text-[#173D32]"
                        : "border-[#E7E6E0] text-[#737B76]"
                    }`}
                  >
                    <span className="text-lg block">🏛️</span>
                    <span className="text-xs">Net Banking</span>
                  </button>
                </div>

                {paymentMethod === "UPI" && (
                  <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] space-y-2 text-xs">
                    <label className="block text-[#737B76] font-medium">Virtual Payment Address (VPA / UPI ID)</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@upi"
                      className="w-full p-2.5 rounded-lg border border-[#E7E6E0] bg-white font-medium"
                    />
                    <p className="text-[11px] text-[#287C70]">A payment authorization request will be sent to your UPI app.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right 1 Col: Summary & Price breakdown */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm sticky top-24 space-y-6">
                <h3 className="font-serif text-lg font-bold text-[#173D32] pb-3 border-b border-[#E7E6E0]">
                  Fare Summary
                </h3>

                <div className="space-y-2 text-xs text-[#242A28]">
                  <div className="flex justify-between">
                    <span className="text-[#737B76]">Base Fare ({travellersCount} Guests)</span>
                    <span className="font-semibold">₹{baseTotal.toLocaleString("en-IN")}</span>
                  </div>

                  {includeInsurance && (
                    <div className="flex justify-between text-[#287C70]">
                      <span>Travel Insurance</span>
                      <span className="font-semibold">+₹{insuranceCost.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo Discount</span>
                      <span className="font-semibold">-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-[#737B76]">GST (5% Tourism & Transport)</span>
                    <span className="font-semibold">₹{gstAmount.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="pt-3 border-t border-[#E7E6E0] flex justify-between items-baseline">
                    <span className="font-bold text-sm text-[#173D32]">Total Payable</span>
                    <span className="font-serif text-2xl font-bold text-[#173D32]">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. WELCOME1000)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-[#E7E6E0] uppercase"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="px-3 py-2 bg-[#FAF8F4] border border-[#E7E6E0] text-xs font-semibold rounded-lg hover:bg-[#EDE5D8]"
                    >
                      Apply
                    </button>
                  </div>
                  {couponStatus && (
                    <p className={`text-[11px] ${discount > 0 ? "text-emerald-700 font-bold" : "text-red-600"}`}>
                      {couponStatus}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePayAndConfirm}
                  className="w-full py-4 rounded-xl bg-[#173D32] hover:bg-[#287C70] disabled:bg-[#737B76] text-white font-semibold text-sm transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Authorizing Payment...</span>
                    </>
                  ) : (
                    <span>Authorize & Confirm Booking ➔</span>
                  )}
                </button>

                <div className="text-[11px] text-[#737B76] text-center space-y-1">
                  <p>🔒 100% Secure Payment • Instant Booking Voucher</p>
                  <p>Free cancellation per platform rules</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}


export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-8 text-[#173B32]">Loading...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}
