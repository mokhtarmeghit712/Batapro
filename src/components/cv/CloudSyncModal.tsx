"use client";

import React, { useState } from "react";
import { X, Cloud, CheckCircle2, LogOut, Loader2 } from "lucide-react";
import { useLang } from "@/components/providers/LangProvider";
import { CvDraft } from "@/types/cv";

interface CloudSyncModalProps {
  open: boolean;
  onClose: () => void;
  currentDraft: CvDraft;
  onLoadCloudDrafts: (drafts: CvDraft[]) => void;
}

export function CloudSyncModal({
  open,
  onClose,
  currentDraft,
  onLoadCloudDrafts,
}: CloudSyncModalProps) {
  const { cloudUser, refreshCloudUser, logoutCloud } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!open) return null;

  const handleAuthAndSync = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/cloud/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || "Sign in failed");
        return;
      }
      await refreshCloudUser();
      await pushCurrentDraft();
    } finally {
      setLoading(false);
    }
  };

  const pushCurrentDraft = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/cloud/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentDraft),
      });
      const json = await res.json();
      if (res.ok && Array.isArray(json.drafts)) {
        onLoadCloudDrafts(json.drafts);
        setStatusMsg("Saved & synced to your free cloud account!");
      } else {
        setErrorMsg(json.error || "Sync failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const pullCloudDrafts = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/cloud/drafts", { cache: "no-store" });
      const json = await res.json();
      if (res.ok && Array.isArray(json.drafts)) {
        onLoadCloudDrafts(json.drafts);
        setStatusMsg(`Loaded ${json.drafts.length} cloud draft(s).`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={onClose}
          className="absolute end-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-emerald-600">
          <Cloud className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Optional Free Cloud Sync</span>
        </div>
        <h2 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
          Sync Drafts Across Devices
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Guest mode already auto-saves locally in your browser. Sign in optionally to back up drafts to the cloud for free.
        </p>

        {errorMsg && (
          <div className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
            {errorMsg}
          </div>
        )}
        {statusMsg && (
          <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            {statusMsg}
          </div>
        )}

        {cloudUser ? (
          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-950">
              Signed in as <strong>{cloudUser.email}</strong>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={pushCurrentDraft}
                className="rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500"
              >
                Save Current to Cloud
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={pullCloudDrafts}
                className="rounded-xl border border-slate-300 py-2.5 text-xs font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Load Cloud Drafts
              </button>
            </div>
            <button
              type="button"
              onClick={logoutCloud}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs text-slate-500 hover:text-rose-600"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out of Cloud Sync
            </button>
          </div>
        ) : (
          <form onSubmit={handleAuthAndSync} className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Your Name (optional for new account)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-950"
            />
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-950"
            />
            <input
              type="password"
              required
              minLength={4}
              placeholder="Password (auto-creates account if new)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-950"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Connect &amp; Sync Draft Free
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
