"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getDashboardPath } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getTxt = (key: string, enText: string, hiText: string) => {
    const val = t(key);
    if (val && val !== key) return val;
    return language === "hi" ? hiText : enText;
  };

  const [selectedDemo, setSelectedDemo] = useState("");

  const DEMO_ACCOUNTS = [
    {
      role: "Super Admin",
      hindi: "सुपर एडमिन",
      icon: "🛡️",
      email: "admin@lordoftheroad.in",
      pass: "Admin@123",
      portal: "/admin",
      badge: "Admin",
    },
    {
      role: "Office Admin",
      hindi: "ऑफिस एडमिन",
      icon: "🏢",
      email: "office@lordoftheroad.in",
      pass: "Office@123",
      portal: "/office",
      badge: "Operations",
    },
    {
      role: "Travel Agent",
      hindi: "ट्रैवल एजेंट",
      icon: "💼",
      email: "agent@lordoftheroad.in",
      pass: "Agent@123",
      portal: "/agent",
      badge: "B2B Desk",
    },
    {
      role: "Calling Staff",
      hindi: "कॉलिंग स्टाफ",
      icon: "📞",
      email: "caller@lordoftheroad.in",
      pass: "Caller@123",
      portal: "/agent",
      badge: "Telecalling",
    },
    {
      role: "Hotel Partner",
      hindi: "होटल / स्टे पार्टनर",
      icon: "🏨",
      email: "hotel@lordoftheroad.in",
      pass: "Hotel@123",
      portal: "/supplier",
      badge: "Supplier",
    },
    {
      role: "Bus Operator",
      hindi: "बस ऑपरेटर",
      icon: "🚌",
      email: "bus@lordoftheroad.in",
      pass: "Bus@123",
      portal: "/supplier",
      badge: "Fleet",
    },
    {
      role: "Cab & Bike Partner",
      hindi: "कैब / बाइक रेंटल",
      icon: "🚕",
      email: "cab@lordoftheroad.in",
      pass: "Cab@123",
      portal: "/supplier",
      badge: "Mobility",
    },
    {
      role: "Shop / Dhaba Vendor",
      hindi: "ढाबा / स्टोर वेंडर",
      icon: "🛍️",
      email: "shop@lordoftheroad.in",
      pass: "Shop@123",
      portal: "/supplier",
      badge: "Vendor",
    },
    {
      role: "Customer",
      hindi: "कस्टमर यात्री",
      icon: "🧳",
      email: "customer@lordoftheroad.in",
      pass: "Customer@123",
      portal: "/customer",
      badge: "Traveller",
    },
  ];

  const handleDemoFill = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setSelectedDemo(roleEmail);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          getTxt(
            "auth.invalidCredentials",
            "Invalid email or password. Please verify your credentials.",
            "अमान्य ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।"
          )
        );
        setLoading(false);
        return;
      }

      // Fetch the authenticated session to determine the user's role
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();
      const userRole = sessionData?.user?.role || "CUSTOMER";

      const targetPath = getDashboardPath(userRole);
      router.push(targetPath);
      router.refresh();
    } catch (err: unknown) {
      console.error("Login submission error:", err);
      setError(
        getTxt(
          "auth.unexpectedError",
          "An unexpected error occurred during login.",
          "लॉग इन करते समय कोई अनपेक्षित त्रुटि हुई।"
        )
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 flex items-center justify-center bg-[#FAF8F5]">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-6 sm:p-10 border border-[#E7E6E0]">
        {/* Brand Header */}
        <div className="mb-6 text-center">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#EE6C19] shadow-sm bg-black flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/logo.jpg" alt="Lord of the Road" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1F0605] leading-none block">
                lord <span className="font-normal italic text-[#EE6C19]">of the</span> <span className="text-[#BA1E04]">road</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#BA1E04] font-bold block mt-0.5">
                Workspace & Partner Login
              </span>
            </div>
          </Link>

          <h1 className="text-2xl font-serif font-bold text-[#1F0605]">
            {getTxt("auth.welcomeBack", "Team & Partner Workspace", "टीम एवं पार्टनर कार्यक्षेत्र")}
          </h1>
          <p className="text-xs text-[#737B76] mt-1 font-medium">
            {getTxt(
              "auth.subTitle",
              "Sign in to access your role-specific dashboard & live ecosystem",
              "अपने रोल अनुसार समर्पित डैशबोर्ड व सेवाओं के लिए साइन इन करें"
            )}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F0605] mb-1">
              {getTxt("auth.emailLabel", "Email address", "ईमेल पता")}
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@lordoftheroad.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-3.5 py-2.5 border border-[#E7E6E0] rounded-xl bg-[#FAF8F5] text-xs text-[#1F0605] focus:outline-none focus:border-[#BA1E04] focus:ring-1 focus:ring-[#BA1E04] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F0605] mb-1">
              {getTxt("auth.passwordLabel", "Password", "पासवर्ड")}
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-3.5 py-2.5 border border-[#E7E6E0] rounded-xl bg-[#FAF8F5] text-xs text-[#1F0605] focus:outline-none focus:border-[#BA1E04] focus:ring-1 focus:ring-[#BA1E04] focus:bg-white transition"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#BA1E04] via-[#CD2306] to-[#EE6C19] hover:from-[#9E1803] hover:to-[#D95B0F] text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              disabled={loading}
            >
              {loading
                ? getTxt("common.loading", "Signing in...", "साइन इन हो रहा है...")
                : getTxt("auth.loginButton", "Sign in →", "साइन इन →")}
            </button>
          </div>
        </form>

        {/* 9 All-Role Test Accounts Quick-Fill Section */}
        <div className="mt-8 pt-6 border-t border-[#E7E6E0]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[11px] font-bold text-[#1F0605] uppercase tracking-wider flex items-center gap-1.5">
                <span>⚡</span>
                <span>त्वरित टेस्ट खाते (Quick Demo Test Accounts — 9 Roles)</span>
              </p>
              <p className="text-[10px] text-[#737B76]">
                किसी भी कार्ड पर क्लिक करें—क्रेडेंशियल्स तुरंत भर जाएंगे:
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF7ED] text-[#BA1E04] border border-[#FED7AA]">
              9 Test Roles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
            {DEMO_ACCOUNTS.map((acc) => {
              const isSelected = selectedDemo === acc.email;
              return (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleDemoFill(acc.email, acc.pass)}
                  className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer relative group flex flex-col justify-between ${
                    isSelected
                      ? "border-[#BA1E04] bg-[#FFF7ED] shadow-sm ring-1 ring-[#BA1E04]/30"
                      : "border-[#E7E6E0] bg-[#FAF8F5] hover:bg-white hover:border-[#EE6C19]/60 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-base">{acc.icon}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white border border-[#E7E6E0] text-[#737B76]">
                      {acc.badge}
                    </span>
                  </div>
                  <div>
                    <strong className="block text-[#1F0605] text-[11px] font-bold leading-tight">
                      {acc.role}
                    </strong>
                    <span className="text-[10px] text-[#EE6C19] font-medium block">
                      {acc.hindi}
                    </span>
                    <span className="text-[10px] text-[#737B76] font-mono block truncate mt-0.5">
                      {acc.email}
                    </span>
                  </div>
                  <div className="mt-1.5 pt-1 border-t border-[#E7E6E0]/70 flex items-center justify-between text-[9px] text-[#737B76]">
                    <span>पासवर्ड: <code className="font-mono text-[#1F0605]">{acc.pass}</code></span>
                    {isSelected && <span className="text-emerald-600 font-bold">✓ Selected</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-[#737B76]">
          <span>
            {getTxt("auth.noAccount", "Don't have an account?", "खाता नहीं है?")}{" "}
          </span>
          <Link
            href="/register"
            className="font-bold text-[#BA1E04] hover:text-[#EE6C19] transition underline"
          >
            {getTxt("auth.registerLink", "Register here", "यहाँ पंजीकरण करें")}
          </Link>
        </div>
      </div>
    </div>
  );
}
