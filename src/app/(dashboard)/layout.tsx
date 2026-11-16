"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar, Header, MobileNav } from "@/components/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Close mobile sidebar on route navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF8F4]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-3 border-[#173D32]/20 border-t-[#B7955B] rounded-full animate-spin" />
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm font-bold text-[#173D32]">lord of the road</span>
            <span className="text-xs text-[#737B76]">Initializing OS...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!session || !session.user) {
    return null;
  }

  const role = (session.user as { role?: string })?.role || "CUSTOMER";

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#242A28] flex flex-col font-sans">
      <div className="flex h-screen overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <Sidebar role={role} currentPath={pathname} />
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-[#173D32]/60 backdrop-blur-xs transition-opacity"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-64 max-w-[80vw] h-full shadow-2xl">
              <Sidebar role={role} currentPath={pathname} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#FAF8F4] pb-24 md:pb-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav role={role} currentPath={pathname} />
    </div>
  );
}
