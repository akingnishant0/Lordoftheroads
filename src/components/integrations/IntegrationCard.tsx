"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export interface IntegrationCardProps {
  platform: string;
  title: string;
  description: string;
  logo: string;
  webhookUrl: string;
  config: {
    isEnabled: boolean;
    apiKey?: string | null;
    apiSecret?: string | null;
    webhookSecret?: string | null;
    additionalConfig?: any;
  };
  labels: {
    apiKeyLabel?: string;
    apiKeyPlaceholder?: string;
    apiSecretLabel?: string;
    apiSecretPlaceholder?: string;
    webhookSecretLabel?: string;
    webhookSecretPlaceholder?: string;
  };
  onSave: (platform: string, updatedConfig: any) => Promise<void>;
  onTest: (platform: string) => Promise<{ success: boolean; message: string }>;
}

export function IntegrationCard({
  platform,
  title,
  description,
  logo,
  webhookUrl,
  config,
  labels,
  onSave,
  onTest,
}: IntegrationCardProps) {
  const [isEnabled, setIsEnabled] = useState(config.isEnabled);
  const [apiKey, setApiKey] = useState(config.apiKey || "");
  const [apiSecret, setApiSecret] = useState(config.apiSecret || "");
  const [webhookSecret, setWebhookSecret] = useState(config.webhookSecret || "");

  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const fullWebhookUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${webhookUrl}`
      : `http://localhost:3000${webhookUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullWebhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(platform, {
        isEnabled,
        apiKey: apiKey.trim() || null,
        apiSecret: apiSecret.trim() || null,
        webhookSecret: webhookSecret.trim() || null,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await onTest(platform);
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || "Test failed" });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
      {/* Top Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-gray-100 flex items-center justify-center text-2xl shrink-0">
              {logo}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
            </div>
          </div>

          {/* Enable / Disable Switch */}
          <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Webhook Endpoint Box */}
        {webhookUrl && (
          <div className="mt-4 bg-gray-50/80 border border-gray-200/70 rounded-xl p-2.5 text-xs">
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
              Webhook Endpoint URL
            </span>
            <div className="flex items-center justify-between gap-2">
              <code className="font-mono text-gray-700 truncate select-all">
                {fullWebhookUrl}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className="text-gray-500 hover:text-blue-600 p-1 rounded-md hover:bg-white transition-colors shrink-0"
                title="Copy URL"
              >
                {copied ? (
                  <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600" />
                ) : (
                  <ClipboardDocumentIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Credentials Inputs */}
      <div className="p-5 space-y-3.5 text-xs bg-white flex-1">
        {labels.apiKeyLabel && (
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              {labels.apiKeyLabel}
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={labels.apiKeyPlaceholder || "Enter API Key or Token..."}
              className="w-full py-2 px-3 rounded-lg border border-gray-200 font-mono text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {labels.apiSecretLabel && (
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              {labels.apiSecretLabel}
            </label>
            <input
              type="password"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              placeholder={labels.apiSecretPlaceholder || "Enter App Secret..."}
              className="w-full py-2 px-3 rounded-lg border border-gray-200 font-mono text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {labels.webhookSecretLabel && (
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              {labels.webhookSecretLabel}
            </label>
            <input
              type="text"
              value={webhookSecret}
              onChange={(e) => setWebhookSecret(e.target.value)}
              placeholder={labels.webhookSecretPlaceholder || "Enter verification secret token..."}
              className="w-full py-2 px-3 rounded-lg border border-gray-200 font-mono text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Test Result Message */}
        {testResult && (
          <div
            className={`p-2.5 rounded-lg border flex items-start gap-2 text-[11px] ${
              testResult.success
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {testResult.success ? (
              <CheckCircleIcon className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            ) : (
              <XCircleIcon className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            )}
            <span>{testResult.message}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleTest}
          loading={testing}
          className="text-xs flex items-center gap-1.5"
        >
          <ArrowPathIcon className="w-3.5 h-3.5" />
          <span>Test Connection</span>
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          loading={saving}
          className="text-xs"
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
