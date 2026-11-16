"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";
import { TRAINS_DATA, TrainOption } from "@/data/travelData";

export default function TrainsPage() {
  const router = useRouter();
  const [selectedTrain, setSelectedTrain] = useState<TrainOption | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBookClass = (train: TrainOption, clsCode: string) => {
    const selectedCls = train.classes.find((c) => c.code === clsCode);
    const price = selectedCls ? selectedCls.price : 1850;
    router.push(`/checkout?item=${encodeURIComponent((train.trainName || train.trainNumber) + " (" + train.trainNumber + ") - Class " + clsCode)}&price=${price}&travellers=1`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col">
      <CustomerHeader />

      <main className="flex-grow">
        <section className="bg-[#173D32] text-[#FAF8F4] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#287C70]/40">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
              IRCTC Authorized Rail Partner
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 mb-3 tracking-tight">
              Indian Railways Train Booking
            </h1>
            <p className="text-sm sm:text-base text-[#EDE5D8] max-w-2xl font-light">
              Book Vande Bharat, Rajdhani, Shatabdi, and Superfast express trains with live confirmation probability, instant Tatkal reservation guidance, and zero payment gateway charges.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="space-y-6">
            {TRAINS_DATA.map((train) => (
              <div
                key={train.id}
                className="bg-white rounded-2xl border border-[#E7E6E0] p-6 shadow-sm hover:shadow-md transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E6E0] gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] flex items-center justify-center font-bold text-xl">
                      🚆
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-[#173D32]">{train.trainName}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EDE5D8] text-[#173D32]">
                          #{train.trainNumber}
                        </span>
                      </div>
                      <p className="text-xs text-[#737B76]">Runs all 7 days • Punctuality 94%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-[#737B76]">
                    <div>
                      <span className="font-bold text-sm text-[#173D32]">{train.departureTime}</span>
                      <p>{train.origin}</p>
                    </div>
                    <div className="text-center font-medium">
                      <span>{train.duration}</span>
                      <div className="w-16 h-0.5 bg-[#EDE5D8] mx-auto my-0.5"></div>
                    </div>
                    <div>
                      <span className="font-bold text-sm text-[#173D32]">{train.arrivalTime}</span>
                      <p>{train.destination}</p>
                    </div>
                  </div>
                </div>

                {/* Train Classes Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {train.classes.map((cls) => (
                    <div
                      key={cls.code}
                      onClick={() => handleBookClass(train, cls.code)}
                      className="p-3 rounded-xl border border-[#E7E6E0] hover:border-[#173D32] bg-[#FAF8F4] hover:bg-white transition cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#173D32]">{cls.name} ({cls.code})</span>
                        <span className="text-xs font-bold text-[#173D32]">₹{cls.price}</span>
                      </div>
                      <div className="mt-2 text-[11px] font-semibold text-emerald-700">
                        {cls.availability}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BookingFlowModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialData={{
          serviceType: "Train Tickets (IRCTC)",
          origin: selectedTrain?.origin || "New Delhi",
          destination: selectedTrain?.destination || "Varanasi",
          budget: 1750,
        }}
      />

      <AiTravelAgentModal />

      <CustomerFooter />
    </div>
  );
}
