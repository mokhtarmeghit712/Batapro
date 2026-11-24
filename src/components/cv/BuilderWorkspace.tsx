"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Download,
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Wand2,
  ZoomIn,
  ZoomOut,
  Cloud,
  Loader2,
  HardDrive,
} from "lucide-react";
import {
  calculateAtsScore,
  CvData,
  CvDraft,
  CvFontStyle,
  SAMPLE_CV_BY_LANG,
} from "@/types/cv";
import { getDirectionForLang, LanguageCode } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { BUILTIN_TEMPLATES } from "@/lib/templates/catalog";
import { useLang } from "@/components/providers/LangProvider";
import { CvPreviewSheet } from "@/components/cv/CvPreviewSheet";
import { downloadFreeAtsPdf } from "@/components/cv/CvPdfDocument";
import { CloudSyncModal } from "@/components/cv/CloudSyncModal";

type EditorTab =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "certifications"
  | "projects";

const STORAGE_KEY = "batapro_drafts_v1";
const ACCENT_PRESETS = ["#0f172a", "#059669", "#1d4ed8", "#4338ca", "#0f766e", "#b91c1c"];

export function BuilderWorkspace() {
  const searchParams = useSearchParams();
  const urlTemplate = searchParams.get("template");
  const { lang: uiLang, dict: uiDict } = useLang();

  const [draftId, setDraftId] = useState<string>("draft-default");
  const [draftTitle, setDraftTitle] = useState<string>("My BATAPRO CV");
  const [templateSlug, setTemplateSlug] = useState<string>(urlTemplate || "ats-executive");
  const [cvLang, setCvLang] = useState<LanguageCode>(uiLang);
  const [accentColor, setAccentColor] = useState<string>("#0f172a");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [fontStyle, setFontStyle] = useState<CvFontStyle>(uiLang === "ar" ? "arabic" : "sans");
  const [cvData, setCvData] = useState<CvData>(SAMPLE_CV_BY_LANG[uiLang] ?? SAMPLE_CV_BY_LANG.en);
  const [allDrafts, setAllDrafts] = useState<CvDraft[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [activeTab, setActiveTab] = useState<EditorTab>("personal");
  const [zoom, setZoom] = useState<number>(0.72);
  const [skillInput, setSkillInput] = useState<string>("");
  const [enhancingKey, setEnhancingKey] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [cloudModalOpen, setCloudModalOpen] = useState(false);

  const cvDict = useMemo(() => getDictionary(cvLang), [cvLang]);
  const atsResult = useMemo(() => calculateAtsScore(cvData, templateSlug), [cvData, templateSlug]);

  // Load saved drafts from LocalStorage immediately on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CvDraft[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllDrafts(parsed);
          const first = parsed[0];
          setDraftId(first.id);
          setDraftTitle(first.title);
          setTemplateSlug(urlTemplate || first.templateSlug);
          setCvLang(first.language);
          setAccentColor(first.accentColor);
          setFontSize(first.fontSize);
          setFontStyle(first.fontStyle || "sans");
          setCvData(first.data);
          setHydrated(true);
          return;
        }
      }
    } catch {
      // Ignore corrupt localStorage
    }
    setHydrated(true);
  }, [urlTemplate]);

  // Auto-save to LocalStorage on every edit (0 friction guest mode)
  const currentDraft: CvDraft = useMemo(
    () => ({
      id: draftId,
      title: draftTitle,
      templateSlug,
      language: cvLang,
      accentColor,
      fontSize,
      fontStyle,
      data: cvData,
      updatedAt: new Date().toISOString(),
    }),
    [draftId, draftTitle, templateSlug, cvLang, accentColor, fontSize, fontStyle, cvData]
  );

  useEffect(() => {
    if (!hydrated) return;
    setAllDrafts((prev) => {
      const idx = prev.findIndex((d) => d.id === currentDraft.id);
      const next = idx >= 0 ? prev.map((d, i) => (i === idx ? currentDraft : d)) : [currentDraft, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore quota exceeded
      }
      return next;
    });
  }, [currentDraft, hydrated]);

  const handleCvLangSwitch = (nextLang: LanguageCode, loadSampleToo = false) => {
    setCvLang(nextLang);
    setFontStyle(nextLang === "ar" ? "arabic" : "sans");
    if (loadSampleToo) {
      setCvData(SAMPLE_CV_BY_LANG[nextLang] ?? SAMPLE_CV_BY_LANG.en);
    }
  };

  const handleCreateNewDraft = () => {
    const newId = `draft-${Date.now()}`;
    setDraftId(newId);
    setDraftTitle(`Resume ${allDrafts.length + 1}`);
    setCvData(SAMPLE_CV_BY_LANG[cvLang] ?? SAMPLE_CV_BY_LANG.en);
  };

  const handleSelectDraft = (d: CvDraft) => {
    setDraftId(d.id);
    setDraftTitle(d.title);
    setTemplateSlug(d.templateSlug);
    setCvLang(d.language);
    setAccentColor(d.accentColor);
    setFontSize(d.fontSize);
    setFontStyle(d.fontStyle || "sans");
    setCvData(d.data);
  };

  const handleAiEnhance = async (
    text: string,
    kind: "bullet" | "summary",
    key: string,
    applyFn: (enhanced: string) => void
  ) => {
    if (!text.trim()) return;
    setEnhancingKey(key);
    try {
      const res = await fetch("/api/ai/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: cvLang, kind }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.enhanced) applyFn(json.enhanced);
      }
    } finally {
      setEnhancingKey(null);
    }
  };

  const handleExportVectorPdf = async () => {
    setExporting(true);
    try {
      await downloadFreeAtsPdf({
        data: cvData,
        templateSlug,
        language: cvLang,
        accentColor,
        fileName: `${(cvData.personal.fullName || "BATAPRO_CV").replace(/\s+/g, "_")}_${templateSlug}.pdf`,
      });
    } finally {
      setExporting(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCvData((d) => ({ ...d, personal: { ...d.personal, photoUrl: reader.result as string } }));
      }
    };
    reader.readAsDataURL(file);
  };

  const tabs: { id: EditorTab; label: string }[] = [
    { id: "personal", label: uiDict.builder.personal },
    { id: "summary", label: uiDict.builder.summary },
    { id: "experience", label: uiDict.builder.experience },
    { id: "education", label: uiDict.builder.education },
    { id: "skills", label: uiDict.builder.skills },
    { id: "languages", label: uiDict.builder.languages },
    { id: "certifications", label: uiDict.builder.certifications },
    { id: "projects", label: uiDict.builder.projects },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Builder Toolbar */}
      <div className="no-print border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              aria-label="CV Title"
              className="w-40 rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950"
            />

            <select
              value={templateSlug}
              onChange={(e) => {
                const nextSlug = e.target.value;
                setTemplateSlug(nextSlug);
                const found = BUILTIN_TEMPLATES.find((t) => t.slug === nextSlug);
                if (found) setAccentColor(found.accentColor);
              }}
              aria-label="Select template"
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950"
            >
              {BUILTIN_TEMPLATES.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {uiLang === "ar" ? t.nameAr : uiLang === "fr" ? t.nameFr : t.name}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-950">
              <span className="text-[11px] text-slate-500">{uiDict.builder.cvLang}:</span>
              <select
                value={cvLang}
                onChange={(e) => handleCvLangSwitch(e.target.value as LanguageCode)}
                className="bg-transparent font-semibold outline-none"
              >
                <option value="en">English (LTR)</option>
                <option value="fr">Français (LTR)</option>
                <option value="ar">العربية (RTL)</option>
                <option value="es">Español (LTR)</option>
                <option value="de">Deutsch (LTR)</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => handleCvLangSwitch(cvLang, true)}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {uiDict.builder.loadSample}
            </button>

            <button
              type="button"
              onClick={handleCreateNewDraft}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
            >
              <Plus className="h-3.5 w-3.5" />
              {uiDict.builder.newDraft}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="hidden items-center gap-1 text-[11px] font-medium text-emerald-600 sm:inline-flex">
              <HardDrive className="h-3.5 w-3.5" />
              {uiDict.builder.autoSaved}
            </span>

            <div className="hidden items-center gap-1 sm:flex mx-1">
              {ACCENT_PRESETS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setAccentColor(c)}
                  aria-label={`Set color ${c}`}
                  className={`h-5 w-5 rounded-full border-2 ${
                    accentColor === c ? "border-slate-900 scale-110 dark:border-white" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCloudModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <Cloud className="h-3.5 w-3.5 text-emerald-600" />
              {uiDict.builder.cloudSave}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <Printer className="h-3.5 w-3.5" />
              {uiDict.builder.printPdf}
            </button>

            <button
              type="button"
              onClick={handleExportVectorPdf}
              disabled={exporting}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-60"
            >
              {exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
              {uiDict.builder.exportPdf}
            </button>
          </div>
        </div>

        {/* Local Drafts Switcher Pills */}
        {allDrafts.length > 1 && (
          <div className="mx-auto mt-2.5 flex max-w-[1600px] flex-wrap items-center gap-1.5 border-t border-slate-100 pt-2.5 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400">Local Drafts:</span>
            {allDrafts.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => handleSelectDraft(d)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${
                  d.id === draftId
                    ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {d.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Split-Screen Workspace */}
      <div className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 lg:grid-cols-12">
        {/* LEFT PANE */}
        <div className="no-print border-e border-slate-200 bg-white p-4 sm:p-5 lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white dark:bg-emerald-600"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            dir={getDirectionForLang(cvLang)}
            className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/50"
          >
            {activeTab === "personal" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={cvData.personal.fullName}
                    onChange={(e) =>
                      setCvData((d) => ({ ...d, personal: { ...d.personal, fullName: e.target.value } }))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold">Target Job Title</label>
                  <input
                    type="text"
                    value={cvData.personal.jobTitle}
                    onChange={(e) =>
                      setCvData((d) => ({ ...d, personal: { ...d.personal, jobTitle: e.target.value } }))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Email</label>
                  <input
                    type="email"
                    value={cvData.personal.email}
                    onChange={(e) =>
                      setCvData((d) => ({ ...d, personal: { ...d.personal, email: e.target.value } }))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Phone</label>
                  <input
                    type="text"
                    value={cvData.personal.phone}
                    onChange={(e) =>
                      setCvData((d) => ({ ...d, personal: { ...d.personal, phone: e.target.value } }))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold">Location</label>
                  <input
                    type="text"
                    value={cvData.personal.location}
                    onChange={(e) =>
                      setCvData((d) => ({ ...d, personal: { ...d.personal, location: e.target.value } }))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">LinkedIn</label>
                  <input
                    type="text"
                    value={cvData.personal.linkedin || ""}
                    onChange={(e) =>
                      setCvData((d) => ({ ...d, personal: { ...d.personal, linkedin: e.target.value } }))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Portfolio / GitHub</label>
                  <input
                    type="text"
                    value={cvData.personal.website || ""}
                    onChange={(e) =>
                      setCvData((d) => ({ ...d, personal: { ...d.personal, website: e.target.value } }))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Nationality (Gulf/EU)</label>
                  <input
                    type="text"
                    value={cvData.personal.nationality || ""}
                    onChange={(e) =>
                      setCvData((d) => ({
                        ...d,
                        personal: { ...d.personal, nationality: e.target.value },
                      }))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Photo (Non-ATS Only)</label>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full text-xs" />
                </div>
              </div>
            )}

            {activeTab === "summary" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold">{cvDict.cvSections.summary}</label>
                  <button
                    type="button"
                    disabled={enhancingKey === "summary"}
                    onClick={() =>
                      handleAiEnhance(cvData.summary, "summary", "summary", (enhanced) =>
                        setCvData((d) => ({ ...d, summary: enhanced }))
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-emerald-500"
                  >
                    <Wand2 className="h-3 w-3" />
                    {enhancingKey === "summary" ? uiDict.builder.enhancing : uiDict.builder.aiEnhance}
                  </button>
                </div>
                <textarea
                  rows={6}
                  value={cvData.summary}
                  onChange={(e) => setCvData((d) => ({ ...d, summary: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm leading-relaxed dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
            )}

            {activeTab === "experience" && (
              <div className="space-y-4">
                {cvData.experience.map((exp, expIdx) => (
                  <div
                    key={exp.id}
                    className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">
                        #{expIdx + 1} {exp.role || "Role"}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setCvData((d) => ({
                            ...d,
                            experience: d.experience.filter((item) => item.id !== exp.id),
                          }))
                        }
                        className="text-rose-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Role"
                        value={exp.role}
                        onChange={(e) =>
                          setCvData((d) => ({
                            ...d,
                            experience: d.experience.map((item) =>
                              item.id === exp.id ? { ...item, role: e.target.value } : item
                            ),
                          }))
                        }
                        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-950"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) =>
                          setCvData((d) => ({
                            ...d,
                            experience: d.experience.map((item) =>
                              item.id === exp.id ? { ...item, company: e.target.value } : item
                            ),
                          }))
                        }
                        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-950"
                      />
                      <input
                        type="text"
                        placeholder="Start"
                        value={exp.startDate}
                        onChange={(e) =>
                          setCvData((d) => ({
                            ...d,
                            experience: d.experience.map((item) =>
                              item.id === exp.id ? { ...item, startDate: e.target.value } : item
                            ),
                          }))
                        }
                        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-950"
                      />
                      <input
                        type="text"
                        placeholder="End"
                        disabled={exp.current}
                        value={exp.current ? cvDict.cvSections.present : exp.endDate}
                        onChange={(e) =>
                          setCvData((d) => ({
                            ...d,
                            experience: d.experience.map((item) =>
                              item.id === exp.id ? { ...item, endDate: e.target.value } : item
                            ),
                          }))
                        }
                        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950"
                      />
                    </div>
                    <label className="inline-flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) =>
                          setCvData((d) => ({
                            ...d,
                            experience: d.experience.map((item) =>
                              item.id === exp.id ? { ...item, current: e.target.checked } : item
                            ),
                          }))
                        }
                      />
                      Currently working here
                    </label>

                    <div className="space-y-2 pt-1">
                      {exp.bullets.map((bullet, bIdx) => {
                        const key = `${exp.id}-${bIdx}`;
                        return (
                          <div key={key} className="flex items-start gap-1.5">
                            <textarea
                              rows={2}
                              value={bullet}
                              onChange={(e) =>
                                setCvData((d) => ({
                                  ...d,
                                  experience: d.experience.map((item) =>
                                    item.id === exp.id
                                      ? {
                                          ...item,
                                          bullets: item.bullets.map((b, i) =>
                                            i === bIdx ? e.target.value : b
                                          ),
                                        }
                                      : item
                                  ),
                                }))
                              }
                              className="flex-1 rounded-lg border border-slate-300 p-2 text-xs dark:border-slate-700 dark:bg-slate-950"
                            />
                            <button
                              type="button"
                              title={uiDict.builder.aiEnhance}
                              disabled={enhancingKey === key}
                              onClick={() =>
                                handleAiEnhance(bullet, "bullet", key, (enhanced) =>
                                  setCvData((d) => ({
                                    ...d,
                                    experience: d.experience.map((item) =>
                                      item.id === exp.id
                                        ? {
                                            ...item,
                                            bullets: item.bullets.map((b, i) =>
                                              i === bIdx ? enhanced : b
                                            ),
                                          }
                                        : item
                                    ),
                                  }))
                                )
                              }
                              className="rounded-lg bg-emerald-50 p-2 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300"
                            >
                              <Sparkles className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() =>
                          setCvData((d) => ({
                            ...d,
                            experience: d.experience.map((item) =>
                              item.id === exp.id
                                ? { ...item, bullets: [...item.bullets, "Worked on..."] }
                                : item
                            ),
                          }))
                        }
                        className="text-[11px] font-semibold text-emerald-600 hover:underline"
                      >
                        + Add Bullet Point
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCvData((d) => ({
                      ...d,
                      experience: [
                        ...d.experience,
                        {
                          id: `exp-${Date.now()}`,
                          role: "New Role",
                          company: "Company",
                          location: "Algiers / Remote",
                          startDate: "2024",
                          endDate: "Present",
                          current: true,
                          bullets: ["Worked on core deliverables and improved metrics."],
                        },
                      ],
                    }))
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white dark:bg-emerald-600"
                >
                  <Plus className="h-3.5 w-3.5" /> {uiDict.builder.addItem}
                </button>
              </div>
            )}

            {activeTab === "education" && (
              <div className="space-y-3">
                {cvData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="space-y-2 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex justify-between">
                      <span className="text-xs font-bold">{edu.degree}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setCvData((d) => ({
                            ...d,
                            education: d.education.filter((i) => i.id !== edu.id),
                          }))
                        }
                        className="text-rose-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        setCvData((d) => ({
                          ...d,
                          education: d.education.map((i) =>
                            i.id === edu.id ? { ...i, degree: e.target.value } : i
                          ),
                        }))
                      }
                      className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-950"
                    />
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        setCvData((d) => ({
                          ...d,
                          education: d.education.map((i) =>
                            i.id === edu.id ? { ...i, institution: e.target.value } : i
                          ),
                        }))
                      }
                      className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-950"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) =>
                          setCvData((d) => ({
                            ...d,
                            education: d.education.map((i) =>
                              i.id === edu.id ? { ...i, startDate: e.target.value } : i
                            ),
                          }))
                        }
                        className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-950"
                      />
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) =>
                          setCvData((d) => ({
                            ...d,
                            education: d.education.map((i) =>
                              i.id === edu.id ? { ...i, endDate: e.target.value } : i
                            ),
                          }))
                        }
                        className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-950"
                      />
                      <input
                        type="text"
                        placeholder="GPA"
                        value={edu.gpa || ""}
                        onChange={(e) =>
                          setCvData((d) => ({
                            ...d,
                            education: d.education.map((i) =>
                              i.id === edu.id ? { ...i, gpa: e.target.value } : i
                            ),
                          }))
                        }
                        className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-950"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setCvData((d) => ({
                      ...d,
                      education: [
                        ...d.education,
                        {
                          id: `edu-${Date.now()}`,
                          degree: "Master / Bachelor",
                          institution: "University",
                          location: "Algiers",
                          startDate: "2020",
                          endDate: "2024",
                        },
                      ],
                    }))
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white dark:bg-emerald-600"
                >
                  <Plus className="h-3.5 w-3.5" /> {uiDict.builder.addItem}
                </button>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add skill..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && skillInput.trim()) {
                        e.preventDefault();
                        setCvData((d) => ({ ...d, skills: [...d.skills, skillInput.trim()] }));
                        setSkillInput("");
                      }
                    }}
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!skillInput.trim()) return;
                      setCvData((d) => ({ ...d, skills: [...d.skills, skillInput.trim()] }));
                      setSkillInput("");
                    }}
                    className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cvData.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium dark:border-slate-700 dark:bg-slate-900"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() =>
                          setCvData((d) => ({ ...d, skills: d.skills.filter((_, i) => i !== idx) }))
                        }
                        className="text-slate-400 hover:text-rose-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "languages" && (
              <div className="space-y-2.5">
                {cvData.languages.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        setCvData((d) => ({
                          ...d,
                          languages: d.languages.map((l) =>
                            l.id === item.id ? { ...l, name: e.target.value } : l
                          ),
                        }))
                      }
                      className="flex-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
                    />
                    <input
                      type="text"
                      value={item.level}
                      onChange={(e) =>
                        setCvData((d) => ({
                          ...d,
                          languages: d.languages.map((l) =>
                            l.id === item.id ? { ...l, level: e.target.value } : l
                          ),
                        }))
                      }
                      className="flex-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setCvData((d) => ({
                          ...d,
                          languages: d.languages.filter((l) => l.id !== item.id),
                        }))
                      }
                      className="text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setCvData((d) => ({
                      ...d,
                      languages: [
                        ...d.languages,
                        { id: `lang-${Date.now()}`, name: "Spanish", level: "B1" },
                      ],
                    }))
                  }
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-emerald-600"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Language
                </button>
              </div>
            )}

            {activeTab === "certifications" && (
              <div className="space-y-2.5">
                {cvData.certifications.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 gap-2">
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) =>
                        setCvData((d) => ({
                          ...d,
                          certifications: d.certifications.map((i) =>
                            i.id === c.id ? { ...i, name: e.target.value } : i
                          ),
                        }))
                      }
                      className="col-span-6 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
                    />
                    <input
                      type="text"
                      value={c.issuer}
                      onChange={(e) =>
                        setCvData((d) => ({
                          ...d,
                          certifications: d.certifications.map((i) =>
                            i.id === c.id ? { ...i, issuer: e.target.value } : i
                          ),
                        }))
                      }
                      className="col-span-3 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
                    />
                    <input
                      type="text"
                      value={c.year}
                      onChange={(e) =>
                        setCvData((d) => ({
                          ...d,
                          certifications: d.certifications.map((i) =>
                            i.id === c.id ? { ...i, year: e.target.value } : i
                          ),
                        }))
                      }
                      className="col-span-2 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setCvData((d) => ({
                          ...d,
                          certifications: d.certifications.filter((i) => i.id !== c.id),
                        }))
                      }
                      className="col-span-1 flex items-center justify-center text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setCvData((d) => ({
                      ...d,
                      certifications: [
                        ...d.certifications,
                        { id: `cert-${Date.now()}`, name: "Certification", issuer: "Org", year: "2026" },
                      ],
                    }))
                  }
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-emerald-600"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Certification
                </button>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-3">
                {cvData.projects.map((p) => (
                  <div
                    key={p.id}
                    className="space-y-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) =>
                          setCvData((d) => ({
                            ...d,
                            projects: d.projects.map((i) =>
                              i.id === p.id ? { ...i, name: e.target.value } : i
                            ),
                          }))
                        }
                        className="flex-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-950"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setCvData((d) => ({
                            ...d,
                            projects: d.projects.filter((i) => i.id !== p.id),
                          }))
                        }
                        className="text-rose-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={p.summary}
                      onChange={(e) =>
                        setCvData((d) => ({
                          ...d,
                          projects: d.projects.map((i) =>
                            i.id === p.id ? { ...i, summary: e.target.value } : i
                          ),
                        }))
                      }
                      className="w-full rounded-lg border border-slate-300 p-2 text-xs dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setCvData((d) => ({
                      ...d,
                      projects: [
                        ...d.projects,
                        { id: `proj-${Date.now()}`, name: "Project", role: "Lead", summary: "" },
                      ],
                    }))
                  }
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-emerald-600"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Project
                </button>
              </div>
            )}
          </div>

          {/* ATS Score Meter */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">{uiDict.builder.atsScore}</span>
              <span className="text-sm font-black text-emerald-600">{atsResult.score} / 100</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${atsResult.score}%` }}
              />
            </div>
            <ul className="mt-3 space-y-1">
              {atsResult.checks.map((c) => (
                <li key={c.key} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                  {c.passed ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                  )}
                  <span>{c.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT PANE: Instant A4 Preview */}
        <div className="flex flex-col items-center bg-slate-200/70 p-4 sm:p-6 lg:col-span-7 dark:bg-slate-950">
          <div className="no-print mb-4 flex w-full max-w-[210mm] flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-300/70 bg-white/90 px-4 py-2 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <span className="font-semibold">A4 Preview</span>
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                {getDirectionForLang(cvLang)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Font Switcher */}
              <select
                aria-label="CV Font Style"
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value as CvFontStyle)}
                className="rounded border border-slate-200 bg-transparent px-2 py-0.5 text-[11px] font-semibold dark:border-slate-700"
              >
                <option value="sans">Sans (Modern)</option>
                <option value="serif">Serif (Classic)</option>
                <option value="arabic">Arabic (Tahoma)</option>
              </select>

              <div className="flex items-center gap-1">
                {(["sm", "md", "lg"] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setFontSize(sz)}
                    className={`rounded px-2 py-0.5 text-[11px] font-semibold uppercase ${
                      fontSize === sz
                        ? "bg-slate-900 text-white dark:bg-emerald-600"
                        : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.45, +(z - 0.08).toFixed(2)))}
                  className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-semibold">{Math.round(zoom * 100)}%</span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(1.05, +(z + 0.08).toFixed(2)))}
                  className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto pb-12 flex justify-center">
            <div
              className="origin-top transition-transform"
              style={{ transform: `scale(${zoom})`, marginBottom: `-${(1 - zoom) * 297}mm` }}
            >
              <CvPreviewSheet
                data={cvData}
                templateSlug={templateSlug}
                language={cvLang}
                accentColor={accentColor}
                fontSize={fontSize}
                fontStyle={fontStyle}
              />
            </div>
          </div>
        </div>
      </div>

      <CloudSyncModal
        open={cloudModalOpen}
        onClose={() => setCloudModalOpen(false)}
        currentDraft={currentDraft}
        onLoadCloudDrafts={(cloudDrafts) => {
          if (cloudDrafts.length > 0) {
            setAllDrafts(cloudDrafts);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudDrafts));
            handleSelectDraft(cloudDrafts[0]);
          }
        }}
      />
    </div>
  );
}
