"use client";

import React, { useState } from "react";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";
import { VISA_DATA, VisaInfo } from "@/data/travelData";

export default function VisaHelpPage() {
  const [selectedCountry, setSelectedCountry] = useState<VisaInfo>(VISA_DATA[0]);
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow">
        <section className="bg-[#173D32] text-[#FAF8F4] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#287C70]/40">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              International Travel Documentation
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 mb-3 tracking-tight">
              Tourist Visa Guidance & Assistance
            </h1>
            <p className="text-sm sm:text-base text-[#EDE5D8] max-w-2xl font-light">
              Expert document verification, fast-track e-Visa filing, biometric appointment scheduling, and end-to-end guidance for Indian passport holders.
            </p>

            {/* Country Tabs */}
            <div className="mt-8 flex flex-wrap gap-2">
              {VISA_DATA.map((v) => (
                <button
                  key={v.countryCode}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(v);
                    setFormSubmitted(false);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                    selectedCountry.countryCode === v.countryCode
                      ? "bg-[#B7955B] text-[#173D32]"
                      : "bg-[#287C70]/40 text-[#EDE5D8] hover:bg-[#287C70]/60"
                  }`}
                >
                  {v.countryName}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Country Visa Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-[#E7E6E0]">
                  <div>
                    <span className="text-xs font-semibold text-[#737B76]">Destination</span>
                    <h2 className="font-serif text-2xl font-bold text-[#173D32]">
                      {selectedCountry.countryName}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs uppercase font-bold text-[#287C70] px-2.5 py-1 rounded bg-emerald-50">
                      {selectedCountry.visaType}
                    </span>
                    <p className="text-xs text-[#737B76] mt-1">{selectedCountry.processingTime}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0]">
                    <span className="text-[#737B76]">Validity</span>
                    <p className="font-bold text-[#173D32] mt-0.5">{selectedCountry.validity}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0]">
                    <span className="text-[#737B76]">Govt Visa Fee</span>
                    <p className="font-bold text-[#173D32] mt-0.5">
                      {selectedCountry.govtFeeApprox === 0 ? "Free / Zero" : `₹${selectedCountry.govtFeeApprox}`}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0]">
                    <span className="text-[#737B76]">Assistance Fee</span>
                    <p className="font-bold text-[#173D32] mt-0.5">₹{selectedCountry.serviceFee}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[#173D32] mb-2">Key Criteria & Eligibility</h4>
                  <ul className="space-y-1.5 text-xs text-[#242A28]/80">
                    {selectedCountry.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#287C70] font-bold">✓</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <h4 className="font-bold text-sm text-[#173D32] mb-2">Mandatory Documents Checklist</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#242A28]/80">
                    {selectedCountry.documentsRequired.map((doc, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF8F4] border border-[#E7E6E0]">
                        <span>📄</span>
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legal Disclaimer Box */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  <p className="font-bold mb-1">⚠️ Official Visa Legal Notice:</p>
                  <p>{selectedCountry.disclaimer}</p>
                </div>
              </div>
            </div>

            {/* Application Request Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm sticky top-24">
                <h3 className="font-serif text-lg font-bold text-[#173D32] mb-2">
                  Apply for Visa Assistance
                </h3>
                <p className="text-xs text-[#737B76] mb-4">
                  Our accredited travel documentation officer will verify your passport and initiate filing within 2 hours.
                </p>

                {formSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <span className="text-2xl">🎉</span>
                    <h4 className="text-sm font-bold text-emerald-800">Application Lodged!</h4>
                    <p className="text-xs text-emerald-700">
                      Case File #LOTR-VISA-{Math.floor(100000 + Math.random() * 900000)} generated. An officer will call {applicantPhone} shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[#737B76] mb-1 font-medium">Full Name (as per Passport)</label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Rohan Sharma"
                        className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#737B76] mb-1 font-medium">WhatsApp Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#737B76] mb-1 font-medium">Email Address</label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="rohan@example.com"
                        className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#737B76] mb-1 font-medium">Planned Departure Date</label>
                      <input
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-[#E7E6E0] focus:outline-none focus:border-[#173D32]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white font-semibold text-xs transition cursor-pointer mt-2"
                    >
                      Request Document Verification
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <AiTravelAgentModal />

      <CustomerFooter />
    </div>
  );
}
