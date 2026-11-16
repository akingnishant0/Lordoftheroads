import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen w-full selection:bg-[#B7955B] selection:text-[#173D32]"
      style={{
        backgroundColor: "#FAF8F4",
      }}
    >
      {children}
    </div>
  );
}
