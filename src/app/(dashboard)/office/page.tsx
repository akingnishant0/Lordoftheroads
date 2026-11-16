"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Card } from "@/components/ui/Card";
import {
  InboxStackIcon,
  UserGroupIcon,
  ClockIcon,
  EyeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function OfficeDashboardPage() {
  const { data: session } = useSession();
  const { t, language } = useLanguage();
  const [statsData, setStatsData] = useState<{ TOTAL?: number; NEW?: number }>({ TOTAL: 0, NEW: 0 });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/leads/stats");
        if (res.ok) {
          const data = await res.json();
          setStatsData(data);
        }
      } catch (err) {
        console.error("Failed to load office stats:", err);
      }
    }
    loadStats();
  }, []);

  const getTxt = (key: string, enText: string, hiText: string) => {
    const val = t(key);
    if (val && val !== key) return val;
    return language === "hi" ? hiText : enText;
  };

  const userName = session?.user?.name || getTxt("roles.officeAdmin", "Office Manager", "कार्यालय प्रबंधक");

  const stats = [
    {
      id: "territoryLeads",
      label: getTxt("office.territoryLeads", "Territory Leads", "क्षेत्रीय लीड्स"),
      value: String(statsData.TOTAL || 0),
      badge: `${statsData.NEW || 0} New`,
      href: "/office/leads",
      icon: InboxStackIcon,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "activeAgents",
      label: getTxt("office.activeAgents", "Active Agents", "सक्रिय एजेंट"),
      value: "1",
      href: "#",
      icon: UserGroupIcon,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "pendingApprovals",
      label: getTxt("office.pendingApprovals", "Pending Approvals", "लंबित स्वीकृतियां"),
      value: "0",
      href: "#",
      icon: ClockIcon,
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {getTxt("dashboard.welcomePrefix", "Welcome", "स्वागत है")}, {userName} 🏢
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {getTxt(
              "office.overviewSubtitle",
              "Branch Office Management — Manage regional pin codes, route inquiries, and monitor agent teams.",
              "शाखा कार्यालय प्रबंधन — क्षेत्रीय पिन कोड प्रबंधित करें, पूछताछ अग्रेषित करें और एजेंटों की निगरानी करें।"
            )}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold self-start sm:self-center border border-blue-200">
          <span>🏛️</span>
          <span>{getTxt("roles.officeAdminRole", "Branch Admin", "शाखा प्रबंधक")}</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.id} href={stat.href}>
              <Card className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-extrabold text-gray-900 leading-tight">
                        {stat.value}
                      </div>
                      {stat.badge && (
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                          {stat.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-medium text-gray-500 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Tiles */}
      <div className="mt-8">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          {getTxt("dashboard.quickActions", "Quick Actions", "त्वरित कार्य")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/office/leads"
            className="group relative bg-white border border-blue-200 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-blue-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <EyeIcon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {getTxt("office.viewLeads", "View Branch Leads", "शाखा की लीड्स देखें")}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {getTxt(
                  "office.viewLeadsDesc",
                  "Review inquiries auto-routed to your covered pin codes and assign them to your agents.",
                  "अपने पिन कोड पर आई लीड्स देखें और अपनी टीम के एजेंटों को असाइन करें।"
                )}
              </p>
            </div>
            <div className="mt-4 py-2 px-3 text-xs font-semibold rounded-lg bg-blue-600 text-white text-center hover:bg-blue-700 transition-colors">
              Open Leads CRM →
            </div>
          </Link>

          <div className="group relative bg-white border border-gray-200 rounded-xl p-5 shadow-xs opacity-80 hover:opacity-100 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 mb-3">
                  <UsersIcon className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                  Phase 4
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {getTxt("office.manageAgents", "Manage Branch Agents", "शाखा एजेंटों का प्रबंधन")}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {getTxt(
                  "office.manageAgentsDesc",
                  "Monitor verified field agents, pin code assignments, and commission payouts.",
                  "सत्यापित फील्ड एजेंटों, पिन कोड असाइनमेंट और कमीशन पेआउट्स की निगरानी करें।"
                )}
              </p>
            </div>
            <button
              type="button"
              disabled
              className="mt-4 w-full py-2 px-3 text-xs font-medium rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
            >
              Coming in Phase 4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
