"use client";

import React, { useState } from "react";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { EditorialHomepage } from "@/components/home/EditorialHomepage";
import { CustomerFooter } from "@/components/customer/CustomerFooter";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { AiTravelAgentModal } from "@/components/ai/AiTravelAgentModal";
import { BookingFlowModal, BookingFlowInitialData } from "@/components/booking/BookingFlowModal";

export default function HomePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<BookingFlowInitialData | undefined>(undefined);
  const [notification, setNotification] = useState<string | null>(null);

  const handleOpenBookingEngine = (data?: BookingFlowInitialData) => {
    setBookingInitialData(data);
    setBookingModalOpen(true);
  };

  const handleOpenAiAgent = (query?: string) => {
    const agentLauncher = document.querySelector('button[aria-label="Open AI Travel Companion"]') as HTMLButtonElement;
    if (agentLauncher) {
      agentLauncher.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#242A28]">
      {/* 1. Global Navigation with Sticky Airbnb Search Pill & Wishlist Counter */}
      <CustomerHeader />

      {/* Confirmation toast if any */}
      {notification && (
        <div className="bg-emerald-800 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
          <span>✓ {notification}</span>
          <button type="button" onClick={() => setNotification(null)} className="underline text-[10px] ml-2">
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Main Editorial Presentation */}
      <main className="flex-grow">
        <EditorialHomepage
          onOpenAiAgent={handleOpenAiAgent}
          onOpenBookingModal={handleOpenBookingEngine}
        />
      </main>

      {/* 3. Luxury Editorial Customer Footer */}
      <CustomerFooter />

      {/* 4. Mobile Sticky Bottom Navigation Dock (High-Impact Upgrade) */}
      <MobileBottomNav />

      {/* 5. 11-Step Interactive Booking Engine Modal */}
      <BookingFlowModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialData={bookingInitialData}
        onBookingSuccess={(bNum) => {
          setNotification(`Booking Reference #${bNum} confirmed! Live ticket voucher generated.`);
        }}
      />

      {/* 6. 10-Step Interactive Conversational AI Travel Consultant */}
      <AiTravelAgentModal
        onOpenBookingFlow={(data) => {
          handleOpenBookingEngine(data);
        }}
      />
    </div>
  );
}
