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

  const handleDemoFill = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
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
    <div className="min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 sm:p-10 border border-[#E7E6E0]">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-serif font-bold text-[#173D32]">
          {getTxt("auth.welcomeBack", "Team & Partner Workspace", "टीम एवं पार्टनर कार्यक्षेत्र")}
        </h1>
        <p className="text-xs text-[#737B76] mt-1 font-medium">
          {getTxt(
            "auth.subTitle",
            "Sign in with your admin, office, agent or customer account",
            "अपने एडमिन, ऑफिस, एजेंट या ग्राहक खाते से साइन इन करें"
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#173D32] mb-1">
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
            className="w-full px-3.5 py-2.5 border border-[#E7E6E0] rounded-xl bg-[#FAF8F4] text-xs text-[#242A28] focus:outline-none focus:border-[#173D32] focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#173D32] mb-1">
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
            className="w-full px-3.5 py-2.5 border border-[#E7E6E0] rounded-xl bg-[#FAF8F4] text-xs text-[#242A28] focus:outline-none focus:border-[#173D32] focus:bg-white transition"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
            disabled={loading}
          >
            {loading
              ? getTxt("common.loading", "Signing in...", "साइन इन हो रहा है...")
              : getTxt("auth.loginButton", "Sign in →", "साइन इन →")}
          </button>
        </div>
      </form>

      {/* Demo Credentials Quick-Fill helper */}
      <div className="mt-6 pt-5 border-t border-[#E7E6E0]">
        <p className="text-[10px] font-bold text-[#737B76] uppercase tracking-wider text-center mb-2.5">
          Quick Demo Accounts (Click to test)
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleDemoFill("admin@lordoftheroad.in", "Admin@123")}
            className="p-2.5 border border-[#E7E6E0] bg-[#FAF8F4] hover:bg-[#EDE5D8] rounded-xl text-left transition-colors cursor-pointer"
          >
            <strong className="block text-[#173D32] text-xs">Super Admin</strong>
            <span className="text-[10px] text-[#737B76]">admin@lordoftheroad.in</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoFill("office@lordoftheroad.in", "Office@123")}
            className="p-2.5 border border-[#E7E6E0] bg-[#FAF8F4] hover:bg-[#EDE5D8] rounded-xl text-left transition-colors cursor-pointer"
          >
            <strong className="block text-[#173D32] text-xs">Office Admin</strong>
            <span className="text-[10px] text-[#737B76]">office@lordoftheroad.in</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoFill("agent@lordoftheroad.in", "Agent@123")}
            className="p-2.5 border border-[#E7E6E0] bg-[#FAF8F4] hover:bg-[#EDE5D8] rounded-xl text-left transition-colors cursor-pointer"
          >
            <strong className="block text-[#173D32] text-xs">Travel Agent</strong>
            <span className="text-[10px] text-[#737B76]">agent@lordoftheroad.in</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoFill("customer@lordoftheroad.in", "Customer@123")}
            className="p-2.5 border border-[#E7E6E0] bg-[#FAF8F4] hover:bg-[#EDE5D8] rounded-xl text-left transition-colors cursor-pointer"
          >
            <strong className="block text-[#173D32] text-xs">Customer</strong>
            <span className="text-[10px] text-[#737B76]">customer@lordoftheroad.in</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-[#737B76]">
        <span>
          {getTxt("auth.noAccount", "Don't have an account?", "खाता नहीं है?")}{" "}
        </span>
        <Link
          href="/register"
          className="font-bold text-[#B7955B] hover:text-[#173D32] transition"
        >
          {getTxt("auth.registerLink", "Register here", "यहाँ पंजीकरण करें")}
        </Link>
      </div>
          </div>
    </div>
  );
}
