"use client";

import React, { useState, useEffect } from "react";
import { IntegrationCard } from "@/components/integrations/IntegrationCard";
import { CsvImportModal } from "@/components/integrations/CsvImportModal";
import { WebhookLogsTable } from "@/components/integrations/WebhookLogsTable";
import { Button } from "@/components/ui/Button";
import {
  ArrowsRightLeftIcon,
  ArrowUpTrayIcon,
  DocumentMagnifyingGlassIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function AdminIntegrationsPage() {
  const [activeTab, setActiveTab] = useState<"cards" | "logs">("cards");
  const [configs, setConfigs] = useState<Record<string, any>>({});
  const [logs, setLogs] = useState<any[]>([]);
  const [loadingConfigs, setLoadingConfigs] = useState(true);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Load configs
  const loadConfigs = async () => {
    setLoadingConfigs(true);
    try {
      const res = await fetch("/api/integrations");
      if (res.ok) {
        const data = await res.json();
        const map: Record<string, any> = {};
        for (const item of data) {
          map[item.platform] = item;
        }
        setConfigs(map);
      }
    } catch (err) {
      console.error("Failed to load integration configs:", err);
    } finally {
      setLoadingConfigs(false);
    }
  };

  // Load webhook logs
  const loadLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch("/api/integrations/logs");
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error("Failed to load logs:", err);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  useEffect(() => {
    if (activeTab === "logs") {
      loadLogs();
    }
  }, [activeTab]);

  const handleSaveConfig = async (platform: string, updated: any) => {
    const res = await fetch("/api/integrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, ...updated }),
    });

    if (res.ok) {
      const data = await res.json();
      setConfigs((prev) => ({ ...prev, [platform]: data }));
      setSaveMessage(`Settings for ${platform} saved successfully.`);
      setTimeout(() => setSaveMessage(null), 3000);
    } else {
      throw new Error("Failed to save settings");
    }
  };

  const handleTestConnection = async (platform: string) => {
    const res = await fetch("/api/integrations/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform }),
    });
    return res.json();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Lead Integration Center
            </h1>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Phase 3 Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Connect Facebook, Google Ads, Justdial, Booking.com/MMT, and generic webhooks into your centralized lead pipeline.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCsvModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <ArrowUpTrayIcon className="w-4 h-4 text-gray-600" />
            <span>Bulk CSV Import</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={activeTab === "logs" ? loadLogs : loadConfigs}
            className="flex items-center gap-1.5"
          >
            <ArrowPathIcon className="w-4 h-4 text-gray-600" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {saveMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
          <ShieldCheckIcon className="w-5 h-5 text-green-600 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("cards")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "cards"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <ArrowsRightLeftIcon className="w-4 h-4" />
          <span>Active Adapters & Webhooks</span>
        </button>

        <button
          onClick={() => setActiveTab("logs")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "logs"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <DocumentMagnifyingGlassIcon className="w-4 h-4" />
          <span>Webhook Payload Audit Logs</span>
        </button>
      </div>

      {/* Tab 1: Integration Cards */}
      {activeTab === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Facebook & Instagram Lead Ads */}
          <IntegrationCard
            platform="FACEBOOK"
            title="Facebook & Instagram Lead Ads"
            description="Capture leads instantly from Meta Ads forms with signature verification & Graph API answers."
            logo="📘"
            webhookUrl="/api/webhooks/facebook"
            config={configs.FACEBOOK || { isEnabled: false }}
            labels={{
              apiKeyLabel: "Page Access Token (Graph API)",
              apiKeyPlaceholder: "EAAG...",
              apiSecretLabel: "App Secret (for HMAC-SHA256 signature check)",
              apiSecretPlaceholder: "Enter Meta App Secret...",
              webhookSecretLabel: "Verification Token (hub.verify_token)",
              webhookSecretPlaceholder: "Custom verification string (e.g. lotr_meta_verify_2026)",
            }}
            onSave={handleSaveConfig}
            onTest={handleTestConnection}
          />

          {/* 2. Google Ads Lead Form */}
          <IntegrationCard
            platform="GOOGLE"
            title="Google Ads Lead Forms"
            description="Official Google Ads lead form extensions with google_key secret verification."
            logo="🔴"
            webhookUrl="/api/webhooks/google"
            config={configs.GOOGLE || { isEnabled: false }}
            labels={{
              webhookSecretLabel: "Google Key (google_key)",
              webhookSecretPlaceholder: "Enter secret key configured in Google Ads Lead Form Extension",
            }}
            onSave={handleSaveConfig}
            onTest={handleTestConnection}
          />

          {/* 3. Justdial Webhook & Inbound Email */}
          <IntegrationCard
            platform="JUSTDIAL"
            title="Justdial API & Email Parser"
            description="Inbound webhook endpoint and regex email body parser for customer searches on Justdial."
            logo="🟡"
            webhookUrl="/api/webhooks/justdial"
            config={configs.JUSTDIAL || { isEnabled: false }}
            labels={{
              webhookSecretLabel: "Justdial Secret Token / Auth Key",
              webhookSecretPlaceholder: "Enter secret token sent in ?secret= or Authorization header",
            }}
            onSave={handleSaveConfig}
            onTest={handleTestConnection}
          />

          {/* 4. Generic Incoming Webhook */}
          <IntegrationCard
            platform="GENERIC"
            title="Generic Inbound Webhook (Zapier / Make)"
            description="Universal REST endpoint protected with API Key. Push leads from Zapier, Make.com, or chatbots."
            logo="⚡"
            webhookUrl="/api/webhooks/generic"
            config={configs.GENERIC || { isEnabled: true }}
            labels={{
              apiKeyLabel: "API Key (x-api-key or ?api_key=)",
              apiKeyPlaceholder: "lotr_live_secret_key_xxxx",
            }}
            onSave={handleSaveConfig}
            onTest={handleTestConnection}
          />

          {/* 5. Booking.com / MakeMyTrip Partner Stubs */}
          <IntegrationCard
            platform="PARTNER"
            title="Booking.com & MakeMyTrip Partner APIs"
            description="Certified partner stubs for official inventory and lead sync. Strictly legal affiliate models."
            logo="🏨"
            webhookUrl=""
            config={configs.PARTNER || { isEnabled: false }}
            labels={{
              apiKeyLabel: "Booking.com Affiliate ID / Client ID",
              apiKeyPlaceholder: "Enter certified Booking.com partner ID...",
              apiSecretLabel: "MakeMyTrip Client Secret / B2B Token",
              apiSecretPlaceholder: "Enter certified MakeMyTrip gateway secret...",
            }}
            onSave={handleSaveConfig}
            onTest={handleTestConnection}
          />
        </div>
      )}

      {/* Tab 2: Webhook Audit Logs */}
      {activeTab === "logs" && (
        <WebhookLogsTable logs={logs} loading={loadingLogs} />
      )}

      {/* CSV Import Modal */}
      <CsvImportModal
        isOpen={csvModalOpen}
        onClose={() => setCsvModalOpen(false)}
        onImportComplete={loadLogs}
      />
    </div>
  );
}
