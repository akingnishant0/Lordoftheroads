"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  XMarkIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete?: () => void;
}

export function CsvImportModal({
  isOpen,
  onClose,
  onImportComplete,
}: CsvImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState("CSV_IMPORT");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a CSV file to upload.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("source", source);

      const res = await fetch("/api/integrations/csv-import", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to import CSV");
      }

      setResult(data);
      if (onImportComplete) onImportComplete();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Bulk Lead CSV Importer
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Import leads exported from Booking.com, MakeMyTrip, or offline agency sheets
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
            <ExclamationCircleIcon className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {result ? (
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
              <CheckCircleIcon className="w-10 h-10 text-green-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-green-900">CSV Import Complete</h3>
              <p className="text-xs text-green-700 mt-1">
                Processed <span className="font-semibold">{result.totalRows}</span> rows successfully.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">New Leads</span>
                <span className="text-lg font-bold text-blue-600">{result.imported}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Duplicates</span>
                <span className="text-lg font-bold text-amber-600">{result.duplicates}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Failed</span>
                <span className="text-lg font-bold text-red-600">{result.failed}</span>
              </div>
            </div>

            {result.sampleLeads?.length > 0 && (
              <div>
                <span className="text-[11px] font-bold text-gray-700 block mb-2">
                  Sample Ingested Records:
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {result.sampleLeads.map((s: any, idx: number) => (
                    <div
                      key={idx}
                      className="text-[11px] p-2 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between"
                    >
                      <span className="font-semibold text-gray-800">{s.name} ({s.phone})</span>
                      <span className="font-mono text-blue-600">{s.leadNumber}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <Button size="sm" variant="primary" onClick={onClose}>
                Done & View Leads
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpload} className="mt-4 space-y-4 text-xs">
            {/* Source selector */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Data Source / Origin
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full py-2 px-3 rounded-lg border border-gray-200 bg-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="CSV_IMPORT">Standard CSV / Offline Agency Sheet</option>
                <option value="BOOKING_COM">Booking.com Partner Portal Export</option>
                <option value="MAKEMYTRIP">MakeMyTrip Agent Portal Export</option>
                <option value="JUSTDIAL">Justdial Leads Export</option>
                <option value="FACEBOOK">Facebook Lead Ads CSV Export</option>
                <option value="GOOGLE">Google Ads Leads CSV Export</option>
              </select>
            </div>

            {/* File Upload Area */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Select CSV File
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors bg-gray-50/50">
                <ArrowUpTrayIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium mb-1">
                  {file ? file.name : "Click to select or drag and drop a .csv file"}
                </p>
                <p className="text-[10px] text-gray-400">
                  Headers detected automatically: Name, Phone, Email, PinCode, Destination, Budget.
                </p>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="csv-file-input"
                />
                <label
                  htmlFor="csv-file-input"
                  className="mt-3 inline-block cursor-pointer px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-xs"
                >
                  Browse Files
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                loading={loading}
                disabled={!file}
              >
                Upload & Process Leads
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
